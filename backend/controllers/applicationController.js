
const Application = require('../models/Application');
const Pet = require('../models/Pet');
const { sendPush } = require('../services/notifications');

// Create a new adoption application
async function createApplication(req, res) {
    try {
        const pet = await Pet.findById(req.body.petId);

        if (!pet) {
            return res.status(404).json({
                message: 'Pet not found'
            });
        }

        if (pet.adoptionStatus === 'adopted') {
            return res.status(409).json({
                message: 'This pet has already been adopted'
            });
        }

        const existing = await Application.findOne({
            user: req.user._id,
            pet: pet._id,
            status: {
                $in: ['pending', 'under_review']
                //$in is a MongoDB operator that matches any value in the supplied array.
            }
        });

        if (existing) {
            return res.status(409).json({
                //The controller sends a 409 Conflict response and stops.
                message: 'You already have an active application for this pet'
            });
        }

        const application = await Application.create({
            ...req.body,
            //The ... spread syntax copies the enumerable properties from req.body into the new object.
            pet: pet._id,
            user: req.user._id
        });

        pet.adoptionStatus = 'under_review';
        await pet.save();

        await application.populate(['pet', 'user']);
        //.populate(['pet', 'user']) asks Mongoose to replace those references with the corresponding documents.

        req.io.emit('petAvailabilityUpdated', {
            petId: pet._id,
            status: pet.adoptionStatus,
            petName: pet.name
        });
        //socket is used because the adoption status of the pet has changed, and we want to notify all connected clients about this change in real-time.
        //so socket helps to do that without the need for clients to refresh their pages or make additional requests.

        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


// Get all applications
async function listApplications(req, res) {
    const filter = req.user.role === 'admin'
        ? {}
        : { user: req.user._id };
        //{ user: req.user._id }	Only their own applications
        //This is a key access-control rule in PetMatch.

    const applications = await Application.find(filter)
        .populate('pet')
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    res.json(applications);
}


// Get a specific application by ID
async function getApplication(req, res) {
    const application = await Application.findById(req.params.id)
        .populate('pet')
        .populate('user', 'name email');

    if (!application) {
        return res.status(404).json({
            message: 'Application not found'
        });
    }

    if (
        req.user.role !== 'admin' &&
        application.user._id.toString() !== req.user._id.toString()
    ) {
        return res.status(403).json({
            message: 'Access denied'
        });
    }

    res.json(application);
}


// Update an application's status
async function updateStatus(req, res) {
    try {
        const application = await Application.findById(req.params.id)
            .populate('pet')
            .populate('user');

        if (!application) {
            return res.status(404).json({
                message: 'Application not found'
            });
        }

        const { status } = req.body;
        //Destructuring makes status available as a local variable.

        application.status = status;
        await application.save();

        if (status === 'approved') {
            await Pet.findByIdAndUpdate(
                application.pet._id,
                { adoptionStatus: 'adopted' }
            );

            await Application.updateMany(
                {
                    pet: application.pet._id,
                    //Selects applications for the same pet.
                    _id: { $ne: application._id },
                    //$ne means not equal. It excludes the application that was just approved.
                    status: { $in: ['pending', 'under_review'] }
                    //Selects only other applications that are still pending or under review.
                },
                {
                    status: 'rejected'
                }
            );

            req.io.emit('petAvailabilityUpdated', {
                petId: application.pet._id,
                status: 'adopted',
                petName: application.pet.name
            });

        } else if (status === 'rejected') {
            const active = await Application.countDocuments({
                pet: application.pet._id,
                //Only count applications for this pet.
                status: { $in: ['pending', 'under_review'] },
                _id: { $ne: application._id }
            });

            if (!active) {
                await Pet.findByIdAndUpdate(
                    application.pet._id,
                    { adoptionStatus: 'available' }
                );
            }

            req.io.emit('petAvailabilityUpdated', {
                petId: application.pet._id,
                status: active ? 'under_review' : 'available',
                petName: application.pet.name
            });
        }

        const title = status === 'approved'
            ? 'Adoption approved'
            : status === 'rejected'
                ? 'Application update'
                : 'Application under review';

        const body = `Your application for ${application.pet.name} is now ${status.replace('_', ' ')}.`;

        await sendPush(
            application.user,
            title,
            body,
            {
                applicationId: application._id,
                status
            }
        );

        res.json(application);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


// Export all controller functions
module.exports = {
    createApplication,
    listApplications,
    getApplication,
    updateStatus
};

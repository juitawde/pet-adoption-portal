
const Pet = require('../models/Pet');
const Application = require('../models/Application');
const User = require('../models/User');

// Get all pets for the admin panel
async function adminPets(req, res) {
    res.json(
        await Pet.find().sort({ createdAt: -1 })
    );
}

// Get all adoption applications for the admin panel
async function adminApplications(req, res) {
    res.json(
        await Application.find()
            .populate('pet')
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
    );
}

// Get statistics for the admin dashboard
async function dashboard(req, res) {
    const [
        totalPets,
        availablePets,
        adoptedPets,
        pendingApplications,
        users
    ] = await Promise.all([
        Pet.countDocuments(),

        Pet.countDocuments({
            adoptionStatus: 'available'
        }),

        Pet.countDocuments({
            adoptionStatus: 'adopted'
        }),

        Application.countDocuments({
            status: {
                $in: ['pending', 'under_review']
            }
        }),

        User.countDocuments()
    ]);

    res.json({
        totalPets,
        availablePets,
        adoptedPets,
        pendingApplications,
        users
    });

//     This uses array destructuring.
//     Array destructuring takes values from an array and assigns them to variables according to their positions
// Promise.all() takes an array of promises and waits for all of them to resolve successfully.
 }

// Export all admin controller functions
module.exports = {
    adminPets,
    adminApplications,
    dashboard
};

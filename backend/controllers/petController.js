//This controller handles the CRUD operations for pets in PetMatch.

const Pet = require('../models/Pet');

async function listPets(req, res) {

    try {

        const { type, breed, size, city, status, vaccinated, gender, search } = req.query;
        //const { type, city } = req.query;
        //  is a shorter way of writing:
        //  const type = req.query.type;
        //  const city = req.query.city;
        //this is called object destructuring, it allows us to extract multiple properties from an object and assign them to variables in a single statement.

        const query = {};

        if (type)
            query.type = type;

        if (breed)
            query.breed = new RegExp(breed, 'i');

        if (size)
            query.size = size;

        if (city)
            query.city = new RegExp(city, 'i');

        if (status)
            query.adoptionStatus = status;

        if (gender)
            query.gender = gender;

        if (vaccinated !== undefined)
            query.vaccinated = vaccinated === 'true';

        if (search)
            query.$or = [{ name: new RegExp(search, 'i') }, { breed: new RegExp(search, 'i') }, { city: new RegExp(search, 'i') }];
        
        //In MongoDB, $or means at least one of the listed conditions must match.

        const pets = await Pet.find(query).sort({ createdAt: -1 });
        // This sorts the returned documents using their createdAt field. 1 means ascending order — oldest first for dates.
        // -1 means descending order — newest first for dates.
        res.json(pets);
    }

    catch (error) {

        res.status(500).json({ message: error.message });
    }
}

async function getPet(req, res) {

    try {

        const pet = await Pet.findById(req.params.id);
        if (!pet)
            return res.status(404).json({ message: 'Pet not found' });
        res.json(pet);
    }

    catch (error) {

        res.status(400).json({ message: 'Invalid pet id' });
    }
}


async function createPet(req, res) {

    try {

        const pet = await Pet.create(req.body);
        res.status(201).json(pet);
    }

    catch (error) {

        res.status(400).json({ message: error.message });
    }
}

async function updatePet(req, res) {
    try {
        const pet = await Pet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!pet)
            return res.status(404).json({
                message: 'Pet not found'
            });

        req.io.emit('petAvailabilityUpdated', {
            petId: pet._id,
            status: pet.adoptionStatus,
            petName: pet.name
        });

        res.json(pet);
    }
    catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}


async function deletePet(req, res) {

    try {

        const pet = await Pet.findByIdAndDelete(req.params.id);
        if (!pet)
            return res.status(404).json({ message: 'Pet not found' });
        req.io.emit('petDeleted', { petId: pet._id });
        res.json({ message: 'Pet deleted' });
    }

    catch (error) {

        res.status(400).json({ message: error.message });
    }
}


module.exports = { listPets, getPet, createPet, updatePet, deletePet };

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Pet = require('../models/Pet');
const imgs = {
    dog1: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85',
    dog2: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=85',
    dog3: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1000&q=85',
    cat1: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1000&q=85',
    cat2: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1000&q=85',
    cat3: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1000&q=85',
    bird: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1000&q=85',
    rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1000&q=85',
    fish: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1000&q=85',
    turtle: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1000&q=85'
};
const pets = [
    { name: 'Bruno', type: 'dog', breed: 'Indie', age: 2, gender: 'Male', size: 'Medium', color: 'Brown', city: 'Mumbai', state: 'Maharashtra', description: 'Playful, loyal and people-friendly. Bruno loves morning walks and gentle belly rubs.', personality: ['Friendly', 'Playful', 'Loyal'], vaccinated: true, sterilized: true, shelter: 'Happy Tails Shelter', images: [imgs.dog1, imgs.dog2] },
    { name: 'Milo', type: 'dog', breed: 'Beagle', age: 3, gender: 'Male', size: 'Medium', color: 'Tri-color', city: 'Pune', state: 'Maharashtra', description: 'A curious companion who enjoys sniffing adventures and family time.', personality: ['Curious', 'Active', 'Affectionate'], vaccinated: true, sterilized: true, shelter: 'Paws & Hope', images: [imgs.dog2, imgs.dog3] },
    { name: 'Coco', type: 'dog', breed: 'Indie Mix', age: 1, gender: 'Female', size: 'Small', color: 'Cream', city: 'Navi Mumbai', state: 'Maharashtra', description: 'Gentle and affectionate young pup looking for a calm forever home.', personality: ['Gentle', 'Calm', 'Affectionate'], vaccinated: true, sterilized: false, shelter: 'Second Chance Rescue', images: [imgs.dog3, imgs.dog1] },
    { name: 'Luna', type: 'cat', breed: 'Persian', age: 1, gender: 'Female', size: 'Small', color: 'White', city: 'Mumbai', state: 'Maharashtra', description: 'A soft, quiet companion who loves sunny windows and cozy naps.', personality: ['Calm', 'Quiet', 'Sweet'], vaccinated: true, sterilized: true, shelter: 'Whisker Haven', images: [imgs.cat1, imgs.cat2] },
    { name: 'Simba', type: 'cat', breed: 'Indie', age: 2, gender: 'Male', size: 'Medium', color: 'Orange', city: 'Thane', state: 'Maharashtra', description: 'Confident, social and playful. Simba enjoys toys and attention.', personality: ['Social', 'Playful', 'Brave'], vaccinated: true, sterilized: true, shelter: 'Cat Care Mumbai', images: [imgs.cat2, imgs.cat3] },
    { name: 'Nala', type: 'cat', breed: 'Siamese Mix', age: 3, gender: 'Female', size: 'Small', color: 'Cream', city: 'Pune', state: 'Maharashtra', description: 'An elegant cat with a gentle personality and a love for quiet homes.', personality: ['Gentle', 'Elegant', 'Independent'], vaccinated: true, sterilized: true, shelter: 'Whisker Haven', images: [imgs.cat3, imgs.cat1] },
    { name: 'Kiwi', type: 'bird', breed: 'Cockatiel', age: 1, gender: 'Female', size: 'Small', color: 'Grey', city: 'Mumbai', state: 'Maharashtra', description: 'Bright and curious cockatiel who enjoys gentle interaction.', personality: ['Curious', 'Vocal', 'Friendly'], vaccinated: false, sterilized: false, shelter: 'Feather Friends', images: [imgs.bird] },
    { name: 'Mochi', type: 'rabbit', breed: 'Holland Lop', age: 1, gender: 'Male', size: 'Small', color: 'White', city: 'Thane', state: 'Maharashtra', description: 'A fluffy little rabbit who loves leafy treats and quiet spaces.', personality: ['Gentle', 'Quiet', 'Sweet'], vaccinated: false, sterilized: true, shelter: 'Little Paws Rescue', images: [imgs.rabbit] },
    { name: 'Bubbles', type: 'fish', breed: 'Betta', age: 1, gender: 'Male', size: 'Small', color: 'Blue', city: 'Mumbai', state: 'Maharashtra', description: 'A vibrant betta looking for a well-maintained tank and a caring owner.', personality: ['Calm', 'Colorful'], vaccinated: false, sterilized: false, shelter: 'Aqua Haven', images: [imgs.fish] },
    { name: 'Shelly', type: 'other', breed: 'Indian Star Tortoise', age: 4, gender: 'Female', size: 'Small', color: 'Brown', city: 'Navi Mumbai', state: 'Maharashtra', description: 'A slow-paced companion requiring an appropriate habitat and responsible care.', personality: ['Calm', 'Quiet'], vaccinated: false, sterilized: false, shelter: 'Wildlife Care Network', images: [imgs.turtle] },
    { name: 'Oreo', type: 'dog', breed: 'Labrador Mix', age: 4, gender: 'Male', size: 'Large', color: 'Black', city: 'Mumbai', state: 'Maharashtra', description: 'Steady, affectionate and happiest around people.', personality: ['Loyal', 'Gentle', 'Friendly'], vaccinated: true, sterilized: true, shelter: 'Happy Tails Shelter', images: [imgs.dog1, imgs.dog3] },
    { name: 'Maggie', type: 'dog', breed: 'Indie', age: 2, gender: 'Female', size: 'Medium', color: 'Tan', city: 'Thane', state: 'Maharashtra', description: 'Cheerful and social with a soft spot for long walks.', personality: ['Cheerful', 'Social', 'Active'], vaccinated: true, sterilized: true, shelter: 'Second Chance Rescue', images: [imgs.dog2, imgs.dog1] },
    { name: 'Teddy', type: 'dog', breed: 'Golden Retriever Mix', age: 5, gender: 'Male', size: 'Large', color: 'Golden', city: 'Pune', state: 'Maharashtra', description: 'Calm family companion who enjoys relaxed evenings.', personality: ['Calm', 'Affectionate', 'Patient'], vaccinated: true, sterilized: true, shelter: 'Paws & Hope', images: [imgs.dog3, imgs.dog2] },
    { name: 'Pepper', type: 'dog', breed: 'Indie Mix', age: 8, gender: 'Female', size: 'Medium', color: 'Black and White', city: 'Navi Mumbai', state: 'Maharashtra', description: 'A mature, gentle companion looking for a peaceful home.', personality: ['Gentle', 'Calm', 'Loyal'], vaccinated: true, sterilized: true, shelter: 'Second Chance Rescue', images: [imgs.dog1, imgs.dog3] },
    { name: 'Misty', type: 'cat', breed: 'British Shorthair Mix', age: 2, gender: 'Female', size: 'Medium', color: 'Grey', city: 'Mumbai', state: 'Maharashtra', description: 'Quiet and affectionate, especially fond of window-side naps.', personality: ['Quiet', 'Sweet', 'Affectionate'], vaccinated: true, sterilized: true, shelter: 'Whisker Haven', images: [imgs.cat1, imgs.cat3] },
    { name: 'Leo', type: 'cat', breed: 'Indie', age: 1, gender: 'Male', size: 'Small', color: 'Orange and White', city: 'Navi Mumbai', state: 'Maharashtra', description: 'Playful young cat who loves interactive toys.', personality: ['Playful', 'Curious', 'Brave'], vaccinated: true, sterilized: false, shelter: 'Cat Care Mumbai', images: [imgs.cat2, imgs.cat1] },
    { name: 'Cleo', type: 'cat', breed: 'Calico', age: 4, gender: 'Female', size: 'Small', color: 'Calico', city: 'Thane', state: 'Maharashtra', description: 'Independent but affectionate once she gets to know you.', personality: ['Independent', 'Gentle', 'Smart'], vaccinated: true, sterilized: true, shelter: 'Whisker Haven', images: [imgs.cat3, imgs.cat2] },
    { name: 'Peppercorn', type: 'cat', breed: 'Indie', age: 6, gender: 'Male', size: 'Medium', color: 'Black', city: 'Pune', state: 'Maharashtra', description: 'A mellow companion who prefers calm spaces and soft beds.', personality: ['Mellow', 'Quiet', 'Affectionate'], vaccinated: true, sterilized: true, shelter: 'Cat Care Mumbai', images: [imgs.cat1, imgs.cat2] },
    { name: 'Sunny', type: 'cat', breed: 'Tabby', age: 3, gender: 'Male', size: 'Medium', color: 'Brown', city: 'Mumbai', state: 'Maharashtra', description: 'Friendly tabby who enjoys gentle play and company.', personality: ['Friendly', 'Playful', 'Easygoing'], vaccinated: true, sterilized: true, shelter: 'Whisker Haven', images: [imgs.cat2, imgs.cat3] },
    { name: 'Piku', type: 'bird', breed: 'Budgerigar', age: 1, gender: 'Male', size: 'Small', color: 'Green and Yellow', city: 'Thane', state: 'Maharashtra', description: 'A bright little budgie who enjoys sounds and gentle attention.', personality: ['Vocal', 'Curious', 'Active'], vaccinated: false, sterilized: false, shelter: 'Feather Friends', images: [imgs.bird] },
    { name: 'Rio', type: 'bird', breed: 'Lovebird', age: 2, gender: 'Female', size: 'Small', color: 'Green', city: 'Mumbai', state: 'Maharashtra', description: 'Lively and social, with a curious personality.', personality: ['Social', 'Lively', 'Curious'], vaccinated: false, sterilized: false, shelter: 'Feather Friends', images: [imgs.bird] },
    { name: 'Sky', type: 'bird', breed: 'Finch', age: 1, gender: 'Male', size: 'Small', color: 'Grey', city: 'Pune', state: 'Maharashtra', description: 'A gentle finch suited to a quiet, attentive home.', personality: ['Gentle', 'Quiet', 'Active'], vaccinated: false, sterilized: false, shelter: 'Feather Friends', images: [imgs.bird] },
    { name: 'Hazel', type: 'rabbit', breed: 'Mini Rex', age: 2, gender: 'Female', size: 'Small', color: 'Brown', city: 'Mumbai', state: 'Maharashtra', description: 'Soft and calm rabbit who enjoys enrichment and quiet corners.', personality: ['Calm', 'Gentle', 'Quiet'], vaccinated: false, sterilized: true, shelter: 'Little Paws Rescue', images: [imgs.rabbit] },
    { name: 'Cinnamon', type: 'rabbit', breed: 'Lionhead', age: 3, gender: 'Male', size: 'Small', color: 'Tan', city: 'Navi Mumbai', state: 'Maharashtra', description: 'Curious little rabbit with a fluffy mane and sweet nature.', personality: ['Curious', 'Sweet', 'Gentle'], vaccinated: false, sterilized: true, shelter: 'Little Paws Rescue', images: [imgs.rabbit] },
    { name: 'Tofu', type: 'rabbit', breed: 'Netherland Dwarf', age: 1, gender: 'Female', size: 'Small', color: 'White', city: 'Thane', state: 'Maharashtra', description: 'Tiny, gentle and happiest with a predictable routine.', personality: ['Gentle', 'Quiet', 'Sweet'], vaccinated: false, sterilized: false, shelter: 'Little Paws Rescue', images: [imgs.rabbit] },
    { name: 'Marble', type: 'fish', breed: 'Guppy', age: 1, gender: 'Male', size: 'Small', color: 'Blue', city: 'Mumbai', state: 'Maharashtra', description: 'A colorful guppy suited to a clean, planted aquarium.', personality: ['Active', 'Colorful'], vaccinated: false, sterilized: false, shelter: 'Aqua Haven', images: [imgs.fish] },
    { name: 'Coral', type: 'fish', breed: 'Molly', age: 1, gender: 'Female', size: 'Small', color: 'Orange', city: 'Pune', state: 'Maharashtra', description: 'Peaceful community fish that does well in a suitable aquarium.', personality: ['Peaceful', 'Active'], vaccinated: false, sterilized: false, shelter: 'Aqua Haven', images: [imgs.fish] },
    { name: 'Dot', type: 'other', breed: 'Indian Star Tortoise', age: 5, gender: 'Male', size: 'Small', color: 'Brown', city: 'Navi Mumbai', state: 'Maharashtra', description: 'A quiet tortoise requiring an appropriate legal habitat and specialist care.', personality: ['Calm', 'Quiet'], vaccinated: false, sterilized: false, shelter: 'Wildlife Care Network', images: [imgs.turtle] },
    { name: 'Fern', type: 'other', breed: 'Red-Eared Slider', age: 3, gender: 'Female', size: 'Small', color: 'Green', city: 'Thane', state: 'Maharashtra', description: 'An aquatic turtle needing a clean, properly heated habitat.', personality: ['Calm', 'Quiet'], vaccinated: false, sterilized: false, shelter: 'Wildlife Care Network', images: [imgs.turtle] },
    { name: 'Poppy', type: 'small-animal', breed: 'Syrian Hamster', age: 1, gender: 'Female', size: 'Small', color: 'Golden', city: 'Mumbai', state: 'Maharashtra', description: 'A tiny, curious companion needing enrichment and a suitable habitat.', personality: ['Curious', 'Active', 'Gentle'], vaccinated: false, sterilized: false, shelter: 'Little Paws Rescue', images: [imgs.rabbit] }
];
async function seed() {
    await connectDB();
    await Promise.all([User.deleteMany({}), Pet.deleteMany({})]);
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const userPassword = await bcrypt.hash('User@123', 10);
    await User.create([
        { name: 'PetMatch Admin', email: 'admin@petmatch.com', password: adminPassword, role: 'admin' },
        { name: 'Demo User', email: 'user@petmatch.com', password: userPassword, role: 'user' }
    ]);
    await Pet.insertMany(pets);
    console.log('Seed complete. Admin: admin@petmatch.com / Admin@123');
    console.log('Demo user: user@petmatch.com / User@123');
    process.exit(0);
}
seed().catch(e => {
    console.error(e);
    process.exit(1);
});

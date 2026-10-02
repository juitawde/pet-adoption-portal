export const petImages = {
    dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85',
    dog2: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=85',
    dog3: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=85',
    cat: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=85',
    cat2: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=85',
    cat3: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1200&q=85',
    bird: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=85',
    rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=1200&q=85',
    fish: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=1200&q=85',
    turtle: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=85'
};
export const categories = [
    { type: 'dog', label: 'Dogs', image: petImages.dog }, { type: 'cat', label: 'Cats', image: petImages.cat },
    { type: 'bird', label: 'Birds', image: petImages.bird }, { type: 'rabbit', label: 'Rabbits', image: petImages.rabbit },
    { type: 'small-animal', label: 'Small Animals', image: petImages.rabbit }, { type: 'fish', label: 'Fish', image: petImages.fish }, { type: 'other', label: 'Other Animals', image: petImages.turtle }
];
export const banners = [
    { image: petImages.dog3, eyebrow: 'ADOPT WITH HEART', title: 'A forever home can start with one click.', text: 'Browse shelter pets and meet the one who fits your life.', button: 'Find a Pet' },
    { image: petImages.cat2, eyebrow: 'THE PETMATCH QUIZ', title: 'Not sure who is right for you?', text: 'Answer a few questions and discover compatible companions.', button: 'Take the Quiz' },
    { image: petImages.rabbit, eyebrow: 'EVERY PAW COUNTS', title: 'Small animals. Big personalities.', text: 'Explore rabbits, birds, fish and more looking for a home.', button: 'Explore Animals' }
];

export const demoPets = [
    ['Bruno','dog','Indie',2,'Mumbai',petImages.dog], ['Milo','dog','Beagle',3,'Pune',petImages.dog2], ['Coco','dog','Indie Mix',1,'Navi Mumbai',petImages.dog3], ['Oreo','dog','Labrador Mix',4,'Mumbai',petImages.dog], ['Maggie','dog','Indie',2,'Thane',petImages.dog2], ['Teddy','dog','Golden Retriever Mix',5,'Pune',petImages.dog3], ['Pepper','dog','Indie Mix',8,'Navi Mumbai',petImages.dog],
    ['Luna','cat','Persian',1,'Mumbai',petImages.cat], ['Simba','cat','Indie',2,'Thane',petImages.cat2], ['Nala','cat','Siamese Mix',3,'Pune',petImages.cat3], ['Misty','cat','British Shorthair Mix',2,'Mumbai',petImages.cat], ['Leo','cat','Indie',1,'Navi Mumbai',petImages.cat2], ['Cleo','cat','Calico',4,'Thane',petImages.cat3], ['Peppercorn','cat','Indie',6,'Pune',petImages.cat], ['Sunny','cat','Tabby',3,'Mumbai',petImages.cat2],
    ['Kiwi','bird','Cockatiel',1,'Mumbai',petImages.bird], ['Piku','bird','Budgerigar',1,'Thane',petImages.bird], ['Rio','bird','Lovebird',2,'Mumbai',petImages.bird], ['Sky','bird','Finch',1,'Pune',petImages.bird],
    ['Mochi','rabbit','Holland Lop',1,'Thane',petImages.rabbit], ['Hazel','rabbit','Mini Rex',2,'Mumbai',petImages.rabbit], ['Cinnamon','rabbit','Lionhead',3,'Navi Mumbai',petImages.rabbit], ['Tofu','rabbit','Netherland Dwarf',1,'Thane',petImages.rabbit],
    ['Bubbles','fish','Betta',1,'Mumbai',petImages.fish], ['Marble','fish','Guppy',1,'Mumbai',petImages.fish], ['Coral','fish','Molly',1,'Pune',petImages.fish],
    ['Shelly','other','Indian Star Tortoise',4,'Navi Mumbai',petImages.turtle], ['Dot','other','Indian Star Tortoise',5,'Navi Mumbai',petImages.turtle], ['Fern','other','Red-Eared Slider',3,'Thane',petImages.turtle],
    ['Poppy','small-animal','Syrian Hamster',1,'Mumbai',petImages.rabbit]
].map(([name,type,breed,age,city,image], i) => ({
    _id: `demo-${i + 1}`, name, type, breed, age, ageUnit: age === 1 ? 'year' : 'years', city,
    adoptionStatus: 'available', vaccinated: ['dog','cat'].includes(type), images: [image]
}));

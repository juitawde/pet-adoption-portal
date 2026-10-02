import { Link } from 'react-router-dom';
import { MapPin, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SAVED_KEY = 'petmatch_saved_pets';

export default function PetCard({ pet, index = 0 }) {
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        try {
            const savedPets = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
            setSaved(savedPets.some(item => item._id === pet._id));
        } catch { /* ignore local storage errors */ }
    }, [pet._id]);

    const toggleSaved = (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            const savedPets = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
            const next = savedPets.some(item => item._id === pet._id)
                ? savedPets.filter(item => item._id !== pet._id)
                : [...savedPets, pet];
            localStorage.setItem(SAVED_KEY, JSON.stringify(next));
            setSaved(next.some(item => item._id === pet._id));
            window.dispatchEvent(new Event('petmatch:saved'));
        } catch { /* ignore local storage errors */ }
    };

    return <motion.article className="pet-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }} whileHover={{ y: -6, rotateX: 1.2, rotateY: -1.2 }}>
    <div className="pet-photo">
    <img src={pet.images?.[0]} alt={pet.name}/>
    <button className={`heart-float ${saved ? 'saved' : ''}`} onClick={toggleSaved} aria-label={saved ? `Remove ${pet.name} from saved pets` : `Save ${pet.name}`}>
        <Heart size={18} fill={saved ? 'currentColor' : 'none'}/>
    </button>
    <span className={'status ' + pet.adoptionStatus}>{pet.adoptionStatus.replace('_', ' ')}</span>
    </div>
    <div className="pet-card-body">
    <div className="pet-title-row">
        <div>
            <h3>{pet.name}</h3>
            <p>{pet.breed} · {pet.age} {pet.ageUnit}</p>
        </div>
        <span className="type-chip">{pet.type}</span>
    </div>
    <div className="pet-meta">
        <span><MapPin size={14}/>{pet.city}</span>{pet.vaccinated && <span><ShieldCheck size={14}/>Vaccinated</span>}</div>
        <Link className="outline-btn full" to={`/pets/${pet._id}`}>Meet {pet.name}</Link>
    </div>
    </motion.article>;
}

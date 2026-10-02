import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import PetCard from '../components/PetCard';

const SAVED_KEY = 'petmatch_saved_pets';

export default function Saved() {
    const [pets, setPets] = useState([]);
    const load = () => {
        try { setPets(JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')); } catch { setPets([]); }
    };
    useEffect(() => {
        load();
        window.addEventListener('petmatch:saved', load);
        return () => window.removeEventListener('petmatch:saved', load);
    }, []);
    return <main className="page saved-page">
        <section className="page-hero saved-hero">
            <div><span className="eyebrow">YOUR PETMATCH LIST</span><h1>Saved <em>companions.</em></h1><p>Keep the pets that caught your eye in one place and come back whenever you are ready.</p></div>
            <div className="saved-hero-card"><Heart size={24}/><strong>{pets.length}</strong><span>{pets.length === 1 ? 'companion saved' : 'companions saved'}</span></div>
        </section>
        <section className="section">
            {pets.length ? <div className="pet-grid">{pets.map((pet, i) => <PetCard key={pet._id} pet={pet} index={i}/>)}</div> : <div className="empty saved-empty"><Heart/><h3>Your saved list is empty</h3><p>Tap the heart on any companion you would like to remember.</p><Link className="primary-btn" to="/pets">Browse pets <ArrowRight size={16}/></Link></div>}
        </section>
    </main>;
}

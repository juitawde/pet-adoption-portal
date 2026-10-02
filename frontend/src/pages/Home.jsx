import { Link } from 'react-router-dom';
import { ArrowRight, Search, Sparkles, ShieldCheck, HeartHandshake, BellRing, PawPrint, Dog, Cat, Bird, Rabbit, Fish, Turtle } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { useEffect, useState } from 'react';
import { categories, banners, petImages, demoPets } from '../data/pets';
import PetCard from '../components/PetCard';
import Banner from '../components/Banner';

const categoryIcons = { dog: Dog, cat: Cat, bird: Bird, rabbit: Rabbit, 'small-animal': PawPrint, fish: Fish, other: Turtle };
const fallbackPets = demoPets.slice(0, 4);
export default function Home() {
    const [pets, setPets] = useState(fallbackPets);
    const [search, setSearch] = useState('');
    useEffect(() => {
        api.get('/pets?status=available').then(r => setPets(r.data.slice(0, 4))).catch(() => { });
    }, []);
    return <main>
    <section className="hero">
    <div className="hero-image"/>
    <div className="hero-glow"/>
    <div className="hero-content">
        <div className="hero-copy">
            <span className="eyebrow cream">A LITTLE LOVE GOES A LONG WAY</span>
            <h1>Find a new best friend <em>to come home to.</em>
        </h1>
        <br></br>
        <p>Browse lovable pets from shelters and rescues, then make the first step toward a forever home.</p>
        <div className="hero-actions">
            <Link className="primary-btn" to="/pets">Explore pets <ArrowRight size={17}/>
        </Link>
        <Link className="glass-btn" to="/quiz">
            <Sparkles size={17}/>Take the match quiz</Link>
        </div>
    </div>
    <br></br>
    <div className="search-card">
            <div className="hero-search">
                <Search size={18}/>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, breed or city"/>
                <Link to={`/pets?search=${encodeURIComponent(search)}`}>Search</Link>
            </div>
            
        </div>
    </div>
    </section>
    <section className="category-section section">
    <div className="section-heading">
        <div>
            <span className="eyebrow">MEET THEM BY TYPE</span>
            <h2>Who are you hoping to meet?</h2>
        </div>
        <Link className="text-link" to="/pets">See all pets <ArrowRight size={16}/>
    </Link>
    </div>
    <div className="category-grid">{categories.slice(0, 6).map(c => <Link className="category-card" key={c.type} to={`/pets?type=${c.type}`}>
        <img src={c.image} alt=""/>
        <div className="cat-shade"/>
        <div className="category-label">
            <span>{(() => { const Icon = categoryIcons[c.type] || PawPrint; return <Icon size={23} strokeWidth={1.8}/>; })()}</span>
            <strong>{c.label}</strong>
            <small>Explore {c.label.toLowerCase()}</small>
        </div>
    </Link>)}</div>
    </section>
    <section className="section story-strip">
    <div className="story-card">
        <div>
            <span className="eyebrow">THE PETMATCH WAY</span>
            <h2>Adoption should feel <em>hopeful.</em>
        </h2>
        <p>Simple discovery, thoughtful applications, and real-time updates keep the journey clear for adopters and shelters. From the first profile you open to the day a companion comes home, PetMatch keeps the process warm, transparent, and easy to follow.</p>
        <p className="story-quote">“The right home can change a pet’s whole story — and the right companion can change yours.”</p>
        <div className="feature-row">
            <span>
                <ShieldCheck />Verified profiles</span>
                <span>
                    <HeartHandshake />Shelter-first</span>
                    <span>
                        <BellRing />Live updates</span>
                    </div>
                </div>
                <div className="story-image">
                    <img src={petImages.dog3}/>
                    <div className="floating-note">
                        <strong>Every pet</strong>
                        <span>deserves a forever home.</span>
                    </div>
                </div>
            </div>
        </section>
        <section className="section">
            <div className="section-heading">
                <div>
                    <span className="eyebrow">WAITING FOR YOU</span>
                    <h2>Featured companions</h2>
                </div>
                <Link className="text-link" to="/pets?status=available">Browse all <ArrowRight size={16}/>
            </Link>
        </div>
        <div className="pet-grid">{pets.map((p, i) => <PetCard pet={p} key={p._id} index={i}/>)}</div>
        </section>
        <section className="section banners">
            <Banner banner={banners[0]}/>
            <Banner banner={banners[1]}/>
        </section>
        <section className="section quiz-cta">
            <div className="quiz-visual">
                <img src={petImages.cat3}/>
                <div className="floating-card"><strong>92% match</strong>
                <span>Luna might be your kind of companion.</span>
            </div>
        </div>
        <div className="quiz-copy">
            <span className="eyebrow">NOT SURE WHERE TO START?</span>
            <h2>Let PetMatch help you find your kind of pet.</h2>
            <p>Tell us about your home, routine and preferences. Our simple matching quiz recommends pets that fit your lifestyle.</p>
            <Link className="primary-btn" to="/quiz">Find my match <ArrowRight size={17}/>
        </Link>
    </div>
    </section>
    </main>;
}

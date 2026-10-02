import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, X, PawPrint } from 'lucide-react';
import api from '../lib/api';
import PetCard from '../components/PetCard';
import { petImages, demoPets } from '../data/pets';
const demo = demoPets;export default function Pets() {
    const [params, setParams] = useSearchParams();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ type: params.get('type') || '', size: '', gender: '', city: '', vaccinated: '' });
    const [search, setSearch] = useState(params.get('search') || '');
    const load = () => {
        setLoading(true);
        const q = new URLSearchParams();
        Object.entries(filters).forEach(([k, v]) => v && q.set(k, v));
        if (search)
            q.set('search', search);
        api.get(`/pets?${q}`).then(r => setPets(r.data)).catch(() => setPets(demo.filter(p => (!filters.type || p.type === filters.type) && (!search || `${p.name} ${p.breed}`.toLowerCase().includes(search.toLowerCase()))))).finally(() => setLoading(false));
    };
    useEffect(load, [filters.type, filters.size, filters.gender, filters.city, filters.vaccinated]);
    return <main className="page">
    <section className="page-hero">
    <div>
        <span className="eyebrow">DISCOVER YOUR COMPANION</span>
        <h1>Pets looking for a <em>forever home.</em>
    </h1>
    <p>Browse by animal type, personality and location. Every profile is a new little story.</p>
    </div>
    <img src={petImages.dog3} alt="Happy dog"/>
    </section>
    <div className="section pets-layout">
    <aside className="filter-panel">
        <div className="filter-title">
            <strong>
                <SlidersHorizontal size={18}/> Filters</strong>
                <button onClick={() => setFilters({ type: '', size: '', gender: '', city: '', vaccinated: '' })}>Reset</button>
            </div>
            <label>Animal type<select value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
                <option value="">All animals</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="bird">Birds</option>
                <option value="rabbit">Rabbits</option>
                <option value="small-animal">Small animals</option>
                <option value="fish">Fish</option>
                <option value="other">Other</option>
            </select>
        </label>
        <label>Size<select value={filters.size} onChange={e => setFilters({ ...filters, size: e.target.value })}>
            <option value="">Any size</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
        </select>
    </label>
    <label>Gender<select value={filters.gender} onChange={e => setFilters({ ...filters, gender: e.target.value })}>
        <option value="">Any gender</option>
        <option>Male</option>
        <option>Female</option>
    </select>
    </label>
    <label>City<input value={filters.city} onChange={e => setFilters({ ...filters, city: e.target.value })} placeholder="e.g. Mumbai"/>
    </label>
    <label className="check">
    <input type="checkbox" checked={filters.vaccinated === 'true'} onChange={e => setFilters({ ...filters, vaccinated: e.target.checked ? 'true' : '' })}/> Vaccinated only</label>
    </aside>
    <section className="pets-results">
    <div className="results-toolbar">
        <div className="big-search">
            <Search size={18}/>
            <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && load()} placeholder="Search name, breed or city"/>
            <button onClick={load}>Search</button>
        </div>
        <span>{loading ? 'Finding pets…' : `${pets.length} pets found`}</span>
    </div>
    <div className="mobile-filter-tags">{filters.type && <button onClick={() => setFilters({ ...filters, type: '' })}>{filters.type}<X size={13}/>
        </button>}</div>{loading ? <div className="loading-grid">{[1, 2, 3, 4].map(x => <div className="skeleton" key={x}/>)}</div> : pets.length ? <div className="pet-grid">{pets.map((p, i) => <PetCard key={p._id} pet={p} index={i}/>)}</div> : <div className="empty">
        <span><PawPrint size={34}/></span>
        <h3>No matches yet</h3>
        <p>Try a different animal, city or filter.</p>
    </div>}</section>
    </div>
    </main>;
}

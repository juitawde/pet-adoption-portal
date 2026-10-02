import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../lib/api';
import { petImages } from '../data/pets';
export default function PetAdminForm() {
    const { id } = useParams();
    const editing = Boolean(id);
    const nav = useNavigate();
    const [form, setForm] = useState({ name: '', type: 'dog', breed: '', age: 1, ageUnit: 'years', gender: 'Male', size: 'Medium', color: '', city: 'Mumbai', state: 'Maharashtra', description: '', personality: 'Friendly, Playful', vaccinated: true, sterilized: false, shelter: 'Happy Tails Shelter', shelterContact: '', images: petImages.dog });
    const [error, setError] = useState('');
    useEffect(() => { if (editing)
        api.get(`/pets/${id}`).then(r => setForm({ ...r.data, personality: (r.data.personality || []).join(', '), images: (r.data.images || []).join(', ') })); }, [id]);
    const submit = async (e) => {
        e.preventDefault();
        const data = { ...form, age: Number(form.age), personality: form.personality.split(',').map(x => x.trim()).filter(Boolean), images: form.images.split(',').map(x => x.trim()).filter(Boolean) };
        try {
            if (editing)
                await api.put(`/pets/${id}`, data);
            else
                await api.post('/pets', data);
            nav('/admin');
        }
        catch (e) {
            setError(e.response?.data?.message || 'Unable to save pet');
        }
    };
    return <main className="page">
    <div className="section form-wrap admin-form">
    <Link className="back-link" to="/admin">
        <ArrowLeft size={16}/>Back to admin</Link>
        <span className="eyebrow">SHELTER CONSOLE</span>
        <h1>{editing ? 'Edit' : 'Add'} a <em>pet profile.</em>
    </h1>{error && <div className="error-box">{error}</div>}<form className="application-form" onSubmit={submit}>
    <div className="form-grid">
        <label>Name<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
    </label>
    <label>Type<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="bird">Bird</option>
        <option value="rabbit">Rabbit</option>
        <option value="small-animal">Small animal</option>
        <option value="fish">Fish</option>
        <option value="other">Other</option>
    </select>
    </label>
    <label>Breed<input required value={form.breed} onChange={e => setForm({ ...form, breed: e.target.value })}/>
    </label>
    <label>Age<input type="number" min="0" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })}/>
    </label>
    <label>Gender<select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
    <option>Male</option>
    <option>Female</option>
    </select>
    </label>
    <label>Size<select value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}>
    <option>Small</option>
    <option>Medium</option>
    <option>Large</option>
    </select>
    </label>
    <label>City<input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}/>
    </label>
    <label>State<input value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}/>
    </label>
    <label>Shelter<input required value={form.shelter} onChange={e => setForm({ ...form, shelter: e.target.value })}/>
    </label>
    <label>Color<input value={form.color} onChange={e => setForm({ ...form, color: e.target.value })}/>
    </label>
    </div>
    <label>Personality tags<input value={form.personality} onChange={e => setForm({ ...form, personality: e.target.value })} placeholder="Friendly, Playful, Calm"/>
    </label>
    <label>Description<textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}/>
    </label>
    <label>Image URLs <span className="muted">(comma separated)</span>
    <textarea value={form.images} onChange={e => setForm({ ...form, images: e.target.value })}/>
    </label>
    <div className="check-row">
    <label className="check">
        <input type="checkbox" checked={form.vaccinated} onChange={e => setForm({ ...form, vaccinated: e.target.checked })}/> Vaccinated</label>
        <label className="check">
            <input type="checkbox" checked={form.sterilized} onChange={e => setForm({ ...form, sterilized: e.target.checked })}/> Sterilized</label>
        </div>
        <button className="primary-btn" type="submit">Save pet</button>
    </form>
    </div>
    </main>;
}

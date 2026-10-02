import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';
export default function Apply() {
    const { id } = useParams();
    const { user } = useAuth();
    const nav = useNavigate();
    const [pet, setPet] = useState(null);
    const [form, setForm] = useState({ phone: '', homeType: 'Apartment', experience: '', reason: '', message: '' });
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => { api.get(`/pets/${id}`).then(r => setPet(r.data)).catch(() => { }); }, [id]);
    if (!user)
        return null;
    if (!pet)
        return <main className="page">
        <div className="empty">
    <h2>Loading pet…</h2>
        </div>
        </main>;
    const submit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/applications', { petId: id, ...form });
            setSent(true);
        }
        catch (e) {
            setError(e.response?.data?.message || 'Could not submit application');
        }
    };
    if (sent)
        return <main className="page">
        <div className="success-page">
    <div className="success-icon">
        <CheckCircle2 />
    </div>
    <span className="eyebrow">APPLICATION SENT</span>
    <h1>Thank you for choosing {pet.name}.</h1>
    <p>Your application is now with {pet.shelter}. We’ll keep you updated as it moves through review.</p>
    <Link className="primary-btn" to="/dashboard">View my applications</Link>
        </div>
        </main>;
    return <main className="page">
    <div className="section form-wrap">
    <Link className="back-link" to={`/pets/${id}`}>
        <ArrowLeft size={16}/>Back to {pet.name}</Link>
        <div className="form-header">
            <div>
                <span className="eyebrow">ADOPTION APPLICATION</span>
                <h1>Tell us a little about <em>your home.</em>
            </h1>
            <p>A thoughtful application helps shelters make a good match.</p>
        </div>
        <img src={pet.images?.[0]} alt={pet.name}/>
    </div>{error && <div className="error-box">{error}</div>}<form className="application-form" onSubmit={submit}>
    <div className="form-grid">
        <label>Phone number<input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210"/>
    </label>
    <label>Home type<select value={form.homeType} onChange={e => setForm({ ...form, homeType: e.target.value })}>
        <option>Apartment</option>
        <option>House</option>
        <option>Farm / Large property</option>
        <option>Other</option>
    </select>
    </label>
    </div>
    <label>Previous pet experience<textarea required value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="Tell the shelter about your experience with pets…"/>
    </label>
    <label>Why would you like to adopt {pet.name}?<textarea required minLength="10" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} placeholder="What made you connect with this pet?"/>
    </label>
    <label>Anything else you'd like the shelter to know?<textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Optional"/>
    </label>
    <button className="primary-btn" type="submit">Submit application</button>
    </form>
    </div>
    </main>;
}

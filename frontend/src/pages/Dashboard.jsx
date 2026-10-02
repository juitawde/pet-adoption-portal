import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Heart, Clock3, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import api from '../lib/api';
import { petImages } from '../data/pets';
const statusIcon = { pending: <Clock3 />, under_review: <Clock3 />, approved: <CheckCircle2 />, rejected: <XCircle /> };
export default function Dashboard() {
    const [apps, setApps] = useState([]);
    useEffect(() => { api.get('/applications').then(r => setApps(r.data)).catch(() => { }); }, []);
    return <main className="page">
    <section className="dashboard-hero">
    <div>
        <span className="eyebrow cream">YOUR PETMATCH</span>
        <h1>Your adoption journey, <em>all in one place.</em>
    </h1>
    <br></br>
    <p>Keep track of applications, saved companions and live updates.</p>
    </div>
    <img src={petImages.cat}/>
    </section>
    <div className="section dashboard-grid">
    <section className="dashboard-main">
        <div className="section-heading">
            <div>
                <span className="eyebrow">APPLICATIONS</span>
                <h2>Your applications</h2>
            </div>
            <Link className="outline-btn" to="/pets">Find another pet</Link>
        </div>{apps.length ? <div className="application-list">{apps.map(a => <div className="application-item" key={a._id}>
            <img src={a.pet?.images?.[0] || petImages.dog}/>
            <div className="application-info">
                <div>
                    <strong>{a.pet?.name}</strong>
                    <span>{a.pet?.breed} · {a.pet?.city}</span>
                </div>
                <span className={`status-pill ${a.status}`}>{statusIcon[a.status]}{a.status.replace('_', ' ')}</span>
                <small>Applied {new Date(a.createdAt).toLocaleDateString()}</small>
            </div>
            <Link to={`/pets/${a.pet?._id}`}>
                <ArrowRight />
            </Link>
        </div>)}</div> : <div className="empty compact">
        <Heart />
        <h3>No applications yet</h3>
        <p>When you meet a pet you love, your application will appear here.</p>
        <Link className="primary-btn" to="/pets">Start browsing</Link>
    </div>}</section>
    <aside className="dashboard-side">
        <div className="side-card">
            <Bell />
            <h3>Live updates</h3>
            <p>Pet availability changes are delivered instantly with Socket.io.</p>
            <span className="live-dot"><span className="live-dot-mark"/>Connected when browsing</span>
        </div>
        <div className="side-card peach">
            <span className="eyebrow">PETMATCH QUIZ</span>
            <h3>Still searching?</h3>
            <p>Let your routine guide the next pet you meet.</p>
            <Link className="text-link" to="/quiz">Take the quiz <ArrowRight size={15}/>
        </Link>
    </div>
    </aside>
    </div>
    </main>;
}

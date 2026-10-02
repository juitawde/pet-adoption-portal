import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Check, X, Plus, PawPrint, Users, Clock3, Home, Trash2, ChevronRight, UserRound, CalendarDays, MapPin, FileText, CheckCircle2, XCircle } from 'lucide-react';
import api from '../lib/api';

const steps = [
    { key: 'submitted', label: 'Application submitted', icon: FileText },
    { key: 'under_review', label: 'Application under review', icon: Clock3 },
    { key: 'approved', label: 'Adoption approved', icon: CheckCircle2 }
];

export default function Admin() {
    const [stats, setStats] = useState({});
    const [pets, setPets] = useState([]);
    const [apps, setApps] = useState([]);
    const [tab, setTab] = useState('applications');
    const [selectedApp, setSelectedApp] = useState(null);
    const load = () => {
        Promise.all([api.get('/admin/dashboard'), api.get('/admin/pets'), api.get('/admin/applications')]).then(([s, p, a]) => {
            setStats(s.data);
            setPets(p.data);
            setApps(a.data);
            setSelectedApp(current => current ? (a.data.find(item => item._id === current._id) || null) : (a.data[0] || null));
        }).catch(() => { });
    };
    useEffect(load, []);

    const status = async (id, value) => {
        await api.put(`/applications/${id}/status`, { status: value });
        load();
    };
    const remove = async (id) => {
        if (confirm('Delete this pet?')) {
            await api.delete(`/pets/${id}`);
            load();
        }
    };

    const selectedStatus = selectedApp?.status;
    const completedStep = key => {
        if (!selectedStatus) return false;
        if (key === 'submitted') return true;
        if (key === 'under_review') return ['under_review', 'approved'].includes(selectedStatus);
        return selectedStatus === 'approved';
    };

    return <main className="page admin-page">
    <div className="admin-top">
        <div><span className="eyebrow">SHELTER CONSOLE</span><h1>PetMatch <em>admin.</em></h1><p>Manage pets, applications and adoption availability.</p></div>
        <Link className="primary-btn" to="/admin/pets/new"><Plus size={17}/>Add pet</Link>
    </div>
    <div className="stat-grid">
        <div><PawPrint/><small>Total pets</small><strong>{stats.totalPets || 0}</strong></div>
        <div><Home/><small>Available</small><strong>{stats.availablePets || 0}</strong></div>
        <div><Check/><small>Adopted</small><strong>{stats.adoptedPets || 0}</strong></div>
        <div><Clock3/><small>Pending</small><strong>{stats.pendingApplications || 0}</strong></div>
        <div><Users/><small>Users</small><strong>{stats.users || 0}</strong></div>
    </div>
    <div className="admin-panel">
        <div className="tabs">
            <button className={tab === 'applications' ? 'active' : ''} onClick={() => setTab('applications')}>Applications</button>
            <button className={tab === 'pets' ? 'active' : ''} onClick={() => setTab('pets')}>Pets</button>
        </div>
        {tab === 'applications' ? <>
            <div className="admin-table">
                <div className="table-head"><span>Applicant</span><span>Pet</span><span>Status</span><span>Action</span></div>
                {apps.map(a => <button className={`table-row application-row ${selectedApp?._id === a._id ? 'selected' : ''}`} key={a._id} onClick={() => setSelectedApp(a)}>
                    <div><strong>{a.user?.name}</strong><small>{a.user?.email}</small></div>
                    <div><strong>{a.pet?.name}</strong><small>{a.pet?.breed}</small></div>
                    <span className={`status-pill ${a.status}`}>{a.status.replace('_', ' ')}</span>
                    <div className="actions"><ChevronRight className="row-chevron" />{a.status !== 'approved' && <span className="approve" onClick={e => { e.stopPropagation(); status(a._id, 'approved'); }} title="Approve"><Check /></span>}{a.status !== 'rejected' && <span className="reject" onClick={e => { e.stopPropagation(); status(a._id, 'rejected'); }} title="Reject"><X /></span>}</div>
                </button>)}
            </div>
            {selectedApp && <section className="application-detail">
                <div className="application-detail-head">
                    <div><span className="eyebrow">ADOPTION TRACKING</span><h2>{selectedApp.pet?.name} application</h2><p>Application #{String(selectedApp._id).slice(-8)} · submitted {new Date(selectedApp.createdAt).toLocaleDateString()}</p></div>
                    <span className={`status-pill ${selectedApp.status}`}>{selectedApp.status.replace('_', ' ')}</span>
                </div>
                <div className="tracking-grid">
                    <div className="tracking-photo"><img src={selectedApp.pet?.images?.[0]} alt={selectedApp.pet?.name}/><div><strong>{selectedApp.pet?.name}</strong><span>{selectedApp.pet?.breed} · {selectedApp.pet?.city}</span></div></div>
                    <div className="tracking-timeline">
                        {steps.map((step, index) => { const Icon = step.icon; const done = completedStep(step.key); const rejected = selectedStatus === 'rejected' && index === 2; return <div className={`tracking-step ${done ? 'done' : ''} ${rejected ? 'rejected' : ''}`} key={step.key}><div className="tracking-node">{rejected ? <XCircle size={17}/> : <Icon size={17}/>}</div><div><strong>{rejected ? 'Application declined' : step.label}</strong><small>{done ? (index === 0 ? new Date(selectedApp.createdAt).toLocaleDateString() : 'Status recorded') : 'Waiting for this step'}</small></div></div>; })}
                    </div>
                </div>
                <div className="app-detail-meta"><div><UserRound size={16}/><span><small>Applicant</small><strong>{selectedApp.user?.name || '—'}</strong></span></div><div><MapPin size={16}/><span><small>Pet location</small><strong>{selectedApp.pet?.city || '—'}</strong></span></div><div><CalendarDays size={16}/><span><small>Applied</small><strong>{new Date(selectedApp.createdAt).toLocaleDateString()}</strong></span></div></div>
                <div className="detail-actions">{selectedApp.status !== 'approved' && <button className="primary-btn" onClick={() => status(selectedApp._id, 'approved')}><Check size={16}/>Approve application</button>}{selectedApp.status !== 'rejected' && <button className="outline-btn" onClick={() => status(selectedApp._id, 'rejected')}><X size={16}/>Reject application</button>}<Link className="text-link" to={`/pets/${selectedApp.pet?._id}`}>View pet profile <ChevronRight size={15}/></Link></div>
            </section>}
        </> : <div className="admin-table">
            <div className="table-head"><span>Pet</span><span>Type</span><span>Availability</span><span>Action</span></div>
            {pets.map(p => <div className="table-row" key={p._id}><div><strong>{p.name}</strong><small>{p.breed} · {p.city}</small></div><div>{p.type}</div><span className={`status-pill ${p.adoptionStatus}`}>{p.adoptionStatus.replace('_', ' ')}</span><div className="actions"><Link className="edit-link" to={`/admin/pets/${p._id}`}>Edit</Link><button className="reject" onClick={() => remove(p._id)}><Trash2 /></button></div></div>)}
        </div>}
    </div>
    <div className="api-note"><BarChart3 /> REST API + JWT RBAC + MongoDB + Socket.io + Firebase-ready notifications are active in this build.</div>
    </main>;
}

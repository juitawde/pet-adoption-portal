
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    CheckCircle2,
    Heart,
    MapPin,
    ShieldCheck,
    Send
} from 'lucide-react';
import { io } from 'socket.io-client';
import api, { SOCKET_URL } from '../lib/api';
import { petImages } from '../data/pets';
import { useAuth } from '../context/AuthContext';

export default function PetDetail() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [live, setLive] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { user } = useAuth();
    const nav = useNavigate();

    useEffect(() => {
        let active = true;

        setLoading(true);
        setError(false);
        setPet(null);
        setLive(null);

        api.get(`/pets/${id}`)
            .then(r => {
                if (active) {
                    setPet(r.data);
                }
            })
            .catch(() => {
                if (active) {
                    setError(true);
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        const socket = io(SOCKET_URL);

        socket.on('connect', () => {
            socket.emit('joinPetRoom', id);
        });

        socket.on('petAvailabilityUpdated', d => {
            if (String(d.petId) === String(id)) {
                setLive(d.status);
                setPet(p =>
                    p ? { ...p, adoptionStatus: d.status } : p
                );
            }
        });

        return () => {
            active = false;
            socket.disconnect();
        };
    }, [id]);

    if (loading) {
        return (
            <main className="page">
                <div className="empty">
                    <h2>Loading pet details...</h2>
                    <p>Please wait while we find your companion.</p>
                </div>
            </main>
        );
    }

    if (error || !pet) {
        return (
            <main className="page">
                <div className="empty">
                    <h2>
                        {error
                            ? 'Unable to load pet details'
                            : 'Pet not found'}
                    </h2>
                    <p>
                        {error
                            ? 'Please try again in a moment.'
                            : 'This pet may no longer be available.'}
                    </p>

                    {error && (
                        <button
                            className="primary-btn"
                            onClick={() => nav(0)}
                        >
                            Try again
                        </button>
                    )}

                    <Link className="primary-btn" to="/pets">
                        Back to pets
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="section detail-wrap">
                <Link className="back-link" to="/pets">
                    <ArrowLeft size={16} />
                    Back to pets
                </Link>

                <div className="detail-grid">
                    <div className="detail-gallery">
                        <div className="main-pet-img">
                            <img
                                src={pet.images?.[0] || petImages.dog}
                                alt={pet.name}
                            />

                            <span className={'status ' + pet.adoptionStatus}>
                                {(
                                    live || pet.adoptionStatus
                                ).replace('_', ' ')}
                            </span>
                        </div>

                        <div className="thumbs">
                            {(pet.images || []).map((x, i) => (
                                <img key={i} src={x} alt="" />
                            ))}
                        </div>
                    </div>

                    <div className="detail-copy">
                        <div className="type-chip large">{pet.type}</div>

                        <h1>{pet.name}</h1>

                        <p className="lead">
                            {pet.breed} · {pet.age} {pet.ageUnit} · {pet.gender}
                        </p>

                        <div className="location">
                            <MapPin size={17} />
                            {pet.city}, {pet.state}
                        </div>

                        <p>{pet.description}</p>

                        <div className="trait-list">
                            {(pet.personality || []).map(t => (
                                <span key={t}>{t}</span>
                            ))}
                        </div>

                        <div className="fact-grid">
                            <div>
                                <small>Size</small>
                                <strong>{pet.size}</strong>
                            </div>

                            <div>
                                <small>Vaccinated</small>
                                <strong>{pet.vaccinated ? 'Yes' : 'No'}</strong>
                            </div>

                            <div>
                                <small>Sterilized</small>
                                <strong>{pet.sterilized ? 'Yes' : 'No'}</strong>
                            </div>

                            <div>
                                <small>Shelter</small>
                                <strong>{pet.shelter}</strong>
                            </div>
                        </div>

                        <div className="shelter-box">
                            <div className="shelter-icon">
                                <ShieldCheck />
                            </div>

                            <div>
                                <strong>{pet.shelter}</strong>
                                <span>Verified shelter profile</span>
                            </div>
                        </div>

                        {pet.adoptionStatus === 'adopted' ? (
                            <div className="notice">
                                <CheckCircle2 />
                                This pet has found a home.
                            </div>
                        ) : user ? (
                            <Link
                                className="primary-btn wide"
                                to={`/apply/${pet._id}`}
                            >
                                <Send size={17} />
                                Apply to adopt {pet.name}
                            </Link>
                        ) : (
                            <button
                                className="primary-btn wide"
                                onClick={() =>
                                    nav('/login', {
                                        state: {
                                            from: `/apply/${pet._id}`
                                        }
                                    })
                                }
                            >
                                Sign in to apply
                            </button>
                        )}

                        <button className="save-btn">
                            <Heart size={18} />
                            Save {pet.name}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

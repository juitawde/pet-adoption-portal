import { Link } from 'react-router-dom';
import { Search, FileText, BellRing, HeartHandshake, ArrowRight } from 'lucide-react';
import { petImages } from '../data/pets';
export default function HowItWorks() {
    return <main className="page">
    <section className="how-hero">
    <img src="https://images.unsplash.com/photo-1638255402906-e838358069ab?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
    <div>
        <span className="eyebrow cream">ADOPTION, MADE SIMPLE</span>
        <h1>From “look at that face” to <em>forever home.</em>
    </h1>
    <br></br>
    <p>PetMatch connects adopters with shelter pets through a simple, transparent journey.</p>
    </div>
    </section>
    <section className="section">
    <div className="section-heading centered">
        <div>
            <span className="eyebrow">FOUR LITTLE STEPS</span>
            <h2>How PetMatch works</h2>
        </div>
    </div>
    <div className="steps-grid">{[[Search, '01', 'Discover', 'Browse pets by type, city, size and more.'], [FileText, '02', 'Apply', 'Tell the shelter about your home and experience.'], [BellRing, '03', 'Stay updated', 'Get application status and availability updates.'], [HeartHandshake, '04', 'Meet your match', 'When approved, take the next step with the shelter.']].map(([Icon, n, t, d]) => <div className="step-card" key={n}>
            <span className="step-number">{n}</span>
            <Icon />
            <h3>{t}</h3>
            <p>{d}</p>
        </div>)}</div>
    </section>
    <section className="section mini-banner">
        <div>
            <span className="eyebrow">READY WHEN YOU ARE</span>
            <h2>There’s a whole lot of love waiting.</h2>
            <br></br>
            <Link className="primary-btn" to="/pets">Browse pets <ArrowRight size={17}/>
        </Link>
    </div>
    <img src={petImages.cat3}/>
    </section>
    </main>;
}

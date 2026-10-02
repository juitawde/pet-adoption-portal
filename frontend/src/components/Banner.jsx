import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
export default function Banner({ banner }) {
    return <section className="promo-banner">
    <img src={banner.image} alt="PetMatch"/>
    <div className="promo-overlay"/>
    <motion.div className="promo-content" initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
    <span className="eyebrow">{banner.eyebrow}</span>
    <h2>{banner.title}</h2>
    <p>{banner.text}</p>
    <Link className="light-btn" to={banner.button === 'Take the Quiz' ? '/quiz' : banner.button === 'Explore Animals' ? '/pets?type=rabbit' : '/pets'}>{banner.button}<ArrowRight size={16}/>
    </Link>
    </motion.div>
    </section>;
}

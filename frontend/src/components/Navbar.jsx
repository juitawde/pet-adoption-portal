import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, UserRound, LogOut, Search, Heart } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();
    const nav = useNavigate();
    const links = [['Pets', '/pets'], ['Match Quiz', '/quiz'], ['How it works', '/how-it-works']];
    return <header className="navbar">
    <div className="nav-inner">
        <Link to="/" onClick={() => setOpen(false)}>
            <Logo />
        </Link>
        <nav className={open ? 'nav-links open' : 'nav-links'}>{links.map(([t, p]) => <NavLink key={p} to={p} onClick={() => setOpen(false)}>{t}</NavLink>)}
        </nav>
        <div className="nav-actions">
            <button className="icon-btn" onClick={() => nav('/pets')} aria-label="Search">
                <Search size={19}/>
            </button>
            <button className="icon-btn saved-nav" onClick={() => nav('/saved')} aria-label="Saved pets" title="Saved pets">
                <Heart size={19}/>
            </button>{user ? <>
            <button className="user-pill" onClick={() => nav(user.role === 'admin' ? '/admin' : '/dashboard')}>
                <UserRound size={17}/>
                <span>{user.name.split(' ')[0]}</span>
            </button>
            <button className="icon-btn hide-sm" onClick={logout} title="Logout">
                <LogOut size={18}/>
            </button>
        </> : <button className="primary-btn small" onClick={() => nav('/login')}>Sign in</button>}</div>
        <button className="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    </header>;
}

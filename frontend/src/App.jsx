import { Link, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Pets from './pages/Pets';
import PetDetail from './pages/PetDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Apply from './pages/Apply';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import PetAdminForm from './pages/PetAdminForm';
import Quiz from './pages/Quiz';
import HowItWorks from './pages/HowItWorks';
import Logo from './components/Logo';
import Saved from './pages/Saved';
export default function App() {
    return <>
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/pets" element={<Pets />}/>
    <Route path="/pets/:id" element={<PetDetail />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/quiz" element={<Quiz />}/>
    <Route path="/how-it-works" element={<HowItWorks />}/>
    <Route path="/saved" element={<Saved />}/>
    <Route path="/apply/:id" element={<ProtectedRoute>
        <Apply />
    </ProtectedRoute>}/>
    <Route path="/dashboard" element={<ProtectedRoute>
        <Dashboard />
    </ProtectedRoute>}/>
    <Route path="/admin" element={<ProtectedRoute role="admin">
        <Admin />
    </ProtectedRoute>}/>
    <Route path="/admin/pets/new" element={<ProtectedRoute role="admin">
        <PetAdminForm />
    </ProtectedRoute>}/>
    <Route path="/admin/pets/:id" element={<ProtectedRoute role="admin">
        <PetAdminForm />
    </ProtectedRoute>}/>
    </Routes>
    <footer className="footer">
    <div>
        <Logo />
    <p>Helping good people find good pets.</p>
    </div>
    <div className="footer-links">
    <Link to="/pets">Find a pet</Link>
    <Link to="/quiz">Match quiz</Link>
    <Link to="/how-it-works">How it works</Link>
    <Link to="/login">Sign in</Link>
    </div>
    <small>© 2026 PetMatch · Built for the Backend Development case study</small>
    </footer>
    </>;
}

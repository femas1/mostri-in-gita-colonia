import { NavLink } from 'react-router-dom';
import { Calendar, Train, Utensils, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand" style={{ color: '#fff', textDecoration: 'none' }}>
        <span>👾 Mostri in Gita — Colonia</span>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Sparkles size={16} /> Home
        </NavLink>
        <NavLink to="/programma" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Calendar size={16} /> Programma Orario
        </NavLink>
        <NavLink to="/trasporti" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Train size={16} /> Trasporti
        </NavLink>
      </nav>
    </header>
  );
}
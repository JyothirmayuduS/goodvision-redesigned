import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, ArrowUpRight } from 'lucide-react';
import ChunkyTypographicFooter from './ChunkyTypographicFooter';

const phone1 = '6281012237';
const phoneDisplay = '+91 62810 12237';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <header className="header">
        <div className="container nav">
          <Link to="/" className="brand" onClick={close}>
            <span className="brand-mark">GV</span>
            <span>
              <b>Good Vision</b>
              <small>HOME HEALTH CARE</small>
            </span>
          </Link>

          <nav className={open ? 'nav-links open' : 'nav-links'}>
            <NavLink to="/" end onClick={close}>
              Home
            </NavLink>
            <NavLink to="/about" onClick={close}>
              About
            </NavLink>
            <div className="nav-dropdown">
              <NavLink to="/services" onClick={close}>
                Services <ChevronDown size={14} />
              </NavLink>
              <div className="dropdown-menu">
                <Link to="/baby-newborn-care" onClick={close}>
                  Baby & newborn care
                </Link>
                <Link to="/home-healthcare" onClick={close}>
                  Home healthcare
                </Link>
                <Link to="/nursing-services" onClick={close}>
                  Nursing services
                </Link>
              </div>
            </div>
            <NavLink to="/how-it-works" onClick={close}>
              How it works
            </NavLink>
            <NavLink to="/locations" onClick={close}>
              Locations
            </NavLink>
            <NavLink to="/faqs" onClick={close}>
              FAQs
            </NavLink>
            <NavLink to="/contact" onClick={close}>
              Contact
            </NavLink>
            <Link className="mobile-book" to="/book-a-visit" onClick={close}>
              Book a visit <ArrowUpRight size={16} />
            </Link>
          </nav>

          <div className="nav-actions">
            <a className="nav-phone" href={`tel:${phone1}`}>
              <Phone size={16} />
              <span>{phoneDisplay}</span>
            </a>
            <Link className="button button-primary nav-cta sm" to="/book-a-visit">
              Book a visit
            </Link>
            <button
              className="menu-toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <ChunkyTypographicFooter />

      <a className="mobile-call" href="tel:6281012237">
        <Phone size={17} /> Call Good Vision
      </a>
    </>
  );
}

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Reveal footer: cream content above scrolls away; sticky blue footer underneath.
 */
export default function ChunkyTypographicFooter() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMsg('Enter a valid email.');
      return;
    }
    window.location.href = `mailto:goodvisionhomehealthcare@gmail.com?subject=Care%20updates&body=${encodeURIComponent(email)}`;
    setMsg('Opening mail…');
    setEmail('');
  };

  return (
    <div className="reveal-footer-wrap">
      <section className="reveal-cover" aria-label="Where to find us">
        <div className="reveal-cover-inner">
          <h2 className="reveal-cover-title">Where to find us</h2>
          <div className="reveal-cover-cols">
            <p>
              Visit our nurses in <Link to="/locations">Nellore</Link>,{' '}
              <Link to="/locations">Vijayawada</Link> or{' '}
              <Link to="/locations">Eluru</Link>. Licensed home care for
              families across Andhra Pradesh.
            </p>
            <p>
              Baby & newborn support, home healthcare and professional nursing
              — arranged around your household, not a waiting room.
            </p>
            <p>
              Call the nurse line or{' '}
              <Link to="/book-a-visit">book a visit</Link>. A coordinator will
              confirm availability in your area.
            </p>
          </div>
        </div>
      </section>

      <footer className="reveal-footer" role="contentinfo">
        <div className="diana-pad">
          <div className="diana-logo-wrap">
            <p className="diana-logo-main" aria-label="Good Vision">
              GOOD VISION
            </p>
            <span className="diana-logo-side" aria-hidden="true">
              HOME CARE
            </span>
          </div>

          <div className="diana-content">
            <div className="diana-col diana-col-news">
              <h3 className="diana-heading">Newsletter</h3>
              <form className="diana-form" onSubmit={onSubmit}>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (msg) setMsg(null);
                  }}
                  placeholder="Your mail"
                  aria-label="Email address"
                  required
                />
                <button type="submit" aria-label="Submit">
                  <span>Submit</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </button>
              </form>
              {msg && <p className="diana-msg">{msg}</p>}
            </div>

            <div className="diana-col">
              <h3 className="diana-heading">Nurse line hours</h3>
              <p className="diana-txt">
                Sunday 10am–4pm
                <br />
                Monday–Saturday 8am–8pm
              </p>
            </div>

            <div className="diana-col">
              <h3 className="diana-heading">Service cities</h3>
              <p className="diana-txt">
                Nellore
                <br />
                Vijayawada
                <br />
                Eluru
              </p>
            </div>

            <div className="diana-col">
              <h3 className="diana-heading">Coverage</h3>
              <p className="diana-txt">
                <Link to="/locations" className="diana-link">
                  City & surrounding areas
                  <br />
                  across Andhra Pradesh
                </Link>
              </p>
            </div>

            <div className="diana-col">
              <h3 className="diana-heading">Talk to us</h3>
              <p className="diana-txt">
                <a href="tel:6281012237" className="diana-link">
                  +91 62810 12237
                </a>
                <br />
                <a
                  href="mailto:goodvisionhomehealthcare@gmail.com"
                  className="diana-link"
                >
                  goodvisionhomehealthcare@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="diana-line" />
        </div>
      </footer>
    </div>
  );
}

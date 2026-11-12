import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  HeartHandshake,
  Baby,
  Stethoscope,
  House,
  ShieldCheck,
  Clock3,
  Phone,
} from 'lucide-react';

export const services = [
  {
    icon: Baby,
    title: 'Baby & newborn care',
    desc: 'Gentle, practical support for parents and little ones during the early days at home.',
    to: '/baby-newborn-care',
    n: '01',
  },
  {
    icon: House,
    title: 'Home healthcare',
    desc: 'Support with everyday health needs and recovery in familiar surroundings.',
    to: '/home-healthcare',
    n: '02',
  },
  {
    icon: Stethoscope,
    title: 'Nursing services',
    desc: 'Nursing support arranged around the individual’s needs and care instructions.',
    to: '/nursing-services',
    n: '03',
  },
];

export function PageIntro({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="crumb">
          <Link to="/">Home</Link>
          <span>/</span>
          {eyebrow}
        </div>
        <p className="eyebrow">
          <span className="dot" />
          {eyebrow}
        </p>
        <h1>{title}</h1>
        <p className="intro-desc">{desc}</p>
        <div className="intro-line" />
      </div>
    </section>
  );
}

export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((s) => (
        <Link to={s.to} className="service-card" key={s.n}>
          <div className="service-card-top">
            <span>{s.n}</span>
            <s.icon size={25} />
          </div>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          <span className="text-link">
            Explore service <ArrowUpRight size={16} />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function ContactStrip() {
  return (
    <section className="cta-banner">
      <div className="container cta-banner-inner">
        <div>
          <h2>Not sure what support you need?</h2>
          <p className="cta-sub">
            Tell us a little about your situation. Our team can help you
            understand the next step.
          </p>
        </div>
        <div className="cta-banner-actions">
          <Link className="button button-yellow" to="/book-a-visit">
            Book a call
          </Link>
          <a className="strip-phone" href="tel:6281012237">
            <Phone size={16} /> +91 62810 12237
          </a>
        </div>
      </div>
    </section>
  );
}

export function TrustPoints() {
  return (
    <div className="trust-points">
      <div>
        <ShieldCheck />
        <span>
          <b>Care with dignity</b>
          <small>Respectful, person-centred support</small>
        </span>
      </div>
      <div>
        <HeartHandshake />
        <span>
          <b>Family-aware approach</b>
          <small>Clear communication with families</small>
        </span>
      </div>
      <div>
        <Clock3 />
        <span>
          <b>Discuss your schedule</b>
          <small>Enquire about suitable visit timings</small>
        </span>
      </div>
    </div>
  );
}

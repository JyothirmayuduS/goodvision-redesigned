import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Plus,
  Minus,
  Phone,
  MapPin,
  Clock3,
  Star,
} from 'lucide-react';
import ScratchReveal from '../components/ScratchReveal';

const carePaths = [
  {
    n: '01',
    title: 'Baby & Newborn Care',
    desc: 'Certified baby nurses support feeding, soothing, cord and skin care — and help new parents find their own rhythm at home.',
    to: '/baby-newborn-care',
    img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=400&q=80',
  },
  {
    n: '02',
    title: 'Home Healthcare',
    desc: 'Wound dressing, post-surgery recovery, pressure sore and diabetes care, and IV support — delivered by registered nurses in your own home.',
    to: '/home-healthcare',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
  },
  {
    n: '03',
    title: 'Professional Nursing',
    desc: 'Registered nurses for medication management, clinical monitoring and physician-coordinated care plans that change as recovery does.',
    to: '/nursing-services',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
  },
];

const nurseSkills = [
  {
    n: '01',
    title: 'Wound dressing',
    desc: 'Sterile dressing changes with clear healing notes after every visit.',
  },
  {
    n: '02',
    title: 'Post-surgery care',
    desc: 'The first two weeks home, monitored by a nurse instead of a waiting room.',
  },
  {
    n: '03',
    title: 'Pressure sore care',
    desc: 'Repositioning plans and skin assessment for limited-mobility patients.',
  },
  {
    n: '04',
    title: 'IV support',
    desc: 'Hydration, antibiotics and line care administered safely at home.',
  },
  {
    n: '05',
    title: 'Diabetes care',
    desc: 'Blood sugar monitoring, insulin guidance and foot checks.',
  },
  {
    n: '06',
    title: 'Medication & monitoring',
    desc: 'The routine that keeps a chronic condition stable.',
  },
];

const steps = [
  {
    n: '01',
    title: "Tell us what's happening",
    desc: 'Call or send the form. A care coordinator asks about the condition, the date and the household — once, not five times.',
  },
  {
    n: '02',
    title: 'Free care assessment',
    desc: 'A registered nurse reviews the medical history, the home and the schedule, then writes a plan with you.',
  },
  {
    n: '03',
    title: 'Meet your nurse',
    desc: 'We match a verified nurse to the case and introduce them before the first visit. No rotating strangers.',
  },
  {
    n: '04',
    title: 'Visits, with notes',
    desc: 'Care continues on a set schedule with progress notes after each visit and a coordinator you can actually reach.',
  },
];

const locations = [
  {
    n: '01',
    city: 'Nellore',
    area: 'CITY & SURROUNDING AREAS',
    desc: 'Home nursing, newborn support and recovery care across Nellore service localities.',
  },
  {
    n: '02',
    city: 'Vijayawada',
    area: 'CITY & SURROUNDING AREAS',
    desc: 'Clinical visits arranged around family schedules across Vijayawada neighbourhoods.',
  },
  {
    n: '03',
    city: 'Eluru',
    area: 'CITY & SURROUNDING AREAS',
    desc: 'Trusted nursing support for recovery, chronic care and newborn routines in Eluru.',
  },
];

const face = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=120&h=120&q=80`;

const posters = [
  { quote: 'CALLED SUNDAY NIGHT AFTER DISCHARGE. A NURSE WAS WITH US BY MONDAY MORNING.', name: 'Maya R.', meta: 'Nellore · Home care', tone: 'blue', rot: -12, x: '1%', y: '2%', delay: 0, img: face('photo-1544005313-94ddf0286df2') },
  { quote: 'EIGHT WEEKS OF POST-SURGERY VISITS — SAME NURSE, SAME GENTLE HANDS EVERY TIME.', name: 'Arjun K.', meta: 'Vijayawada · Recovery', tone: 'cream', rot: 10, x: '18%', y: '0%', delay: 30, img: face('photo-1506794778202-cad84cf45f1d') },
  { quote: 'OUR BABY NURSE HELPED WITH FEEDS AND GAVE US OUR FIRST REAL NIGHT OF SLEEP.', name: 'Priya S.', meta: 'Nellore · Newborn', tone: 'cream', rot: -8, x: '36%', y: '4%', delay: 60, img: face('photo-1438761681033-6461ffad8d80') },
  { quote: 'WRITTEN NOTES AFTER EVERY VISIT KEPT SIBLINGS IN OTHER CITIES ON THE SAME PAGE.', name: 'Lakshmi V.', meta: 'Eluru · Elder care', tone: 'blue', rot: 14, x: '54%', y: '1%', delay: 90, img: face('photo-1580489944761-15a19d654956') },
  { quote: 'ONE NURSE BECAME THE PERSON OUR PARENTS ACTUALLY LOOKED FORWARD TO SEEING.', name: 'Rahul M.', meta: 'Nellore · Nursing', tone: 'cream', rot: -6, x: '72%', y: '3%', delay: 120, img: face('photo-1507003211169-0a1dd7228f2d') },
  { quote: 'THEY EXPLAINED THE PLAN, THE TIMING, AND WHAT TO WATCH FOR BETWEEN VISITS.', name: 'Sneha D.', meta: 'Vijayawada · Recovery', tone: 'blue', rot: 8, x: '86%', y: '5%', delay: 150, img: face('photo-1494790108377-be9c29b29330') },
  { quote: 'THE COORDINATOR ALWAYS PICKED UP — THAT ALONE TOOK THE PANIC OUT OF DIABETES CARE.', name: 'Vikram P.', meta: 'Eluru · Diabetes', tone: 'cream', rot: -11, x: '4%', y: '28%', delay: 180, img: face('photo-1500648767791-00dcc994a43e') },
  { quote: 'GENTLE WITH AMMA, FIRM ON THE CLINICAL DETAILS — EXACTLY THE BALANCE WE NEEDED.', name: 'Anitha R.', meta: 'Nellore · Elder care', tone: 'blue', rot: 9, x: '22%', y: '26%', delay: 210, img: face('photo-1573496359142-b8d87734a5a2') },
  { quote: 'WOUND DRESSING AT HOME MEANT NO MORE EXHAUSTING HOSPITAL TRIPS EVERY OTHER DAY.', name: 'Karthik N.', meta: 'Vijayawada · Wound care', tone: 'cream', rot: -14, x: '40%', y: '30%', delay: 240, img: face('photo-1472099645785-5658abf4ff4e') },
  { quote: 'IV SUPPORT FELT LIKE HOSPITAL SKILL WITHOUT THE WAITING ROOM OR THE STRESS.', name: 'Deepa L.', meta: 'Nellore · IV support', tone: 'blue', rot: 7, x: '58%', y: '24%', delay: 270, img: face('photo-1487412720507-e7ab37603c6f') },
  { quote: 'ON TIME EVERY VISIT — WHICH MATTERED WHEN WE WERE JUGGLING WORK AND SCHOOL.', name: 'Suresh B.', meta: 'Nellore · Home care', tone: 'cream', rot: -5, x: '76%', y: '28%', delay: 300, img: face('photo-1519085360753-af0119f7cbe7') },
  { quote: 'THEY EXPLAINED EVERYTHING IN SIMPLE LANGUAGE SO WE COULD CARE BETWEEN VISITS.', name: 'Meena T.', meta: 'Vijayawada · Recovery', tone: 'blue', rot: 11, x: '90%', y: '26%', delay: 330, img: face('photo-1534528741775-53994a69daeb') },
  { quote: 'WE FINALLY FELT LOOKED AFTER — NOT PROCESSED. OUR HOME WAS TREATED WITH RESPECT.', name: 'Farah A.', meta: 'Eluru · Family care', tone: 'cream', rot: -9, x: '2%', y: '52%', delay: 360, img: face('photo-1531746020798-e6953c6e8e04') },
  { quote: 'NO ROTATING STRANGERS. THE SAME FACE AT THE DOOR MADE EVERYTHING EASIER.', name: 'Imran H.', meta: 'Eluru · Nursing', tone: 'blue', rot: 12, x: '20%', y: '50%', delay: 390, img: face('photo-1507591064344-4c6ce005b128') },
  { quote: 'SHOES OFF, SOFT VOICES, CLEAR NOTES LEFT ON THE TABLE — CARE THAT FIT OUR HOME.', name: 'Nisha C.', meta: 'Nellore · Home care', tone: 'cream', rot: -9, x: '38%', y: '54%', delay: 420, img: face('photo-1524504388940-b1c1722653e1') },
  { quote: 'THE BABY NURSE CHANGED OUR NIGHTS. FEEDING FINALLY FELT TEACHABLE, NOT CHAOTIC.', name: 'Kavya M.', meta: 'Nellore · Newborn', tone: 'blue', rot: 6, x: '56%', y: '48%', delay: 450, img: face('photo-1548142813-c348350df52b') },
  { quote: 'AFTER SURGERY, RECOVERY FELT POSSIBLE AGAIN BECAUSE SOMEONE CHECKED ON HIM DAILY.', name: 'Dev P.', meta: 'Vijayawada · Post-surgery', tone: 'cream', rot: -13, x: '74%', y: '52%', delay: 480, img: face('photo-1492562080023-ab3db95bfbce') },
  { quote: 'ALWAYS KIND, ALWAYS PREPARED — WITH THE RIGHT SUPPLIES AND A CALM EXPLANATION.', name: 'Ritu S.', meta: 'Nellore · Nursing', tone: 'blue', rot: 10, x: '88%', y: '50%', delay: 510, img: face('photo-1554151228-14d9def656e4') },
  { quote: 'THEY TREATED AMMA WITH DIGNITY. THAT MATTERED MORE THAN ANYTHING ELSE TO US.', name: 'Ajay V.', meta: 'Eluru · Elder care', tone: 'cream', rot: -7, x: '8%', y: '74%', delay: 540, img: face('photo-1463453091185-61582044d556') },
  { quote: 'FROM THE FIRST CALL TO THE FIRST VISIT TOOK ONE DAY. WE WERE NOT LEFT WAITING.', name: 'Pooja N.', meta: 'Nellore · Urgent care', tone: 'blue', rot: 11, x: '26%', y: '72%', delay: 570, img: face('photo-1529626455594-4ff0802cfb7e') },
  { quote: 'NO CONFUSION — JUST CLEAR STEPS FOR DRESSING CHANGES WE COULD FOLLOW AT HOME.', name: 'Harish L.', meta: 'Vijayawada · Wound care', tone: 'cream', rot: -10, x: '44%', y: '76%', delay: 600, img: face('photo-1501196354665-a84363e80b18') },
  { quote: 'PRESSURE SORE CARE AT HOME KEPT APPU COMFORTABLE WITHOUT MOVING HIM TO A WARD.', name: 'Geetha K.', meta: 'Eluru · Skin care', tone: 'blue', rot: 8, x: '62%', y: '70%', delay: 630, img: face('photo-1489424736984-177c025f54c9') },
  { quote: 'WHEN APPU SPIKED A FEVER AT 11 PM, THE NURSE LINE ACTUALLY ANSWERED.', name: 'Shalini P.', meta: 'Vijayawada · 24/7 line', tone: 'cream', rot: -8, x: '78%', y: '74%', delay: 660, img: face('photo-1594744803329-e58b31de8bf5') },
  { quote: 'WE STOPPED FEARING THE DRESSING CHANGE. SHE MADE IT ROUTINE, NOT A CRISIS.', name: 'Lavanya M.', meta: 'Nellore · Wound care', tone: 'blue', rot: -7, x: '90%', y: '72%', delay: 690, img: face('photo-1589156280159-276398a639bd') },
];

const faqs = [
  [
    'How quickly can a nurse visit?',
    'Most requests are scheduled based on availability. Share your preferred timing when you enquire — urgent post-surgery and newborn support can often be arranged sooner when the team confirms a free slot.',
  ],
  [
    'What happens at the first visit?',
    'A nurse reviews the care need, home setup and instructions from the treating clinician, then agrees the visit plan with your family.',
  ],
  [
    'Do I need a referral from a doctor?',
    'A referral is helpful for clinical procedures. For many home-support needs, start with a conversation — we will tell you what documents help.',
  ],
  [
    'Are your nurses licensed and background checked?',
    'Ask us to confirm the professional’s credentials and the exact scope of the requested service before confirming a visit.',
  ],
  [
    'Will we get the same nurse every visit?',
    'Wherever possible we keep continuity. If a change is needed, the coordinator will explain and introduce the covering nurse.',
  ],
];

const marqueeItems = [
  'Licensed RNs',
  'Same-day visits',
  '24-hour nurse line',
  'Wound dressing',
  'Post-surgery recovery',
  'Newborn care',
  'Diabetes support',
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [scattered, setScattered] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="dot" />
              Home nursing · Nellore · Vijayawada · Eluru
            </p>
            <h1>
              Expert care,
              <br />
              quietly
              <br />
              <span className="mark">at home.</span>
            </h1>
            <p className="hero-lead">
              Certified nurses for newborns, recovering patients and chronic
              conditions — the clinical skill of a hospital, delivered into the
              room where you actually heal.
            </p>
            <div className="hero-buttons">
              <Link to="/book-a-visit" className="button button-primary">
                Book a visit <ArrowUpRight size={16} />
              </Link>
              <Link to="/services" className="button button-outline">
                Explore services
              </Link>
            </div>
            <div className="hero-trust">
              <div className="trust-item">
                <span className="stars" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </span>
                <strong>4.9 · family feedback</strong>
              </div>
              <div className="trust-item">
                <Clock3 size={16} />
                <span>Same-day visits available</span>
              </div>
              <div className="trust-item">
                <MapPin size={16} />
                <span>Nellore · Vijayawada · Eluru</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="arch-frame hero-arch">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=85"
                alt="Home health nurse with an older patient"
              />
            </div>
            <div className="hero-card">
              <p className="card-kicker">Nurse line</p>
              <p className="card-title">24/7</p>
              <p className="card-copy">
                Answered by our care team — not a call centre script.
              </p>
              <a href="tel:6281012237">
                <Phone size={14} /> +91 62810 12237
              </a>
            </div>
            <div className="hero-badge">
              <small>Often</small>
              <strong>Same-day</strong>
              <small>visits</small>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee marquee-blue" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={`${item}-${i}`}>
              {item}
              <i />
            </span>
          ))}
        </div>
      </div>

      <section className="section section-white sticky-section">
        <div className="container approach-grid">
          <div className="sticky-panel">
            <p className="eyebrow">
              <span className="dot" />
              Our approach
            </p>
            <h2>
              We bring the clinical skill of a hospital into the rooms where
              people actually heal.
            </h2>
            <Link className="text-link underlined" to="/about">
              Meet the team behind the visits <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="approach-copy">
            <p>
              Good Vision began with a simple belief: recovery happens better at
              home, surrounded by your own things, your own food, your own
              people.
            </p>
            <p className="muted">
              Every nurse is licensed and carefully selected. Every visit ends
              with a clear note. Every family gets a coordinator who answers the
              phone.
            </p>
            <div className="stat-row">
              <div>
                <strong>
                  12<span>yrs</span>
                </strong>
                <span>Caring for families at home</span>
              </div>
              <div>
                <strong>
                  4,800<span>+</span>
                </strong>
                <span>Home visits completed</span>
              </div>
              <div>
                <strong>
                  40<span>+</span>
                </strong>
                <span>Licensed nurses & caregivers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft paths-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="dot" />
                Three ways we help
              </p>
              <h2>
                Care, organised
                <br />
                around a life.
              </h2>
              <p className="section-lead">
                One team, three paths in. Choose the one that matches the moment
                you are in — or let a coordinator help you decide.
              </p>
            </div>
            <Link to="/services" className="button button-outline sm">
              All services <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="service-rows">
            {carePaths.map((s) => (
              <Link to={s.to} className="service-row" key={s.n}>
                <div className="service-row-title">
                  <span>{s.n}</span>
                  <h3>{s.title}</h3>
                </div>
                <div className="service-row-mid">
                  <p>{s.desc}</p>
                  <div className="service-thumb">
                    <img src={s.img} alt="" />
                  </div>
                </div>
                <span className="service-row-action">
                  Explore
                  <span className="icon-circle">
                    <ArrowUpRight size={16} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-blush">
        <div className="container blush-split">
          <div className="blush-visual">
            <div className="arch-frame feature-arch">
              <img
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1000&q=85"
                alt="Mother with newborn and care support"
              />
            </div>
            <div className="mini-card">
              <small>Night support</small>
              <strong>2–12 hour shifts</strong>
            </div>
          </div>
          <div className="feature-copy">
            <p className="eyebrow blush">
              <span className="dot blush" />
              Baby & newborn care
            </p>
            <h2>
              The first weeks
              <br />
              are not meant
              <br />
              to be survived.
            </h2>
            <p>
              A certified baby nurse joins your household for a few hours or a
              few weeks — teaching feeding, soothing and cord care, and giving a
              recovering mother the sleep that makes everything else possible.
            </p>
            <div className="bullet-grid">
              <span>
                <i /> Feeding & latching support
              </span>
              <span>
                <i /> Soothing & sleep routines
              </span>
              <span>
                <i /> Bathing and cord care
              </span>
              <span>
                <i /> Postpartum recovery checks
              </span>
            </div>
            <Link to="/baby-newborn-care" className="button button-primary">
              Explore baby care <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-white sticky-section">
        <div className="container clinical-grid">
          <div className="sticky-panel">
            <p className="eyebrow">
              <span className="dot" />
              Clinical index
            </p>
            <h2>
              What a nurse
              <br />
              can do at home.
            </h2>
            <p className="section-lead">
              Verified procedures, delivered by registered nurses with written
              notes after every visit.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="button button-outline sm">
                All services <ArrowUpRight size={16} />
              </Link>
              <Link to="/contact" className="text-cta">
                Ask about a procedure
              </Link>
            </div>
            <p className="note">
              Not sure what you need? A coordinator will match the procedure to
              the situation before anyone visits.
            </p>
          </div>
          <div className="clinical-list">
            {nurseSkills.map((s) => (
              <article key={s.n} className="clinical-item">
                <span>{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="dot" />
                How it works
              </p>
              <h2>
                From first call
                <br />
                to settled care.
              </h2>
            </div>
            <Link to="/how-it-works" className="button button-outline sm">
              The full process <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="process-grid">
            {steps.map((s) => (
              <article key={s.n} className="process-card">
                <div className="process-head">
                  <span>{s.n}</span>
                  <h3>{s.title}</h3>
                </div>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`scratch-section ${scattered ? 'is-revealed' : ''}`}>
        <div className="container quote-top">
          <div>
            <p className="eyebrow light">
              <span className="dot light" />
              Families we now call friends
            </p>
            <h2>
              One scratch,
              <br />
              <em>families all over the table.</em>
            </h2>
            <p className="quote-sub">
              Scratch the stamp. Reviews burst out across the board —
              postage-card notes from real Good Vision families.
            </p>
          </div>
          <div className="quote-rating-block">
            <div className="quote-rating">
              <strong>4.9</strong>
              <div>
                <span className="stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </span>
                <small>860 verified reviews</small>
              </div>
            </div>
          </div>
        </div>

        <div className="scratch-stage">
          <div className="scratch-rail" aria-hidden="true">
            <div className="scratch-rail-track">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i}>Scratch</span>
              ))}
            </div>
          </div>

          <div className={`poster-board ${scattered ? 'show' : ''}`}>
            {posters.map((p) => (
              <article
                key={`${p.name}-${p.quote}`}
                className={`poster-card stamp tone-${p.tone}`}
                style={{
                  ['--tx' as string]: p.x,
                  ['--ty' as string]: p.y,
                  ['--rot' as string]: `${p.rot}deg`,
                  ['--delay' as string]: `${p.delay}ms`,
                }}
              >
                <p>{p.quote}</p>
                <footer className="poster-foot">
                  <div className="poster-who">
                    <b>{p.name}</b>
                    <span>{p.meta}</span>
                  </div>
                  <img
                    className="poster-avatar"
                    src={p.img}
                    alt=""
                    width={36}
                    height={36}
                    loading="lazy"
                  />
                </footer>
              </article>
            ))}
          </div>

          <ScratchReveal
            scattered={scattered}
            onReveal={() => setScattered(true)}
          />
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="dot" />
                Where we visit
              </p>
              <h2>Three teams, one standard.</h2>
              <p className="section-lead">
                Our nurses serve the neighbourhoods they know, which is why
                visits start on time.
              </p>
            </div>
            <Link to="/locations" className="button button-outline sm">
              Coverage & hours <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="visit-grid">
            {locations.map((loc) => (
              <article key={loc.city} className="visit-card">
                <div className="visit-top">
                  <h3>{loc.city}</h3>
                  <span>{loc.n}</span>
                </div>
                <p className="visit-area">{loc.area}</p>
                <p>{loc.desc}</p>
                <Link to="/locations" className="visit-link">
                  Get directions <ArrowUpRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white sticky-section">
        <div className="container faq-home">
          <div className="sticky-panel">
            <p className="eyebrow">
              <span className="dot" />
              FAQs
            </p>
            <h2>
              Questions families
              <br />
              ask us.
            </h2>
            <Link to="/faqs" className="button button-outline sm">
              All questions <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <article
                className={openFaq === i ? 'faq-item active' : 'faq-item'}
                key={q}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{q}</span>
                  <span className="faq-icon">
                    {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                  </span>
                </button>
                {openFaq === i && <p>{a}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="cta-orb" aria-hidden="true" />
        <div className="container cta-banner-inner">
          <div>
            <p className="eyebrow light">
              <span className="dot light" />
              Start here
            </p>
            <h2>Let’s plan the first visit.</h2>
            <div className="cta-trust">
              <span>Licensed nurses</span>
              <span>Free care assessment</span>
              <span>Reply in one business day</span>
            </div>
          </div>
          <div className="cta-right">
            <p>
              Tell us what is happening and a care coordinator will call you
              within one business day. No obligation, no pressure.
            </p>
            <div className="cta-banner-actions">
              <Link to="/book-a-visit" className="button button-yellow">
                Book a consultation <ArrowUpRight size={16} />
              </Link>
              <a className="button button-ghost" href="tel:6281012237">
                <Phone size={16} /> +91 62810 12237
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

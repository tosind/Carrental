import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BatteryCharging,
  CalendarDays,
  Car,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Zap
} from 'lucide-react';
import './styles.css';

const DAILY_RATE = 199;
const DEFAULT_PICKUP = '2026-07-03';
const DEFAULT_RETURN = '2026-07-05';

const proofItems = [
  { icon: Zap, title: '100% Electric', text: 'Clean, quiet, instant torque' },
  { icon: Clock3, title: 'No Counter', text: 'Reserve online and roll out' },
  { icon: ShieldCheck, title: 'Insured', text: 'Premium coverage included' },
  { icon: Star, title: '5-Star Ready', text: 'Built to win better bookings' }
];

const specs = [
  ['Up to 341 mi', 'Range estimate'],
  ['AWD', 'Dual Motor'],
  ['5 seats', 'Premium interior'],
  ['Supercharger', 'Network access']
];

const benefits = [
  { icon: Car, title: 'Airport, Delivered', text: 'Meet at arrivals or choose a delivery address.' },
  { icon: CalendarDays, title: 'Flexible & Easy', text: 'Change or extend your trip without counter lines.' },
  { icon: Smartphone, title: 'Digitally Seamless', text: 'Check in, unlock, and go from your phone.' },
  { icon: Heart, title: 'Made for Every Trip', text: 'Business travel, date nights, weekends, and everything between.' }
];

const reviews = [
  ['Jason M.', 'Business traveler', 'Super easy from start to finish. The car was spotless and pickup was seamless.'],
  ['Priya S.', 'Weekend traveler', 'Perfect for our weekend getaway. Charged fast, drove amazing, and customer service was top notch.'],
  ['Daniel & Maya', 'Date night', 'Made our anniversary extra special. The Model 3 is a joy to drive.']
];

const faqs = [
  ['How does pickup and delivery work?', 'Choose airport pickup, a delivery address, or a local handoff spot. We confirm the exact details after your request.'],
  ['Do I need to charge the car before returning?', 'Return it with the same charge level when possible. We can also handle recharge for a simple pass-through fee.'],
  ["What's included in the rate?", 'Insurance coverage, 200 miles per day, basic cleaning, and digital trip support are included.'],
  ['What if I need to extend my trip?', 'Send an extension request before your return time. If the vehicle is available, we update the booking.'],
  ['Is there a mileage limit?', 'Yes. The standard rate includes 200 miles per day, with extra miles billed at $0.45 per mile.'],
  ['What insurance coverage is included?', 'Premium rental coverage is included. Additional protection options can be added before pickup.']
];

function daysBetween(start, end) {
  const from = new Date(`${start}T12:00:00`);
  const to = new Date(`${end}T12:00:00`);
  const diff = Math.ceil((to - from) / 86400000);
  return Number.isFinite(diff) && diff > 0 ? diff : 1;
}

function BookingPanel() {
  const [pickup, setPickup] = useState(DEFAULT_PICKUP);
  const [dropoff, setDropoff] = useState(DEFAULT_RETURN);
  const [location, setLocation] = useState('Toronto Pearson International Airport');
  const [submitted, setSubmitted] = useState(false);
  const days = useMemo(() => daysBetween(pickup, dropoff), [pickup, dropoff]);
  const estimate = days * DAILY_RATE;

  function submitBooking(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="booking-card" onSubmit={submitBooking}>
      <h2>Check availability</h2>
      <div className="form-grid">
        <label>
          <span>Pickup</span>
          <input type="date" value={pickup} onChange={(event) => setPickup(event.target.value)} />
        </label>
        <label>
          <span>Return</span>
          <input type="date" value={dropoff} onChange={(event) => setDropoff(event.target.value)} />
        </label>
      </div>
      <label>
        <span>Location</span>
        <select value={location} onChange={(event) => setLocation(event.target.value)}>
          <option>Toronto Pearson International Airport</option>
          <option>Downtown Toronto</option>
          <option>Mississauga delivery</option>
          <option>Custom address</option>
        </select>
      </label>
      <div className="estimate">
        <div>
          <strong>Estimated total</strong>
          <span>{days} day{days === 1 ? '' : 's'} · {days * 200} miles included</span>
        </div>
        <b>${estimate.toLocaleString()}</b>
      </div>
      <button className="primary full" type="submit">Check availability</button>
      {submitted && (
        <p className="success">Request started for {location}. Add payment and driver details in the next step.</p>
      )}
    </form>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="VoltRide Rentals home">
        <span><Zap size={22} fill="currentColor" /></span>
        VoltRide Rentals
      </a>
      <nav>
        <a href="#fleet">Fleet</a>
        <a href="#rates">Rates</a>
        <a href="#experience">Experience</a>
        <a href="#faq">FAQ</a>
      </nav>
      <a className="header-cta" href="#book">Book now</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <img src="/model-3-waterfront.png" alt="" />
      </div>
      <div className="hero-content">
        <div className="hero-copy">
          <span className="hero-tag">Tesla Model 3 Rental</span>
          <h1>Book the Tesla. Skip the counter.</h1>
          <p>Premium electric driving with airport pickup, transparent pricing, and a fast online booking flow.</p>
          <div className="hero-actions">
            <a className="primary" href="#book">Check availability</a>
            <a className="secondary" href="#rates">See rates</a>
          </div>
        </div>
        <div id="book" className="booking-wrap">
          <BookingPanel />
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Rental highlights">
      {proofItems.map(({ icon: Icon, title, text }) => (
        <div className="proof-item" key={title}>
          <Icon size={34} strokeWidth={1.6} />
          <div>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        </div>
      ))}
    </section>
  );
}

function VehicleSection() {
  return (
    <section className="vehicle-section" id="fleet">
      <div className="vehicle-photo">
        <img src="/model-3-waterfront.png" alt="Charcoal Tesla Model 3 parked by a waterfront skyline" />
      </div>
      <div className="vehicle-copy" id="rates">
        <p className="section-label">The EV experience</p>
        <h2>Tesla Model 3 Long Range</h2>
        <div className="spec-grid">
          {specs.map(([title, text]) => (
            <div className="spec" key={title}>
              <Sparkles size={24} />
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="rate-row">
          <div><span>Daily rate</span><strong>$199/day</strong></div>
          <div><span>Included</span><strong>200 miles/day</strong></div>
          <div><span>Extra mile</span><strong>$0.45/mile</strong></div>
        </div>
        <div className="charge-note">
          <Zap size={24} fill="currentColor" />
          <p><strong>Save on fuel.</strong> We show nearby charging options before pickup.</p>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="benefits" id="experience">
      <p className="section-label">Built around you</p>
  <h2>More than a rental. It's your time.</h2>
      <div className="benefit-grid">
        {benefits.map(({ icon: Icon, title, text }) => (
          <article className="benefit" key={title}>
            <Icon size={32} strokeWidth={1.5} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews">
      <p className="section-label">Loved by drivers</p>
      <h2>Real reviews from real renters.</h2>
      <div className="review-grid">
        {reviews.map(([name, role, quote], index) => (
          <article className="review" key={name}>
            <div className="stars" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <Star key={starIndex} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p>“{quote}”</p>
            <div className="avatar-row">
              <span>{name.slice(0, 1)}</span>
              <div><strong>{name}</strong><small>{role}</small></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq">
      <p className="section-label">FAQ</p>
      <h2>Common questions</h2>
      <div className="faq-grid">
        {faqs.map(([question, answer], index) => (
          <button className={`faq-item ${open === index ? 'open' : ''}`} key={question} onClick={() => setOpen(open === index ? -1 : index)}>
            <span>{question}</span>
            <ChevronDown size={18} />
            {open === index && <p>{answer}</p>}
          </button>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div>
        <h2>Ready to drive electric?</h2>
        <p>Reserve your Tesla Model 3 in minutes.</p>
        <a className="primary" href="#book">Check availability</a>
      </div>
      <img src="/model-3-waterfront.png" alt="" />
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <a className="brand footer-brand" href="#top"><span><Zap size={20} fill="currentColor" /></span>VoltRide Rentals</a>
        <p>Premium EV rentals. Seamless from start to finish.</p>
      </div>
      <div className="footer-links">
        <a href="#fleet">Company</a>
        <a href="#faq">Support</a>
        <a href="#book">Book now</a>
      </div>
      <p className="copyright">&copy; 2026 VoltRide Rentals. All rights reserved.</p>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProofStrip />
        <VehicleSection />
        <Benefits />
        <Reviews />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);

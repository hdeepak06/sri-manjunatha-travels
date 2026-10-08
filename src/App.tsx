import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import "./index.css";

const displayPhone = "+91 80883 81775";
const cleanPhone = "918088381775";

const images = {
  hero: "/assets/hampi-sunset.png",
  traveller: "/assets/traveller.png",
  fleet: "/assets/fleet-convoy.png",
  innova: "/assets/premium-innova.png",
  decoratedTraveller: "/assets/decorated-traveller.png",
  decoratedCar: "/assets/decorated-car.png",
  office: "/assets/office.png",
  interior: "/assets/bus-interior.png",
  bus: "/assets/large-bus.png",
  largeBus: "/assets/large-bus.png",
  carInterior: "/assets/car-interior.png",
  night: "/assets/fleet-night.png",
  night2: "/assets/fleet-night-2.png",
  road: "/assets/road-convoy.png",
  sedan: "/assets/sedan.png",
  rear: "/assets/traveller-rear.png",
};

function sendWhatsAppMessage(message: string) {
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* ==========================================================================
   BOOKING FORM COMPONENT
   ========================================================================== */

interface BookingFormProps {
  selectedVehicle: string;
  onVehicleChange: (vehicle: string) => void;
}

function BookingForm({ selectedVehicle, onVehicleChange }: BookingFormProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [from, setFrom] = useState("Hosapete");
  const [to, setTo] = useState("Hampi");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!mobile.trim()) {
      setErrorMsg("Please enter your mobile number.");
      return;
    }
    if (!from.trim()) {
      setErrorMsg("Please enter the pickup location.");
      return;
    }
    if (!to.trim()) {
      setErrorMsg("Please enter the destination.");
      return;
    }
    if (!date) {
      setErrorMsg("Please select your travel date.");
      return;
    }
    if (!time) {
      setErrorMsg("Please specify pickup time.");
      return;
    }

    setErrorMsg("");

    const message = `Hello Sri Manjunatha Tours & Travels,

I want to book a vehicle.

Name: ${name.trim()}
Mobile: ${mobile.trim()}
From: ${from.trim()}
To: ${to.trim()}
Date: ${date}
Time: ${time}
Vehicle: ${selectedVehicle}
Passengers: ${passengers}`;

    sendWhatsAppMessage(message);
  };

  return (
    <motion.div
      className="booking-form-box"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <form onSubmit={handleSubmit} className="booking-form-grid">
        <div className="form-group">
          <label htmlFor="booking-name">Name *</label>
          <input
            id="booking-name"
            type="text"
            required
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="booking-mobile">Mobile Number *</label>
          <input
            id="booking-mobile"
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="booking-from">From *</label>
          <input
            id="booking-from"
            type="text"
            required
            placeholder="Hosapete / Railway Stn / Hotel"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="booking-to">To *</label>
          <input
            id="booking-to"
            type="text"
            required
            placeholder="Hampi / Badami / Bangalore"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="booking-date">Date *</label>
          <input
            id="booking-date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="booking-time">Time *</label>
          <input
            id="booking-time"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="booking-vehicle">Vehicle *</label>
          <select
            id="booking-vehicle"
            value={selectedVehicle}
            onChange={(e) => onVehicleChange(e.target.value)}
          >
            <option value="Traveller">Traveller (Tempo Traveller)</option>
            <option value="Car">Car (Comfortable Taxi)</option>
            <option value="Innova">Innova (Toyota Innova Crysta)</option>
            <option value="Sedan">Sedan (Executive Sedan)</option>
            <option value="Bus">Bus (Mini / Full Coach)</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="booking-passengers">Passengers *</label>
          <select
            id="booking-passengers"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Passenger" : "Passengers"}
              </option>
            ))}
          </select>
        </div>

        {errorMsg && (
          <p
            style={{
              gridColumn: "1 / -1",
              color: "#c0392b",
              fontSize: "13px",
              fontWeight: 500,
            }}
          >
            {errorMsg}
          </p>
        )}

        <button type="submit" className="booking-submit-btn">
          <span>SEND BOOKING ON WHATSAPP →</span>
        </button>

        <p className="booking-privacy-note">
          Submitting will launch WhatsApp with your pre-filled travel details.
          Our Hosapete dispatch team responds promptly to confirm your booking.
        </p>
      </form>
    </motion.div>
  );
}

/* ==========================================================================
   MAIN APP COMPONENT
   ========================================================================== */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("Traveller");
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      lenis.destroy();
    };
  }, []);

  const goTo = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, { offset: -60, duration: 1.3 });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const selectVehicleAndBook = (vehicleName: string) => {
    setSelectedVehicle(vehicleName);
    goTo("booking");
  };

  return (
    <div className="site-wrapper">
      {/* ====================================================================
          NAVBAR
          ==================================================================== */}
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <button
          className="navbar-brand"
          onClick={() => goTo("home")}
          aria-label="Sri Manjunatha Tours and Travels"
        >
          <strong>SRI MANJUNATHA</strong>
          <span>TOURS & TRAVELS</span>
        </button>

        <nav className="nav-links">
          <button onClick={() => goTo("home")}>HOME</button>
          <button onClick={() => goTo("journey")}>JOURNEY</button>
          <button onClick={() => goTo("fleet")}>FLEET</button>
          <button onClick={() => goTo("hampi")}>HAMPI</button>
          <button onClick={() => goTo("booking")}>BOOKING</button>
        </nav>

        <div className="nav-actions">
          <a href={`tel:${cleanPhone}`} className="nav-call-btn">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>{displayPhone}</span>
          </a>
        </div>

        <button
          className={`hamburger-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu-overlay ${menuOpen ? "open" : ""}`}>
        <nav className="mobile-menu-nav">
          <button onClick={() => goTo("home")}>Home</button>
          <button onClick={() => goTo("journey")}>Journey</button>
          <button onClick={() => goTo("fleet")}>Fleet</button>
          <button onClick={() => goTo("hampi")}>Hampi</button>
          <button onClick={() => goTo("booking")}>Booking</button>
        </nav>

        <div className="mobile-menu-footer">
          <a href={`tel:${cleanPhone}`} className="btn-gold">
            Call {displayPhone}
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              sendWhatsAppMessage(
                "Hello Sri Manjunatha Tours & Travels, I would like to enquire about travel."
              );
            }}
            className="btn-outline"
          >
            Chat on WhatsApp
          </button>
        </div>
      </div>

      {/* ====================================================================
          HERO SECTION
          ==================================================================== */}
      <section className="hero-section" id="home">
        <div className="hero-bg-container">
          <img
            src={images.hero}
            alt="Golden sunset over ancient boulders of Hampi"
            className="hero-bg-image"
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <motion.p
            className="eyebrow center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            HOSAPETE • HAMPI • KARNATAKA
          </motion.p>

          <h1 className="hero-brand-name">
            SRI
            <br />
            MANJUNATHA
          </h1>

          <div className="gold-line center" />

          <motion.h3
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            TOURS & TRAVELS
          </motion.h3>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
          >
            Your journey through Hampi begins here.
          </motion.p>

          <motion.button
            className="btn-hero-journey"
            onClick={() => goTo("booking")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Book your journey with Sri Manjunatha Tours & Travels"
          >
            <span className="btn-hero-shimmer" />
            <span className="btn-hero-text">BOOK YOUR JOURNEY</span>
            <span className="btn-hero-icon-circle">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </motion.button>
        </div>

        <div className="hero-scroll-indicator">
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ====================================================================
          JOURNEY SECTION
          ==================================================================== */}
      <section className="cinematic-scene" id="journey">
        <img
          src={images.fleet}
          alt="Sri Manjunatha travels convoy on highway"
          className="cinematic-bg"
        />
        <div className="cinematic-overlay-gradient" />

        <div className="cinematic-content">
          <motion.div
            className="cinematic-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow">THE JOURNEY</p>

            <h2 className="editorial-title">
              Travel is not
              <br />
              <em className="serif-italic">just movement.</em>
            </h2>

            <p className="lead-text">
              It is the road, the people, the places and the memories you carry
              with you.
            </p>

            <p className="body-text">
              From Hosapete to the ancient stones of Hampi, enjoy the journey
              with Sri Manjunatha Tours & Travels. We deliver uncompromised
              punctuality, courteous local drivers, and pristine fleet comfort
              across every mile.
            </p>

            <div className="stats-grid">
              <div className="stat-item">
                <strong>15+</strong>
                <span>Years Local Mastery</span>
              </div>
              <div className="stat-item">
                <strong>100%</strong>
                <span>Punctual Pickups</span>
              </div>
              <div className="stat-item">
                <strong>24/7</strong>
                <span>Hosapete Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          FLEET INTRO SECTION
          ==================================================================== */}
      <section className="fleet-intro-scene" id="fleet">
        <img
          src={images.traveller}
          alt="Sri Manjunatha luxury Tempo Traveller"
          className="cinematic-bg"
        />
        <div className="cinematic-overlay-gradient right-oriented" />

        <div className="cinematic-content">
          <motion.div
            className="cinematic-card right-align"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow">OUR FLEET</p>

            <h2 className="editorial-title">
              Choose your
              <br />
              <em className="serif-italic">way to travel.</em>
            </h2>

            <p className="lead-text">
              Comfortable travel for journeys around Hosapete and Hampi.
            </p>

            <p className="body-text">
              Whether you need an executive sedan for a swift airport drop, an
              Innova Crysta for private temple hopping, or a spacious Force
              Traveller for multi-family heritage tours, our vehicles are kept
              in showroom condition.
            </p>

            <button
              className="btn-outline"
              onClick={() => goTo("vehicles")}
            >
              <span>EXPLORE FLEET</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          VEHICLES SHOWCASE
          ==================================================================== */}
      <section className="vehicles-section" id="vehicles">
        <div className="section-header">
          <p className="eyebrow">THE FLEET</p>
          <h2 className="editorial-title">
            Built for
            <br />
            <em className="serif-italic">the road ahead.</em>
          </h2>
          <p className="section-description">
            Four specialized tiers of comfort designed to accommodate solo
            explorers, family vacationers, and grand tour delegations across
            Karnataka.
          </p>
        </div>

        <div className="vehicles-grid">
          {/* VEHICLE 01 */}
          <motion.article
            className="vehicle-editorial-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="vehicle-image-wrapper">
              <span className="vehicle-index-badge">01</span>
              <span className="vehicle-capacity-tag">6–7 SEATER</span>
              <img
                src={images.innova}
                alt="Toyota Innova Crysta luxury tour vehicle"
              />
            </div>
            <div className="vehicle-card-body">
              <span className="vehicle-model-pill">Toyota Innova Crysta</span>
              <h3>Premium Travel</h3>
              <p>
                The gold standard in Indian highway travel. Plush captain
                seating, whisper-quiet cabin insulation, and dual climate
                control for private family tours and executive transfers.
              </p>
              <ul className="vehicle-features-list">
                <li>Dual Climate AC</li>
                <li>Leather Captain Seats</li>
                <li>Hampi Heritage Guides Available</li>
                <li>Ample Luggage Trunk</li>
              </ul>
              <div className="vehicle-cta-row">
                <button
                  className="vehicle-quick-book-btn"
                  onClick={() => selectVehicleAndBook("Innova")}
                >
                  RESERVE INNOVA →
                </button>
              </div>
            </div>
          </motion.article>

          {/* VEHICLE 02 */}
          <motion.article
            className="vehicle-editorial-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="vehicle-image-wrapper">
              <span className="vehicle-index-badge">02</span>
              <span className="vehicle-capacity-tag">12–20 SEATER</span>
              <img
                src={images.decoratedTraveller}
                alt="Decorated Force Tempo Traveller for group travel"
              />
            </div>
            <div className="vehicle-card-body">
              <span className="vehicle-model-pill">Force Tempo Traveller</span>
              <h3>Group Travel</h3>
              <p>
                Spacious high-roof design with individual reclining pushback
                seats. Ideal for joint families, pilgrimage groups to Virupaksha
                Temple, and group excursions.
              </p>
              <ul className="vehicle-features-list">
                <li>12 to 20 Pushback Seats</li>
                <li>High Roof Walk-In Clearance</li>
                <li>Audio-Visual System</li>
                <li>Top Carrier for Extra Bags</li>
              </ul>
              <div className="vehicle-cta-row">
                <button
                  className="vehicle-quick-book-btn"
                  onClick={() => selectVehicleAndBook("Traveller")}
                >
                  RESERVE TRAVELLER →
                </button>
              </div>
            </div>
          </motion.article>

          {/* VEHICLE 03 */}
          <motion.article
            className="vehicle-editorial-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="vehicle-image-wrapper">
              <span className="vehicle-index-badge">03</span>
              <span className="vehicle-capacity-tag">4 SEATER</span>
              <img
                src={images.sedan}
                alt="Comfortable executive sedan for swift road travel"
              />
            </div>
            <div className="vehicle-card-body">
              <span className="vehicle-model-pill">Executive Sedans</span>
              <h3>Car Travel</h3>
              <p>
                Agile and comfortable sedans for couples, business travelers,
                and swift hops between Hosapete Railway Junction, Tungabhadra
                Dam, and local hotels.
              </p>
              <ul className="vehicle-features-list">
                <li>Swift City & Outstation</li>
                <li>Chilled Air Conditioning</li>
                <li>Clean Sanitized Interiors</li>
                <li>Door-to-Door Service</li>
              </ul>
              <div className="vehicle-cta-row">
                <button
                  className="vehicle-quick-book-btn"
                  onClick={() => selectVehicleAndBook("Sedan")}
                >
                  RESERVE SEDAN →
                </button>
              </div>
            </div>
          </motion.article>

          {/* VEHICLE 04 */}
          <motion.article
            className="vehicle-editorial-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="vehicle-image-wrapper">
              <span className="vehicle-index-badge">04</span>
              <span className="vehicle-capacity-tag">30–50 SEATER</span>
              <img
                src={images.largeBus}
                alt="Luxury tour coach for large groups"
              />
            </div>
            <div className="vehicle-card-body">
              <span className="vehicle-model-pill">Luxury Tour Coaches</span>
              <h3>Large Groups</h3>
              <p>
                Grand travel solutions for wedding parties, educational tours,
                pilgrim groups, and corporate conferences visiting the ruins
                and monuments of Hampi.
              </p>
              <ul className="vehicle-features-list">
                <li>Air Suspension Comfort</li>
                <li>Large Underbody Boot Space</li>
                <li>Experienced Highway Captains</li>
                <li>Interstate Permits Readily Available</li>
              </ul>
              <div className="vehicle-cta-row">
                <button
                  className="vehicle-quick-book-btn"
                  onClick={() => selectVehicleAndBook("Bus")}
                >
                  RESERVE BUS →
                </button>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ====================================================================
          COMFORT SECTION
          ==================================================================== */}
      <section className="comfort-scene" id="comfort">
        <img
          src={images.interior}
          alt="Spacious clean luxury vehicle interior"
          className="cinematic-bg"
        />
        <div className="cinematic-overlay-gradient" />

        <div className="cinematic-content">
          <motion.div
            className="cinematic-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1 }}
          >
            <p className="eyebrow">COMFORT</p>

            <h2 className="editorial-title">
              The destination
              <br />
              starts before
              <br />
              <em className="serif-italic">you arrive.</em>
            </h2>

            <p className="lead-text">Sit back. Relax. Enjoy the road.</p>

            <p className="body-text">
              Every vehicle in our Hosapete hub undergoes rigorous daily checks,
              deep sanitation, and thorough air conditioning inspections so
              your family stays relaxed through dusty afternoon trails and long
              scenic highway stretches.
            </p>

            <div className="comfort-features-row">
              <div className="comfort-feat-card">
                <strong>Pushback Seats</strong>
                <p>Ergonomic recliners for effortless long-distance posture.</p>
              </div>
              <div className="comfort-feat-card">
                <strong>Pure Cleanliness</strong>
                <p>Disinfected after every trip with spotless upholstery.</p>
              </div>
              <div className="comfort-feat-card">
                <strong>Local Chauffeurs</strong>
                <p>Well-mannered drivers with intimate knowledge of Hampi.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          TRAVEL MOMENTS (OVERLAPPING EDITORIAL)
          ==================================================================== */}
      <section className="moments-section" id="moments">
        <div className="section-header center-header">
          <p className="eyebrow center">TRAVEL MOMENTS</p>
          <h2 className="editorial-title">
            More than a
            <br />
            <em className="serif-italic">ride.</em>
          </h2>
          <p className="section-description" style={{ margin: "20px auto 0" }}>
            From our central Hosapete counter to celebratory wedding convoys, we
            take pride in being part of your life's memorable journeys.
          </p>
        </div>

        <div className="moments-overlapping-wrapper">
          {/* MOMENT 1 */}
          <motion.div
            className="moment-card moment-card-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9 }}
          >
            <div className="moment-img-box">
              <img
                src={images.office}
                alt="Sri Manjunatha Tours & Travels office in Hosapete"
              />
            </div>
            <div className="moment-caption-overlay">
              <span className="moment-tag">HOSAPETE HQ</span>
              <h3>Meet us in Hosapete</h3>
              <p>
                Visit our central hub on 100 Bed Hospital Road near Auto Stop.
                Enjoy face-to-face itinerary planning and genuine local hospitality.
              </p>
            </div>
          </motion.div>

          {/* MOMENT 2 */}
          <motion.div
            className="moment-card moment-card-2"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="moment-img-box">
              <img
                src={images.road}
                alt="Vehicles convoy moving gracefully on scenic Deccan highway"
              />
            </div>
            <div className="moment-caption-overlay">
              <span className="moment-tag">HIGHWAY CONVOY</span>
              <h3>Let the journey unfold</h3>
              <p>
                Graceful cruising across the vast Deccan landscapes. Smooth
                overtakes, optimal safety clearances, and comfortable pauses along the route.
              </p>
            </div>
          </motion.div>

          {/* MOMENT 3 */}
          <motion.div
            className="moment-card moment-card-3"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="moment-img-box">
              <img
                src={images.decoratedCar}
                alt="Auspiciously decorated vehicle for weddings and family celebrations"
              />
            </div>
            <div className="moment-caption-overlay">
              <span className="moment-tag">CELEBRATIONS</span>
              <h3>Make it memorable</h3>
              <p>
                Auspicious decorations and premium grooming for wedding
                convoys, temple darshans, and joyful family celebrations across Karnataka.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          HAMPI SECTION (STRONGEST VISUAL CENTERPIECE)
          ==================================================================== */}
      <section className="hampi-showcase" id="hampi">
        <img
          src={images.hero}
          alt="The UNESCO World Heritage landscape of Hampi Karnataka"
          className="hampi-bg"
        />
        <div className="hampi-overlay-filter" />

        <div className="hampi-content-box">
          <motion.p
            className="eyebrow center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            HAMPI • KARNATAKA
          </motion.p>

          <motion.h2
            className="editorial-title"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Where the
            <br />
            <em className="serif-italic">stones remember.</em>
          </motion.h2>

          <motion.p
            className="hampi-pillars-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            Virupaksha Temple. Ancient ruins. Golden sunsets. Endless stories.
          </motion.p>

          <motion.p
            style={{
              maxWidth: "680px",
              margin: "0 auto",
              color: "var(--text-muted)",
              lineHeight: "1.8",
              fontSize: "16px",
              fontWeight: 300,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            Explore the royal pavilions of the Vijayanagara Empire, the iconic
            Stone Chariot at Vijaya Vittala, and the spiritual tranquility of
            the Tungabhadra riverbanks. We arrange seamless multi-day tours with
            patient chauffeurs who wait while you marvel.
          </motion.p>

          <div className="hampi-itinerary-pills">
            <span className="hampi-pill">VIRUPAKSHA TEMPLE</span>
            <span className="hampi-pill">STONE CHARIOT</span>
            <span className="hampi-pill">HEMAKUTA SUNSET</span>
            <span className="hampi-pill">ROYAL ENCLOSURE</span>
            <span className="hampi-pill">TUNGABHADRA CORACLE</span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          GALLERY ("ON THE ROAD")
          ==================================================================== */}
      <section className="gallery-section" id="gallery">
        <div className="section-header">
          <p className="eyebrow">ON THE ROAD</p>
          <h2 className="editorial-title">
            Every road has
            <br />
            <em className="serif-italic">a story.</em>
          </h2>
          <p className="section-description">
            A glimpse of our machines, our care, and the nocturnal departures
            that make travel across Karnataka effortless.
          </p>
        </div>

        <div className="gallery-editorial-grid">
          <motion.div
            className="gallery-item gallery-item-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={images.night}
              alt="Sri Manjunatha fleet ready for night transit"
            />
            <span className="gallery-label">NIGHT DEPARTURES</span>
          </motion.div>

          <motion.div
            className="gallery-item gallery-item-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <img
              src={images.carInterior}
              alt="Pristine interior seating and comfort"
            />
            <span className="gallery-label">PRISTINE CABINS</span>
          </motion.div>

          <motion.div
            className="gallery-item gallery-item-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={images.night2}
              alt="Fleet lineup illuminated at Hosapete terminal"
            />
            <span className="gallery-label">TERMINAL READY</span>
          </motion.div>

          <motion.div
            className="gallery-item gallery-item-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src={images.rear}
              alt="Tempo traveller rear stance and highway endurance"
            />
            <span className="gallery-label">HIGHWAY ENDURANCE</span>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          FINAL SCENE
          ==================================================================== */}
      <section className="final-scene-section">
        <img
          src={images.road}
          alt="Open road journey through Karnataka"
          className="final-scene-bg"
        />
        <div className="final-scene-overlay" />

        <div className="final-scene-content">
          <motion.p
            className="eyebrow center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            YOUR NEXT JOURNEY
          </motion.p>

          <motion.h2
            className="editorial-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            Let's take
            <br />
            <em className="serif-italic">the road.</em>
          </motion.h2>

          <motion.button
            className="btn-hero-journey"
            onClick={() => goTo("booking")}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Book your ride with Sri Manjunatha Tours & Travels"
          >
            <span className="btn-hero-shimmer" />
            <span className="btn-hero-text">BOOK YOUR RIDE</span>
            <span className="btn-hero-icon-circle">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </motion.button>
        </div>
      </section>

      {/* ====================================================================
          BOOKING SECTION
          ==================================================================== */}
      <section className="booking-section" id="booking">
        <div className="booking-container">
          <motion.div
            className="booking-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="eyebrow">BOOK YOUR JOURNEY</p>

            <h2>
              Tell us where
              <br />
              <em className="serif-italic">you want to go.</em>
            </h2>

            <p className="booking-info-lead">
              Enter your journey details and send the request directly through
              WhatsApp. We will immediately check availability, suggest the
              most cost-effective vehicle, and confirm your itinerary.
            </p>

            <div className="booking-contact-card">
              <div className="contact-channel-item">
                <span className="contact-channel-label">DIRECT PHONE CALL</span>
                <a
                  href={`tel:${cleanPhone}`}
                  className="contact-channel-value"
                >
                  {displayPhone}
                </a>
              </div>

              <div className="contact-channel-item">
                <span className="contact-channel-label">INSTANT WHATSAPP</span>
                <button
                  type="button"
                  onClick={() =>
                    sendWhatsAppMessage(
                      "Hello Sri Manjunatha Tours & Travels, I would like to check vehicle availability for Hampi."
                    )
                  }
                  className="contact-channel-value"
                  style={{ textAlign: "left" }}
                >
                  80883 81775
                </button>
              </div>

              <div className="contact-channel-item">
                <span className="contact-channel-label">LOCATION</span>
                <span
                  style={{
                    fontSize: "14px",
                    lineHeight: "1.6",
                    color: "#4a453c",
                  }}
                >
                  100 Bed Hospital Road, Hosapete, Karnataka
                </span>
              </div>
            </div>
          </motion.div>

          <BookingForm
            selectedVehicle={selectedVehicle}
            onVehicleChange={setSelectedVehicle}
          />
        </div>
      </section>

      {/* ====================================================================
          SITE FOOTER
          ==================================================================== */}
      <footer className="site-footer">
        <div className="footer-top-grid">
          <div className="footer-col">
            <h3>SRI MANJUNATHA</h3>
            <p className="footer-subbrand">TOURS & TRAVELS</p>
            <p className="footer-description">
              Premier travel partner for Hampi heritage explorations, outstation
              Karnataka journeys, and dedicated local taxi services based in
              Hosapete.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">OUR OFFICE</h4>
            <address className="footer-address">
              100 Bed Hospital Road, 3rd Cross,
              <br />
              Kottureshwar Nilaya, 2nd Cross Road,
              <br />
              near Auto Stop, Hosapete,
              <br />
              Karnataka 583201
            </address>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">CONTACT US</h4>
            <div className="footer-contact-links">
              <div className="footer-contact-item">
                <span>Call Dispatch</span>
                <a href={`tel:${cleanPhone}`}>{displayPhone}</a>
              </div>
              <div className="footer-contact-item">
                <span>WhatsApp Enquiry</span>
                <button
                  onClick={() =>
                    sendWhatsAppMessage("Hello Sri Manjunatha Tours & Travels.")
                  }
                >
                  Chat with us on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>
            © {new Date().getFullYear()} Sri Manjunatha Tours & Travels. All
            rights reserved.
          </p>
          <div className="footer-links-quick">
            <button onClick={() => goTo("home")}>Home</button>
            <button onClick={() => goTo("journey")}>Journey</button>
            <button onClick={() => goTo("fleet")}>Fleet</button>
            <button onClick={() => goTo("hampi")}>Hampi</button>
            <button onClick={() => goTo("booking")}>Booking</button>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          FLOATING CONTACT BUTTONS (BOTTOM-RIGHT)
          ==================================================================== */}
      <div className="floating-actions-container">
        <button
          className="floating-btn whatsapp-btn"
          onClick={() =>
            sendWhatsAppMessage(
              "Hello Sri Manjunatha Tours & Travels, I want to book a vehicle."
            )
          }
          aria-label="Chat on WhatsApp"
        >
          <svg
            className="floating-btn-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp</span>
        </button>

        <a
          href={`tel:${cleanPhone}`}
          className="floating-btn call-btn"
          aria-label="Call Sri Manjunatha Travels"
        >
          <svg
            className="floating-btn-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}
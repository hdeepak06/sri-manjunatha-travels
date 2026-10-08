import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import "./index.css";

const displayPhone = "+91 98457 99414";
const cleanPhone = "919845799414";

const businessAddress =
  "100 Bed Hospital Road, 3rd Cross, Kottureshwar Nilaya, 2nd Cross Road, near Auto Stop, Hosapete, Karnataka 583201, India";

const images = {
  hero: "/assets/hampi-sunset.png",
  traveller: "/assets/decorated-traveller.png",
  fleet: "/assets/fleet-convoy.png",
  innova: "/assets/premium-innova.png",
  sedan: "/assets/sedan.png",
  bus: "/assets/large-bus.png",
  office: "/assets/office.png",
  interior: "/assets/bus-interior.png",
  virupaksha: "/assets/virupaksha-temple.jpg",
  stoneChariot: "/assets/stone-chariot.jpg",
  lotusMahal: "/assets/lotus-mahal.jpg",
  elephantStables: "/assets/elephant-stables.jpg",
  matangaHill: "/assets/matanga-hill.jpg",
  tungabhadra: "/assets/tungabhadra-dam.jpg",
};

function sendWhatsAppMessage(message: string) {
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/* ==========================================================================
   DESTINATIONS DATA (12 ATTRACTIONS ORGANIZED BY EXPERIENCE)
   ========================================================================== */

interface Attraction {
  id: string;
  name: string;
  category: "HERITAGE & TEMPLES" | "ROYAL HAMPI" | "VIEWS & SUNSET" | "FAMILY & NEARBY";
  image: string;
  description: string;
  distance: string;
  mapQuery: string;
}

const attractionsData: Attraction[] = [
  // 1. Heritage & Temples
  {
    id: "virupaksha",
    name: "Virupaksha Temple",
    category: "HERITAGE & TEMPLES",
    image: images.virupaksha,
    description:
      "Active since the 7th century on the Tungabhadra banks. Famous for its towering 50-meter entrance gopuram and sacred atmosphere.",
    distance: "~12 km from Hosapete Office (approx 25 mins)",
    mapQuery: "Virupaksha+Temple+Hampi+Karnataka",
  },
  {
    id: "vijaya-vittala",
    name: "Vijaya Vittala Temple",
    category: "HERITAGE & TEMPLES",
    image: images.stoneChariot,
    description:
      "The pinnacle of Vijayanagara craftsmanship, famous for its world-renowned musical pillars, sculpted halls, and stone artistry.",
    distance: "~15 km from Hosapete Office (approx 35 mins)",
    mapQuery: "Vittala+Temple+Hampi+Karnataka",
  },
  {
    id: "stone-chariot",
    name: "Stone Chariot",
    category: "HERITAGE & TEMPLES",
    image: images.stoneChariot,
    description:
      "The globally iconic shrine dedicated to Garuda inside the Vittala complex, featured on Indian currency notes.",
    distance: "~15 km from Hosapete Office (approx 35 mins)",
    mapQuery: "Stone+Chariot+Hampi+Karnataka",
  },
  {
    id: "ugra-narasimha",
    name: "Ugra Narasimha",
    category: "HERITAGE & TEMPLES",
    image: images.virupaksha,
    description:
      "Largest monolithic sculpture in Hampi (6.7 meters tall), carved in 1528 AD, depicting Lord Narasimha seated under the serpent Adisesha.",
    distance: "~12 km from Hosapete Office (approx 25 mins)",
    mapQuery: "Lakshmi+Narasimha+Temple+Hampi+Karnataka",
  },

  // 2. Royal Hampi
  {
    id: "lotus-mahal",
    name: "Lotus Mahal",
    category: "ROYAL HAMPI",
    image: images.lotusMahal,
    description:
      "A graceful two-storey royal pavilion in the Zenana Enclosure showing an exquisite fusion of Indo-Islamic archways and stone carvings.",
    distance: "~13 km from Hosapete Office (approx 30 mins)",
    mapQuery: "Lotus+Mahal+Hampi+Karnataka",
  },
  {
    id: "elephant-stables",
    name: "Elephant Stables",
    category: "ROYAL HAMPI",
    image: images.elephantStables,
    description:
      "Monumental row of eleven interconnected domed chambers built to house the grand ceremonial royal elephants of Vijayanagara emperors.",
    distance: "~13 km from Hosapete Office (approx 30 mins)",
    mapQuery: "Elephant+Stables+Hampi+Karnataka",
  },
  {
    id: "queens-bath",
    name: "Queen's Bath",
    category: "ROYAL HAMPI",
    image: images.lotusMahal,
    description:
      "Elaborate royal bath with ornate arched corridors, overhanging balconies, and a central pool fed by ancient aqueducts.",
    distance: "~11 km from Hosapete Office (approx 25 mins)",
    mapQuery: "Queens+Bath+Hampi+Karnataka",
  },

  // 3. Views & Sunset
  {
    id: "matanga-hill",
    name: "Matanga Hill",
    category: "VIEWS & SUNSET",
    image: images.matangaHill,
    description:
      "Highest vantage point in central Hampi offering spectacular 360-degree panoramic golden sunrise and sunset views over boulders and ruins.",
    distance: "~13 km from Hosapete Office (approx 30 mins)",
    mapQuery: "Matanga+Hill+Hampi+Karnataka",
  },
  {
    id: "anjanadri-hill",
    name: "Anjanadri Hill",
    category: "VIEWS & SUNSET",
    image: images.hero,
    description:
      "Revered across the Tungabhadra river as Kishkindha (birthplace of Lord Hanuman). Reached by climbing 575 scenic stone steps.",
    distance: "~22 km from Hosapete Office (approx 45 mins)",
    mapQuery: "Anjanadri+Hill+Anegundi+Karnataka",
  },
  {
    id: "hampi-bazaar",
    name: "Hampi Bazaar & Hemakuta",
    category: "VIEWS & SUNSET",
    image: images.hero,
    description:
      "Kilometer-long ancient market street flanked by stone pavilions, leading to Hemakuta Hill's cluster of pre-Vijayanagara sunset shrines.",
    distance: "~12 km from Hosapete Office (approx 25 mins)",
    mapQuery: "Hampi+Bazaar+Hemakuta+Hill",
  },

  // 4. Family & Nearby Experiences
  {
    id: "tungabhadra-dam",
    name: "Tungabhadra Dam",
    category: "FAMILY & NEARBY",
    image: images.tungabhadra,
    description:
      "Vast engineering marvel and reservoir near Hosapete featuring landscaped Japanese gardens, musical fountains, and panoramic dam views.",
    distance: "~6 km from Hosapete Office (approx 15 mins)",
    mapQuery: "Tungabhadra+Dam+Hosapete+Karnataka",
  },
  {
    id: "daroji-bear",
    name: "Daroji Sloth Bear Sanctuary",
    category: "FAMILY & NEARBY",
    image: images.tungabhadra,
    description:
      "Asia's first protected sloth bear reserve. Visitors observe wild sloth bears, leopards, and birds in their natural bouldered habitat.",
    distance: "~18 km from Hosapete Office (approx 35 mins)",
    mapQuery: "Daroji+Sloth+Bear+Sanctuary+Karnataka",
  },
];

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
  const [to, setTo] = useState("Hampi Sightseeing");
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
      setErrorMsg("Please enter your destination.");
      return;
    }
    if (!date) {
      setErrorMsg("Please select your travel date.");
      return;
    }
    if (!time) {
      setErrorMsg("Please choose your pickup time.");
      return;
    }

    setErrorMsg("");

    const message = `Hello Sri Manjunatha Travels,

I want to book a journey.

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
    <div className="booking-form-card">
      <h3>Book Your Journey</h3>
      <form onSubmit={handleSubmit} className="booking-inputs-grid">
        <div className="form-field">
          <label htmlFor="form-name">Your Name *</label>
          <input
            id="form-name"
            type="text"
            required
            placeholder="e.g. Ramesh Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="form-mobile">Mobile Number *</label>
          <input
            id="form-mobile"
            type="tel"
            required
            placeholder="+91 98457 99414"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="form-from">From (Pickup) *</label>
          <input
            id="form-from"
            type="text"
            required
            placeholder="Hosapete Railway Stn / Hotel"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="form-to">To (Destination) *</label>
          <input
            id="form-to"
            type="text"
            required
            placeholder="Hampi Ruins / Badami / Airport"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="form-date">Travel Date *</label>
          <input
            id="form-date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="form-time">Pickup Time *</label>
          <input
            id="form-time"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="form-vehicle">Preferred Vehicle *</label>
          <select
            id="form-vehicle"
            value={selectedVehicle}
            onChange={(e) => onVehicleChange(e.target.value)}
          >
            <option value="Innova">Toyota Innova Crysta (6-7 Seats)</option>
            <option value="Traveller">Force Tempo Traveller (12-20 Seats)</option>
            <option value="Sedan">Executive Sedan (4 Seats)</option>
            <option value="Bus">Luxury Touring Bus (30-50 Seats)</option>
            <option value="Car">Comfortable Car (Taxi)</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="form-passengers">Number of Passengers *</label>
          <select
            id="form-passengers"
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
              fontWeight: 600,
            }}
          >
            {errorMsg}
          </p>
        )}

        <button type="submit" className="form-submit-cta">
          <span>SEND BOOKING ON WHATSAPP →</span>
        </button>

        <p
          style={{
            gridColumn: "1 / -1",
            fontSize: "12px",
            color: "#6f6a62",
            textAlign: "center",
            marginTop: "6px",
          }}
        >
          Instant confirmation with our Hosapete dispatch team via WhatsApp.
        </p>
      </form>
    </div>
  );
}

/* ==========================================================================
   MAIN APPLICATION
   ========================================================================== */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("Innova");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.3,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
      lenisRef.current.scrollTo(element, { offset: -70, duration: 1.1 });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectVehicle = (vName: string) => {
    setSelectedVehicle(vName);
    goTo("booking");
  };

  const filteredAttractions =
    activeCategory === "ALL"
      ? attractionsData
      : attractionsData.filter((item) => item.category === activeCategory);

  return (
    <div className="site-wrapper">
      {/* ====================================================================
          NAVBAR (LIGHT, TRANSLUCENT & ACCESSIBLE)
          ==================================================================== */}
      <header className={`site-navbar ${isScrolled ? "scrolled" : ""}`}>
        <button
          className="navbar-brand"
          onClick={() => goTo("home")}
          aria-label="Sri Manjunatha Travels home"
        >
          <span className="navbar-brand-main">SRI MANJUNATHA</span>
          <span className="navbar-brand-sub">TOURS & TRAVELS</span>
        </button>

        <nav className="navbar-nav">
          <button onClick={() => goTo("home")}>Home</button>
          <button onClick={() => goTo("vehicles")}>Vehicles</button>
          <button onClick={() => goTo("services")}>Services</button>
          <button onClick={() => goTo("destinations")}>Explore Hampi</button>
          <button onClick={() => goTo("itinerary")}>Itinerary</button>
          <button onClick={() => goTo("about")}>About</button>
          <button onClick={() => goTo("contact")}>Contact</button>
        </nav>

        <div className="navbar-actions">
          <a href={`tel:${cleanPhone}`} className="nav-phone-link" aria-label="Call Sri Manjunatha Travels">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{displayPhone}</span>
          </a>

          <button className="btn-primary nav-book-btn" onClick={() => goTo("booking")}>
            Book Now
          </button>
        </div>

        <button
          className={`hamburger-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`mobile-menu-drawer ${menuOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          <button onClick={() => goTo("home")}>Home</button>
          <button onClick={() => goTo("vehicles")}>Vehicles</button>
          <button onClick={() => goTo("services")}>Services</button>
          <button onClick={() => goTo("destinations")}>Explore Hampi</button>
          <button onClick={() => goTo("itinerary")}>Suggested Itinerary</button>
          <button onClick={() => goTo("about")}>Why Choose Us</button>
          <button onClick={() => goTo("contact")}>Contact Us</button>
        </nav>

        <div className="mobile-drawer-footer">
          <a href={`tel:${cleanPhone}`} className="btn-primary">
            Call {displayPhone}
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              sendWhatsAppMessage("Hello Sri Manjunatha Travels, I would like to enquire about travel.");
            }}
            className="btn-secondary"
          >
            WhatsApp Us
          </button>
        </div>
      </div>

      {/* ====================================================================
          HERO SECTION (SUNLIT, VISIBLE IMAGE, NOT PURE BLACK)
          ==================================================================== */}
      <section className="hero-section" id="home">
        <div className="hero-media-wrapper">
          <img
            src={images.hero}
            alt="Majestic golden sunlit ruins and temples of Hampi Karnataka"
            className="hero-image"
          />
          <div className="hero-scrim-overlay" />
        </div>

        <div className="hero-content">
          <span className="hero-tag">
            ✦ HOSAPETE • HAMPI • KARNATAKA ✦
          </span>

          <h1 className="hero-main-heading">
            Explore Hampi with
            <br />
            <em>Sri Manjunatha Travels</em>
          </h1>

          <p className="hero-subtext">
            Comfortable journeys, reliable travel and unforgettable experiences
            across Hampi and Karnataka.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary" onClick={() => goTo("booking")}>
              <span>Book Your Journey</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <button className="btn-outline-light" onClick={() => goTo("destinations")}>
              <span>Explore Hampi</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          TRUST STATS BAR
          ==================================================================== */}
      <section className="trust-stats-bar">
        <div className="stats-flex-container">
          <div className="stat-box">
            <div className="stat-icon-wrap">🏛️</div>
            <div className="stat-text">
              <strong>15+ Years Mastery</strong>
              <span>Local Hampi & Hosapete Experts</span>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon-wrap">⏱️</div>
            <div className="stat-text">
              <strong>100% On-Time Pickups</strong>
              <span>Station, Resort & Airport Drops</span>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon-wrap">✨</div>
            <div className="stat-text">
              <strong>Pristine AC Fleet</strong>
              <span>Sanitized, Pushback Comfort</span>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon-wrap">🤝</div>
            <div className="stat-text">
              <strong>Transparent Rates</strong>
              <span>Honest Pricing, Zero Hidden Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          TRAVEL SERVICES (LIGHT & FRIENDLY)
          ==================================================================== */}
      <section className="services-section" id="services">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Travel Services</span>
            <h2 className="section-title">
              Comfortable Travel for <em>Every Journey</em>
            </h2>
            <p className="section-subtitle">
              From swift local taxi transfers to multi-day temple circuits across
              Karnataka, our fleet is ready to serve you 24/7.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-bubble">🚗</div>
              <h3>Local Travel</h3>
              <p>
                Swift, comfortable road travel across Hosapete town, shopping
                markets, Tungabhadra viewpoints, and local business hubs.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-bubble">🏨</div>
              <h3>Hotel Transfers</h3>
              <p>
                Punctual door-to-door pickups and drops connecting Hosapete
                Railway Station with premier Hampi resorts and heritage guest houses.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-bubble">✈️</div>
              <h3>Airport Transfers</h3>
              <p>
                Reliable airport connectivity to Jindal Vijayanagar Airport (VDY),
                Hubli Airport, and Kempegowda International Airport (BLR).
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-bubble">🚌</div>
              <h3>Outstation Trips</h3>
              <p>
                Comfortable long-distance touring to Badami, Aihole, Pattadakal,
                Bijapur, Gokarna beaches, and interstate holiday circuits.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-bubble">🏛️</div>
              <h3>Hampi Sightseeing</h3>
              <p>
                Curated full-day and multi-day heritage temple circuits with
                patient chauffeurs who wait while you explore ancient monuments.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon-bubble">👨‍👩‍👧</div>
              <h3>Family Travel</h3>
              <p>
                Spacious, high-roof, fully air-conditioned vehicles with pushback
                seating to keep kids and elders relaxed throughout the day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          OUR VEHICLES (BRIGHT SHOWCASE)
          ==================================================================== */}
      <section className="vehicles-section" id="vehicles">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Our Fleet</span>
            <h2 className="section-title">
              Choose Your <em>Way to Travel</em>
            </h2>
            <p className="section-subtitle">
              Every vehicle in our Hosapete depot is clean, well-maintained,
              air-conditioned, and chauffeured by courteous local drivers.
            </p>
          </div>

          <div className="vehicles-grid">
            {/* INNOVA */}
            <div className="vehicle-card">
              <div className="vehicle-photo-box">
                <span className="vehicle-tag-badge">Premium Travel</span>
                <span className="vehicle-capacity-badge">6–7 Passengers</span>
                <img src={images.innova} alt="Toyota Innova Crysta luxury tour cab" loading="lazy" />
              </div>
              <div className="vehicle-body">
                <h3>Toyota Innova Crysta</h3>
                <span className="vehicle-model-line">Premium Private Travel</span>
                <p>
                  The gold standard for family sightseeing and executive transfers.
                  Dual air-conditioning and plush captain seats provide absolute comfort on dusty temple roads.
                </p>
                <div className="vehicle-amenities-row">
                  <span className="amenity-chip">Dual Climate AC</span>
                  <span className="amenity-chip">Pushback Captain Seats</span>
                  <span className="amenity-chip">Large Boot Space</span>
                  <span className="amenity-chip">Chauffeur Driven</span>
                </div>
                <div className="vehicle-footer-cta">
                  <button className="btn-primary" onClick={() => handleSelectVehicle("Innova")}>
                    Book This Vehicle →
                  </button>
                </div>
              </div>
            </div>

            {/* TRAVELLER */}
            <div className="vehicle-card">
              <div className="vehicle-photo-box">
                <span className="vehicle-tag-badge">Group Travel</span>
                <span className="vehicle-capacity-badge">12–20 Passengers</span>
                <img src={images.traveller} alt="Force Tempo Traveller luxury group vehicle" loading="lazy" />
              </div>
              <div className="vehicle-body">
                <h3>Force Tempo Traveller</h3>
                <span className="vehicle-model-line">Group & Pilgrimage Tours</span>
                <p>
                  High-roof walk-in clearance with individual pushback recliner seats.
                  Ideal for extended families, pilgrim groups to Virupaksha, and educational tours.
                </p>
                <div className="vehicle-amenities-row">
                  <span className="amenity-chip">12–20 Pushback Recliners</span>
                  <span className="amenity-chip">High Roof Walk-In</span>
                  <span className="amenity-chip">Powerful Cabin AC</span>
                  <span className="amenity-chip">Top Luggage Carrier</span>
                </div>
                <div className="vehicle-footer-cta">
                  <button className="btn-primary" onClick={() => handleSelectVehicle("Traveller")}>
                    Book This Vehicle →
                  </button>
                </div>
              </div>
            </div>

            {/* SEDAN */}
            <div className="vehicle-card">
              <div className="vehicle-photo-box">
                <span className="vehicle-tag-badge">Car Travel</span>
                <span className="vehicle-capacity-badge">4 Passengers</span>
                <img src={images.sedan} alt="Executive sedan for swift road travel" loading="lazy" />
              </div>
              <div className="vehicle-body">
                <h3>Executive Sedans</h3>
                <span className="vehicle-model-line">Comfortable Taxi Travel</span>
                <p>
                  Agile, smooth, and fuel-efficient sedans for couples, solo travelers,
                  and swift hops between Hosapete Junction, Tungabhadra Dam, and heritage hotels.
                </p>
                <div className="vehicle-amenities-row">
                  <span className="amenity-chip">Chilled AC</span>
                  <span className="amenity-chip">Pristine Interiors</span>
                  <span className="amenity-chip">Doorstep Pickup</span>
                  <span className="amenity-chip">Punctual Drivers</span>
                </div>
                <div className="vehicle-footer-cta">
                  <button className="btn-primary" onClick={() => handleSelectVehicle("Sedan")}>
                    Book This Vehicle →
                  </button>
                </div>
              </div>
            </div>

            {/* BUS */}
            <div className="vehicle-card">
              <div className="vehicle-photo-box">
                <span className="vehicle-tag-badge">Large Groups</span>
                <span className="vehicle-capacity-badge">30–50 Passengers</span>
                <img src={images.bus} alt="Luxury tour coach for grand delegations" loading="lazy" />
              </div>
              <div className="vehicle-body">
                <h3>Luxury Tour Coaches</h3>
                <span className="vehicle-model-line">Events, Weddings & Groups</span>
                <p>
                  Air-suspension touring buses designed for wedding parties,
                  college excursions, and large pilgrim groups exploring Karnataka's historic circuit.
                </p>
                <div className="vehicle-amenities-row">
                  <span className="amenity-chip">Air Suspension Comfort</span>
                  <span className="amenity-chip">Massive Underbody Boot</span>
                  <span className="amenity-chip">Experienced Highway Captains</span>
                  <span className="amenity-chip">Interstate Permits</span>
                </div>
                <div className="vehicle-footer-cta">
                  <button className="btn-primary" onClick={() => handleSelectVehicle("Bus")}>
                    Book This Vehicle →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          EXPLORE HAMPI FROM HERE (12 ATTRACTIONS ORGANIZED BY EXPERIENCE)
          ==================================================================== */}
      <section className="destinations-section" id="destinations">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Explore Hampi From Here</span>
            <h2 className="section-title">
              Places to Visit <em>Near Hampi</em>
            </h2>
            <p className="section-subtitle">
              Discover the history, architecture and landscapes that make Hampi unforgettable.
              Our chauffeurs know every road, shortcut, and monument opening time.
            </p>
          </div>

          {/* Filter Tabs by Experience */}
          <div className="destinations-filter-tabs">
            <button
              className={`filter-tab-btn ${activeCategory === "ALL" ? "active" : ""}`}
              onClick={() => setActiveCategory("ALL")}
            >
              All Highlights (12)
            </button>
            <button
              className={`filter-tab-btn ${activeCategory === "HERITAGE & TEMPLES" ? "active" : ""}`}
              onClick={() => setActiveCategory("HERITAGE & TEMPLES")}
            >
              Heritage & Temples
            </button>
            <button
              className={`filter-tab-btn ${activeCategory === "ROYAL HAMPI" ? "active" : ""}`}
              onClick={() => setActiveCategory("ROYAL HAMPI")}
            >
              Royal Hampi
            </button>
            <button
              className={`filter-tab-btn ${activeCategory === "VIEWS & SUNSET" ? "active" : ""}`}
              onClick={() => setActiveCategory("VIEWS & SUNSET")}
            >
              Views & Sunset
            </button>
            <button
              className={`filter-tab-btn ${activeCategory === "FAMILY & NEARBY" ? "active" : ""}`}
              onClick={() => setActiveCategory("FAMILY & NEARBY")}
            >
              Family & Nearby Experiences
            </button>
          </div>

          {/* Attractions Grid */}
          <div className="destinations-grid">
            {filteredAttractions.map((place) => (
              <div className="destination-card" key={place.id}>
                <div className="destination-thumb">
                  <span className="destination-cat-chip">{place.category}</span>
                  <img src={place.image} alt={place.name} loading="lazy" />
                </div>
                <div className="destination-info">
                  <h3>{place.name}</h3>
                  <p className="destination-desc">{place.description}</p>
                  <div className="destination-distance-badge">
                    <span>📍</span>
                    <span>{place.distance}</span>
                  </div>
                  <div className="destination-actions">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${place.mapQuery}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="directions-link-btn"
                    >
                      <span>Get Directions on Map ↗</span>
                    </a>

                    <button
                      className="btn-secondary"
                      style={{ padding: "8px 16px", fontSize: "11px" }}
                      onClick={() => {
                        setSelectedVehicle("Innova");
                        goTo("booking");
                      }}
                    >
                      Book Ride
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          FEATURED HAMPI EXPERIENCE (SPLIT STORY LAYOUT)
          ==================================================================== */}
      <section className="featured-story-section" id="about">
        <div className="featured-story-container">
          <div className="story-image-wrap">
            <img
              src={images.matangaHill}
              alt="Panoramic sunset over boulders and temples in Hampi"
              loading="lazy"
            />
          </div>

          <div className="story-text-content">
            <span className="section-tag">Featured Experience</span>
            <h2>
              One Journey.
              <br />
              <em>A Thousand Stories.</em>
            </h2>
            <p>
              From ancient temples and royal ruins to dramatic boulder landscapes
              and Tungabhadra river views, explore the heart of Hampi comfortably
              with Sri Manjunatha Travels.
            </p>

            <ul className="story-perks-list">
              <li>
                <span style={{ color: "#f7dda2" }}>✓</span>
                Punctual door-to-door pickups from Hosapete hotels and railway station
              </li>
              <li>
                <span style={{ color: "#f7dda2" }}>✓</span>
                Chauffeurs who patiently wait while you soak in the monuments
              </li>
              <li>
                <span style={{ color: "#f7dda2" }}>✓</span>
                Insider guidance on avoiding afternoon heat and photography spots
              </li>
              <li>
                <span style={{ color: "#f7dda2" }}>✓</span>
                Clean, climate-controlled comfort between every heritage stop
              </li>
            </ul>

            <button className="btn-primary" onClick={() => goTo("booking")}>
              <span>Plan Your Hampi Trip</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          HAMPI DAY TRIP ITINERARY (TIMELINE)
          ==================================================================== */}
      <section className="itinerary-section" id="itinerary">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Suggested Itinerary</span>
            <h2 className="section-title">
              Suggested Hampi <em>Day Trip</em>
            </h2>
            <p className="section-subtitle">
              A curated timeline crafted by local drivers to help you experience the best
              of Hampi comfortably. Timings are suggested and customizable to your schedule.
            </p>
          </div>

          <div className="timeline-wrapper">
            {/* 08:00 AM */}
            <div className="timeline-item">
              <div className="timeline-dot">01</div>
              <div className="timeline-card">
                <span className="timeline-time-badge">08:00 AM • Suggested Start</span>
                <h3>Start Journey</h3>
                <p>
                  Prompt morning pickup from your hotel or Hosapete Railway Station. Enjoy a smooth 20-minute drive to Hampi as the town wakes up.
                </p>
              </div>
            </div>

            {/* 09:00 AM */}
            <div className="timeline-item">
              <div className="timeline-dot">02</div>
              <div className="timeline-card">
                <span className="timeline-time-badge">09:00 AM</span>
                <h3>Virupaksha Temple & Hampi Bazaar</h3>
                <p>
                  Visit the active 7th-century sacred temple, receive blessings, and stroll down the ancient colonnaded bazaar street.
                </p>
              </div>
            </div>

            {/* 11:00 AM */}
            <div className="timeline-item">
              <div className="timeline-dot">03</div>
              <div className="timeline-card">
                <span className="timeline-time-badge">11:00 AM</span>
                <h3>Vijaya Vittala Temple & Stone Chariot</h3>
                <p>
                  Marvel at the iconic Stone Chariot, the musical pillars hall, and the grand stone carved pavilions of the Vittala complex.
                </p>
              </div>
            </div>

            {/* 01:00 PM */}
            <div className="timeline-item">
              <div className="timeline-dot">04</div>
              <div className="timeline-card">
                <span className="timeline-time-badge">01:00 PM</span>
                <h3>Lunch Break</h3>
                <p>
                  Relax in an air-conditioned local restaurant. Relish authentic Karnataka meals, South Indian thali, and refreshing tender coconut.
                </p>
              </div>
            </div>

            {/* 02:00 PM */}
            <div className="timeline-item">
              <div className="timeline-dot">05</div>
              <div className="timeline-card">
                <span className="timeline-time-badge">02:00 PM</span>
                <h3>Lotus Mahal & Elephant Stables</h3>
                <p>
                  Explore the royal Zenana Enclosure, the Indo-Islamic Lotus Mahal pavilion, and the monumental 11-domed Elephant Stables.
                </p>
              </div>
            </div>

            {/* 04:30 PM */}
            <div className="timeline-item">
              <div className="timeline-dot">06</div>
              <div className="timeline-card">
                <span className="timeline-time-badge">04:30 PM</span>
                <h3>Matanga Hill / Sunset Viewpoint</h3>
                <p>
                  Witness the world-famous golden hour as the setting sun bathes Hampi's red granite boulders and Tungabhadra river in gold.
                </p>
              </div>
            </div>

            {/* 06:30 PM */}
            <div className="timeline-item">
              <div className="timeline-dot">07</div>
              <div className="timeline-card">
                <span className="timeline-time-badge">06:30 PM</span>
                <h3>Return Journey</h3>
                <p>
                  Relax in our air-conditioned vehicle as we safely drive you back to your hotel or Hosapete Railway Station for your night train.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          MAP & DIRECTIONS SECTION
          ==================================================================== */}
      <section className="map-section">
        <div className="container">
          <div className="map-card-box">
            <div className="map-info-content">
              <span className="section-tag">Central Hub</span>
              <h3>Explore Hampi from Hosapete</h3>
              <p>
                Our office is conveniently based on 100 Bed Hospital Road in Hosapete,
                just minutes from the railway station and bus terminus. We connect you directly to every heritage gate in Hampi.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=100+Bed+Hospital+Road+Hosapete+Karnataka+583201&destination=Virupaksha+Temple+Hampi`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <span>Get Directions on Google Maps ↗</span>
                </a>

                <a href={`tel:${cleanPhone}`} className="btn-secondary">
                  Call for Pickup
                </a>
              </div>
            </div>

            <div className="map-route-visual">
              <div className="route-stop-point">
                <span className="stop-icon">📍</span>
                <div className="stop-details">
                  <strong>Sri Manjunatha Travels (Hosapete HQ)</strong>
                  <span>100 Bed Hospital Road, Hosapete, Karnataka 583201</span>
                </div>
              </div>

              <div style={{ height: "20px", borderLeft: "2px dashed #8b5e3c", marginLeft: "22px" }} />

              <div className="route-stop-point">
                <span className="stop-icon">🏛️</span>
                <div className="stop-details">
                  <strong>Hampi UNESCO Heritage Sites</strong>
                  <span>~12 km via Hampi Road (approx 25 mins drive)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          WHY CHOOSE US
          ==================================================================== */}
      <section className="why-us-section" id="about">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Why Travel With Us</span>
            <h2 className="section-title">
              Why Travel With <em>Sri Manjunatha Travels?</em>
            </h2>
            <p className="section-subtitle">
              We treat every traveler like family. Count on us for safe, comfortable,
              and punctual road journeys across Hosapete, Hampi, and Karnataka.
            </p>
          </div>

          <div className="why-us-grid">
            <div className="why-card">
              <div className="why-icon-badge">✓</div>
              <div className="why-card-text">
                <h3>Reliable Service</h3>
                <p>100% on-time pickups for early morning train arrivals, flights, and sunrise temple tours.</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon-badge">✓</div>
              <div className="why-card-text">
                <h3>Comfortable Vehicles</h3>
                <p>Spotless AC cabins, plush pushback seating, and ample luggage boot space on every ride.</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon-badge">✓</div>
              <div className="why-card-text">
                <h3>Experienced Drivers</h3>
                <p>Courteous, verified highway chauffeurs with extensive local driving experience.</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon-badge">✓</div>
              <div className="why-card-text">
                <h3>Local Hampi Knowledge</h3>
                <p>Insider route tips, guidance on best monument hours, and crowd-free photography viewpoints.</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon-badge">✓</div>
              <div className="why-card-text">
                <h3>Transparent Pricing</h3>
                <p>Honest, upfront quotes with zero hidden surcharges or surprise toll additions.</p>
              </div>
            </div>

            <div className="why-card">
              <div className="why-icon-badge">✓</div>
              <div className="why-card-text">
                <h3>Easy Booking</h3>
                <p>Quick WhatsApp reservations with immediate confirmation from our Hosapete operations team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          TESTIMONIALS (BRIGHT & TRUSTWORTHY)
          ==================================================================== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Guest Experiences</span>
            <h2 className="section-title">
              What Travelers <em>Say About Us</em>
            </h2>
            <p className="section-subtitle">
              Real reviews from families, couples and pilgrims who explored Hampi with our team.
            </p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="star-rating">★★★★★</div>
              <p className="testimonial-quote">
                "Our driver was waiting outside Hosapete Junction at 6 AM sharp with an impeccably clean Innova. He knew every temple route and guided us to avoid the afternoon crowd. Outstanding service!"
              </p>
              <div className="reviewer-meta">
                <strong>Anand & Priya Sharma</strong>
                <span>Family Tour from Bangalore</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="star-rating">★★★★★</div>
              <p className="testimonial-quote">
                "We booked a 17-seater Tempo Traveller for our 3-day college friends reunion in Hampi. The pushback seats and AC were super comfortable even in the hot sun. Highly recommend Sri Manjunatha Travels!"
              </p>
              <div className="reviewer-meta">
                <strong>Kavya M.</strong>
                <span>Group Travel from Hyderabad</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="star-rating">★★★★★</div>
              <p className="testimonial-quote">
                "Very polite chauffeur who waited patiently at every monument while our parents took their time walking. The pricing was totally transparent. Will definitely book again on our next visit!"
              </p>
              <div className="reviewer-meta">
                <strong>Suresh Gowda</strong>
                <span>Pilgrim Visit from Mysore</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          BOOKING & CALL TO ACTION SECTION
          ==================================================================== */}
      <section className="booking-section" id="booking">
        <div className="container">
          <div className="booking-layout-wrapper">
            <div className="booking-side-info" id="contact">
              <span className="section-tag">Reservations</span>
              <h2>
                Ready to Explore
                <br />
                <em>Hampi with Us?</em>
              </h2>
              <p className="booking-lead-desc">
                Book your comfortable journey with Sri Manjunatha Travels. Tell us your travel dates
                and we will confirm your vehicle instantly via WhatsApp.
              </p>

              <div className="direct-contact-pillbox">
                <div className="contact-row">
                  <div className="contact-icon-bubble">📞</div>
                  <div>
                    <span className="contact-details-label">Direct Phone Call</span>
                    <a href={`tel:${cleanPhone}`} className="contact-details-value">
                      {displayPhone}
                    </a>
                  </div>
                </div>

                <div className="contact-row">
                  <div className="contact-icon-bubble">💬</div>
                  <div>
                    <span className="contact-details-label">Instant WhatsApp</span>
                    <button
                      type="button"
                      onClick={() =>
                        sendWhatsAppMessage("Hello Sri Manjunatha Travels, I would like to check vehicle availability.")
                      }
                      className="contact-details-value"
                      style={{ textAlign: "left" }}
                    >
                      {displayPhone}
                    </button>
                  </div>
                </div>

                <div className="contact-row">
                  <div className="contact-icon-bubble">📍</div>
                  <div>
                    <span className="contact-details-label">Hosapete Office</span>
                    <span style={{ fontSize: "14px", color: "#6f6a62", lineHeight: "1.5", display: "block" }}>
                      100 Bed Hospital Road, Hosapete, Karnataka
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <BookingForm
              selectedVehicle={selectedVehicle}
              onVehicleChange={setSelectedVehicle}
            />
          </div>
        </div>
      </section>

      {/* ====================================================================
          FOOTER (WARM DARK & ELEGANT)
          ==================================================================== */}
      <footer className="site-footer">
        <div className="footer-top-grid">
          <div>
            <h3 className="footer-brand-title">SRI MANJUNATHA</h3>
            <span className="footer-brand-sub">TOURS & TRAVELS</span>
            <p className="footer-intro-text">
              Your trusted travel partner for Hampi and beyond. Punctual, comfortable,
              and courteous taxi and tour coach services based in Hosapete, Karnataka.
            </p>
          </div>

          <div>
            <h4 className="footer-col-heading">Quick Links</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => goTo("home")}>Home</button></li>
              <li><button onClick={() => goTo("vehicles")}>Our Fleet</button></li>
              <li><button onClick={() => goTo("services")}>Travel Services</button></li>
              <li><button onClick={() => goTo("destinations")}>Explore Hampi</button></li>
              <li><button onClick={() => goTo("itinerary")}>Day Trip Itinerary</button></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-heading">Explore Hampi</h4>
            <ul className="footer-nav-list">
              <li><button onClick={() => goTo("destinations")}>Virupaksha Temple</button></li>
              <li><button onClick={() => goTo("destinations")}>Stone Chariot</button></li>
              <li><button onClick={() => goTo("destinations")}>Lotus Mahal</button></li>
              <li><button onClick={() => goTo("destinations")}>Elephant Stables</button></li>
              <li><button onClick={() => goTo("destinations")}>Tungabhadra Dam</button></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-heading">Contact & Location</h4>
            <address className="footer-contact-address">
              {businessAddress}
            </address>

            <a href={`tel:${cleanPhone}`} className="footer-phone-direct">
              📞 {displayPhone}
            </a>

            <button
              onClick={() => sendWhatsAppMessage("Hello Sri Manjunatha Travels.")}
              style={{ color: "#c68b59", fontSize: "13px", fontWeight: 600, marginTop: "6px" }}
            >
              💬 WhatsApp Us Directly
            </button>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} Sri Manjunatha Tours & Travels. All rights reserved.</p>
          <p>Hosapete • Hampi • Karnataka Tourism Partner</p>
        </div>
      </footer>

      {/* ====================================================================
          FLOATING ACTION BUTTONS (BOTTOM RIGHT)
          ==================================================================== */}
      <div className="floating-contact-stack">
        <button
          className="floating-contact-btn whatsapp"
          onClick={() =>
            sendWhatsAppMessage("Hello Sri Manjunatha Travels, I would like to enquire about vehicle booking.")
          }
          aria-label="Chat on WhatsApp"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp</span>
        </button>

        <a href={`tel:${cleanPhone}`} className="floating-contact-btn call" aria-label="Call Sri Manjunatha Travels">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}
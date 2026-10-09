/**
 * Sri Manjunatha Tours & Travels — Hosapete & Hampi
 * Pure Vanilla JavaScript Implementation
 * Mobile-First Interactive Features, Leaflet Map & WhatsApp Booking
 */

(function () {
  "use strict";

  // Verified Business Phone Number
  const CLEAN_PHONE = "919845799414";
  const DEFAULT_ENQUIRY_MSG = "Hello Sri Manjunatha Travels, I would like to enquire about your travel services. Please share the available vehicles, routes, and pricing.";

  // WhatsApp Messaging Helper
  function sendWhatsAppMessage(message) {
    const url = `https://wa.me/${CLEAN_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Smooth Scroll Helper with Header Offset
  function goTo(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const header = document.getElementById("site-navbar");
    const headerHeight = header ? header.offsetHeight : 70;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 10;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }

  // ==========================================================================
  // 1. DATA: 12 VERIFIED HAMPI LANDMARKS & EXPERIENCES
  // ==========================================================================
  const HAMPI_PLACES = [
    {
      id: "virupaksha",
      name: "Virupaksha Temple",
      shortName: "Virupaksha",
      mapCategory: "Heritage & Temples",
      guideCategory: "HERITAGE & TEMPLES",
      subCategory: "Active 7th-Century Shiva Shrine",
      lat: 15.3353,
      lng: 76.4600,
      image: "assets/images/virupaksha-temple.webp",
      fallbackImage: "assets/images/virupaksha-temple.jpg",
      description:
        "Active since the 7th century on the Tungabhadra banks. Famous for its towering 50-meter eastern gopuram and sacred river steps.",
      detailedDesc:
        "The living sacred heart of Hampi, renowned for its towering 50-metre eastern gopuram, daily rituals, and sacred steps to the Tungabhadra river.",
      distance: "~12 km from Hosapete HQ (approx 20 mins)"
    },
    {
      id: "vijaya-vittala",
      name: "Vijaya Vittala Temple",
      shortName: "Vittala Temple",
      mapCategory: "Heritage & Temples",
      guideCategory: "HERITAGE & TEMPLES",
      subCategory: "Architectural Masterpiece",
      lat: 15.3387,
      lng: 76.4789,
      image: "assets/images/vittala-temple.webp",
      fallbackImage: "assets/images/vittala-temple.jpg",
      description:
        "The pinnacle of Vijayanagara craftsmanship, celebrated for 56 musical granite pillars, ornate mandapas, and stone artistry.",
      detailedDesc:
        "Hampi's architectural pinnacle, celebrated worldwide for its 56 carved musical granite pillars (Sa-Re-Ga-Ma pillars) and ornate mandapa halls.",
      distance: "~15 km from Hosapete HQ (approx 30 mins)"
    },
    {
      id: "stone-chariot",
      name: "Stone Chariot",
      shortName: "Stone Chariot",
      mapCategory: "Heritage & Temples",
      guideCategory: "HERITAGE & TEMPLES",
      subCategory: "Iconic Garuda Shrine",
      lat: 15.3389,
      lng: 76.4796,
      image: "assets/images/stone-chariot.webp",
      fallbackImage: "assets/images/stone-chariot.jpg",
      description:
        "Globally iconic monolithic shrine sculpted like an ornate ceremonial chariot inside the Vittala complex, featured on India's ₹50 note.",
      detailedDesc:
        "The world-famous monolithic shrine sculpted like an ornate ceremonial chariot, immortalized as a national symbol on the Indian ₹50 currency note.",
      distance: "~15 km from Hosapete HQ (approx 30 mins)"
    },
    {
      id: "ugra-narasimha",
      name: "Ugra Narasimha",
      shortName: "Ugra Narasimha",
      mapCategory: "Heritage & Temples",
      guideCategory: "HERITAGE & TEMPLES",
      subCategory: "Colossal Monolithic Statue",
      lat: 15.3283,
      lng: 76.4578,
      image: "assets/images/ugra-narasimha.webp",
      fallbackImage: "assets/images/ugra-narasimha.jpg",
      description:
        "Largest monolithic sculpture in Hampi (6.7 meters tall), carved in 1528 AD, depicting Lord Narasimha seated under the serpent Adisesha.",
      detailedDesc:
        "A 6.7-metre tall monolithic sculpture of Lord Narasimha seated in calm yogic posture beneath the protective seven hoods of cosmic serpent Adishesha.",
      distance: "~11.5 km from Hosapete HQ (approx 20 mins)"
    },
    {
      id: "lotus-mahal",
      name: "Lotus Mahal",
      shortName: "Lotus Mahal",
      mapCategory: "Royal Hampi",
      guideCategory: "ROYAL HAMPI",
      subCategory: "Indo-Islamic Summer Palace",
      lat: 15.3204,
      lng: 76.4705,
      image: "assets/images/lotus-mahal.webp",
      fallbackImage: "assets/images/lotus-mahal.jpg",
      description:
        "A graceful two-storey royal summer pavilion in the Zenana Enclosure showing an exquisite fusion of Indo-Islamic archways and stone carvings.",
      detailedDesc:
        "A serene two-storey royal summer pavilion showcasing delicate cusped arches, lotus-bud domes, and an ingenious natural air-cooling design.",
      distance: "~13 km from Hosapete HQ (approx 25 mins)"
    },
    {
      id: "elephant-stables",
      name: "Elephant Stables",
      shortName: "Elephant Stables",
      mapCategory: "Royal Hampi",
      guideCategory: "ROYAL HAMPI",
      subCategory: "Ceremonial Royal Enclosure",
      lat: 15.3207,
      lng: 76.4735,
      image: "assets/images/elephant-stables.webp",
      fallbackImage: "assets/images/elephant-stables.jpg",
      description:
        "Monumental row of eleven interconnected domed chambers built to house the grand ceremonial royal elephants of Vijayanagara emperors.",
      detailedDesc:
        "Eleven grand interconnected domed chambers that once sheltered the ceremonial royal war and procession elephants of the Vijayanagara kings.",
      distance: "~13.5 km from Hosapete HQ (approx 25 mins)"
    },
    {
      id: "queens-bath",
      name: "Queen's Bath",
      shortName: "Queen's Bath",
      mapCategory: "Royal Hampi",
      guideCategory: "ROYAL HAMPI",
      subCategory: "Royal Aquatic Pavilion",
      lat: 15.3134,
      lng: 76.4716,
      image: "assets/images/queens-bath.webp",
      fallbackImage: "assets/images/queens-bath.jpg",
      description:
        "Elaborate royal bath with ornate arched corridors, overhanging balconies, and a central pool fed by ancient aqueducts.",
      detailedDesc:
        "An exquisite royal aquatic pavilion featuring stepped stone basins, ornate overhanging balconies, and Indo-Islamic vaulted arches.",
      distance: "~12 km from Hosapete HQ (approx 22 mins)"
    },
    {
      id: "matanga-hill",
      name: "Matanga Hill",
      shortName: "Matanga Hill",
      mapCategory: "Views & Sunset",
      guideCategory: "VIEWS & SUNSET",
      subCategory: "Supreme Sunrise & Sunset Vantage",
      lat: 15.3314,
      lng: 76.4683,
      image: "assets/images/matanga-hill.webp",
      fallbackImage: "assets/images/matanga-hill.jpg",
      description:
        "Highest vantage point in central Hampi offering spectacular 360-degree panoramic golden sunrise and sunset views over boulders and ruins.",
      detailedDesc:
        "The highest geographic point in central Hampi, offering unforgettable 360° panoramas over ancient ruins, banana plantations, and boulder valleys.",
      distance: "~13 km from Hosapete HQ (approx 25 mins)"
    },
    {
      id: "hemakuta-hill",
      name: "Hemakuta Hill",
      shortName: "Hemakuta Hill",
      mapCategory: "Views & Sunset",
      guideCategory: "VIEWS & SUNSET",
      subCategory: "Pre-Vijayanagara Shrines & Sunset",
      lat: 15.3328,
      lng: 76.4590,
      image: "assets/images/hemakuta-hill.webp",
      fallbackImage: "assets/images/hemakuta-hill.jpg",
      description:
        "A gently sloping granite expanse dotted with pre-Vijayanagara triple-chambered shrines, celebrated for golden sunset vistas.",
      detailedDesc:
        "A gently sloping granite expanse dotted with ancient stone temples, revered as the golden hill where Lord Shiva did penance before marrying Pampa.",
      distance: "~12 km from Hosapete HQ (approx 20 mins)"
    },
    {
      id: "anjanadri-hill",
      name: "Anjanadri Hill",
      shortName: "Anjanadri Hill",
      mapCategory: "Views & Sunset",
      guideCategory: "VIEWS & SUNSET",
      subCategory: "Birthplace of Lord Hanuman",
      lat: 15.3533,
      lng: 76.4708,
      image: "assets/images/anjanadri-hill.webp",
      fallbackImage: "assets/images/anjanadri-hill.jpg",
      description:
        "Revered across the Tungabhadra river as Kishkindha (birthplace of Lord Hanuman). Reached by climbing 575 scenic stone steps.",
      detailedDesc:
        "Located in mythological Kishkindha across the Tungabhadra river, reachable by 575 stone steps offering sweeping valley vistas and sunset serenity.",
      distance: "~22 km from Hosapete HQ (approx 40 mins)"
    },
    {
      id: "hampi-bazaar",
      name: "Hampi Bazaar",
      shortName: "Hampi Bazaar",
      mapCategory: "Heritage & Temples",
      guideCategory: "HERITAGE & TEMPLES",
      subCategory: "Ancient Market Street",
      lat: 15.3346,
      lng: 76.4642,
      image: "assets/images/hampi-bazaar.webp",
      fallbackImage: "assets/images/hampi-bazaar.jpg",
      description:
        "Kilometer-long ancient market street flanked by stone colonnaded pavilions leading directly to Virupaksha Temple.",
      detailedDesc:
        "A kilometre-long colonnaded stone promenade facing Virupaksha Temple, where global merchants traded pearls, silks, and diamonds during the Vijayanagara Empire.",
      distance: "~12.5 km from Hosapete HQ (approx 22 mins)"
    },
    {
      id: "tungabhadra-dam",
      name: "Tungabhadra Dam",
      shortName: "Tungabhadra Dam",
      mapCategory: "Family & Experiences",
      guideCategory: "FAMILY & NEARBY",
      subCategory: "Scenic Reservoir & Japanese Gardens",
      lat: 15.2608,
      lng: 76.3400,
      image: "assets/images/tungabhadra-dam.webp",
      fallbackImage: "assets/images/tungabhadra-dam.jpg",
      description:
        "Vast engineering marvel and reservoir near Hosapete featuring landscaped Japanese gardens, musical fountains, and panoramic dam views.",
      detailedDesc:
        "A grand reservoir near Hosapete featuring expansive water bodies, landscaped Japanese gardens, deer parks, musical fountains, and sunset hilltops.",
      distance: "~6 km from Hosapete HQ (approx 15 mins)"
    }
  ];

  const STARTING_POINT = {
    name: "Sri Manjunatha Travels (HQ)",
    address: "100 Bed Hospital Road, Hosapete, Karnataka 583201",
    lat: 15.2718,
    lng: 76.3920
  };

  const ITINERARY_ROUTE_COORDS = [
    [15.2718, 76.3920], // Hosapete HQ
    [15.2608, 76.3400], // TB Dam
    [15.2718, 76.3920], // Hosapete
    [15.3134, 76.4716], // Queen's Bath
    [15.3204, 76.4705], // Lotus Mahal
    [15.3207, 76.4735], // Elephant Stables
    [15.3283, 76.4578], // Ugra Narasimha
    [15.3328, 76.4590], // Hemakuta Hill
    [15.3353, 76.4600], // Virupaksha Temple
    [15.3346, 76.4642], // Hampi Bazaar
    [15.3314, 76.4683], // Matanga Hill
    [15.3387, 76.4789], // Vijaya Vittala
    [15.3389, 76.4796], // Stone Chariot
    [15.3533, 76.4708]  // Anjanadri Hill
  ];

  function buildDirectionsUrl(destinationName) {
    const origin = encodeURIComponent("100 Bed Hospital Road, Hosapete, Karnataka 583201");
    const dest = encodeURIComponent(`${destinationName}, Hampi, Karnataka`);
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`;
  }

  // ==========================================================================
  // 2. NAVBAR SCROLL & MOBILE DRAWER BEHAVIOR
  // ==========================================================================
  const navbar = document.getElementById("site-navbar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileDrawer = document.getElementById("mobile-menu-drawer");

  let isScrolled = false;
  let scrollTicking = false;

  function updateNavbarOnScroll() {
    const shouldScroll = window.scrollY > 25;
    if (shouldScroll !== isScrolled) {
      isScrolled = shouldScroll;
      if (navbar) navbar.classList.toggle("scrolled", isScrolled);
    }
    scrollTicking = false;
  }

  window.addEventListener("scroll", function () {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateNavbarOnScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener("click", function () {
      const isOpen = hamburgerBtn.classList.toggle("open");
      mobileDrawer.classList.toggle("open", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      mobileDrawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close mobile drawer when any link is tapped
    const mobileLinks = mobileDrawer.querySelectorAll("a, button");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (link.id === "mobile-whatsapp-btn") return; // Handled separately
        hamburgerBtn.classList.remove("open");
        mobileDrawer.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        mobileDrawer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          const targetId = href.substring(1);
          if (targetId) {
            e.preventDefault();
            goTo(targetId);
          }
        }
      });
    });

    // Dedicated X close button inside mobile drawer
    const drawerCloseBtn = document.getElementById("mobile-drawer-close-btn");
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener("click", function () {
        hamburgerBtn.classList.remove("open");
        mobileDrawer.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
        mobileDrawer.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    }
  }

  // Mobile drawer quick WhatsApp button
  const mobileWhatsAppBtn = document.getElementById("mobile-whatsapp-btn");
  if (mobileWhatsAppBtn) {
    mobileWhatsAppBtn.addEventListener("click", function () {
      if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.classList.remove("open");
        mobileDrawer.classList.remove("open");
        document.body.style.overflow = "";
      }
      sendWhatsAppMessage(DEFAULT_ENQUIRY_MSG);
    });
  }

  // Desktop smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = anchor.getAttribute("href");
      if (href && href.length > 1) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          goTo(targetId);
        }
      }
    });
  });

  // ==========================================================================
  // 3. BOOKING FORM ELEMENTS & HELPERS
  // ==========================================================================
  const bookingForm = document.getElementById("booking-form");
  const formName = document.getElementById("form-name");
  const formMobile = document.getElementById("form-mobile");
  const formFrom = document.getElementById("form-from");
  const formToInput = document.getElementById("form-to");
  const formDate = document.getElementById("form-date");
  const formTime = document.getElementById("form-time");
  const formVehicleSelect = document.getElementById("form-vehicle");
  const formPassengers = document.getElementById("form-passengers");
  const formNotes = document.getElementById("form-notes");
  const bookingErrorMsg = document.getElementById("booking-error-msg");
  const bookingSuccessMsg = document.getElementById("booking-success-msg");

  // Set today as minimum selectable date
  if (formDate) {
    const today = new Date().toISOString().split("T")[0];
    formDate.setAttribute("min", today);
  }

  function showError(msg) {
    if (bookingErrorMsg) {
      bookingErrorMsg.textContent = msg;
      bookingErrorMsg.style.display = "block";
    }
    if (bookingSuccessMsg) {
      bookingSuccessMsg.style.display = "none";
    }
  }

  function hideError() {
    if (bookingErrorMsg) {
      bookingErrorMsg.style.display = "none";
    }
  }

  function showSuccess(msg) {
    if (bookingSuccessMsg) {
      if (msg) bookingSuccessMsg.textContent = msg;
      bookingSuccessMsg.style.display = "block";
    }
    if (bookingErrorMsg) {
      bookingErrorMsg.style.display = "none";
    }
  }

  // Pre-fill booking destination
  window.bookRideForPlace = function (placeName) {
    if (formToInput) {
      formToInput.value = `${placeName} (Hampi Tour)`;
    }
    goTo("booking");
    if (formName) formName.focus();
  };

  // Fleet Card selection
  document.querySelectorAll(".select-vehicle-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const vehicle = btn.getAttribute("data-vehicle");
      if (formVehicleSelect && vehicle) {
        formVehicleSelect.value = vehicle;
      }
      goTo("booking");
      if (formName) formName.focus();
    });
  });

  // Service Card enquiry buttons
  document.querySelectorAll(".btn-service-enquire").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const serviceName = btn.getAttribute("data-service");
      if (formToInput && serviceName) {
        formToInput.value = serviceName;
      }
      goTo("booking");
      if (formName) formName.focus();
    });
  });

  // Form Submit Handler
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameVal = formName ? formName.value.trim() : "";
      const mobileVal = formMobile ? formMobile.value.trim() : "";
      const fromVal = formFrom ? formFrom.value.trim() : "";
      const toVal = formToInput ? formToInput.value.trim() : "";
      const dateVal = formDate ? formDate.value : "";
      const timeVal = formTime ? formTime.value : "";
      const vehicleVal = formVehicleSelect ? formVehicleSelect.value : "Innova";
      const passVal = formPassengers ? formPassengers.value : "2";
      const notesVal = formNotes ? formNotes.value.trim() : "";

      // Validation
      if (!nameVal) {
        showError("Please enter your name.");
        if (formName) formName.focus();
        return;
      }

      if (!mobileVal || mobileVal.replace(/\D/g, "").length < 10) {
        showError("Please enter a valid 10-digit mobile number for WhatsApp confirmation.");
        if (formMobile) formMobile.focus();
        return;
      }

      if (!fromVal) {
        showError("Please enter your pickup location (e.g. Hosapete Junction / Hotel).");
        if (formFrom) formFrom.focus();
        return;
      }

      if (!toVal) {
        showError("Please enter your destination or tour package.");
        if (formToInput) formToInput.focus();
        return;
      }

      if (!dateVal) {
        showError("Please choose your travel date.");
        if (formDate) formDate.focus();
        return;
      }

      if (!timeVal) {
        showError("Please specify your desired pickup time.");
        if (formTime) formTime.focus();
        return;
      }

      hideError();

      // Format clean, professional WhatsApp message
      const message = `Hello Sri Manjunatha Travels,

I would like to enquire about your travel services.

*Booking Enquiry Details:*
• Name: ${nameVal}
• Contact: ${mobileVal}
• Pickup: ${fromVal}
• Destination: ${toVal}
• Date: ${dateVal}
• Time: ${timeVal}
• Vehicle: ${vehicleVal}
• Passengers: ${passVal}${notesVal ? `\n• Special Notes: ${notesVal}` : ""}

Please confirm vehicle availability and share pricing.`;

      showSuccess("✓ Opening WhatsApp with your prefilled booking enquiry! Our Hosapete operations team will confirm your vehicle instantly.");

      sendWhatsAppMessage(message);
    });
  }

  // ==========================================================================
  // 4. LANDMARK GUIDES: DYNAMIC RENDERING & FILTERING
  // ==========================================================================
  const attractionsGrid = document.getElementById("attractions-grid");
  const guideFilterBtns = document.querySelectorAll(".filter-tab-btn");

  function renderAttractionCards(category) {
    if (!attractionsGrid) return;
    attractionsGrid.innerHTML = "";

    const filtered = category === "ALL"
      ? HAMPI_PLACES
      : HAMPI_PLACES.filter(function (p) { return p.guideCategory === category; });

    filtered.forEach(function (place) {
      const card = document.createElement("div");
      card.className = "destination-card";

      const dirUrl = buildDirectionsUrl(place.name);

      card.innerHTML = `
        <div class="destination-thumb">
          <span class="destination-cat-chip">${place.guideCategory}</span>
          <img src="${place.image}" alt="${place.name} in Hampi" loading="lazy" onerror="this.onerror=null; this.src='${place.fallbackImage}'">
        </div>
        <div class="destination-info">
          <h3>${place.name}</h3>
          <p class="destination-desc">${place.description}</p>
          <div class="destination-distance-badge">
            <span>📍</span>
            <span>${place.distance}</span>
          </div>
          <div class="destination-actions">
            <a href="${dirUrl}" target="_blank" rel="noopener noreferrer" class="directions-link-btn">
              <span>Directions on Map ↗</span>
            </a>
            <button type="button" class="btn-gold book-place-btn" data-place="${place.name}">
              Book Ride
            </button>
          </div>
        </div>
      `;

      card.querySelector(".book-place-btn").addEventListener("click", function () {
        window.bookRideForPlace(place.name);
      });

      attractionsGrid.appendChild(card);
    });
  }

  guideFilterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      guideFilterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderAttractionCards(category);
    });
  });

  // Initial render of all 12 cards
  renderAttractionCards("ALL");

  // ==========================================================================
  // 5. INTERACTIVE LEAFLET PHOTO MAP
  // ==========================================================================
  const mapElement = document.getElementById("hampi-photo-map");
  const mapChipsStrip = document.getElementById("map-chips-strip");
  const mapFilterBtns = document.querySelectorAll(".map-tab-btn");

  let mapInstance = null;
  let mapMarkers = new Map();
  let selectedPlaceId = "virupaksha";
  let activeMapCategory = "ALL";

  function renderBottomChips() {
    if (!mapChipsStrip) return;
    mapChipsStrip.innerHTML = "";

    const filtered = activeMapCategory === "ALL"
      ? HAMPI_PLACES
      : HAMPI_PLACES.filter(function (p) { return p.mapCategory === activeMapCategory; });

    filtered.forEach(function (place) {
      const chip = document.createElement("div");
      chip.className = `destination-chip-card ${place.id === selectedPlaceId ? "selected" : ""}`;
      chip.setAttribute("data-id", place.id);

      chip.innerHTML = `
        <div class="chip-thumb-wrap">
          <img src="${place.image}" alt="${place.name}" loading="lazy" onerror="this.onerror=null; this.src='${place.fallbackImage}'">
        </div>
        <div class="chip-meta">
          <span class="chip-name">${place.shortName}</span>
          <span class="chip-cat">${place.mapCategory}</span>
        </div>
      `;

      chip.addEventListener("click", function () {
        flyToPlace(place.id);
      });

      mapChipsStrip.appendChild(chip);
    });
  }

  function updateActiveChip() {
    if (!mapChipsStrip) return;
    mapChipsStrip.querySelectorAll(".destination-chip-card").forEach(function (c) {
      const id = c.getAttribute("data-id");
      c.classList.toggle("selected", id === selectedPlaceId);
    });
  }

  function flyToPlace(id) {
    selectedPlaceId = id;
    updateActiveChip();

    const place = HAMPI_PLACES.find(function (p) { return p.id === id; });
    const marker = mapMarkers.get(id);

    if (place && mapInstance) {
      mapInstance.flyTo([place.lat, place.lng], 15, {
        duration: 1.2,
        easeLinearity: 0.25
      });

      if (marker) {
        marker.openPopup();
      }
    }
  }

  function resetMapView() {
    if (!mapInstance) return;
    const bounds = L.latLngBounds(HAMPI_PLACES.map(function (p) { return [p.lat, p.lng]; }));
    bounds.extend([STARTING_POINT.lat, STARTING_POINT.lng]);
    mapInstance.fitBounds(bounds, { padding: [50, 50] });
  }

  function initMap() {
    if (!mapElement || typeof L === "undefined") return;

    // Center map between Hosapete and central Hampi
    mapInstance = L.map("hampi-photo-map", {
      center: [15.3353, 76.4600],
      zoom: 12,
      zoomControl: false,
      scrollWheelZoom: false
    });

    // Clean OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(mapInstance);

    // Starting Point HQ Marker
    const startIcon = L.divIcon({
      className: "custom-leaflet-div-icon",
      html: `
        <div class="hampi-start-badge">
          <div class="hampi-start-icon-circle">🚗</div>
          <div class="hampi-start-meta">
            <span class="hampi-start-title">Sri Manjunatha Travels</span>
            <span class="hampi-start-tagline">Central Hosapete HQ</span>
          </div>
        </div>
      `,
      iconSize: [220, 36],
      iconAnchor: [110, 18]
    });

    const startMarker = L.marker([STARTING_POINT.lat, STARTING_POINT.lng], { icon: startIcon }).addTo(mapInstance);
    startMarker.bindPopup(`
      <div style="padding: 12px 14px; font-family: sans-serif;">
        <strong style="color: #8b5e3c; font-size: 13px; display: block; margin-bottom: 4px;">Sri Manjunatha Travels HQ</strong>
        <p style="font-size: 12px; color: #444; margin: 0 0 8px 0;">100 Bed Hospital Road, Hosapete, Karnataka 583201</p>
        <a href="tel:919845799414" style="color: #d4a754; font-weight: bold; font-size: 12px;">Call: +91 98457 99414</a>
      </div>
    `);

    // Dashed Route Circuit Polyline
    L.polyline(ITINERARY_ROUTE_COORDS, {
      color: "#c68b59",
      weight: 3,
      dashArray: "6, 8",
      opacity: 0.75
    }).addTo(mapInstance);

    // Place Markers
    HAMPI_PLACES.forEach(function (place) {
      const icon = L.divIcon({
        className: "custom-leaflet-div-icon",
        html: `
          <div class="hampi-photo-marker-wrap">
            <div class="hampi-photo-card">
              <div class="hampi-marker-thumb-box">
                <img src="${place.image}" alt="${place.name}" onerror="this.onerror=null; this.src='${place.fallbackImage}'">
              </div>
              <span class="hampi-marker-name">${place.shortName}</span>
            </div>
            <div class="hampi-marker-pin-tip"></div>
          </div>
        `,
        iconSize: [140, 40],
        iconAnchor: [70, 40]
      });

      const marker = L.marker([place.lat, place.lng], { icon: icon }).addTo(mapInstance);

      const dirUrl = buildDirectionsUrl(place.name);

      const popupHtml = `
        <div class="hampi-popup-card">
          <div class="popup-thumb-wrap">
            <img src="${place.image}" alt="${place.name}" class="popup-cover-img" onerror="this.onerror=null; this.src='${place.fallbackImage}'">
            <span class="popup-category-pill">${place.mapCategory}</span>
          </div>
          <div class="popup-body">
            <h4 class="popup-title">${place.name}</h4>
            <p class="popup-desc">${place.detailedDesc}</p>
            <div class="popup-distance-badge">
              <span>📍</span>
              <span>${place.distance}</span>
            </div>
            <div class="popup-actions-row">
              <a href="${dirUrl}" target="_blank" rel="noopener noreferrer" class="popup-btn-primary">
                Directions ↗
              </a>
              <button type="button" class="popup-btn-secondary" onclick="window.bookRideForPlace('${place.name}')">
                Book Ride
              </button>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: "hampi-leaflet-popup",
        maxWidth: 300,
        minWidth: 260
      });

      marker.on("click", function () {
        selectedPlaceId = place.id;
        updateActiveChip();
      });

      mapMarkers.set(place.id, marker);
    });

    renderBottomChips();

    // Map Controls
    const zoomInBtn = document.getElementById("map-zoom-in");
    const zoomOutBtn = document.getElementById("map-zoom-out");
    const fitAllBtn = document.getElementById("map-fit-all");

    if (zoomInBtn) zoomInBtn.addEventListener("click", function () { mapInstance.zoomIn(); });
    if (zoomOutBtn) zoomOutBtn.addEventListener("click", function () { mapInstance.zoomOut(); });
    if (fitAllBtn) fitAllBtn.addEventListener("click", resetMapView);
  }

  // Filter Buttons for Map
  mapFilterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      mapFilterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      activeMapCategory = btn.getAttribute("data-category");
      renderBottomChips();

      HAMPI_PLACES.forEach(function (place) {
        const marker = mapMarkers.get(place.id);
        if (!marker || !mapInstance) return;

        if (activeMapCategory === "ALL" || place.mapCategory === activeMapCategory) {
          if (!mapInstance.hasLayer(marker)) {
            marker.addTo(mapInstance);
          }
        } else {
          if (mapInstance.hasLayer(marker)) {
            mapInstance.removeLayer(marker);
          }
        }
      });
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMap);
  } else {
    initMap();
  }

  // ==========================================================================
  // 6. FLOATING & STICKY BUTTON ACTIONS
  // ==========================================================================
  const floatingWhatsAppBtn = document.getElementById("floating-whatsapp-btn");
  if (floatingWhatsAppBtn) {
    floatingWhatsAppBtn.addEventListener("click", function () {
      sendWhatsAppMessage("Hello Sri Manjunatha Travels, I would like to check vehicle availability for Hampi travel.");
    });
  }

  const stickyWhatsAppBtn = document.getElementById("sticky-whatsapp-btn");
  if (stickyWhatsAppBtn) {
    stickyWhatsAppBtn.addEventListener("click", function () {
      goTo("booking");
      if (formName) formName.focus();
    });
  }

})();

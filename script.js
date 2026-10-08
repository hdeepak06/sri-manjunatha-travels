/**
 * Sri Manjunatha Tours & Travels
 * Pure Vanilla JavaScript implementation
 * Exact match to original React application behavior and animations
 */

(function () {
  "use strict";

  const CLEAN_PHONE = "919845799414";

  // WhatsApp Messaging Helper
  function sendWhatsAppMessage(message) {
    const url = `https://wa.me/${CLEAN_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Native Smooth Scroll Helper with Header Offset
  function goTo(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 70;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }

  // ==========================================================================
  // 2. DATA: 12 HAMPI ATTRACTIONS
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
      image: "assets/images/virupaksha-temple.jpg",
      description:
        "Active since the 7th century on the Tungabhadra banks. Famous for its towering 50-meter entrance gopuram and sacred atmosphere.",
      detailedDesc:
        "The living sacred heart of Hampi, renowned for its towering 50-metre eastern gopuram, daily rituals, and sacred steps to the Tungabhadra river.",
      distance: "~12 km from Hosapete Office (approx 25 mins)",
      approxDistance: "~12 km from Hosapete HQ"
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
      image: "assets/images/vittala-temple.jpg",
      description:
        "The pinnacle of Vijayanagara craftsmanship, famous for its world-renowned musical pillars, sculpted halls, and stone artistry.",
      detailedDesc:
        "Hampi's architectural pinnacle, celebrated worldwide for its 56 carved musical granite pillars (Sa-Re-Ga-Ma pillars) and ornate mandapa halls.",
      distance: "~15 km from Hosapete Office (approx 35 mins)",
      approxDistance: "~15 km from Hosapete HQ"
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
      image: "assets/images/stone-chariot.jpg",
      description:
        "The globally iconic shrine dedicated to Garuda inside the Vittala complex, featured on Indian currency notes.",
      detailedDesc:
        "The world-famous monolithic shrine sculpted like an ornate ceremonial chariot, immortalized as a national symbol on the Indian ₹50 currency note.",
      distance: "~15 km from Hosapete Office (approx 35 mins)",
      approxDistance: "~15 km from Hosapete HQ"
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
      image: "assets/images/ugra-narasimha.jpg",
      description:
        "Largest monolithic sculpture in Hampi (6.7 meters tall), carved in 1528 AD, depicting Lord Narasimha seated under the serpent Adisesha.",
      detailedDesc:
        "A 6.7-metre tall monolithic sculpture of Lord Narasimha seated in calm yogic posture beneath the protective seven hoods of cosmic serpent Adishesha.",
      distance: "~12 km from Hosapete Office (approx 25 mins)",
      approxDistance: "~11.5 km from Hosapete HQ"
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
      image: "assets/images/lotus-mahal.jpg",
      description:
        "A graceful two-storey royal pavilion in the Zenana Enclosure showing an exquisite fusion of Indo-Islamic archways and stone carvings.",
      detailedDesc:
        "A serene two-storey royal summer pavilion showcasing delicate cusped arches, lotus-bud domes, and an ingenious natural air-cooling design.",
      distance: "~13 km from Hosapete Office (approx 30 mins)",
      approxDistance: "~13 km from Hosapete HQ"
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
      image: "assets/images/elephant-stables.jpg",
      description:
        "Monumental row of eleven interconnected domed chambers built to house the grand ceremonial royal elephants of Vijayanagara emperors.",
      detailedDesc:
        "Eleven grand interconnected domed chambers that once sheltered the ceremonial royal war and procession elephants of the Vijayanagara kings.",
      distance: "~13 km from Hosapete Office (approx 30 mins)",
      approxDistance: "~13.2 km from Hosapete HQ"
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
      image: "assets/images/queens-bath.jpg",
      description:
        "Elaborate royal bath with ornate arched corridors, overhanging balconies, and a central pool fed by ancient aqueducts.",
      detailedDesc:
        "An exquisite royal aquatic pavilion featuring stepped stone basins, ornate overhanging balconies, and Indo-Islamic vaulted arches.",
      distance: "~11 km from Hosapete Office (approx 25 mins)",
      approxDistance: "~12 km from Hosapete HQ"
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
      image: "assets/images/matanga-hill.jpg",
      description:
        "Highest vantage point in central Hampi offering spectacular 360-degree panoramic golden sunrise and sunset views over boulders and ruins.",
      detailedDesc:
        "The highest geographic point in central Hampi, offering unforgettable 360° panoramas over ancient ruins, banana plantations, and boulder valleys.",
      distance: "~13 km from Hosapete Office (approx 30 mins)",
      approxDistance: "~13 km from Hosapete HQ"
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
      image: "assets/images/hemakuta-hill.jpg",
      description:
        "A gently sloping granite expanse dotted with pre-Vijayanagara triple-chambered shrines, celebrated for golden sunset vistas.",
      detailedDesc:
        "A gently sloping granite expanse dotted with ancient stone temples, revered as the golden hill where Lord Shiva did penance before marrying Pampa.",
      distance: "~12 km from Hosapete Office (approx 25 mins)",
      approxDistance: "~12 km from Hosapete HQ"
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
      image: "assets/images/anjanadri-hill.jpg",
      description:
        "Revered across the Tungabhadra river as Kishkindha (birthplace of Lord Hanuman). Reached by climbing 575 scenic stone steps.",
      detailedDesc:
        "Located in mythological Kishkindha across the Tungabhadra river, reachable by 575 stone steps offering sweeping valley vistas and sunset serenity.",
      distance: "~22 km from Hosapete Office (approx 45 mins)",
      approxDistance: "~22 km from Hosapete HQ"
    },
    {
      id: "hampi-bazaar",
      name: "Hampi Bazaar",
      shortName: "Hampi Bazaar",
      mapCategory: "Heritage & Temples",
      guideCategory: "VIEWS & SUNSET",
      subCategory: "Ancient Market Street",
      lat: 15.3346,
      lng: 76.4642,
      image: "assets/images/hampi-bazaar.jpg",
      description:
        "Kilometer-long ancient market street flanked by stone pavilions leading to Virupaksha and ancient trading markets.",
      detailedDesc:
        "A kilometre-long colonnaded stone promenade facing Virupaksha Temple, where global merchants traded pearls, silks, and diamonds during the Vijayanagara Empire.",
      distance: "~12.5 km from Hosapete Office (approx 25 mins)",
      approxDistance: "~12.5 km from Hosapete HQ"
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
      image: "assets/images/tungabhadra-dam.jpg",
      description:
        "Vast engineering marvel and reservoir near Hosapete featuring landscaped Japanese gardens, musical fountains, and panoramic dam views.",
      detailedDesc:
        "A grand reservoir near Hosapete featuring expansive water bodies, landscaped Japanese gardens, deer parks, musical fountains, and sunset hilltops.",
      distance: "~6 km from Hosapete Office (approx 15 mins)",
      approxDistance: "~6 km from Hosapete HQ"
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

  // ==========================================================================
  // 3. NAVBAR SCROLL & MOBILE DRAWER
  // ==========================================================================
  const navbar = document.getElementById("site-navbar");
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileDrawer = document.getElementById("mobile-menu-drawer");

  let isScrolled = false;
  let scrollTicking = false;

  function updateNavbarOnScroll() {
    const shouldScroll = window.scrollY > 30;
    if (shouldScroll !== isScrolled) {
      isScrolled = shouldScroll;
      navbar.classList.toggle("scrolled", isScrolled);
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
      hamburgerBtn.classList.toggle("open");
      mobileDrawer.classList.toggle("open");
    });

    const mobileLinks = mobileDrawer.querySelectorAll(".mobile-nav-link");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        hamburgerBtn.classList.remove("open");
        mobileDrawer.classList.remove("open");

        const targetId = link.getAttribute("href").replace("#", "");
        if (targetId) {
          e.preventDefault();
          goTo(targetId);
        }
      });
    });
  }

  // Smooth scroll for all hash anchor links in desktop nav
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = anchor.getAttribute("href").replace("#", "");
      if (targetId) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          goTo(targetId);
        }
      }
    });
  });

  // Mobile drawer WhatsApp button
  const mobileWhatsAppBtn = document.getElementById("mobile-whatsapp-btn");
  if (mobileWhatsAppBtn) {
    mobileWhatsAppBtn.addEventListener("click", function () {
      if (hamburgerBtn && mobileDrawer) {
        hamburgerBtn.classList.remove("open");
        mobileDrawer.classList.remove("open");
      }
      sendWhatsAppMessage("Hello Sri Manjunatha Travels, I would like to enquire about travel.");
    });
  }

  // ==========================================================================
  // 4. FLEET SELECTION (Connecting fleet cards to booking form)
  // ==========================================================================
  const formVehicleSelect = document.getElementById("form-vehicle");
  const formToInput = document.getElementById("form-to");

  document.querySelectorAll(".select-vehicle-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const vehicle = btn.getAttribute("data-vehicle");
      if (formVehicleSelect && vehicle) {
        formVehicleSelect.value = vehicle;
      }
      goTo("booking");
    });
  });

  // Global booking function matching React handleBookPlace
  window.bookRideForPlace = function (placeName) {
    if (formToInput) {
      formToInput.value = placeName;
    }
    if (formVehicleSelect) {
      formVehicleSelect.value = "Innova";
    }
    goTo("booking");
  };

  // ==========================================================================
  // 5. LANDMARK GUIDES: DYNAMIC RENDERING & FILTERING
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

      const dirUrl = `https://www.google.com/maps/dir/?api=1&origin=100+Bed+Hospital+Road+Hosapete+Karnataka+583201&destination=${encodeURIComponent(place.name + " Hampi")}`;

      card.innerHTML = `
        <div class="destination-thumb">
          <span class="destination-cat-chip">${place.guideCategory}</span>
          <img src="${place.image}" alt="${place.name}" loading="lazy">
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
              <span>Get Directions on Map ↗</span>
            </a>
            <button type="button" class="btn-secondary book-place-btn" style="padding: 8px 16px; font-size: 11px;">
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
  // 6. INTERACTIVE LEAFLET PHOTO MAP (Exact match to HampiPhotoMap.tsx)
  // ==========================================================================
  const mapElement = document.getElementById("hampi-photo-map");
  const mapChipsStrip = document.getElementById("map-chips-strip");
  const mapFilterBtns = document.querySelectorAll(".map-tab-btn");

  let mapInstance = null;
  let mapMarkers = new Map();
  let selectedPlaceId = "virupaksha";
  let activeMapCategory = "ALL";

  function buildDirectionsUrl(destinationName) {
    const origin = encodeURIComponent("100 Bed Hospital Road, Hosapete, Karnataka 583201");
    const dest = encodeURIComponent(`${destinationName}, Hampi, Karnataka`);
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`;
  }

  function renderBottomChips() {
    if (!mapChipsStrip) return;
    mapChipsStrip.innerHTML = "";

    const displayedPlaces = activeMapCategory === "ALL"
      ? HAMPI_PLACES
      : HAMPI_PLACES.filter(function (p) { return p.mapCategory === activeMapCategory; });

    displayedPlaces.forEach(function (place) {
      const isSelected = selectedPlaceId === place.id;
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = `destination-chip-card ${isSelected ? "selected" : ""}`;
      chip.setAttribute("data-place-id", place.id);

      chip.innerHTML = `
        <div class="chip-thumb-wrap">
          <img src="${place.image}" alt="${place.name}" loading="lazy">
        </div>
        <div class="chip-meta">
          <strong class="chip-name">${place.name}</strong>
          <span class="chip-cat">${place.subCategory}</span>
        </div>
        ${isSelected ? '<span class="chip-active-dot">●</span>' : ""}
      `;

      chip.addEventListener("click", function () {
        flyToPlace(place);
      });

      mapChipsStrip.appendChild(chip);
    });
  }

  function updateActiveChip() {
    if (!mapChipsStrip) return;
    const chips = mapChipsStrip.querySelectorAll(".destination-chip-card");
    chips.forEach(function (chip) {
      const pid = chip.getAttribute("data-place-id");
      if (pid === selectedPlaceId) {
        chip.classList.add("selected");
        if (!chip.querySelector(".chip-active-dot")) {
          const dot = document.createElement("span");
          dot.className = "chip-active-dot";
          dot.textContent = "●";
          chip.appendChild(dot);
        }
        chip.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      } else {
        chip.classList.remove("selected");
        const dot = chip.querySelector(".chip-active-dot");
        if (dot) dot.remove();
      }
    });
  }

  function flyToPlace(place) {
    selectedPlaceId = place.id;
    updateActiveChip();

    if (!mapInstance) return;

    mapInstance.flyTo([place.lat, place.lng], 15.5, {
      duration: 1.2,
      easeLinearity: 0.25
    });

    const marker = mapMarkers.get(place.id);
    if (marker) {
      setTimeout(function () {
        marker.openPopup();
      }, 400);
    }
  }

  function resetMapView() {
    if (!mapInstance) return;
    selectedPlaceId = null;
    updateActiveChip();

    const bounds = L.latLngBounds([
      [STARTING_POINT.lat, STARTING_POINT.lng],
      ...HAMPI_PLACES.map(function (p) { return [p.lat, p.lng]; })
    ]);

    mapInstance.fitBounds(bounds, {
      padding: [45, 45],
      maxZoom: 14
    });
  }

  function initMap() {
    if (!mapElement || typeof L === "undefined") return;

    mapInstance = L.map(mapElement, {
      center: [15.312, 76.435],
      zoom: 12.5,
      zoomControl: false,
      scrollWheelZoom: false
    });

    // Free OpenStreetMap Tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
      minZoom: 10
    }).addTo(mapInstance);

    // Subtle dashed scenic itinerary route line
    const routeLine = L.polyline(ITINERARY_ROUTE_COORDS, {
      color: "#C68B59",
      weight: 3.5,
      opacity: 0.85,
      dashArray: "7, 10",
      lineCap: "round",
      lineJoin: "round"
    });
    routeLine.addTo(mapInstance);

    // 1. Starting Point Marker (Hosapete HQ)
    const startHtml = `
      <div class="hampi-start-marker-wrap">
        <div class="hampi-start-badge">
          <div class="hampi-start-icon-circle">🚗</div>
          <div class="hampi-start-meta">
            <span class="hampi-start-title">Sri Manjunatha Travels</span>
            <span class="hampi-start-tagline">Start Your Hampi Journey</span>
          </div>
        </div>
        <div class="hampi-start-pin-tip"></div>
      </div>
    `;

    const startIcon = L.divIcon({
      html: startHtml,
      className: "hampi-start-div-icon",
      iconSize: [210, 56],
      iconAnchor: [105, 56],
      popupAnchor: [0, -56]
    });

    const startPopupHtml = `
      <div class="hampi-popup-card start-popup">
        <div class="popup-header-brand">
          <span class="popup-brand-badge">📍 Official Operating Hub</span>
          <h4>Sri Manjunatha Tours & Travels</h4>
        </div>
        <div class="popup-body">
          <p class="popup-desc">
            Conveniently situated on 100 Bed Hospital Road, Hosapete. Our fleet starts here to pick you up at hotels, railway stations, or airport connections.
          </p>
          <div class="popup-info-line">
            <span>📍 100 Bed Hospital Road, Hosapete, Karnataka 583201</span>
          </div>
          <div class="popup-actions-row">
            <a href="tel:919845799414" class="popup-btn-primary">
              📞 Call +91 98457 99414
            </a>
          </div>
        </div>
      </div>
    `;

    const startMarker = L.marker([STARTING_POINT.lat, STARTING_POINT.lng], {
      icon: startIcon,
      zIndexOffset: 1000
    }).bindPopup(startPopupHtml, {
      maxWidth: 290,
      className: "hampi-leaflet-popup"
    });

    startMarker.addTo(mapInstance);

    // 2. 12 Attraction Markers
    HAMPI_PLACES.forEach(function (place) {
      const markerHtml = `
        <div class="hampi-photo-marker-wrap" data-id="${place.id}">
          <div class="hampi-photo-card">
            <div class="hampi-marker-thumb-box">
              <img src="${place.image}" alt="${place.name}" loading="lazy">
            </div>
            <span class="hampi-marker-name">${place.shortName}</span>
          </div>
          <div class="hampi-marker-pin-tip"></div>
        </div>
      `;

      const photoIcon = L.divIcon({
        html: markerHtml,
        className: "hampi-photo-div-icon",
        iconSize: [140, 46],
        iconAnchor: [70, 46],
        popupAnchor: [0, -48]
      });

      const directionsUrl = buildDirectionsUrl(place.name);

      const popupHtml = `
        <div class="hampi-popup-card">
          <div class="popup-thumb-wrap">
            <img src="${place.image}" alt="${place.name}" class="popup-cover-img">
            <span class="popup-category-pill">${place.mapCategory}</span>
          </div>
          <div class="popup-body">
            <div class="popup-subtitle">${place.subCategory}</div>
            <h4 class="popup-title">${place.name}</h4>
            <p class="popup-desc">${place.detailedDesc}</p>
            <div class="popup-distance-badge">
              <span>📍 ${place.approxDistance}</span>
            </div>
            <div class="popup-actions-row">
              <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="popup-btn-primary">
                Get Directions ↗
              </a>
              <button type="button" class="popup-btn-secondary" onclick="window.bookRideForPlace('${place.name.replace(/'/g, "\\'")}')">
                Book Ride
              </button>
            </div>
          </div>
        </div>
      `;

      const marker = L.marker([place.lat, place.lng], {
        icon: photoIcon
      }).bindPopup(popupHtml, {
        maxWidth: 320,
        className: "hampi-leaflet-popup"
      });

      marker.on("click", function () {
        selectedPlaceId = place.id;
        updateActiveChip();
      });

      marker.addTo(mapInstance);
      mapMarkers.set(place.id, marker);
    });

    // Fit initial bounds
    const initialBounds = L.latLngBounds([
      [STARTING_POINT.lat, STARTING_POINT.lng],
      ...HAMPI_PLACES.map(function (p) { return [p.lat, p.lng]; })
    ]);

    mapInstance.fitBounds(initialBounds, {
      padding: [40, 40],
      maxZoom: 13
    });

    // Render chips
    renderBottomChips();

    // Map controls
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
  // 7. BOOKING FORM (Exact match to BookingForm in App.tsx)
  // ==========================================================================
  const bookingForm = document.getElementById("booking-form");
  const formName = document.getElementById("form-name");
  const formMobile = document.getElementById("form-mobile");
  const formFrom = document.getElementById("form-from");
  const formDate = document.getElementById("form-date");
  const formTime = document.getElementById("form-time");
  const formPassengers = document.getElementById("form-passengers");
  const bookingErrorMsg = document.getElementById("booking-error-msg");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!formName.value.trim()) {
        showError("Please enter your name.");
        return;
      }
      if (!formMobile.value.trim()) {
        showError("Please enter your mobile number.");
        return;
      }
      if (!formFrom.value.trim()) {
        showError("Please enter the pickup location.");
        return;
      }
      if (!formToInput.value.trim()) {
        showError("Please enter your destination.");
        return;
      }
      if (!formDate.value) {
        showError("Please select your travel date.");
        return;
      }
      if (!formTime.value) {
        showError("Please choose your pickup time.");
        return;
      }

      hideError();

      const message = `Hello Sri Manjunatha Travels,

I want to book a journey.

Name: ${formName.value.trim()}
Mobile: ${formMobile.value.trim()}
From: ${formFrom.value.trim()}
To: ${formToInput.value.trim()}
Date: ${formDate.value}
Time: ${formTime.value}
Vehicle: ${formVehicleSelect ? formVehicleSelect.value : "Innova"}
Passengers: ${formPassengers ? formPassengers.value : "1"}`;

      sendWhatsAppMessage(message);
    });
  }

  function showError(msg) {
    if (bookingErrorMsg) {
      bookingErrorMsg.textContent = msg;
      bookingErrorMsg.style.display = "block";
    }
  }

  function hideError() {
    if (bookingErrorMsg) {
      bookingErrorMsg.style.display = "none";
    }
  }

  if (formDate) {
    const today = new Date().toISOString().split("T")[0];
    formDate.setAttribute("min", today);
  }

  // ==========================================================================
  // 8. DIRECT WHATSAPP BUTTONS
  // ==========================================================================
  const floatingWhatsAppBtn = document.getElementById("floating-whatsapp-btn");
  if (floatingWhatsAppBtn) {
    floatingWhatsAppBtn.addEventListener("click", function () {
      sendWhatsAppMessage("Hello Sri Manjunatha Travels, I would like to enquire about vehicle booking.");
    });
  }

  const contactWhatsAppBtn = document.getElementById("contact-whatsapp-btn");
  if (contactWhatsAppBtn) {
    contactWhatsAppBtn.addEventListener("click", function () {
      sendWhatsAppMessage("Hello Sri Manjunatha Travels, I would like to check vehicle availability.");
    });
  }

  const footerWhatsAppBtn = document.getElementById("footer-whatsapp-btn");
  if (footerWhatsAppBtn) {
    footerWhatsAppBtn.addEventListener("click", function () {
      sendWhatsAppMessage("Hello Sri Manjunatha Travels.");
    });
  }

})();

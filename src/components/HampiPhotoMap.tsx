import React, { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface HampiPlace {
  id: string;
  name: string;
  shortName: string;
  category: "Heritage & Temples" | "Royal Hampi" | "Views & Sunset" | "Family & Experiences";
  subCategory: string;
  lat: number;
  lng: number;
  image: string;
  description: string;
  approxDistance: string;
}

const HAMPI_PLACES: HampiPlace[] = [
  {
    id: "virupaksha",
    name: "Virupaksha Temple",
    shortName: "Virupaksha",
    category: "Heritage & Temples",
    subCategory: "Active 7th-Century Shiva Shrine",
    lat: 15.3353,
    lng: 76.4600,
    image: "/assets/virupaksha-temple.jpg",
    description:
      "The living sacred heart of Hampi, renowned for its towering 50-metre eastern gopuram, daily rituals, and sacred steps to the Tungabhadra river.",
    approxDistance: "~12 km from Hosapete HQ",
  },
  {
    id: "hampi-bazaar",
    name: "Hampi Bazaar",
    shortName: "Hampi Bazaar",
    category: "Heritage & Temples",
    subCategory: "Ancient Market Street",
    lat: 15.3346,
    lng: 76.4642,
    image: "/assets/hampi-bazaar.jpg",
    description:
      "A kilometre-long colonnaded stone promenade facing Virupaksha Temple, where global merchants traded pearls, silks, and diamonds during the Vijayanagara Empire.",
    approxDistance: "~12.5 km from Hosapete HQ",
  },
  {
    id: "vittala-temple",
    name: "Vijaya Vittala Temple",
    shortName: "Vittala Temple",
    category: "Heritage & Temples",
    subCategory: "Architectural Masterpiece",
    lat: 15.3387,
    lng: 76.4789,
    image: "/assets/vittala-temple.jpg",
    description:
      "Hampi's architectural pinnacle, celebrated worldwide for its 56 carved musical granite pillars (Sa-Re-Ga-Ma pillars) and ornate mandapa halls.",
    approxDistance: "~15 km from Hosapete HQ",
  },
  {
    id: "stone-chariot",
    name: "Stone Chariot",
    shortName: "Stone Chariot",
    category: "Heritage & Temples",
    subCategory: "Iconic Garuda Shrine",
    lat: 15.3389,
    lng: 76.4796,
    image: "/assets/stone-chariot.jpg",
    description:
      "The world-famous monolithic shrine sculpted like an ornate ceremonial chariot, immortalized as a national symbol on the Indian ₹50 currency note.",
    approxDistance: "~15 km from Hosapete HQ",
  },
  {
    id: "lotus-mahal",
    name: "Lotus Mahal",
    shortName: "Lotus Mahal",
    category: "Royal Hampi",
    subCategory: "Indo-Islamic Summer Palace",
    lat: 15.3204,
    lng: 76.4705,
    image: "/assets/lotus-mahal.jpg",
    description:
      "A serene two-storey royal summer pavilion showcasing delicate cusped arches, lotus-bud domes, and an ingenious natural air-cooling design.",
    approxDistance: "~13 km from Hosapete HQ",
  },
  {
    id: "elephant-stables",
    name: "Elephant Stables",
    shortName: "Elephant Stables",
    category: "Royal Hampi",
    subCategory: "Ceremonial Royal Enclosure",
    lat: 15.3207,
    lng: 76.4735,
    image: "/assets/elephant-stables.jpg",
    description:
      "Eleven grand interconnected domed chambers that once sheltered the ceremonial royal war and procession elephants of the Vijayanagara kings.",
    approxDistance: "~13.2 km from Hosapete HQ",
  },
  {
    id: "queens-bath",
    name: "Queen's Bath",
    shortName: "Queen's Bath",
    category: "Royal Hampi",
    subCategory: "Royal Aquatic Pavilion",
    lat: 15.3134,
    lng: 76.4716,
    image: "/assets/queens-bath.jpg",
    description:
      "An exquisite royal aquatic pavilion featuring stepped stone basins, ornate overhanging balconies, and Indo-Islamic vaulted arches.",
    approxDistance: "~12 km from Hosapete HQ",
  },
  {
    id: "ugra-narasimha",
    name: "Ugra Narasimha",
    shortName: "Ugra Narasimha",
    category: "Heritage & Temples",
    subCategory: "Colossal Monolithic Statue",
    lat: 15.3283,
    lng: 76.4578,
    image: "/assets/ugra-narasimha.jpg",
    description:
      "A 6.7-metre tall monolithic sculpture of Lord Narasimha seated in calm yogic posture beneath the protective seven hoods of cosmic serpent Adishesha.",
    approxDistance: "~11.5 km from Hosapete HQ",
  },
  {
    id: "matanga-hill",
    name: "Matanga Hill",
    shortName: "Matanga Hill",
    category: "Views & Sunset",
    subCategory: "Supreme Sunrise & Sunset Vantage",
    lat: 15.3314,
    lng: 76.4683,
    image: "/assets/matanga-hill.jpg",
    description:
      "The highest geographic point in central Hampi, offering unforgettable 360° panoramas over ancient ruins, banana plantations, and boulder valleys.",
    approxDistance: "~13 km from Hosapete HQ",
  },
  {
    id: "hemakuta-hill",
    name: "Hemakuta Hill",
    shortName: "Hemakuta Hill",
    category: "Views & Sunset",
    subCategory: "Pre-Vijayanagara Shrines & Sunset",
    lat: 15.3328,
    lng: 76.4590,
    image: "/assets/hemakuta-hill.jpg",
    description:
      "A gently sloping granite expanse dotted with ancient stone temples, revered as the golden hill where Lord Shiva did penance before marrying Pampa.",
    approxDistance: "~12 km from Hosapete HQ",
  },
  {
    id: "anjanadri-hill",
    name: "Anjanadri Hill",
    shortName: "Anjanadri Hill",
    category: "Views & Sunset",
    subCategory: "Birthplace of Lord Hanuman",
    lat: 15.3533,
    lng: 76.4708,
    image: "/assets/anjanadri-hill.jpg",
    description:
      "Located in mythological Kishkindha across the Tungabhadra river, reachable by 575 stone steps offering sweeping valley vistas and sunset serenity.",
    approxDistance: "~22 km from Hosapete HQ",
  },
  {
    id: "tungabhadra-dam",
    name: "Tungabhadra Dam",
    shortName: "Tungabhadra Dam",
    category: "Family & Experiences",
    subCategory: "Scenic Reservoir & Japanese Gardens",
    lat: 15.2608,
    lng: 76.3400,
    image: "/assets/tungabhadra-dam.jpg",
    description:
      "A grand reservoir near Hosapete featuring expansive water bodies, landscaped Japanese gardens, deer parks, musical fountains, and sunset hilltops.",
    approxDistance: "~6 km from Hosapete HQ",
  },
];

const STARTING_POINT = {
  name: "Sri Manjunatha Travels (HQ)",
  address: "100 Bed Hospital Road, Hosapete, Karnataka 583201",
  lat: 15.2718,
  lng: 76.3920,
};

// Scenic dotted visual journey route line
const ITINERARY_ROUTE_COORDS: [number, number][] = [
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
  [15.3533, 76.4708], // Anjanadri Hill
];

interface HampiPhotoMapProps {
  onBookPlace?: (placeName: string) => void;
}

export const HampiPhotoMap: React.FC<HampiPhotoMapProps> = ({ onBookPlace }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>("virupaksha");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const buildDirectionsUrl = (destinationName: string) => {
    const origin = encodeURIComponent("100 Bed Hospital Road, Hosapete, Karnataka 583201");
    const dest = encodeURIComponent(`${destinationName}, Hampi, Karnataka`);
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}`;
  };

  const handleFlyTo = useCallback((place: HampiPlace) => {
    setSelectedPlaceId(place.id);
    if (!mapInstanceRef.current) return;

    mapInstanceRef.current.flyTo([place.lat, place.lng], 15.5, {
      duration: 1.2,
      easeLinearity: 0.25,
    });

    const marker = markersRef.current.get(place.id);
    if (marker) {
      setTimeout(() => {
        marker.openPopup();
      }, 400);
    }
  }, []);

  const handleResetView = useCallback(() => {
    if (!mapInstanceRef.current) return;
    setSelectedPlaceId(null);

    const bounds = L.latLngBounds([
      [STARTING_POINT.lat, STARTING_POINT.lng],
      ...HAMPI_PLACES.map((p) => [p.lat, p.lng] as [number, number]),
    ]);

    mapInstanceRef.current.fitBounds(bounds, {
      padding: [45, 45],
      maxZoom: 14,
    });
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Teardown previous instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Initialize Map with clean center
    const map = L.map(mapContainerRef.current, {
      center: [15.312, 76.435],
      zoom: 12.5,
      zoomControl: false,
      scrollWheelZoom: false, // Prevents unintended page trapping
    });

    mapInstanceRef.current = map;

    // Clean, light & warm CartoDB Voyager tiles (Tourist Travel style)
    const voyagerTiles = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> &copy; <a href="https://carto.com/" target="_blank">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
        minZoom: 10,
      }
    );
    voyagerTiles.addTo(map);

    // Subtle dashed scenic itinerary route line
    const routeLine = L.polyline(ITINERARY_ROUTE_COORDS, {
      color: "#C68B59",
      weight: 3.5,
      opacity: 0.85,
      dashArray: "7, 10",
      lineCap: "round",
      lineJoin: "round",
    });
    routeLine.addTo(map);

    // ========================================================================
    // 1. SPECIAL STARTING POINT MARKER (Sri Manjunatha Travels HQ)
    // ========================================================================
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
      popupAnchor: [0, -56],
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
            <a href="tel:+919845799414" class="popup-btn-primary">
              📞 Call +91 98457 99414
            </a>
          </div>
        </div>
      </div>
    `;

    const startMarker = L.marker([STARTING_POINT.lat, STARTING_POINT.lng], {
      icon: startIcon,
      zIndexOffset: 1000,
    }).bindPopup(startPopupHtml, {
      maxWidth: 290,
      className: "hampi-leaflet-popup",
    });

    startMarker.addTo(map);

    // ========================================================================
    // 2. ATTRACTION PHOTO MARKERS (12 PLACES)
    // ========================================================================
    const markersMap = new Map<string, L.Marker>();

    HAMPI_PLACES.forEach((place) => {
      const markerHtml = `
        <div class="hampi-photo-marker-wrap" data-id="${place.id}">
          <div class="hampi-photo-card">
            <div class="hampi-marker-thumb-box">
              <img src="${place.image}" alt="${place.name}" loading="lazy" />
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
        popupAnchor: [0, -48],
      });

      const directionsUrl = buildDirectionsUrl(place.name);

      const popupHtml = `
        <div class="hampi-popup-card">
          <div class="popup-thumb-wrap">
            <img src="${place.image}" alt="${place.name}" class="popup-cover-img" />
            <span class="popup-category-pill">${place.category}</span>
          </div>
          <div class="popup-body">
            <div class="popup-subtitle">${place.subCategory}</div>
            <h4 class="popup-title">${place.name}</h4>
            <p class="popup-desc">${place.description}</p>
            <div class="popup-distance-badge">
              <span>📍 ${place.approxDistance}</span>
            </div>
            <div class="popup-actions-row">
              <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="popup-btn-primary">
                Get Directions ↗
              </a>
              <button class="popup-btn-secondary" onclick="window.__hampiBookRide('${place.name.replace(/'/g, "\\'")}')">
                Book Ride
              </button>
            </div>
          </div>
        </div>
      `;

      const marker = L.marker([place.lat, place.lng], {
        icon: photoIcon,
      }).bindPopup(popupHtml, {
        maxWidth: 320,
        className: "hampi-leaflet-popup",
      });

      marker.on("click", () => {
        setSelectedPlaceId(place.id);
      });

      marker.addTo(map);
      markersMap.set(place.id, marker);
    });

    markersRef.current = markersMap;

    // Attach global booking handler for popup buttons
    (window as unknown as { __hampiBookRide?: (placeName: string) => void }).__hampiBookRide = (
      placeName: string
    ) => {
      if (onBookPlace) {
        onBookPlace(placeName);
      } else {
        const bookingElem = document.getElementById("booking");
        if (bookingElem) {
          bookingElem.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    // Fit map to show all attractions + Hosapete on initial load
    const initialBounds = L.latLngBounds([
      [STARTING_POINT.lat, STARTING_POINT.lng],
      ...HAMPI_PLACES.map((p) => [p.lat, p.lng] as [number, number]),
    ]);

    map.fitBounds(initialBounds, {
      padding: [40, 40],
      maxZoom: 13,
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onBookPlace]);

  // Filtered places for the bottom strip
  const displayedPlaces =
    filterCategory === "ALL"
      ? HAMPI_PLACES
      : HAMPI_PLACES.filter((p) => p.category === filterCategory);

  return (
    <section className="hampi-interactive-map-section" id="destinations">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="map-badge-tag-wrap">
            <span className="section-tag">Interactive Tourist Map</span>
            <span className="places-count-pill">12 Places to Explore</span>
          </div>
          <h2 className="section-title">
            Explore Hampi <em>From Here</em>
          </h2>
          <p className="section-subtitle">
            From ancient temples to breathtaking viewpoints, discover the places worth visiting around Hampi.
            Tap any photo marker or destination card below to explore and get instant driving directions.
          </p>
        </div>

        {/* Experience Filter Tabs */}
        <div className="map-filter-nav">
          <button
            className={`map-tab-btn ${filterCategory === "ALL" ? "active" : ""}`}
            onClick={() => setFilterCategory("ALL")}
          >
            All 12 Highlights
          </button>
          <button
            className={`map-tab-btn ${filterCategory === "Heritage & Temples" ? "active" : ""}`}
            onClick={() => setFilterCategory("Heritage & Temples")}
          >
            Heritage & Temples (5)
          </button>
          <button
            className={`map-tab-btn ${filterCategory === "Royal Hampi" ? "active" : ""}`}
            onClick={() => setFilterCategory("Royal Hampi")}
          >
            Royal Hampi (3)
          </button>
          <button
            className={`map-tab-btn ${filterCategory === "Views & Sunset" ? "active" : ""}`}
            onClick={() => setFilterCategory("Views & Sunset")}
          >
            Views & Sunset (3)
          </button>
          <button
            className={`map-tab-btn ${filterCategory === "Family & Experiences" ? "active" : ""}`}
            onClick={() => setFilterCategory("Family & Experiences")}
          >
            Family & Nearby (1)
          </button>
        </div>

        {/* Map Card Shell */}
        <div className="photo-map-card-wrapper">
          {/* Top Info Banner */}
          <div className="map-top-legend-bar">
            <div className="legend-item origin">
              <span className="legend-indicator origin-pulse"></span>
              <strong>Starting Point:</strong>
              <span>Sri Manjunatha Travels (Hosapete HQ)</span>
            </div>
            <div className="legend-item route-note">
              <span className="legend-dashed-line"></span>
              <span>Dotted Line: Suggested Hampi Heritage Circuit</span>
            </div>
          </div>

          {/* Map View Container */}
          <div className="leaflet-map-canvas-container" ref={mapContainerRef} />

          {/* Floating Map Action Controls */}
          <div className="floating-map-controls">
            <button
              className="map-control-btn zoom-in"
              onClick={() => mapInstanceRef.current?.zoomIn()}
              aria-label="Zoom in map"
              title="Zoom In"
            >
              +
            </button>
            <button
              className="map-control-btn zoom-out"
              onClick={() => mapInstanceRef.current?.zoomOut()}
              aria-label="Zoom out map"
              title="Zoom Out"
            >
              −
            </button>
            <button
              className="map-control-btn reset-btn"
              onClick={handleResetView}
              aria-label="Reset map view"
              title="Reset to View All"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="22" y1="12" x2="18" y2="12" />
                <line x1="6" y1="12" x2="2" y2="12" />
                <line x1="12" y1="6" x2="12" y2="2" />
                <line x1="12" y1="22" x2="12" y2="18" />
              </svg>
              <span>Fit All</span>
            </button>
          </div>

          {/* Bottom Horizontal Destination Strip */}
          <div className="map-bottom-strip-container">
            <div className="strip-header-row">
              <span className="strip-title">
                Explore Destinations <em>(Click to fly & view details)</em>
              </span>
              <span className="strip-scroll-hint">Scroll sideways ➔</span>
            </div>

            <div className="destination-chips-scroll-strip">
              {displayedPlaces.map((place) => {
                const isSelected = selectedPlaceId === place.id;
                return (
                  <button
                    key={place.id}
                    className={`destination-chip-card ${isSelected ? "selected" : ""}`}
                    onClick={() => handleFlyTo(place)}
                  >
                    <div className="chip-thumb-wrap">
                      <img src={place.image} alt={place.name} loading="lazy" />
                    </div>
                    <div className="chip-meta">
                      <strong className="chip-name">{place.name}</strong>
                      <span className="chip-cat">{place.subCategory}</span>
                    </div>
                    {isSelected && <span className="chip-active-dot">●</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

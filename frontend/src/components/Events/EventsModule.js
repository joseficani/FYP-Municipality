import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventsModule.css";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  Share2,
  Users,
  Building2,
  Heart,
  ExternalLink,
  Search,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Community",
  "Arts & Culture",
  "Sports & Recreation",
  "Government",
  "Health & Wellness",
  "Education",
];

const EVENTS = [
  {
    id: "1",
    title: "Annual City Summer Festival",
    shortDescription:
      "Join us for a weekend of music, food, and community celebration in the heart of downtown.",
    description: `The Annual City Summer Festival is back and bigger than ever! This year, we are celebrating our city's vibrant culture with over 50 local vendors, live music performances from regional bands, and a dedicated kids' zone with games and activities.

Friday night kicks off with a "Taste of the City" event where local restaurants showcase their best dishes. Saturday features a full day of concerts and art installations. Sunday wraps up with a community parade and fireworks display.

Don't miss this opportunity to connect with neighbors and experience the best our city has to offer. Parking is free in all municipal garages for the duration of the event.`,
    date: "Fri, Jul 12, 2025",
    time: "5:00 PM",
    duration: "3 Days",
    location: "Downtown Plaza",
    address: "100 Main St, City Center",
    category: "Community",
    organizer: "City Events Committee",
    cost: "Free",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1400",
    gallery: [
      "https://images.unsplash.com/photo-1514525253440-b393452e3383?w=800",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    ],
    featured: true,
  },
  {
    id: "2",
    title: "Downtown Farmers Market",
    shortDescription:
      "Fresh local produce, handmade crafts, and artisan goods every Saturday morning.",
    description: `Support local agriculture and artisans at our weekly Downtown Farmers Market. Browse a wide selection of seasonal fruits and vegetables, fresh-baked breads, local honey, and handcrafted jewelry and art.

Live acoustic music provides a relaxing atmosphere while you shop. This week features a special cooking demonstration by Chef Maria from The Local Table at 10:00 AM, showing how to prepare summer squash in three delicious ways.

Bring your reusable bags and enjoy a morning of fresh air and community spirit. SNAP/EBT is accepted at the information booth.`,
    date: "Sat, Mar 15, 2025",
    time: "8:00 AM",
    duration: "4 Hours",
    location: "Market Square",
    address: "200 Market St",
    category: "Community",
    organizer: "Downtown Business Association",
    cost: "Free",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=800",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
      "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=800",
    ],
    featured: false,
  },
  {
    id: "3",
    title: "Youth Soccer League Kickoff",
    shortDescription:
      "Opening day for the spring youth soccer league. Games, registration, and fun.",
    description: `It's time to kick off the spring season! The Youth Soccer League opening day welcomes players of all ages and skill levels. Teams will meet their coaches, receive uniforms, and participate in friendly scrimmages.

Parents can visit the registration tent for any last-minute sign-ups or to volunteer. We will also have a gear swap station where families can donate or pick up gently used soccer equipment.

Food trucks will be on-site serving breakfast and lunch options. Come cheer on our future stars!`,
    date: "Sat, Mar 22, 2025",
    time: "9:00 AM",
    duration: "5 Hours",
    location: "Riverside Sports Complex",
    address: "450 River Rd",
    category: "Sports & Recreation",
    organizer: "Parks & Recreation Dept",
    cost: "$50 Registration",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800",
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800",
      "https://images.unsplash.com/photo-1575361204480-aadea25d46b3?w=800",
    ],
    featured: false,
  },
  {
    id: "4",
    title: "Modern Art Gallery Opening",
    shortDescription:
      'Grand opening of the new "City Perspectives" exhibit featuring local artists.',
    description: `Experience the city through the eyes of its artists at the "City Perspectives" gallery opening. This new exhibit features over 30 works ranging from photography and oil painting to sculpture and mixed media.

Meet the artists during the reception from 6:00 PM to 8:00 PM. Light refreshments and wine will be served. The curator will give a brief talk at 7:00 PM discussing the themes of urban growth and community identity found in the collection.

This event is open to the public and art is available for purchase, with a portion of proceeds benefiting the City Arts Fund.`,
    date: "Fri, Apr 04, 2025",
    time: "6:00 PM",
    duration: "3 Hours",
    location: "Municipal Art Center",
    address: "78 Art Ave",
    category: "Arts & Culture",
    organizer: "Arts Council",
    cost: "Free",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1518998053901-5348d3969105?w=800",
      "https://images.unsplash.com/photo-1507643179173-617d654f3daf?w=800",
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800",
    ],
    featured: false,
  },
  {
    id: "5",
    title: "Town Hall Meeting: Urban Planning",
    shortDescription:
      "Open forum to discuss the new 5-year urban development plan.",
    description: `Your voice matters! Join the City Council and Urban Planning Department for a town hall meeting to discuss the proposed 5-year development plan. Topics will include zoning changes, new park developments, and transportation infrastructure improvements.

The meeting will begin with a presentation of the current proposal, followed by a Q&A session and public comment period. Residents are encouraged to review the draft plan on the city website prior to the meeting.

Childcare will be provided on-site. The meeting will also be streamed live on the city's YouTube channel.`,
    date: "Tue, Apr 08, 2025",
    time: "7:00 PM",
    duration: "2 Hours",
    location: "City Hall Auditorium",
    address: "1 Civic Center Plaza",
    category: "Government",
    organizer: "City Council",
    cost: "Free",
    image:
      "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800",
      "https://images.unsplash.com/photo-1541872703-74c5963631df?w=800",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    ],
    featured: false,
  },
  {
    id: "6",
    title: "Community Yoga in the Park",
    shortDescription:
      "Free beginner-friendly yoga session under the oaks. Bring your own mat.",
    description: `Start your weekend with mindfulness and movement. Our "Yoga in the Park" series returns this spring, led by certified instructors from local studios. This session is designed for all levels, from complete beginners to experienced yogis.

The class focuses on gentle stretching, balance, and breathing exercises to reduce stress and improve flexibility. Please bring your own yoga mat, a towel, and a water bottle.

In case of rain, the event will be moved to the Community Center Gym. No registration required—just show up and breathe!`,
    date: "Sat, Apr 12, 2025",
    time: "8:30 AM",
    duration: "1 Hour",
    location: "Centennial Park",
    address: "500 Park Blvd",
    category: "Health & Wellness",
    organizer: "Healthy City Initiative",
    cost: "Free",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=800",
      "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=800",
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800",
    ],
    featured: false,
  },
  {
    id: "7",
    title: "Public Library Book Sale",
    shortDescription:
      "Huge selection of used books, DVDs, and audiobooks at bargain prices.",
    description: `Fill your shelves and support the library! The Friends of the Library semi-annual book sale offers thousands of gently used books across all genres. Hardcovers are $2, paperbacks are $1, and children's books are just 50 cents.

Sunday is "Bag Sale" day—fill a grocery bag for just $5. All proceeds go towards funding library programs, including summer reading challenges and technology upgrades.

Volunteers are available to help carry purchases to your car. Cash and credit cards accepted.`,
    date: "Sat, Apr 19, 2025",
    time: "10:00 AM",
    duration: "6 Hours",
    location: "Main Library",
    address: "300 Library Ln",
    category: "Education",
    organizer: "Friends of the Library",
    cost: "Free Entry",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
    ],
    featured: false,
  },
  {
    id: "8",
    title: "Nature Trail Guided Walk",
    shortDescription:
      "Learn about local flora and fauna on a guided hike through the nature preserve.",
    description: `Explore the beauty of our local ecosystem on a guided nature walk. A park ranger will lead the group through the 2-mile loop trail, identifying native plants, bird species, and signs of wildlife.

This is an easy-to-moderate hike suitable for families. Binoculars are recommended for bird watching. Please wear comfortable walking shoes and bring water.

We will meet at the trailhead parking lot. Dogs are welcome but must be kept on a leash at all times.`,
    date: "Sun, Apr 20, 2025",
    time: "2:00 PM",
    duration: "2 Hours",
    location: "Greenwood Nature Preserve",
    address: "800 Forest Rd",
    category: "Sports & Recreation",
    organizer: "Parks & Recreation Dept",
    cost: "Free",
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
      "https://images.unsplash.com/photo-1501854140884-074bf6b24363?w=800",
    ],
    featured: false,
  },
];

export default function EventsModule() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const featuredEvent = EVENTS.find((e) => e.featured) || EVENTS[0];

  const filteredEvents = useMemo(() => {
    return EVENTS.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    window.scrollTo(0, 0);
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    window.scrollTo(0, 0);
  };

  if (selectedEvent) {
    return <EventDetail event={selectedEvent} onBack={handleBackToEvents} />;
  }

  return (
    <main className="events-main-shell">
      <section className="eventsHeroHeader">
        <div className="eventsContainer eventsHeroInner">
          <div className="eventsHeroText">
            <h1 className="eventsPageTitle">Events &amp; Updates</h1>
            <p className="eventsPageSubtitle">
              Stay informed about the latest events happening in your town.
            </p>
          </div>

          <button
            className="newsButton"
            type="button"
            onClick={() => navigate("/news")}
          >
            Check our latest news →
          </button>
        </div>
      </section>

      <FeaturedBanner event={featuredEvent} onViewDetails={handleViewDetails} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <section className="events-list-section">
        <div className="events-list-top">
          <div>
            <h2>
              {selectedCategory === "All"
                ? "Upcoming Events"
                : `${selectedCategory} Events`}
            </h2>
            <p>
              Showing {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "event" : "events"} in your
              community
            </p>
          </div>

          <div className="events-search-wrap">
            <Search className="events-search-icon" size={16} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={handleViewDetails}
                onRsvp={(eventItem) =>
                  navigate("/register-event", { state: { event: eventItem } })
                }
              />
            ))}
          </div>
        ) : (
          <div className="events-empty-box">
            <div className="events-empty-icon-wrap">
              <Search size={28} />
            </div>
            <h3>No events found</h3>
            <p>Try selecting a different category or check back later.</p>
            <button type="button" onClick={() => setSelectedCategory("All")}>
              View all events
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="events-category-filter">
      <div className="events-category-inner">
        <div className="events-category-scroll">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`events-category-btn ${isActive ? "active" : ""}`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, onClick, onRsvp }) {
  return (
    <div className="event-card">
      <div className="event-card-image-wrap" onClick={() => onClick(event)}>
        <img src={event.image} alt={event.title} className="event-card-image" />
        <div className="event-card-badge">{event.category}</div>
      </div>

      <div className="event-card-body">
        <h3>{event.title}</h3>

        <div className="event-card-meta">
          <div className="event-meta-item">
            <Calendar size={16} />
            <span>{event.date}</span>
          </div>

          <div className="event-meta-item">
            <Clock size={16} />
            <span>{event.time}</span>
          </div>

          <div className="event-meta-item">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="event-card-actions">
          <button
            type="button"
            className="event-details-btn"
            aria-label={`View details for ${event.title}`}
            onClick={() => onClick(event)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

function FeaturedBanner({ event, onViewDetails }) {
  return (
    <section className="featured-banner">
      <img
        src={event.image}
        alt={event.title}
        className="featured-banner-img"
      />
      <div className="featured-banner-overlay"></div>

      <div className="featured-banner-content">
        <div className="featured-top-badge">Featured Event</div>

        <div className="featured-bottom-content">
          <div className="featured-category-tag">{event.category}</div>

          <h2>{event.title}</h2>

          <div className="featured-meta-row">
            <div>
              <Calendar size={18} />
              {event.date}
            </div>
            <div>
              <Clock size={18} />
              {event.time}
            </div>
            <div>
              <MapPin size={18} />
              {event.location}
            </div>
          </div>

          <p>{event.shortDescription}</p>

          <button
            type="button"
            className="featured-btn"
            onClick={() => onViewDetails(event)}
          >
            View Details
          </button>
        </div>
      </div>
    </section>
  );
}

function EventDetail({ event, onBack }) {
  const [activeImage, setActiveImage] = useState(event.image);
  const navigate = useNavigate();

  return (
    <div className="event-detail-page">
      <div className="event-detail-topbar">
        <div className="event-detail-topbar-inner">
          <button type="button" onClick={onBack} className="event-back-btn">
            <ChevronLeft size={20} />
            Back to Events
          </button>
        </div>
      </div>

      <div className="event-detail-container">
        <div className="event-detail-grid">
          <div className="event-detail-main">
            <div className="event-detail-main-image-wrap">
              <img
                src={activeImage}
                alt={event.title}
                className="event-detail-main-image"
              />
              <div className="event-detail-main-badge">{event.category}</div>
            </div>

            {event.gallery && event.gallery.length > 0 && (
              <div className="event-gallery-row">
                <button
                  type="button"
                  onClick={() => setActiveImage(event.image)}
                  className={`event-gallery-thumb ${
                    activeImage === event.image ? "active" : ""
                  }`}
                >
                  <img src={event.image} alt="Main view" />
                </button>

                {event.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`event-gallery-thumb ${
                      activeImage === img ? "active" : ""
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            <div className="event-detail-content-box">
              <h1>{event.title}</h1>

              {event.description.split("\n\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="event-detail-sidebar">
            <div className="event-detail-sidebar-sticky">
              <div className="event-info-card">
                <div className="event-info-card-header">
                  <h2>Event Details</h2>
                </div>

                <div className="event-info-card-body">
                  <div className="event-info-item">
                    <Calendar size={18} />
                    <div>
                      <p className="label">Date</p>
                      <p>{event.date}</p>
                    </div>
                  </div>

                  <div className="event-info-item">
                    <Clock size={18} />
                    <div>
                      <p className="label">Time</p>
                      <p>
                        {event.time} ({event.duration})
                      </p>
                    </div>
                  </div>

                  <div className="event-info-item">
                    <MapPin size={18} />
                    <div>
                      <p className="label">Location</p>
                      <p className="bold">{event.location}</p>
                      <p className="sub">{event.address}</p>
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        View on Map <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="event-info-item">
                    <Building2 size={18} />
                    <div>
                      <p className="label">Organizer</p>
                      <p>{event.organizer}</p>
                    </div>
                  </div>

                  <div className="event-info-item">
                    <Users size={18} />
                    <div>
                      <p className="label">Cost</p>
                      <p>{event.cost}</p>
                    </div>
                  </div>

                  <hr />

                  <button
                    type="button"
                    className="event-rsvp-btn"
                    onClick={() =>
                      navigate("/register-event", { state: { event } })
                    }
                  >
                    Register / RSVP
                  </button>

                  <div className="event-side-actions">
                    <button type="button">
                      <Share2 size={16} />
                      Share
                    </button>
                    <button type="button">
                      <Heart size={16} />
                      Save
                    </button>
                  </div>
                </div>
              </div>

              <div className="event-help-card">
                <h3>Need Assistance?</h3>
                <p>
                  For questions about accessibility or event details, please
                  contact the organizer.
                </p>
                <a href="/" onClick={(e) => e.preventDefault()}>
                  Contact Organizer →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
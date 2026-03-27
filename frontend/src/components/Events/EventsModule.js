import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const API_BASE_URL = "http://localhost:5000/api";

const CATEGORIES = [
  "All",
  "Community",
  "Arts & Culture",
  "Sports & Recreation",
  "Government",
  "Health & Wellness",
  "Education",
];

export default function EventsModule() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/events`);
      setEvents(res.data.data || []);
    } catch (error) {
      console.error("Fetch events error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const featuredEvent = events.find((e) => e.featured) || events[0];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;

      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    window.scrollTo(0, 0);
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <main className="events-main-shell">
        <div style={{ padding: "2rem" }}>Loading events...</div>
      </main>
    );
  }

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

      {featuredEvent && (
        <FeaturedBanner event={featuredEvent} onViewDetails={handleViewDetails} />
      )}

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
                key={event._id}
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
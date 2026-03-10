import React, { useState } from "react";
import "./RegisterModule.css";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Share2,
  Heart,
  User,
  ArrowLeft,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegisterModule() {
  const navigate = useNavigate();
  const location = useLocation();

  const event = location.state?.event || {
    title: "Annual City Summer Festival",
    category: "Community",
    date: "Fri, Jul 12, 2025",
    time: "5:00 PM",
    duration: "3 Days",
    location: "Downtown Plaza",
    address: "100 Main St, City Center",
    organizer: "City Events Committee",
    cost: "Free",
    image:
      "https://cdn.magicpatterns.com/uploads/eeT5gs8W6YmsSinrMRTbRY/Screenshot_2026-02-28_192336.jpg",
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    attendees: 1,
    attendeeType: "Adult",
    specialNeeds: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted:", formData);
    alert("Registration submitted successfully!");
  };

  return (
    <main className="register-main">
      <div className="register-container">
        <div className="register-breadcrumb">
          <button
            type="button"
            className="register-back-link"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Back to Event Details
          </button>
        </div>

        <div className="register-page-header">
          <h1>Register / RSVP</h1>
          <p>Complete the form below to secure your spot for this event.</p>
        </div>

        <div className="register-grid">
          <div className="register-form-column">
            <div className="registration-form-card">
              <div className="registration-form-inner">
                <h2>Attendee Information</h2>

                <form onSubmit={handleSubmit} className="registration-form">
                  <div className="form-grid">
                    <div className="form-group form-group-full">
                      <label htmlFor="fullName">
                        Full Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label htmlFor="email">
                        Email Address <span>*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                      />
                    </div>

                    <div className="form-group form-group-full">
                      <label htmlFor="phone">
                        Phone Number <small>(Optional)</small>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="attendees">Number of Attendees</label>
                      <input
                        type="number"
                        id="attendees"
                        name="attendees"
                        min="1"
                        max="10"
                        value={formData.attendees}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="attendeeType">Attendee Type</label>
                      <select
                        id="attendeeType"
                        name="attendeeType"
                        value={formData.attendeeType}
                        onChange={handleChange}
                      >
                        <option value="Adult">Adult (18+)</option>
                        <option value="Child">Child (Under 18)</option>
                        <option value="Senior">Senior (65+)</option>
                      </select>
                    </div>

                    <div className="form-group form-group-full">
                      <label htmlFor="specialNeeds">
                        Dietary Restrictions or Special Needs <small>(Optional)</small>
                      </label>
                      <textarea
                        id="specialNeeds"
                        name="specialNeeds"
                        rows="4"
                        value={formData.specialNeeds}
                        onChange={handleChange}
                        placeholder="Please let us know if you require any accommodations..."
                      />
                    </div>

                    <div className="form-group form-group-full checkbox-group">
                      <div className="checkbox-row">
                        <input
                          id="agreedToTerms"
                          name="agreedToTerms"
                          type="checkbox"
                          required
                          checked={formData.agreedToTerms}
                          onChange={handleChange}
                        />
                        <div>
                          <label htmlFor="agreedToTerms">
                            I agree to the event terms and conditions <span>*</span>
                          </label>
                          <p>
                            By checking this box, you agree to our community
                            guidelines and cancellation policy.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="submit-wrap">
                    <button type="submit" className="complete-btn">
                      Complete Registration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="register-summary-column">
            <div className="register-summary-sticky">
              <div className="event-summary-card">
                <div className="event-summary-image-wrap">
                  <img src={event.image} alt={event.title} />
                  <div className="event-summary-badge">{event.category}</div>
                </div>

                <div className="event-summary-body">
                  <h2>{event.title}</h2>

                  <div className="event-summary-info">
                    <div className="summary-item">
                      <Calendar size={18} />
                      <div>
                        <p className="label">Date</p>
                        <p>{event.date}</p>
                      </div>
                    </div>

                    <div className="summary-item">
                      <Clock size={18} />
                      <div>
                        <p className="label">Time</p>
                        <p>
                          {event.time} ({event.duration})
                        </p>
                      </div>
                    </div>

                    <div className="summary-item">
                      <MapPin size={18} />
                      <div>
                        <p className="label">Location</p>
                        <p>{event.location}</p>
                        <p>{event.address}</p>
                        <a href="/" onClick={(e) => e.preventDefault()}>
                          View on Map ↗
                        </a>
                      </div>
                    </div>

                    <div className="summary-item">
                      <User size={18} />
                      <div>
                        <p className="label">Organizer</p>
                        <p>{event.organizer}</p>
                      </div>
                    </div>

                    <div className="summary-item">
                      <DollarSign size={18} />
                      <div>
                        <p className="label">Cost</p>
                        <p>{event.cost}</p>
                      </div>
                    </div>
                  </div>

                  <div className="event-summary-actions">
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

              <div className="register-help-card">
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
    </main>
  );
}
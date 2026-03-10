import React from "react";
import "./ContactModule.css";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

export default function ContactModule() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent successfully.");
  };

  return (
    <main className="contact-main-shell">
      <HeroSection />

      <section className="contact-content-section">
        <div className="contact-content-container">
          <div className="contact-grid">
            <div className="contact-form-column">
              <ContactForm onSubmit={handleSubmit} />
            </div>

            <div className="contact-info-column">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <MapSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="contact-hero">
      <div className="contact-hero-inner">
        <div className="contact-hero-badge">
          <Mail size={14} />
          <span>MUNICIPAL</span>
        </div>

        <h1>Contact MuniciPal</h1>

        <p>
          Have a question, suggestion, or need assistance? We’re here to help.
          Through MuniciPal, we aim to provide you with quick and easy access to
          your municipality.
        </p>
      </div>
    </section>
  );
}

function ContactForm({ onSubmit }) {
  return (
    <div className="contact-card">
      <h2>Send Us a Message</h2>
      <p className="contact-card-subtitle">
        We will get back to you as soon as possible.
      </p>

      <form className="contact-form" onSubmit={onSubmit}>
        <div className="contact-form-row">
          <div className="contact-field">
            <label htmlFor="firstName">
              First Name <span>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="e.g. John"
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="lastName">
              Last Name <span>*</span>
            </label>
            <input type="text" id="lastName" placeholder="e.g. Doe" required />
          </div>
        </div>

        <div className="contact-form-row">
          <div className="contact-field">
            <label htmlFor="email">
              Email Address <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="e.g. john.doe@example.com"
              required
            />
          </div>

          <div className="contact-field">
            <label htmlFor="phone">
              Phone Number <small>(Optional)</small>
            </label>
            <input type="tel" id="phone" placeholder="e.g. +961 1 234 567" />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="subject">
            Subject <span>*</span>
          </label>
          <input
            type="text"
            id="subject"
            placeholder="How can we help you?"
            required
          />
        </div>

        <div className="contact-field">
          <label htmlFor="message">
            Your Message <span>*</span>
          </label>
          <textarea
            id="message"
            rows="5"
            placeholder="Please describe your inquiry, request, or feedback in detail..."
            required
          ></textarea>
        </div>

        <button type="submit" className="contact-submit-btn">
          Send Message
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="contact-card contact-info-card">
      <h2>Get in Touch</h2>
      <p className="contact-card-subtitle">
        Prefer to reach out directly? Use the contact details below to get in
        touch with us.
      </p>

      <div className="contact-info-list">
        <div className="contact-info-item">
          <div className="contact-info-icon">
            <Phone size={18} />
          </div>
          <div>
            <h3>Phone</h3>
            <p>+961 1 234 567</p>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="contact-info-icon">
            <Mail size={18} />
          </div>
          <div>
            <h3>Email</h3>
            <p>info@municipal.gov.lb</p>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="contact-info-icon">
            <MapPin size={18} />
          </div>
          <div>
            <h3>Address</h3>
            <p>
              Municipality Building, Main Street
              <br />
              Beirut, Lebanon
            </p>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="contact-info-icon">
            <Clock size={18} />
          </div>
          <div className="contact-hours-box">
            <h3>Office Hours</h3>

            <div className="contact-hours-row">
              <span>Monday - Friday</span>
              <strong>8:00 AM - 2:00 PM</strong>
            </div>

            <div className="contact-hours-row">
              <span>Saturday</span>
              <strong>8:00 AM - 12:00 PM</strong>
            </div>

            <div className="contact-hours-row closed">
              <span>Sunday</span>
              <strong>Closed</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-social-section">
        <h3>Follow Us</h3>
        <div className="contact-social-links">
          <a href="/" onClick={(e) => e.preventDefault()} aria-label="Facebook">
            <Facebook size={16} />
          </a>
          <a href="/" onClick={(e) => e.preventDefault()} aria-label="Twitter">
            <Twitter size={16} />
          </a>
          <a
            href="/"
            onClick={(e) => e.preventDefault()}
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
function MapSection() {
  return (
    <section className="contact-map-section">
      <div className="contact-map-container">
        <div className="contact-map-header">
          <div className="contact-map-badge">
            <MapPin size={14} />
            <span>FIND US</span>
          </div>

          <h2>Find Us</h2>

          <p>
            Visit our main office during working hours. Use the map below to get
            directions to Kaa El Rim.
          </p>
        </div>

        <div className="contact-map-box">
          <iframe
            title="Kaa El Rim Map"
            src="https://www.google.com/maps?q=33.8841188,35.8752279&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="contact-map-overlay-card">
            <h3>Kaa El Rim</h3>
            <p>Main Office</p>
            <a
              href="https://www.google.com/maps?q=33.8841188,35.8752279"
              target="_blank"
              rel="noreferrer"
            >
              View larger map
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
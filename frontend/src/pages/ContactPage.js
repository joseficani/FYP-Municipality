import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ContactModule from "../components/Contact/ContactModule";
import "../components/Contact/ContactModule.css";

export default function ContactPage() {
  return (
    <div className="contact-page-shell">
      <Header solid />
      <ContactModule />
      <Footer />
    </div>
  );
}
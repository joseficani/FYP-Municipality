import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import EventsModule from "../components/Events/EventsModule";
import "../components/Events/EventsModule.css";

export default function EventsPage() {
  return (
    <div className="events-page-shell">
      <Header solid/>
      <EventsModule />
      <Footer />
    </div>
  );
}
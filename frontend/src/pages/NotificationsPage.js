import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NotificationsModule from "../components/notifications/NotificationsModule";

export default function NotificationsPage() {
  return (
    <div className="notifications-page-shell">
      <Header solid />
      <NotificationsModule />
      <Footer />
    </div>
  );
}
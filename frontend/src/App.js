import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import AfterLoginPage from "./pages/AfterLoginPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import CertificatesPage from "./pages/CertificatesPage";
import TransactionsPage from "./pages/TransactionsPage";
import TaxesFeesPage from "./pages/TaxesFeesPage";
import EventsPage from "./pages/EventsPage";
import RegisterPage from "./pages/RegisterPage";
import ContactPage from "./pages/ContactPage";
import EditProfilePage from "./pages/EditProfilePage";
import NewsPage from "./pages/NewsPage";
import DetailsNews from "./pages/DetailsNewsPage";
import AIAssistant from "./pages/AIAssistantPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/dashboard" element={<AfterLoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/taxes-fees" element={<TaxesFeesPage />} />
        <Route path="/events-news" element={<EventsPage />} />
        <Route path="/register-event" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<DetailsNews />} />
        <Route path="/licenses-permits" element={<LicensesPermits />} />
        
        {/* <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<DetailsNews />} />
        <Route path="/ai-assistant" element={<AIAssistant />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
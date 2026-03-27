import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
// import CreateAccountPage from "./pages/CreateAccountPage";
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
import LicensesPermits from "./pages/LicensesPermitsPage";
import BeforeLogin from "./pages/BeforeLoginPage";
import Projects from "./pages/ProjectsPage";
import MeetTheTeam from "./pages/MeetTheTeam";
import Complaints from "./pages/ComplaintsPage";
import AdminDashboard from "./pages/AdminDashboardPage";
import SignUpPage from "./components/BeforeLogin/SignUp";
import AdminRequests from "./pages/AdminRequestsPage";
import AdminTaxes from "./pages/AdminTaxesPage";
import AdminPermits from "./pages/AdminPermitsPage";
import UsersManagement from "./pages/AdminUserPage";
import ComplaintsOverview from "./pages/AdminComplaintsPage";
import AdminNewsPage from "./pages/AdminNewsPage";  
import AdminEvents from "./pages/AdminEventsPage";
import FindOutMorePage from "./pages/FindOutMorePage";
import TaxApplicationModule from "./components/Taxes/TaxApplicationModule";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
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
        <Route path="/projects" element={<Projects />} />
        <Route path="/meet-the-team" element={<MeetTheTeam />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-requests" element={<AdminRequests />} />
        <Route path="/admin-taxes" element={<AdminTaxes />} />
        <Route path="/admin-permits" element={<AdminPermits />} />  
        <Route path="/admin-users" element={<UsersManagement />} />
        <Route path="/admin-complaints" element={<ComplaintsOverview />} />
        <Route path="/admin-news" element={<AdminNewsPage />} />
        <Route path="admin-events" element={<AdminEvents />} />
        <Route path="/find-out-more" element={<FindOutMorePage />} />  
        <Route path="/tax-application" element={<TaxApplicationModule />} />
        <Route path="/" element={<BeforeLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
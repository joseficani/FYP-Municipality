import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
 
export default function TopBar() {
  const location = useLocation();
 
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin-dashboard":
        return "Dashboard";
      case "/admin-users":
        return "Users Management";
      case "/admin-events":
        return "Events";
      case "/admin-news":
        return "News";
      case "/admin-permits":
        return "Permits";
      case "/admin-complaints":
        return "Complaints";
      case "/admin-requests":
        return "Requests";
      case "/admin-taxes":
        return "Taxes & Fees";
      default:
        return "Admin Panel";
    }
  };
 
  const pageTitle = getPageTitle();
 
  return (
    <header className="ad-topbar">
      {/* LEFT */}
      <div className="ad-topbar-left">
        <h2 className="ad-topbar-title">{pageTitle}</h2>
 
        <p className="ad-topbar-breadcrumb">
          Menu / <span>{pageTitle}</span>
        </p>
      </div>
 
      {/* CENTER SEARCH */}
      <div className="ad-topbar-center">
        <div className="ad-search-wrap">
          <Search className="ad-search-icon" size={16} />
 
          <input
            type="text"
            placeholder="Search activity..."
            className="ad-search-input"
          />
        </div>
      </div>
 
      {/* RIGHT PROFILE */}
      <div className="ad-topbar-right">
        <div className="ad-profile-wrap">
          <div className="ad-profile-text">
            <p>Jane Doe</p>
            <span>City Administrator</span>
          </div>
 
          <button className="ad-profile-btn" type="button">
            <div className="ad-profile-avatar">JD</div>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
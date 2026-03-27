import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  FileCheck,
  ScrollText,
  Receipt,
  Settings,
  ClipboardList,
  UserCog,
} from "lucide-react";
 
function NavItem({ icon: Icon, label, active = false, onClick }) {
  return (
    <button
      className={`ad-nav-item ${active ? "active" : ""}`}
      type="button"
      onClick={onClick}
    >
      <Icon className="ad-nav-icon" size={18} />
      <span>{label}</span>
    </button>
  );
}
 
export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
 
  return (
    <aside className="ad-sidebar">
      <div className="ad-sidebar-logo">
        <h1>MuniciPal</h1>
      </div>
 
      <nav className="ad-sidebar-nav">
        <div className="ad-nav-group-title">Menu</div>
        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          active={location.pathname === "/admin-dashboard"}
          onClick={() => navigate("/admin-dashboard")}
        />
 
        <div className="ad-nav-group-title ad-nav-group-space">Management</div>
 
        <NavItem
          icon={ClipboardList}
          label="Complaint"
          active={location.pathname === "/admin-complaints"}
          onClick={() => navigate("/admin-complaints")}
        />
 
        <NavItem
          icon={FileCheck}
          label="Permits"
          active={location.pathname === "/admin-permits"}
          onClick={() => navigate("/admin-permits")}
        />
 
        <NavItem
          icon={ScrollText}
          label="Requests"
          active={location.pathname === "/admin-requests"}
          onClick={() => navigate("/admin-requests")}
        />
 
        <NavItem
          icon={Calendar}
          label="Events"
          active={location.pathname === "/admin-events"}
          onClick={() => navigate("/admin-events")}
        />
 
        <NavItem
          icon={Newspaper}
          label="News"
          active={location.pathname === "/admin-news"}
          onClick={() => navigate("/admin-news")}
        />
 
        <NavItem
          icon={Receipt}
          label="Taxes & Fees"
          active={location.pathname === "/admin-taxes"}
          onClick={() => navigate("/admin-taxes")}
        />
 
        <NavItem
          icon={UserCog}
          label="Users Management"
          active={location.pathname === "/admin-users"}
          onClick={() => navigate("/admin-users")}
        />
      </nav>
 
      <div className="ad-sidebar-bottom">
        <NavItem
          icon={Settings}
          label="Settings"
          active={location.pathname === "/admin-settings"}
          onClick={() => navigate("/admin-settings")}
        />
      </div>
    </aside>
  );
}
 
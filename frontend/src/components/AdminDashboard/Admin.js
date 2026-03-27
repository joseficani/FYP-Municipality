import React from "react";

import "./Admin.css";

import {

  Calendar,

  MessageSquareWarning,

  FileCheck,

  ScrollText,

  FileText,

  Plus,

  CalendarPlus,

  Megaphone,

  MoreHorizontal,

  AlertCircle,

  ArrowUpRight,

  ArrowDownRight,

  Loader2,

} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Sidebar from "./SideBar";

import TopBar from "./TopBar";

/* ---------------- UI HELPERS ---------------- */

function Badge({ children, variant = "default", className = "" }) {

  return (
    <span className={`ad-badge ad-badge-${variant} ${className}`}>

      {children}
    </span>

  );

}

function Button({

  children,

  variant = "primary",

  size = "md",

  isLoading = false,

  leftIcon,

  className = "",

  disabled,

  ...props

}) {

  return (
    <button

      className={`ad-btn ad-btn-${variant} ad-btn-${size} ${className}`}

      disabled={disabled || isLoading}

      {...props}
    >

      {isLoading && <Loader2 className="ad-btn-spin" size={16} />}

      {!isLoading && leftIcon && <span className="ad-btn-left">{leftIcon}</span>}

      {children}
    </button>

  );

}

function Card({ children, className = "", noPadding = false, onClick }) {

  return (
    <div

      className={`ad-card ${noPadding ? "ad-card-no-padding" : "ad-card-padding"} ${onClick ? "ad-card-clickable" : ""

        } ${className}`}

      onClick={onClick}
    >

      {children}
    </div>

  );

}

/* ---------------- STAT CARDS ---------------- */

function StatCard({

  title,

  value,

  trend,

  trendUp,

  icon: Icon,

  colorClass,

  iconClass,

}) {

  return (
    <Card className="ad-stat-card">
      <div className="ad-stat-top">
        <div className={`ad-stat-icon ${colorClass}`}>
          <Icon className={iconClass} size={20} />
        </div>

        <div className={`ad-stat-trend ${trendUp ? "up" : "down"}`}>

          {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}

          {trend}
        </div>
      </div>

      <div className="ad-stat-bottom">
        <p className="ad-stat-title">{title}</p>
        <h3 className="ad-stat-value">{value}</h3>
      </div>
    </Card>

  );

}

function StatCards() {

  const stats = [

    {

      title: "Total Complaints",

      value: "142",

      trend: "12%",

      trendUp: true,

      icon: MessageSquareWarning,

      colorClass: "amber",

      iconClass: "amber-text",

    },

    {

      title: "Pending Permits",

      value: "50",

      trend: "5%",

      trendUp: false,

      icon: FileCheck,

      colorClass: "blue",

      iconClass: "blue-text",

    },

    {

      title: "New Requests",

      value: "70",

      trend: "23%",

      trendUp: true,

      icon: ScrollText,

      colorClass: "green",

      iconClass: "green-text",

    },

    {

      title: "Upcoming Events",

      value: "10",

      trend: "5%",

      trendUp: true,

      icon: Calendar,

      colorClass: "purple",

      iconClass: "purple-text",

    },

  ];

  return (
    <div className="ad-stats-grid">

      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />

      ))}
    </div>

  );

}

/* ---------------- QUICK ACTIONS ---------------- */

function QuickActions() {

  const navigate = useNavigate();

  return (
    <div className="ad-quick-actions">
      <Button leftIcon={<FileText size={14} />}>

        File Complaint
      </Button>

      <Button

        variant="outline"

        leftIcon={<Plus size={14} />}

        onClick={() => navigate("/admin-permits")}
      >

        Check Permits
      </Button>

      <Button

        variant="outline"

        leftIcon={<CalendarPlus size={14} />}

        onClick={() => navigate("/admin-events")}
      >

        Check Event
      </Button>

      <Button

        variant="outline"

        leftIcon={<Megaphone size={14} />}

        onClick={() => navigate("/admin-news")}
      >

        Check News
      </Button>
    </div>

  );

}

/* ---------------- RECENT ACTIVITY ---------------- */

function RecentActivity() {

  const activities = [

    {

      id: 1,

      type: "Complaint",

      description: "Noise complaint reported in District 4",

      date: "2 hours ago",

      status: "pending",

      icon: AlertCircle,

      iconColor: "amber-text",

    },

    {

      id: 2,

      type: "Permit",

      description: "Construction permit application #4829",

      date: "4 hours ago",

      status: "review",

      icon: FileText,

      iconColor: "blue-text",

    },

    {

      id: 3,

      type: "Events",

      description: "Summer Festival planning meeting",

      date: "4 hours ago",

      status: "approved",

      icon: Calendar,

      iconColor: "purple-text",

    },

    {

      id: 4,

      type: "Complaint",

      description: "Road maintenance request on Street...",

      date: "1 day ago",

      status: "rejected",

      icon: AlertCircle,

      iconColor: "red-text",

    },

  ];

  const getStatusBadge = (status) => {

    switch (status) {

      case "approved":

        return <Badge variant="success">Approved</Badge>;

      case "pending":

        return <Badge variant="warning">Pending</Badge>;

      case "review":

        return <Badge variant="info">In Review</Badge>;

      case "rejected":

        return <Badge variant="danger">Rejected</Badge>;

      default:

        return <Badge variant="neutral">{status}</Badge>;

    }

  };

  return (
    <Card noPadding className="ad-recent-card">
      <div className="ad-table-header">
        <h3>Recent Activity</h3>
        <button className="ad-view-all-btn" type="button">

          View All
        </button>
      </div>

      <div className="ad-table-wrap">
        <table className="ad-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Date</th>
              <th>Status</th>
              <th className="right">Action</th>
            </tr>
          </thead>

          <tbody>

            {activities.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="ad-type-cell">
                    <item.icon className={item.iconColor} size={15} />
                    <span>{item.type}</span>
                  </div>
                </td>
                <td className="ad-truncate">{item.description}</td>
                <td>{item.date}</td>
                <td>{getStatusBadge(item.status)}</td>
                <td className="right">
                  <button className="ad-more-btn" type="button">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </Card>

  );

}

/* ---------------- DASHBOARD CONTENT ---------------- */

function DashboardContent() {

  return (
    <main className="ad-main-content">
      <div className="ad-dashboard-panel">
        <StatCards />

        <div className="ad-section-block">
          <h2>Quick Actions</h2>
          <QuickActions />
        </div>

        <div className="ad-content-grid">
          <div className="ad-left-panel">
            <RecentActivity />
          </div>
        </div>

        <div className="ad-bottom-grid">
          <Card>
            <div className="ad-widget-head">
              <h3 className="ad-widget-title">Upcoming Events</h3>
              <button className="ad-view-all-btn" type="button">

                View All
              </button>
            </div>

            <div className="ad-deadline-list">
              <div className="ad-deadline-item">
                <div className="ad-date-box blue">
                  <span>JUNE</span>
                  <strong>12</strong>
                </div>
                <div>
                  <p className="ad-deadline-title">C.O.B Dance Event</p>
                  <p className="ad-deadline-sub">8:00 PM · Park Balade</p>
                </div>
              </div>

              <div className="ad-deadline-item">
                <div className="ad-date-box blue">
                  <span>AUG</span>
                  <strong>20</strong>
                </div>
                <div>
                  <p className="ad-deadline-title">Wael Kfoury Concert</p>
                  <p className="ad-deadline-sub">8:00 PM · Hotel Kadri</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="ad-widget-head">
              <h3 className="ad-widget-title">Upcoming Deadlines</h3>
              <button className="ad-view-all-btn" type="button">

                View All
              </button>
            </div>

            <div className="ad-deadline-list">
              <div className="ad-deadline-item">
                <div className="ad-date-box red">
                  <span>JUNE</span>
                  <strong>12</strong>
                </div>
                <div>
                  <p className="ad-deadline-title">Tax Filing Deadline</p>
                  <p className="ad-deadline-sub">Commercial properties Q1</p>
                </div>
              </div>

              <div className="ad-deadline-item">
                <div className="ad-date-box blue">
                  <span>AUG</span>
                  <strong>20</strong>
                </div>
                <div>
                  <p className="ad-deadline-title">Council Meeting</p>
                  <p className="ad-deadline-sub">Monthly planning session</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>

  );

}

/* ---------------- PAGE ---------------- */

export default function AdminDashboard() {

  return (
    <div className="ad-page">
      <div className="ad-shell">
        <Sidebar />
        <div className="ad-main-area">
          <TopBar />
          <DashboardContent />
        </div>
      </div>
    </div>

  );

}

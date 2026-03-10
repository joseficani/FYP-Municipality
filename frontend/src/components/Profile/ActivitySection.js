import React, { useState } from "react";
import "./ProfileComponents.css";
import {
  FileText,
  AlertCircle,
  Award,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function ActivitySection() {
  const [activeTab, setActiveTab] = useState("complaints");

  const tabs = [
    { id: "complaints", label: "Complaints", icon: AlertCircle },
    { id: "permits", label: "Permits", icon: FileText },
    { id: "certificates", label: "Certificates", icon: Award },
  ];

  return (
    <div className="activity-card">
      <div className="activity-header">
        <h2 className="activity-title">My Activities</h2>
        <p className="activity-subtitle">
          Track the status of your interactions with the municipality
        </p>
      </div>

      <div className="activity-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`activity-tab ${isActive ? "active" : ""}`}
            >
              <Icon className="activity-tab-icon" size={16} />
              <span>{tab.label}</span>
              {isActive && <div className="activity-tab-line"></div>}
            </button>
          );
        })}
      </div>

      <div className="activity-content">
        {activeTab === "complaints" && <ComplaintsList />}
        {activeTab === "permits" && <PermitsList />}
        {activeTab === "certificates" && <CertificatesList />}
      </div>

      <div className="activity-footer">
        <button type="button" className="activity-history-btn">
          View Full History <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    pending: {
      className: "status-pending",
      icon: Clock,
      label: "Pending",
    },
    resolved: {
      className: "status-resolved",
      icon: CheckCircle,
      label: "Resolved",
    },
    rejected: {
      className: "status-rejected",
      icon: XCircle,
      label: "Rejected",
    },
    "in-progress": {
      className: "status-progress",
      icon: Clock,
      label: "In Progress",
    },
  };

  const current = map[status];
  const Icon = current.icon;

  return (
    <span className={`status-badge ${current.className}`}>
      <Icon size={12} />
      {current.label}
    </span>
  );
}

function ComplaintsList() {
  const items = [
    {
      id: 1,
      title: "Pothole on Elm Street",
      date: "Oct 24, 2023",
      idCode: "CMP-2023-892",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Street Light Malfunction",
      date: "Sep 12, 2023",
      idCode: "CMP-2023-541",
      status: "resolved",
    },
    {
      id: 3,
      title: "Missed Garbage Collection",
      date: "Aug 05, 2023",
      idCode: "CMP-2023-322",
      status: "resolved",
    },
  ];

  return (
    <div className="activity-list">
      {items.map((item) => (
        <div key={item.id} className="activity-item">
          <div className="activity-item-top">
            <div>
              <h3 className="activity-item-title">{item.title}</h3>
              <p className="activity-item-id">ID: {item.idCode}</p>
            </div>

            <StatusBadge status={item.status} />
          </div>

          <div className="activity-item-bottom">
            <span className="activity-item-date">Submitted: {item.date}</span>
            <ChevronRight size={16} className="activity-item-arrow" />
          </div>
        </div>
      ))}

      <button type="button" className="activity-add-btn">
        <AlertCircle size={16} />
        Report New Issue
      </button>
    </div>
  );
}

function PermitsList() {
  const items = [
    {
      id: 1,
      title: "Home Renovation Permit",
      date: "Nov 02, 2023",
      idCode: "PRM-2023-112",
      status: "pending",
    },
    {
      id: 2,
      title: "Street Parking Permit",
      date: "Jan 15, 2023",
      idCode: "PRM-2023-004",
      status: "resolved",
    },
  ];

  return (
    <div className="activity-list">
      {items.map((item) => (
        <div key={item.id} className="activity-item">
          <div className="activity-item-top">
            <div>
              <h3 className="activity-item-title">{item.title}</h3>
              <p className="activity-item-id">ID: {item.idCode}</p>
            </div>

            <StatusBadge status={item.status} />
          </div>

          <div className="activity-item-bottom">
            <span className="activity-item-date">Submitted: {item.date}</span>
            <ChevronRight size={16} className="activity-item-arrow" />
          </div>
        </div>
      ))}

      <button type="button" className="activity-add-btn">
        <FileText size={16} />
        Request New Permit
      </button>
    </div>
  );
}

function CertificatesList() {
  const items = [
    {
      id: 1,
      title: "Residency Certificate",
      date: "Mar 10, 2023",
      idCode: "CRT-2023-551",
      status: "resolved",
    },
  ];

  return (
    <div className="activity-list">
      {items.map((item) => (
        <div key={item.id} className="activity-item">
          <div className="activity-item-top">
            <div>
              <h3 className="activity-item-title">{item.title}</h3>
              <p className="activity-item-id">ID: {item.idCode}</p>
            </div>

            <StatusBadge status={item.status} />
          </div>

          <div className="activity-item-bottom">
            <span className="activity-item-date">Issued: {item.date}</span>
            <button type="button" className="activity-download-btn">
              Download PDF
            </button>
          </div>
        </div>
      ))}

      <button type="button" className="activity-add-btn">
        <Award size={16} />
        Request Certificate
      </button>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileComponents.css";
import {
  FileText,
  AlertCircle,
  Award,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Receipt,
  Briefcase,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:5000/api";

export default function ActivitySection() {
  const [activeTab, setActiveTab] = useState("complaints");
  const [activities, setActivities] = useState({
    complaints: [],
    permits: [],
    certificates: [],
    taxes: [],
    projectsTenders: [],
  });
  const [loading, setLoading] = useState(true);
  const [removingTaxId, setRemovingTaxId] = useState("");

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const res = await axios.get(`${API_BASE_URL}/users/me/activities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data?.data || {};

      setActivities({
        complaints: data.complaints || [],
        permits: data.permits || [],
        certificates: data.certificates || [],
        taxes: data.taxes || [],
        projectsTenders: data.projectsTenders || [],
      });
    } catch (error) {
      console.error("Fetch activities error:", error);
      console.error("Server response:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleRemoveTaxFromProfile = async (taxId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      setRemovingTaxId(taxId);

      const res = await axios.patch(
        `${API_BASE_URL}/tax-applications/${taxId}/hide`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        setActivities((prev) => ({
          ...prev,
          taxes: prev.taxes.filter((item) => item._id !== taxId),
        }));
      }
    } catch (error) {
      console.error("Remove tax from profile error:", error);
      alert(
        error.response?.data?.message ||
          "Failed to remove tax application from profile."
      );
    } finally {
      setRemovingTaxId("");
    }
  };

  const tabs = [
    { id: "complaints", label: "Complaints", icon: AlertCircle },
    { id: "permits", label: "Permits", icon: FileText },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "taxes", label: "Taxes & Fees", icon: Receipt },
    { id: "projectsTenders", label: "Projects & Tenders", icon: Briefcase },
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
        {loading ? (
          <p>Loading activities...</p>
        ) : (
          <>
            {activeTab === "complaints" && (
              <ComplaintsList items={activities.complaints} />
            )}

            {activeTab === "permits" && (
              <PermitsList items={activities.permits} />
            )}

            {activeTab === "certificates" && (
              <CertificatesList items={activities.certificates} />
            )}

            {activeTab === "taxes" && (
              <TaxesList
                items={activities.taxes}
                onRemove={handleRemoveTaxFromProfile}
                removingTaxId={removingTaxId}
              />
            )}

            {activeTab === "projectsTenders" && (
              <ProjectsTendersList items={activities.projectsTenders} />
            )}
          </>
        )}
      </div>

      <div className="activity-footer">
        <button type="button" className="activity-history-btn" onClick={fetchActivities}>
          Refresh History <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = (status || "").toLowerCase();

  const map = {
    pending: {
      className: "status-pending",
      icon: Clock,
      label: "Pending",
    },
    review: {
      className: "status-progress",
      icon: Clock,
      label: "Under Review",
    },
    under_review: {
      className: "status-progress",
      icon: Clock,
      label: "Under Review",
    },
    "under review": {
      className: "status-progress",
      icon: Clock,
      label: "Under Review",
    },
    in_review: {
      className: "status-progress",
      icon: Clock,
      label: "Under Review",
    },
    approved: {
      className: "status-resolved",
      icon: CheckCircle,
      label: "Approved",
    },
    rejected: {
      className: "status-rejected",
      icon: XCircle,
      label: "Rejected",
    },
    resolved: {
      className: "status-resolved",
      icon: CheckCircle,
      label: "Resolved",
    },
    completed: {
      className: "status-resolved",
      icon: CheckCircle,
      label: "Completed",
    },
    "in-progress": {
      className: "status-progress",
      icon: Clock,
      label: "In Progress",
    },
    open: {
      className: "status-pending",
      icon: Clock,
      label: "Open",
    },
    closed: {
      className: "status-resolved",
      icon: CheckCircle,
      label: "Closed",
    },
  };

  const current = map[normalized] || {
    className: "status-pending",
    icon: Clock,
    label: status || "Pending",
  };

  const Icon = current.icon;

  return (
    <span className={`status-badge ${current.className}`}>
      <Icon size={12} />
      {current.label}
    </span>
  );
}

function ComplaintsList({ items }) {
  return (
    <div className="activity-list">
      {items.length === 0 ? (
        <p>No complaints yet.</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="activity-item">
            <div className="activity-item-top">
              <div>
                <h3 className="activity-item-title">
                  {item.title || item.subject || "Complaint"}
                </h3>
                <p className="activity-item-id">
                  ID: {item.complaintId || item._id}
                </p>
              </div>

              <StatusBadge status={item.status} />
            </div>

            <div className="activity-item-bottom">
              <span className="activity-item-date">
                Submitted:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
              <ChevronRight size={16} className="activity-item-arrow" />
            </div>
          </div>
        ))
      )}

      <Link className="activity-add-btn" to="/complaints">
        <AlertCircle size={16} />
        Report New Issue
      </Link>
    </div>
  );
}

function PermitsList({ items }) {
  return (
    <div className="activity-list">
      {items.length === 0 ? (
        <p>No permits requested yet.</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="activity-item">
            <div className="activity-item-top">
              <div>
                <h3 className="activity-item-title">
                  {item.permitTitle || item.permitId?.title || "Permit Request"}
                </h3>
                <p className="activity-item-id">ID: {item._id}</p>
              </div>

              <StatusBadge status={item.status} />
            </div>

            <div className="activity-item-bottom">
              <span className="activity-item-date">
                Submitted:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
              <ChevronRight size={16} className="activity-item-arrow" />
            </div>

            {item.adminNote ? (
              <div className="activity-item-note">
                <strong>Admin note:</strong> {item.adminNote}
              </div>
            ) : null}
          </div>
        ))
      )}

      <Link className="activity-add-btn" to="/licenses-permits">
        <FileText size={16} />
        Request New Permit
      </Link>
    </div>
  );
}

function CertificatesList({ items }) {
  return (
    <div className="activity-list">
      {items.length === 0 ? (
        <p>No certificates yet.</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="activity-item">
            <div className="activity-item-top">
              <div>
                <h3 className="activity-item-title">
                  {item.title || item.certificateTitle || "Certificate"}
                </h3>
                <p className="activity-item-id">
                  ID: {item.certificateId || item._id}
                </p>
              </div>

              <StatusBadge status={item.status} />
            </div>

            <div className="activity-item-bottom">
              <span className="activity-item-date">
                Issued:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
              {item.pdfUrl ? (
                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="activity-download-btn"
                >
                  Download PDF
                </a>
              ) : (
                <button type="button" className="activity-download-btn">
                  Download PDF
                </button>
              )}
            </div>
          </div>
        ))
      )}

      <Link className="activity-add-btn" to="/certificates">
        <Award size={16} />
        Request Certificate
      </Link>
    </div>
  );
}

function TaxesList({ items, onRemove, removingTaxId }) {
  return (
    <div className="activity-list">
      {items.length === 0 ? (
        <p>No taxes or fees submitted yet.</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="activity-item">
            <div className="activity-item-top">
              <div>
                <h3 className="activity-item-title">
                  {item.taxTitle || item.taxId?.title || "Tax / Fee Request"}
                </h3>
                <p className="activity-item-id">ID: {item._id}</p>
              </div>

              <StatusBadge status={item.status} />
            </div>

            <div className="activity-item-bottom">
              <span className="activity-item-date">
                Submitted:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : item.submittedAt
                  ? new Date(item.submittedAt).toLocaleDateString()
                  : "N/A"}
              </span>
              <ChevronRight size={16} className="activity-item-arrow" />
            </div>

            {(item.propertyReference || item.address) && (
              <div className="activity-item-note">
                <strong>Reference:</strong>{" "}
                {item.propertyReference || item.address}
              </div>
            )}

            {item.adminNote ? (
              <div className="activity-item-note">
                <strong>Admin note:</strong> {item.adminNote}
              </div>
            ) : null}

            <div className="activity-item-actions">
              <button
                type="button"
                className="activity-remove-btn"
                onClick={() => onRemove(item._id)}
                disabled={removingTaxId === item._id}
              >
                <Trash2 size={14} />
                {removingTaxId === item._id ? "Removing..." : "Remove from profile"}
              </button>
            </div>
          </div>
        ))
      )}

      <Link className="activity-add-btn" to="/taxes-fees">
        <Receipt size={16} />
        Submit Tax / Fee
      </Link>
    </div>
  );
}

function ProjectsTendersList({ items }) {
  return (
    <div className="activity-list">
      {items.length === 0 ? (
        <p>No project or tender activities yet.</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="activity-item">
            <div className="activity-item-top">
              <div>
                <h3 className="activity-item-title">
                  {item.title || item.projectTitle || item.tenderTitle || "Project / Tender"}
                </h3>
                <p className="activity-item-id">ID: {item._id}</p>
              </div>

              <StatusBadge status={item.status} />
            </div>

            <div className="activity-item-bottom">
              <span className="activity-item-date">
                Date:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
              <ChevronRight size={16} className="activity-item-arrow" />
            </div>

            {item.description ? (
              <div className="activity-item-note">
                <strong>Details:</strong> {item.description}
              </div>
            ) : null}
          </div>
        ))
      )}

      <Link className="activity-add-btn" to="/projects-tenders">
        <Briefcase size={16} />
        View Projects & Tenders
      </Link>
    </div>
  );
}
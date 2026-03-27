import React, { useEffect, useMemo, useState } from "react";
import "./adminPermits.css";
import Sidebar from "../SideBar";
import TopBar from "../TopBar";
import {
  Plus,
  Search,
  MapPin,
  Pencil,
  Trash2,
  ArrowLeft,
  Check,
  XCircle,
  AlertCircle,
  FileText,
  Calendar,
  User,
  X,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

/* ---------------------------------------------------
   HELPERS
--------------------------------------------------- */

function getCategoryLabel(category) {
  if (!category) return "Other";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function getCategoryClass(category) {
  switch (category) {
    case "construction":
      return "pm-badge pm-badge-blue";
    case "business":
      return "pm-badge pm-badge-green";
    case "event":
      return "pm-badge pm-badge-yellow";
    case "renovation":
      return "pm-badge pm-badge-gray";
    default:
      return "pm-badge pm-badge-gray";
  }
}

function getStatusClass(status) {
  switch (status) {
    case "pending":
      return "pm-badge pm-badge-yellow";
    case "review":
    case "in_review":
      return "pm-badge pm-badge-blue";
    case "approved":
      return "pm-badge pm-badge-green";
    case "rejected":
      return "pm-badge pm-badge-red";
    default:
      return "pm-badge pm-badge-gray";
  }
}

function getStatusLabel(status) {
  switch (status) {
    case "pending":
      return "Pending";
    case "review":
    case "in_review":
      return "Request Info";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return status || "Unknown";
  }
}

/* ---------------------------------------------------
   SAFE JSON PARSER
--------------------------------------------------- */

async function getSafeJson(response) {
  const rawText = await response.text();

  try {
    return JSON.parse(rawText);
  } catch {
    console.error("Non-JSON response:", rawText);
    throw new Error(
      "The server returned HTML instead of JSON. Check your backend route and URL."
    );
  }
}

/* ---------------------------------------------------
   SUCCESS MODAL
--------------------------------------------------- */

function ActionSuccessModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="pm-modal-overlay">
      <div className="pm-modal-backdrop" onClick={onClose}></div>

      <div className="pm-success-box">
        <div className="pm-success-icon-wrap">
          <Check size={26} />
        </div>

        <h3 className="pm-success-title">Success</h3>
        <p className="pm-success-text">{message}</p>

        <button type="button" className="pm-primary-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   CREATE / EDIT MODAL
--------------------------------------------------- */

function PermitTypeModal({
  isOpen,
  onClose,
  onSave,
  editingPermit,
  saving,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "construction",
    processingTime: "",
    requiredDocuments: "",
    requiresLocation: true,
    iconName: "FileText",
    isActive: true,
  });

  useEffect(() => {
    if (editingPermit) {
      setForm({
        title: editingPermit.title || "",
        description: editingPermit.description || "",
        category: editingPermit.category || "construction",
        processingTime: editingPermit.processingTime || "",
        requiredDocuments: Array.isArray(editingPermit.requiredDocuments)
          ? editingPermit.requiredDocuments.join(", ")
          : "",
        requiresLocation: !!editingPermit.requiresLocation,
        iconName: editingPermit.iconName || "FileText",
        isActive:
          typeof editingPermit.isActive === "boolean"
            ? editingPermit.isActive
            : true,
      });
    } else {
      setForm({
        title: "",
        description: "",
        category: "construction",
        processingTime: "",
        requiredDocuments: "",
        requiresLocation: true,
        iconName: "FileText",
        isActive: true,
      });
    }
  }, [editingPermit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      processingTime: form.processingTime.trim(),
      requiredDocuments: form.requiredDocuments
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      requiresLocation: form.requiresLocation,
      iconName: form.iconName,
      isActive: form.isActive,
    });
  };

  return (
    <div className="pm-modal-overlay">
      <div className="pm-modal-backdrop" onClick={onClose}></div>

      <div className="pm-modal-box">
        <div className="pm-modal-header">
          <h3>{editingPermit ? "Edit Permit Type" : "Add Permit Type"}</h3>

          <button
            type="button"
            className="pm-modal-close"
            onClick={onClose}
            disabled={saving}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="pm-modal-form">
          <div className="pm-form-group">
            <label>Permit Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="pm-form-group">
            <label>Description</label>
            <textarea
              rows="3"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>

          <div className="pm-form-grid">
            <div className="pm-form-group">
              <label>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="construction">Construction</option>
                <option value="business">Business</option>
                <option value="event">Event</option>
                <option value="renovation">Renovation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="pm-form-group">
              <label>Processing Time</label>
              <input
                type="text"
                value={form.processingTime}
                onChange={(e) =>
                  setForm({ ...form, processingTime: e.target.value })
                }
                placeholder="e.g. 5-7 business days"
                required
              />
            </div>
          </div>

          <div className="pm-form-grid">
            <div className="pm-form-group">
              <label>Icon Name</label>
              <select
                value={form.iconName}
                onChange={(e) => setForm({ ...form, iconName: e.target.value })}
              >
                <option value="FileText">FileText</option>
                <option value="Hammer">Hammer</option>
                <option value="Briefcase">Briefcase</option>
                <option value="Home">Home</option>
                <option value="Calendar">Calendar</option>
              </select>
            </div>

            <div className="pm-form-group">
              <label>Status</label>
              <select
                value={String(form.isActive)}
                onChange={(e) =>
                  setForm({
                    ...form,
                    isActive: e.target.value === "true",
                  })
                }
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pm-form-group">
            <label>Required Documents</label>
            <textarea
              rows="3"
              value={form.requiredDocuments}
              onChange={(e) =>
                setForm({ ...form, requiredDocuments: e.target.value })
              }
              placeholder="Separate with commas"
              required
            />
          </div>

          <div className="pm-checkbox-row">
            <input
              id="requiresLocation"
              type="checkbox"
              checked={form.requiresLocation}
              onChange={(e) =>
                setForm({ ...form, requiresLocation: e.target.checked })
              }
            />
            <label htmlFor="requiresLocation">
              This permit type requires location/map information
            </label>
          </div>

          <div className="pm-modal-footer">
            <button
              type="button"
              className="pm-secondary-btn"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button type="submit" className="pm-primary-btn" disabled={saving}>
              {saving
                ? editingPermit
                  ? "Updating..."
                  : "Creating..."
                : editingPermit
                ? "Update Permit Type"
                : "Add Permit Type"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------------------------------
   APPLICATION DETAIL PANEL
--------------------------------------------------- */

function PermitApplicationDetailPanel({
  permit,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onRequestInfo,
  updatingStatus,
}) {
  if (!permit) return null;

  const documents = permit.documents || [];

  return (
    <>
      <div
        className={`pm-side-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`pm-side-panel ${isOpen ? "show" : ""}`}>
        <div className="pm-side-header">
          <h3>Permit Details</h3>
          <button type="button" className="pm-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="pm-side-body">
          <div className="pm-detail-top">
            <span className={getStatusClass(permit.status)}>
              {getStatusLabel(permit.status)}
            </span>
            <span className="pm-detail-id">ID: {permit._id}</span>
          </div>

          <div className="pm-detail-card">
            <h4>
              <User size={18} />
              Applicant Information
            </h4>

            <p className="pm-detail-label">Name</p>
            <p className="pm-detail-value">
              {permit.firstName} {permit.lastName}
            </p>

            <p className="pm-detail-label">Contact</p>
            <p className="pm-detail-value">{permit.email}</p>
            <p className="pm-detail-value">{permit.phone}</p>
          </div>

          <div className="pm-detail-card">
            <h4>
              <FileText size={18} />
              Permit Information
            </h4>

            <p className="pm-detail-label">Permit Type</p>
            <p className="pm-detail-value">
              {permit.permitTitle || permit.permitId?.title || "N/A"}
            </p>

            <p className="pm-detail-label">Submission Date</p>
            <p className="pm-detail-value pm-inline">
              <Calendar size={15} />
              {permit.createdAt
                ? new Date(permit.createdAt).toLocaleDateString()
                : "N/A"}
            </p>

            <p className="pm-detail-label">Location</p>
            <p className="pm-detail-value pm-inline">
              <MapPin size={15} />
              {permit.location?.address || "No location"}
            </p>

            <p className="pm-detail-label">Address</p>
            <p className="pm-detail-value">{permit.address || "No address"}</p>

            {permit.adminNote ? (
              <>
                <p className="pm-detail-label">Admin Note</p>
                <p className="pm-detail-value">{permit.adminNote}</p>
              </>
            ) : null}
          </div>

          <div className="pm-detail-card">
            <h4>Uploaded Documents</h4>

            <div className="pm-doc-list">
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <div className="pm-doc-item" key={index}>
                    <div className="pm-doc-left">
                      <FileText size={16} />
                      <div>
                        <p>Document {index + 1}</p>
                        <span>{doc}</span>
                      </div>
                    </div>

                    <a
                      href={`http://localhost:5000${doc}`}
                      target="_blank"
                      rel="noreferrer"
                      className="pm-doc-view-btn"
                    >
                      View
                    </a>
                  </div>
                ))
              ) : (
                <p className="pm-detail-value">No documents uploaded.</p>
              )}
            </div>
          </div>

          <div className="pm-detail-card">
            <h4>
              <MapPin size={18} />
              Location Map
            </h4>
            <div className="pm-map-box">
              <div className="pm-map-placeholder">Map Preview</div>
            </div>
            <p className="pm-map-text">
              {permit.location?.address || "No mapped location"}
            </p>
          </div>
        </div>

        <div className="pm-side-footer">
          <button
            type="button"
            className="pm-success-btn"
            onClick={() => onApprove(permit)}
            disabled={updatingStatus}
          >
            <Check size={16} />
            {updatingStatus ? "Updating..." : "Approve"}
          </button>

          <button
            type="button"
            className="pm-danger-btn"
            onClick={() => onReject(permit)}
            disabled={updatingStatus}
          >
            <XCircle size={16} />
            {updatingStatus ? "Updating..." : "Reject"}
          </button>

          <button
            type="button"
            className="pm-secondary-btn"
            onClick={() => onRequestInfo(permit)}
            disabled={updatingStatus}
          >
            <AlertCircle size={16} />
            {updatingStatus ? "Updating..." : "Request Info"}
          </button>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------
   PAGE
--------------------------------------------------- */

export default function PermitsAdminPage() {
  const [permitTypes, setPermitTypes] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [savingPermit, setSavingPermit] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState("types");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPermit, setEditingPermit] = useState(null);

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    message: "",
  });

  const token = localStorage.getItem("token");

  const showSuccess = (message) => {
    setSuccessModal({
      isOpen: true,
      message,
    });
  };

  const closeSuccess = () => {
    setSuccessModal({
      isOpen: false,
      message: "",
    });
  };

  const handleUnauthorized = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isLoggedIn");
    alert("Your session has expired or you are not authorized.");
    window.location.href = "/";
  };

  const fetchPermitTypes = async () => {
    try {
      setLoadingTypes(true);

      const response = await fetch(`${API_BASE_URL}/permits-catalog`);
      const result = await getSafeJson(response);

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch permits.");
      }

      setPermitTypes(result.data || []);
    } catch (error) {
      console.error("Fetch permit types error:", error);
      setPermitTypes([]);
    } finally {
      setLoadingTypes(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoadingApplications(true);

      if (!token) {
        setApplications([]);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/permits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await getSafeJson(response);

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch applications.");
      }

      setApplications(result.data || []);
    } catch (error) {
      console.error("Fetch applications error:", error);
      setApplications([]);
    } finally {
      setLoadingApplications(false);
    }
  };

  useEffect(() => {
    fetchPermitTypes();
    fetchApplications();
  }, []);

  const filteredPermitTypes = useMemo(() => {
    return permitTypes.filter((permit) => {
      const matchesSearch =
        searchQuery === "" ||
        permit.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permit.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || permit.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [permitTypes, searchQuery, categoryFilter]);

  const filteredApplications = useMemo(() => {
    return applications.filter((permit) => {
      const applicantName =
        `${permit.firstName || ""} ${permit.lastName || ""}`.trim();
      const locationAddress = permit.location?.address || "";
      const permitType = permit.permitTitle || permit.permitId?.title || "";

      const matchesSearch =
        searchQuery === "" ||
        applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        locationAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        permitType.toLowerCase().includes(searchQuery.toLowerCase());

      const permitCategory = permit.permitId?.category || "";

      const matchesCategory =
        categoryFilter === "all" || permitCategory === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [applications, searchQuery, categoryFilter]);

  const handleSavePermitType = async (data) => {
    try {
      setSavingPermit(true);

      if (!token) {
        alert("Please login as admin first.");
        return;
      }

      const url = editingPermit
        ? `${API_BASE_URL}/permits-catalog/${editingPermit._id}`
        : `${API_BASE_URL}/permits-catalog`;

      const method = editingPermit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await getSafeJson(response);

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to save permit.");
      }

      await fetchPermitTypes();

      setIsModalOpen(false);
      setEditingPermit(null);

      showSuccess(
        editingPermit
          ? "Permit updated successfully."
          : "Permit created successfully."
      );
    } catch (error) {
      console.error("Save permit error:", error);
      alert(error.message || "Failed to save permit.");
    } finally {
      setSavingPermit(false);
    }
  };

  const handleEditPermit = (permit) => {
    setEditingPermit(permit);
    setIsModalOpen(true);
  };

  const handleDeletePermit = async (permit) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${permit.title}"?`
    );

    if (!confirmDelete) return;

    try {
      if (!token) {
        alert("Please login as admin first.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/permits-catalog/${permit._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await getSafeJson(response);

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete permit.");
      }

      await fetchPermitTypes();
      showSuccess("Permit deleted successfully.");
    } catch (error) {
      console.error("Delete permit error:", error);
      alert(error.message || "Failed to delete permit.");
    }
  };

  const updateApplicationStatus = async (
    applicationId,
    status,
    successMessage
  ) => {
    try {
      if (!token) {
        alert("Please login as admin first.");
        return;
      }

      setUpdatingStatus(true);

      const response = await fetch(
        `${API_BASE_URL}/permits/${applicationId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await getSafeJson(response);

      if (response.status === 401 || response.status === 403) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to update application status.");
      }

      await fetchApplications();

      if (selectedApplication && selectedApplication._id === applicationId) {
        setSelectedApplication(result.data);
      }

      showSuccess(successMessage);
    } catch (error) {
      console.error("Update application status error:", error);
      alert(error.message || "Failed to update application status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleApproveApplication = async (permit) => {
    await updateApplicationStatus(
      permit._id,
      "approved",
      "Permit request approved successfully."
    );
  };

  const handleRejectApplication = async (permit) => {
    await updateApplicationStatus(
      permit._id,
      "rejected",
      "Permit request rejected successfully."
    );
  };

  const handleRequestInfoApplication = async (permit) => {
    await updateApplicationStatus(
      permit._id,
      "review",
      "Permit request marked as request info successfully."
    );
  };

  const handleShowApplications = () => {
    setViewMode("applications");
    setSelectedApplication(null);
    setIsDetailOpen(false);
  };

  const handleBackToTypes = () => {
    setViewMode("types");
    setSelectedApplication(null);
    setIsDetailOpen(false);
  };

  const handleOpenApplication = (permit) => {
    setSelectedApplication(permit);
    setIsDetailOpen(true);
  };

  return (
    <div className="ad-page">
      <div className="ad-shell">
        <Sidebar activeItem="Permits" />

        <div className="ad-main-area">
          <TopBar
            title="Dashboard"
            breadcrumb="Management / Requests"
            userName="Jane Doe"
            userRole="City Administrator"
            userInitials="JD"
            searchPlaceholder="Search activity..."
          />

          <main className="ad-main-content">
            <div className="ad-dashboard-panel">
              <div className="pm-panel-head">
                <div>
                  {viewMode === "applications" && (
                    <button
                      type="button"
                      className="pm-back-btn"
                      onClick={handleBackToTypes}
                    >
                      <ArrowLeft size={16} />
                      Back to Permit Types
                    </button>
                  )}

                  <h2 className="pm-page-title">Permits Management</h2>
                </div>

                {viewMode === "types" && (
                  <button
                    type="button"
                    className="pm-add-btn"
                    onClick={() => {
                      setEditingPermit(null);
                      setIsModalOpen(true);
                    }}
                  >
                    <Plus size={16} />
                    Add Permit Type
                  </button>
                )}
              </div>

              <div className="pm-toolbar">
                <div className="pm-search-box">
                  <Search size={16} className="pm-search-icon" />
                  <input
                    type="text"
                    placeholder={
                      viewMode === "types"
                        ? "Search permit types..."
                        : "Search by applicant or location..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <select
                  className="pm-filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">
                    {viewMode === "types" ? "All Categories" : "All Types"}
                  </option>
                  <option value="construction">Construction</option>
                  <option value="business">Business</option>
                  <option value="event">Event</option>
                  <option value="renovation">Renovation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {viewMode === "types" && (
                <div className="pm-table-card">
                  <div className="pm-table-wrap">
                    <table className="pm-table">
                      <thead>
                        <tr>
                          <th>Permit Type</th>
                          <th>Category</th>
                          <th>Processing Time</th>
                          <th>Required Docs</th>
                          <th>Location</th>
                          <th className="pm-actions-head">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {loadingTypes ? (
                          <tr>
                            <td colSpan="6" className="pm-empty-cell">
                              Loading permit types...
                            </td>
                          </tr>
                        ) : filteredPermitTypes.length > 0 ? (
                          filteredPermitTypes.map((permit) => (
                            <tr key={permit._id}>
                              <td>
                                <div className="pm-title-cell">
                                  <div className="pm-title-main">
                                    {permit.title}
                                  </div>
                                  <div className="pm-title-sub">
                                    {permit.description}
                                  </div>
                                </div>
                              </td>

                              <td>
                                <span className={getCategoryClass(permit.category)}>
                                  {getCategoryLabel(permit.category)}
                                </span>
                              </td>

                              <td>{permit.processingTime}</td>

                              <td>
                                {(permit.requiredDocuments || []).length} document
                                {(permit.requiredDocuments || []).length !== 1
                                  ? "s"
                                  : ""}
                              </td>

                              <td>
                                {permit.requiresLocation ? (
                                  <MapPin size={15} className="pm-location-icon" />
                                ) : (
                                  <span className="pm-dash">—</span>
                                )}
                              </td>

                              <td className="pm-right">
                                <div className="pm-action-row">
                                  <button
                                    type="button"
                                    className="pm-action-btn"
                                    onClick={() => handleEditPermit(permit)}
                                    title="Edit"
                                  >
                                    <Pencil size={15} />
                                  </button>

                                  <button
                                    type="button"
                                    className="pm-action-btn delete"
                                    onClick={() => handleDeletePermit(permit)}
                                    title="Delete"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="pm-empty-cell">
                              No permit types found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="pm-bottom-actions">
                    <button
                      type="button"
                      className="pm-check-btn"
                      onClick={handleShowApplications}
                    >
                      Check the applications
                    </button>
                  </div>
                </div>
              )}

              {viewMode === "applications" && (
                <div className="pm-table-card">
                  <div className="pm-table-wrap">
                    <table className="pm-table">
                      <thead>
                        <tr>
                          <th>Applicant Name</th>
                          <th>Permit Type</th>
                          <th>Submission Date</th>
                          <th>Location</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {loadingApplications ? (
                          <tr>
                            <td colSpan="5" className="pm-empty-cell">
                              Loading permit applications...
                            </td>
                          </tr>
                        ) : filteredApplications.length > 0 ? (
                          filteredApplications.map((permit) => (
                            <tr
                              key={permit._id}
                              className="pm-click-row"
                              onClick={() => handleOpenApplication(permit)}
                            >
                              <td>
                                {permit.firstName} {permit.lastName}
                              </td>
                              <td>
                                {permit.permitTitle || permit.permitId?.title}
                              </td>
                              <td>
                                {permit.createdAt
                                  ? new Date(
                                      permit.createdAt
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </td>
                              <td>{permit.location?.address || "No location"}</td>
                              <td>
                                <span className={getStatusClass(permit.status)}>
                                  {getStatusLabel(permit.status)}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="pm-empty-cell">
                              No permit applications found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <PermitTypeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPermit(null);
        }}
        onSave={handleSavePermitType}
        editingPermit={editingPermit}
        saving={savingPermit}
      />

      <PermitApplicationDetailPanel
        permit={selectedApplication}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setTimeout(() => setSelectedApplication(null), 250);
        }}
        onApprove={handleApproveApplication}
        onReject={handleRejectApplication}
        onRequestInfo={handleRequestInfoApplication}
        updatingStatus={updatingStatus}
      />

      <ActionSuccessModal
        isOpen={successModal.isOpen}
        message={successModal.message}
        onClose={closeSuccess}
      />
    </div>
  );
}
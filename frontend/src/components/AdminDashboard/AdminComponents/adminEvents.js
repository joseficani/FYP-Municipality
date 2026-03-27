import React, { useMemo, useState, useEffect } from "react";
import "./adminEvents.css";
import Sidebar from "../SideBar";
import TopBar from "../TopBar";
import {
  Plus,
  Search,
  Filter,
  CalendarDays,
  Users,
  Calendar,
  Clock,
  MapPin,
  Edit2,
  User,
  X,
  Check,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

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

export default function EventsManagementModule() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [activeTab, setActiveTab] = useState("official");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [selectedCitizenEvent, setSelectedCitizenEvent] = useState(null);
  const [isCitizenPanelOpen, setIsCitizenPanelOpen] = useState(false);

  const [savingEvent, setSavingEvent] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    message: "",
  });

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

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);

      const response = await fetch(`${API_BASE_URL}/events`);
      const result = await getSafeJson(response);

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch events.");
      }

      setEvents(result.data || []);
    } catch (error) {
      console.error("Fetch events error:", error);
      setEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesTab = (event.type || "official") === activeTab;

      const matchesSearch =
        (event.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.location || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (event.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || event.status === statusFilter;

      return matchesTab && matchesSearch && matchesStatus;
    });
  }, [events, activeTab, searchQuery, statusFilter]);

  const handleCreateNew = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (event) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}/events/${event._id}`, {
        method: "DELETE",
      });

      const result = await getSafeJson(response);

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete event.");
      }

      await fetchEvents();
      showSuccess("Event deleted successfully.");
    } catch (error) {
      console.error("Delete event error:", error);
      alert(error.message || "Failed to delete event.");
    }
  };

  const handleOpenCitizenDetails = (event) => {
    setSelectedCitizenEvent(event);
    setIsCitizenPanelOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleCloseCitizenPanel = () => {
    setIsCitizenPanelOpen(false);
    setTimeout(() => setSelectedCitizenEvent(null), 250);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSavingEvent(true);

      const url = editingEvent
        ? `${API_BASE_URL}/events/${editingEvent._id}`
        : `${API_BASE_URL}/events`;

      const method = editingEvent ? "PUT" : "POST";

      const payload = {
        ...formData,
        // Always create official events from admin create form
        type: editingEvent ? editingEvent.type || "official" : "official",
        // Suggested by should be empty for official events
        suggestedBy: editingEvent && editingEvent.type === "citizen"
          ? formData.suggestedBy || ""
          : "",
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await getSafeJson(response);

      if (!response.ok) {
        throw new Error(result.message || "Failed to save event.");
      }

      await fetchEvents();
      handleCloseModal();

      showSuccess(
        editingEvent
          ? "Event updated successfully."
          : "Event created successfully."
      );
    } catch (error) {
      console.error("Save event error:", error);
      alert(error.message || "Failed to save event.");
    } finally {
      setSavingEvent(false);
    }
  };

  const handleUpdateCitizenEventStatus = async (
    eventId,
    newStatus,
    message
  ) => {
    try {
      setUpdatingStatus(true);

      const response = await fetch(`${API_BASE_URL}/events/${eventId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await getSafeJson(response);

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event status.");
      }

      await fetchEvents();
      setSelectedCitizenEvent(result.data);
      showSuccess(message);
    } catch (error) {
      console.error("Update citizen event status error:", error);
      alert(error.message || "Failed to update event status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const officialCount = events.filter(
    (e) => (e.type || "official") === "official"
  ).length;
  const citizenCount = events.filter((e) => e.type === "citizen").length;

  return (
    <div className="ad-page">
      <div className="ad-shell">
        <Sidebar activeItem="Events" />

        <div className="ad-main-area">
          <TopBar
            title="Dashboard"
            breadcrumb="Management / Events"
            userName="Jane Doe"
            userRole="City Administrator"
            userInitials="JD"
            searchPlaceholder="Search activity..."
          />

          <main className="ad-main-content">
            <div className="ad-dashboard-panel">
              <div className="em-page-wrap">
                <div className="em-header">
                  <div>
                    <h1 className="em-page-title">Events Management</h1>
                    <p className="em-page-subtitle">
                      Manage official events and review citizen suggestions.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="em-create-btn"
                    onClick={handleCreateNew}
                  >
                    <Plus size={18} />
                    Create Event
                  </button>
                </div>

                <div className="em-tabs-wrap">
                  <button
                    type="button"
                    className={`em-tab-btn ${
                      activeTab === "official" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("official")}
                  >
                    <CalendarDays size={18} />
                    <span>Upcoming Events</span>
                    <span className="em-tab-count">{officialCount}</span>
                  </button>

                  <button
                    type="button"
                    className={`em-tab-btn ${
                      activeTab === "citizen" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("citizen")}
                  >
                    <Users size={18} />
                    <span>Citizen Suggestions</span>
                    <span className="em-tab-count citizen">{citizenCount}</span>
                  </button>
                </div>

                <div className="em-filters-card">
                  <div className="em-search-wrap">
                    <Search className="em-search-icon" size={18} />
                    <input
                      type="text"
                      placeholder="Search events by title, description, or location..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="em-search-input"
                    />
                  </div>

                  <div className="em-filter-right">
                    <Filter size={18} className="em-filter-icon" />
                    <span className="em-filter-label">Filter by Status:</span>

                    <select
                      className="em-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {loadingEvents ? (
                  <div className="em-empty-box">
                    <div className="em-empty-icon">
                      <CalendarDays size={38} />
                    </div>
                    <h3>Loading events...</h3>
                  </div>
                ) : filteredEvents.length > 0 ? (
                  <div className="em-grid">
                    {filteredEvents.map((event) => (
                      <EventCard
                        key={event._id}
                        event={event}
                        activeTab={activeTab}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onCheckDetails={handleOpenCitizenDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="em-empty-box">
                    <div className="em-empty-icon">
                      <CalendarDays size={38} />
                    </div>
                    <h3>No events found</h3>
                    <p>No events match your current search or filter criteria.</p>
                    <button
                      type="button"
                      className="em-empty-btn"
                      onClick={handleCreateNew}
                    >
                      Create New Event
                    </button>
                  </div>
                )}

                {isModalOpen && (
                  <EventFormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleFormSubmit}
                    initialData={editingEvent}
                    saving={savingEvent}
                  />
                )}

                <CitizenEventDetailPanel
                  event={selectedCitizenEvent}
                  isOpen={isCitizenPanelOpen}
                  onClose={handleCloseCitizenPanel}
                  onApprove={() =>
                    handleUpdateCitizenEventStatus(
                      selectedCitizenEvent._id,
                      "Approved",
                      "Citizen event approved successfully."
                    )
                  }
                  onReject={() =>
                    handleUpdateCitizenEventStatus(
                      selectedCitizenEvent._id,
                      "Rejected",
                      "Citizen event rejected successfully."
                    )
                  }
                  onReview={() =>
                    handleUpdateCitizenEventStatus(
                      selectedCitizenEvent._id,
                      "Pending",
                      "Citizen event marked for review successfully."
                    )
                  }
                  updatingStatus={updatingStatus}
                />

                <SuccessModal
                  isOpen={successModal.isOpen}
                  message={successModal.message}
                  onClose={closeSuccess}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, activeTab, onEdit, onDelete, onCheckDetails }) {
  return (
    <div className="em-card">
      <div className="em-card-body">
        <div className="em-card-top">
          {activeTab === "citizen" ? (
            <>
              <StatusBadge status={event.status} />
              <span className="em-citizen-badge">
                <User size={12} />
                Citizen Suggestion
              </span>
            </>
          ) : (
            <span className="em-official-badge">
              <CalendarDays size={12} />
              Official Event
            </span>
          )}
        </div>

        <h3 className="em-card-title">{event.title}</h3>

        <div className="em-card-meta">
          <div className="em-meta-item">
            <Calendar size={15} />
            <span>{event.date}</span>
          </div>

          <div className="em-meta-item">
            <Clock size={15} />
            <span>{event.time}</span>
          </div>

          <div className="em-meta-item">
            <MapPin size={15} />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="em-card-description">{event.description}</p>

        {event.suggestedBy && (
          <div className="em-suggested-by">
            Suggested by: <strong>{event.suggestedBy}</strong>
          </div>
        )}
      </div>

      <div className="em-card-footer">
        {activeTab === "citizen" ? (
          <button
            type="button"
            className="em-edit-btn"
            onClick={() => onCheckDetails(event)}
          >
            <FileText size={14} />
            Check Details
          </button>
        ) : (
          <div className="em-card-actions">
            <button
              type="button"
              className="em-edit-btn"
              onClick={() => onEdit(event)}
            >
              <Edit2 size={14} />
              Edit Details
            </button>

            <button
              type="button"
              className="em-delete-btn"
              onClick={() => onDelete(event)}
            >
              <XCircle size={14} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status, className = "" }) {
  const styles = {
    Pending: "em-badge pending",
    Approved: "em-badge approved",
    Rejected: "em-badge rejected",
  };

  return <span className={`${styles[status]} ${className}`}>{status}</span>;
}

function EventFormModal({ isOpen, onClose, onSubmit, initialData, saving }) {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    address: "",
    category: "Community",
    organizer: "Municipality",
    cost: "Free",
    image: "",
    gallery: [],
    featured: false,
    isActive: true,
    status: "Approved",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        shortDescription: initialData.shortDescription || "",
        description: initialData.description || "",
        date: initialData.date || "",
        time: initialData.time || "",
        duration: initialData.duration || "",
        location: initialData.location || "",
        address: initialData.address || "",
        category: initialData.category || "Community",
        organizer: initialData.organizer || "Municipality",
        cost: initialData.cost || "Free",
        image: initialData.image || "",
        gallery: Array.isArray(initialData.gallery) ? initialData.gallery : [],
        featured: !!initialData.featured,
        isActive:
          typeof initialData.isActive === "boolean"
            ? initialData.isActive
            : true,
        status: initialData.status || "Approved",
      });
    } else {
      setFormData({
        title: "",
        shortDescription: "",
        description: "",
        date: "",
        time: "",
        duration: "",
        location: "",
        address: "",
        category: "Community",
        organizer: "Municipality",
        cost: "Free",
        image: "",
        gallery: [],
        featured: false,
        isActive: true,
        status: "Approved",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      shortDescription:
        formData.shortDescription.trim() || formData.description.trim(),
      address: formData.address.trim() || formData.location.trim(),
      duration: formData.duration.trim() || "2 hours",
      organizer: formData.organizer.trim() || "Municipality",
      cost: formData.cost.trim() || "Free",
      image:
        formData.image.trim() ||
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      type: "official",
      suggestedBy: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="em-modal-overlay">
      <div className="em-modal-backdrop" onClick={onClose}></div>

      <div className="em-modal-box">
        <div className="em-modal-header">
          <div>
            <h2>{initialData ? "Edit Event" : "Create New Event"}</h2>
            <p>
              {initialData
                ? "Update event details below."
                : "Fill in the details for the new event."}
            </p>
          </div>

          <button
            type="button"
            className="em-modal-close"
            onClick={onClose}
            disabled={saving}
          >
            <X size={20} />
          </button>
        </div>

        <form className="em-modal-form" onSubmit={handleSubmit}>
          <div className="em-modal-body">
            <div className="em-form-group">
              <label>Event Title</label>
              <input
                type="text"
                placeholder="e.g. Annual Town Hall Meeting"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="em-form-group">
              <label>Short Description</label>
              <input
                type="text"
                placeholder="Short summary for cards and banner"
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
                required
              />
            </div>

            <div className="em-form-row">
              <div className="em-form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="em-form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="em-form-row">
              <div className="em-form-group">
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 2 hours"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  required
                />
              </div>

              <div className="em-form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Community">Community</option>
                  <option value="Arts & Culture">Arts & Culture</option>
                  <option value="Sports & Recreation">Sports & Recreation</option>
                  <option value="Government">Government</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>

            <div className="em-form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="e.g. City Center Plaza"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>

            <div className="em-form-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="Full address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>

            <div className="em-form-group">
              <label>Description</label>
              <textarea
                rows="5"
                placeholder="Provide details about the event..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="em-form-row">
              <div className="em-form-group">
                <label>Organizer</label>
                <input
                  type="text"
                  value={formData.organizer}
                  onChange={(e) =>
                    setFormData({ ...formData, organizer: e.target.value })
                  }
                  required
                />
              </div>

              <div className="em-form-group">
                <label>Cost</label>
                <input
                  type="text"
                  value={formData.cost}
                  onChange={(e) =>
                    setFormData({ ...formData, cost: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="em-form-group">
              <label>Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                required
              />
            </div>

            <div className="em-status-box">
              <label>Event Status</label>
              <div className="em-status-buttons">
                {["Pending", "Approved", "Rejected"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`em-status-btn ${
                      formData.status === status ? "active" : ""
                    } ${status.toLowerCase()}`}
                    onClick={() => setFormData({ ...formData, status })}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="em-modal-footer">
            <button
              type="button"
              className="em-cancel-btn"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button type="submit" className="em-save-btn" disabled={saving}>
              {saving
                ? initialData
                  ? "Saving..."
                  : "Creating..."
                : initialData
                ? "Save Changes"
                : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CitizenEventDetailPanel({
  event,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onReview,
  updatingStatus,
}) {
  if (!event) return null;

  return (
    <>
      <div
        className={`em-side-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`em-side-panel ${isOpen ? "show" : ""}`}>
        <div className="em-side-header">
          <h3>Event Suggestion Details</h3>
          <button type="button" className="em-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="em-side-body">
          <div className="em-detail-top">
            <StatusBadge status={event.status} />
            <span className="em-detail-id">ID: {event._id}</span>
          </div>

          <div className="em-detail-card">
            <h4>
              <User size={18} />
              Citizen Information
            </h4>
            <p className="em-detail-label">Suggested By</p>
            <p className="em-detail-value">{event.suggestedBy || "Unknown"}</p>
          </div>

          <div className="em-detail-card">
            <h4>
              <FileText size={18} />
              Event Information
            </h4>

            <p className="em-detail-label">Title</p>
            <p className="em-detail-value">{event.title}</p>

            <p className="em-detail-label">Date</p>
            <p className="em-detail-value em-inline">
              <Calendar size={15} />
              {event.date}
            </p>

            <p className="em-detail-label">Time</p>
            <p className="em-detail-value em-inline">
              <Clock size={15} />
              {event.time}
            </p>

            <p className="em-detail-label">Location</p>
            <p className="em-detail-value em-inline">
              <MapPin size={15} />
              {event.location}
            </p>

            <p className="em-detail-label">Description</p>
            <p className="em-detail-value">{event.description}</p>
          </div>
        </div>

        <div className="em-side-footer">
          <button
            type="button"
            className="em-success-btn"
            onClick={onApprove}
            disabled={updatingStatus}
          >
            <Check size={16} />
            {updatingStatus ? "Updating..." : "Approve"}
          </button>

          <button
            type="button"
            className="em-danger-btn"
            onClick={onReject}
            disabled={updatingStatus}
          >
            <XCircle size={16} />
            {updatingStatus ? "Updating..." : "Reject"}
          </button>

          <button
            type="button"
            className="em-secondary-btn"
            onClick={onReview}
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

function SuccessModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="em-modal-overlay">
      <div className="em-modal-backdrop" onClick={onClose}></div>

      <div className="em-success-box">
        <div className="em-success-icon-wrap">
          <Check size={26} />
        </div>

        <h3 className="em-success-title">Success</h3>
        <p className="em-success-text">{message}</p>

        <button type="button" className="em-save-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
import React, { useMemo, useState } from "react";
import "./adminComplaints.css";
import Sidebar from "../SideBar";
import TopBar from "../TopBar";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  User,
  Search,
  Filter,
  ChevronRight,
  Calendar,
} from "lucide-react";

const MOCK_COMPLAINTS = [
  {
    id: "C-2024-001",
    citizenName: "Martha Jenkins",
    citizenEmail: "martha.j@example.com",
    citizenPhone: "(555) 123-4567",
    citizenAddress: "124 Maple Avenue",
    subject: "Large pothole on Maple Ave",
    message:
      "There is a very large pothole in front of my driveway. It has been there for weeks and is damaging cars. Please fix it immediately.",
    dateSubmitted: "2024-02-10",
    status: "New",
    category: "Infrastructure",
  },
  {
    id: "C-2024-002",
    citizenName: "Robert Smith",
    citizenEmail: "rsmith88@example.com",
    citizenPhone: "(555) 987-6543",
    citizenAddress: "45 Oak Street, Apt 2B",
    subject: "Missed trash collection",
    message:
      "My trash was not collected this Tuesday. This is the second time this month.",
    dateSubmitted: "2024-02-09",
    status: "In Progress",
    category: "Sanitation",
  },
  {
    id: "C-2024-003",
    citizenName: "Elena Rodriguez",
    citizenEmail: "elena.rod@example.com",
    citizenPhone: "(555) 456-7890",
    citizenAddress: "789 Pine Lane",
    subject: "Loud construction noise early morning",
    message:
      "Construction crew at 791 Pine Lane starts jackhammering at 5:30 AM. City ordinance says 7 AM.",
    dateSubmitted: "2024-02-08",
    status: "New",
    category: "Noise",
  },
  {
    id: "C-2024-004",
    citizenName: "David Chen",
    citizenEmail: "dchen@example.com",
    citizenPhone: "(555) 222-3333",
    citizenAddress: "321 Elm Street",
    subject: "Fence permit inquiry",
    message:
      "I applied for a fence permit 3 weeks ago and have not heard back. Application #FP-992.",
    dateSubmitted: "2024-02-05",
    status: "Resolved",
    category: "Permits",
  },
  {
    id: "C-2024-005",
    citizenName: "Sarah Johnson",
    citizenEmail: "sjohnson@example.com",
    citizenPhone: "(555) 444-5555",
    citizenAddress: "55 Birch Blvd",
    subject: "Street light out",
    message:
      "The street light at the corner of Birch and Cedar is flickering constantly.",
    dateSubmitted: "2024-02-01",
    status: "Closed",
    category: "Infrastructure",
  },
  {
    id: "C-2024-006",
    citizenName: "Michael Brown",
    citizenEmail: "mbrown@example.com",
    citizenPhone: "(555) 666-7777",
    citizenAddress: "88 Willow Way",
    subject: "Overgrown bushes blocking sidewalk",
    message:
      "The bushes at the park entrance are completely blocking the sidewalk, forcing pedestrians into the street.",
    dateSubmitted: "2024-02-11",
    status: "New",
    category: "Infrastructure",
  },
  {
    id: "C-2024-007",
    citizenName: "Jennifer Wu",
    citizenEmail: "jwu@example.com",
    citizenPhone: "(555) 888-9999",
    citizenAddress: "12 Cherry Court",
    subject: "Water pressure issues",
    message: "We have had extremely low water pressure for the last 2 days.",
    dateSubmitted: "2024-02-12",
    status: "New",
    category: "Infrastructure",
  },
  {
    id: "C-2024-008",
    citizenName: "James Wilson",
    citizenEmail: "jwilson@example.com",
    citizenPhone: "(555) 111-2222",
    citizenAddress: "99 Spruce Street",
    subject: "Illegal dumping in alley",
    message:
      "Someone dumped a mattress and old furniture in the alley behind Spruce Street.",
    dateSubmitted: "2024-02-07",
    status: "In Progress",
    category: "Sanitation",
  },
];

function StatusBadge({ status, className = "" }) {
  const getClass = () => {
    switch (status) {
      case "New":
        return "co-status-new";
      case "In Progress":
        return "co-status-progress";
      case "Resolved":
        return "co-status-resolved";
      case "Closed":
        return "co-status-closed";
      default:
        return "co-status-closed";
    }
  };

  return (
    <span className={`co-status-badge ${getClass()} ${className}`}>
      {status}
    </span>
  );
}

function ComplaintList({ complaints, onSelectComplaint }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const matchesSearch =
        complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || complaint.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [complaints, searchTerm, statusFilter]);

  return (
    <div className="co-space-y">
      <div className="co-top-card">
        <div>
          <h2 className="co-page-title">Complaints Overview</h2>
          <p className="co-page-subtitle">Manage and track citizen reports</p>
        </div>

        <div className="co-filter-row">
          <div className="co-search-wrap">
            <Search className="co-search-icon" size={16} />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="co-select-wrap">
            <Filter className="co-search-icon" size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="co-table-card">
        <div className="co-table-wrap">
          <table className="co-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Citizen</th>
                <th>Date</th>
                <th>Status</th>
                <th className="co-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    onClick={() => onSelectComplaint(complaint)}
                    className="co-clickable-row"
                  >
                    <td className="co-id-cell">{complaint.id}</td>

                    <td>
                      <div className="co-subject">{complaint.subject}</div>
                      <div className="co-category">{complaint.category}</div>
                    </td>

                    <td>
                      <div className="co-inline">
                        <User size={14} />
                        <span>{complaint.citizenName}</span>
                      </div>
                    </td>

                    <td>
                      <div className="co-inline co-muted">
                        <Calendar size={14} />
                        <span>{complaint.dateSubmitted}</span>
                      </div>
                    </td>

                    <td>
                      <StatusBadge status={complaint.status} />
                    </td>

                    <td className="co-right">
                      <ChevronRight size={18} className="co-arrow" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="co-empty-row">
                    No complaints found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="co-table-footer">
          <span>
            Showing {filteredComplaints.length} of {complaints.length} complaints
          </span>

          <div className="co-footer-buttons">
            <button type="button" disabled>
              Previous
            </button>
            <button type="button" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComplaintDetail({ complaint, onBack, onUpdateStatus }) {
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setReplyText("");
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  };

  return (
    <div className="co-detail-page">
      {showToast && (
        <div className="co-toast">
          <CheckCircle2 size={18} />
          <span>Reply sent successfully</span>
        </div>
      )}

      <button type="button" onClick={onBack} className="co-back-btn">
        <ArrowLeft size={16} />
        Back to Complaints List
      </button>

      <div className="co-detail-grid">
        <div className="co-detail-main">
          <div className="co-box">
            <div className="co-detail-top">
              <div>
                <div className="co-detail-meta-top">
                  <span className="co-detail-id">{complaint.id}</span>
                  <span className="co-detail-category-badge">
                    {complaint.category}
                  </span>
                </div>

                <h1 className="co-detail-title">{complaint.subject}</h1>

                <div className="co-inline co-muted">
                  <Clock size={14} />
                  <span>Submitted on {complaint.dateSubmitted}</span>
                </div>
              </div>

              <div className="co-desktop-status">
                <StatusBadge status={complaint.status} className="co-big-status" />
              </div>
            </div>

            <div className="co-message-block">
              <h3>Message</h3>
              <div className="co-message-box">{complaint.message}</div>
            </div>
          </div>

          <div className="co-box">
            <h3 className="co-reply-title">
              <Mail size={18} />
              Reply to Citizen
            </h3>

            <div className="co-reply-area">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response here..."
              />

              <div className="co-reply-footer">
                <p>Response will be emailed to {complaint.citizenEmail}</p>

                <button
                  type="button"
                  onClick={handleSendReply}
                  disabled={!replyText.trim() || isSending}
                  className="co-send-btn"
                >
                  {isSending ? (
                    <>
                      <span className="co-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="co-detail-sidebar">
          <div className="co-box">
            <h3 className="co-small-title">Current Status</h3>

            <div className="co-status-panel">
              <div className="co-mobile-status">
                <span>Current:</span>
                <StatusBadge status={complaint.status} />
              </div>

              <label>Update Status</label>

              <div className="co-select-full">
                <select
                  value={complaint.status}
                  onChange={(e) => onUpdateStatus(complaint.id, e.target.value)}
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <p className="co-note-text">
                Changing status will trigger an automatic notification to the
                citizen.
              </p>
            </div>
          </div>

          <div className="co-box">
            <h3 className="co-small-title">Citizen Details</h3>

            <div className="co-citizen-list">
              <div className="co-citizen-item">
                <div className="co-citizen-icon">
                  <User size={16} />
                </div>
                <div>
                  <p className="co-label">Name</p>
                  <p className="co-value">{complaint.citizenName}</p>
                </div>
              </div>

              <div className="co-citizen-item">
                <div className="co-citizen-icon">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="co-label">Email</p>
                  <a href={`mailto:${complaint.citizenEmail}`} className="co-link">
                    {complaint.citizenEmail}
                  </a>
                </div>
              </div>

              <div className="co-citizen-item">
                <div className="co-citizen-icon">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="co-label">Phone</p>
                  <p className="co-value">{complaint.citizenPhone}</p>
                </div>
              </div>

              <div className="co-citizen-item">
                <div className="co-citizen-icon">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="co-label">Address</p>
                  <p className="co-value">{complaint.citizenAddress}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="co-box">
            <div className="co-notes-head">
              <h3 className="co-small-title">Internal Notes</h3>
              <button type="button" className="co-add-note-btn">
                + Add Note
              </button>
            </div>

            <div className="co-note-box">
              <div className="co-inline-start">
                <AlertCircle size={16} />
                <p>
                  Priority escalated due to safety concern. Assigned to field team A.
                </p>
              </div>
              <span className="co-note-time">Added by Admin • 2h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComplaintsOverview() {
  const [complaints, setComplaints] = useState(MOCK_COMPLAINTS);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);

  const selectedComplaint = complaints.find(
    (item) => item.id === selectedComplaintId
  );

  const handleSelectComplaint = (complaint) => {
    setSelectedComplaintId(complaint.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedComplaintId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateStatus = (id, newStatus) => {
    setComplaints((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div className="ad-page">
      <div className="ad-shell">
        <Sidebar activeItem="Complaints" />

        <div className="ad-main-area">
          <TopBar
            title="Dashboard"
            breadcrumb="Management / Complaints"
            userName="Jane Doe"
            userRole="City Administrator"
            userInitials="JD"
            searchPlaceholder="Search activity..."
          />

          <main className="ad-main-content">
            <div className="ad-dashboard-panel">
              <div className="co-wrapper">
                {selectedComplaint ? (
                  <ComplaintDetail
                    complaint={selectedComplaint}
                    onBack={handleBack}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ) : (
                  <ComplaintList
                    complaints={complaints}
                    onSelectComplaint={handleSelectComplaint}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
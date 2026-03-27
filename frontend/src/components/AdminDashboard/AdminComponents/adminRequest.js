import React, { useEffect, useMemo, useState } from "react";
import "./adminRequest.css";
import {
  FileText,
  Download,
  Eye,
  Upload,
  X,
  ChevronLeft,
  Check,
  Clock,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import Sidebar from "../SideBar";
import TopBar from "../TopBar";
 
function normalizeRequestStatus(status) {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "Pending";
    case "in review":
    case "in_review":
      return "In Review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return "Pending";
  }
}
 
function StatusBadge({ status }) {
  const normalizedStatus = normalizeRequestStatus(status);
 
  const getClass = () => {
    switch (normalizedStatus) {
      case "Pending":
        return "cr-status pending";
      case "In Review":
        return "cr-status review";
      case "Approved":
        return "cr-status approved";
      case "Rejected":
        return "cr-status rejected";
      default:
        return "cr-status neutral";
    }
  };
 
  return <span className={getClass()}>{normalizedStatus}</span>;
}
 
function DocumentList({
  documents,
  title = "Attached Documents",
  emptyMessage = "No documents attached.",
}) {
  return (
    <div className="cr-doc-list">
      <h3 className="cr-section-mini-title">{title}</h3>
 
      {documents.length === 0 ? (
        <p className="cr-empty-text">{emptyMessage}</p>
      ) : (
        <ul className="cr-doc-items">
          {documents.map((doc) => (
            <li key={doc.id} className="cr-doc-item">
              <div className="cr-doc-left">
                <div className="cr-doc-icon-box">
                  <FileText size={18} />
                </div>
                <div className="cr-doc-meta">
                  <p className="cr-doc-name">{doc.name}</p>
                  <p className="cr-doc-info">
                    {doc.size || "Attached file"} • {doc.type || "document"}
                  </p>
                </div>
              </div>
 
              <div className="cr-doc-actions">
                {doc.url ? (
                  <>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="cr-icon-btn"
                      title="View"
                    >
                      <Eye size={16} />
                    </a>
 
                    <a
                      href={doc.url}
                      download
                      className="cr-icon-btn"
                      title="Download"
                    >
                      <Download size={16} />
                    </a>
                  </>
                ) : (
                  <>
                    <button type="button" className="cr-icon-btn" title="View">
                      <Eye size={16} />
                    </button>
                    <button type="button" className="cr-icon-btn" title="Download">
                      <Download size={16} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
 
function FileUpload({
  onUpload,
  label = "Upload Signed Certificate",
  helperText = "PDF, JPG or PNG up to 10MB",
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
 
  const handleFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
    onUpload(file);
  };
 
  return (
    <div className="cr-upload-wrap">
      <label className="cr-upload-label">{label}</label>
 
      {selectedFile ? (
        <div className="cr-uploaded-box">
          <div className="cr-uploaded-left">
            <div className="cr-uploaded-icon">
              <FileText size={20} />
            </div>
            <div>
              <p className="cr-uploaded-name">{selectedFile.name}</p>
              <p className="cr-uploaded-size">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
 
          <button
            type="button"
            className="cr-icon-btn"
            onClick={() => setSelectedFile(null)}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          className={`cr-upload-drop ${isDragging ? "dragging" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
        >
          <div className="cr-upload-center">
            <div className="cr-upload-circle">
              <Upload size={20} />
            </div>
            <p className="cr-upload-main">
              <span>Click to upload</span> or drag and drop
            </p>
            <p className="cr-upload-help">{helperText}</p>
 
            <input
              type="file"
              className="cr-hidden-file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
 
function SubmissionsList({ submissions, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
 
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      const q = searchTerm.toLowerCase();
 
      return (
        submission.ticketNumber.toLowerCase().includes(q) ||
        submission.type.toLowerCase().includes(q) ||
        submission.citizenName.toLowerCase().includes(q)
      );
    });
  }, [submissions, searchTerm]);
 
  return (
    <div className="cr-card">
      <div className="cr-toolbar">
        <h2 className="cr-card-title">Recent Submissions</h2>
 
        <div className="cr-toolbar-right">
          <div className="cr-search-box">
            <Search size={16} className="cr-search-icon" />
            <input
              type="text"
              placeholder="Search reference no..."
              className="cr-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
 
          <button type="button" className="cr-filter-btn">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>
 
      <div className="cr-table-wrap">
        <table className="cr-table">
          <thead>
            <tr>
              <th>Reference No.</th>
              <th>Type</th>
              <th>Citizen Name</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
 
          <tbody>
            {filteredSubmissions.map((submission) => (
              <tr
                key={submission.id}
                onClick={() => onSelect(submission)}
                className="cr-table-row"
              >
                <td className="cr-ticket">{submission.ticketNumber}</td>
                <td>{submission.type}</td>
                <td>{submission.citizenName}</td>
                <td>
                  {new Date(submission.dateSubmitted).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td>
                  <StatusBadge status={submission.status} />
                </td>
                <td className="cr-row-arrow">
                  <ChevronRight size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      <div className="cr-pagination">
        <p>
          Showing <strong>1</strong> to <strong>{filteredSubmissions.length}</strong> of{" "}
          <strong>{filteredSubmissions.length}</strong> results
        </p>
 
        <div className="cr-pagination-actions">
          <button type="button">Previous</button>
          <button type="button">Next</button>
        </div>
      </div>
    </div>
  );
}
 
function SubmissionDetail({ submission, onBack, onUpdateStatus }) {
  const [notes, setNotes] = useState(submission.adminNotes || "");
  const [isRejecting, setIsRejecting] = useState(false);
 
  const normalizedStatus = normalizeRequestStatus(submission.status);
 
  const handleApprove = () => {
    onUpdateStatus(submission.id, "Approved", notes);
  };
 
  const handleReject = () => {
    if (!isRejecting) {
      setIsRejecting(true);
      return;
    }
 
    onUpdateStatus(submission.id, "Rejected", notes);
  };
 
  const handleUpload = (file) => {
    console.log("Uploaded:", file.name);
  };
 
  return (
    <div className="cr-detail-page">
      <div className="cr-back-row">
        <button type="button" className="cr-back-btn" onClick={onBack}>
          <ChevronLeft size={16} />
          Back to List
        </button>
 
        <div className="cr-back-status">
          <span>Status:</span>
          <StatusBadge status={normalizedStatus} />
        </div>
      </div>
 
      <div className="cr-detail-grid">
        <div className="cr-detail-left">
          <div className="cr-card">
            <div className="cr-detail-header">
              <div>
                <h2 className="cr-detail-title">{submission.type}</h2>
                <p className="cr-detail-ref">
                  Reference No: <span>{submission.ticketNumber}</span>
                </p>
              </div>
 
              <div className="cr-detail-date">
                <div>
                  <Calendar size={14} />
                  {new Date(submission.dateSubmitted).toLocaleDateString()}
                </div>
                <div>
                  <Clock size={14} />
                  {new Date(submission.dateSubmitted).toLocaleTimeString()}
                </div>
              </div>
            </div>
 
            <div className="cr-description-box">
              <h4>Request Description</h4>
              <p>{submission.description || "No description provided."}</p>
            </div>
 
            <div className="cr-citizen-block">
              <h3 className="cr-card-title">Citizen Information</h3>
 
              <div className="cr-citizen-grid">
                <div>
                  <label>Full Name</label>
                  <p>{submission.citizenName}</p>
                </div>
 
                <div>
                  <label>Contact Details</label>
                  <div className="cr-contact-lines">
                    <div>
                      <Mail size={14} />
                      <span>{submission.email}</span>
                    </div>
                    <div>
                      <Phone size={14} />
                      <span>{submission.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
          <div className="cr-card">
            <DocumentList documents={submission.documents} />
          </div>
        </div>
 
        <div className="cr-detail-right">
          <div className="cr-card cr-sticky-card">
            <h3 className="cr-card-title">Review Actions</h3>
 
            <div className="cr-notes-block">
              <label htmlFor="admin-notes">Admin Notes</label>
              <textarea
                id="admin-notes"
                rows={4}
                placeholder="Add internal notes or rejection reason..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
 
            {(normalizedStatus === "Pending" || normalizedStatus === "In Review") && (
              <div className="cr-actions-wrap">
                {!isRejecting ? (
                  <div className="cr-approve-reject">
                    <button
                      type="button"
                      className="cr-danger-btn"
                      onClick={handleReject}
                    >
                      <X size={16} />
                      Reject
                    </button>
 
                    <button
                      type="button"
                      className="cr-success-btn"
                      onClick={handleApprove}
                    >
                      <Check size={16} />
                      Approve
                    </button>
                  </div>
                ) : (
                  <div className="cr-reject-confirm">
                    <div className="cr-warning-box">
                      Are you sure you want to reject this request? Please add a
                      reason in the notes.
                    </div>
 
                    <div className="cr-confirm-actions">
                      <button
                        type="button"
                        className="cr-outline-btn"
                        onClick={() => setIsRejecting(false)}
                      >
                        Cancel
                      </button>
 
                      <button
                        type="button"
                        className="cr-danger-btn"
                        onClick={handleReject}
                      >
                        Confirm Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
 
            {(normalizedStatus === "Approved" || normalizedStatus === "In Review") && (
              <div className="cr-certificate-area">
                <h4 className="cr-section-mini-title">Certificate Issuance</h4>
 
                {submission.signedCertificate ? (
                  <DocumentList
                    documents={[submission.signedCertificate]}
                    title="Issued Certificate"
                  />
                ) : (
                  <FileUpload onUpload={handleUpload} />
                )}
              </div>
            )}
 
            {normalizedStatus === "Rejected" && (
              <div className="cr-final-box">
                This request has been <strong>rejected</strong>.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default function CertificatesRequestsAdmin() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
 
        const response = await fetch("http://localhost:5000/api/certificates");
        const result = await response.json();
 
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch requests.");
        }
 
        const mapped = (result.data || []).map((item, index) => ({
          id: item._id,
          ticketNumber: `REQ-${String(index + 1).padStart(4, "0")}`,
          type: item.serviceTitle || "Request",
          citizenName: item.fullName || "",
          email: item.email || "N/A",
          phone: item.phone || "",
          dateSubmitted: item.createdAt || new Date().toISOString(),
          status: normalizeRequestStatus(item.status),
          description: item.description || "",
          documents: (item.documents || []).map((doc, docIndex) => ({
            id: `${item._id}-${docIndex}`,
            name: doc.split("/").pop(),
            type: "document",
            size: "Attached file",
            url: `http://localhost:5000${doc}`,
          })),
          adminNotes: item.adminNotes || "",
          signedCertificate: item.signedCertificate
            ? {
                id: `${item._id}-signed`,
                name: item.signedCertificate.split("/").pop(),
                type: "application/pdf",
                size: "Signed document",
                url: `http://localhost:5000${item.signedCertificate}`,
              }
            : null,
        }));
 
        setSubmissions(mapped);
      } catch (error) {
        console.error("Fetch requests error:", error);
        alert(error.message || "Something went wrong while fetching requests.");
      } finally {
        setIsLoading(false);
      }
    };
 
    fetchRequests();
  }, []);
 
  const stats = useMemo(() => {
    return {
      total: submissions.length,
      pending: submissions.filter((s) => normalizeRequestStatus(s.status) === "Pending").length,
      review: submissions.filter((s) => normalizeRequestStatus(s.status) === "In Review").length,
      approved: submissions.filter((s) => normalizeRequestStatus(s.status) === "Approved").length,
    };
  }, [submissions]);
 
  const handleUpdateStatus = async (id, status, notes = "") => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/certificates/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            adminNotes: notes,
          }),
        }
      );
 
      const result = await response.json();
 
      if (!response.ok) {
        throw new Error(result.message || "Failed to update request status.");
      }
 
      setSubmissions((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: normalizeRequestStatus(status),
                adminNotes: notes,
              }
            : item
        )
      );
 
      setSelectedSubmission((prev) =>
        prev && prev.id === id
          ? {
              ...prev,
              status: normalizeRequestStatus(status),
              adminNotes: notes,
            }
          : prev
      );
    } catch (error) {
      console.error("Update request status error:", error);
      alert(error.message || "Something went wrong while updating request.");
    }
  };
 
  return (
    <div className="ad-page">
      <div className="ad-shell">
        <Sidebar />
        <div className="ad-main-area">
          <TopBar />
          <main className="ad-main-content">
            <div className="ad-dashboard-panel">
              <div className="cr-page-head">
                <div>
                  <h1 className="cr-page-title">Certificates & Requests</h1>
                  <p className="cr-page-subtitle">
                    Review submissions, inspect documents, and approve or reject
                    citizen requests.
                  </p>
                </div>
 
                <div className="cr-mini-stats">
                  <div className="cr-mini-stat">
                    <span>Total</span>
                    <strong>{stats.total}</strong>
                  </div>
                  <div className="cr-mini-stat">
                    <span>Pending</span>
                    <strong>{stats.pending}</strong>
                  </div>
                  <div className="cr-mini-stat">
                    <span>In Review</span>
                    <strong>{stats.review}</strong>
                  </div>
                  <div className="cr-mini-stat">
                    <span>Approved</span>
                    <strong>{stats.approved}</strong>
                  </div>
                </div>
              </div>
 
              {isLoading ? (
                <div className="cr-card" style={{ padding: "20px" }}>
                  <p>Loading requests...</p>
                </div>
              ) : !selectedSubmission ? (
                <SubmissionsList
                  submissions={submissions}
                  onSelect={setSelectedSubmission}
                />
              ) : (
                <SubmissionDetail
                  submission={selectedSubmission}
                  onBack={() => setSelectedSubmission(null)}
                  onUpdateStatus={handleUpdateStatus}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
 
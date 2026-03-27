import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LicensesPermits.css";
import {
  MapPin,
  Navigation,
  ArrowRight,
  Clock,
  FileText,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  FileUp,
  UploadCloud,
  X,
  Briefcase,
  Calendar,
  Hammer,
  Home,
  Search,
  SlidersHorizontal,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

const iconMap = {
  Hammer: <Hammer className="lp-card-icon-svg" />,
  Briefcase: <Briefcase className="lp-card-icon-svg" />,
  Home: <Home className="lp-card-icon-svg" />,
  Calendar: <Calendar className="lp-card-icon-svg" />,
  FileText: <FileText className="lp-card-icon-svg" />,
};

function MapPicker({ onLocationSelect }) {
  const [isPinned, setIsPinned] = useState(false);
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 50 });

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPinPosition({ x, y });
    setIsPinned(true);

    onLocationSelect({
      lat: 40.7128 + (y - 50) * 0.01,
      lng: -74.006 + (x - 50) * 0.01,
      address: "123 Selected Location St, Metropolis",
    });
  };

  return (
    <div className="lp-map-picker" onClick={handleMapClick}>
      <div className="lp-map-dots"></div>
      <div className="lp-map-road lp-road-one"></div>
      <div className="lp-map-road lp-road-two"></div>
      <div className="lp-map-road lp-road-three"></div>
      <div className="lp-map-road lp-road-four"></div>

      {!isPinned && (
        <div className="lp-map-instructions">
          <div className="lp-map-instructions-pill">
            <Navigation className="lp-map-nav-icon" />
            Click anywhere to pin location
          </div>
        </div>
      )}

      {isPinned && (
        <div
          className="lp-map-pin-wrap"
          style={{
            left: `${pinPosition.x}%`,
            top: `${pinPosition.y}%`,
          }}
        >
          <MapPin className="lp-map-pin" />
          <div className="lp-map-pin-shadow"></div>
        </div>
      )}
    </div>
  );
}

function PermitCard({ permit, onRequest }) {
  return (
    <div className="lp-permit-card">
      <div className="lp-permit-card-inner">
        <div className="lp-permit-card-top">
          <div className="lp-permit-card-icon">
            {iconMap[permit.iconName] || iconMap.FileText}
          </div>
        </div>

        <h3 className="lp-permit-card-title">{permit.title}</h3>
        <p className="lp-permit-card-desc">{permit.description}</p>

        <div className="lp-permit-card-meta">
          <div className="lp-permit-time">
            <Clock className="lp-meta-icon" />
            <span>
              Est. Time:{" "}
              <strong className="lp-strong">
                {permit.processingTime || "Not specified"}
              </strong>
            </span>
          </div>

          <div className="lp-required-docs">
            <p className="lp-required-label">Required Documents</p>
            <ul className="lp-required-list">
              {(permit.requiredDocs || []).slice(0, 2).map((doc, idx) => (
                <li key={idx} className="lp-required-item">
                  <FileText className="lp-required-icon" />
                  <span>{doc}</span>
                </li>
              ))}

              {(permit.requiredDocs || []).length > 2 && (
                <li className="lp-required-more">
                  +{permit.requiredDocs.length - 2} more...
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="lp-permit-card-footer">
        <button
          onClick={() => onRequest(permit)}
          className="lp-request-btn"
          type="button"
        >
          <span>Request Permit</span>
          <ArrowRight className="lp-btn-arrow" />
        </button>
      </div>
    </div>
  );
}

function PermitRequestForm({ permit, onCancel, onSubmit, isSubmitting }) {
  const [currentStep, setCurrentStep] = useState("info");
  const [isCertified, setIsCertified] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    files: [],
    location: null,
  });

  const steps = [
    { id: "info", label: "Personal Info" },
    { id: "docs", label: "Documents" },
    { id: "location", label: "Location" },
    { id: "review", label: "Review" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const validateCurrentStep = () => {
    if (currentStep === "info") {
      if (
        !formData.firstName.trim() ||
        !formData.lastName.trim() ||
        !formData.email.trim() ||
        !formData.phone.trim()
      ) {
        alert("Please fill all required applicant information.");
        return false;
      }
    }

    if (currentStep === "location") {
      if (!formData.location) {
        alert("Please select the project location.");
        return false;
      }
    }

    if (currentStep === "review") {
      if (!isCertified) {
        alert("Please confirm the certification checkbox before submitting.");
        return false;
      }
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    } else {
      await onSubmit({
        permitId: permit._id,
        permitTitle: permit.title,
        ...formData,
      });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    } else {
      onCancel();
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  return (
    <div className="lp-form-modal">
      <div className="lp-form-header">
        <div>
          <h2 className="lp-form-title">New Application</h2>
          <p className="lp-form-subtitle">Applying for: {permit.title}</p>
        </div>

        <button
          onClick={onCancel}
          className="lp-form-close"
          type="button"
          disabled={isSubmitting}
        >
          <X className="lp-form-close-icon" />
        </button>
      </div>

      <div className="lp-progress-wrap">
        <div className="lp-progress-line"></div>
        <div
          className="lp-progress-line-active"
          style={{
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        <div className="lp-progress-steps">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={step.id} className="lp-progress-step">
                <div
                  className={`lp-progress-circle ${
                    isCompleted ? "completed" : isCurrent ? "current" : "pending"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="lp-progress-check" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className={`lp-progress-label ${isCurrent ? "current" : ""}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="lp-form-content">
        {currentStep === "info" && (
          <div className="lp-step-panel">
            <h3 className="lp-step-title">Applicant Information</h3>

            <div className="lp-form-grid">
              <div className="lp-field">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Jane"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="lp-field">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="lp-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="lp-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="lp-field lp-field-full">
                <label>Mailing Address</label>
                <input
                  type="text"
                  placeholder="123 Main St, Apt 4B"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === "docs" && (
          <div className="lp-step-panel">
            <h3 className="lp-step-title">Required Documents</h3>
            <p className="lp-step-text">
              Please upload the following documents:{" "}
              {(permit.requiredDocs || []).join(", ")}.
            </p>

            <div
              className="lp-upload-box"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => document.getElementById("lp-file-upload")?.click()}
            >
              <div className="lp-upload-icon-wrap">
                <UploadCloud className="lp-upload-icon" />
              </div>
              <h4 className="lp-upload-title">Click to upload or drag and drop</h4>
              <p className="lp-upload-text">PDF, JPG, PNG up to 10MB</p>

              <input
                type="file"
                id="lp-file-upload"
                className="lp-hidden-file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  if (e.target.files) {
                    setFormData((prev) => ({
                      ...prev,
                      files: [...prev.files, ...Array.from(e.target.files)],
                    }));
                  }
                }}
              />
            </div>

            {formData.files.length > 0 && (
              <div className="lp-uploaded-files">
                <h4 className="lp-uploaded-title">Uploaded Files</h4>

                {formData.files.map((file, idx) => (
                  <div key={idx} className="lp-uploaded-item">
                    <div className="lp-uploaded-left">
                      <FileUp className="lp-uploaded-file-icon" />
                      <span>{file.name}</span>
                    </div>

                    <button
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          files: prev.files.filter((_, i) => i !== idx),
                        }))
                      }
                      className="lp-remove-file"
                      type="button"
                    >
                      <X className="lp-remove-file-icon" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentStep === "location" && (
          <div className="lp-step-panel">
            <h3 className="lp-step-title">Project Location</h3>
            <p className="lp-step-text">
              Pin the exact location of the work to be performed.
            </p>

            <MapPicker
              onLocationSelect={(loc) =>
                setFormData((prev) => ({
                  ...prev,
                  location: loc,
                }))
              }
            />

            {formData.location && (
              <div className="lp-location-selected">
                <MapPin className="lp-location-selected-icon" />
                <span>Location selected: {formData.location.address}</span>
              </div>
            )}
          </div>
        )}

        {currentStep === "review" && (
          <div className="lp-step-panel">
            <h3 className="lp-step-title">Review Application</h3>

            <div className="lp-review-box">
              <div>
                <h4 className="lp-review-label">Permit Type</h4>
                <p className="lp-review-value-main">{permit.title}</p>
              </div>

              <div className="lp-review-grid">
                <div>
                  <h4 className="lp-review-label">Applicant</h4>
                  <p className="lp-review-value">
                    {formData.firstName} {formData.lastName}
                  </p>
                  <p className="lp-review-sub">{formData.email}</p>
                  <p className="lp-review-sub">{formData.phone}</p>
                  <p className="lp-review-sub">{formData.address}</p>
                </div>

                <div>
                  <h4 className="lp-review-label">Location</h4>
                  <p className="lp-review-value">
                    {formData.location
                      ? formData.location.address
                      : "No location selected"}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="lp-review-label">
                  Documents ({formData.files.length})
                </h4>
                <ul className="lp-review-docs">
                  {formData.files.map((f, i) => (
                    <li key={i}>{f.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lp-certify-box">
              <input
                type="checkbox"
                className="lp-certify-check"
                checked={isCertified}
                onChange={(e) => setIsCertified(e.target.checked)}
              />
              <p>
                I certify that all information provided is true and correct to the
                best of my knowledge. I understand that false statements may result
                in rejection of this application.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="lp-form-footer">
        <button
          onClick={handleBack}
          className="lp-form-back-btn"
          type="button"
          disabled={isSubmitting}
        >
          <ChevronLeft className="lp-footer-icon" />
          {currentStep === "info" ? "Cancel" : "Back"}
        </button>

        <button
          onClick={handleNext}
          className="lp-form-next-btn"
          type="button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : currentStep === "review"
            ? "Submit Application"
            : "Continue"}

          {!isSubmitting && currentStep !== "review" && (
            <ChevronRight className="lp-footer-icon" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function LicensesPermitsPage() {
  const navigate = useNavigate();

  const [selectedPermit, setSelectedPermit] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [permits, setPermits] = useState([]);
  const [loadingPermits, setLoadingPermits] = useState(true);

  const [recentApplications, setRecentApplications] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/permits-catalog`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch permits.");
        }

        setPermits(result.data || []);
      } catch (error) {
        console.error("Fetch permits error:", error);
      } finally {
        setLoadingPermits(false);
      }
    };

    fetchPermits();
  }, []);

  const fetchMyPermits = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setRecentApplications([]);
        setLoadingRecent(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/permits/my`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch permit requests.");
      }

      setRecentApplications(result.data || []);
    } catch (error) {
      console.error("Fetch my permits error:", error);
      setRecentApplications([]);
    } finally {
      setLoadingRecent(false);
    }
  };

  useEffect(() => {
    fetchMyPermits();
  }, []);

  const filteredPermits = useMemo(() => {
    return permits.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [permits, searchQuery]);

  const handleRequest = (permit) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      navigate("/");
      return;
    }

    setSelectedPermit(permit);
    setIsSuccess(false);
  };

  const handleSubmit = async (formData) => {
    try {
      if (isSubmitting) return;

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        navigate("/");
        return;
      }

      setIsSubmitting(true);

      const payload = new FormData();
      payload.append("permitId", formData.permitId);
      payload.append("firstName", formData.firstName);
      payload.append("lastName", formData.lastName);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("address", formData.address || "");

      if (formData.location) {
        payload.append("locationLat", formData.location.lat);
        payload.append("locationLng", formData.location.lng);
        payload.append("locationAddress", formData.location.address || "");
      }

      formData.files.forEach((file) => {
        payload.append("documents", file);
      });

      const response = await fetch(`${API_BASE_URL}/permits`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("isLoggedIn");
        alert("Your session has expired. Please login again.");
        navigate("/");
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || `Server error: ${response.status}`);
      }

      await fetchMyPermits();
      setIsSuccess(true);
    } catch (error) {
      console.error("Submit permit request error:", error);
      alert(error.message || "Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lp-page">
      {selectedPermit && !isSuccess && (
        <div className="lp-overlay">
          <PermitRequestForm
            permit={selectedPermit}
            onCancel={() => setSelectedPermit(null)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {isSuccess && (
        <div className="lp-overlay">
          <div className="lp-success-modal">
            <div className="lp-success-icon-wrap">
              <svg
                className="lp-success-check"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="lp-success-title">Application Submitted!</h2>
            <p className="lp-success-text">
              Your request for a {selectedPermit?.title} has been received. You can
              track the status in "My Applications".
            </p>

            <button
              onClick={() => {
                setSelectedPermit(null);
                setIsSuccess(false);
              }}
              className="lp-success-btn"
              type="button"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

      <div className="lp-hero-section">
        <div className="lp-hero-overlay"></div>

        <div className="lp-hero-content">
          <div className="lp-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Services</span>
            <span>/</span>
            <span className="lp-active-page">Licenses &amp; Permits</span>
          </div>

          <h1>Licenses &amp; Permits</h1>
          <p>
            Browse available permits, submit applications, and track your approval
            status all in one place.
          </p>
        </div>
      </div>

      <main className="lp-main">
        <div className="lp-search-hero-bar">
          <div className="lp-search-box">
            <div className="lp-search-icon-wrap">
              <Search className="lp-search-icon" />
            </div>
            <input
              type="text"
              className="lp-search-input"
              placeholder="Search for permits (e.g., construction, event)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="lp-filter-btn" type="button">
            <SlidersHorizontal className="lp-filter-icon" />
            Filters
          </button>
        </div>

        <div className="lp-section">
          <h2 className="lp-section-title">Available Permits</h2>

          {loadingPermits ? (
            <p>Loading permits...</p>
          ) : filteredPermits.length > 0 ? (
            <div className="lp-permits-grid">
              {filteredPermits.map((permit) => (
                <PermitCard
                  key={permit._id}
                  permit={permit}
                  onRequest={handleRequest}
                />
              ))}
            </div>
          ) : (
            <div className="lp-empty-state">
              <p>No permits found matching your search.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="lp-clear-btn"
                type="button"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        <div className="lp-section lp-recent-section">
          <h2 className="lp-section-title">My Recent Applications</h2>

          <div className="lp-table-wrap">
            <table className="lp-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Type</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th className="lp-th-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {loadingRecent ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                      Loading applications...
                    </td>
                  </tr>
                ) : recentApplications.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                      No applications submitted yet.
                    </td>
                  </tr>
                ) : (
                  recentApplications.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.permitTitle || item.permitId?.title || "Permit Request"}</td>
                      <td>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <span
                          className={`lp-status-badge ${
                            item.status === "approved"
                              ? "approved"
                              : item.status === "rejected"
                              ? "rejected"
                              : "pending"
                          }`}
                        >
                          {item.status === "in_review"
                            ? "In Review"
                            : item.status === "approved"
                            ? "Approved"
                            : item.status === "rejected"
                            ? "Rejected"
                            : "Pending"}
                        </span>
                      </td>
                      <td className="lp-td-right">
                        <button className="lp-table-link" type="button">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
import React, { useMemo, useState } from "react";
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

const PERMITS = [
  {
    id: "1",
    title: "Construction Permit",
    description:
      "Required for new building construction, structural changes, or major additions to existing properties.",
    icon: <Hammer className="lp-card-icon-svg" />,
    processingTime: "10-15 business days",
    requiredDocs: [
      "Site Plan",
      "Structural Drawings",
      "Contractor License",
      "Insurance Proof",
    ],
  },
  {
    id: "2",
    title: "Business License",
    description:
      "Register a new business or renew an existing operating license for commercial activities.",
    icon: <Briefcase className="lp-card-icon-svg" />,
    processingTime: "5-7 business days",
    requiredDocs: ["Business Registration", "Tax ID", "Lease Agreement"],
  },
  {
    id: "3",
    title: "Renovation Permit",
    description:
      "For home improvements, remodeling, or non-structural modifications to residential properties.",
    icon: <Home className="lp-card-icon-svg" />,
    processingTime: "3-5 business days",
    requiredDocs: ["Project Scope", "Floor Plan", "Owner Consent"],
  },
  {
    id: "4",
    title: "Event Permit",
    description:
      "Authorization for public gatherings, festivals, street fairs, or block parties.",
    icon: <Calendar className="lp-card-icon-svg" />,
    processingTime: "15-20 business days",
    requiredDocs: [
      "Event Plan",
      "Safety Protocol",
      "Insurance Certificate",
      "Noise Variance",
    ],
  },
];

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
          <div className="lp-permit-card-icon">{permit.icon}</div>
        </div>

        <h3 className="lp-permit-card-title">{permit.title}</h3>
        <p className="lp-permit-card-desc">{permit.description}</p>

        <div className="lp-permit-card-meta">
          <div className="lp-permit-time">
            <Clock className="lp-meta-icon" />
            <span>
              Est. Time:{" "}
              <strong className="lp-strong">{permit.processingTime}</strong>
            </span>
          </div>

          <div className="lp-required-docs">
            <p className="lp-required-label">Required Documents</p>
            <ul className="lp-required-list">
              {permit.requiredDocs.slice(0, 2).map((doc, idx) => (
                <li key={idx} className="lp-required-item">
                  <FileText className="lp-required-icon" />
                  <span>{doc}</span>
                </li>
              ))}
              {permit.requiredDocs.length > 2 && (
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

function PermitRequestForm({ permit, onCancel, onSubmit }) {
  const [currentStep, setCurrentStep] = useState("info");
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

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    } else {
      onSubmit();
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

        <button onClick={onCancel} className="lp-form-close" type="button">
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
                    isCompleted
                      ? "completed"
                      : isCurrent
                        ? "current"
                        : "pending"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="lp-progress-check" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span
                  className={`lp-progress-label ${
                    isCurrent ? "current" : ""
                  }`}
                >
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
                    setFormData({ ...formData, firstName: e.target.value })
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
                    setFormData({ ...formData, lastName: e.target.value })
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
                    setFormData({ ...formData, email: e.target.value })
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
                    setFormData({ ...formData, phone: e.target.value })
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
                    setFormData({ ...formData, address: e.target.value })
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
              {permit.requiredDocs.join(", ")}.
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
              <input type="checkbox" className="lp-certify-check" />
              <p>
                I certify that all information provided is true and correct to
                the best of my knowledge. I understand that false statements may
                result in rejection of this application.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="lp-form-footer">
        <button onClick={handleBack} className="lp-form-back-btn" type="button">
          <ChevronLeft className="lp-footer-icon" />
          {currentStep === "info" ? "Cancel" : "Back"}
        </button>

        <button onClick={handleNext} className="lp-form-next-btn" type="button">
          {currentStep === "review" ? "Submit Application" : "Continue"}
          {currentStep !== "review" && (
            <ChevronRight className="lp-footer-icon" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function LicensesPermitsPage() {
  const [selectedPermit, setSelectedPermit] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPermits = useMemo(() => {
    return PERMITS.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleRequest = (permit) => {
    setSelectedPermit(permit);
    setIsSuccess(false);
  };

  const handleSubmit = () => {
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        setSelectedPermit(null);
        setIsSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="lp-page">
      {selectedPermit && !isSuccess && (
        <div className="lp-overlay">
          <PermitRequestForm
            permit={selectedPermit}
            onCancel={() => setSelectedPermit(null)}
            onSubmit={handleSubmit}
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
              Your request for a {selectedPermit?.title} has been received. You
              can track the status in "My Applications".
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

      <main className="lp-main">
        <div className="lp-page-header">
          <h1 className="lp-page-title">Licenses &amp; Permits</h1>
          <p className="lp-page-subtitle">
            Browse available permits, submit applications, and track your
            approval status all in one place.
          </p>
        </div>

        <div className="lp-search-row">
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

          {filteredPermits.length > 0 ? (
            <div className="lp-permits-grid">
              {filteredPermits.map((permit) => (
                <PermitCard
                  key={permit.id}
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
                <tr>
                  <td>#APP-2023-892</td>
                  <td>Renovation Permit</td>
                  <td>Oct 24, 2023</td>
                  <td>
                    <span className="lp-status-badge pending">
                      Pending Review
                    </span>
                  </td>
                  <td className="lp-td-right">
                    <button className="lp-table-link" type="button">
                      View Details
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>#APP-2023-441</td>
                  <td>Event Permit</td>
                  <td>Sep 12, 2023</td>
                  <td>
                    <span className="lp-status-badge approved">Approved</span>
                  </td>
                  <td className="lp-td-right">
                    <button className="lp-table-link" type="button">
                      Download Permit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
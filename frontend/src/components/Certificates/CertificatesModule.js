import React, { useState } from "react";
import "./CertificatesModule.css";
import {
  FileText,
  ArrowRight,
  Info,
  MessageSquare,
  Wrench,
  AlertTriangle,
  X,
  Upload,
  CheckCircle2,
} from "lucide-react";
 
export default function CertificatesModule() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    description: "",
  });
 
  const [selectedFile, setSelectedFile] = useState(null);
 
  const handleOpenModal = (title, type) => {
    setSelectedService({ title, type });
    setFormData({
      fullName: "",
      phone: "",
      description: "",
    });
    setSelectedFile(null);
    setIsSubmitting(false);
    setShowSuccessPopup(false);
    setIsModalOpen(true);
  };
 
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedService(null);
      setFormData({
        fullName: "",
        phone: "",
        description: "",
      });
      setSelectedFile(null);
      setIsSubmitting(false);
    }, 200);
  };
 
  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false);
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      if (isSubmitting || !selectedService) return;
 
      if (!formData.fullName.trim() || !formData.phone.trim()) {
        alert("Please fill all required fields.");
        return;
      }
 
      if (
        selectedService.type === "request" &&
        !formData.description.trim()
      ) {
        alert("Please enter the description of your request.");
        return;
      }
 
      setIsSubmitting(true);
 
      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("phone", formData.phone);
      payload.append("serviceTitle", selectedService.title);
      payload.append("serviceType", selectedService.type);
 
      if (selectedService.type === "request") {
        payload.append("description", formData.description);
      }
 
      if (selectedFile) {
        payload.append("documents", selectedFile);
      }
 
      const response = await fetch("http://localhost:5000/api/certificates", {
        method: "POST",
        body: payload,
      });
 
      let result = {};
      try {
        result = await response.json();
      } catch (err) {
        result = {};
      }
 
      if (!response.ok) {
        throw new Error(result.message || `Server error: ${response.status}`);
      }
 
      setIsModalOpen(false);
      setShowSuccessPopup(true);
 
      setFormData({
        fullName: "",
        phone: "",
        description: "",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Submit certificate/request error:", error);
      alert(error.message || "Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <>
      <div className="cert-page-main">
        <div className="certHeroSection">
          <div className="certHeroOverlay"></div>
 
          <div className="certHeroContent">
            <div className="certBreadcrumb">
              <span>Home</span>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span className="certActivePage">Certificates & Requests</span>
            </div>
 
            <h1>Certificates & Requests</h1>
 
            <p>
              Request official documents or submit service requests to your
              municipality quickly and securely.
            </p>
          </div>
        </div>
 
        <section className="cert-section">
          <div className="cert-section-header">
            <h2>Official Certificates</h2>
            <p>
              Request official municipal documents. Please ensure you have
              digital copies of the required documents ready for upload.
            </p>
          </div>
 
          <div className="cert-grid">
            <CertificateCard
              title="Residency Certificate"
              description="Official document proving your current place of residence within the municipal jurisdiction."
              requirements={[
                "Valid ID Card / Passport",
                "Rental Contract or Property Deed",
                "Recent Utility Bill",
              ]}
              processingTime="2-3 Business Days"
              onRequest={() =>
                handleOpenModal("Residency Certificate", "certificate")
              }
            />
 
            <CertificateCard
              title="Proof of Address"
              description="Verification of your physical address for banking, school registration, or other official purposes."
              requirements={[
                "Valid ID Card",
                "Mukhtar Certificate (Original)",
              ]}
              processingTime="1-2 Business Days"
              onRequest={() =>
                handleOpenModal("Proof of Address", "certificate")
              }
            />
 
            <CertificateCard
              title="Rental Registration"
              description="Register your residential or commercial lease agreement with the municipality."
              requirements={[
                "Lease Agreement (Signed)",
                "Landlord ID Copy",
                "Tenant ID Copy",
              ]}
              processingTime="3-5 Business Days"
              onRequest={() =>
                handleOpenModal("Rental Registration", "certificate")
              }
            />
          </div>
        </section>
 
        <section className="cert-section">
          <div className="cert-section-header">
            <h2>Service Requests</h2>
            <p>
              Submit requests for maintenance, complaints, or general
              administrative assistance.
            </p>
          </div>
 
          <div className="request-grid">
            <RequestCard
              title="Public Maintenance Request"
              description="Report issues with street lighting, potholes, sidewalk damage, or public park facilities."
              icon="maintenance"
              onRequest={() =>
                handleOpenModal("Public Maintenance Request", "request")
              }
            />
 
            <RequestCard
              title="Sanitation & Waste Request"
              description="Request bulk waste collection, report illegal dumping, or schedule special pickup services."
              icon="alert"
              onRequest={() =>
                handleOpenModal("Sanitation & Waste Request", "request")
              }
            />
 
            <RequestCard
              title="General Inquiry"
              description="Ask a question or request information about municipal services, taxes, or regulations."
              icon="message"
              onRequest={() => handleOpenModal("General Inquiry", "request")}
            />
 
            <RequestCard
              title="Event Permit Request"
              description="Apply for a permit to host a public event, gathering, or temporary installation."
              icon="message"
              onRequest={() =>
                handleOpenModal("Event Permit Request", "request")
              }
            />
          </div>
        </section>
      </div>
 
      {isModalOpen && selectedService && (
        <RequestFormModal
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          serviceTitle={selectedService.title}
          serviceType={selectedService.type}
          formData={formData}
          setFormData={setFormData}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      )}
 
      {showSuccessPopup && selectedService && (
        <div
          className="certSuccessOverlay"
          onClick={handleCloseSuccessPopup}
        >
          <div
            className="certSuccessModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="certSuccessClose"
              onClick={handleCloseSuccessPopup}
              aria-label="Close popup"
            >
              <X size={18} />
            </button>
 
            <div className="certSuccessIconWrap">
              <div className="certSuccessIcon">
                <CheckCircle2 size={42} />
              </div>
            </div>
 
            <h3 className="certSuccessTitle">Request Submitted</h3>
 
            <p className="certSuccessText">
              Your request for <strong>{selectedService.title}</strong> has been
              submitted successfully. Our team will review it as soon as
              possible.
            </p>
 
            <button
              type="button"
              className="certSuccessBtn"
              onClick={handleCloseSuccessPopup}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
 
function CertificateCard({
  title,
  description,
  requirements,
  processingTime,
  onRequest,
}) {
  return (
    <div className="certificate-card">
      <div className="certificate-card-body">
        <div className="certificate-card-top">
          <div className="certificate-icon-box">
            <FileText size={24} />
          </div>
 
          <span className="certificate-time-badge">{processingTime}</span>
        </div>
 
        <h3>{title}</h3>
        <p className="certificate-description">{description}</p>
 
        <div className="certificate-requirements">
          <h4>
            <Info size={14} />
            Required Documents
          </h4>
 
          <ul>
            {requirements.map((req, index) => (
              <li key={index}>
                <span className="bullet">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>
      </div>
 
      <div className="certificate-card-footer">
        <button type="button" onClick={onRequest} className="green-btn">
          Request Now
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
 
function RequestCard({ title, description, icon, onRequest }) {
  const getIcon = () => {
    switch (icon) {
      case "message":
        return <MessageSquare size={24} />;
      case "maintenance":
        return <Wrench size={24} />;
      case "alert":
        return <AlertTriangle size={24} className="request-alert-icon" />;
      default:
        return <MessageSquare size={24} />;
    }
  };
 
  return (
    <div className="request-card" onClick={onRequest}>
      <div className="request-card-left">
        <div
          className={`request-icon-box ${icon === "alert" ? "alert" : ""}`}
        >
          {getIcon()}
        </div>
 
        <div className="request-card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
 
      <ArrowRight className="request-arrow" size={20} />
    </div>
  );
}
 
function RequestFormModal({
  isSubmitting,
  onSubmit,
  onClose,
  serviceTitle,
  serviceType,
  formData,
  setFormData,
  selectedFile,
  setSelectedFile,
}) {
  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose}></div>
 
      <div className="modal-box large-box">
        <div className="modal-header">
          <h3>{serviceTitle}</h3>
 
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>
 
        <form onSubmit={onSubmit}>
          <div className="modal-body modal-scroll-body">
            <p className="modal-text">
              Please fill in the details below to proceed with your request. All
              fields marked with * are required.
            </p>
 
            <div className="form-group">
              <label>Full Name (as per ID) *</label>
              <input
                type="text"
                placeholder="Jad Haddad"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                required
              />
            </div>
 
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                placeholder="+961 3 123 456"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value,
                  }))
                }
                required
              />
            </div>
 
            {serviceType === "request" && (
              <div className="form-group">
                <label>Description of Request *</label>
                <textarea
                  rows="4"
                  placeholder="Please describe your request in detail..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            )}
 
            <div className="form-group">
              <label>Required Documents</label>
 
              <div className="upload-box">
                <Upload size={42} />
                <p>
                  <span>Upload a file</span> or drag and drop
                </p>
                <small>PDF, PNG, JPG up to 5MB</small>
 
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                />
 
                {selectedFile && (
                  <div className="selected-file-name">
                    Selected: {selectedFile.name}
                  </div>
                )}
              </div>
            </div>
          </div>
 
          <div className="modal-footer">
            <button type="submit" className="green-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
 
            <button
              type="button"
              className="outline-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
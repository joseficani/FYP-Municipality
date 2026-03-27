import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./TaxApplicationModule.css";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Wallet,
  CheckCircle2,
  User,
  Phone,
  Mail,
  MapPin,
  ClipboardList,
} from "lucide-react";

export default function TaxApplicationModule() {
  const location = useLocation();
  const navigate = useNavigate();
  const fee = location.state?.fee;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    nationalId: "",
    propertyReference: "",
    notes: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fallbackFee = useMemo(
    () => ({
      id: "",
      _id: "",
      name: "Tax / Fee Application",
      arabicName: "طلب رسوم / ضريبة",
      description:
        "Complete the form below to submit your municipal tax or fee application.",
      conditions:
        "Please make sure all information is correct before submitting.",
      paymentPeriod: "As per municipality regulations",
      estimatedAmount: "To be assessed",
      requiredDocuments: ["Copy of ID", "Supporting documents if applicable"],
    }),
    []
  );

  const selectedFee = fee || fallbackFee;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setFormData((prev) => ({
          ...prev,
          fullName: parsedUser.name || "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
          address: parsedUser.address || "",
        }));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!fee) {
      console.warn("No fee selected. User entered tax application directly.");
    }
  }, [fee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isSubmitting) return;

    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.nationalId.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const selectedTaxId = selectedFee._id || selectedFee.id || "";

    if (!selectedTaxId) {
      alert("Please select a tax or fee first.");
      navigate("/taxes-fees");
      return;
    }

    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }

    const payload = {
      taxId: selectedTaxId,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      nationalId: formData.nationalId.trim(),
      propertyReference: formData.propertyReference.trim(),
      notes: formData.notes.trim(),
    };

    const response = await fetch("http://localhost:5000/api/tax-applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
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

    setShowSuccess(true);

    setFormData({
      fullName: "",
      phone: "",
      email: "",
      address: "",
      nationalId: "",
      propertyReference: "",
      notes: "",
    });
  } catch (error) {
    console.error("Submit tax application error:", error);
    alert(error.message || "Something went wrong while submitting.");
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <>
      <div className="tax-app-hero">
        <div className="tax-app-hero-overlay"></div>
        <div className="tax-app-hero-content">
          <button
            className="tax-app-back-btn"
            type="button"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <h1>Apply for Tax / Fee Service</h1>
          <p>
            Submit your request online by filling out the form below. Please
            review the service details before proceeding.
          </p>
        </div>
      </div>

      <div className="tax-app-main">
        <div className="tax-app-layout">
          <div className="tax-app-left">
            <div className="tax-app-service-card">
              <div className="tax-app-service-header">
                <h2>{selectedFee.name}</h2>
                {selectedFee.arabicName && (
                  <p className="tax-app-arabic-title">
                    {selectedFee.arabicName}
                  </p>
                )}
              </div>

              <p className="tax-app-service-description">
                {selectedFee.description}
              </p>

              <div className="tax-app-info-grid">
                <div className="tax-app-info-box">
                  <div className="tax-app-info-title">
                    <ClipboardList size={18} />
                    <span>Conditions</span>
                  </div>
                  <p>{selectedFee.conditions}</p>
                </div>

                <div className="tax-app-info-box">
                  <div className="tax-app-info-title">
                    <Calendar size={18} />
                    <span>Payment Period</span>
                  </div>
                  <p>{selectedFee.paymentPeriod}</p>
                </div>

                <div className="tax-app-info-box">
                  <div className="tax-app-info-title">
                    <Wallet size={18} />
                    <span>Estimated Cost</span>
                  </div>
                  <p className="tax-app-cost">{selectedFee.estimatedAmount}</p>
                </div>

                <div className="tax-app-info-box">
                  <div className="tax-app-info-title">
                    <FileText size={18} />
                    <span>Required Documents</span>
                  </div>
                  <ul>
                    {(selectedFee.requiredDocuments || []).map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="tax-app-right">
            <form className="tax-app-form-card" onSubmit={handleSubmit}>
              <div className="tax-app-form-head">
                <h3>Application Form</h3>
                <p>Please complete all required fields.</p>
              </div>

              <div className="tax-app-form-grid">
                <div className="tax-app-field">
                  <label>Full Name</label>
                  <div className="tax-app-input-wrap">
                    <User size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="tax-app-field">
                  <label>Phone Number</label>
                  <div className="tax-app-input-wrap">
                    <Phone size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="tax-app-field">
                  <label>Email Address</label>
                  <div className="tax-app-input-wrap">
                    <Mail size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="tax-app-field">
                  <label>National ID</label>
                  <div className="tax-app-input-wrap">
                    <FileText size={18} />
                    <input
                      type="text"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleChange}
                      placeholder="Enter your ID number"
                      required
                    />
                  </div>
                </div>

                <div className="tax-app-field tax-app-field-full">
                  <label>Address</label>
                  <div className="tax-app-input-wrap">
                    <MapPin size={18} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                </div>

                <div className="tax-app-field tax-app-field-full">
                  <label>Property / File Reference</label>
                  <div className="tax-app-input-wrap">
                    <ClipboardList size={18} />
                    <input
                      type="text"
                      name="propertyReference"
                      value={formData.propertyReference}
                      onChange={handleChange}
                      placeholder="Enter property number, file reference, or related info"
                    />
                  </div>
                </div>

                <div className="tax-app-field tax-app-field-full">
                  <label>Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Write any extra details here..."
                    rows="5"
                  />
                </div>
              </div>

              <div className="tax-app-actions">
                <button
                  type="button"
                  className="tax-app-secondary-btn"
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="tax-app-primary-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="tax-app-success-overlay">
          <div
            className="tax-app-success-backdrop"
            onClick={() => setShowSuccess(false)}
          ></div>

          <div className="tax-app-success-box">
            <CheckCircle2 size={60} className="tax-app-success-icon" />
            <h3>Application Submitted</h3>
            <p>
              Your application for <strong>{selectedFee.name}</strong> has been
              submitted successfully.
            </p>

            <div className="tax-app-success-actions">
              <button
                className="tax-app-secondary-btn"
                type="button"
                onClick={() => setShowSuccess(false)}
              >
                Stay Here
              </button>
              <button
                className="tax-app-primary-btn"
                type="button"
                onClick={() => navigate("/taxes-fees")}
              >
                Back to Taxes Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
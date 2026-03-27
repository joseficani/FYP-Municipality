import React, { useEffect, useMemo, useState } from "react";
import "./TaxesModule.css";
import {
  X,
  FileText,
  Calendar,
  Wallet,
  AlertCircle,
  ChevronRight,
  Search,
  Filter,
  Download,
  Info,
  Building2,
  Store,
  Hammer,
  Megaphone,
  Trash2,
  HardHat,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/tax-catalog";

const categoryIcons = {
  property: Building2,
  business: Store,
  construction: Hammer,
  signage: Megaphone,
  sanitation: Trash2,
  infrastructure: HardHat,
};

export default function TaxesModule() {
  const [taxes, setTaxes] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTaxes();
  }, []);

  const fetchTaxes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const contentType = response.headers.get("content-type") || "";

      let result = null;

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(
          text?.includes("<!DOCTYPE")
            ? "Backend route not found. Please check the tax catalog API."
            : "Invalid server response while fetching taxes catalog."
        );
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch taxes catalog");
      }

      setTaxes(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("fetchTaxes error:", err);
      setError(err.message || "Failed to load taxes catalog");
    } finally {
      setLoading(false);
    }
  };

  const groupedCategories = useMemo(() => {
    const grouped = {};

    taxes.forEach((tax) => {
      const categoryKey = tax.category || "other";

      if (!grouped[categoryKey]) {
        grouped[categoryKey] = {
          id: categoryKey,
          title: tax.categoryTitle || "Other Fees",
          arabicTitle: tax.categoryArabicTitle || "",
          icon: categoryIcons[categoryKey] || FileText,
          description:
            tax.categoryDescription ||
            `Browse all ${tax.categoryTitle || "municipal"} fees and taxes.`,
          fees: [],
        };
      }

      grouped[categoryKey].fees.push({
        ...tax,
        id: tax._id,
        _id: tax._id,
        name: tax.title,
        arabicName: tax.arabicTitle || "",
      });
    });

    return Object.values(grouped);
  }, [taxes]);

  const filteredCategories = groupedCategories
    .map((category) => ({
      ...category,
      fees: category.fees.filter(
        (fee) =>
          (fee.name || "").toLowerCase().includes(search.toLowerCase()) ||
          (category.title || "").toLowerCase().includes(search.toLowerCase()) ||
          (fee.description || "").toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((category) => category.fees.length > 0 || search.trim() === "");

  const handleViewDetails = (fee) => {
    setSelectedFee(fee);
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    alert("This would download the fee schedule PDF.");
  };

  return (
    <>
      <div className="taxes-hero">
        <div className="taxes-hero-overlay"></div>
        <div className="taxes-hero-content">
          <div className="taxes-breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span>Services</span>
            <span>/</span>
            <span className="active">Taxes & Fees</span>
          </div>

          <h1>Taxes & Municipal Fees</h1>
          <p>
            A comprehensive guide to municipal taxes, service fees, and permit
            costs. Find detailed information about requirements, payment
            periods, and regulations.
          </p>
        </div>
      </div>

      <main className="taxes-main">
        <div className="taxes-search-bar">
          <div className="taxes-search-input-wrap">
            <Search size={20} className="taxes-search-icon" />
            <input
              type="text"
              placeholder="Search for a tax, fee, or permit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="taxes-search-actions">
            <button className="taxes-outline-btn" type="button">
              <Filter size={18} />
              <span>Filter</span>
            </button>

            <button
              className="taxes-green-btn"
              type="button"
              onClick={handleDownload}
            >
              <Download size={18} />
              <span>Fee Schedule PDF</span>
            </button>
          </div>
        </div>

        <div className="taxes-info-banner">
          <Info size={20} className="taxes-info-icon" />
          <div>
            <h4>Taxes & Fees Information</h4>
            <p>
              Browse all available municipal taxes and fees. Click on any item
              to view requirements, payment periods, estimated amounts, and
              application details.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="taxes-empty-state">
            <h3>Loading taxes catalog...</h3>
            <p>Please wait while we fetch the latest municipal taxes and fees.</p>
          </div>
        ) : error ? (
          <div className="taxes-empty-state">
            <h3>Failed to load taxes catalog</h3>
            <p>{error}</p>
            <button
              className="taxes-green-btn"
              type="button"
              onClick={fetchTaxes}
            >
              Try Again
            </button>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="taxes-empty-state">
            <h3>No taxes found</h3>
            <p>Try searching with another keyword.</p>
          </div>
        ) : (
          <div className="taxes-grid">
            {filteredCategories.map((category) => (
              <TaxCategoryCard
                key={category.id}
                category={category}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        <div className="taxes-help-box">
          <div className="taxes-help-overlay"></div>
          <div className="taxes-help-content">
            <h2>Need help calculating your fees?</h2>
            <p>
              Our municipal support team is available to assist you with tax
              assessments and fee calculations. Visit the municipal building or
              contact our hotline.
            </p>

            <div className="taxes-help-actions">
              <button
                className="taxes-white-btn"
                type="button"
                onClick={() => {
                  navigate("/contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Contact Support
              </button>
              <button className="taxes-transparent-btn" type="button">
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </main>

      <FeeDetailModal
        fee={selectedFee}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

function TaxCategoryCard({ category, onViewDetails }) {
  const Icon = category.icon || FileText;

  return (
    <div className="tax-card">
      <div className="tax-card-header">
        <div className="tax-card-header-top">
          <div className="tax-card-icon-box">
            <Icon size={28} strokeWidth={1.6} />
          </div>

          <span className="tax-card-fees-count">
            {category.fees.length} Fees
          </span>
        </div>

        <h3>{category.title}</h3>
        <p className="tax-card-arabic">{category.arabicTitle}</p>
        <p className="tax-card-description">{category.description}</p>
      </div>

      <div className="tax-card-body">
        {category.fees.map((fee) => (
          <div
            key={fee.id}
            className="tax-fee-row"
            onClick={() => onViewDetails(fee)}
          >
            <div className="tax-fee-info">
              <h4>{fee.name}</h4>
              <p>{fee.estimatedAmount || "Amount not specified"}</p>
            </div>

            <button
              className="tax-fee-arrow"
              type="button"
              aria-label={`View details for ${fee.name}`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="tax-card-footer">
        <button className="tax-info-btn" type="button">
          <Info size={16} />
          <span>General Information</span>
        </button>
      </div>
    </div>
  );
}

function FeeDetailModal({ fee, isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen || !fee) return null;

  return (
    <div className="fee-modal-overlay">
      <div className="fee-modal-backdrop" onClick={onClose}></div>

      <div className="fee-modal-box" role="dialog" aria-modal="true">
        <div className="fee-modal-header">
          <div>
            <h3>{fee.name}</h3>
            {fee.arabicName && <p>{fee.arabicName}</p>}
          </div>

          <button
            onClick={onClose}
            className="fee-close-btn"
            aria-label="Close modal"
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <div className="fee-modal-body">
          <p className="fee-main-description">{fee.description}</p>

          <div className="fee-detail-grid">
            <div className="fee-detail-card">
              <div className="fee-detail-title">
                <AlertCircle size={20} />
                <h4>Conditions</h4>
              </div>
              <p>{fee.conditions || "No conditions specified."}</p>
            </div>

            <div className="fee-detail-card">
              <div className="fee-detail-title">
                <Calendar size={20} />
                <h4>Payment Period</h4>
              </div>
              <p>{fee.paymentPeriod || "Not specified."}</p>
            </div>

            <div className="fee-detail-card">
              <div className="fee-detail-title">
                <Wallet size={20} />
                <h4>Estimated Cost</h4>
              </div>
              <p className="fee-cost">{fee.estimatedAmount || "Not specified."}</p>
            </div>

            <div className="fee-detail-card">
              <div className="fee-detail-title">
                <FileText size={20} />
                <h4>Required Documents</h4>
              </div>
              {fee.requiredDocuments && fee.requiredDocuments.length > 0 ? (
                <ul>
                  {fee.requiredDocuments.map((doc, idx) => (
                    <li key={idx}>{doc}</li>
                  ))}
                </ul>
              ) : (
                <p>No required documents listed.</p>
              )}
            </div>
          </div>

          {fee.notes && (
            <div className="fee-note-box">
              <span>Note:</span> {fee.notes}
            </div>
          )}
        </div>

        <div className="fee-modal-footer">
          <button
            onClick={onClose}
            className="fee-outline-btn"
            type="button"
          >
            Close
          </button>

          <button
            className="fee-green-btn"
            type="button"
            onClick={() => {
              onClose();
              navigate("/tax-application", {
                state: { fee },
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
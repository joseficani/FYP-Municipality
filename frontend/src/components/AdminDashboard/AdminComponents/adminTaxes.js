import React, { useMemo, useState, useEffect } from "react";
import "./adminTaxes.css";
import Sidebar from "../SideBar";
import TopBar from "../TopBar";
import {
  Receipt,
  CheckCircle,
  XCircle,
  Boxes,
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  ArrowLeft,
  Calendar,
  User,
  FileText,
  AlertCircle,
} from "lucide-react";

const TAX_API = "http://localhost:5000/api/tax-catalog";
const TAX_APPLICATIONS_API = "http://localhost:5000/api/tax-applications";

const CATEGORIES = [
  "All",
  "Property",
  "Sales",
  "Business",
  "Permits",
  "Utilities",
  "Construction",
  "Signage",
  "Sanitation",
  "Infrastructure",
];

const STATUSES = ["All", "Active", "Inactive"];

function getApplicationStatusClass(status) {
  switch ((status || "").toLowerCase()) {
    case "pending":
      return "tf-status-badge pending";
    case "review":
    case "under review":
      return "tf-status-badge review";
    case "approved":
      return "tf-status-badge active";
    case "rejected":
      return "tf-status-badge rejected";
    default:
      return "tf-status-badge inactive";
  }
}

function normalizeCategory(category = "") {
  const value = category.toLowerCase();

  if (value === "property") return "Property";
  if (value === "sales") return "Sales";
  if (value === "business") return "Business";
  if (value === "permits") return "Permits";
  if (value === "utilities") return "Utilities";
  if (value === "construction") return "Construction";
  if (value === "signage") return "Signage";
  if (value === "sanitation") return "Sanitation";
  if (value === "infrastructure") return "Infrastructure";

  return category || "Other";
}

function mapTaxFromApi(item) {
  const estimatedAmount = item.estimatedAmount || "";
  const parsedAmount = parseFloat(
    String(estimatedAmount).replace(/[^0-9.]/g, "")
  );

  const isPercentage =
    estimatedAmount.includes("%") ||
    item.type === "Percentage" ||
    item.amountType === "Percentage";

  return {
    id: item._id,
    name: item.title || "",
    arabicTitle: item.arabicTitle || "",
    category: normalizeCategory(item.categoryTitle || item.category || ""),
    categoryKey: item.category || "",
    type: isPercentage ? "Percentage" : "Flat Amount",
    amount: Number.isNaN(parsedAmount) ? 0 : parsedAmount,
    amountLabel: estimatedAmount || "Not specified",
    status: item.isActive ? "Active" : "Inactive",
    effectiveDate: item.createdAt || new Date().toISOString(),
    description: item.description || "",
    conditions: item.conditions || "",
    paymentPeriod: item.paymentPeriod || "",
    notes: item.notes || "",
    requiredDocuments: item.requiredDocuments || [],
    raw: item,
  };
}

function mapApplicationFromApi(item) {
  const statusMap = {
    pending: "Pending",
    review: "Under Review",
    approved: "Approved",
    rejected: "Rejected",
  };

  return {
    id: item._id,
    applicantName: item.fullName || "",
    email: item.email || "",
    phone: item.phone || "",
    taxName: item.taxTitle || item.taxId?.title || "",
    category: normalizeCategory(
      item.taxId?.categoryTitle || item.taxId?.category || ""
    ),
    submissionDate:
      item.submittedAt || item.createdAt || new Date().toISOString(),
    amount: item.taxId?.estimatedAmount || "Not specified",
    paymentType: item.paymentType || "Not specified",
    referenceNumber: item.referenceNumber || "N/A",
    propertyAddress: item.address || "",
    notes: item.notes || "",
    nationalId: item.nationalId || "",
    propertyReference: item.propertyReference || "",
    adminNote: item.adminNote || "",
    status: statusMap[item.status] || "Pending",
    raw: item,
  };
}

function showAmount(type, amount, amountLabel) {
  if (amountLabel && amountLabel !== "Not specified") return amountLabel;

  if (type === "Percentage") return `${amount.toFixed(2)}%`;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount || 0);
}

function getCategoryClass(category) {
  switch (category) {
    case "Property":
      return "tf-tag tf-tag-blue";
    case "Sales":
      return "tf-tag tf-tag-purple";
    case "Business":
      return "tf-tag tf-tag-orange";
    case "Permits":
      return "tf-tag tf-tag-teal";
    case "Utilities":
      return "tf-tag tf-tag-indigo";
    case "Construction":
      return "tf-tag tf-tag-blue";
    case "Signage":
      return "tf-tag tf-tag-purple";
    case "Sanitation":
      return "tf-tag tf-tag-teal";
    case "Infrastructure":
      return "tf-tag tf-tag-indigo";
    default:
      return "tf-tag";
  }
}

function SuccessPopup({ message, open }) {
  if (!open) return null;

  return (
    <div className="admin-tax-success-popup">
      <div className="admin-tax-success-box">
        <span>✓</span>
        <p>{message}</p>
      </div>
    </div>
  );
}

function StatCards({ stats }) {
  const cards = [
    {
      title: "Total Taxes & Fees",
      value: stats.total,
      icon: Receipt,
      boxClass: "tf-stat-blue",
      iconClass: "tf-text-blue",
    },
    {
      title: "Active",
      value: stats.active,
      icon: CheckCircle,
      boxClass: "tf-stat-green",
      iconClass: "tf-text-green",
    },
    {
      title: "Inactive",
      value: stats.inactive,
      icon: XCircle,
      boxClass: "tf-stat-red",
      iconClass: "tf-text-red",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: Boxes,
      boxClass: "tf-stat-purple",
      iconClass: "tf-text-purple",
    },
  ];

  return (
    <div className="tf-stats-grid">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div key={index} className="tf-stat-card">
            <div className={`tf-stat-icon ${card.boxClass}`}>
              <Icon className={card.iconClass} size={22} />
            </div>
            <div className="tf-stat-content">
              <p>{card.title}</p>
              <h3>{card.value}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TaxDrawer({ isOpen, onClose, onSave, editingTax, saving }) {
  const [formData, setFormData] = useState({
    title: "",
    arabicTitle: "",
    category: "property",
    categoryTitle: "Property",
    description: "",
    conditions: "",
    paymentPeriod: "",
    estimatedAmount: "",
    notes: "",
    isActive: true,
    requiredDocuments: "",
  });

  useEffect(() => {
    if (editingTax) {
      setFormData({
        title: editingTax.raw?.title || "",
        arabicTitle: editingTax.raw?.arabicTitle || "",
        category: editingTax.raw?.category || "property",
        categoryTitle:
          editingTax.raw?.categoryTitle || editingTax.category || "Property",
        description: editingTax.raw?.description || "",
        conditions: editingTax.raw?.conditions || "",
        paymentPeriod: editingTax.raw?.paymentPeriod || "",
        estimatedAmount: editingTax.raw?.estimatedAmount || "",
        notes: editingTax.raw?.notes || "",
        isActive: editingTax.raw?.isActive ?? true,
        requiredDocuments: (editingTax.raw?.requiredDocuments || []).join(", "),
      });
    } else {
      setFormData({
        title: "",
        arabicTitle: "",
        category: "property",
        categoryTitle: "Property",
        description: "",
        conditions: "",
        paymentPeriod: "",
        estimatedAmount: "",
        notes: "",
        isActive: true,
        requiredDocuments: "",
      });
    }
  }, [editingTax, isOpen]);

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      category: value.toLowerCase(),
      categoryTitle: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      title: formData.title,
      arabicTitle: formData.arabicTitle,
      category: formData.category,
      categoryTitle: formData.categoryTitle,
      description: formData.description,
      conditions: formData.conditions,
      paymentPeriod: formData.paymentPeriod,
      estimatedAmount: formData.estimatedAmount,
      notes: formData.notes,
      isActive: formData.isActive,
      requiredDocuments: formData.requiredDocuments
        .split(",")
        .map((doc) => doc.trim())
        .filter(Boolean),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="tf-modal-overlay">
      <div className="tf-modal-backdrop" onClick={onClose}></div>

      <div className="tf-modal-box">
        <div className="tf-modal-header">
          <h2>{editingTax ? "Edit Tax / Fee" : "Add New Tax / Fee"}</h2>
          <button
            type="button"
            className="tf-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form id="tax-form" onSubmit={handleSubmit} className="tf-modal-form">
          <div className="tf-modal-body">
            <div className="tf-field">
              <label>
                Tax / Fee Name <span>*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g., Property Tax"
              />
            </div>

            <div className="tf-field">
              <label>Arabic Title</label>
              <input
                type="text"
                value={formData.arabicTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    arabicTitle: e.target.value,
                  }))
                }
                placeholder="Optional Arabic title"
              />
            </div>

            <div className="tf-field">
              <label>
                Category <span>*</span>
              </label>
              <select
                value={formData.categoryTitle}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {CATEGORIES.filter((item) => item !== "All").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="tf-field">
              <label>
                Estimated Amount <span>*</span>
              </label>
              <input
                type="text"
                required
                value={formData.estimatedAmount}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    estimatedAmount: e.target.value,
                  }))
                }
                placeholder="e.g., 5% or 250,000 LBP"
              />
            </div>

            <div className="tf-field">
              <label>Status</label>
              <div className="tf-status-row">
                <button
                  type="button"
                  className={`tf-toggle ${formData.isActive ? "active" : ""}`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: !prev.isActive,
                    }))
                  }
                >
                  <span className="tf-toggle-dot"></span>
                </button>
                <span className="tf-status-label">
                  {formData.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="tf-field">
              <label>Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Tax or fee description..."
              />
            </div>

            <div className="tf-field">
              <label>Conditions</label>
              <textarea
                rows={3}
                value={formData.conditions}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conditions: e.target.value,
                  }))
                }
                placeholder="Conditions..."
              />
            </div>

            <div className="tf-field">
              <label>Payment Period</label>
              <input
                type="text"
                value={formData.paymentPeriod}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    paymentPeriod: e.target.value,
                  }))
                }
                placeholder="e.g., Annually"
              />
            </div>

            <div className="tf-field">
              <label>Required Documents</label>
              <textarea
                rows={3}
                value={formData.requiredDocuments}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    requiredDocuments: e.target.value,
                  }))
                }
                placeholder="Separate documents with commas"
              />
            </div>

            <div className="tf-field">
              <label>Notes</label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }))
                }
                placeholder="Optional notes..."
              />
            </div>
          </div>

          <div className="tf-modal-footer">
            <button type="button" className="tf-outline-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              form="tax-form"
              className="tf-save-btn"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TaxApplicationsPanel({
  application,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onReview,
  updatingStatus,
}) {
  if (!application) return null;

  return (
    <>
      <div
        className={`tf-side-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`tf-side-panel ${isOpen ? "show" : ""}`}>
        <div className="tf-side-header">
          <h3>Tax / Fee Application Details</h3>
          <button type="button" className="tf-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="tf-side-body">
          <div className="tf-detail-top">
            <span className={getApplicationStatusClass(application.status)}>
              {application.status}
            </span>
            <span className="tf-detail-id">ID: {application.id}</span>
          </div>

          <div className="tf-detail-card">
            <h4>
              <User size={18} />
              Applicant Information
            </h4>

            <p className="tf-detail-label">Name</p>
            <p className="tf-detail-value">{application.applicantName}</p>

            <p className="tf-detail-label">Email</p>
            <p className="tf-detail-value">{application.email}</p>

            <p className="tf-detail-label">Phone</p>
            <p className="tf-detail-value">{application.phone}</p>
          </div>

          <div className="tf-detail-card">
            <h4>
              <Receipt size={18} />
              Tax / Fee Information
            </h4>

            <p className="tf-detail-label">Tax / Fee Name</p>
            <p className="tf-detail-value">{application.taxName}</p>

            <p className="tf-detail-label">Category</p>
            <p className="tf-detail-value">{application.category}</p>

            <p className="tf-detail-label">Submission Date</p>
            <p className="tf-detail-value tf-inline">
              <Calendar size={15} />
              {new Date(application.submissionDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>

            <p className="tf-detail-label">Amount Submitted</p>
            <p className="tf-detail-value">{application.amount}</p>

            <p className="tf-detail-label">Property / Address</p>
            <p className="tf-detail-value">{application.propertyAddress}</p>

            <p className="tf-detail-label">National ID</p>
            <p className="tf-detail-value">{application.nationalId || "N/A"}</p>

            <p className="tf-detail-label">Property Reference</p>
            <p className="tf-detail-value">
              {application.propertyReference || "N/A"}
            </p>

            <p className="tf-detail-label">Notes</p>
            <p className="tf-detail-value">{application.notes || "N/A"}</p>

            <p className="tf-detail-label">Admin Note</p>
            <p className="tf-detail-value">{application.adminNote || "N/A"}</p>
          </div>

          <div className="tf-detail-card">
            <h4>
              <FileText size={18} />
              Submitted Documents
            </h4>
            <p className="tf-detail-value">
              Documents can be shown here later if you add file upload support.
            </p>
          </div>
        </div>

        <div className="tf-side-footer">
          <button
            type="button"
            className="tf-approve-btn"
            onClick={onApprove}
            disabled={updatingStatus}
          >
            <CheckCircle size={16} />
            Approve
          </button>

          <button
            type="button"
            className="tf-reject-btn"
            onClick={onReject}
            disabled={updatingStatus}
          >
            <XCircle size={16} />
            Reject
          </button>

          <button
            type="button"
            className="tf-outline-btn"
            onClick={onReview}
            disabled={updatingStatus}
          >
            <AlertCircle size={16} />
            Under Review
          </button>
        </div>
      </div>
    </>
  );
}

function TaxTable({
  taxes,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  onAdd,
  onEdit,
  onDelete,
  totalRecords,
  onCheckApplications,
  loading,
}) {
  return (
    <div className="tf-table-card">
      <div className="tf-toolbar">
        <div className="tf-toolbar-left">
          <div className="tf-search-wrap">
            <Search size={16} className="tf-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search taxes and fees..."
              className="tf-search-input"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="tf-filter-select"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="tf-filter-select"
          >
            {STATUSES.map((stat) => (
              <option key={stat} value={stat}>
                {stat === "All" ? "All Status" : stat}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="tf-add-btn" onClick={onAdd}>
          <Plus size={16} />
          Add Tax / Fee
        </button>
      </div>

      <div className="tf-table-wrap">
        <table className="tf-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Rate / Amount</th>
              <th>Status</th>
              <th>Created Date</th>
              <th className="tf-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="tf-empty-row">
                  Loading taxes and fees...
                </td>
              </tr>
            ) : taxes.length > 0 ? (
              taxes.map((tax) => (
                <tr key={tax.id}>
                  <td>
                    <div className="tf-name">{tax.name}</div>
                  </td>
                  <td>
                    <span className={getCategoryClass(tax.category)}>
                      {tax.category}
                    </span>
                  </td>
                  <td>
                    <div className="tf-amount">
                      {showAmount(tax.type, tax.amount, tax.amountLabel)}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`tf-status-badge ${
                        tax.status === "Active" ? "active" : "inactive"
                      }`}
                    >
                      {tax.status}
                    </span>
                  </td>
                  <td className="tf-date">
                    {new Date(tax.effectiveDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="tf-right">
                    <div className="tf-action-group">
                      <button
                        type="button"
                        className="tf-action-btn edit"
                        onClick={() => onEdit(tax)}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        className="tf-action-btn delete"
                        onClick={() => onDelete(tax.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="tf-empty-row">
                  No taxes or fees found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="tf-table-footer tf-table-footer-between">
        <p>
          Showing <strong>{taxes.length > 0 ? 1 : 0}</strong> to{" "}
          <strong>{taxes.length}</strong> of <strong>{totalRecords}</strong>{" "}
          records
        </p>

        <button
          type="button"
          className="tf-check-btn"
          onClick={onCheckApplications}
        >
          Check the applications
        </button>
      </div>
    </div>
  );
}

function TaxApplicationsTable({
  applications,
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  onBack,
  onOpenApplication,
  loading,
}) {
  return (
    <div className="tf-table-card">
      <div className="tf-page-head tf-applications-head">
        <div>
          <button type="button" className="tf-back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            Back to Taxes & Fees
          </button>
          <h1 className="tf-page-title">Tax / Fee Applications</h1>
        </div>
      </div>

      <div className="tf-toolbar">
        <div className="tf-toolbar-left">
          <div className="tf-search-wrap">
            <Search size={16} className="tf-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by applicant or tax name..."
              className="tf-search-input"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="tf-filter-select"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tf-table-wrap">
        <table className="tf-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Tax / Fee</th>
              <th>Category</th>
              <th>Submission Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="tf-empty-row">
                  Loading applications...
                </td>
              </tr>
            ) : applications.length > 0 ? (
              applications.map((item) => (
                <tr
                  key={item.id}
                  className="tf-click-row"
                  onClick={() => onOpenApplication(item)}
                >
                  <td>{item.applicantName}</td>
                  <td>{item.taxName}</td>
                  <td>{item.category}</td>
                  <td>
                    {new Date(item.submissionDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>{item.amount}</td>
                  <td>
                    <span className={getApplicationStatusClass(item.status)}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="tf-empty-row">
                  No tax / fee applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TaxesFeesAdmin() {
  const [taxes, setTaxes] = useState([]);
  const [applications, setApplications] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTax, setEditingTax] = useState(null);

  const [viewMode, setViewMode] = useState("taxes");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isApplicationPanelOpen, setIsApplicationPanelOpen] = useState(false);

  const [loadingTaxes, setLoadingTaxes] = useState(true);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [savingTax, setSavingTax] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const [successPopup, setSuccessPopup] = useState({
    open: false,
    message: "",
  });

  const showSuccessMessage = (message) => {
    setSuccessPopup({ open: true, message });

    setTimeout(() => {
      setSuccessPopup({ open: false, message: "" });
    }, 2200);
  };

  const fetchTaxes = async () => {
    try {
      setLoadingTaxes(true);

      const response = await fetch(`${TAX_API}/admin/all`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch taxes");
      }

      setTaxes((result.data || []).map(mapTaxFromApi));
    } catch (error) {
      console.error("fetchTaxes error:", error);
      alert(error.message || "Failed to fetch taxes");
    } finally {
      setLoadingTaxes(false);
    }
  };

  const fetchApplications = async () => {
    try {
      setLoadingApplications(true);

      const response = await fetch(TAX_APPLICATIONS_API);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch applications");
      }

      setApplications((result.data || []).map(mapApplicationFromApi));
    } catch (error) {
      console.error("fetchApplications error:", error);
      alert(error.message || "Failed to fetch applications");
    } finally {
      setLoadingApplications(false);
    }
  };

  useEffect(() => {
    fetchTaxes();
    fetchApplications();
  }, []);

  useEffect(() => {
    if (viewMode !== "applications") return;

    const interval = setInterval(() => {
      fetchApplications();
    }, 30000);

    return () => clearInterval(interval);
  }, [viewMode]);

  const filteredTaxes = useMemo(() => {
    return taxes.filter((tax) => {
      const matchesSearch =
        tax.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tax.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || tax.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || tax.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [taxes, searchQuery, categoryFilter, statusFilter]);

  const filteredApplications = useMemo(() => {
    return applications.filter((item) => {
      const matchesSearch =
        item.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.taxName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [applications, searchQuery, categoryFilter]);

  const stats = useMemo(() => {
    const activeCount = taxes.filter((t) => t.status === "Active").length;
    const inactiveCount = taxes.filter((t) => t.status === "Inactive").length;
    const categoriesCount = new Set(taxes.map((t) => t.category)).size;

    return {
      total: taxes.length,
      active: activeCount,
      inactive: inactiveCount,
      categories: categoriesCount,
    };
  }, [taxes]);

  const openDrawer = (tax = null) => {
    setEditingTax(tax);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingTax(null);
  };

  const saveTax = async (taxData) => {
    try {
      setSavingTax(true);

      const isEditing = Boolean(editingTax);
      const url = isEditing ? `${TAX_API}/${editingTax.id}` : TAX_API;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taxData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save tax");
      }

      await fetchTaxes();
      closeDrawer();

      showSuccessMessage(
        isEditing
          ? "Tax / Fee updated successfully"
          : "Tax / Fee added successfully"
      );
    } catch (error) {
      console.error("saveTax error:", error);
      alert(error.message || "Failed to save tax");
    } finally {
      setSavingTax(false);
    }
  };

  const deleteTax = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${TAX_API}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete tax");
      }

      await fetchTaxes();
      showSuccessMessage("Tax / Fee deleted successfully");
    } catch (error) {
      console.error("deleteTax error:", error);
      alert(error.message || "Failed to delete tax");
    }
  };

  const handleShowApplications = () => {
    setViewMode("applications");
    setSearchQuery("");
    setCategoryFilter("All");
    setStatusFilter("All");
    fetchApplications();
  };

  const handleBackToTaxes = () => {
    setViewMode("taxes");
    setSelectedApplication(null);
    setIsApplicationPanelOpen(false);
    setSearchQuery("");
    setCategoryFilter("All");
    setStatusFilter("All");
  };

  const handleOpenApplication = (application) => {
    setSelectedApplication(application);
    setIsApplicationPanelOpen(true);
  };

  const updateApplicationStatus = async (status) => {
    if (!selectedApplication) return;

    const statusMap = {
      Approved: "approved",
      Rejected: "rejected",
      "Under Review": "review",
    };

    try {
      setUpdatingStatus(true);

      const response = await fetch(
        `${TAX_APPLICATIONS_API}/${selectedApplication.id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: statusMap[status],
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update application status");
      }

      await fetchApplications();

      if (status === "Approved" || status === "Rejected") {
        setTimeout(() => {
          fetchApplications();
        }, 5 * 60 * 1000);
      }

      setSelectedApplication((prev) =>
        prev ? { ...prev, status, adminNote: result.data?.adminNote || prev.adminNote } : prev
      );

      showSuccessMessage(`Application ${status.toLowerCase()} successfully`);
    } catch (error) {
      console.error("updateApplicationStatus error:", error);
      alert(error.message || "Failed to update application status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="ad-page">
      <div className="ad-shell">
        <Sidebar activeItem="Taxes & Fees" />

        <div className="ad-main-area">
          <TopBar
            title="Dashboard"
            breadcrumb="Management / Taxes & Fees"
            userName="Jane Doe"
            userRole="City Administrator"
            userInitials="JD"
            searchPlaceholder="Search activity..."
          />

          <main className="ad-main-content">
            <div className="ad-dashboard-panel">
              {viewMode === "taxes" && (
                <>
                  <div className="tf-page-head">
                    <div>
                      <h1 className="tf-page-title">Taxes & Fees</h1>
                      <p className="tf-page-subtitle">
                        Manage municipal tax records, fee structures, and status
                        updates from one place.
                      </p>
                    </div>
                  </div>

                  <StatCards stats={stats} />

                  <TaxTable
                    taxes={filteredTaxes}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    categoryFilter={categoryFilter}
                    setCategoryFilter={setCategoryFilter}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    onAdd={() => openDrawer()}
                    onEdit={openDrawer}
                    onDelete={deleteTax}
                    totalRecords={taxes.length}
                    onCheckApplications={handleShowApplications}
                    loading={loadingTaxes}
                  />
                </>
              )}

              {viewMode === "applications" && (
                <TaxApplicationsTable
                  applications={filteredApplications}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  onBack={handleBackToTaxes}
                  onOpenApplication={handleOpenApplication}
                  loading={loadingApplications}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      <TaxDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        onSave={saveTax}
        editingTax={editingTax}
        saving={savingTax}
      />

      <TaxApplicationsPanel
        application={selectedApplication}
        isOpen={isApplicationPanelOpen}
        onClose={() => {
          setIsApplicationPanelOpen(false);
          setTimeout(() => setSelectedApplication(null), 250);
        }}
        onApprove={() => updateApplicationStatus("Approved")}
        onReject={() => updateApplicationStatus("Rejected")}
        onReview={() => updateApplicationStatus("Under Review")}
        updatingStatus={updatingStatus}
      />

      <SuccessPopup
        message={successPopup.message}
        open={successPopup.open}
      />
    </div>
  );
}
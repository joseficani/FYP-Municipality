import React, { useState } from "react";
import "./TransactionsModule.css";
import {
  Search,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  X,
  FileText,
  MapPin,
  Paperclip,
  ChevronRight,
} from "lucide-react";

const MOCK_TRANSACTIONS = [
  {
    id: "TRX-2024-001",
    title: "Building Permit Application",
    type: "Construction",
    date: "Oct 24, 2024",
    status: "In Review",
    amount: "1,500,000 LBP",
    department: "Urban Planning",
    description:
      "Application for residential building extension in Achrafieh sector. All initial documents submitted including architectural plans and ownership proof.",
    location: "Achrafieh, Beirut",
    lastUpdate: "2 hours ago",
  },
  {
    id: "TRX-2024-002",
    title: "Residency Certificate",
    type: "Civil Status",
    date: "Oct 22, 2024",
    status: "Approved",
    amount: "50,000 LBP",
    department: "Civil Registry",
    description:
      "Request for official residency certificate for school registration purposes.",
    location: "Hamra, Beirut",
    lastUpdate: "1 day ago",
  },
  {
    id: "TRX-2024-003",
    title: "Business License Renewal",
    type: "Commercial",
    date: "Oct 20, 2024",
    status: "Pending",
    amount: "750,000 LBP",
    department: "Licensing Dept",
    description:
      "Annual renewal for retail shop license. Waiting for tax clearance verification.",
    location: "Verdun, Beirut",
    lastUpdate: "3 days ago",
  },
  {
    id: "TRX-2024-004",
    title: "Public Domain Occupancy",
    type: "Permit",
    date: "Oct 18, 2024",
    status: "Rejected",
    amount: "0 LBP",
    department: "Public Works",
    description:
      "Request to place temporary scaffolding on sidewalk. Rejected due to incomplete safety measures plan.",
    location: "Gemmayze, Beirut",
    lastUpdate: "5 days ago",
  },
  {
    id: "TRX-2024-005",
    title: "Sewage Connection Request",
    type: "Infrastructure",
    date: "Oct 15, 2024",
    status: "Approved",
    amount: "300,000 LBP",
    department: "Sanitation",
    description: "New connection request for residential building block B.",
    location: "Badaro, Beirut",
    lastUpdate: "1 week ago",
  },
];

export default function TransactionsModule() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedTransaction(null), 200);
  };

  const handleExport = () => {
    const headers = [
      "Transaction ID",
      "Title",
      "Type",
      "Date",
      "Department",
      "Amount",
      "Status",
      "Location",
    ];

    const rows = filteredTransactions.map((t) => [
      t.id,
      t.title,
      t.type,
      t.date,
      t.department,
      t.amount,
      t.status,
      t.location,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `municipal-transactions-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredTransactions = MOCK_TRANSACTIONS.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All Statuses" || t.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <main className="trx-main">
        <div className="trx-page-top">
          <h1>My Transactions</h1>
          <p>
            Track and manage all your municipal requests, permits, and payments
            in one place.
          </p>
        </div>

        <div className="trx-filter-bar">
          <div className="trx-search-wrap">
            <Search size={18} className="trx-search-icon" />
            <input
              type="text"
              placeholder="Search transactions by ID or type..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="trx-filter-actions">
            <select
              onChange={(e) => setStatusFilter(e.target.value)}
              defaultValue="All Statuses"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>In Review</option>
              <option>Rejected</option>
            </select>

            <button type="button" className="white-btn">
              <Calendar size={16} />
              Date Range
            </button>

            <button type="button" className="green-btn-inline" onClick={handleExport}>
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="trx-table-wrap">
          <table className="trx-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Service Type</th>
                <th>Date</th>
                <th>Department</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  onClick={() => handleSelectTransaction(transaction)}
                >
                  <td className="trx-id">{transaction.id}</td>
                  <td>
                    <div className="trx-service-cell">
                      <div className="trx-service-icon">
                        <FileText size={16} />
                      </div>

                      <div>
                        <div className="trx-service-title">{transaction.title}</div>
                        <div className="trx-service-sub">{transaction.type}</div>
                      </div>
                    </div>
                  </td>
                  <td>{transaction.date}</td>
                  <td>{transaction.department}</td>
                  <td className="trx-amount">{transaction.amount}</td>
                  <td>
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td>
                    <ChevronRight size={18} className="trx-arrow" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="trx-pagination">
            <p>
              Showing <strong>1</strong> to <strong>{filteredTransactions.length}</strong> of{" "}
              <strong>42</strong> results
            </p>

            <div className="trx-pagination-buttons">
              <button type="button">Previous</button>
              <button type="button" className="active">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button">Next</button>
            </div>
          </div>
        </div>
      </main>

      {isPanelOpen && selectedTransaction && (
        <TransactionDetailPanel
          transaction={selectedTransaction}
          onClose={handleClosePanel}
        />
      )}
    </>
  );
}

function StatusBadge({ status }) {
  const getStatusStyles = (status) => {
    switch (status) {
      case "Approved":
        return "status-approved";
      case "Pending":
        return "status-pending";
      case "In Review":
        return "status-review";
      case "Rejected":
        return "status-rejected";
      default:
        return "";
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle size={14} />;
      case "Pending":
        return <Clock size={14} />;
      case "In Review":
        return <AlertCircle size={14} />;
      case "Rejected":
        return <XCircle size={14} />;
      default:
        return null;
    }
  };

  return (
    <span className={`trx-status-badge ${getStatusStyles(status)}`}>
      {getIcon(status)}
      {status}
    </span>
  );
}

function TransactionDetailPanel({ transaction, onClose }) {
  return (
    <div className="trx-panel-overlay">
      <div className="trx-panel-backdrop" onClick={onClose}></div>

      <div className="trx-panel">
        <div className="trx-panel-header">
          <div>
            <h2>Transaction Details</h2>
            <p>
              ID: <span>{transaction.id}</span>
            </p>
          </div>

          <button type="button" onClick={onClose} className="trx-close-btn">
            <X size={22} />
          </button>
        </div>

        <div className="trx-panel-body">
          <div className="trx-status-row">
            <div>
              <h4>Current Status</h4>
              <StatusBadge status={transaction.status} />
            </div>

            <div className="right">
              <h4>Last Updated</h4>
              <p>{transaction.lastUpdate}</p>
            </div>
          </div>

          <div className="trx-info-box">
            <h3>Request Information</h3>

            <div className="trx-info-item">
              <label>Service Type</label>
              <p>{transaction.title}</p>
            </div>

            <div className="trx-info-item">
              <label>Department</label>
              <p>{transaction.department}</p>
            </div>

            <div className="trx-info-item">
              <label>Submission Date</label>
              <p>{transaction.date}</p>
            </div>

            <div className="trx-info-item">
              <label>Location</label>
              <p>
                <MapPin size={15} />
                {transaction.location}
              </p>
            </div>
          </div>

          <div className="trx-description-box">
            <h3>Description</h3>
            <p>{transaction.description}</p>
          </div>

          <div className="trx-fee-box">
            <span>Total Amount</span>
            <strong>{transaction.amount}</strong>
          </div>

          <div className="trx-attachments-box">
            <h3>Attachments</h3>

            <div className="attachment-item">
              <div className="attachment-left">
                <Paperclip size={18} />
                <span>application_form.pdf</span>
              </div>
              <a href="/">Download</a>
            </div>

            <div className="attachment-item">
              <div className="attachment-left">
                <Paperclip size={18} />
                <span>id_document_scan.jpg</span>
              </div>
              <a href="/">Download</a>
            </div>
          </div>

          <div className="trx-panel-actions">
            <button type="button" className="green-btn-inline">
              Send Message
            </button>
            <button type="button" className="white-btn">
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
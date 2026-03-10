import React, { useState } from "react";
import "./Notifications.css";
import {
  Filter,
  CheckCheck,
  Search,
  FileText,
  Info,
  Calendar,
  AlertCircle,
  ChevronRight,
  X,
  CheckCircle2,
  Loader2,
  MapPin,
} from "lucide-react";

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    title: "Pothole Repair Scheduled",
    message:
      "Your request #REQ-2024-892 regarding the pothole on Maple Ave has been scheduled for repair on Oct 15th.",
    type: "request",
    date: "2 hours ago",
    isRead: false,
    details: {
      referenceId: "REQ-2024-892",
      location: "124 Maple Ave, North District",
      fullDescription:
        "The maintenance crew has reviewed your report and scheduled the repair. Please ensure no vehicles are parked in the immediate vicinity between 8 AM and 4 PM on the scheduled date.",
      actionRequired: false,
    },
  },
  {
    id: "2",
    title: "Annual Town Hall Meeting",
    message:
      "Join us for the annual town hall meeting at the Community Center. Topics include new park renovations and budget planning.",
    type: "event",
    date: "Yesterday",
    isRead: false,
    details: {
      location: "Community Center, Main Hall",
      fullDescription:
        "Mayor Thompson invites all residents to the Annual Town Hall. This is your opportunity to voice concerns and learn about upcoming municipal projects. Refreshments will be provided.",
      actionRequired: true,
    },
  },
  {
    id: "3",
    title: "Property Tax Due Reminder",
    message:
      "This is a reminder that the second installment of property taxes is due by November 1st to avoid late fees.",
    type: "reminder",
    date: "2 days ago",
    isRead: true,
    details: {
      referenceId: "TAX-2024-Q4",
      fullDescription:
        "Please submit your payment online via the portal or in person at City Hall. Late payments will incur a 1.5% interest charge per month.",
      actionRequired: true,
    },
  },
  {
    id: "4",
    title: "New Recycling Schedule",
    message:
      "Starting next month, recycling pickup will move to Wednesdays for your district. Please update your calendars.",
    type: "announcement",
    date: "3 days ago",
    isRead: true,
    details: {
      fullDescription:
        "Due to route optimization, the sanitation department is adjusting pickup schedules. Trash pickup remains on Mondays, but recycling is moving to Wednesdays.",
      actionRequired: false,
    },
  },
  {
    id: "5",
    title: "Building Permit Approved",
    message:
      "Your application for a deck construction permit has been approved. You may now proceed with construction.",
    type: "request",
    date: "1 week ago",
    isRead: true,
    details: {
      referenceId: "PER-2024-112",
      location: "45 Oak Lane",
      fullDescription:
        "The building inspector has signed off on your plans. Please display the permit card in a window visible from the street during construction.",
      actionRequired: false,
    },
  },
];

export default function NotificationsModule() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [selectedType, setSelectedType] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMarkRead = (e, id) => {
    if (e) e.stopPropagation();

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              isRead: true,
            }
          : n
      )
    );

    if (selectedNotification && selectedNotification.id === id) {
      setSelectedNotification((prev) =>
        prev
          ? {
              ...prev,
              isRead: true,
            }
          : prev
      );
    }
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      }))
    );

    if (selectedNotification) {
      setSelectedNotification((prev) =>
        prev
          ? {
              ...prev,
              isRead: true,
            }
          : prev
      );
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setIsDetailOpen(true);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    const matchesType = selectedType === "all" ? true : n.type === selectedType;
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <>
      <main className="notifications-main">
        <div className="notifications-page-top">
          <div>
            <h1 className="notifications-page-title">Notifications</h1>
            <p className="notifications-page-subtitle">
              You have <span className="notif-green-text">{unreadCount} unread</span> notifications
            </p>
          </div>

          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck size={16} />
              Mark all as read
            </Button>
          </div>
        </div>

        <div className="notifications-filters">
          <div className="notifications-search-wrap">
            <Search className="notifications-search-icon" size={16} />
            <input
              type="text"
              placeholder="Search notifications..."
              className="notifications-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="notifications-filter-tabs">
            {["all", "request", "announcement", "event", "reminder"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`notifications-filter-btn ${selectedType === type ? "active" : ""}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}s
              </button>
            ))}
          </div>
        </div>

        <div className="notifications-list">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
                onMarkRead={handleMarkRead}
              />
            ))
          ) : (
            <div className="notifications-empty">
              <Filter className="notifications-empty-icon" size={42} />
              <h3>No notifications found</h3>
              <p>Try adjusting your filters or search query.</p>
              <Button variant="ghost" onClick={() => setSelectedType("all")}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <NotificationDetail
        notification={selectedNotification}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onMarkRead={handleMarkRead}
      />
    </>
  );
}

function Badge({ children, variant = "default", className = "" }) {
  return <span className={`badge badge-${variant} ${className}`}>{children}</span>;
}

function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="btn-spinner" size={16} />}
      {children}
    </button>
  );
}

function Card({ children, className = "", onClick }) {
  return (
    <div
      className={`notif-card ${onClick ? "notif-card-clickable" : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function NotificationCard({ notification, onClick, onMarkRead }) {
  const getTypeIcon = (type) => {
    switch (type) {
      case "request":
        return <FileText className="notif-type-icon request" size={20} />;
      case "announcement":
        return <Info className="notif-type-icon announcement" size={20} />;
      case "event":
        return <Calendar className="notif-type-icon event" size={20} />;
      case "reminder":
        return <AlertCircle className="notif-type-icon reminder" size={20} />;
      default:
        return <Info className="notif-type-icon" size={20} />;
    }
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case "request":
        return "info";
      case "announcement":
        return "success";
      case "event":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Card
      className={`notification-card ${!notification.isRead ? "notification-unread" : "notification-read"}`}
      onClick={() => onClick(notification)}
    >
      <div className="notification-card-content">
        <div className="notification-card-icon">{getTypeIcon(notification.type)}</div>

        <div className="notification-card-main">
          <div className="notification-card-top">
            <h3 className="notification-card-title">{notification.title}</h3>
            <span className="notification-card-date">{notification.date}</span>
          </div>

          <p className="notification-card-message">{notification.message}</p>

          <div className="notification-card-bottom">
            <Badge variant={getBadgeVariant(notification.type)}>
              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
            </Badge>

            <div className="notification-card-actions">
              {!notification.isRead && (
                <button
                  type="button"
                  className="mark-read-btn"
                  onClick={(e) => onMarkRead(e, notification.id)}
                >
                  Mark as read
                </button>
              )}

              <span className="view-details-text">
                View details <ChevronRight size={14} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function NotificationDetail({ notification, isOpen, onClose, onMarkRead }) {
  if (!isOpen || !notification) return null;

  const getTypeIcon = (type) => {
    switch (type) {
      case "request":
        return <FileText className="notif-detail-type-icon request" size={20} />;
      case "announcement":
        return <Info className="notif-detail-type-icon announcement" size={20} />;
      case "event":
        return <Calendar className="notif-detail-type-icon event" size={20} />;
      case "reminder":
        return <AlertCircle className="notif-detail-type-icon reminder" size={20} />;
      default:
        return <Info className="notif-detail-type-icon" size={20} />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "request":
        return "Service Request";
      case "announcement":
        return "Announcement";
      case "event":
        return "Community Event";
      case "reminder":
        return "Reminder";
      default:
        return "Notification";
    }
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case "request":
        return "info";
      case "announcement":
        return "success";
      case "event":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="notif-detail-overlay" role="dialog" aria-modal="true">
      <div className="notif-detail-backdrop" onClick={onClose}></div>

      <div className="notif-detail-panel">
        <div className="notif-detail-header">
          <h2>Notification Details</h2>
          <button className="notif-detail-close" onClick={onClose} type="button">
            <X size={20} />
          </button>
        </div>

        <div className="notif-detail-body">
          <div className="notif-detail-top">
            <div className="notif-detail-icon-wrap">
              {getTypeIcon(notification.type)}
            </div>

            <div>
              <Badge variant={getBadgeVariant(notification.type)}>
                {getTypeLabel(notification.type)}
              </Badge>
              <p className="notif-detail-date">{notification.date}</p>
            </div>
          </div>

          <h3 className="notif-detail-title">{notification.title}</h3>

          <p className="notif-detail-description">
            {notification.details?.fullDescription || notification.message}
          </p>

          <div className="notif-detail-meta">
            {notification.details?.referenceId && (
              <div className="notif-detail-meta-item">
                <FileText size={18} />
                <div>
                  <p className="notif-detail-meta-label">Reference ID</p>
                  <p className="notif-detail-meta-value">{notification.details.referenceId}</p>
                </div>
              </div>
            )}

            {notification.details?.location && (
              <div className="notif-detail-meta-item">
                <MapPin size={18} />
                <div>
                  <p className="notif-detail-meta-label">Location</p>
                  <p className="notif-detail-meta-value">{notification.details.location}</p>
                </div>
              </div>
            )}

            <div className="notif-detail-meta-item">
              <Calendar size={18} />
              <div>
                <p className="notif-detail-meta-label">Date Received</p>
                <p className="notif-detail-meta-value">{notification.date}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="notif-detail-footer">
          {notification.details?.actionRequired && (
            <Button className="notif-detail-action-btn">Take Action</Button>
          )}

          {!notification.isRead && (
            <Button
              variant="secondary"
              className="notif-detail-action-btn"
              onClick={() => {
                onMarkRead(null, notification.id);
                onClose();
              }}
            >
              <CheckCircle2 size={16} />
              Mark as Read
            </Button>
          )}

          <Button
            variant="ghost"
            className="notif-detail-action-btn"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
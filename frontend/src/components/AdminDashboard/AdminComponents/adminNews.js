import React, { useEffect, useRef, useState } from "react";
import "./adminNews.css";
import Sidebar from "../SideBar";
import TopBar from "../TopBar";
import {
  Plus,
  FileText,
  Edit2,
  Trash2,
  Calendar,
  X,
  Upload,
  AlertTriangle,
} from "lucide-react";

const INITIAL_DATA = [
  {
    id: "1",
    title: "New Community Center Opening Ceremony",
    category: "Event",
    date: "2026-02-08",
    description:
      "Join us for the grand opening of our new state-of-the-art community center. Refreshments will be provided.",
    imageUrl:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "2",
    title: "Water Main Repair on Oak Street",
    category: "Emergency",
    date: "2026-02-10",
    description:
      "Emergency water main repairs will be conducted on Oak Street. Expect traffic delays between 9 AM and 4 PM.",
  },
  {
    id: "3",
    title: "Town Council Meeting Minutes — January",
    category: "Announcement",
    date: "2026-02-05",
    description:
      "The official minutes from the January Town Council meeting are now available for public review.",
  },
  {
    id: "4",
    title: "Spring Festival Volunteer Registration",
    category: "Event",
    date: "2026-02-03",
    description:
      "We are looking for volunteers for the upcoming Spring Festival. Sign up today to help your community!",
    imageUrl:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=300&h=200",
  },
  {
    id: "5",
    title: "Updated Recycling Guidelines",
    category: "General",
    date: "2026-01-28",
    description:
      "Please review the updated recycling guidelines effective immediately. Glass is now accepted in blue bins.",
  },
  {
    id: "6",
    title: "Emergency Snow Removal Schedule",
    category: "Emergency",
    date: "2026-02-09",
    description:
      "Due to the forecasted blizzard, snow removal crews will be operating 24/7 starting tonight.",
  },
  {
    id: "7",
    title: "Library Summer Reading Program",
    category: "Announcement",
    date: "2026-01-25",
    description:
      "Registration for the Summer Reading Program opens next week for children ages 5-12.",
  },
  {
    id: "8",
    title: "Park Renovation Project Update",
    category: "General",
    date: "2026-02-01",
    description:
      "Phase 1 of the Central Park renovation is complete. The playground is now open to the public.",
    imageUrl:
      "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?auto=format&fit=crop&q=80&w=300&h=200",
  },
];

function CategoryBadge({ category }) {
  const getClass = () => {
    switch (category) {
      case "Announcement":
        return "nm-badge-announcement";
      case "Event":
        return "nm-badge-event";
      case "Emergency":
        return "nm-badge-emergency";
      case "General":
      default:
        return "nm-badge-general";
    }
  };

  return <span className={`nm-badge ${getClass()}`}>{category}</span>;
}

function DeleteConfirmDialog({ isOpen, onClose, onConfirm, title }) {
  if (!isOpen) return null;

  return (
    <div className="nm-dialog-overlay">
      <div className="nm-dialog-backdrop" onClick={onClose}></div>

      <div className="nm-dialog-box">
        <div className="nm-dialog-header">
          <div className="nm-dialog-title-wrap">
            <div className="nm-dialog-icon">
              <AlertTriangle size={22} />
            </div>
            <h3>Delete News Post</h3>
          </div>

          <button type="button" onClick={onClose} className="nm-close-btn">
            <X size={18} />
          </button>
        </div>

        <div className="nm-dialog-body">
          <p>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
          <div className="nm-dialog-post-title">"{title}"</div>

          <div className="nm-dialog-actions">
            <button type="button" onClick={onClose} className="nm-outline-btn">
              Cancel
            </button>
            <button type="button" onClick={onConfirm} className="nm-danger-btn">
              Delete Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsFormPanel({ isOpen, onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitle(initialData.title);
        setCategory(initialData.category);
        setDate(initialData.date);
        setDescription(initialData.description);
        setImagePreview(initialData.imageUrl || null);
      } else {
        setTitle("");
        setCategory("General");
        setDate(new Date().toISOString().split("T")[0]);
        setDescription("");
        setImagePreview(null);
      }
    }
  }, [isOpen, initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    onSubmit({
      title,
      category,
      date,
      description,
      imageUrl: imagePreview || "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="nm-modal-overlay">
      <div className="nm-modal-backdrop" onClick={onClose}></div>

      <div className="nm-modal-box">
        <div className="nm-modal-header">
          <h2>{initialData ? "Edit News Post" : "Create News Post"}</h2>
          <button type="button" onClick={onClose} className="nm-close-btn">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="nm-modal-form">
          <div className="nm-modal-scroll">
            <div className="nm-form-group">
              <label>
                Post Title <span>*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Community Center Opening"
              />
            </div>

            <div className="nm-form-grid">
              <div className="nm-form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Announcement">Announcement</option>
                  <option value="Event">Event</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>

              <div className="nm-form-group">
                <label>Publish Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="nm-form-group">
              <label>Featured Image</label>
              <div
                className={`nm-upload-box ${imagePreview ? "has-image" : ""}`}
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="nm-hidden-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {imagePreview ? (
                  <div className="nm-preview-wrap">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="nm-preview-img"
                    />
                    <p>Click to change image</p>
                  </div>
                ) : (
                  <div className="nm-upload-placeholder">
                    <Upload size={28} />
                    <p>Click to upload or drag and drop</p>
                    <span>PNG, JPG up to 5MB</span>
                  </div>
                )}
              </div>
            </div>

            <div className="nm-form-group">
              <label>Content Description</label>
              <textarea
                rows="6"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the news content here..."
              ></textarea>
            </div>
          </div>

          <div className="nm-modal-footer">
            <button type="button" onClick={onClose} className="nm-outline-btn">
              Cancel
            </button>
            <button type="submit" className="nm-primary-btn">
              {initialData ? "Save Changes" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function NewsTable({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="nm-empty-box">
        <div className="nm-empty-icon">
          <FileText size={30} />
        </div>
        <h3>No news posts yet</h3>
        <p>Get started by creating a new post.</p>
      </div>
    );
  }

  return (
    <div className="nm-table-section">
      <div className="nm-table-desktop">
        <table className="nm-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date Published</th>
              <th className="nm-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="nm-title-cell">
                    {item.imageUrl ? (
                      <div className="nm-thumb-wrap">
                        <img src={item.imageUrl} alt="" className="nm-thumb" />
                      </div>
                    ) : null}
                    <div className="nm-title-text">{item.title}</div>
                  </div>
                </td>

                <td>
                  <CategoryBadge category={item.category} />
                </td>

                <td>
                  <div className="nm-date-cell">
                    <Calendar size={14} />
                    <span>
                      {new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </td>

                <td className="nm-right">
                  <div className="nm-actions">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="nm-action-btn edit"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="nm-action-btn delete"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="nm-mobile-cards">
        {items.map((item) => (
          <div key={item.id} className="nm-mobile-card">
            <div className="nm-mobile-top">
              <div className="nm-mobile-title-wrap">
                <h3>{item.title}</h3>
                <div className="nm-mobile-date">
                  <Calendar size={13} />
                  <span>
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <CategoryBadge category={item.category} />
            </div>

            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="nm-mobile-img"
              />
            ) : null}

            <div className="nm-mobile-actions">
              <button
                type="button"
                onClick={() => onEdit(item)}
                className="nm-mobile-btn edit"
              >
                <Edit2 size={14} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => onDelete(item)}
                className="nm-mobile-btn delete"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NewsManagement() {
  const [newsItems, setNewsItems] = useState(INITIAL_DATA);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleCreate = () => {
    setEditingItem(null);
    setIsPanelOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsPanelOpen(true);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingItem) {
      setNewsItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...formData,
                id: item.id,
              }
            : item
        )
      );
    } else {
      const newItem = {
        ...formData,
        id: Math.random().toString(36).slice(2, 9),
      };
      setNewsItems((prev) => [newItem, ...prev]);
    }

    setIsPanelOpen(false);
    setEditingItem(null);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setNewsItems((prev) =>
        prev.filter((item) => item.id !== itemToDelete.id)
      );
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="ad-page">
      <div className="ad-shell">
        <Sidebar activeItem="News" />

        <div className="ad-main-area">
          <TopBar
            title="Dashboard"
            breadcrumb="Management / News"
            userName="Jane Doe"
            userRole="City Administrator"
            userInitials="JD"
            searchPlaceholder="Search activity..."
          />

          <main className="ad-main-content">
            <div className="ad-dashboard-panel">
              <div className="nm-wrapper">
                <div className="nm-header-row">
                  <div>
                    <h2 className="nm-page-title">News Posts</h2>
                    <p className="nm-page-subtitle">
                      Manage and publish news updates for the municipality
                      website.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCreate}
                    className="nm-create-btn"
                  >
                    <Plus size={18} />
                    Create News
                  </button>
                </div>

                <NewsTable
                  items={newsItems}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />

                <NewsFormPanel
                  isOpen={isPanelOpen}
                  onClose={() => {
                    setIsPanelOpen(false);
                    setEditingItem(null);
                  }}
                  onSubmit={handleFormSubmit}
                  initialData={editingItem}
                />

                <DeleteConfirmDialog
                  isOpen={isDeleteDialogOpen}
                  onClose={() => {
                    setIsDeleteDialogOpen(false);
                    setItemToDelete(null);
                  }}
                  onConfirm={handleConfirmDelete}
                  title={itemToDelete ? itemToDelete.title : ""}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
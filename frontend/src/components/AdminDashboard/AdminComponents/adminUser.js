import React, { useMemo, useState, useEffect } from "react";
import "./adminUser.css";
import Sidebar from "../SideBar";
import TopBar from "../TopBar";
import {
  Users,
  UserPlus,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Search,
  X,
  Eye,
  EyeOff,
  Pencil,
  Shield,
  ToggleLeft,
  ToggleRight,
  Trash2,
} from "lucide-react";

const INITIAL_USERS = [
  {
    id: "1",
    name: "Eleanor Shellstrop",
    email: "eleanor@example.com",
    role: "Citizen",
    municipality: "Springfield",
    status: "Active",
    dateJoined: "2023-01-15",
  },
  {
    id: "2",
    name: "Chidi Anagonye",
    email: "chidi@example.com",
    role: "Admin",
    municipality: "Springfield",
    status: "Active",
    dateJoined: "2022-11-01",
  },
  {
    id: "3",
    name: "Tahani Al-Jamil",
    email: "tahani@example.com",
    role: "Employee",
    municipality: "Shelbyville",
    status: "Active",
    dateJoined: "2023-03-10",
  },
  {
    id: "4",
    name: "Jason Mendoza",
    email: "jason@example.com",
    role: "Citizen",
    municipality: "Jacksonville",
    status: "Suspended",
    dateJoined: "2023-06-22",
  },
  {
    id: "5",
    name: "Michael Realman",
    email: "michael@example.com",
    role: "Admin",
    municipality: "Capital City",
    status: "Active",
    dateJoined: "2021-05-14",
  },
  {
    id: "6",
    name: "Janet Planet",
    email: "janet@example.com",
    role: "Employee",
    municipality: "Springfield",
    status: "Active",
    dateJoined: "2022-08-30",
  },
  {
    id: "7",
    name: "Mindy St. Claire",
    email: "mindy@example.com",
    role: "Citizen",
    municipality: "Cincinnati",
    status: "Suspended",
    dateJoined: "2023-09-05",
  },
  {
    id: "8",
    name: "Derek Hostetler",
    email: "derek@example.com",
    role: "Citizen",
    municipality: "Shelbyville",
    status: "Active",
    dateJoined: "2023-10-12",
  },
  {
    id: "9",
    name: "Shawn Badplace",
    email: "shawn@example.com",
    role: "Employee",
    municipality: "Capital City",
    status: "Active",
    dateJoined: "2023-02-18",
  },
];

const USERS_PER_PAGE = 8;

export default function UsersManagement() {
  const [users, setUsers] = useState(INITIAL_USERS);

  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showPassword, setShowPassword] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Citizen",
    municipality: "",
    password: "",
    confirmPassword: "",
  });

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / USERS_PER_PAGE)
  );

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    return filteredUsers.slice(start, start + USERS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const activeUsersCount = users.filter((u) => u.status === "Active").length;
  const suspendedUsersCount = users.filter(
    (u) => u.status === "Suspended"
  ).length;

  const openAddPanel = () => {
    setIsEditMode(false);
    setEditingUserId(null);
    setFormData({
      name: "",
      email: "",
      role: "Citizen",
      municipality: "",
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
    setIsAddPanelOpen(true);
  };

  const openEditPanel = (user) => {
    setIsEditMode(true);
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      municipality: user.municipality,
      password: "",
      confirmPassword: "",
    });
    setShowPassword(false);
    setIsAddPanelOpen(true);
  };

  const closePanel = () => {
    setIsAddPanelOpen(false);
    setIsEditMode(false);
    setEditingUserId(null);
    setShowPassword(false);
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateOrUpdateUser = () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.municipality.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (!isEditMode) {
      if (!formData.password || !formData.confirmPassword) {
        alert("Please enter password and confirm password.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        municipality: formData.municipality,
        status: "Active",
        dateJoined: new Date().toISOString().split("T")[0],
      };

      setUsers((prev) => [newUser, ...prev]);
      closePanel();
      return;
    }

    if (
      (formData.password || formData.confirmPassword) &&
      formData.password !== formData.confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    setUsers((prev) =>
      prev.map((user) =>
        user.id === editingUserId
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              municipality: formData.municipality,
            }
          : user
      )
    );

    closePanel();
  };

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Suspended" : "Active",
            }
          : user
      )
    );
  };

  const handleChangeRole = (id) => {
    const roleOrder = ["Citizen", "Employee", "Admin"];
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== id) return user;
        const currentIndex = roleOrder.indexOf(user.role);
        const nextRole = roleOrder[(currentIndex + 1) % roleOrder.length];
        return { ...user, role: nextRole };
      })
    );
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    setUsers((prev) => prev.filter((item) => item.id !== userToDelete.id));
    setIsDeleteOpen(false);
    setUserToDelete(null);
  };

  const closeDeleteDialog = () => {
    setIsDeleteOpen(false);
    setUserToDelete(null);
  };

  const getVisiblePages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="ad-page">
      <div className="ad-shell">
        <Sidebar activeItem="Users" />

        <div className="ad-main-area">
          <TopBar
            title="Dashboard"
            breadcrumb="Management / Users"
            userName="Jane Doe"
            userRole="City Administrator"
            userInitials="JD"
            searchPlaceholder="Search activity..."
          />

          <main className="ad-main-content">
            <div className="ad-dashboard-panel">
              <div className="um-page-wrap">
                <div className="um-header">
                  <div>
                    <h1 className="um-page-title">Users Management</h1>
                    <p className="um-page-subtitle">
                      Manage citizens, employees, and system administrators.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="um-add-btn"
                    onClick={openAddPanel}
                  >
                    <UserPlus size={18} />
                    Add User
                  </button>
                </div>

                <div className="um-stats-grid">
                  <div className="um-stat-card">
                    <div className="um-stat-icon blue">
                      <Users size={22} />
                    </div>
                    <div>
                      <p className="um-stat-label">Total Users</p>
                      <h3 className="um-stat-value">{users.length}</h3>
                    </div>
                  </div>

                  <div className="um-stat-card">
                    <div className="um-stat-icon green">
                      <CheckCircle size={22} />
                    </div>
                    <div>
                      <p className="um-stat-label">Active Users</p>
                      <h3 className="um-stat-value">{activeUsersCount}</h3>
                    </div>
                  </div>

                  <div className="um-stat-card">
                    <div className="um-stat-icon red">
                      <AlertCircle size={22} />
                    </div>
                    <div>
                      <p className="um-stat-label">Suspended</p>
                      <h3 className="um-stat-value">{suspendedUsersCount}</h3>
                    </div>
                  </div>

                  <div className="um-stat-card">
                    <div className="um-stat-icon purple">
                      <TrendingUp size={22} />
                    </div>
                    <div>
                      <p className="um-stat-label">New This Month</p>
                      <h3 className="um-stat-value">
                        {
                          users.filter((user) => {
                            const joined = new Date(user.dateJoined);
                            const now = new Date();
                            return (
                              joined.getMonth() === now.getMonth() &&
                              joined.getFullYear() === now.getFullYear()
                            );
                          }).length
                        }
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="um-filters-card">
                  <div className="um-search-wrap">
                    <Search className="um-search-icon" size={18} />
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="um-search-input"
                    />
                  </div>

                  <div className="um-filter-actions">
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="um-select"
                    >
                      <option value="All">All Roles</option>
                      <option value="Admin">Admin</option>
                      <option value="Employee">Employee</option>
                      <option value="Citizen">Citizen</option>
                    </select>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="um-select"
                    >
                      <option value="All">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div className="um-table-card">
                  <div className="um-table-scroll">
                    <table className="um-table">
                      <thead>
                        <tr>
                          <th>User</th>
                          <th>Role</th>
                          <th>Municipality</th>
                          <th>Status</th>
                          <th>Date Joined</th>
                          <th className="right">Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {paginatedUsers.length > 0 ? (
                          paginatedUsers.map((user) => (
                            <tr key={user.id}>
                              <td>
                                <div className="um-user-cell">
                                  <div className="um-user-avatar">
                                    {user.name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="um-user-name">
                                      {user.name}
                                    </div>
                                    <div className="um-user-email">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td>
                                <RoleBadge role={user.role} />
                              </td>

                              <td className="um-muted">
                                {user.municipality}
                              </td>

                              <td>
                                <StatusBadge status={user.status} />
                              </td>

                              <td className="um-muted">
                                {new Date(user.dateJoined).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </td>

                              <td className="right">
                                <div className="um-actions">
                                  <button
                                    type="button"
                                    className="um-icon-btn"
                                    title="Edit User"
                                    onClick={() => openEditPanel(user)}
                                  >
                                    <Pencil size={16} />
                                  </button>

                                  <button
                                    type="button"
                                    className="um-icon-btn"
                                    title="Change Role"
                                    onClick={() => handleChangeRole(user.id)}
                                  >
                                    <Shield size={16} />
                                  </button>

                                  <button
                                    type="button"
                                    className="um-icon-btn"
                                    title={
                                      user.status === "Active"
                                        ? "Deactivate"
                                        : "Activate"
                                    }
                                    onClick={() => handleToggleStatus(user.id)}
                                  >
                                    {user.status === "Active" ? (
                                      <ToggleRight
                                        size={16}
                                        className="um-green-icon"
                                      />
                                    ) : (
                                      <ToggleLeft size={16} />
                                    )}
                                  </button>

                                  <button
                                    type="button"
                                    className="um-icon-btn danger"
                                    title="Delete User"
                                    onClick={() => handleDeleteClick(user)}
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="um-empty-cell">
                              No users found matching your filters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="um-pagination">
                    <div className="um-pagination-text">
                      Showing{" "}
                      <strong>
                        {filteredUsers.length === 0
                          ? 0
                          : (currentPage - 1) * USERS_PER_PAGE + 1}
                      </strong>{" "}
                      to{" "}
                      <strong>
                        {Math.min(
                          currentPage * USERS_PER_PAGE,
                          filteredUsers.length
                        )}
                      </strong>{" "}
                      of <strong>{filteredUsers.length}</strong> results
                    </div>

                    <div className="um-pagination-buttons">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>

                      {getVisiblePages().map((page) => (
                        <button
                          key={page}
                          type="button"
                          className={currentPage === page ? "active" : ""}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                {isAddPanelOpen && (
                  <div className="um-modal-overlay">
                    <div
                      className="um-modal-backdrop"
                      onClick={closePanel}
                    ></div>

                    <div className="um-modal-box">
                      <div className="um-modal-header">
                        <h2>{isEditMode ? "Edit User" : "Add New User"}</h2>
                        <button
                          type="button"
                          className="um-panel-close"
                          onClick={closePanel}
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <form
                        className="um-modal-form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleCreateOrUpdateUser();
                        }}
                      >
                        <div className="um-modal-body">
                          <div className="um-form">
                            <div className="um-form-group">
                              <label>Full Name</label>
                              <input
                                type="text"
                                name="name"
                                placeholder="e.g. Jane Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="um-form-group">
                              <label>Email Address</label>
                              <input
                                type="email"
                                name="email"
                                placeholder="jane@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="um-form-group">
                              <label>Role</label>
                              <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                              >
                                <option>Citizen</option>
                                <option>Employee</option>
                                <option>Admin</option>
                              </select>
                            </div>

                            <div className="um-form-group">
                              <label>Municipality</label>
                              <select
                                name="municipality"
                                value={formData.municipality}
                                onChange={handleInputChange}
                              >
                                <option value="">
                                  Select Municipality...
                                </option>
                                <option>Springfield</option>
                                <option>Shelbyville</option>
                                <option>Capital City</option>
                                <option>Ogdenville</option>
                                <option>Jacksonville</option>
                                <option>Cincinnati</option>
                              </select>
                            </div>

                            <div className="um-security-block">
                              <h3>Security</h3>

                              <div className="um-form-group">
                                <label>
                                  {isEditMode
                                    ? "New Password (Optional)"
                                    : "Temporary Password"}
                                </label>
                                <div className="um-password-wrap">
                                  <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                  />
                                  <button
                                    type="button"
                                    className="um-password-toggle"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  >
                                    {showPassword ? (
                                      <EyeOff size={18} />
                                    ) : (
                                      <Eye size={18} />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div className="um-form-group">
                                <label>Confirm Password</label>
                                <input
                                  type={showPassword ? "text" : "password"}
                                  name="confirmPassword"
                                  placeholder="••••••••"
                                  value={formData.confirmPassword}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="um-modal-footer">
                          <button
                            type="button"
                            className="um-cancel-btn"
                            onClick={closePanel}
                          >
                            Cancel
                          </button>

                          <button
                            type="submit"
                            className="um-create-btn"
                          >
                            {isEditMode ? "Save Changes" : "Create User"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {isDeleteOpen && (
                  <>
                    <div
                      className="um-panel-backdrop"
                      onClick={closeDeleteDialog}
                    ></div>

                    <div className="um-delete-dialog">
                      <div className="um-delete-header">
                        <h3>Delete User</h3>
                        <button
                          type="button"
                          className="um-panel-close"
                          onClick={closeDeleteDialog}
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <div className="um-delete-body">
                        <p>
                          Are you sure you want to delete{" "}
                          <strong>{userToDelete?.name}</strong>?
                        </p>
                        <p className="um-delete-subtext">
                          This action cannot be undone.
                        </p>
                      </div>

                      <div className="um-delete-footer">
                        <button
                          type="button"
                          className="um-cancel-btn"
                          onClick={closeDeleteDialog}
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          className="um-delete-btn"
                          onClick={handleConfirmDelete}
                        >
                          Yes, Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function RoleBadge({ role }) {
  if (role === "Admin") {
    return <span className="um-badge purple">Admin</span>;
  }

  if (role === "Employee") {
    return <span className="um-badge blue">Employee</span>;
  }

  return <span className="um-badge amber">Citizen</span>;
}

function StatusBadge({ status }) {
  if (status === "Active") {
    return (
      <span className="um-status-badge active">
        <span className="um-status-dot"></span>
        Active
      </span>
    );
  }

  return (
    <span className="um-status-badge suspended">
      <span className="um-status-dot red"></span>
      Suspended
    </span>
  );
}
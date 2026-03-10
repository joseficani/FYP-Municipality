import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./EditProfilePage.css";
import { ArrowLeft, Camera, Save } from "lucide-react";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    municipality: "Springfield Municipality",
    residentSince: "2018",
    address: "Main Street, Springfield",
    bio: "Resident interested in local services and municipality updates.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated successfully.");
    navigate("/profile");
    window.scrollTo(0, 0);
  };

  return (
    <div className="edit-profile-page">
      <Header solid/>

      <main className="edit-profile-main">
        <div className="edit-profile-container">
          <button
            type="button"
            className="edit-profile-back"
            onClick={() => navigate("/profile")}
          >
            <ArrowLeft size={18} />
            Back to Profile
          </button>

          <div className="edit-profile-card">
            <div className="edit-profile-top">
              <div className="edit-profile-avatar-wrap">
                <div className="edit-profile-avatar">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Sarah Jenkins"
                  />
                </div>

                <button type="button" className="edit-profile-camera-btn">
                  <Camera size={16} />
                </button>
              </div>

              <div>
                <h1 className="edit-profile-title">Edit Profile</h1>
                <p className="edit-profile-subtitle">
                  Update your personal information and profile details.
                </p>
              </div>
            </div>

            <form className="edit-profile-form" onSubmit={handleSave}>
              <div className="edit-profile-grid">
                <div className="edit-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="edit-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="edit-field">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="edit-field">
                  <label>Municipality</label>
                  <input
                    type="text"
                    name="municipality"
                    value={formData.municipality}
                    onChange={handleChange}
                  />
                </div>

                <div className="edit-field">
                  <label>Resident Since</label>
                  <input
                    type="text"
                    name="residentSince"
                    value={formData.residentSince}
                    onChange={handleChange}
                  />
                </div>

                <div className="edit-field">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="edit-field edit-field-full">
                  <label>Bio</label>
                  <textarea
                    name="bio"
                    rows="5"
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="edit-profile-actions">
                <button
                  type="button"
                  className="edit-cancel-btn"
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </button>

                <button type="submit" className="edit-save-btn">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
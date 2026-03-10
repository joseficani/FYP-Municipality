import React from "react";
import "./ProfileComponents.css";
import {
  Camera,
  MapPin,
  Mail,
  Phone,
  Edit2,
  Shield,
  Key,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfileSidebar() {
  const navigate = useNavigate();

  const goToEditProfile = () => {
    navigate("/edit-profile");
    window.scrollTo(0, 0);
  };

  return (
    <div className="profile-sidebar">
      {/* Main Profile Card */}
      <div className="profile-main-card">
        <div className="profile-cover"></div>

        <div className="profile-main-content">
          <div className="profile-avatar-row">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Sarah Jenkins"
                />
              </div>

              <button
                type="button"
                className="profile-camera-btn"
                aria-label="Change profile picture"
                onClick={goToEditProfile}
              >
                <Camera size={16} />
              </button>
            </div>
          </div>

          <div className="profile-user-info">
            <h2 className="profile-user-name">Sarah Jenkins</h2>

            <div className="profile-location">
              <MapPin size={16} />
              <span>Springfield Municipality • Resident since 2018</span>
            </div>
          </div>

          <div className="profile-contact-list">
            <div className="profile-contact-item">
              <div className="profile-contact-left">
                <div className="profile-contact-icon">
                  <Mail size={16} />
                </div>

                <div>
                  <p className="profile-contact-label">Email</p>
                  <p className="profile-contact-value">sarah.j@example.com</p>
                </div>
              </div>

              <button
                type="button"
                className="profile-edit-btn"
                onClick={goToEditProfile}
              >
                <Edit2 size={16} />
              </button>
            </div>

            <div className="profile-contact-item">
              <div className="profile-contact-left">
                <div className="profile-contact-icon">
                  <Phone size={16} />
                </div>

                <div>
                  <p className="profile-contact-label">Phone</p>
                  <p className="profile-contact-value">+1 (555) 123-4567</p>
                </div>
              </div>

              <button
                type="button"
                className="profile-edit-btn"
                onClick={goToEditProfile}
              >
                <Edit2 size={16} />
              </button>
            </div>
          </div>

          <div className="profile-actions">
            <button
              type="button"
              className="profile-primary-btn"
              onClick={goToEditProfile}
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="profile-settings-card">
        <div className="profile-settings-header">
          <h3>Account Settings</h3>
        </div>

        <div className="profile-settings-body">
          <button type="button" className="profile-settings-btn">
            <Shield size={18} className="profile-settings-green" />
            <span>Privacy & Security</span>
          </button>

          <button type="button" className="profile-settings-btn">
            <Key size={18} className="profile-settings-green" />
            <span>Change Password</span>
          </button>
        </div>
      </div>
    </div>
  );
}
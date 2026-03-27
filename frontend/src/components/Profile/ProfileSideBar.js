import React, { useEffect, useState } from "react";
import axios from "axios";
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

const API_BASE_URL = "http://localhost:5000/api";
const DEFAULT_PROFILE_IMAGE =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

export default function ProfileSidebar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const goToEditProfile = () => {
    navigate("/edit-profile");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setProfile(null);
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data.data || null);
      } catch (error) {
        console.error("Fetch profile error:", error);
        console.error("Server response:", error.response?.data);
        setProfile(null);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          localStorage.removeItem("isLoggedIn");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="profile-sidebar">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="profile-sidebar">Could not load profile.</div>;
  }

  return (
    <div className="profile-sidebar">
      <div className="profile-main-card">
        <div className="profile-cover"></div>

        <div className="profile-main-content">
          <div className="profile-avatar-row">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                <img
                  src={profile.profileImage || DEFAULT_PROFILE_IMAGE}
                  alt={profile.name || "Profile"}
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
            <h2 className="profile-user-name">{profile.name || "No name"}</h2>

            <div className="profile-location">
              <MapPin size={16} />
              <span>
                {profile.municipality || "Municipality not set"}
                {profile.residentSince
                  ? ` • Resident since ${profile.residentSince}`
                  : ""}
              </span>
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
                  <p className="profile-contact-value">
                    {profile.email || "No email"}
                  </p>
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
                  <p className="profile-contact-value">
                    {profile.phone || "No phone added"}
                  </p>
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
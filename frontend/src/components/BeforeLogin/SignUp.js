import React, { useState } from "react";
import axios from "axios";
import "./AuthPages.css";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Chrome,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    municipality: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");

      const res = await axios.post(`${API_BASE_URL}/auth/signup`, formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("isLoggedIn", "true");

      setSuccessMessage("Account created successfully. Redirecting...");

      setTimeout(() => {
        if (res.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1200);
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-inner">
          <div className="auth-form-panel">
            <h2 className="auth-title">Create Account</h2>

            <div className="auth-socials">
              <button
                type="button"
                className="auth-social-btn"
                aria-label="Facebook"
              >
                <Facebook className="auth-social-icon" />
              </button>
              <button
                type="button"
                className="auth-social-btn"
                aria-label="Google"
              >
                <Chrome className="auth-social-icon" />
              </button>
              <button
                type="button"
                className="auth-social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin className="auth-social-icon" />
              </button>
            </div>

            <p className="auth-subtitle">or use your email account</p>

            <form onSubmit={handleSignUp} className="auth-form">
              <div className="auth-input-group">
                <span className="auth-input-icon auth-left-icon">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="auth-input auth-input-left"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="auth-input-group">
                <span className="auth-input-icon auth-left-icon">
                  <User size={16} />
                </span>

                <select
                  name="municipality"
                  value={formData.municipality}
                  onChange={handleChange}
                  className="auth-input auth-input-left"
                  required
                >
                  <option value="">Select Municipality</option>
                  <option value="Beirut">Beirut</option>
                  <option value="Zahle">Zahle</option>
                  <option value="Tripoli">Tripoli</option>
                  <option value="Saida">Saida</option>
                  <option value="Byblos">Byblos</option>
                </select>
              </div>

              <div className="auth-input-group">
                <span className="auth-input-icon auth-left-icon">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input auth-input-left"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="auth-input-group">
                <span className="auth-input-icon auth-left-icon">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="auth-input auth-input-both"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="auth-password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {successMessage && (
                <p className="auth-message success">{successMessage}</p>
              )}

              {errorMessage && <p className="auth-message error">{errorMessage}</p>}

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>
          </div>

          <div className="auth-side-panel">
            <div className="auth-blur auth-blur-top"></div>
            <div className="auth-blur auth-blur-bottom"></div>

            <div className="auth-side-content">
              <h2 className="auth-side-title">Welcome Back!</h2>
              <p className="auth-side-text">
                To keep connected with our website please login with your
                personal info
              </p>
              <button
                type="button"
                className="auth-switch-btn"
                onClick={() => navigate("/")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
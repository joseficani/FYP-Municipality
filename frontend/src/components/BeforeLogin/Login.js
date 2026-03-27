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
  Eye,
  EyeOff,
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("isLoggedIn", "true");

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(
        error.response?.data?.message || "Incorrect email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <h2 className="login-title">Sign in</h2>

          <div className="social-login">
            <button type="button" className="social-btn" aria-label="Facebook">
              <Facebook className="social-icon" />
            </button>
            <button type="button" className="social-btn" aria-label="Google">
              <Chrome className="social-icon" />
            </button>
            <button type="button" className="social-btn" aria-label="LinkedIn">
              <Linkedin className="social-icon" />
            </button>
          </div>

          <p className="login-subtitle">or use your email account</p>

          <form onSubmit={handleSignIn} className="login-form">
            <div className="input-group">
              <span className="input-icon left-icon">
                <Mail size={20} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="login-input with-left-icon"
                placeholder="Email"
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon left-icon">
                <Lock size={20} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="login-input with-both-icons"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errorMessage && <p className="login-message error">{errorMessage}</p>}

            <div className="forgot-password-row">
              <button type="button" className="forgot-password-btn">
                Forgot your password?
              </button>
            </div>

            <button type="submit" className="sign-in-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        <div className="login-right">
          <div className="blur-circle blur-top"></div>
          <div className="blur-circle blur-bottom"></div>

          <div className="login-right-content">
            <h2 className="welcome-title">Hello, Friend!</h2>
            <p className="welcome-text">
              Enter your personal details and start your journey with us
            </p>
            <button
              type="button"
              className="sign-up-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
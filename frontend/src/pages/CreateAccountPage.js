import React, { useState } from "react";
import "./CreateAccountPage.css";
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

export default function CreateAccountPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    localStorage.setItem("registeredUser", JSON.stringify(userData));
    setMessage("Account created successfully. Redirecting to Sign In...");

    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card-inner">
          <div className="auth-form-panel">
            <h2 className="auth-title">Create Account</h2>

            <div className="auth-socials">
              <button type="button" className="auth-social-btn" aria-label="Facebook">
                <Facebook className="auth-social-icon" />
              </button>
              <button type="button" className="auth-social-btn" aria-label="Google">
                <Chrome className="auth-social-icon" />
              </button>
              <button type="button" className="auth-social-btn" aria-label="LinkedIn">
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input auth-input-left"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="auth-input-group">
                <span className="auth-input-icon auth-left-icon">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              {message && <p className="auth-message success">{message}</p>}

              <button type="submit" className="auth-submit-btn">
                Sign Up
              </button>
            </form>
          </div>

          <div className="auth-side-panel">
            <div className="auth-blur auth-blur-top"></div>
            <div className="auth-blur auth-blur-bottom"></div>

            <div className="auth-side-content">
              <h2 className="auth-side-title">Welcome Back!</h2>
              <p className="auth-side-text">
                To keep connected with our website please login with your personal info
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
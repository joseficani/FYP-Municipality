// import React, { useState } from "react";
// import "./LoginPage.css";
// import {
//   Facebook,
//   Linkedin,
//   Chrome,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
// } from "lucide-react";

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSignIn = (e) => {
//     e.preventDefault();

//     console.log("Sign in with:", {
//       email,
//       password,
//     });
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         {/* Left Panel */}
//         <div className="login-left">
//           <h2 className="login-title">Sign in</h2>

//           <div className="social-login">
//             <button
//               type="button"
//               className="social-btn"
//               aria-label="Sign in with Facebook"
//             >
//               <Facebook className="social-icon" />
//             </button>

//             <button
//               type="button"
//               className="social-btn"
//               aria-label="Sign in with Google"
//             >
//               <Chrome className="social-icon" />
//             </button>

//             <button
//               type="button"
//               className="social-btn"
//               aria-label="Sign in with LinkedIn"
//             >
//               <Linkedin className="social-icon" />
//             </button>
//           </div>

//           <p className="login-subtitle">or use your email account</p>

//           <form onSubmit={handleSignIn} className="login-form">
//             <div className="input-group">
//               <span className="input-icon left-icon">
//                 <Mail size={20} />
//               </span>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="login-input with-left-icon"
//                 placeholder="Email"
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <span className="input-icon left-icon">
//                 <Lock size={20} />
//               </span>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="login-input with-both-icons"
//                 placeholder="Password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="password-toggle"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>

//             <div className="forgot-password-row">
//               <button type="button" className="forgot-password-btn">
//                 Forgot your password?
//               </button>
//             </div>

//             <button type="submit" className="sign-in-btn">
//               Sign In
//             </button>
//           </form>
//         </div>

//         {/* Right Panel */}
//         <div className="login-right">
//           <div className="blur-circle blur-top" />
//           <div className="blur-circle blur-bottom" />

//           <div className="login-right-content">
//             <h2 className="welcome-title">Hello, Friend!</h2>

//             <p className="welcome-text">
//               Enter your personal details and start your journey with us
//             </p>

//             <button type="button" className="sign-up-btn">
//               Sign Up
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import "./LoginPage.css";
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

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
      setErrorMessage("No account found. Please create an account first.");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      setErrorMessage("Incorrect email or password.");
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <button type="submit" className="sign-in-btn">
              Sign In
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
import "./Header.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Languages, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ solid = false }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDown = (e) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const closeDropdown = () => setServicesOpen(false);

  return (
    <header className={`navHeader ${solid ? "navHeaderSolid" : ""}`}>
      <div className="navInner">
        {/* LOGO */}
        <div className="navLogo">
          <Link to="/" className="navBrandLink">
            <span className="navBrand">MuniciPal</span>
          </Link>
        </div>

        {/* MENU */}
        <nav className="navMenu">
          <Link className="navLink" to="/dashboard">
            Home
          </Link>

          {/* SERVICES DROPDOWN */}
          <div className="navDropdown" ref={dropdownRef}>
            <button
              type="button"
              className={`navDropBtn ${servicesOpen ? "active" : ""}`}
              onClick={() => setServicesOpen((v) => !v)}
            >
              <span>Services</span>
              <span className={`navCaret ${servicesOpen ? "rot" : ""}`}>▾</span>
            </button>

            {servicesOpen && (
              <div className="navDropMenu">
                <Link
                  className="navDropItem"
                  to="/complaints"
                  onClick={closeDropdown}
                >
                  Complaints
                </Link>

                <Link
                  className="navDropItem"
                  to="/taxes-fees"
                  onClick={closeDropdown}
                >
                  Taxes &amp; Fees
                </Link>

                <Link
                  className="navDropItem"
                  to="/licenses-permits"
                  onClick={closeDropdown}
                >
                  Licensing &amp; Permits
                </Link>

                <Link
                  className="navDropItem"
                  to="/certificates"
                  onClick={closeDropdown}
                >
                  Certificates &amp; Requests
                </Link>
              </div>
            )}
          </div>

          <Link className="navLink" to="/news">
            Events &amp; News
          </Link>

          <Link className="navLink" to="/#team">
            Our Team
          </Link>

          <Link className="navLink" to="/#contact">
            Contact
          </Link>
        </nav>

        {/* RIGHT ICONS */}
        <div className="navRight">
          <button className="navIconBtn" type="button" aria-label="Language" >
            <Languages size={18} color="white" />
          </button>

          <button className="navIconBtn" type="button" aria-label="Notifications"
            onClick={() => navigate("/notifications")}>
            <Bell size={18} color="white" />
          </button>
 

                    <button className="navIconBtn" type="button" aria-label="Profile"  
            onClick={() => navigate("/profile")}>
            <User size={18} color="white" />
          </button>
 
        </div>
      </div>
    </header>
  );
}
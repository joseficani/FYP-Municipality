import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Languages, Bell, User } from "lucide-react";

export default function Header({ solid = false }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  // const [language, setLanguage] = useState("en");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const translations = {
    en: {
      home: "Home",
      services: "Services",
      complaints: "Complaints",
      taxesFees: "Taxes & Fees",
      licensingPermits: "Licensing & Permits",
      certificates: "Certificates & Requests",
      projects: "Projects & Tenders",
      eventsNews: "Events & News",
      findOutMore: "Find Out More",
      ourTeam: "Our Team",
      contact: "Contact",
    },
    ar: {
      home: "الرئيسية",
      services: "الخدمات",
      complaints: "الشكاوى",
      taxesFees: "الضرائب والرسوم",
      licensingPermits: "التراخيص والتصاريح",
      certificates: "الشهادات والطلبات",
      projects: "المشاريع والمناقصات",
      eventsNews: "الفعاليات والأخبار",
      findOutMore: "اكتشف المزيد",
      ourTeam: "فريقنا",
      contact: "تواصل معنا",
    },
  };

  const t = translations[language];

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

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
    window.dispatchEvent(new Event("languageChange"));
  }, [language]);

  const closeDropdown = () => setServicesOpen(false);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
    setServicesOpen(false);
  };

  return (
    <header className={`navHeader ${solid ? "navHeaderSolid" : ""}`}>
      <div className="navInner">
        <div className="navLogo">
          <Link to="/Dashboard" className="navBrandLink">
            <span className="navBrand">MuniciPal</span>
          </Link>
        </div>

        <nav className="navMenu">
          <Link className="navLink" to="/Dashboard">
            {t.home}
          </Link>

          <div className="navDropdown" ref={dropdownRef}>
            <button
              type="button"
              className={`navDropBtn ${servicesOpen ? "active" : ""}`}
              onClick={() => setServicesOpen((v) => !v)}
            >
              <span>{t.services}</span>
              <span className={`navCaret ${servicesOpen ? "rot" : ""}`}>▾</span>
            </button>

            {servicesOpen && (
              <div className="navDropMenu">
                <Link
                  className="navDropItem"
                  to="/complaints"
                  onClick={closeDropdown}
                >
                  {t.complaints}
                </Link>

                <Link
                  className="navDropItem"
                  to="/taxes-fees"
                  onClick={closeDropdown}
                >
                  {t.taxesFees}
                </Link>

                <Link
                  className="navDropItem"
                  to="/licenses-permits"
                  onClick={closeDropdown}
                >
                  {t.licensingPermits}
                </Link>

                <Link
                  className="navDropItem"
                  to="/certificates"
                  onClick={closeDropdown}
                >
                  {t.certificates}
                </Link>

                <Link
                  className="navDropItem"
                  to="/projects"
                  onClick={closeDropdown}
                >
                  {t.projects}
                </Link>
              </div>
            )}
          </div>

          <Link className="navLink" to="/events-news">
            {t.eventsNews}
          </Link>

          <Link className="navLink" to="/find-out-more">
            {t.findOutMore}
          </Link>

          <Link className="navLink" to="/meet-the-team">
            {t.ourTeam}
          </Link>

          <Link className="navLink" to="/contact">
            {t.contact}
          </Link>
        </nav>

        <div className="navRight">
          <button
            className="navIconBtn"
            type="button"
            aria-label="Language"
            onClick={handleToggleLanguage}
          >
            <Languages size={18} color="white" />
          </button>

          <button
            className="navIconBtn"
            type="button"
            aria-label="Notifications"
            onClick={() => navigate("/notifications")}
          >
            <Bell size={18} color="white" />
          </button>

          <button
            className="navIconBtn"
            type="button"
            aria-label="Profile"
            onClick={() => navigate("/profile")}
          >
            <User size={18} color="white" />
          </button>
        </div>
      </div>
    </header>
  );
}
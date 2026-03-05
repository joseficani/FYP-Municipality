import "./Header.css";

import { useEffect, useRef, useState } from "react";
 
export default function Navbar() {

  const [servicesOpen, setServicesOpen] = useState(false);

  const dropdownRef = useRef(null);
 
  // close dropdown when clicking outside

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
 
  return (
<header className="navHeader">
<div className="navInner">

        {/* LEFT LOGO */}
<div className="navLogo">
<span className="navBrand">MuniciPal</span>
</div>
 
        {/* CENTER MENU */}
<nav className="navMenu">
<a className="navLink" href="#home">Home</a>
 
          {/* SERVICES DROPDOWN */}
<div className="navDropdown" ref={dropdownRef}>
<button

              type="button"

              className={`navDropBtn ${servicesOpen ? "active" : ""}`}

              onClick={() => setServicesOpen((v) => !v)}

              aria-expanded={servicesOpen}

              aria-haspopup="menu"
>
<span>Services</span>
<span className={`navCaret ${servicesOpen ? "rot" : ""}`}>▾</span>
</button>
 
            {servicesOpen && (
<div className="navDropMenu" role="menu">
<a className="navDropItem" href="#complaints" onClick={() => setServicesOpen(false)}>

                  Complaints
</a>
<a className="navDropItem" href="#taxes" onClick={() => setServicesOpen(false)}>

                  Taxes &amp; Fees
</a>
<a className="navDropItem" href="#licensing" onClick={() => setServicesOpen(false)}>

                  Licensing &amp; Permits
</a>
<a className="navDropItem" href="#certificates" onClick={() => setServicesOpen(false)}>

                  Certificates &amp; Requests
</a>
</div>

            )}
</div>
 
          <a className="navLink" href="#news">Events &amp; News</a>
<a className="navLink" href="#team">Our Team</a>
<a className="navLink" href="#contact">Contact</a>
</nav>
 
        {/* RIGHT ICONS (optional placeholders) */}
<div className="navRight">
<button className="navIconBtn" type="button" aria-label="Language">A</button>
<button className="navIconBtn" type="button" aria-label="Notifications">🔔</button>
<button className="navIconBtn" type="button" aria-label="Profile">👤</button>
</div>
</div>
</header>

  );

}
 
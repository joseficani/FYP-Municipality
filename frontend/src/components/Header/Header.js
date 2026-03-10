
 

// import "./Header.css";
// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const onDown = (e) => {
//       if (!dropdownRef.current) return;
//       if (!dropdownRef.current.contains(e.target)) {
//         setServicesOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", onDown);
//     return () => document.removeEventListener("mousedown", onDown);
//   }, []);

//   return (
//     <header className="navHeader">
//       <div className="navInner">
//         <div className="navLogo">
//           <span className="navBrand">MuniciPal</span>
//         </div>

//         <nav className="navMenu">
//           <a className="navLink" href="/dashboard">Home</a>

//           <div className="navDropdown" ref={dropdownRef}>
//             <button
//               type="button"
//               className={`navDropBtn ${servicesOpen ? "active" : ""}`}
//               onClick={() => setServicesOpen((v) => !v)}
//               aria-expanded={servicesOpen}
//               aria-haspopup="menu"
//             >
//               <span>Services</span>
//               <span className={`navCaret ${servicesOpen ? "rot" : ""}`}>▾</span>
//             </button>

//             {servicesOpen && (
//               <div className="navDropMenu" role="menu">
//                 <a
//                   className="navDropItem"
//                   href="#complaints"
//                   onClick={() => setServicesOpen(false)}
//                 >
//                   Complaints
//                 </a>
//                 <a
//                   className="navDropItem"
//                   href="/taxes-fees"
//                   onClick={() => setServicesOpen(false)}
//                 >
//                   Taxes &amp; Fees
//                 </a>
//                 <a
//                   className="navDropItem"
//                   href="#licensing"
//                   onClick={() => setServicesOpen(false)}
//                 >
//                   Licensing &amp; Permits
//                 </a>
//                 <a
//                   className="navDropItem"
//                   href="/certificates"
//                   onClick={() => setServicesOpen(false)}
//                 >
//                   Certificates &amp; Requests
//                 </a>
//               </div>
//             )}
//           </div>

//           <a className="navLink" href="/events-news">Events &amp; News</a>
//           <a className="navLink" href="#team">Our Team</a>
//           <a className="navLink" href="#contact">Contact</a>
//         </nav>

//         <div className="navRight">
//           <button className="navIconBtn" type="button" aria-label="Language">
//            E
//           </button>

//           <button
//             className="navIconBtn"
//             type="button"
//             aria-label="Notifications"
//             onClick={() => navigate("/notifications")}
//           >
//             🔔
//           </button>

//           <button
//             className="navIconBtn"
//             type="button"
//             aria-label="Profile"
//             onClick={() => navigate("/profile")}
//           >
//             👤
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Languages, Bell, User } from "lucide-react";
 
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
          <Link to="/Dashboard" className="navBrandLink">
            <span className="navBrand">MuniciPal</span>
          </Link>
        </div>
 
        {/* MENU */}
        <nav className="navMenu">
          <Link className="navLink" to="/Dashboard">
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
                  to="/#licensing"
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
 
          <Link className="navLink" to="/events-news">
            Events &amp; News
          </Link>
 
          <Link className="navLink" to="/#team">
            Our Team
          </Link>
 
          <Link className="navLink" to="/contact">
            Contact
          </Link>
        </nav>
 
        {/* RIGHT ICONS */}
        <div className="navRight">
          <button className="navIconBtn" type="button" aria-label="Language">
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
 
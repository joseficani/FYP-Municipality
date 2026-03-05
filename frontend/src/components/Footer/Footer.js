import "./Footer.css";
 
export default function Footer() {
  return (
<footer className="footer">
<div className="footerInner">
 
        <div className="footerGrid">
 
          {/* About Us */}
<div className="footerCol">
<h3 className="footerTitle">About Us</h3>
<ul className="footerList">
<li>About Us</li>
<li>Our Mission</li>
<li>Why Smart Municipality</li>
</ul>
</div>
 
          <div className="footerSep" />
 
          {/* Quick Links */}
<div className="footerCol">
<h3 className="footerTitle">Quick Links</h3>
<ul className="footerList">
<li>Services</li>
<li>Events &amp; News</li>
<li>Our Team</li>
<li>Contact us</li>
</ul>
</div>
 
          <div className="footerSep" />
 
          {/* Contact Us */}
<div className="footerCol">
<h3 className="footerTitle">Contact Us</h3>
<ul className="footerList">
<li>Email Support</li>
<li>Phone Support</li>
<li>Info@smartmunicipality.lb</li>
</ul>
</div>
 
          <div className="footerSep" />
 
          {/* Follow Us */}
<div className="footerCol">
<h3 className="footerTitle">Follow Us</h3>
 
            <div className="footerSocial">
<a className="socialBox" href="#" aria-label="Facebook">
                {/* Facebook */}
<svg viewBox="0 0 24 24" className="socialIcon">
<path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.1l.9-3H13V9c0-.6.4-1 1-1Z" />
</svg>
</a>
 
              <a className="socialBox" href="#" aria-label="X">
                {/* X */}
<svg viewBox="0 0 24 24" className="socialIcon">
<path d="M18.5 3H21l-6.6 7.6L22 21h-6.2l-4.8-6-5.2 6H3l7.1-8.2L2 3h6.3l4.3 5.5L18.5 3Z" />
</svg>
</a>
 
              <a className="socialBox" href="#" aria-label="Instagram">
                {/* Instagram */}
<svg viewBox="0 0 24 24" className="socialIcon">
<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" />
<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
<path d="M17.5 6.5h.01" />
</svg>
</a>
</div>
</div>
 
        </div>
 
        <div className="footerBottom">
          © 2026 Smart Municipality Platform – Lebanon
</div>
 
      </div>
</footer>
  );
}
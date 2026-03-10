import "./BeforeLoginContent.css";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Globe2,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MessageSquare,
  FileCheck,
  ScrollText,
  Newspaper,
  Users,
} from "lucide-react";

export default function BeforeLoginPage() {
  const news = [
    {
      id: 1,
      title: "New Online Permit System Launched",
      date: "Jan 15, 2026",
      excerpt:
        "The Ministry of Interior announces the launch of the fully digital building permit application system.",
      category: "Digital Services",
      imageClass: "blNewsImage blue",
    },
    {
      id: 2,
      title: "Community Clean-Up Initiative in Beirut",
      date: "Jan 10, 2026",
      excerpt:
        "Join thousands of volunteers this weekend for the annual city-wide cleaning campaign.",
      category: "Community",
      imageClass: "blNewsImage green",
    },
    {
      id: 3,
      title: "Municipal Elections Schedule Announced",
      date: "Jan 5, 2026",
      excerpt:
        "Official dates for the upcoming municipal elections have been released by the government.",
      category: "Governance",
      imageClass: "blNewsImage orange",
    },
  ];

  const services = [
    {
      icon: <MessageSquare size={28} />,
      title: "Complaints Submission",
      description:
        "Report issues directly to your municipality with photo evidence and location tracking.",
      colorClass: "orangeBox",
    },
    {
      icon: <FileCheck size={28} />,
      title: "Permits & Licensing",
      description:
        "Apply for building permits, business licenses, and renovation approvals online.",
      colorClass: "blueBox",
    },
    {
      icon: <ScrollText size={28} />,
      title: "Certificates & Requests",
      description:
        "Request official documents like birth certificates and residency proofs instantly.",
      colorClass: "greenBox",
    },
    {
      icon: <Newspaper size={28} />,
      title: "News & Events",
      description:
        "Stay updated with the latest local news, municipal decisions, and community events.",
      colorClass: "purpleBox",
    },
    {
      icon: <Users size={28} />,
      title: "Community Updates",
      description:
        "Connect with community initiatives, public projects, and neighborhood discussions.",
      colorClass: "pinkBox",
    },
  ];

  const cities = [
    { name: "Beirut", x: 45, y: 45 },
    { name: "Tripoli", x: 55, y: 15 },
    { name: "Sidon", x: 40, y: 65 },
    { name: "Tyre", x: 35, y: 80 },
    { name: "Jounieh", x: 48, y: 38 },
    { name: "Byblos", x: 50, y: 30 },
    { name: "Zahle", x: 65, y: 50 },
    { name: "Baalbek", x: 75, y: 35 },
    { name: "Nabatieh", x: 45, y: 75 },
  ];

  return (
    <div className="beforeLoginPage">
      {/* HERO */}
      <section id="hero" className="blHero">
        <div className="blPattern"></div>
        <div className="blBlob blobOne"></div>
        <div className="blBlob blobTwo"></div>
        <div className="blBlob blobThree"></div>

        <div className="blContainer">
          <div className="blHeroGrid">
            <div className="blHeroLeft fadeUp">
              <div className="blHeroBadge">
                <span className="blBadgeDot"></span>
                Now serving 1,000+ municipalities
              </div>

              <h1 className="blHeroTitle">
                Your Digital Gateway to <span>Municipal Services</span>
              </h1>

              <p className="blHeroText">
                Connecting Lebanese citizens with their municipalities. Submit
                requests, track permits, and stay informed about your community
                — all in one secure platform.
              </p>

              <div className="blHeroButtons">
                <Link to="/signup" className="blPrimaryBtn">
                  Create Account
                  <ArrowRight size={16} />
                </Link>

                <Link to="/login" className="blSecondaryBtn">
                  Login
                </Link>
              </div>

              <div className="blHeroChecks">
                <div className="blCheckItem">
                  <CheckCircle2 size={18} />
                  <span>24/7 Digital Access</span>
                </div>
                <div className="blCheckItem">
                  <CheckCircle2 size={18} />
                  <span>Secure & Transparent</span>
                </div>
                <div className="blCheckItem">
                  <CheckCircle2 size={18} />
                  <span>Real-time Tracking</span>
                </div>
                <div className="blCheckItem">
                  <CheckCircle2 size={18} />
                  <span>Direct Communication</span>
                </div>
              </div>
            </div>

            <div className="blHeroRight fadeScale">
              <div className="blHeroCard">
                <div className="blHeroGlow"></div>

                <div className="blUiTop">
                  <div className="blUiBar"></div>
                  <div className="blUiAvatar"></div>
                </div>

                <div className="blUiList">
                  {[1, 2, 3].map((i) => (
                    <div className="blUiItem" key={i}>
                      <div className="blUiItemIcon">
                        <div className="blUiItemIconSmall"></div>
                      </div>
                      <div className="blUiItemText">
                        <div className="blUiLine short"></div>
                        <div className="blUiLine tiny"></div>
                      </div>
                      <div className="blUiStatus"></div>
                    </div>
                  ))}
                </div>

                <div className="blUiBottom">
                  <div className="blUiBox blueSoft"></div>
                  <div className="blUiBox purpleSoft"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="blAbout">
        <div className="blContainer">
          <div className="blAboutGrid">
            <div className="fadeLeft">
              <div className="blSectionBadge">About MuniciPal</div>
              <h2 className="blSectionTitle">
                Modernizing Local Governance in Lebanon
              </h2>
              <p className="blSectionText">
                MuniciPal is a unified digital platform designed to modernize
                how Lebanese citizens interact with their local municipalities.
                From submitting complaints to tracking permit applications, our
                platform brings government services to your fingertips.
              </p>
              <p className="blSectionText">
                We believe in transparent, efficient, and accessible governance.
                Our mission is to bridge the gap between citizens and local
                authorities through technology.
              </p>

              <div className="blAboutFeatures">
                <div className="blFeatureItem">
                  <div className="blFeatureIcon">
                    <Globe2 size={24} />
                  </div>
                  <div>
                    <h4>Nationwide Coverage</h4>
                    <p>Connecting municipalities across all 8 governorates.</p>
                  </div>
                </div>

                <div className="blFeatureItem">
                  <div className="blFeatureIcon">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4>24/7 Digital Access</h4>
                    <p>Submit requests and track status anytime, anywhere.</p>
                  </div>
                </div>

                <div className="blFeatureItem">
                  <div className="blFeatureIcon">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4>Secure & Transparent</h4>
                    <p>
                      End-to-end encryption and transparent process tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="blAboutImageWrap fadeRight">
              <div className="blAboutImageCard">
                <img
                  src="https://images.unsplash.com/photo-1574610758391-c5f84d8974a4?auto=format&fit=crop&w=1000&q=80"
                  alt="Lebanese Architecture"
                  className="blAboutImage"
                />
                <div className="blAboutImageOverlay">
                  <div>
                    <p className="blDidYouKnow">Did you know?</p>
                    <p className="blDidYouKnowText">
                      Over 1,000 municipalities serve the Lebanese population.
                    </p>
                  </div>
                </div>
              </div>

              <div className="blFloatingStat">
                <div className="blStatTop">
                  <div className="blStatNumber">98%</div>
                  <div className="blStatLabel">User Satisfaction Rate</div>
                </div>
                <div className="blStatBar">
                  <div className="blStatBarFill"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="blServices">
        <div className="blContainer">
          <div className="blCenterHeading">
            <h2 className="blSectionTitle">Services You'll Access</h2>
            <p className="blSectionText centered">
              Once logged in, explore a full suite of municipal services
              designed to make your life easier and your community better.
            </p>
          </div>

          <div className="blServicesGrid">
            {services.map((service, index) => (
              <div className="blServiceCard fadeUp" key={index}>
                <div className={`blServiceIcon ${service.colorClass}`}>
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="blLearnMore">
                  <span>Learn more</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}

            <div className="blCtaCard fadeUp">
              <h3>Ready to get started?</h3>
              <p>Join thousands of citizens already using MuniciPal.</p>
              <Link to="/signup" className="blCtaBtn">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="municipalities" className="blMapSection">
        <div className="blContainer">
          <div className="blCenterHeading">
            <h2 className="blSectionTitle">Explore Lebanese Municipalities</h2>
            <p className="blSectionText centered">
              MuniciPal connects citizens across Lebanon with their local
              government, covering all governorates from North to South.
            </p>
          </div>

          <div className="blMapCard">
            <div className="blLebanonMapWrap">
              <svg viewBox="0 0 100 100" className="blLebanonMap">
                <path
                  d="M35,85 L30,80 L32,75 L38,65 L40,60 L45,50 L48,40 L50,30 L55,20 L60,15 L65,12 L70,15 L75,20 L80,30 L75,40 L70,50 L65,60 L60,70 L55,75 L50,80 L45,85 Z"
                  className="blMapShape"
                />

                {cities.map((city, index) => (
                  <g key={index}>
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="1.5"
                      className="blCityDot"
                    />
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="3"
                      className="blCityPulse"
                    />
                    <text x={city.x + 4} y={city.y + 1} className="blCityLabel">
                      {city.name}
                    </text>
                  </g>
                ))}
              </svg>

              <div className="blMapLegend">
                <div className="blLegendItem">
                  <div className="blLegendDot connected"></div>
                  <span>Connected Municipality</span>
                </div>
                <div className="blLegendItem">
                  <div className="blLegendDot pending"></div>
                  <span>Pending Integration</span>
                </div>
              </div>
            </div>

            <div className="blMapStats">
              <div className="blMapStatItem">
                <div className="blMapStatNumber">8</div>
                <div className="blMapStatLabel">Governorates</div>
              </div>
              <div className="blMapStatItem">
                <div className="blMapStatNumber">26</div>
                <div className="blMapStatLabel">Districts</div>
              </div>
              <div className="blMapStatItem">
                <div className="blMapStatNumber">1,000+</div>
                <div className="blMapStatLabel">Municipalities</div>
              </div>
              <div className="blMapStatItem">
                <div className="blMapStatNumber">4M+</div>
                <div className="blMapStatLabel">Citizens</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="blNewsSection">
        <div className="blContainer">
          <div className="blNewsHeading">
            <div>
              <h2 className="blSectionTitle">Latest Announcements</h2>
              <p className="blSectionText">
                Stay informed with the latest updates from your local
                municipality and national government.
              </p>
            </div>

            <a href="#news" className="blViewAll desktopOnly">
              View all news <ArrowRight size={16} />
            </a>
          </div>

          <div className="blNewsGrid">
            {news.map((item) => (
              <article key={item.id} className="blNewsCard">
                <div className={item.imageClass}>
                  <div className="blNewsImageText">{item.category} Image</div>
                </div>

                <div className="blNewsMeta">
                  <span className="blNewsCategory">{item.category}</span>
                  <span className="blNewsDate">
                    <Calendar size={14} />
                    {item.date}
                  </span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
              </article>
            ))}
          </div>

          <a href="#news" className="blViewAll mobileOnly">
            View all news <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* FEEDBACK */}
      <section id="contact" className="blFeedback">
        <div className="blFeedbackShape"></div>

        <div className="blContainer">
          <div className="blFeedbackGrid">
            <div>
              <h2 className="blFeedbackTitle">We Value Your Feedback</h2>
              <p className="blFeedbackText">
                Help us improve MuniciPal by sharing your thoughts. Whether it's
                a suggestion for a new feature or feedback on your experience,
                we want to hear from you.
              </p>

              <div className="blContactInfo">
                <div className="blContactItem">
                  <span>Email Us</span>
                  <strong>support@municipal.gov.lb</strong>
                </div>
                <div className="blContactItem">
                  <span>Call Us</span>
                  <strong>+961 1 234 567</strong>
                </div>
                <div className="blContactItem">
                  <span>Visit Us</span>
                  <strong>Ministry of Interior, Beirut, Lebanon</strong>
                </div>
              </div>
            </div>

            <div className="blFeedbackCard">
              <h3>Send us a message</h3>

              <form className="blFeedbackForm">
                <div className="blTwoCols">
                  <div>
                    <label>First Name</label>
                    <input type="text" placeholder="John" />
                  </div>
                  <div>
                    <label>Last Name</label>
                    <input type="text" placeholder="Doe" />
                  </div>
                </div>

                <div>
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <label>Message</label>
                  <textarea
                    rows="4"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button type="submit" className="blSendBtn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* BEFORE LOGIN FOOTER */}
<footer className="blFooter">
  <div className="blFooterInner">
    <div className="blFooterGrid">
      <div className="blFooterCol">
        <h3 className="blFooterTitle">About Us</h3>
        <ul className="blFooterList">
          <li>About Us</li>
          <li>Our Mission</li>
          <li>Why Smart Municipality</li>
        </ul>
      </div>

      <div className="blFooterSep" />

      <div className="blFooterCol">
        <h3 className="blFooterTitle">Quick Links</h3>
        <ul className="blFooterList">
          <li>Services</li>
          <li>Events &amp; News</li>
          <li>Our Team</li>
          <li>Contact us</li>
        </ul>
      </div>

      <div className="blFooterSep" />

      <div className="blFooterCol">
        <h3 className="blFooterTitle">Contact Us</h3>
        <ul className="blFooterList">
          <li>Email Support</li>
          <li>Phone Support</li>
          <li>Info@smartmunicipality.lb</li>
        </ul>
      </div>

      <div className="blFooterSep" />

      <div className="blFooterCol">
        <h3 className="blFooterTitle">Follow Us</h3>

        <div className="blFooterSocial">
          <a className="blSocialBox" href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" className="blSocialIcon">
              <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v6h3v-6h2.1l.9-3H13V9c0-.6.4-1 1-1Z" />
            </svg>
          </a>

          <a className="blSocialBox" href="#" aria-label="X">
            <svg viewBox="0 0 24 24" className="blSocialIcon">
              <path d="M18.5 3H21l-6.6 7.6L22 21h-6.2l-4.8-6-5.2 6H3l7.1-8.2L2 3h6.3l4.3 5.5L18.5 3Z" />
            </svg>
          </a>

          <a className="blSocialBox" href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" className="blSocialIcon">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" />
              <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
              <path d="M17.5 6.5h.01" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div className="blFooterBottom">
      © 2026 Smart Municipality Platform – Lebanon
    </div>
  </div>
</footer>
    </div>
  );
}
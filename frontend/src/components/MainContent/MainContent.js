import "./MainContent.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  ChevronDown,
  Receipt,
  FileText,
  MessageSquareWarning,
  Award,
  ArrowRight,
  SendHorizonal,
  Bot,
  X,
} from "lucide-react";

import heroImg from "../../assets/KaaElRimHero.png";
import team1 from "../../assets/profile1.png";
import team2 from "../../assets/profile2.png";
import team3 from "../../assets/profile1.png";

export default function MainContent() {
  const [tab, setTab] = useState("events");
  const [memberIndex, setMemberIndex] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const navigate = useNavigate();

  const cards =
    tab === "events"
      ? ["event 1", "event 2", "event 3", "event 4", "event 5"]
      : ["news 1", "news 2", "news 3", "news 4", "news 5"];

  const teamMembers = [
    {
      name: "Jane Doe",
      role: "Mayor",
      bio:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      phone: "+961 12 345 678",
      email: "janedoe@gmail.com",
      image: team1,
    },
    {
      name: "Mark Saliba",
      role: "Vice Mayor",
      bio:
        "Focused on citizen services and digital transformation. Leads municipal projects, improves transparency, and supports community engagement initiatives across the municipality.",
      phone: "+961 70 123 456",
      email: "mark.saliba@gmail.com",
      image: team2,
    },
    {
      name: "Sara Haddad",
      role: "Municipal Officer",
      bio:
        "Coordinates permits, certificates, and resident requests. Works with departments to ensure fast processing and clear communication with citizens.",
      phone: "+961 76 555 222",
      email: "sara.haddad@gmail.com",
      image: team3,
    },
  ];

  const activeMember = teamMembers[memberIndex];

  const prevMember = () => {
    setMemberIndex((i) => (i - 1 + teamMembers.length) % teamMembers.length);
  };

  const nextMember = () => {
    setMemberIndex((i) => (i + 1) % teamMembers.length);
  };

  const services = [
    {
      title: "Taxes & Fees",
      description:
        "View municipal taxes, fees, and pay your bills securely online.",
      icon: <Receipt size={30} />,
    },
    {
      title: "License & Permits",
      description:
        "Apply for permits, get instructions on the steps, upload documents, and track approval status.",
      icon: <FileText size={30} />,
      route: "/licenses-permits",
    },
    {
      title: "Complaints",
      description:
        "Report issues in your area, track their status, and follow up directly with municipal staff.",
      icon: <MessageSquareWarning size={30} />,
    },
    {
      title: "Certifications & Requests",
      description:
        "Request official documents, certificates, and other municipal paperwork easily.",
      icon: <Award size={30} />,
    },
  ];

  return (
    <main id="home">
      <section className="hero">
        <img className="heroBg" src={heroImg} alt="Kaa El Rim" />
        <div className="heroShade" />

        <div className="heroCenter">
          <div className="heroGlass">
            <h1 className="heroTitle">
              Welcome to <br className="heroBreak" />
              <span>Kaa El Rim</span> Municipality
            </h1>

            <p className="heroText">
              Serving our community with dedication, transparency, and a
              commitment to sustainable growth.
            </p>

            <button className="heroBtn" type="button">
              Explore Our Services
            </button>
          </div>
        </div>

        <div className="heroWave">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 60C1200 60 1320 45 1380 37.5L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="heroSearchWrap">
          <div className="heroSearchPill">
            <div className="heroField heroFieldGrow">
              <Search className="heroIconSvg" size={18} />
              <input
                className="heroInput"
                placeholder="Search for whatever you need..."
              />
            </div>

            <div className="heroSelectWrap">
              <select className="heroSelect" defaultValue="All Status">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
              </select>
              <ChevronDown className="heroSelectIcon" size={16} />
            </div>

            <div className="heroSelectWrap">
              <select className="heroSelect" defaultValue="Filter by tag">
                <option>Filter by tag</option>
                <option>Services</option>
                <option>News</option>
              </select>
              <ChevronDown className="heroSelectIcon" size={16} />
            </div>
          </div>
        </div>

        <button
          className="aiFloat"
          aria-label="AI chat"
          type="button"
          onClick={() => setAiOpen(true)}
        >
          <Bot color="#ffffff" size={30} />
        </button>
      </section>

      <section id="services" className="svcSection">
        <div className="svcContainer">
          <p className="svcSmallTitle">Municipal Services</p>
          <h2 className="svcMainTitle">
            Everything you need <br /> from your municipality
          </h2>

          <div className="svcGrid">
            {services.map((service, index) => (
              <div className="svcCard" key={index}>
                <div className="svcTopIcon">{service.icon}</div>
                <h3 className="svcCardTitle">{service.title}</h3>
                <p className="svcCardText">{service.description}</p>
                <button
                  className="svcArrow"
                  aria-label="open"
                  type="button"
                  onClick={() => navigate(service.route)}
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="enSection">
        <div className="enContainer">
          <p className="enSmallTitle">Events &amp; News</p>
          <h2 className="enMainTitle">Stay up to date</h2>

          <div className="enTabsRow">
            <button
              className={`enTab ${tab === "events" ? "enTabActive" : ""}`}
              onClick={() => setTab("events")}
              type="button"
            >
              Events
            </button>

            <button
              className={`enTab ${tab === "news" ? "enTabActive" : ""}`}
              onClick={() => setTab("news")}
              type="button"
            >
              News
            </button>

            <button
              className={`enTab ${tab === "post" ? "enTabActive" : ""}`}
              onClick={() => setTab("post")}
              type="button"
            >
              Post an Event
            </button>
          </div>

          {tab !== "post" ? (
            <>
              <div className="enGrid">
                <div className="enCard enCardBig">{cards[0]}</div>
                <div className="enCard enCardBig">{cards[1]}</div>
                <div className="enCard enCardSmall">{cards[2]}</div>
                <div className="enCard enCardWide">{cards[3]}</div>
                <div className="enCard enCardSmall">{cards[4]}</div>
              </div>

              <button
                className="enMoreBtn"
                type="button"
                onClick={() => navigate("/news")}
              >
                See more
              </button>
            </>
          ) : (
            <div className="postWrap">
              <p className="postHeadline">
                Have an event to suggest? Submit it below and we’ll review it
                <br />
                and get back to you.
              </p>

              <div className="postForm">
                <input className="postInput" placeholder="Event Title" />

                <textarea
                  className="postTextarea"
                  placeholder="Briefly describe the event, what will happen, and who it’s for"
                  rows={3}
                />

                <div className="postSplit">
                  <div className="postSplitCell">
                    <span className="postLabel">Start Date</span>
                    <span className="postValue">January 01, 2026</span>
                  </div>

                  <div className="postDivider" />

                  <div className="postSplitCell">
                    <span className="postLabel">Start Time</span>
                    <span className="postValue">05:00 PM</span>
                  </div>
                </div>

                <div className="postSplit">
                  <div className="postSplitCell">
                    <span className="postLabel">End Date</span>
                    <span className="postValue">
                      January 31, 2026 <span className="postCaret">▾</span>
                    </span>
                  </div>

                  <div className="postDivider" />

                  <div className="postSplitCell">
                    <span className="postLabel">End Time</span>
                    <span className="postValue">
                      09:00 PM <span className="postCaret">▾</span>
                    </span>
                  </div>
                </div>

                <button className="postBtn" type="button">
                  Add Event
                </button>
                <button className="postBtn" type="button">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="team" className="teamSection">
        <div className="teamContainer">
          <div className="teamHeader">
            <span className="teamSmallTitle">Our Team</span>
            <h2 className="teamMainTitle">Meet the team</h2>
          </div>

          <div className="teamSliderWrap">
            <button
              className="teamNavBtn teamNavLeft"
              onClick={prevMember}
              type="button"
              aria-label="Previous member"
            >
              ←
            </button>

            <button
              className="teamNavBtn teamNavRight"
              onClick={nextMember}
              type="button"
              aria-label="Next member"
            >
              →
            </button>

            <div className="teamProfileCard">
              <div className="teamProfileText">
                <h3 className="teamName">{activeMember.name}</h3>
                <p className="teamRole">{activeMember.role}</p>

                <p className="teamBio">{activeMember.bio}</p>

                <div className="teamContactList">
                  <div className="teamContactItem">
                    <span className="teamContactIcon">📞</span>
                    <span className="teamContactText">{activeMember.phone}</span>
                  </div>

                  <div className="teamContactItem">
                    <span className="teamContactIcon">✉️</span>
                    <span className="teamContactText">{activeMember.email}</span>
                  </div>
                </div>
              </div>

              <div className="teamProfileImageWrap">
                <div className="teamImageBlob"></div>
                <img
                  src={activeMember.image}
                  alt={activeMember.name}
                  className="teamProfileImage"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contactSection">
        <div className="contactContainer">
          <p className="contactSmallTitle">Contact Us</p>
          <h2 className="contactMainTitle">Drop your feedback</h2>

          <div className="contactGrid">
            <div className="contactFormCard">
              <h3 className="contactCardTitle">Send us a message</h3>
              <p className="contactCardSub">
                Reach out to us anytime, we’re happy to help.
              </p>

              <div className="contactForm">
                <div className="contactRow2">
                  <div className="contactField">
                    <label className="contactLabel">First Name</label>
                    <input
                      className="contactInput"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div className="contactField">
                    <label className="contactLabel">Last Name</label>
                    <input
                      className="contactInput"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="contactRow2">
                  <div className="contactField">
                    <label className="contactLabel">Email</label>
                    <input
                      className="contactInput"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="contactField">
                    <label className="contactLabel">Contact Details</label>

                    <div className="contactPhoneWrap">
                      <div className="contactPrefix">+961</div>
                      <input
                        className="contactPhoneInput"
                        placeholder="Enter your number"
                      />
                    </div>
                  </div>
                </div>

                <div className="contactField">
                  <label className="contactLabel">Message</label>
                  <textarea
                    className="contactTextarea"
                    placeholder="Enter your message"
                    rows={4}
                  />
                </div>

                <div className="contactBtnRow">
                  <button className="contactBtn" type="button">
                    Send message
                  </button>
                </div>
              </div>
            </div>

            <div className="contactInfoCard">
              <h3 className="contactInfoTitle">
                Hi! We are always here to help you
              </h3>

              <div className="contactInfoList">
                <div className="contactInfoItem">
                  <div className="contactInfoIcon">🎧</div>
                  <div>
                    <p className="contactInfoLabel">Hotline</p>
                    <p className="contactInfoValue">+961 12 345 678</p>
                  </div>
                </div>

                <div className="contactInfoItem">
                  <div className="contactInfoIcon">💬</div>
                  <div>
                    <p className="contactInfoLabel">SMS/Whatsapp</p>
                    <p className="contactInfoValue">+961 12 345 678</p>
                  </div>
                </div>

                <div className="contactInfoItem">
                  <div className="contactInfoIcon">✉️</div>
                  <div>
                    <p className="contactInfoLabel">Email</p>
                    <p className="contactInfoValue">janedoe@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {aiOpen && (
        <div className="aiModalOverlay" onClick={() => setAiOpen(false)}>
          <div className="aiModalCard" onClick={(e) => e.stopPropagation()}>
            <div className="aiModalBar">
              <h2 className="aiModalBarTitle">Ask our AI anything</h2>

              <button
                className="aiModalCloseBtn"
                type="button"
                onClick={() => setAiOpen(false)}
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <div className="aiModalBody">
              <div className="aiModalHeaderIconWrap">
                <Bot size={34} />
              </div>

              <div className="aiModalChatArea">
                <div className="aiModalMessageGroup meGroup">
                  <span className="aiModalSender meSender">ME</span>
                  <div className="aiModalBubble meBubble">
                    How do I submit a complaint?
                  </div>
                </div>

                <div className="aiModalMessageGroup botGroup">
                  <span className="aiModalSender botSender">AI</span>
                  <div className="aiModalBubble botBubble">
                    <p>
                      You can submit a complaint directly through the platform in
                      a few simple steps:
                    </p>
                    <ol>
                      <li>Log in to your account.</li>
                      <li>Go to Services and select Complaints &amp; Feedback.</li>
                      <li>Click Submit a Complaint.</li>
                      <li>
                        Fill in the required details (subject, description, and
                        location if needed).
                      </li>
                      <li>Attach any photos or documents if relevant.</li>
                      <li>Press Send.</li>
                    </ol>
                    <p>
                      After submission, you’ll receive a notification once your
                      complaint is reviewed or updated. You can also track its
                      status from My Activities in your profile.
                    </p>
                  </div>
                </div>
              </div>

              <div className="aiModalSuggestions">
                <p className="aiModalSuggestionsTitle">
                  Suggestions on what to ask
                </p>

                <div className="aiModalSuggestionList">
                  <button className="aiModalSuggestionBtn" type="button">
                    How do I submit a complaint?
                  </button>
                  <button className="aiModalSuggestionBtn" type="button">
                    What documents are needed for property tax?
                  </button>
                  <button className="aiModalSuggestionBtn" type="button">
                    Where do I pay municipal fees?
                  </button>
                </div>
              </div>

              <div className="aiModalInputWrap">
                <input
                  type="text"
                  className="aiModalInput"
                  placeholder="Ask me anything ......."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                />
                <button
                  className="aiModalSendBtn"
                  type="button"
                  aria-label="Send message"
                >
                  <SendHorizonal size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
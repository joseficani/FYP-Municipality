import "./MainContent.css";

import { useState } from "react";

import heroImg from "../../assets/KaaElRimHero.png";
 
// ✅ add team images (create these files in src/assets/)

import team1 from "../../assets/profile1.png";

import team2 from "../../assets/profile2.png";

import team3 from "../../assets/profile1.png";
 
export default function MainContent() {

  const [tab, setTab] = useState("events");
 
  const cards =

    tab === "events"

      ? ["event 1", "event 2", "event 3", "event 4", "event 5"]

      : ["news 1", "news 2", "news 3", "news 4", "news 5"];
 
  // ✅ Team slider state

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
 
  const [memberIndex, setMemberIndex] = useState(0);

  const activeMember = teamMembers[memberIndex];
 
  const prevMember = () => {

    setMemberIndex((i) => (i - 1 + teamMembers.length) % teamMembers.length);

  };
 
  const nextMember = () => {

    setMemberIndex((i) => (i + 1) % teamMembers.length);

  };
 
  return (
<main id="home">

      {/* HERO */}
<section className="hero">
<img className="heroBg" src={heroImg} alt="Kaa El Rim" />
<div className="heroShade" />
 
        <div className="heroCenter">
<div className="heroGlass">
<h1 className="heroTitle">Welcome user to Kaa EL Rim Municipality</h1>
<button className="heroBtn">Find Out More</button>
</div>
</div>
 
        <div className="heroSearchWrap">
<div className="heroSearchPill">
<div className="heroField heroFieldGrow">
<span className="heroIcon">🔎</span>
<input

                className="heroInput"

                placeholder="Search for whatever you need..."

              />
</div>
 
            <div className="heroDivider" />
 
            <button className="heroSelect" type="button">

              All Status <span className="caret">▾</span>
</button>
 
            <div className="heroDivider" />
 
            <button className="heroSelect" type="button">

              Filter by tag <span className="caret">▾</span>
</button>
</div>
</div>
 
        <button className="aiFloat" aria-label="AI chat">
<span className="aiBadge">AI</span>
<span className="aiChat">💬</span>
</button>
</section>
 
      {/* SERVICES SECTION */}
<section id="services" className="svcSection">
<div className="svcContainer">
<p className="svcSmallTitle">Municipal Services</p>
<h2 className="svcMainTitle">

            Everything you need <br /> from your municipality
</h2>
 
          <div className="svcGrid">
<div className="svcCard">
<div className="svcTopIcon">💰</div>
<h3 className="svcCardTitle">Taxes & Fees</h3>
<p className="svcCardText">View municipal taxes, fees</p>
<button className="svcArrow" aria-label="open">

                →
</button>
</div>
 
            <div className="svcCard">
<div className="svcTopIcon">🪪</div>
<h3 className="svcCardTitle">License & Permits</h3>
<p className="svcCardText">

                Apply for permits, pin locations on the map, upload documents, and track approval

                status.
</p>
<button className="svcArrow" aria-label="open">

                →
</button>
</div>
 
            <div className="svcCard">
<div className="svcTopIcon">🗣️</div>
<h3 className="svcCardTitle">Complaints</h3>
<p className="svcCardText">

                Report issues in your area, track their status, and follow up
</p>
<button className="svcArrow" aria-label="open">

                →
</button>
</div>
 
            <div className="svcCard">
<div className="svcTopIcon">📄</div>
<h3 className="svcCardTitle">Certificates & Requests</h3>
<p className="svcCardText">

                Request official documents and certificates
</p>
<button className="svcArrow" aria-label="open">

                →
</button>
</div>
</div>
</div>
</section>
 
      {/* EVENTS & NEWS */}
<section id="news" className="enSection">
<div className="enContainer">
<p className="enSmallTitle">Events &amp; News</p>
<h2 className="enMainTitle">Stay up to date</h2>
 
          {/* Tabs row */}
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
 
          {/* Content */}

          {tab !== "post" ? (
<>
<div className="enGrid">
<div className="enCard enCardBig">{cards[0]}</div>
<div className="enCard enCardBig">{cards[1]}</div>
 
                <div className="enCard enCardSmall">{cards[2]}</div>
<div className="enCard enCardWide">{cards[3]}</div>
<div className="enCard enCardSmall">{cards[4]}</div>
</div>
 
              <button className="enMoreBtn" type="button">

                See More ...
</button>
</>

          ) : (
<div className="postWrap">
<p className="postHeadline">

                Have an event to suggest? Submit it below and we’ll review it <br />

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
 
                <button className="postBtn" type="button">Add Event</button>
<button className="postBtn" type="button">Cancel</button>
</div>
</div>

          )}
</div>
</section>
 
      {/* OUR TEAM */}
<section id="team" className="teamSection">
<div className="teamContainer">
<p className="teamSmallTitle">Our Team</p>
<h2 className="teamMainTitle">Meet the team</h2>
 
          <div className="teamCard">
<button

              className="teamArrow teamArrowLeft"

              onClick={prevMember}

              type="button"

              aria-label="Previous member"
>

              ←
</button>
 
            <div className="teamContent">
<div className="teamLeft">
<h3 className="teamName">{activeMember.name}</h3>
<p className="teamRole">{activeMember.role}</p>
 
                <p className="teamBio">{activeMember.bio}</p>
 
                <div className="teamContact">
<div className="teamContactRow">
<span className="teamIcon" aria-hidden>📞</span>
<span className="teamContactText">{activeMember.phone}</span>
</div>
 
                  <div className="teamContactRow">
<span className="teamIcon" aria-hidden>✉️</span>
<span className="teamContactText">{activeMember.email}</span>
</div>
</div>
</div>
 
              <div className="teamRight">
<img

                  className="teamImg"

                  src={activeMember.image}

                  alt={activeMember.name}

                />
</div>
</div>
 
            <button

              className="teamArrow teamArrowRight"

              onClick={nextMember}

              type="button"

              aria-label="Next member"
>

              →
</button>
</div>
</div>
</section>

{/* CONTACT */}
<section id="contact" className="contactSection">
<div className="contactContainer">
<p className="contactSmallTitle">Contact Us</p>
<h2 className="contactMainTitle">Drop your feedback</h2>
 
    <div className="contactGrid">
      {/* LEFT: FORM CARD */}
<div className="contactFormCard">
<h3 className="contactCardTitle">Send us a message</h3>
<p className="contactCardSub">
          Reach out to us anytime, we’re happy to help.
</p>
 
        <div className="contactForm">
          {/* Row 1 */}
<div className="contactRow2">
<div className="contactField">
<label className="contactLabel">First Name</label>
<input className="contactInput" placeholder="Enter your first name" />
</div>
 
            <div className="contactField">
<label className="contactLabel">Last Name</label>
<input className="contactInput" placeholder="Enter your last name" />
</div>
</div>
 
          {/* Row 2 */}
<div className="contactRow2">
<div className="contactField">
<label className="contactLabel">Email</label>
<input className="contactInput" placeholder="Enter your email" />
</div>
 
            <div className="contactField">
<label className="contactLabel">Contact Details</label>
 
              <div className="contactPhoneWrap">
<div className="contactPrefix">+961</div>
<input className="contactPhoneInput" placeholder="Enter your number" />
</div>
</div>
</div>
 
          {/* Message */}
<div className="contactField">
<label className="contactLabel">Message</label>
<textarea
              className="contactTextarea"
              placeholder="Enter your message"
              rows={4}
            />
</div>
 
          {/* Button */}
<div className="contactBtnRow">
<button className="contactBtn" type="button">
              Send message
</button>
</div>
</div>
</div>
 
      {/* RIGHT: GREEN INFO CARD */}
<div className="contactInfoCard">
<h3 className="contactInfoTitle">Hi! We are always here to help you</h3>
 
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
</main>

  );

}
 
import React from "react";
import "./ProfilePage.css";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProfileSidebar from "../components/Profile/ProfileSideBar";
import ActivitySection from "../components/Profile/ActivitySection";

export default function ProfilePage() {
  return (
    <div className="profile-page-shell">
      <Header solid/>

      <main className="profile-main">
        <div className="profile-page-top">
          <h1 className="profile-page-title">My Dashboard</h1>
          <p className="profile-page-subtitle">
            Manage your personal information and municipal activities.
          </p>
        </div>

        <div className="profile-layout">
          <div className="profile-left-col">
            <ProfileSidebar />
          </div>

          <div className="profile-right-col">
            <ActivitySection />

            <div className="profile-extra-grid">
              <div className="profile-events-card">
                <h3 className="profile-card-heading">Upcoming Events</h3>

                <div className="profile-event-list">
                  <div className="profile-event-item">
                    <div className="profile-event-date">
                      <span className="profile-event-month">Nov</span>
                      <span className="profile-event-day">15</span>
                    </div>

                    <div>
                      <h4 className="profile-event-title">Town Hall Meeting</h4>
                      <p className="profile-event-text">
                        Discussing new park renovations and budget allocation.
                      </p>
                    </div>
                  </div>

                  <div className="profile-event-item">
                    <div className="profile-event-date">
                      <span className="profile-event-month">Nov</span>
                      <span className="profile-event-day">22</span>
                    </div>

                    <div>
                      <h4 className="profile-event-title">Recycling Workshop</h4>
                      <p className="profile-event-text">
                        Learn about the new recycling guidelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-support-card">
                <div className="profile-support-content">
                  <h3>Need Assistance?</h3>
                  <p>
                    Our support team is available Mon-Fri, 9am - 5pm to help you
                    with any municipal services.
                  </p>
                  <button type="button">Contact Support</button>
                </div>

                <div className="profile-support-circle big"></div>
                <div className="profile-support-circle small"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
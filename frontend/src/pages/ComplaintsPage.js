import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Complaints from "../components/Complaints/Complaint";

export default function CertificatesPage() {
  return (
    <div className="cert-page-shell">
      <Header />
      <Complaints />
      <Footer />
    </div>
  );
}
import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CertificatesModule from "../components/Certificates/CertificatesModule";
import "../components/Certificates/CertificatesModule.css";

export default function CertificatesPage() {
  return (
    <div className="cert-page-shell">
      <Header />
      <CertificatesModule />
      <Footer />
    </div>
  );
}
import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import RegisterModule from "../components/Register/RegisterModule";
import "../components/Register/RegisterModule.css";

export default function RegisterPage() {
  return (
    <div className="register-page-shell">
      <Header solid />
      <RegisterModule />
      <Footer />
    </div>
  );
}
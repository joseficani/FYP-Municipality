import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TaxesModule from "../components/Taxes/TaxesModule";
import "../components/Taxes/TaxesModule.css";

export default function TaxesFeesPage() {
  return (
    <div className="taxes-page-shell">
      <Header />
      <TaxesModule />
      <Footer />
    </div>
  );
}
import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TransactionsModule from "../components/Transactions/TransactionsModule";
import "../components/Transactions/TransactionsModule.css";

export default function TransactionsPage() {
  return (
    <div className="trx-page-shell">
      <Header />
      <TransactionsModule />
      <Footer />
    </div>
  );
}
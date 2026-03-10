import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AfterLoginPage from "./pages/AfterLoginPage";
import Login from "./components/BeforeLogin/Login";
import SignUp from "./components/BeforeLogin/SignUp";
import BeforeLoginPage from "./pages/BeforeLoginPage";
import NewsPage from "./pages/NewsPage";
import DetailsNews from "./pages/DetailsNewsPage";
import LicensesPermits from "./pages/LicensesPermitsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BeforeLoginPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<AfterLoginPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<DetailsNews />} />
        <Route path="/licenses-permits" element={<LicensesPermits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
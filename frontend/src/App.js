import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AfterLoginPage from "./pages/AfterLoginPage";
import NewsPage from "./pages/NewsPage";
import DetailsNews from "./pages/DetailsNewsPage";
import AIAssistant from "./pages/AIAssistantPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AfterLoginPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<DetailsNews />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
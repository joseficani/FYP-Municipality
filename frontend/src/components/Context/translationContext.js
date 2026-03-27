import { createContext, useContext, useEffect, useState } from "react";

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    localStorage.setItem("lang", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const translateBatch = async (texts, targetLanguage) => {
    try {
      const res = await fetch("http://localhost:5000/api/translate/batch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          texts,
          sourceLanguage: targetLanguage === "ar" ? "en" : "ar",
          targetLanguage,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const mapped = {};
        texts.forEach((text, index) => {
          mapped[text] = data.translations[index] || text;
        });
        setTranslations((prev) => ({ ...prev, ...mapped }));
      }
    } catch (error) {
      console.error("Batch translation failed:", error);
    }
  };

  const registerTexts = async (texts) => {
    if (language === "en") return;

    const uniqueTexts = [...new Set(texts)].filter(
      (text) => text && !translations[text]
    );

    if (uniqueTexts.length > 0) {
      await translateBatch(uniqueTexts, language);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const t = (text) => {
    if (language === "en") return text;
    return translations[text] || text;
  };

  return (
    <TranslationContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        registerTexts,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
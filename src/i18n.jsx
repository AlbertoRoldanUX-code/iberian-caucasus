import { createContext, useContext, useEffect, useState } from "react";
import { copy } from "./copy";

const LanguageContext = createContext(null);
const STORAGE_KEY = "ic-lang";

function readLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "ka") return stored;
  } catch {
    /* storage unavailable */
  }
  if (typeof navigator !== "undefined" && /^ka\b/i.test(navigator.language || "")) return "ka";
  return "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readLang);

  function setLang(next) {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }

  useEffect(() => {
    const text = copy[lang];
    document.documentElement.lang = lang;
    document.title = text.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", text.meta.description);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: copy[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useI18n must be used within LanguageProvider");
  return value;
}

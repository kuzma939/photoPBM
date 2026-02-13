"use client";

import { useState, useEffect, createContext, useContext } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    // English is the default language
    const [language, setLanguage] = useState("EN");
    const [translations, setTranslations] = useState({});

    // Завантаження перекладів
    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const res = await fetch("/locales/translations.json");
                if (!res.ok) throw new Error("Failed to fetch translations");
                const data = await res.json();
                setTranslations(data);
            } catch (error) {
                console.error("Error loading translations:", error);
            }
        };

        fetchTranslations();
    }, []);

    // Функція перекладу
    const translateList = (page, component) => {
        return translations[language]?.[page]?.[component] || "Missing translation";
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translateList }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Хук для доступу до контексту
export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return context;
};

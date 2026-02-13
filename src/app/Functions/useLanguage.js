"use client";

import { useState, useEffect, createContext, useContext } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    // Always initialize with EN to avoid hydration mismatch
    const [language, setLanguage] = useState("EN");
    const [translations, setTranslations] = useState({});

    // Load saved language from localStorage after hydration
    useEffect(() => {
        const savedLanguage = localStorage.getItem("preferredLanguage");
        if (savedLanguage && savedLanguage !== language) {
            setLanguage(savedLanguage);
        }
    }, []);

    // Save language to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("preferredLanguage", language);
    }, [language]);

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

"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Locale, LOCALES, translations, Translations } from "./translations"

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

const STORAGE_KEY = "meesho_locale"
const COOKIE_NAME = "NEXT_LOCALE"

export function LocaleProvider({
  children,
  defaultLocale = "en",
}: {
  children: React.ReactNode
  defaultLocale?: Locale
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    // Check localStorage first
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null
      if (saved && (saved === "en" || saved === "hi")) {
        setLocaleState(saved)
        document.documentElement.lang = saved
        return
      }

      // Check cookie
      const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`))
      if (match && (match[2] === "en" || match[2] === "hi")) {
        setLocaleState(match[2] as Locale)
        document.documentElement.lang = match[2]
      }
    } catch {
      // Ignore errors on client storage
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem(STORAGE_KEY, newLocale)
      document.cookie = `${COOKIE_NAME}=${newLocale};path=/;max-age=31536000;SameSite=Lax`
      document.documentElement.lang = newLocale
    } catch {
      // Ignore
    }
  }

  const t = translations[locale] || translations.en

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}

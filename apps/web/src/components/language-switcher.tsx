"use client"

import { useState, useRef, useEffect } from "react"
import { useLocale } from "@/lib/locale-context"
import { LOCALES, Locale } from "@/lib/translations"
import { Globe, ChevronDown, Check } from "lucide-react"

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const current = LOCALES.find((l) => l.code === locale) || LOCALES[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-input bg-background/80 hover:bg-secondary text-xs font-semibold text-foreground transition-all shadow-2xs hover:border-pink-500/50"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={t.nav.selectLanguage}
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="hidden sm:inline font-medium">{current.nativeName}</span>
        <span className="sm:hidden font-medium">{current.code.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl border bg-card p-1 shadow-lg ring-1 ring-black/5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            {t.nav.selectLanguage}
          </div>
          {LOCALES.map((item) => {
            const isSelected = item.code === locale
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLocale(item.code)
                  setIsOpen(false)
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-pink-50 text-pink-700 font-semibold dark:bg-pink-950/40 dark:text-pink-300"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm leading-none">{item.flag}</span>
                  <span>{item.nativeName}</span>
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 text-pink-600" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

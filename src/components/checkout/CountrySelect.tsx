"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { COUNTRIES, type Country } from "@/constants/countries";

interface CountrySelectProps {
  value: Country["code"];
  onChange: (country: Country) => void;
  className?: string;
}

export function CountrySelect({ value, onChange, className = "" }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRIES.find((c) => c.code === value) || COUNTRIES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const search = query.trim().toLowerCase();
  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search) ||
      `+${c.dialCode}`.includes(search) ||
      c.code.toLowerCase().includes(search)
  );

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        aria-label={`Country calling code: ${selected.name} +${selected.dialCode}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between rounded-lg border border-light bg-white px-3 text-sm transition-colors hover:border-brand focus:border-brand focus:outline-none"
      >
        <span className="flex items-center gap-2">
          <ReactCountryFlag svg countryCode={selected.code} aria-label={selected.name} style={{ width: "1.5em", height: "1em" }} />
          <span className="font-medium text-deep">+{selected.dialCode}</span>
        </span>
        <ChevronDown className={`h-4 w-4 text-steel transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-64 w-72 rounded-xl border border-light bg-white p-2 shadow-raised">
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-steel" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country..."
              aria-label="Search country or calling code"
              className="h-9 w-full rounded-md border border-light pl-8 pr-7 text-xs text-deep focus:border-brand focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear country search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-steel hover:text-deep"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="max-h-48 overflow-y-auto divide-y divide-light/50">
            {filtered.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  onChange(item);
                  setIsOpen(false);
                  setQuery("");
                }}
                className={`flex w-full items-center justify-between px-2.5 py-2 text-left text-xs transition-colors hover:bg-ice ${
                  selected.code === item.code ? "bg-ice/80 font-medium text-brand" : "text-deep"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ReactCountryFlag svg countryCode={item.code} aria-label={item.name} style={{ width: "1.5em", height: "1em", flexShrink: 0 }} />
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="text-steel font-mono">+{item.dialCode}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="py-4 text-center text-xs text-steel">No country found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

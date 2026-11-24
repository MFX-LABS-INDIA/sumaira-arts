"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
const SHORT_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function parseIsoDate(iso: string): { year: number; month: number; day: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const year = Number(m[1]);
  const month = Number(m[2]) - 1;
  const day = Number(m[3]);
  if (month < 0 || month > 11 || day < 1 || day > 31) return null;
  return { year, month, day };
}

function formatIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatDisplayDate(iso: string): string {
  const parsed = parseIsoDate(iso);
  if (!parsed) return "";
  return `${parsed.day} ${SHORT_MONTHS[parsed.month]} ${parsed.year}`;
}

export function getTodayLocalIso(): string {
  const now = new Date();
  return formatIsoDate(now.getFullYear(), now.getMonth(), now.getDate());
}

interface PopoverPosition {
  top: number;
  left: number;
  width: number;
}

interface DatePickerFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  minDate?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function DatePickerField({
  id,
  name,
  value,
  onChange,
  minDate,
  placeholder = "Select a date",
  required = false,
  className = "",
}: DatePickerFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PopoverPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const todayIso = getTodayLocalIso();
  const minParsed = minDate ? parseIsoDate(minDate) : null;

  const [view, setView] = useState<{ year: number; month: number }>(() => {
    const initial = parseIsoDate(value) ?? parseIsoDate(todayIso)!;
    return { year: initial.year, month: initial.month };
  });

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 12;

    const isMobile = vw < 640;
    const width = isMobile ? rect.width : Math.min(312, vw - margin * 2);
    const left = isMobile
      ? rect.left
      : Math.max(margin, Math.min(rect.left, vw - width - margin));

    const measuredHeight = popoverRef.current?.offsetHeight || 360;
    const popoverHeight = Math.min(measuredHeight, vh - margin * 2);
    const spaceBelow = vh - rect.bottom - margin;
    const spaceAbove = rect.top - margin;

    const top =
      spaceBelow >= popoverHeight || spaceBelow >= spaceAbove
        ? Math.max(margin, Math.min(rect.bottom + 6, vh - popoverHeight - margin))
        : Math.max(margin, rect.top - popoverHeight - 6);

    setPosition((prev) =>
      prev && prev.top === top && prev.left === left && prev.width === width
        ? prev
        : { top, left, width },
    );
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen, view.month, view.year, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = (event: Event) => {
      if (
        popoverRef.current &&
        event.target instanceof Node &&
        popoverRef.current.contains(event.target)
      ) {
        return;
      }
      updatePosition();
    };

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!isOpen) {
      const anchor = parseIsoDate(value) ?? parseIsoDate(todayIso)!;
      setView({ year: anchor.year, month: anchor.month });
      setPosition(null);
    }
    setIsOpen((prev) => !prev);
  };

  const canGoPrev =
    !minParsed ||
    view.year > minParsed.year ||
    (view.year === minParsed.year && view.month > minParsed.month);

  const goPrevMonth = () => {
    if (!canGoPrev) return;
    setView((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: prev.month - 1 },
    );
  };

  const goNextMonth = () => {
    setView((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: prev.month + 1 },
    );
  };

  const firstWeekday = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells: Array<number | null> = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isTodaySelectable = !minDate || todayIso >= minDate;
  const displayLabel = value ? formatDisplayDate(value) : "";

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <input type="hidden" name={name} value={value} />
      {required && (
        <input
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          required
          value={value}
          onChange={() => {}}
          onFocus={() => triggerRef.current?.focus()}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full opacity-0"
        />
      )}

      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={`${id}-calendar`}
        onClick={handleToggle}
        className={`flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-control border bg-white px-3.5 text-sm transition-all duration-200 sm:h-12 ${
          isOpen
            ? "border-brand ring-2 ring-brand/15 outline-none"
            : "border-light hover:border-brand/50 focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none"
        }`}
      >
        <span
          className={`truncate text-start ${
            displayLabel ? "text-deep" : "text-steel/80"
          }`}
        >
          {displayLabel || placeholder}
        </span>
        <Calendar
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 transition-colors ${
            isOpen ? "text-brand" : "text-steel"
          }`}
        />
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={popoverRef}
            id={`${id}-calendar`}
            role="dialog"
            aria-label="Choose date"
            data-lenis-prevent
            style={
              position
                ? {
                    top: position.top,
                    left: position.left,
                    width: position.width,
                  }
                : { top: -9999, left: -9999, width: 312, visibility: "hidden" }
            }
            className="subtle-scrollbar fixed z-[80] max-h-[calc(100dvh-24px)] overflow-y-auto overscroll-contain rounded-2xl border border-light bg-white p-3.5 shadow-raised ring-1 ring-brand/10 sm:p-4"
          >
            {/* Month Header */}
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={goPrevMonth}
                disabled={!canGoPrev}
                aria-label="Previous month"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-light text-deep transition-colors hover:border-brand hover:bg-ice hover:text-brand disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-light disabled:hover:bg-white sm:h-8 sm:w-8"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </button>

              <span className="font-serif text-base font-medium text-deep">
                {MONTHS[view.month]} {view.year}
              </span>

              <button
                type="button"
                onClick={goNextMonth}
                aria-label="Next month"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-light text-deep transition-colors hover:border-brand hover:bg-ice hover:text-brand sm:h-8 sm:w-8"
              >
                <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              </button>
            </div>

            {/* Weekday Labels */}
            <div className="mt-3 grid grid-cols-7 text-center">
              {WEEKDAYS.map((day) => (
                <span
                  key={day}
                  className="py-1 text-[10px] font-semibold uppercase tracking-wider text-steel/80"
                >
                  {day}
                </span>
              ))}
            </div>

            {/* Days Grid */}
            <div className="mt-1 grid grid-cols-7 gap-1">
              {cells.map((day, index) => {
                if (day === null) {
                  return <span key={`empty-${index}`} aria-hidden="true" />;
                }

                const iso = formatIsoDate(view.year, view.month, day);
                const isDisabled = Boolean(minDate && iso < minDate);
                const isSelected = iso === value;
                const isToday = iso === todayIso;

                return (
                  <button
                    key={iso}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      onChange(iso);
                      setIsOpen(false);
                    }}
                    aria-label={formatDisplayDate(iso)}
                    aria-pressed={isSelected}
                    className={`flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 sm:h-9 sm:text-xs ${
                      isSelected
                        ? "cursor-pointer bg-brand text-white shadow-xs"
                        : isDisabled
                          ? "cursor-not-allowed text-steel/35"
                          : isToday
                            ? "cursor-pointer bg-ice/70 text-brand ring-1 ring-brand/40 hover:bg-brand hover:text-white"
                            : "cursor-pointer text-deep hover:bg-ice hover:text-brand"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Footer Quick Actions */}
            <div className="mt-3 flex items-center justify-between border-t border-light pt-2.5">
              <button
                type="button"
                onClick={() => {
                  if (!isTodaySelectable) return;
                  onChange(todayIso);
                  setIsOpen(false);
                }}
                disabled={!isTodaySelectable}
                className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-brand transition-colors hover:bg-ice disabled:cursor-not-allowed disabled:opacity-40"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className="cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium text-steel transition-colors hover:bg-ice hover:text-deep"
              >
                Clear
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

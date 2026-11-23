"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";

export type SelectOption =
  | string
  | {
      value: string;
      label: string;
      hint?: string;
    };

interface NormalizedOption {
  value: string;
  label: string;
  hint?: string;
}

interface ListboxPosition {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
}

function normalizeOptions(options: readonly SelectOption[]): NormalizedOption[] {
  return options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt,
  );
}

interface SelectFieldProps {
  id: string;
  name: string;
  options: readonly SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function SelectField({
  id,
  name,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  ariaLabel,
  className = "",
}: SelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<ListboxPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);

  const normalized = normalizeOptions(options);
  const selected = value
    ? normalized.find((item) => item.value === value)
    : undefined;

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const vh = window.innerHeight;
    const margin = 12;

    const spaceBelow = vh - rect.bottom - margin;
    const spaceAbove = rect.top - margin;
    const openBelow = spaceBelow >= 200 || spaceBelow >= spaceAbove;

    const maxHeight = openBelow
      ? Math.min(256, Math.max(120, spaceBelow - 6))
      : Math.min(256, Math.max(120, spaceAbove - 6));

    const measuredHeight = listboxRef.current?.scrollHeight || maxHeight;
    const visibleHeight = Math.min(measuredHeight, maxHeight);

    const top = openBelow
      ? Math.max(margin, Math.min(rect.bottom + 6, vh - visibleHeight - margin))
      : Math.max(margin, rect.top - visibleHeight - 6);

    const left = rect.left;
    const width = rect.width;

    setPosition((prev) =>
      prev &&
      prev.top === top &&
      prev.left === left &&
      prev.width === width &&
      prev.maxHeight === maxHeight
        ? prev
        : { top, left, width, maxHeight },
    );
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = (event: Event) => {
      if (
        listboxRef.current &&
        event.target instanceof Node &&
        listboxRef.current.contains(event.target)
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
        listboxRef.current?.contains(target)
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        setPosition(null);
        setIsOpen(true);
        return;
      }
      const idx = selected
        ? normalized.findIndex((o) => o.value === selected.value)
        : -1;
      const delta = event.key === "ArrowDown" ? 1 : -1;
      const nextIdx =
        idx === -1
          ? event.key === "ArrowDown"
            ? 0
            : normalized.length - 1
          : (idx + delta + normalized.length) % normalized.length;
      if (normalized[nextIdx]) {
        onChange(normalized[nextIdx].value);
      }
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      setPosition(null);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={containerRef} className={`relative min-w-0 w-full ${className}`}>
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
        role="combobox"
        aria-label={ariaLabel}
        aria-required={required || undefined}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={`flex h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-control border bg-white px-3.5 text-sm text-deep transition-all duration-200 sm:h-12 ${
          isOpen
            ? "border-brand ring-2 ring-brand/15 outline-none"
            : "border-light hover:border-brand/50 focus:border-brand focus:ring-2 focus:ring-brand/15 focus:outline-none"
        }`}
      >
        <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <span
            className={`truncate text-start font-normal ${
              selected ? "text-deep" : "text-steel/80"
            }`}
          >
            {selected ? selected.label : placeholder}
          </span>
          {selected?.hint && (
            <span className="shrink-0 rounded-full bg-ice px-2 py-0.5 font-mono text-[11px] font-medium text-brand">
              {selected.hint}
            </span>
          )}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-steel transition-transform duration-200 ${
            isOpen ? "rotate-180 text-brand" : ""
          }`}
        />
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <ul
            ref={listboxRef}
            id={`${id}-listbox`}
            role="listbox"
            data-lenis-prevent
            aria-labelledby={id}
            style={
              position
                ? {
                    top: position.top,
                    left: position.left,
                    width: position.width,
                    maxHeight: position.maxHeight,
                  }
                : { top: -9999, left: -9999, width: 240, maxHeight: 256, visibility: "hidden" }
            }
            className="subtle-scrollbar fixed z-[80] overflow-y-auto overscroll-contain rounded-xl border border-light bg-white p-1.5 shadow-raised ring-1 ring-brand/10"
          >
            {normalized.map((item) => {
              const isSelected = selected !== undefined && item.value === selected.value;
              return (
                <li key={item.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(item.value);
                      setIsOpen(false);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-start text-xs transition-colors sm:text-sm ${
                      isSelected
                        ? "bg-ice/90 font-medium text-brand"
                        : "text-deep hover:bg-ice/60"
                    }`}
                  >
                    <span className="flex-1 leading-snug">{item.label}</span>
                    <span className="flex shrink-0 items-center gap-2">
                      {item.hint && (
                        <span className="font-mono text-[11px] text-steel">
                          {item.hint}
                        </span>
                      )}
                      {isSelected && (
                        <Check
                          className="h-4 w-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
}

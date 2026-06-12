"use client";

import { useEffect, useId, useRef, useState } from "react";

export type PixelDropdownOption<T extends string | number> = {
  value: T;
  label: string;
};

type PixelDropdownProps<T extends string | number> = {
  ariaLabel: string;
  placeholder: string;
  value?: T;
  options: Array<PixelDropdownOption<T>>;
  onChange: (value: T) => void;
};

export function PixelDropdown<T extends string | number>({
  ariaLabel,
  placeholder,
  value,
  options,
  onChange
}: PixelDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function choose(option: PixelDropdownOption<T>) {
    onChange(option.value);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative min-w-0">
      <button
        type="button"
        className={`pixel-dropdown-trigger w-full ${
          isOpen ? "is-open" : ""
        }`}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="min-w-0 truncate">
          {selected?.label || placeholder}
        </span>
        <span className="pixel-dropdown-arrow" aria-hidden="true" />
      </button>

      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className="pixel-dropdown-menu"
        >
          {options.map((option) => (
            <li
              key={String(option.value)}
              role="option"
              aria-selected={option.value === value}
            >
              <button
                type="button"
                className={`pixel-dropdown-option ${
                  option.value === value ? "is-selected" : ""
                }`}
                onClick={() => choose(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

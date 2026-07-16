"use client";

import { IconChevronDown } from "@tabler/icons-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { FlagCZ, FlagSK } from "../Icons";
import styles from "./CountryCodeSelect.module.css";

export type CountryCodeOption = {
  value: string;
  icon: ReactNode;
  label: string;
};

type CountryCodeSelectProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
};

const countryCodes = [
  { value: "+421", icon: <FlagSK />, label: "Slovensko" },
  { value: "+420", icon: <FlagCZ />, label: "Česko" },
];

export function CountryCodeSelect({
  name,
  value,
  onChange,
  ariaLabel,
}: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) {
      setTriggerRect(null);
      return;
    }

    if (triggerRef.current) {
      setTriggerRect(triggerRef.current.getBoundingClientRect());
    }

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !wrapperRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const onWindowEvent = () => setOpen(false);

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onWindowEvent, { capture: true });
    window.addEventListener("resize", onWindowEvent);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onWindowEvent, { capture: true });
      window.removeEventListener("resize", onWindowEvent);
    };
  }, [open]);

  const handleSelect = useCallback(
    (next: string) => {
      onChange(next);
      setOpen(false);
    },
    [onChange],
  );

  const current =
    countryCodes.find((o) => o.value === value) ?? countryCodes[0];

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        <span className={styles.flag}>{current.icon}</span>
        <IconChevronDown
          size={16}
          className={open ? styles.chevronOpen : styles.chevron}
        />
      </button>

      {open &&
        triggerRect &&
        typeof document !== "undefined" &&
        createPortal(
          <ul
            ref={menuRef}
            className={styles.menu}
            role="listbox"
            aria-label={ariaLabel}
            style={{
              top: triggerRect.bottom + 4,
              left: triggerRect.left,
            }}
          >
            {countryCodes.map((option) => {
              const isChecked = option.value === value;
              return (
                <li key={option.value} role="presentation">
                  <label
                    className={`${styles.option} ${isChecked ? styles.optionActive : ""}`}
                  >
                    <input
                      type="radio"
                      name={name}
                      value={option.value}
                      checked={isChecked}
                      onChange={() => handleSelect(option.value)}
                      className={styles.srOnly}
                      tabIndex={-1}
                      aria-label={option.label}
                    />
                    <span className={styles.flag}>{option.icon}</span>
                    <span className={styles.value}>{option.value}</span>
                    <span>{option.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
}

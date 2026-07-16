"use client";

import { IconChevronDown } from "@tabler/icons-react";
import {
  useCallback,
  useEffect,
  useId,
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
  langSelect?: boolean;
  onChange: (value: string) => void;
  ariaLabel: string;
};

const countryCodes: CountryCodeOption[] = [
  { value: "+421", icon: <FlagSK />, label: "Slovensko" },
  { value: "+420", icon: <FlagCZ />, label: "Česko" },
];

const languages: CountryCodeOption[] = [
  { value: "sk", icon: <FlagSK />, label: "Slovensky" },
  { value: "cs", icon: <FlagCZ />, label: "Česky" },
];

export function CountryCodeSelect({
  name,
  value,
  langSelect,
  onChange,
  ariaLabel,
}: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const typeAheadRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const uid = useId();
  const listboxId = `${uid}-listbox`;
  const optionId = (val: string) => `${uid}-opt-${val}`;

  const items = langSelect ? languages : countryCodes;
  const selectedIndex = items.findIndex((o) => o.value === value);

  const closeMenu = useCallback(() => setOpen(false), []);

  const openMenu = useCallback((focusIndex: number) => {
    setActiveIndex(focusIndex >= 0 ? focusIndex : 0);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setTriggerRect(null);
      setActiveIndex(-1);
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
        closeMenu();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    const onWindowEvent = () => closeMenu();

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
  }, [open, closeMenu]);

  const handleSelect = useCallback(
    (next: string) => {
      onChange(next);
      closeMenu();
    },
    [onChange, closeMenu],
  );

  const selectActive = useCallback(() => {
    if (activeIndex >= 0 && activeIndex < items.length) {
      onChange(items[activeIndex].value);
    }
    closeMenu();
  }, [activeIndex, items, onChange, closeMenu]);

  const moveActive = useCallback(
    (delta: number) => {
      setActiveIndex((prev) => {
        const next = prev + delta;
        if (next < 0) return 0;
        if (next >= items.length) return items.length - 1;
        return next;
      });
    },
    [items.length],
  );

  const handleTypeAhead = useCallback(
    (key: string) => {
      clearTimeout(typeAheadRef.current);
      const idx = items.findIndex(
        (o) =>
          o.label.toLowerCase().startsWith(key) ||
          o.value.toLowerCase().startsWith(key),
      );
      if (idx >= 0) setActiveIndex(idx);

      typeAheadRef.current = setTimeout(() => {
        typeAheadRef.current = undefined;
      }, 500);
    },
    [items],
  );

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (open) {
        switch (e.key) {
          case "ArrowDown":
            e.preventDefault();
            moveActive(1);
            break;
          case "ArrowUp":
            e.preventDefault();
            moveActive(-1);
            break;
          case "Home":
            e.preventDefault();
            setActiveIndex(0);
            break;
          case "End":
            e.preventDefault();
            setActiveIndex(items.length - 1);
            break;
          case "Enter":
          case " ":
            e.preventDefault();
            selectActive();
            break;
          case "Escape":
            e.preventDefault();
            closeMenu();
            break;
          default:
            if (e.key.length === 1) {
              handleTypeAhead(e.key.toLowerCase());
            }
        }
      } else {
        switch (e.key) {
          case "ArrowDown":
          case "Enter":
          case " ":
            e.preventDefault();
            openMenu(selectedIndex >= 0 ? selectedIndex : 0);
            break;
          case "ArrowUp":
            e.preventDefault();
            openMenu(selectedIndex >= 0 ? selectedIndex : items.length - 1);
            break;
          default:
            if (e.key.length === 1) {
              const idx = items.findIndex(
                (o) =>
                  o.label.toLowerCase().startsWith(e.key.toLowerCase()) ||
                  o.value.toLowerCase().startsWith(e.key.toLowerCase()),
              );
              if (idx >= 0) handleSelect(items[idx].value);
            }
        }
      }
    },
    [
      open,
      items,
      selectedIndex,
      handleSelect,
      moveActive,
      closeMenu,
      openMenu,
      selectActive,
      handleTypeAhead,
    ],
  );

  const current = selectedIndex >= 0 ? items[selectedIndex] : items[0];

  const activeValue = activeIndex >= 0 ? items[activeIndex]?.value : undefined;

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        className={`${styles.trigger} ${langSelect ? styles.languageSelector : ""}`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          open && activeValue ? optionId(activeValue) : undefined
        }
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
            id={listboxId}
            className={styles.menu}
            role="listbox"
            aria-label={ariaLabel}
            style={{
              top: triggerRect.bottom + 4,
              left: triggerRect.left,
            }}
          >
            {items.map((option, i) => {
              const isChecked = option.value === value;
              const isFocused = i === activeIndex;
              return (
                <li
                  key={option.value}
                  role="option"
                  id={optionId(option.value)}
                  aria-selected={isChecked}
                  className={`${styles.option} ${isChecked ? styles.optionActive : ""} ${isFocused ? styles.optionFocused : ""}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(option.value);
                  }}
                >
                  <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={isChecked}
                    readOnly
                    className={styles.srOnly}
                    tabIndex={-1}
                    aria-label={option.label}
                  />
                  <span className={styles.flag}>{option.icon}</span>
                  {!langSelect && (
                    <span className={styles.value}>{option.value}</span>
                  )}
                  <span>{option.label}</span>
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </div>
  );
}

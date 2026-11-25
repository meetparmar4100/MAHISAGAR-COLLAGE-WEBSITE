import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import collegeLogo from "./college-wordmark.png";
import { destinations, menus } from "./navigation.js";

const hoverQuery = "(min-width: 1321px) and (hover: hover) and (pointer: fine)";

function isMouseHover(event) {
  return event.pointerType === "mouse" && window.matchMedia(hoverQuery).matches;
}

function MenuGroup({ title, entries, topLevel = false, onOpen, onTopic, label }) {
  const groupRef = useRef(null);
  const className = topLevel
    ? title === "Teaching Staff Details"
      ? "nav-group staff-group"
      : title === "New Admission Info." ? "nav-group admission-group" : "nav-group"
    : "nav-subgroup";

  function openOnHover(event) {
    if (!isMouseHover(event)) return;
    onOpen?.(groupRef.current);
    groupRef.current.open = true;
  }

  function closeOnLeave(event) {
    const group = event.currentTarget;
    if (
      isMouseHover(event) &&
      (!group.contains(document.activeElement) ||
        document.activeElement === group.firstElementChild)
    ) {
      group.open = false;
    }
  }

  return (
    <details
      ref={groupRef}
      className={className}
      onPointerLeave={closeOnLeave}
      onToggle={(event) => {
        const group = event.currentTarget;
        if (event.target !== group || !group.open) return;
        onOpen?.(group);
        if (!topLevel && window.matchMedia("(min-width: 1321px)").matches) {
          const submenu = group.lastElementChild;
          const bounds = group.getBoundingClientRect();
          const viewport = document.documentElement.clientWidth;
          group.classList.toggle(
            "submenu-opens-left",
            bounds.right + submenu.offsetWidth + 12 > viewport,
          );
        }
      }}
    >
      <summary onPointerEnter={openOnHover}>
        {!topLevel && destinations[title] ? (
          <a className="nav-group-link" href={destinations[title]}>{title}</a>
        ) : label ?? title}
      </summary>
      <ul className="submenu">
        {entries.map((entry) => {
          const label = Array.isArray(entry) ? entry[0] : entry;
          return (
            <li key={label}>
              {Array.isArray(entry) ? (
                <MenuGroup title={label} entries={entry[1]} onTopic={onTopic} />
              ) : destinations[label] ? (
                <a href={destinations[label]}>{label}</a>
              ) : (
                <button
                  type="button"
                  className="topic-link"
                  onClick={() => onTopic(label)}
                >
                  {label}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [topic, setTopic] = useState(null);
  const menuButton = useRef(null);
  const navigation = useRef(null);
  const dialog = useRef(null);

  function closeGroups(except) {
    navigation.current
      .querySelectorAll(":scope > .nav-group[open]")
      .forEach((group) => {
        if (group !== except) group.open = false;
      });
  }

  function closeNavigation() {
    setMenuOpen(false);
    closeGroups();
  }

  useLayoutEffect(() => {
    const element = dialog.current;
    if (topic !== null && !element.open) element.showModal();
  }, [topic]);

  useEffect(() => {
    const media = window.matchMedia(hoverQuery);

    function dismissOutside(event) {
      if (
        !dialog.current.open &&
        !event.target.closest("#navigation, .menu, #topic-dialog")
      ) {
        closeNavigation();
      }
    }

    function handleEscape(event) {
      if (
        event.key !== "Escape" ||
        dialog.current.open ||
        event.target.closest?.("#topic-dialog")
      )
        return;
      const openGroup = navigation.current.querySelector(".nav-group[open]");
      if (openGroup) {
        const nested = openGroup.querySelector(".nav-subgroup[open]");
        const group = nested ?? openGroup;
        group.open = false;
        group.firstElementChild.focus();
      } else if (menuButton.current.getAttribute("aria-expanded") === "true") {
        closeNavigation();
        menuButton.current.focus();
      }
    }

    document.addEventListener("click", dismissOutside);
    document.addEventListener("keydown", handleEscape);
    media.addEventListener("change", closeNavigation);
    return () => {
      document.removeEventListener("click", dismissOutside);
      document.removeEventListener("keydown", handleEscape);
      media.removeEventListener("change", closeNavigation);
    };
  }, []);

  function clearOnHover(event) {
    if (isMouseHover(event)) closeGroups();
  }

  return (
    <>
      <header>
        <div className="bar">
          <a className="brand" href="/">
            <img
              src={collegeLogo}
              alt="Swaminarayan Medical College, Mahisagar"
              width={2048}
              height={744}
            />
          </a>
          <button
            ref={menuButton}
            className="menu"
            type="button"
            aria-controls="navigation"
            aria-expanded={menuOpen}
            onClick={() => (menuOpen ? closeNavigation() : setMenuOpen(true))}
          >
            Menu
          </button>
          <nav
            ref={navigation}
            className={menuOpen ? "nav open" : "nav"}
            id="navigation"
            aria-label="Main navigation"
            onClick={(event) => {
              if (event.target.closest("a")) closeNavigation();
            }}
          >
            {Object.entries(menus).filter(([title]) => title !== "New Admission Info.").map(([title, entries]) => (
              <MenuGroup
                key={title}
                title={title}
                entries={entries}
                topLevel
                onOpen={closeGroups}
                onTopic={setTopic}
              />
            ))}
            <button
              type="button"
              className="topic-link"
              onPointerEnter={clearOnHover}
              onClick={() => { location.href = "/info-as-per-nmc/"; }}
            >
              <span className="compact-nav-label">Info As Per<br />NMC</span>
            </button>
            <button
              type="button"
              className="topic-link"
              onPointerEnter={clearOnHover}
              onClick={() => setTopic("Hospital Details")}
            >
              <span className="compact-nav-label">Hospital<br />Details</span>
            </button>
          </nav>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="topic-dialog"
        aria-labelledby="topic-heading"
        onClose={() => setTopic(null)}
      >
        <form method="dialog">
          <button type="submit" className="topic-close">
            Close
          </button>
        </form>
        <h2 id="topic-heading">{topic}</h2>
        <p>
          Mahisagar college information for this item is pending confirmation.
        </p>
      </dialog>
    </>
  );
}

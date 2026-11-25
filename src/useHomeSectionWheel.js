import { useEffect } from "react";

export function useHomeSectionWheel(home) {
  useEffect(() => {
    const page = home.current;
    const header = page.previousElementSibling?.matches("header")
      ? page.previousElementSibling
      : document.querySelector("#root > header");
    const desktop = window.matchMedia("(any-pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = [...page.querySelectorAll(":scope > .home-first-screen, :scope > section")];
    if (page.nextElementSibling?.matches(".site-footer")) sections.push(page.nextElementSibling);

    let pauseUntil = 0;
    const tolerance = 3;

    function handleWheel(event) {
      if (
        !desktop.matches || !event.cancelable || event.defaultPrevented ||
        event.ctrlKey || event.metaKey || event.shiftKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX) ||
        event.target.closest?.("header, dialog, input, textarea, select, [contenteditable]")
      ) return;

      const now = performance.now();
      if (now < pauseUntil) {
        event.preventDefault();
        return;
      }

      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      const viewport = document.documentElement.clientHeight;
      const bounds = sections.map((section) => section.getBoundingClientRect());
      let current = 0;
      for (let i = 1; i < bounds.length; i++) {
        if (bounds[i].top > headerBottom + tolerance) break;
        current = i;
      }

      const direction = Math.sign(event.deltaY);
      const rect = bounds[current];
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport : 1;
      const delta = event.deltaY * unit;
      const remaining = direction > 0 ? rect.bottom - viewport : headerBottom - rect.top;

      if (remaining > tolerance) {
        if (Math.abs(delta) < remaining) return;
        event.preventDefault();
        window.scrollBy({ top: direction * remaining, behavior: "instant" });
        pauseUntil = now + 180;
        return;
      }

      const next = sections[current + direction];
      if (!next) return;

      event.preventDefault();
      next.scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth" });
      pauseUntil = now + (reducedMotion.matches ? 230 : 580);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [home]);
}

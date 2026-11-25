import { PageHeading } from "./PageHeading.jsx";
import React, { useEffect, useRef, useState } from "react";
import { infrastructurePages } from "./infrastructurePages.js";
import { Footer } from "./Footer.jsx";

const photoNumbers = [1, 2, 3];

function InfrastructureSection({ slug, page }) {
  const isClassroom = slug === "classes";
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % photoNumbers.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing]);

  function selectPhoto(next) {
    setPlaying(false);
    setIndex(next);
  }

  return (
    <section className="classes-layout infrastructure-section" id={slug} aria-labelledby={`${slug}-heading`}>
      <div className="classes-copy">
        <h2 id={`${slug}-heading`}>{isClassroom ? <>Our <span>Classes</span></> : page.title}</h2>
        <p>{isClassroom ? "Classroom learning for the proposed medical college in Mahisagar." : page.intro}</p>
        {isClassroom && (
          <ul>
            <li>Lectures on core medical subjects</li>
            <li>Teaching demonstrations to connect theory with practice</li>
            <li>Group discussions and collaborative learning</li>
          </ul>
        )}
      </div>
      <figure className="classes-gallery" aria-label={`${page.title} photo slideshow`}>
        <img
          key={index}
          src={`/infrastructure-images/${page.imagePrefix ?? slug}-${photoNumbers[index]}.webp`}
          alt={`${page.imageLabel} ${index + 1} of ${photoNumbers.length}`}
          width="800"
          height="480"
          loading={isClassroom ? undefined : "lazy"}
        />
        <figcaption>
          {isClassroom
            ? "Illustrative photos. Mahisagar classroom photos will be added when available."
            : "Illustrative photos. Mahisagar campus photos will be added when available."}
        </figcaption>
        <div className="classes-controls" aria-label={`${page.title} photo controls`} role="group">
          <button type="button" onClick={() => setPlaying(!playing)}>{playing ? "Pause" : "Play"}</button>
          {photoNumbers.map((number, photoIndex) => (
            <button key={number} type="button" aria-label={`Show photo ${number}`} aria-pressed={index === photoIndex} onClick={() => selectPhoto(photoIndex)}>
              {number}
            </button>
          ))}
        </div>
      </figure>
    </section>
  );
}

export function InfrastructurePage({ initialSection }) {
  const content = useRef(null);
  const [activeSection, setActiveSection] = useState("classes");

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        setActiveSection(entry.target.id);
        entry.target.classList.add("infrastructure-entered");
      }
    }, { rootMargin: "-25% 0px -55% 0px" });

    content.current.querySelectorAll(".infrastructure-section").forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = window.location.hash.slice(1) || initialSection;
    if (section && Object.hasOwn(infrastructurePages, section)) {
      document.getElementById(section)?.scrollIntoView();
    }
  }, [initialSection]);

  return (
    <>
      <main id="main" className="classes-page">
        <PageHeading title="Infrastructure" />
        <div className="wrap infrastructure-layout">
          <nav className="infrastructure-sidebar" aria-label="Infrastructure sections">
            <strong>Infrastructure</strong>
            {Object.entries(infrastructurePages).map(([slug, page]) => (
              <a key={slug} href={`#${slug}`} aria-current={activeSection === slug ? "location" : undefined}>
                {page.title}
              </a>
            ))}
          </nav>
          <div className="infrastructure-content" ref={content}>
            {Object.entries(infrastructurePages).map(([slug, page]) => (
              <InfrastructureSection key={slug} slug={slug} page={page} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { PageHeading } from "./PageHeading.jsx";
import React, { useEffect, useRef, useState } from "react";
import { infrastructurePages } from "./infrastructurePages.js";
import { Footer } from "./Footer.jsx";

const photos = [
  "/infrastructure-images/classes-1.webp",
  "/infrastructure-images/classes-2.webp",
  "/infrastructure-images/classes-3.webp",
];

function ClassroomSection() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % photos.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing]);

  function selectPhoto(next) {
    setPlaying(false);
    setIndex(next);
  }

  return (
    <section className="classes-layout infrastructure-section" id="classes" aria-labelledby="classes-heading">
          <div className="classes-copy">
            <h2 id="classes-heading">Our <span>Classes</span></h2>
            <p>Classroom learning for the proposed medical college in Mahisagar.</p>
            <ul>
              <li>Lectures on core medical subjects</li>
              <li>Teaching demonstrations to connect theory with practice</li>
              <li>Group discussions and collaborative learning</li>
            </ul>
          </div>
          <figure className="classes-gallery" aria-label="Classroom photo slideshow">
            <img key={index} src={photos[index]} alt={`Classroom reference photo ${index + 1} of ${photos.length}`} width="800" height="480" />
            <figcaption>Illustrative photos. Mahisagar classroom photos will be added when available.</figcaption>
            <div className="classes-controls" aria-label="Photo controls" role="group">
              <button type="button" onClick={() => setPlaying(!playing)}>{playing ? "Pause" : "Play"}</button>
              {photos.map((photo, number) => (
                <button key={photo} type="button" aria-label={`Show photo ${number + 1}`} aria-pressed={index === number} onClick={() => selectPhoto(number)}>
                  {number + 1}
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
            <ClassroomSection />
            {Object.entries(infrastructurePages).filter(([slug]) => slug !== "classes").map(([slug, page]) => (
              <section key={slug} id={slug} className="infrastructure-section" aria-labelledby={`${slug}-heading`}>
                <h2 id={`${slug}-heading`}>{page.title}</h2>
                <p>{page.intro}</p>
                <figure className="infrastructure-photos">
                  <div>
                    {[1, 2, 3].map((number) => (
                      <img
                        key={number}
                        src={`/infrastructure-images/${page.imagePrefix ?? slug}-${number}.webp`}
                        alt={`${page.imageLabel} ${number}`}
                        loading="lazy"
                        decoding="async"
                      />
                    ))}
                  </div>
                  <figcaption>Illustrative photos. Mahisagar campus photos will be added when available.</figcaption>
                </figure>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

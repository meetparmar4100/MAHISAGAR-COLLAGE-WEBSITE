import { useHomeSectionWheel } from "./useHomeSectionWheel.js";
import { TeachingMethodology } from "./TeachingMethodology.jsx";
import { Footer } from "./Footer.jsx";
import React, { useEffect, useRef, useState } from "react";
import campusVideo from "./campus-banner.mp4";
import campusPoster from "./campus-poster.webp";
import mbbsLab from "./mbbs-lab.webp";

function CampusVideo() {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const element = video.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function syncPlayback() {
      if (motion.matches) element.pause();
      else element.play().catch(() => setPlaying(false));
    }

    syncPlayback();
    motion.addEventListener("change", syncPlayback);
    return () => motion.removeEventListener("change", syncPlayback);
  }, []);

  function togglePlayback() {
    const element = video.current;
    if (element.paused) element.play().catch(() => setPlaying(false));
    else element.pause();
  }

  return (
    <>
      <video
        ref={video}
        className="campus-video"
        src={campusVideo}
        poster={campusPoster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button className="video-toggle" type="button" onClick={togglePlayback}>
        {playing ? "Pause banner video" : "Play banner video"}
      </button>
    </>
  );
}

export function HomePage() {
  const home = useRef(null);
  useHomeSectionWheel(home);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("home-entered");
        observer.unobserve(entry.target);
      }
    });
    home.current.querySelectorAll("[data-home-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main id="main" className="home-sections" ref={home}>
        <div className="home-first-screen">
          <section className="hero" aria-labelledby="college-home-heading">
            <CampusVideo />
            <div className="wrap">
              <div className="location">Mahisagar, Gujarat</div>
              <h1 id="college-home-heading">Swaminarayan<br />Medical College</h1>
              <p>
                Explore academic information, admissions and student resources in
                one place.
              </p>
            </div>
            <nav className="quick wrap" aria-label="Quick links">
              <a href="#mbbs-eligibility">
                <span className="icon" aria-hidden="true">
                  ✎
                </span>{" "}
                Eligibility
              </a>
              <a href="#teaching-methodology">
                <span className="icon" aria-hidden="true">
                  ≡
                </span>{" "}
                Teaching methodology
              </a>
              <a href="#mbbs-benefits">
                <span className="icon" aria-hidden="true">
                  ◷
                </span>{" "}
                Benefits
              </a>
              <a href="#mbbs-heading">
                <span className="icon" aria-hidden="true">
                  ✉
                </span>{" "}
                About MBBS
              </a>
            </nav>
          </section>
          <p className="wrap nmc-notice">
            Swaminarayan Medical College, Mahisagar has applied to the National
            Medical Commission (NMC) for MBBS seats. Approval is pending.
          </p>
        </div>
        <section className="mbbs-section" aria-labelledby="mbbs-heading">
          <div className="wrap mbbs-layout" data-home-reveal>
            <figure className="mbbs-photo">
              <img
                src={mbbsLab}
                alt="Illustrative image of an Indian medical student using a microscope in a teaching lab"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Illustrative image</figcaption>
            </figure>
            <div className="mbbs-copy">
              <h2 id="mbbs-heading">Who Should Consider the MBBS Program?</h2>
              <p>
                MBBS may suit you if you enjoy biology and chemistry and want to
                understand how the human body works.
              </p>
              <p>
                Studying medicine calls for steady effort, patience and the
                willingness to learn from clinical experiences. It can be a
                rewarding path if you want to care for patients and serve your
                community.
              </p>
              <a className="mbbs-eligibility-link" href="#mbbs-eligibility">
                View MBBS eligibility
              </a>
            </div>
            <ul className="mbbs-qualities" aria-label="Qualities for studying medicine">
              <li>Strong academic foundation</li>
              <li>Interest in biology and chemistry</li>
              <li>Compassion for patients</li>
              <li>Problem-solving skills</li>
              <li>Commitment to community service</li>
            </ul>
          </div>
        </section>
        <section
          className="section mbbs-benefits"
          id="mbbs-benefits"
          aria-label="MBBS eligibility, benefits and advantages"
        >
          <div className="wrap mbbs-benefits-layout" data-home-reveal>
            <div className="mbbs-eligibility" id="mbbs-eligibility">
              <h2><span aria-hidden="true">✓</span> MBBS Eligibility</h2>
              <div className="eligibility-criterion">
                <h3>Educational qualifications</h3>
                <p>
                  Pass Class 12 or a recognized equivalent examination with
                  Physics, Chemistry, Biology or Biotechnology, and English.
                </p>
                <p>
                  The NTA bulletin explains which equivalent qualifications and
                  additional subjects may be accepted.
                </p>
              </div>
              <div className="eligibility-criterion">
                <h3>NEET-UG qualification</h3>
                <p>
                  Qualify NEET-UG and meet the requirements for your category and
                  counselling route.
                </p>
              </div>
              <div className="eligibility-criterion">
                <h3>Minimum age</h3>
                <p>
                  Be at least 17 years old by 31 December of the year you appear
                  for NEET-UG.
                </p>
              </div>
              <a href="https://neet.nta.nic.in/">
                Check the official NEET-UG bulletin for your admission year
              </a>
            </div>
            <div className="mbbs-advantages">
              <h2 id="mbbs-benefits-heading">
                <span className="benefits-icon" aria-hidden="true">✦</span>{" "}
                Benefits <span>&amp;</span> Advantages
              </h2>
              <ul className="mbbs-benefits-list">
                <li>
                  <strong>Career foundation</strong>Build a foundation for
                  clinical practice, further training or other roles in
                  healthcare.
                </li>
                <li>
                  <strong>Individual feedback</strong>Use feedback from
                  educators to identify strengths and improve specific skills.
                </li>
                <li>
                  <strong>Theory in practice</strong>Connect what you learn in
                  class to clinical cases and decisions about patient care.
                </li>
                <li>
                  <strong>Hands-on experience</strong>Develop practical skills
                  through supervised clinical postings and practical sessions.
                </li>
                <li>
                  <strong>Faculty mentorship</strong>Seek guidance on academic
                  progress, clinical interests and career decisions.
                </li>
                <li>
                  <strong>Laboratory learning</strong>Practice core techniques
                  and apply scientific concepts in a controlled setting.
                </li>
                <li>
                  <strong>Contribution to patient care</strong>Develop the
                  knowledge and judgment to serve patients and communities.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <TeachingMethodology />
      </main>
      <Footer />
    </>
  );
}

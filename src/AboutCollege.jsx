import React from "react";
import { Footer } from "./Footer.jsx";

export function AboutCollege() {
  return (
    <>
      <main id="main">
        <section className="about-feature-hero" aria-labelledby="about-feature-title">
          <div className="wrap">
            <nav aria-label="Breadcrumb"><a href="/">Home</a> / <span aria-current="page">About College</span></nav>
            <h1 id="about-feature-title">Excellence in Healthcare Education</h1>
            <p>Dedicated to nurturing the next generation of medical professionals</p>
          </div>
        </section>
        <section className="about-feature-body" aria-labelledby="college-profile-title">
          <div className="wrap">
            <div className="about-feature-grid">
              <figure><img src="/infrastructure-images/campus-2.webp" alt="College campus" loading="lazy" decoding="async" /></figure>
              <div className="about-feature-copy">
                <p className="about-feature-label">Our Vision</p>
                <h2 id="college-profile-title">Founded on Vision, Committed to Excellence</h2>
                <p>Swaminarayan Medical College, Mahisagar is a proposed medical college in Lunawada, Gujarat. Our vision is to support medical education through classroom learning, practical training and an understanding of community health.</p>
                <p>The proposed college site is on Charel Road, behind Cottage Hospital in Moti Charel. General Hospital, Lunawada is listed as a district hospital in Mahisagar.</p>
                <a href="https://mahisagar.nic.in/health/">Mahisagar District Health Department</a>
              </div>
            </div>
            <aside className="about-feature-status" aria-labelledby="college-status-title">
              <h2 id="college-status-title">Approval status</h2><p>National Medical Commission (NMC) approval is pending. MBBS intake, admission dates and clinical training arrangements are yet to be confirmed.</p>
              <h3>Proposed college address</h3><p>Charel Road, behind Cottage Hospital, Moti Charel, Lunawada, Gujarat 389230.</p>
              <a href="#contact">College contact details</a>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

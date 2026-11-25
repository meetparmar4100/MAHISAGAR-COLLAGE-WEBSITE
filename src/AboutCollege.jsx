import { PageHeading } from "./PageHeading.jsx";
import React from "react";
import { Footer } from "./Footer.jsx";

export function AboutCollege() {
  return (
    <>
      <main id="main">
        <PageHeading title="About College" />
        <div className="wrap about-college-profile">
          <section aria-labelledby="college-profile-title">
            <h2 id="college-profile-title">Swaminarayan Medical College, Mahisagar</h2>
            <p>
              Swaminarayan Medical College, Mahisagar is a proposed medical college
              in Lunawada, Gujarat. The project aims to support medical education
              in the district through classroom learning, practical training and
              an understanding of community health.
            </p>
            <h3>Civil Hospital, Lunawada</h3>
            <p>
              The proposed college site is on Charel Road, behind Cottage Hospital
              in Moti Charel. General Hospital, Lunawada is listed as a district
              hospital in Mahisagar.
            </p>
            <p><a href="https://mahisagar.nic.in/health/">Mahisagar District Health Department</a></p>
          </section>
          <aside className="about-college-details" aria-labelledby="college-status-title">
            <h2 id="college-status-title">Approval status</h2>
            <p>
              National Medical Commission (NMC) approval is pending. MBBS intake,
              admission dates and clinical training arrangements are yet to be confirmed.
            </p>
            <h3>Proposed college address</h3>
            <p>Charel Road, behind Cottage Hospital, Moti Charel, Lunawada, Gujarat 389230.</p>
            <a href="#contact">College contact details</a>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

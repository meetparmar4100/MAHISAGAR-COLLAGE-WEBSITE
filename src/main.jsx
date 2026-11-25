import { NmcInformation } from "./NmcInformation.jsx";
import { EventsPage } from "./EventsPage.jsx";
import { CollegeGallery } from "./CollegeGallery.jsx";
import { CommitteesPage } from "./CommitteesPage.jsx";
import { InfrastructurePage } from "./InfrastructurePage.jsx";
import React from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./HomePage.jsx";
import { AboutCollege } from "./AboutCollege.jsx";
import { AboutInformation } from "./AboutInformation.jsx";
import { aboutPages } from "./aboutPages.js";
import { academicPages, committeePages, destinations } from "./navigation.js";
import { Header } from "./Header.jsx";
import "./styles.css";

function App() {
  const [, slug, subpage] = location.pathname.split("/");
  const information = Object.hasOwn(aboutPages, slug) ? aboutPages[slug] : null;
  let page = <HomePage />;
  const pendingTitle = new URLSearchParams(location.search).get("comingSoon");
  if (["Anaesthesiology","Anatomy","Biochemistry","Community Medicine","Dentistry","Dermatology","Forensic Medicine","General Medicine","General Surgery","Microbiology","Obstetrics and Gynecology","Ophthalmology","Orthopedics","Otolaryngology","Paediatrics","Pathology","Pharmacology","Physiology","Psychiatry","Radiodiagnosis","Hospital Side","Hospital Details","Fee Regulatory Committee"].includes(pendingTitle)) page = <AboutInformation page={{ title: pendingTitle, comingSoon: true }} />;
  if (slug === "gallery" && subpage === "events") page = <EventsPage />;
  if (slug === "gallery" && subpage === "college-side") page = <CollegeGallery />;
  if (slug === "info-as-per-nmc") page = <NmcInformation />;
  if (slug === "about-college") page = <AboutCollege />;
  if (information) page = <AboutInformation page={information} />;
  if (slug === "academics" && Object.hasOwn(academicPages, subpage)) {
    page = <AboutInformation page={academicPages[subpage]} />;
  }
  if (slug === "committees") {
    if (!subpage) page = <CommitteesPage />;
    else if (Object.hasOwn(committeePages, subpage)) {
      page = <AboutInformation page={committeePages[subpage]} parent={{ href: destinations.Committees, label: "Committees" }} />;
    }
  }
  if (slug === "infrastructure") page = <InfrastructurePage initialSection={subpage} />;
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header />
      {page}
    </>
  );
}

if (new URLSearchParams(location.search).get("admin") === "1" || /^\/admin\/?$/.test(location.pathname)) { document.body.classList.add("cms-admin"); const mount=document.createElement("main"); mount.id="admin"; document.getElementById("root").replaceChildren(mount); } else createRoot(document.getElementById("root")).render(<App />);

const cmsModuleUrl = "/cms.js";
import(/* @vite-ignore */ cmsModuleUrl);

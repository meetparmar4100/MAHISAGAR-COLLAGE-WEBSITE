import { InfrastructurePage } from "./InfrastructurePage.jsx";
import React from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./HomePage.jsx";
import { AboutCollege } from "./AboutCollege.jsx";
import { AboutInformation } from "./AboutInformation.jsx";
import { aboutPages } from "./aboutPages.js";
import { academicPages, committeePages } from "./navigation.js";
import { Header } from "./Header.jsx";
import "./styles.css";

function App() {
  const [, slug, subpage] = location.pathname.split("/");
  const information = Object.hasOwn(aboutPages, slug) ? aboutPages[slug] : null;
  let page = <HomePage />;
  if (slug === "about-college") page = <AboutCollege />;
  if (information) page = <AboutInformation page={information} />;
  if (slug === "academics" && Object.hasOwn(academicPages, subpage)) {
    page = <AboutInformation page={academicPages[subpage]} />;
  }
  if (slug === "committees" && Object.hasOwn(committeePages, subpage)) {
    page = <AboutInformation page={committeePages[subpage]} />;
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

createRoot(document.getElementById("root")).render(<App />);

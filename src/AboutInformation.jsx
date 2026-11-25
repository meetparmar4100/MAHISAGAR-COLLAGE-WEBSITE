import { PageHeading } from "./PageHeading.jsx";
import React from "react";
import { Footer } from "./Footer.jsx";

export function AboutInformation({ page, parent }) {
  return (
    <>
      <main id="main">
        <PageHeading title={page.title} parent={parent ?? (!page.comingSoon && !page.links ? { href: "/about-college/", label: "About Us" } : undefined)} />
        <div className="wrap about-information">
          {page.links && (
            <nav aria-label="Committees">
              <ul>
                {page.links.map(({ title, href }) => (
                  <li key={href}><a href={href}>{title}</a></li>
                ))}
              </ul>
            </nav>
          )}
          {page.comingSoon && (
            <section className="academic-coming-soon">
              <span aria-hidden="true">📚</span>
              <h2>Coming Soon</h2>
            </section>
          )}
          {page.intro && (
            <p className={page.centeredNotice ? "about-centered-notice" : undefined}>
              {page.intro}
            </p>
          )}
          {page.message && (
            <article className="about-person about-person-text">
              <div>
                <h2>{page.message.heading}</h2>
                {page.message.lines.map((line) => <p key={line}>{line}</p>)}
                <p>
                  <strong>
                    {page.message.signature[0]}<br />
                    {page.message.signature[1]}
                  </strong>
                </p>
              </div>
            </article>
          )}
          {page.profiles?.map(([name, role, image, paragraphs]) => (
            <article
              className={
                image ? "about-person" : "about-person about-person-text"
              }
              key={name}
            >
              {image && (
                <img
                  src={`/about-images/${image}`}
                  alt={role ? name : ""}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div>
                <h2>{name}</h2>
                {role && <strong>{role}</strong>}
                {paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

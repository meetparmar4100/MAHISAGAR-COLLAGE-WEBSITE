import React from "react";
import { Footer } from "./Footer.jsx";
import { PageHeading } from "./PageHeading.jsx";
import { committeePages } from "./navigation.js";

const documents = import.meta.glob("./committee-documents/*.pdf", {
  eager: true,
  import: "default",
  query: "?url",
});

export function CommitteesPage() {
  return (
    <>
      <main id="main" className="committees-page">
        <PageHeading title="Committees" />
        <section className="committee-intro" aria-labelledby="committee-intro-title">
          <div className="wrap">
            <p className="committee-intro-category">Governance &amp; Statutory Bodies</p>
            <h2 id="committee-intro-title">Institutional <span>Committees</span></h2>
            <p>Explore the College Council and the committees for student welfare, ethics, and medical education at Swaminarayan Medical College, Mahisagar.</p>
          </div>
        </section>
        <section className="wrap committee-documents" aria-labelledby="committee-documents-title">
          <h2 id="committee-documents-title">Committee Documents</h2>
          <ul className="committee-grid">
            {Object.entries(committeePages).map(([slug, { title }]) => {
              const pdf = documents[`./committee-documents/${slug}.pdf`];
              return (
                <li className="committee-card" key={slug}>
                  <span className="committee-file-icon" aria-hidden="true">PDF</span>
                  <div>
                    <h3>{title}</h3>
                    {!pdf && <p>PDF pending</p>}
                  </div>
                  {pdf ? (
                    <a className="committee-view" href={pdf} target="_blank" rel="noopener" aria-label={`View ${title} PDF (opens in a new tab)`}>View</a>
                  ) : (
                    <button className="committee-view" type="button" disabled>View</button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

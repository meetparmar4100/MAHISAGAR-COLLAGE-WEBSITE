import React, { useState } from "react";

const programs = {
  UG: [
    {
      name: "MBBS",
      degree: "Bachelor of Medicine and Bachelor of Surgery",
      methods: "Classroom instruction, laboratory demonstrations and supervised clinical learning connect medical theory with patient care.",
    },
  ],
  PG: [
    {
      name: "MD",
      degree: "Doctor of Medicine",
      methods: "Specialty teaching can include supervised clinical work, case discussions, seminars and research.",
    },
    {
      name: "MS",
      degree: "Master of Surgery",
      methods: "Surgical training can include supervised clinical and procedural experience, case review and research.",
    },
  ],
};

export function TeachingMethodology() {
  const [level, setLevel] = useState("UG");
  const [query, setQuery] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const term = query.trim().toLowerCase();
  const suggestions = Object.entries(programs).flatMap(([category, courses]) =>
    courses.filter(({ name, degree }) => term && `${name} ${degree}`.toLowerCase().includes(term))
      .map((course) => ({ ...course, category })),
  );

  function selectCourse(course) {
    setLevel(course.category);
    setQuery("");
    setSuggestionsOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(`methodology-course-${course.name}`)?.focus();
    });
  }

  return (
    <section
      className="section teaching-methodology"
      id="teaching-methodology"
      aria-labelledby="teaching-methodology-heading"
    >
      <div className="wrap methodology-layout" data-home-reveal>
        <div>
          <h2 id="teaching-methodology-heading">Teaching Methodology</h2>
          <label htmlFor="course-search">Search courses</label>
          <div
            className="methodology-search"
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setSuggestionsOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setSuggestionsOpen(false);
              if (event.key === "Enter" && event.target.id === "course-search" && suggestionsOpen && suggestions.length === 1) {
                selectCourse(suggestions[0]);
              }
            }}
          >
            <input
              type="search"
              id="course-search"
              placeholder="Search by course name"
              value={query}
              onFocus={() => setSuggestionsOpen(true)}
              onChange={(event) => {
                setQuery(event.target.value);
                setSuggestionsOpen(true);
              }}
            />
            {suggestionsOpen && term && (
              <ul className="methodology-suggestions" aria-label="Course suggestions">
                {suggestions.length === 0 && <li>No matching courses.</li>}
                {suggestions.map((course) => (
                  <li key={course.name}>
                    <button type="button" onClick={() => selectCourse(course)}>
                      <strong>{course.name}</strong> · {course.degree}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <div className="methodology-tabs" role="group" aria-label="Program level">
            <button type="button" aria-pressed={level === "UG"} onClick={() => setLevel("UG")}>
              Undergraduate (UG)
            </button>
            <button type="button" aria-pressed={level === "PG"} onClick={() => setLevel("PG")}>
              Postgraduate (PG)
            </button>
          </div>
          <p className="methodology-status">Program availability and seat intake are subject to approval.</p>
          <ul className="methodology-programs" aria-live="polite">
            {programs[level].map(({ name, degree, methods }) => (
              <li key={name} id={`methodology-course-${name}`} tabIndex={-1}>
                <h3>{name}</h3>
                <strong>{degree}</strong>
                <p>{methods}</p>
              </li>
            ))}
          </ul>
        </div>
        <nav className="methodology-related" aria-label="Explore MBBS">
          <h3>Explore MBBS</h3>
          <a href="#mbbs-heading">Who should consider MBBS?</a>
          <a href="#mbbs-eligibility">MBBS Eligibility</a>
          <a href="#mbbs-benefits-heading">Benefits &amp; Advantages</a>
        </nav>
      </div>
    </section>
  );
}

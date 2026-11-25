import React, { useState } from "react";

const programs = [
  {
    name: "MBBS",
    degree: "Bachelor of Medicine and Bachelor of Surgery",
    methods: "Classroom instruction, laboratory demonstrations and supervised clinical learning connect medical theory with patient care.",
  },
];

export function TeachingMethodology() {
  const [query, setQuery] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const term = query.trim().toLowerCase();
  const suggestions = programs.filter(({ name, degree }) =>
    term && `${name} ${degree}`.toLowerCase().includes(term),
  );

  function selectCourse(course) {
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
          <p className="methodology-level">Undergraduate (UG)</p>
          <p className="methodology-status">Program availability and seat intake are subject to approval.</p>
          <ul className="methodology-programs" aria-live="polite">
            {programs.map(({ name, degree, methods }) => (
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

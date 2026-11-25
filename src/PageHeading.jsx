import React from "react";

export function PageHeading({ title, parent }) {
  return (
    <div className="page-heading-strip">
      <div className="wrap page-heading">
        <nav aria-label="Breadcrumb">
          <a href="/">Home</a>
          {parent && <> / <a href={parent.href}>{parent.label}</a></>}
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>
        <h1>{title}</h1>
      </div>
    </div>
  );
}

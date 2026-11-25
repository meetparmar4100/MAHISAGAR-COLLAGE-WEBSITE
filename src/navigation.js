import { infrastructurePages } from "./infrastructurePages.js";
import { aboutPages } from "./aboutPages.js";

const academicEntries = [
    "Academic Calendar",
    "Details of Sanctioned Seats",
    "List of Admitted Students",
    "Fee Details",
    "Time Tables",
    [
      "Examinations",
      [
        "Internal Theory Exams",
        "Pre. Uni. Exam 1st MBBS",
        "Pre. Uni. Exam 2nd MBBS",
      ],
    ],
    ["Results", ["MBBS 1 Batch", "MBBS 1 Batch (Remedial)"]],
    "List of Holidays",
    ["PG", ["PG Fees", "PG Stipend"]],
  ];

export const menus = {
  "About Us": [
    "About College",
    "Vision and Mission",
    "President Message",
    "Vice President Message",
    "Vice Chancellor and Registrar Message",
    "Dean",
    "Citizen Charter",
    "Affiliation Letter / Intake Letter",
  ],
  Academics: academicEntries.filter((entry) => !Array.isArray(entry)),
  College: [
    [
      "Committees",
      [
        "College Council",
        "Gender Harassment Committee",
        "Anti-ragging Committee",
        "Ethics Committee",
        "Medical Education",
        "Curriculum Committee",
      ],
    ],
    [
      "Infrastructure",
      [
        "Classes",
        "Mess / Canteen",
        "Infrastructure Overview",
        "Campus",
      ],
    ],
    [
      "Important Links",
      [
        "National Medical Commission",
        "Fee Regulatory Committee",
      ],
    ],
  ],
  "Teaching Staff Details": [
    "Anaesthesiology",
    "Anatomy",
    "Biochemistry",
    "Community Medicine",
    "Dentistry",
    "Dermatology",
    "Forensic Medicine",
    "General Medicine",
    "General Surgery",
    "Microbiology",
    "Obstetrics and Gynecology",
    "Ophthalmology",
    "Orthopedics",
    "Otolaryngology",
    "Paediatrics",
    "Pathology",
    "Pharmacology",
    "Physiology",
    "Psychiatry",
    "Radiodiagnosis",
  ],
  Gallery: ["College Side", "Events", "Hospital Side"],
  "New Admission Info.": [
    "Admission Process",
    "Issuance of Freeship",
    "What should you do now?",
    "MBBS FAQ",
    "Contact Us",
  ],
};

function comingSoonPages(titles) {
  return Object.fromEntries(titles.map((title) => [
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, ""),
    { title, comingSoon: true },
  ]));
}

export const academicPages = comingSoonPages(
  academicEntries.flatMap((entry) => (Array.isArray(entry) ? entry[1] : [entry])),
);

export const committeePages = comingSoonPages(
  menus.College.find((entry) => entry[0] === "Committees")[1],
);

export const destinations = {
  Infrastructure: "/infrastructure/",
  ...Object.fromEntries(
    Object.entries(committeePages).map(([slug, page]) => [page.title, `/committees/${slug}/`]),
  ),
  ...Object.fromEntries(Object.entries(infrastructurePages).map(([slug, page]) => [page.title, `/infrastructure/#${slug}`])),
  ...Object.fromEntries(
    Object.entries(academicPages).map(([slug, page]) => [page.title, `/academics/${slug}/`]),
  ),
  ...Object.fromEntries(Object.entries(aboutPages).map(([slug, page]) => [page.title, `/${slug}/`])),
  "About College": "/about-college/",
  "Contact Us": "#contact",
  "Admission Process": "/#mbbs-eligibility",
  "National Medical Commission": "https://nmc.org.in/",
};

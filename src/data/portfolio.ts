// ===========================================
// PORTFOLIO DATA - Muhammad Bilal
// ===========================================

export const portfolioData = {
  // Personal Information
  about: {
    name: "Muhammad Bilal",
    greeting: "Hello, I'm Bilal",
    bio: `An SWE with a Master's in Computer Information Science from Purdue. I love discussing new technologies, innovative ideas, and scalable solutions! 

    Eager to learn more – real world solutions are fascinating!`,
    location: "United States",
    status: "Open to opportunities",
  },

  // Skills organized by category
  skills: [
    {
      category: "Languages",
      items: ["Python", "TypeScript", "Java", "C#", "JavaScript", "Bash"],
    },
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "FastAPI", "Django"],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "MySQL"],
    },
    {
      category: "DevOps & Cloud",
      items: ["Docker", "CI/CD", "Linux", "Nginx", "Apache", "Git"],
    },
  ],

  // Featured Projects
  projects: [
    {
      name: "Aultbox",
      description:
        "Built and shipped a a Django-based AI-enabled clinical decision-support app that compresses a ~20-page medication report into a single-page insight card, cutting physician review time from ~27 minutes to <3 minutes. Integrated GPT-4o (structured function calling) to generate dosing guidance/cautions for unmatched profiles (100% coverage for novel drug–patient combos), connected Cerner via SMART on FHIR/HL7 for real-time EHR data, added a rule+LLM mechanism-based risk classifier, and optimized a normalized Postgres schema + Django ORM for fast O(1) n-way interaction lookups (~7s on 10k local records).",
      tech: ["Python", "Django", "JavaScript", "HTML/CSS", "Grafana"],
      github: null,
      live: null,
      featured: true,
    },
    {
      name: "Boundless Games - Fable Table",
      description:
        "Contributed to an open-source Dungeons & Dragons web app (FastAPI/Python + React/Next.js) by fixing backend bugs and resolving GitHub security alerts by updating vulnerable dependencies. Worked in a vibecoding workflow using Claude Code and Cursor with multiple LLMs (Sonnet, Opus, Codex) for rapid iteration and debugging.",
      tech: ["Python", "FastAPI", "Docker", "React"],
      github: "https://github.com/mbil4l",
      live: null,
      featured: true,
    },
    {
      name: "CLI Portfolio",
      description:
        "This interactive terminal-style portfolio website you are currently using. Built with Next.js and featuring CRT effects.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/mbil4l",
      live: "https://mbil4l.github.io",
      featured: true,
    },
  ],

  // Work Experience
  experience: [
    {
      title: "AI Software Engineer",
      company: "Aultman Health Foundation",
      period: "May 2025 - Present",
      highlights: [
        "Designed and shipped a Django-based AI-enabled clinical decision-support application that turns patient demographics and their medicine regimen into a single-page card highlighting physician-focused insights, reducing a 20-page generated report to a single concise screen, and improving physicians' review time from ~27 min to <3 min.",
        "Integrated OpenAI GPT-4o API with structured function calling to auto-generate dosage guidelines, instructions, cautions, and warnings when existing database entries don't match patient profiles, ensuring 100% coverage for novel drug-patient combinations.",
        "Developed a RESTful API using FHIR/HL7 standards and integrated it with Cerner via SMART on FHIR to retrieve real-time patient demographics, medications, and clinical data from the EHR.",
        "Implemented a rule-plus-LLM classifier that groups drugs by mechanism (e.g., COX-1/2) and flags risky combinations.",
      ],
    },
    {
      title: "IT Support",
      company: "Stark Pediatrics",
      period: "Dec 2024 - May 2025",
      highlights: [
        "Providing technical support for MicroMD EMR software on Window machines by resolving an average of 11 support tickets weekly related to EMR access issues, password resets, slow machines and other software-related issues.",
        "Configured and maintained 5 workstations with MicroMD EMR software, ensuring smooth clinical operations and minimizing system downtime, which enabled the facility to serve an additional 27 patients monthly—raising the total patient count to 314 per month.",
      ],
    },
    {
      title: "Software Engineering Tutor",
      company: "iCode School Franchise",
      period: "May 2023 - Aug 2023",
      highlights: [
        "Mentored 20+ students in the “Introduction to Computer Science” and “Introduction to Programming” courses.",
      ],
    },
    {
      title: "Associate Software Engineer",
      company: "10Pearls",
      period: "Mar 2021 - Nov 2021",
      highlights: [
        "Worked on a business-critical process to optimize SPA loading times from 11s to 6s. Improved Google Lighthouse score of the SPA from 73 to over 80 by utilizing lazy loading, caching of assets, and CDN optimization.",
        "Worked on UI Improvements for web applications with a diverse team. Added support for keyboard navigation and text-to-speech screen reader functionality for power users using HTML5 tab index and ARIA role attributes throughout the HTML code.",
        "Ensured consistent UI functionality and responsive designs of the web applications by using CSS3 Media Queries.",
      ],
    },
  ],

  // Education
  education: [
    {
      degree: "M.S. in Computer Information Science",
      school: "Purdue, Indianapolis, IN, USA",
      period: "2022 - 2023",
    },
    {
      degree: "B.S. in Software Engineering",
      school: "National University of Sciences and Technology, Islamabad, PK",
      period: "2017 - 2021",
    },
  ],

  // Resume download link
  resumeUrl: "/Muhammad_Bilal_Resume.pdf",

  // Contact Information
  contact: {
    email: "mbilalkh.usa@gmail.com",
    phone: "(317) 699-3182 (text me first)",
  },

  // Social Links
  social: [
    {
      name: "GitHub",
      url: "https://github.com/mbil4l",
      icon: "GH",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mbilalkhusa",
      icon: "IN",
    },
    {
      name: "Website",
      url: "https://mbil4l.github.io",
      icon: "WB",
    },
  ],
};

// Type exports for TypeScript support
export type PortfolioData = typeof portfolioData;
export type Project = (typeof portfolioData.projects)[0];
export type Experience = (typeof portfolioData.experience)[0];
export type Skill = (typeof portfolioData.skills)[0];

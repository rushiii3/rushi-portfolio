import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "Hacktify Cyber Security (Virtual Internship) ",
      subtitle: "Software Developer Intern",
      timeline: "May 2024 - Present",
      content: (
        <div>
          <ul className="list-disc list-outside space-y-1 text-neutral-800 dark:text-neutral-200 text-md font-normal mb-8 text-justify">
            <li>
              Conducted penetration testing on web applications, identifying
              vulnerabilities.
            </li>
            <li>
              Exploited HTML Injection, XSS, IDOR, SQL Injection, CSRF, and CORS
              misconfigurations.
            </li>
            <li>Used tools like Burp Suite, Nmap, and SQLmap for testing.</li>
            <li>
              Prepared security assessment reports with PoC exploits and
              recommended fixes.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "GirlScript Summer of Code",
      subtitle: "Open Source Contributor",
      timeline: "May 2024 - Aug 2024",
      content: (
        <div>
          <ul className="list-disc list-outside space-y-1 text-neutral-800 dark:text-neutral-200 text-md font-normal mb-8 text-justify">
            <li>
              Designed user interfaces, improving user satisfaction and reducing
              bounce rates.
            </li>
            <li>Optimized frontend components, reducing load times by 20%.</li>
            <li>
              Developed an API handling 1,000 daily requests for doctor
              specializations.
            </li>
            <li>
              Collaborated with a team, increasing feature set by 30% and
              improving project delivery time by 40%
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "V.G. Vaze College of Arts, Science and Commerce (Autonomous)",
      subtitle: "Software Developer Intern",
      timeline: "May 2024 - Aug 2024",
      content: (
        <div>
          <ul className="list-disc list-outside space-y-1 text-neutral-800 dark:text-neutral-200 text-md font-normal mb-8 text-justify">
            <li>
              Collaborated with 5+ stakeholders, including the principal and
              administration, to gather and clarify project requirements.
            </li>
            <li>
              Designed a fully responsive web-based interface, increasing user
              engagement by 30% and receiving 95% positive feedback.
            </li>
            <li>
              Created detailed design documents, including technical
              specifications and user flow diagrams, to ensure project clarity.
            </li>
            <li>
              Followed Agile methodology for iterative progress and
              adaptability.
            </li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}

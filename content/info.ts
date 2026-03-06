import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
export const personalInfo = {
  name: "Hrushikesh Shinde",
  title:
    "Associate Information Security Consultant | Application Security & VAPT Specialist",
  description: `I am an Associate Information Security Consultant specializing in Application Security and Vulnerability Assessment & Penetration Testing (VAPT), with a strong focus on web application security.

My expertise includes identifying and exploiting OWASP Top 10 vulnerabilities such as SQL Injection, Cross-Site Scripting (XSS), IDOR, CSRF, authentication bypass, and access control flaws. I perform structured manual penetration testing, conduct risk impact analysis using CVSS, and provide detailed remediation guidance aligned with industry best practices.

I have hands-on experience using tools such as Burp Suite, Nmap, SQLmap, AppScan 360, and Kali Linux for reconnaissance, vulnerability validation, and exploitation. I also leverage OSINT techniques for attack surface mapping and perform configuration reviews to strengthen application security posture.

Currently preparing for HTB Certified Web Exploitation Specialist (CWES), I am continuously advancing my expertise in advanced web exploitation, business logic testing, and offensive application security.

Based in Mumbai, India, I am passionate about strengthening cyber resilience through structured security testing and practical, risk-focused remediation strategies.`,
  image: "/profile.webp",
  location: "Mumbai, India",
};

export const socialLinks = [
  {
    name: "Github",
    url: "https://github.com/rushiii3",
    icon: BsGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/hrushikesh-shinde-developer/",
    icon: BsLinkedin,
  },
  {
    name: "Mail",
    url: "mailto:shindehrushi99@gmail.com",
    icon: IoMdMail,
  },
];

export const workExperienceData = [
  {
    title: "qSEAp Infotech Pvt. Ltd",
    subtitle: "Associate Information Security Consultant",
    timeline: "Jun 2025 - Present",
    content: [
      "Performed Vulnerability Assessment & Penetration Testing (VAPT) on 5+ web applications in the FinTech domain.",
      "Identified and validated critical security flaws aligned with OWASP Top 10, including Broken Authentication, IDOR, Injection vulnerabilities, Security Misconfigurations, and Business Logic issues.",
      "Executed end-to-end application security testing using Burp Suite, AppScan 360, and Kali Linux for crawling, scanning, manual exploitation, and vulnerability verification.",
      "Prepared comprehensive technical reports and executive summaries with risk ratings, impact analysis, and prioritized mitigation strategies.",
      "Conducted manual validation to eliminate false positives and improve accuracy of automated scan results.",
      "Collaborated with development teams to validate fixes and perform re-testing, ensuring secure closure of identified findings.",
    ],
  },
  {
    title: "Hacktify Cyber Security",
    subtitle: "Penetration Testing Intern (Virtual Internship)",
    timeline: "Feb 2025 - Mar 2025",
    content: [
      "Conducted penetration testing across multiple security domains, identifying and documenting vulnerabilities in web applications.",
      "Analyzed and exploited HTML Injection and Cross-Site Scripting (XSS) vulnerabilities, demonstrating attack vectors and mitigation strategies.",
      "Discovered and reported Insecure Direct Object References (IDOR) and SQL Injection flaws using Burp Suite, Nmap, and SQLmap.",
      "Assessed Cross-Site Request Forgery (CSRF) and CORS misconfigurations and developed reports with Proof-of-Concept (PoC) exploits.",
      "Engaged in Capture The Flag (CTF) challenges to enhance practical penetration testing skills.",
      "Prepared detailed security assessment reports with exploitation techniques and remediation recommendations.",
    ],
  },
  {
    title: "GirlScript Summer of Code",
    subtitle: "Contributor",
    timeline: "May 2024 - Aug 2024",
    content: [
      "Designed and optimized frontend components, reducing load times by 20% and improving user experience.",
      "Developed an API handling up to 1,000 daily requests for doctor specializations.",
      "Improved user satisfaction by 25% and reduced bounce rates by 15% through UI enhancements.",
      "Collaborated with team members and project managers to increase feature delivery by 30% and improve project timelines by 40%.",
    ],
  },
  {
    title: "V.G. Vaze College of Arts, Science and Commerce (Autonomous)",
    subtitle: "Software Developer",
    timeline: "May 2023 - Jul 2023",
    content: [
      "Collaborated with 5+ stakeholders to gather and clarify project requirements for a web-based system.",
      "Designed a fully responsive web interface, increasing user engagement by 30% and receiving 95% positive feedback.",
      "Created detailed technical specifications and user flow documentation to guide development.",
      "Executed the project using Agile methodology to ensure structured and iterative progress.",
    ],
  },
];

export const skillsData = {
  security: {
    application_security: {
      title: "Application Security",
      items: [
        "OWASP Top 10 Testing",
        "Vulnerability Assessment & Penetration Testing (VAPT)",
        "Authentication & Authorization Testing",
        "Business Logic Testing",
        "Access Control Validation",
        "Session Management Testing",
        "CVSS Risk Assessment",
        "Secure Remediation Validation",
      ],
    },

    exploitation: {
      title: "Vulnerability Exploitation",
      items: [
        "SQL Injection",
        "Cross-Site Scripting (XSS)",
        "Insecure Direct Object References (IDOR)",
        "Cross-Site Request Forgery (CSRF)",
        "Security Misconfiguration",
        "CORS Misconfiguration",
        "Broken Authentication",
      ],
    },

    tools: {
      title: "Security Tools",
      items: [
        "Burp Suite",
        "AppScan 360",
        "Nmap",
        "SQLmap",
        "Metasploit",
        "Nessus",
        "Nikto",
        "Wireshark",
        "Netcat",
        "Whois",
        "Nslookup",
      ],
    },

    methodology: {
      title: "Security Methodology",
      items: [
        "Reconnaissance & Enumeration",
        "Manual Penetration Testing",
        "Proof-of-Concept (PoC) Development",
        "False Positive Validation",
        "Risk Impact Analysis",
        "Technical Reporting & Executive Summaries",
        "Re-testing & Secure Closure",
      ],
    },
  },

  infrastructure: {
    networking: {
      title: "Networking",
      items: ["TCP/IP", "DNS", "ARP", "DHCP"],
    },
    operating_systems: {
      title: "Operating Systems",
      items: ["Kali Linux", "Linux", "Windows", "macOS"],
    },
  },

  technical_background: {
    languages: {
      title: "Languages",
      items: ["Python (Flask)", "Node.js", "PHP", "Bash", "JavaScript"],
    },

    databases: {
      title: "Databases",
      items: ["MongoDB", "MySQL"],
    },

    frontend: {
      title: "Frontend",
      items: ["React.js", "React Native", "HTML", "CSS", "Tailwind CSS"],
    },

    backend: {
      title: "Backend",
      items: ["Express.js", "REST APIs"],
    },
  },

  soft_skills: {
    skills: {
      title: "Soft Skills",
      items: [
        "Analytical Thinking",
        "Problem Solving",
        "Risk Assessment",
        "Technical Reporting",
        "Collaboration",
        "Attention to Detail",
      ],
    },
  },
};

type BlogCategory = {
  name: string;
  slug: string;
  description: string;
  intro: string;
};

export const blogCategories: BlogCategory[] = [
  {
    name: "All",
    slug: "all",
    description:
      "All blog posts",
    intro:
      "All blog posts",
  },
  {
    name: "Cybersecurity Fundamentals",
    slug: "cybersecurity-fundamentals",
    description:
      "Core cybersecurity concepts including threat modeling, risk assessment, attack surfaces, and foundational principles essential for security engineers and developers.",
    intro:
      "This section covers the fundamental principles of cybersecurity, including threat modeling, risk management, attack vectors, and defensive security strategies that form the foundation of modern security practices.",
  },
  {
    name: "Web Security",
    slug: "web-security",
    description:
      "Advanced web application security guides covering OWASP Top 10, authentication flaws, session management risks, input validation issues, and mitigation techniques.",
    intro:
      "Explore real-world web security vulnerabilities, including OWASP Top 10 risks, authentication bypasses, session hijacking, XSS, CSRF, and secure implementation practices for modern web applications.",
  },
  {
    name: "Penetration Testing",
    slug: "penetration-testing",
    description:
      "Practical penetration testing methodologies, reconnaissance strategies, exploitation techniques, and professional security reporting practices.",
    intro:
      "Dive into hands-on penetration testing workflows, from reconnaissance and enumeration to exploitation and reporting, following structured offensive security methodologies.",
  },
  {
    name: "Security Writeups",
    slug: "security-writeups",
    description:
      "Detailed security writeups covering CTF challenges, real-world vulnerability discoveries, bug bounty findings, and step-by-step exploit walkthroughs.",
    intro:
      "In-depth security writeups documenting real-world vulnerabilities, CTF challenges, bug bounty reports, and technical exploit chains with structured methodology and remediation insights.",
  },
  {
    name: "Vulnerability Research",
    slug: "vulnerability-research",
    description:
      "Technical vulnerability analysis, exploit development fundamentals, root cause investigation, and responsible disclosure processes.",
    intro:
      "Deep technical research into software vulnerabilities, exploit chains, root cause analysis, and the structured disclosure lifecycle for responsible security research.",
  },
  {
    name: "Application Security",
    slug: "application-security",
    description:
      "Secure coding standards, DevSecOps integration, SAST/DAST workflows, and threat modeling for reducing application-level risk.",
    intro:
      "Application security strategies focused on secure coding, automated security testing, DevSecOps pipelines, and proactive risk reduction across the SDLC.",
  },
  {
    name: "Security Tools",
    slug: "security-tools",
    description:
      "Hands-on tutorials and deep technical breakdowns of tools like Burp Suite, Nmap, Metasploit, and modern security testing utilities.",
    intro:
      "Technical guides and practical breakdowns of offensive and defensive security tools including Burp Suite, Nmap, Metasploit, and industry-standard assessment utilities.",
  },
];

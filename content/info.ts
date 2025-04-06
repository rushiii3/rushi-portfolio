import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import {
  SiGithub,
  SiFigma,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiJest,
  SiShopify,
  SiFramer,
} from "react-icons/si";
import { FaCode, FaTools } from "react-icons/fa";
export const personalInfo = {
  name: "Hrushikesh Shinde",
  title: "Cyber Security Enthusiast",
  description: `I'm a Cybersecurity Specialist with a strong focus on Vulnerability Assessment and Penetration Testing (VAPT), as well as web and mobile application security, network security, and digital forensics. I excel at identifying and mitigating critical vulnerabilities such as XSS, SQL Injection, IDOR, CSRF, and CORS misconfigurations, and I'm experienced in conducting detailed configuration reviews to ensure secure system deployments.

With hands-on skills in manual penetration testing, I’m adept at modifying and compiling exploit code, using OSINT for threat intelligence, and applying secure coding practices to help build robust, secure applications. I work comfortably across Windows, Linux, and Kali Linux, and I'm proficient with tools like Nmap and other industry-standard security platforms.

I'm deeply passionate about cyber defense and continuously strive to enhance cyber resilience by securing digital assets and staying ahead of emerging threats—always with a security-first mindset.`,
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
    title: "Hacktify Cyber Security (Virtual Internship) ",
    subtitle: "Software Developer Intern",
    timeline: "May 2024 - Present",
    content: [
      "Conducted penetration testing on web applications, identifying vulnerabilities.",
      "Exploited HTML Injection, XSS, IDOR, SQL Injection, CSRF, and CORS misconfigurations.",
      "Used tools like Burp Suite, Nmap, and SQLmap for testing.",
      "Prepared security assessment reports with PoC exploits and recommended fixes.",
    ],
  },
  {
    title: "GirlScript Summer of Code",
    subtitle: "Open Source Contributor",
    timeline: "May 2024 - Aug 2024",
    content: [
      "Designed user interfaces, improving user satisfaction and reducing bounce rates.",
      "Optimized frontend components, reducing load times by 20%.",
      "Developed an API handling 1,000 daily requests for doctor specializations.",
      "Collaborated with a team, increasing feature set by 30% and improving project delivery time by 40%.",
    ],
  },
  {
    title: "V.G. Vaze College of Arts, Science and Commerce (Autonomous)",
    subtitle: "Software Developer",
    timeline: "May 2024 - Aug 2024",
    content: [
      "Collaborated with 5+ stakeholders, including the principal and administration, to gather and clarify project requirements.",
      "Designed a fully responsive web-based interface, increasing user engagement by 30% and receiving 95% positive feedback.",
      "Created detailed design documents, including technical specifications and user flow diagrams, to ensure project clarity.",
      "Followed Agile methodology for iterative progress and adaptability.",
    ],
  },
];

export const skillsData = {
  frontend: {
    languages: ["HTML", "CSS", "JavaScript", "TypeScript", "Dart"],
    frameworks: [
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Shopify", icon: SiShopify },
      { name: "Framer", icon: SiFramer },
    ],
    state_management: ["Zustand", { name: "Redux", icon: SiRedux }],
    data_fetching: ["TanStack Query", "Axios"],
    styling: [
      { name: "Tailwind CSS", icon: SiTailwindcss },
      "Styled Components",
      "CSS Modules",
      "SASS",
      "Bootstrap",
    ],
    ui_libraries: ["Material UI", "Mantine UI", "Chakra UI", "Shadcn UI"],
    animations: ["Framer Motion", "Motion"],
    cross_platform: ["React Native", "Flutter"],
  },
  backend: {
    languages: ["Node.js", "Bun"],
    frameworks: ["Express.js", "Socket.io", "Mongoose", "Prisma", "Drizzle"],
    databases: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      "SQLite",
      "Redis",
    ],
    cms: ["Firebase", "Supabase", "Appwrite", "Sanity.io", "Payload CMS"],
    authentication: ["JWT", "OAuth/OIDC"],
    hosting: ["Vercel", "Netlify"],
    scalability: ["WebSockets", "WebRTC", "Cloudinary"],
  },
  security: {
    fundamentals: ["OWASP Top 10", "Secure Coding", "Encryption", "CSP"],
    testing: [
      "Penetration Testing",
      "Security Audits",
      "Vulnerability Assessment",
      "Threat Modeling",
    ],
    tools: ["Burp Suite", "OWASP ZAP", "Metasploit", "SAST/DAST"],
  },
  devops: {
    ci_cd: [{ name: "Docker", icon: SiDocker }, "GitHub Actions"],
    testing: [
      { name: "Jest", icon: SiJest },
      "React Testing Library",
      "Postman",
    ],
    debugging: ["React DevTools", "Chrome DevTools"],
  },
  tools: [
    { name: "VS Code", icon: FaCode },
    { name: "Git", icon: FaCode },
    { name: "GitHub", icon: SiGithub },
    { name: "ESLint", icon: FaTools },
    { name: "Figma", icon: SiFigma },
  ],
};

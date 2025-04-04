import { BsGithub, BsLinkedin } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
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



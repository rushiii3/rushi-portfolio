import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const baseUrl = (site ? site.toString() : (process.env.PUBLIC_URL || 'http://localhost:4321')).replace(/\/$/, '');
  const content = `# Hrushikesh Shinde — Cybersecurity Blog & Portfolio
# Associate Information Security Consultant | Application Security & VAPT Specialist
# Based in Mumbai, India

> This site is the personal portfolio and cybersecurity blog of Hrushikesh Shinde,
> an Associate Information Security Consultant specialising in Web Application Security,
> VAPT, and OWASP Top 10 testing. Content is written from hands-on professional
> experience in FinTech security testing and penetration testing.

## Portfolio & Profile

- [Homepage](${baseUrl}/): Overview, featured projects, latest articles, and technical skills
- [About Me](${baseUrl}/about): Background, security expertise, and technical proficiencies
- [Experience](${baseUrl}/experience): Professional career history at qSEAp Infotech and Hacktify Cyber Security
- [Projects & Security Tools](${baseUrl}/work): Security tools, full-stack applications, and open-source software
- [Blog](${baseUrl}/blog): Technical articles, exploitation guides, and vulnerability research
- [RSS Feed](${baseUrl}/rss.xml): RSS 2.0 XML subscription feed

## Projects

- [SecureBlog](${baseUrl}/work/secure-blog): Cybersecurity blog engine built with Next.js, Supabase, and shadcn/ui featuring sanitized markdown rendering, infinite scroll, and robust security headers
- [Cover Letter Customizer](${baseUrl}/work/cover-letter-customizer): AI-assisted web tool built with Next.js to write, preview, and format professional cover letters with markdown syntax and one-click PDF export
- [Terabox Player](${baseUrl}/work/terabox-player): Ad-free mobile media player built with Expo and React Native to stream and download Terabox cloud videos with local SQLite history and dark mode
- [MeshFlix](${baseUrl}/work/meshflix): Fast, mobile-first streaming discovery app built with React Native, Expo, and TMDB API, featuring persistent state with MMKV and video playback
- [OddNotEven Store](${baseUrl}/work/oddnoteven-store): Custom Shopify e-commerce platform featuring tailored liquid sections, optimized responsive layouts, and enhanced checkout user experience
- [UltimateHealth](${baseUrl}/work/ultimate-health): Open-source health resource repository and article management platform featuring reliable wellness insights and doctor scheduling workflows

## Blog — Cybersecurity Fundamentals

- [CIA Triad, Authentication & Authorization Guide](${baseUrl}/blog/cia-triad-authentication-authorization): Understand the CIA Triad, non-repudiation, authentication factors, MFA types, and authorization — the foundation of modern cybersecurity controls
- [InfoSec Concepts: Risk, Vulnerabilities & Controls](${baseUrl}/blog/information-security-concepts): Learn the foundational concepts of information security: core InfoSec goals, risk management, vulnerability types, threats, and security controls explained
- [Cybersecurity Threats: Attackers, Malware & Exploits](${baseUrl}/blog/identifying-security-threats): Learn the major cybersecurity threats including threat actors, social engineering, malware, network and wireless attacks. A complete beginner-friendly guide
- [Cryptography Fundamentals: Encryption, Hashing & Ciphers](${baseUrl}/blog/cryptography-fundamentals): A complete guide to cryptography: symmetric vs asymmetric encryption, hashing, digital signatures, ciphers, and how each primitive secures digital assets

## Blog — Network & Infrastructure Security

- [Network Devices & Security Components Explained (2026)](${baseUrl}/blog/network-devices-security-components): A complete guide to network devices and security components: routers, switches, firewalls, proxies, load balancers, and traffic analysis architecture
- [Secure Network Design: NAC, DMZ, Zoning & IPSec](${baseUrl}/blog/secure-network-design): Learn how to design a secure network using Network Access Control (NAC), DMZ architecture, network zoning (guest, honeynet), and IPSec protocol suites

## Blog — Security Tools & CTF Walkthroughs

- [Burp Suite for HTB & CTF Players: Complete Guide (2026)](${baseUrl}/blog/burp-suite-for-htb-ctf-players): Master Burp Suite for HackTheBox and CTF web challenges. Covers Proxy, Repeater, Intruder, Decoder, Comparer, and essential BApp extensions with real workflows
- [FFUF Cheat Sheet: Extension Fuzzing for HTB & Pentests](${baseUrl}/blog/ffuf-htb-ctf-guide): FFUF commands for PHP, ASP.NET, Java, Python and Next.js: one command per extension (.php, .aspx, .jsp, .bak) plus my single-level fuzz method
- [ReconSpider: HTB Web Enumeration Tool Guide (2026)](${baseUrl}/blog/reconspider-htb-web-enumeration-tool): Learn how to install and use ReconSpider for web enumeration on HackTheBox. Covers setup, JSON output analysis, and practical recon workflow for pentesters

## Blog — Web Security & Vulnerability Research

- [OWASP Top 10: Essential Web Security Risks Guide](${baseUrl}/blog/owasp-top-10): A comprehensive guide to understanding and preventing the top security threats in web applications, based on the OWASP Top 10
- [Default Credentials Vulnerability: Risks & Prevention](${baseUrl}/blog/default-credentials-vulnerability): Two real black-box findings show how default usernames, default passwords, and missing rate limiting combine into full account takeover
- [Zod .refine() DoS Vulnerability: Root Cause & Fix](${baseUrl}/blog/zod-refine-dos-vulnerability): Learn why Zod's .refine() can trigger denial of service in Node.js APIs when validation fails, featuring a reproducible PoC and safe architecture patterns

## Author

- Name: Hrushikesh Shinde
- Role: Associate Information Security Consultant at qSEAp Infotech Pvt. Ltd
- Specialisation: Web Application VAPT, OWASP Top 10, FinTech Security Testing
- Tools: Burp Suite, Nmap, SQLmap, AppScan 360, Kali Linux, Metasploit, ffuf
- Certifications in progress: HTB Certified Web Exploitation Specialist (CWES)
- LinkedIn: https://www.linkedin.com/in/hrushikesh-shinde-developer/
- GitHub: https://github.com/rushiii3
- HackTheBox: https://profile.hackthebox.com/profile/019ccd33-4310-73b7-8223-264faac08c09
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

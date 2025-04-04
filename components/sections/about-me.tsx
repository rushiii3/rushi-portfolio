"use client";
import React from "react";
import { Motion } from "../motion";

const AboutMe = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="w-full">
        <div className="text-left">
          <Motion
            type="h1"
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8"
          >
            About me
          </Motion>

          <Motion
            type="p"
            className="w-full text-base font-normal leading-7 text-justify text-neutral-200"
          >
            Cybersecurity specialist with expertise in Vulnerability Assessment
            and Penetration Testing (VAPT), web and mobile application security,
            network security, and digital forensics. Skilled in manual
            penetration testing, identifying and mitigating vulnerabilities such
            as XSS, SQL Injection, IDOR, CSRF, and CORS misconfigurations, and
            conducting configuration reviews for secure systems. Proficient in
            modifying and compiling exploit code, leveraging OSINT for cyber
            threat analysis, and applying secure software development principles
            to build resilient applications. Experienced in working with
            Windows, Linux, Kali Linux, Nmap, and industry-standard security
            tools. Passionate about strengthening cyber resilience, securing
            digital assets, and proactively addressing emerging cyber threats
            with a security-first approach.
          </Motion>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

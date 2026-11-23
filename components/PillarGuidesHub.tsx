import Link from "next/link";
import { Compass, ArrowRight, ShieldCheck, Bug, Terminal } from "lucide-react";

const PILLARS = [
  {
    slug: "information-security-concepts",
    cluster: "InfoSec Fundamentals",
    title: "Information Security Concepts Explained",
    description: "Core goals of InfoSec, risk calculation, threat models, and prevention/detection controls.",
    icon: ShieldCheck,
  },
  {
    slug: "owasp-top-10",
    cluster: "Web Security",
    title: "OWASP Top 10 Web Vulnerabilities Guide",
    description: "Deep dive into Broken Access Control, Injection, Cryptographic Failures, and SSRF.",
    icon: Bug,
  },
  {
    slug: "burp-suite-for-htb-ctf-players",
    cluster: "Security Tools",
    title: "Burp Suite Complete Guide for HTB & CTFs",
    description: "Master Proxy, Repeater, Intruder, Decoder, and BApp extensions with hands-on workflows.",
    icon: Terminal,
  },
];

export function PillarGuidesHub() {
  return (
    <div className="mb-10 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-1">
        <Compass className="size-4 text-blue-500 shrink-0" />
        <span>Start Here • Foundational Security Pillars</span>
      </div>
      <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        New to cybersecurity or web penetration testing? Start with these three comprehensive pillar guides:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Link
              key={pillar.slug}
              href={`/blog/${pillar.slug}`}
              className="group flex flex-col justify-between p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 mb-1.5">
                  <Icon className="size-3.5 shrink-0" />
                  <span>{pillar.cluster}</span>
                </div>
                <h3 className="font-semibold text-xs md:text-sm leading-snug text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                  {pillar.title}
                </h3>
                <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                <span>Read pillar</span>
                <ArrowRight className="size-3 shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default PillarGuidesHub;

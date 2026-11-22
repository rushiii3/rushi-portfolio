"use client";
import { LazyMotion, domAnimation, m } from "motion/react";
import { BookTextIcon, Briefcase, CircleUser, HomeIcon, SquareActivityIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useSyncExternalStore } from "react";

export const navItems = [
  { id: 1, label: "Home", icon: HomeIcon, href: "/" },
  { id: 2, label: "About", icon: CircleUser, href: "/about" },
  { id: 3, label: "Experience", icon: Briefcase, href: "/experience" },
  { id: 4, label: "Work", icon: SquareActivityIcon, href: "/work" },
  { id: 5, label: "Blog", icon: BookTextIcon, href: "/blog" },
] as const;

const SPRING = { type: "spring", bounce: 0.15, duration: 0.45 } as const;
const ENTRY_TRANSITION = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } as const;

function subscribeDesktop(callback: () => void) {
  const mq = window.matchMedia("(min-width: 768px)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getServerSnapshot() {
  return false;
}

const NavTab = memo(function NavTab({
  tab,
  isActive,
}: {
  tab: (typeof navItems)[number];
  isActive: boolean;
}) {
  const Icon = tab.icon;
  return (
    <Link
      href={tab.href}
      className={`${
        isActive
          ? "text-white dark:text-black"
          : "dark:hover:text-white/60 hover:text-black/60"
      } relative rounded-xl cursor-pointer px-3 py-2 min-h-11 text-sm font-medium dark:text-white outline-sky-400 transition focus-visible:outline-2 flex flex-row items-center gap-2`}
      style={{ WebkitTapHighlightColor: "transparent" }}
      aria-label={tab.label}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && (
        <m.span
          layoutId="nav-indicator"
          className="absolute inset-0 z-10 dark:bg-white mix-blend-difference rounded-xl bg-black"
          style={{ borderRadius: 10 }}
          transition={SPRING}
        />
      )}
      <Icon size={18} aria-hidden="true" />
      {tab.id !== 1 && <span className="hidden lg:block">{tab.label}</span>}
    </Link>
  );
});

const emptySubscribe = () => () => {};

export default function Navbar() {
  const path = usePathname();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isDesktop = useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, getServerSnapshot);

  const activeTab =
    navItems
      .filter((tab) => path.startsWith(tab.href))
      .sort((a, b) => b.href.length - a.href.length)[0]?.id ?? 1;

  if (!mounted) return null;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="z-40 flex justify-center items-center space-x-1 rounded-xl p-2 border fixed left-1/2 -translate-x-1/2 bottom-3 md:relative md:left-0 md:translate-x-0 md:bottom-0 bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-md"
        initial={{ y: isDesktop ? -100 : 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={ENTRY_TRANSITION}
      >
        {navItems.map((tab) => (
          <div key={tab.id} className="flex flex-row items-center">
            <NavTab tab={tab} isActive={activeTab === tab.id} />
            {tab.id === 1 && (
              <div className="bg-white/30 w-px h-6 mx-1" aria-hidden="true" />
            )}
          </div>
        ))}
      </m.div>
    </LazyMotion>
  );
}

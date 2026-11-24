"use client";
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
          ? "text-black dark:text-white"
          : "text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
      } relative rounded-xl cursor-pointer px-3 py-2 min-h-11 text-sm font-medium outline-sky-400 transition focus-visible:outline-2 flex flex-row items-center gap-2`}
      style={{ WebkitTapHighlightColor: "transparent" }}
      aria-label={tab.label}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive && (
        <span
          className="absolute inset-0 z-10 dark:bg-white mix-blend-difference rounded-xl bg-black"
          style={{ borderRadius: 10 }}
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

  const activeTab =
    navItems
      .filter((tab) => path.startsWith(tab.href))
      .sort((a, b) => b.href.length - a.href.length)[0]?.id ?? 1;

  if (!mounted) return null;

  return (
    <div
      className="z-40 flex justify-center items-center space-x-1 rounded-xl p-2 border border-neutral-200/60 dark:border-white/10 fixed left-1/2 -translate-x-1/2 bottom-3 md:relative md:left-0 md:translate-x-0 md:bottom-0 bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-md transition-all duration-300 ease-out animate-in fade-in slide-in-from-bottom-2 md:slide-in-from-top-2"
    >
      {navItems.map((tab) => (
        <div key={tab.id} className="flex flex-row items-center">
          <NavTab tab={tab} isActive={activeTab === tab.id} />
          {tab.id === 1 && (
            <div className="bg-neutral-300 dark:bg-white/30 w-px h-6 mx-1" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

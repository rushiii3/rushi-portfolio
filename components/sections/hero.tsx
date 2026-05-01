"use client";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { personalInfo, socialLinks } from "@/content/info";

// ✅ Defined once outside component — no recreation on re-render
const TRANSITION = { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const };
const VARIANTS = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};
const STAGGER = { staggerChildren: 0.04 };

// ✅ motion.create() called outside component — not recreated every render
const MotionButton = m.create(Button);

// ✅ Words split outside component — personalInfo.name is static
const NAME_WORDS = personalInfo.name.split(" ");

const Hero1 = () => {
  return (
    // ✅ LazyMotion wraps only this component — 18KB instead of 100KB
    <LazyMotion features={domAnimation} strict>
      <section className="md:mt-52 mt-20 mx-auto lg:mb-32">
        <div className="w-full container">
          <div className="grid items-center gap-8 lg:grid-cols-3">

            {/* Text column */}
            <m.div
              className="flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1 lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              // ✅ transition with stagger must be on the parent, not children
              transition={STAGGER}
              viewport={{ once: true, margin: "-80px" }}
            >
              <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
                {NAME_WORDS.map((word, index) => (
                  <m.span
                    key={index}
                    className="inline-block"
                    variants={VARIANTS}
                    transition={TRANSITION}
                  >
                    {word}
                    {/* ✅ Space is part of the span so it animates correctly */}
                    {index < NAME_WORDS.length - 1 ? "\u00A0" : null}
                  </m.span>
                ))}
              </h1>

              <m.p
                className="mb-8 max-w-xl text-muted-foreground lg:text-xl"
                variants={VARIANTS}
                transition={TRANSITION}
                // ✅ Removed redundant viewport prop — parent already handles it
              >
                {personalInfo.title}
              </m.p>

              {/* Social links */}
              <m.div
                className="flex max-w-2xl justify-center md:justify-start gap-2 flex-row"
                variants={VARIANTS}
                transition={{ ...TRANSITION, staggerChildren: 0.1 }}
              >
                {socialLinks.map((link) => (
                  <MotionButton
                    asChild
                    key={link.name}
                    variants={VARIANTS}
                    transition={TRANSITION}
                    variant="outline"
                  >
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                    >
                      <link.icon className="size-4" aria-hidden="true" />
                      <span>{link.name}</span>
                    </Link>
                  </MotionButton>
                ))}
              </m.div>
            </m.div>

            {/* Image column */}
            <m.div
              className="order-1 lg:order-2 lg:col-span-1"
              variants={VARIANTS}
              // ✅ Use variants instead of separate initial/animate — consistent with parent
              transition={TRANSITION}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="relative aspect-square md:aspect-2/3">
                <Image
                  src={personalInfo.image}
                  fill
                  alt="Hrushikesh Shinde"
                  quality={85}
                  priority
                  // ✅ Fixed sizes — was wrongly using 1200px for a 1/3-column image
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </m.div>

          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export { Hero1 };
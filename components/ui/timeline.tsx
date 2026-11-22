"use client";
import { useScroll, useTransform, LazyMotion, domAnimation, m } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  subtitle: string;
  timeline: string;
  content: string[];
}
const transition = { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.5 };
const variants = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    filter: "blur(0)",
    opacity: 1,
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className="w-full"
        ref={containerRef}
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.04 }}
        viewport={{ once: true }}
      >
        <m.h2
          transition={transition}
          variants={variants}
          className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8"
        >
          Work Experience
        </m.h2>

        <m.div
          transition={transition}
          variants={variants}
          ref={ref}
          className="relative mx-auto pb-20"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-14 md:gap-10"
            >
              <div className="sticky flex flex-col z-40 items-center top-40 self-start max-w-xs ">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
              </div>

              <div className="relative pl-20 pr-4 w-full ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ">
                  <div className="col-span-2">
                    <h3 className="text-2xl text-left font-bold dark:text-white text-neutral-800">
                      {item.title}
                    </h3>
                    <p className="text-sm  text-left italic text-[#07a97d]">
                      {item.subtitle}
                    </p>
                  </div>
                  <p className="text-left md:text-right">{item.timeline}</p>
                </div>
                <div className="pl-4">
                  <ul className="list-disc marker:text-[#07a97d] list-outside space-y-1 text-neutral-800 dark:text-neutral-200 text-md font-normal mb-8 text-justify">
                    {item?.content?.map((content, idx) => (
                      <li key={idx}>
                        {content}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
          >
            <m.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </m.div>
      </m.div>
    </LazyMotion>
  );
};

"use client";
import React from "react";
import { Motion } from "../motion";

const AboutMe = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="w-full">
        <div
          className="text-left"
          // initial="hidden"
          // whileInView="visible"
          // transition={{ staggerChildren: 0.04 }}
          // viewport={{ once: true }}
        >
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
            Donec porttitor, enim ut dapibus lobortis, lectus sem tincidunt dui,
            eget ornare lectus ex non libero. Nam rhoncus diam ultrices
            porttitor laoreet. Ut mollis fermentum ex, vel viverra lorem
            volutpat sodales. In ornare porttitor odio sit amet laoreet. Sed
            laoreet, nulla a posuere ultrices, purus nulla tristique turpis,
            hendrerit rutrum augue quam ut est. Fusce malesuada posuere libero,
            vitae dapibus eros facilisis euismod. Sed sed lobortis justo, ut
            tincidunt velit. Mauris in maximus eros.
          </Motion>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

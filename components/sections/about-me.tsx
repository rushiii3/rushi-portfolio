"use client";
import { motion } from "framer-motion";
import React from "react";

const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };

const variants = {
  hidden: {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    filter: "blur(0)",
    opacity: 1,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const AboutMe = () => {
  return (
    <section className="py-12 lg:py-16">
      <div className="w-full">
        <motion.div
          className="text-left"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.04 }}
          viewport={{ once: true }}
        >
          <motion.h2
            transition={transition}
            variants={variants}
            className="my-6 text-2xl tracking-tight font-extrabold text-white sm:text-3xl md:text-4xl"
          >
            About me
          </motion.h2>
          <motion.p
            transition={transition}
            variants={variants}
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
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;

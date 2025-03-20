"use client";
import { Download, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";


const transition = { duration: 1, ease: [0.25, 0.1, 0.25, 1] };
const variants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0)", opacity: 1 },
};
const MotionButton = motion(Button);

const Hero1 = () => {
  const words = "Hello There".split(" ");
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-3">
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left order-2 lg:order-1 lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.04 }}
          >
            {/* {badge && (
              <Badge variant="outline">
                {badge}
                <ArrowUpRight className="ml-2 size-4" />
              </Badge>
            )} */}
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {words.map((word, index) => (
                <React.Fragment key={index}>
                  <motion.span
                    className="inline-block"
                    transition={transition}
                    variants={variants}
                  >
                    {word}
                  </motion.span>
                  {index < words.length - 1 && " "}
                </React.Fragment>
              ))}
            </h1>

            <motion.p
              className="mb-8 max-w-xl text-muted-foreground lg:text-xl"
              transition={transition}
              variants={variants}
            >
              Cyber Secuirty from India 🇮🇳
            </motion.p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <MotionButton
                asChild
                className="w-full sm:w-auto"
                transition={transition}
                initial={variants.hidden}
                animate={variants.visible}
                variant={"default"}
              >
                <a href={""}>
                  Contact Me
                  <Phone className="size-4" />
                </a>
              </MotionButton>

              <MotionButton
                asChild
                variant={"outline"}
                className="w-full sm:w-auto"
                transition={transition}
                initial={variants.hidden}
                animate={variants.visible}
              >
                <a href="">
                  Download Resume
                  <Download className="size-4" />
                </a>
              </MotionButton>
            </div>
          </motion.div>
          <motion.div
            className="order-1 lg:order-2 lg:col-span-1"
            transition={transition}
            initial={variants.hidden}
            animate={variants.visible}
          >

            <Image
              src={"https://res.cloudinary.com/dmuhioahv/image/upload/v1694342370/IMG_9440.jpg"}
              alt={"Profile Image"}
              className="rounded-md h-full w-full object-cover "
              height={300}
              width={200}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Hero1 };

import React from "react";

const HeroSection = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="pt-12 lg:pt-16 w-full mb-10">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
        {title}
      </h1>
      <p className="text-gray-400 max-w-3xl">{description}</p>
    </div>
  );
};

export default HeroSection;

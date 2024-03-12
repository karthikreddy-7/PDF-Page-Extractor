import React from "react";
import hero from "../img/hero.jpeg";
const Hero = () => {
  return (
    <>
      <div className="hero min-h-[76vh]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={hero} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">PDF Extractor</h1>
            <p className="py-6">
              Extract certain pages from ypur PDF and easily download your new
              PDF with a single click.
            </p>
            <button className="btn btn-primary">
              Extract your Custom PDF !!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

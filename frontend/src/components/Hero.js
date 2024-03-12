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
              Split PDF file Separate one page or a whole set for easy
              conversion into independent PDF files.
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

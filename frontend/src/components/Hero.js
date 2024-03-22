import React from "react";
import hero from "../img/hero.jpeg";
const Hero = ({ setShowFeature }) => {
  return (
    <>
      <div className="hero min-h-[79vh]">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={hero} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl text-white font-bold">PDF Extractor</h1>
            <p className="py-6 text-xl text-white ">
              Extract certain pages from ypur PDF
            </p>
            <p className="text-xl text-white mb-3 ">
              and easily download your new PDF with a single click.
            </p>
            <button
              className="btn m-3 p-2 btn-primary text-white"
              onClick={() => setShowFeature(true)}
            >
              Extract your Custom PDF !!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

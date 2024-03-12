import React from "react";

const Feature = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (extension !== "pdf") {
        alert("Only PDF files are allowed.");
        event.target.value = "";
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center text-white text-xl items-center min-h-[79vh]">
        <p>
          Split PDF file Separate one page or a whole set for easy conversion
          into independent PDF files.
        </p>
        <br />
        <label className="btn h-16 text-2xl font-bold text-white btn-wide">
          Select PDF File
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        <br />
        <p className="text-xs">or drop PDF here</p>
      </div>
    </>
  );
};

export default Feature;

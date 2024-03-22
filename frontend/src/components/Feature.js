import React, { useState } from "react";
import Alert from "./Alert";

const Feature = ({ setPdfUploaded, setPdf }) => {
  const [alertMessage, setAlertMessage] = useState(""); // State to hold the alert message

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (extension !== "pdf") {
        setAlertMessage("Only PDF files are allowed."); // Set the alert message
        event.target.value = "";
        setTimeout(() => {
          setAlertMessage("");
        }, 4000);
      } else {
        setPdf(file); // Set the PDF file
        setPdfUploaded(true);
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
        <br />
        <br />
        {alertMessage && <Alert message={alertMessage} />}
      </div>
    </>
  );
};

export default Feature;

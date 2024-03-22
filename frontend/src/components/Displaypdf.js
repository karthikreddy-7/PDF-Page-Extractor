import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DisplayPDF = ({ pdfFile }) => {
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState({});
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const initialSelectedPages = {};
    for (let i = 1; i <= numPages; i++) {
      initialSelectedPages[i] = false;
    }
    setSelectedPages(initialSelectedPages);
  }, [numPages]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log("Total number of pages:", numPages);
    setNumPages(numPages);
  };

  const handleCheckboxChange = (pageNumber) => {
    setSelectedPages((prevSelectedPages) => ({
      ...prevSelectedPages,
      [pageNumber]: !prevSelectedPages[pageNumber],
    }));
    console.log(selectedPages);
  };

  const extractPages = async () => {
    const selectedPageNumbers = Object.entries(selectedPages)
      .filter(([_, isSelected]) => isSelected)
      .map(([pageNumber]) => parseInt(pageNumber));

    const formData = new FormData();
    formData.append("pdf", pdfFile); // Make sure pdfFile contains the selected PDF file

    // Append selected pages array as a JSON string
    formData.append("selectedPages", JSON.stringify(selectedPageNumbers));

    try {
      // Send API request to backend with the selected pages
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      // Handle response
      if (response.ok) {
        // Extract PDF blob from response
        const pdfBlob = await response.blob();
        // Create download link
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "modified_pdf.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        console.log("PDF extracted successfully!");
      } else {
        console.error("Failed to extract PDF:", response.statusText);
      }
    } catch (error) {
      console.error("Error extracting PDF:", error);
    } finally {
      setResponse(true);
    }
  };

  return (
    <>
      {!response ? (
        <>
          {" "}
          <div className="m-4 flex flex-wrap justify-center">
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="relative mr-4 mb-4">
                  <Page
                    pageNumber={index + 1}
                    className=""
                    renderMode="canvas" // Set renderMode to "canvas"
                    key={`page_${index + 1}`}
                    renderTextLayer={false} // Disable text layer annotations
                    renderAnnotationLayer={false} // Disable annotations
                    width={200} // Adjust the width as needed
                    height={300} // Adjust the height as needed
                  />
                  <div className="absolute top-0 right-0 m-2">
                    <input
                      type="checkbox"
                      checked={selectedPages[index + 1]}
                      onChange={() => handleCheckboxChange(index + 1)}
                    />
                  </div>
                </div>
              ))}
            </Document>
          </div>
          <div className="flex justify-center items-center">
            <button className="btn btn-wide text-white" onClick={extractPages}>
              Extract Pages{" "}
            </button>
          </div>
        </>
      ) : (
        <>
          <div></div>
        </>
      )}
    </>
  );
};

export default DisplayPDF;

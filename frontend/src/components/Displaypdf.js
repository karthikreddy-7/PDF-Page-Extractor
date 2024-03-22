import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DisplayPDF = ({ pdfFile, setPdfUploaded, setShowFeature }) => {
  const [numPages, setNumPages] = useState(null);
  const [selectedPages, setSelectedPages] = useState({});
  const [response, setResponse] = useState(false);
  const [newPdf, setNewPdf] = useState(null);

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

  const extractPagesbyfrontend = async () => {
    const selectedPageNumbers = Object.entries(selectedPages)
      .filter(([_, isSelected]) => isSelected)
      .map(([pageNumber]) => parseInt(pageNumber));

    // Convert pdfFile to a URL
    const pdfUrl = URL.createObjectURL(pdfFile);

    const loadingTask = pdfjs.getDocument(pdfUrl);
    loadingTask.promise.then((pdf) => {
      const newPdfPages = [];
      selectedPageNumbers.forEach((pageNumber) => {
        pdf.getPage(pageNumber).then((page) => {
          newPdfPages.push(page);
          if (newPdfPages.length === selectedPageNumbers.length) {
            // Construct a new PDF using selected pages
            const newPdf = new Blob(newPdfPages, { type: "application/pdf" });
            // Create download link
            const url = window.URL.createObjectURL(newPdf);
            const a = document.createElement("a");
            a.href = url;
            a.download = "modified_pdf.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            console.log("New PDF created and downloaded successfully!");
          }
        });
      });
    });
  };

  const goBack = () => {
    setShowFeature(true);
    setPdfUploaded(false);
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
          <div className="flex justify-center gap-4 items-center">
            <button className="btn bg-red-800 text-white" onClick={goBack}>
              Go Back{" "}
            </button>
            <button
              className="btn  text-white bg-green-800"
              onClick={extractPagesbyfrontend}
            >
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

import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Feature from "./components/Feature";
import Displaypdf from "./components/Displaypdf";
import { pdfjs } from "react-pdf";

function App() {
  const [showFeature, setShowFeature] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [pdf, setPdf] = useState(null);
  return (
    <>
      <div className="m-4 bg-black">
        <div className="rounded-2xl">
          <Navbar setShowFeature={setShowFeature} />
          {!showFeature ? (
            <Hero setShowFeature={setShowFeature} />
          ) : pdfUploaded ? (
            <Displaypdf
              pdfFile={pdf}
              setPdfUploaded={setPdfUploaded}
              setShowFeature={setShowFeature}
            />
          ) : (
            <Feature setPdfUploaded={setPdfUploaded} setPdf={setPdf} />
          )}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <div className="">
        <div className="rounded-2xl">
          <Navbar />
          <Hero />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

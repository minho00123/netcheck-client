import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import About from "./Home/About";
import Learn from "./Info/Learn";
import Result from "./Result/Result";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </main>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Header from "./Common/Header";
import Home from "./Home/Home";
import About from "./Home/About";
import Learn from "./Info/Learn";
import Result from "./Result/Result";

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/result/:id" element={<Result />} />
      </Routes>
    </main>
  );
}

export default App;

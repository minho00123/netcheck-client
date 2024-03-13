import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";
import Learn from "./Learn";
import Result from "./Result";

function App() {
  return (
    <main>
      <Header />
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

import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import About from "./Home/About.jsx";
import Result from "./Result/Result.jsx";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/result/:customId" element={<Result />} />
      </Routes>
    </main>
  );
}

export default App;

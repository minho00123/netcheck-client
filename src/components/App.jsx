import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <main className="px-3 py-5">
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
  );
}

export default App;

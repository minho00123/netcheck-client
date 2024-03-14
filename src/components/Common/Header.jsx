import useStore from "../../store/store.js";
import { Link } from "react-router-dom";
import Input from "./Input.jsx";
import logoImage from "../../assets/logo.png";

export default function Header() {
  const { showHeaderInput } = useStore();

  return (
    <header className="flex items-center justify-between h-20 mx-10 m-3">
      <Link to="/">
        <img src={logoImage} alt="logo" className="h-10" />
      </Link>
      {showHeaderInput && (
        <>
          <Input />
          <button className="font-bold text-xl">Share</button>
        </>
      )}
      <Link to="/about">
        <button className="font-bold text-xl">About</button>
      </Link>
    </header>
  );
}

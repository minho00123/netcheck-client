import { Link } from "react-router-dom";
import logoImage from "../../assets/logo.png";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-16 md:h-20 lg:h-24 mx-3 md:mx-5 lg:mx-10">
      <Link to="/">
        <img src={logoImage} alt="logo" className="h-7 md:h-10 lg:h-14" />
      </Link>
      <Link to="/about">
        <button className="text-sm md:text-lg lg:text-xl font-bold">
          About
        </button>
      </Link>
    </header>
  );
}

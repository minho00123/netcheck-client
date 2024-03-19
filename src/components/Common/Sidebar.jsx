import {
  HiGlobeAsiaAustralia,
  HiGlobeAmericas,
  HiGlobeEuropeAfrica,
} from "react-icons/hi2";
import logoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <section className="w-1/4 h-full p-5 bg-blue-light">
      <Link to="/" className="flex justify-center align-center">
        <img src={logoImage} alt="logo" className="h-10 mt-3 mb-20" />
      </Link>
      <button className="flex items-center w-full p-3 rounded-lg text-md text-gray font-bold hover:bg-blue hover:text-white">
        <HiGlobeAsiaAustralia className="mr-1" />
        North East Asia (Seoul)
      </button>
      <button className="flex items-center w-full p-3 rounded-lg text-md text-gray font-bold hover:bg-blue hover:text-white">
        <HiGlobeAmericas className="mr-1" />
        US - East (Virginia)
      </button>
      <button className="flex items-center w-full p-3 rounded-lg text-md text-gray font-bold hover:bg-blue hover:text-white">
        <HiGlobeAmericas className="mr-1" />
        US - West (California)
      </button>
      <button className="flex items-center w-full p-3 rounded-lg text-md text-gray font-bold hover:bg-blue hover:text-white">
        <HiGlobeEuropeAfrica className="mr-1" />
        Europe (London)
      </button>
      <button className="flex items-center w-full p-3 rounded-lg text-sm text-gray font-bold hover:bg-blue hover:text-white">
        <HiGlobeAmericas className="mr-1" />
        South America (São Paulo)
      </button>
    </section>
  );
}

import useStore from "../../store/store";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { IoEarth } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import {
  HiGlobeAsiaAustralia,
  HiGlobeAmericas,
  HiGlobeEuropeAfrica,
} from "react-icons/hi2";

export default function Sidebar() {
  const { setUrl, selectedRegion, setSelectedRegion } = useStore();

  const handleLogoClick = () => {
    setUrl("");
    setSelectedRegion("Seoul");
  };

  const handleRegionClick = region => {
    setSelectedRegion(region);
  };

  const buttonClass = region =>
    `flex items-center w-full p-3 rounded-lg text-md font-bold ${
      selectedRegion === region
        ? "bg-blue text-white"
        : "text-gray hover:bg-blue hover:text-white"
    }`;

  return (
    <section className="w-1/4 h-full p-5 bg-blue-light">
      <Link
        to="/"
        className="flex justify-center align-center"
        onClick={handleLogoClick}
      >
        <img src={logoImage} alt="logo" className="h-10 mt-3 mb-20" />
      </Link>
      <button
        className={buttonClass("Seoul")}
        onClick={() => handleRegionClick("Seoul")}
      >
        <HiGlobeAsiaAustralia className="mr-1" />
        North East Asia (Seoul)
      </button>
      <button
        className={buttonClass("Virginia")}
        onClick={() => handleRegionClick("Virginia")}
      >
        <HiGlobeAmericas className="mr-1" />
        US - East (Virginia)
      </button>
      <button
        className={buttonClass("London")}
        onClick={() => handleRegionClick("London")}
      >
        <HiGlobeEuropeAfrica className="mr-1" />
        Europe (London)
      </button>
      <button
        className={buttonClass("Total")}
        onClick={() => handleRegionClick("Total")}
      >
        <IoEarth className="mr-1" />
        Total
      </button>
      <button
        className={buttonClass("History")}
        onClick={() => handleRegionClick("History")}
      >
        <FaHistory className="mr-1" />
        History
      </button>
    </section>
  );
}

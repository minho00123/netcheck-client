import useStore from "../../store/store";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { FaHistory } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function Sidebar() {
  const { setUrl, selectedButton, setSelectedButton } = useStore();

  const handleLogoClick = () => {
    setUrl("");
    setSelectedButton("Information");
  };

  const handleButtonClick = selection => {
    setSelectedButton(selection);
  };

  const buttonClass = selection =>
    `flex items-center w-full p-3 rounded-lg text-md font-bold ${
      selectedButton === selection
        ? "bg-blue text-white"
        : "text-gray hover:bg-blue hover:text-white"
    }`;

  return (
    <section className="w-1/5 h-96 p-5 bg-blue-light">
      <Link
        to="/"
        className="flex justify-center align-center"
        onClick={handleLogoClick}
      >
        <img src={logoImage} alt="logo" className="h-10 mt-3 mb-20" />
      </Link>
      <button
        className={buttonClass("Information")}
        onClick={() => handleButtonClick("Information")}
      >
        <IoInformationCircleOutline className="mr-1" />
        Information
      </button>
      <button
        className={buttonClass("History")}
        onClick={() => handleButtonClick("History")}
      >
        <FaHistory className="mr-1" />
        History
      </button>
    </section>
  );
}

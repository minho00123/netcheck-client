import { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/logo.png";
import { FaHistory } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import useStore from "../../store/store";

export default function Sidebar() {
  const { setUrl, selectedButton, setSelectedButton } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogoClick = () => {
    setSidebarOpen(false);
    setUrl("");
  };

  const handleButtonClick = selection => {
    setSidebarOpen(false);
    setSelectedButton(selection);
  };

  const buttonClass = selection =>
    `flex items-center w-full p-3 rounded-lg text-md font-bold ${
      selectedButton === selection
        ? "bg-blue text-white"
        : "text-gray hover:bg-blue hover:text-white"
    }`;

  return (
    <section
      className={`w-1/5 h-96 p-5 bg-blue-light ${sidebarOpen ? "block" : "hidden"} lg:block`}
    >
      <div className="lg:hidden text-right pr-3 pt-3">
        <button
          className="text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
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

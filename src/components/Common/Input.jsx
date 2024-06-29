import useStore from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

function generateObjectId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const randomValue = Math.random().toString(16).substring(2, 12);
  const counter = Math.floor(Math.random() * 16777215).toString(16);

  return (timestamp + randomValue + counter).padEnd(24, "0");
}

export default function Input() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const { setUrl, resetData, setId } = useStore();
  const [showWarning, setShowWarning] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const inputUrl = inputRef.current.value;
    const urlPattern = /^(?!https?:\/\/).*$|.*\/$/;
    const newCustomId = generateObjectId();

    if (urlPattern.test(inputUrl)) {
      setShowWarning(true);
    } else {
      resetData();
      setId(newCustomId);
      setUrl(inputUrl);
      setShowWarning(false);
      navigate(`/result/${newCustomId}`);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-4/5 lg:w-3/5">
      <div className="flex flex-col items-center w-full">
        <input
          ref={inputRef}
          type="text"
          className="w-full p-2 border-b-4 border-gray text-center text-sm md:text-xl lg:text-2xl placeholder-gray focus:outline-none focus:border-blue focus:placeholder-opacity-0 max-sm:border-b-2"
          placeholder="Write the URL here (ex. https://www.example.com)"
        />
        {showWarning && (
          <p className="text-red font-bold text-xs md:text-sm lg:text-sm">
            Please write the url in correct form (Ex. https://www.example.com)
          </p>
        )}
      </div>
      <button
        type="submit"
        className="text-gray text-base md:text-lg lg:text-2xl hover:text-blue"
      >
        <FaSearch />
      </button>
    </form>
  );
}

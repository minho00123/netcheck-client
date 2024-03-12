import useStore from "../store/store";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Input() {
  const inputRef = useRef();
  const { setUrl, setIpAddress, setLocation } = useStore();
  const [showWarning, setShowWarning] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const inputUrl = inputRef.current.value;
    const urlPattern = /^(http:\/\/|https:\/\/).*/;

    if (!urlPattern.test(inputUrl)) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);
    setUrl(inputUrl);

    try {
      const response = await fetch("http://localhost:8000/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputUrl }),
      });

      const data = await response.json();

      setIpAddress(data[0]);
      setLocation(data[1]);
    } catch (error) {
      console.error(error);
    }

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-3/5">
      <div className="flex flex-col items-center w-full">
        <input
          ref={inputRef}
          type="text"
          className="w-full p-2 border-b-4 border-gray text-center text-2xl placeholder-gray focus:outline-none focus:border-blue focus:placeholder-opacity-0"
          placeholder="Write the URL here (ex. https://www.example.com)"
        />
        {showWarning && (
          <p className="text-red font-bold text-sm">
            Please write the url in correct form (Ex. https://www.example.com)
          </p>
        )}
      </div>
      <button type="submit" className="text-gray text-2xl hover:text-blue">
        <FaSearch />
      </button>
    </form>
  );
}
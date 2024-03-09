import { useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function Input() {
  const inputRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    const inputUrl = inputRef.current.value;

    try {
      const response = await fetch("http://localhost:8000/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputUrl }),
      });
    } catch (error) {
      console.error(error);
    }

    inputRef.current.value = "";
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center w-3/5">
        <input
          ref={inputRef}
          type="text"
          className="w-full p-2 border-b-4 border-gray text-center text-2xl placeholder-gray focus:outline-none focus:border-blue focus:placeholder-opacity-0"
          placeholder="Write the URL here (ex. https://www.example.com)"
        />
        <button type="submit" className="text-gray text-2xl hover:text-blue">
          <FaSearch />
        </button>
      </form>
    </>
  );
}

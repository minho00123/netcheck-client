import logoImage from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState, useRef } from "react";
import useStore from "../store/store.js";

export default function Header() {
  const inputRef = useRef();
  const { showHeaderInput } = useStore();

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
    <header className="flex items-center justify-between mx-8 h-20 ">
      <Link to="/">
        <img src={logoImage} alt="logo" className="h-10" />
      </Link>
      {showHeaderInput && (
        <>
          <form onSubmit={handleSubmit} className="flex items-center w-3/5">
            <input
              ref={inputRef}
              type="text"
              className="w-full p-2 border-b-2 border-gray text-center text-xl placeholder-gray focus:outline-none focus:border-blue focus:placeholder-opacity-0"
              placeholder="Write the URL here (ex. https://www.example.com)"
            />
            <button
              type="submit"
              className="text-gray text-2xl hover:text-blue"
            >
              <FaSearch />
            </button>
          </form>
          <button className="font-bold text-xl">Share</button>
        </>
      )}
      <Link to="/about">
        <button className="font-bold text-xl">About</button>
      </Link>
    </header>
  );
}

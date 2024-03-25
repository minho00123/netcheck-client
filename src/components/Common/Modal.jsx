import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Modal({ isOpen, onClose, setIsModalOpen }) {
  const [email, setEmail] = useState("");
  const { id } = useParams();

  if (!isOpen) {
    return null;
  }

  async function shareResult(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/share", {
        email,
        customId: id,
      });

      if (response.ok) {
        setIsModalOpen(false);
      } else {
        console.error("Share failed.");
      }
    } catch (error) {
      console.error("Network Error:", error);
    }
  }

  function handleModalClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
      onClick={handleModalClick}
    >
      <div
        className="border-blue border-2 rounded-xl bg-white p-5"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">Share with your friends</h2>
        <form onSubmit={shareResult} className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Write the email here."
            onChange={e => setEmail(e.target.value)}
            className="w-full mt-4 border-b-2 border-gray text-center text-lg placeholder-gray focus:outline-none focus:border-blue focus:placeholder-opacity-0"
          />
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mx-1 px-3 py-1 border-2 border-red rounded-xl text-red text-md font-bold shadow-md hover:bg-red hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={shareResult}
              className="mx-1 px-3 py-1 border-2 border-blue rounded-xl text-blue text-md font-bold shadow-md hover:bg-blue hover:text-white"
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

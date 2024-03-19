import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Common/Input.jsx";
import Modal from "../Common/Modal.jsx";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-center w-full h-20 mx-10 m-3">
        <Input />
        <button
          onClick={() => setIsModalOpen(true)}
          className="mx-10 font-bold text-xl"
        >
          Share
        </button>
        <Link to="/about">
          <button className="font-bold text-xl">About</button>
        </Link>
      </header>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

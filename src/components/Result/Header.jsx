import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../Common/Input.jsx";
import Modal from "../Common/Modal.jsx";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-center h-20 mx-10 m-3 max-sm:mx-1">
        <Input />
        <button
          onClick={() => setIsModalOpen(true)}
          className="mx-10 font-bold text-xl max-sm:text-sm max-sm:mx-5"
        >
          Share
        </button>
        <Link to="/about">
          <button className="font-bold text-xl max-md:hidden">About</button>
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

import useStore from "../../store/store";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Input from "../Common/Input";
import homeImage from "../../assets/home-img.jpg";

export default function Home() {
  const { id, url, setId, setUrl, setShowHeaderInput } = useStore();
  const newId = Math.random().toString(36).slice(2, 16);

  useEffect(() => {
    setId(newId);
  }, []);

  useEffect(() => {
    if (url) {
      setShowHeaderInput();
      setUrl("");
    }
  }, [url]);

  return (
    <>
      <div className="flex flex-col justify-between items-center">
        <div className="relative text-center mb-12 animate-fadeInDown">
          <img src={homeImage} alt="Background" className="w-screen" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-white text-7xl mb-2">Diagnose & Check</h1>
            <h2 className="text-white text-5xl mb-10">the website issues</h2>
            <Link to="/learn">
              <button className="py-3 px-6 rounded-xl bg-blue font-bold text-2xl text-white hover:bg-white hover:text-blue">
                Learn more
              </button>
            </Link>
          </div>
        </div>
        <Input />
      </div>
      {url && id && <Navigate to={`/result/${id}`} />}
    </>
  );
}

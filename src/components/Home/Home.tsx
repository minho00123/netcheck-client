import useStore from "../../store/store.ts";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Input from "../Common/Input.tsx";
import Header from "./Header";
import homeImage from "../../assets/home-img.jpg";

export default function Home() {
  const { id, url, setId } = useStore();
  const customId: string = Math.random().toString(36).slice(2, 16);

  useEffect(() => {
    setId(customId);
  }, []);

  if (url) {
    return <Navigate to={`/result/${id}`} replace={true} />;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col justify-between items-center">
        <div className="relative text-center mb-12 animate-fadeInDown">
          <img src={homeImage} alt="Background" className="w-screen mt-10" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="mt-6 text-white text-xl md:text-5xl lg:text-7xl">
              Diagnose & Check
            </h1>
            <h2 className="text-white text-lg md:text-3xl lg:text-5xl mb-2 md:mb-8 lg:mb-10">
              your website
            </h2>
          </div>
        </div>
        <Input />
      </div>
    </>
  );
}

import useStore from "../../store/store";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Card from "./Card";
import Input from "../Common/Input";
import Header from "../Home/Header";
import learnImage from "../../assets/learn-img.jpg";
import { FaRoute } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { GrDashboard } from "react-icons/gr";
import { MdOutlineDns, MdOutlineTraffic } from "react-icons/md";
import { RiDashboard3Line, RiRedPacketLine, RiTimerLine } from "react-icons/ri";

export default function Learn() {
  const { id, url, setId, setUrl } = useStore();
  const newId = Math.random().toString(36).slice(2, 16);

  useEffect(() => {
    setId(newId);
  }, []);

  useEffect(() => {
    if (url) {
      setUrl("");
    }
  }, [url]);

  return (
    <>
      <Header />
      <div className="flex flex-col justify-between items-center">
        <div className="relative text-center mb-12 animate-fadeIn">
          <img src={learnImage} alt="Background" className="w-screen" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-white text-7xl mb-2">netcheck Features</h1>
            <div className="flex justify-center flex-wrap w-screen px-20">
              <Card Icon={TbWorldWww} title="URL Existence" />
              <Card Icon={MdOutlineDns} title="DNS Checking" />
              <Card Icon={RiDashboard3Line} title="Latency Checking" />
              <Card Icon={RiRedPacketLine} title="Packet Loss Rate" />
              <Card Icon={MdOutlineTraffic} title="Traffic Pattern" />
              <Card Icon={GrDashboard} title="Total Bandwidth Usage" />
              <Card Icon={FaRoute} title="Route Tracing" />
              <Card Icon={RiTimerLine} title="Delay Time" />
            </div>
          </div>
        </div>
        <Input />
      </div>
      {url && id && <Navigate to={`/result/${id}`} />}
    </>
  );
}

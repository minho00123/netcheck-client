import useStore from "../../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Globe from "./Globe";
import Speed from "./Speed";
import Header from "./Header";
import Sidebar from "../Common/Sidebar";
import Security from "./Security";
import AdditionalInfo from "./AdditionalInfo";

export default function Result() {
  const {
    url,
    setUrlInfo,
    setPingData,
    tracerouteData,
    setTrafficData,
    setBandwidthData,
    setTracerouteData,
  } = useStore();
  const markers = [];
  const { id } = useParams();

  useEffect(() => {
    async function getDbData() {
      const response = await fetch(`http://localhost:8000/result/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const text = await response.text();

      if (text) {
        const data = await response.json();

        setUrlInfo(data.urlInfo);
        setPingData(data.pingData);
        setTrafficData(data.trafficData);
        setBandwidthData(data.bandwidthData);
        setTracerouteData(data.tracerouteData);
      }
    }

    getDbData();
  }, []);

  tracerouteData.forEach(data => {
    if (data.lat && data.lon) {
      return markers.push({
        lat: data.lat,
        lon: data.lon,
        country: data.country,
        city: data.city,
      });
    }
  });

  return (
    <div className="flex h-100vh">
      <Sidebar />
      <div className="w-full">
        <Header />
        <h1 className="text-2xl text-center font-bold">
          This is the network information of your website,
          <span className="text-blue">{`${url}`}</span>
        </h1>
        <AdditionalInfo />
        <div className="flex justify-around">
          <Speed />
          <Security />
          <Globe markers={markers} />
        </div>
      </div>
    </div>
  );
}

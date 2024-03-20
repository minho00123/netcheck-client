import useStore from "../../store/store";
import { useState, useEffect } from "react";
import Globe from "./Globe";
import Speed from "./Speed";
import Header from "./Header";
import Security from "./Security";
import Sidebar from "../Common/Sidebar";
import Reliability from "./Reliability";
import Information from "./Information";

export default function Result() {
  const { url } = useStore();
  const [tracerouteData, setTracerouteData] = useState([]);
  const markers = [];

  useEffect(() => {
    async function getData(url) {
      try {
        const response = await fetch(
          `http://localhost:8000/result/traceroute`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
          },
        );
        const data = await response.json();

        setTracerouteData(data);
      } catch (error) {
        console.error(error);
      }
    }

    getData(url);
  }, [url]);

  if (tracerouteData.length > 0) {
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
  }

  return (
    <div className="flex h-100vh">
      <Sidebar />
      <div className="w-full">
        <Header />
        <h1 className="text-2xl text-center font-bold">
          This is the network information of your website,{" "}
          <span className="text-blue">{`${url}`}</span>
        </h1>
        <div className="flex justify-evenly">
          <Information />
          <Security />
        </div>
        <div className="flex justify-evenly">
          <div>
            <Reliability />
            <Speed />
          </div>
          <Globe markers={markers} />
        </div>
      </div>
    </div>
  );
}

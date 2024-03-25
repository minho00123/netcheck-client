import axios from "axios";
import useStore from "../../store/store";
import { useState, useEffect } from "react";
import Globe from "./Globe";
import Speed from "./Speed";
import Header from "./Header";
import Security from "./Security";
import Sidebar from "../Common/Sidebar";
import Reliability from "./Reliability";
import Information from "./Information";
import Total from "./Total";

export default function Result() {
  const { url, selectedRegion, tracerouteData, setTracerouteData } = useStore();
  const markers = [];
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;
  const virginiaServer = import.meta.env.VITE_VIRGINIA_SERVER;
  const londonServer = import.meta.env.VITE_LONDON_SERVER;

  function getServerRegion(region) {
    switch (region) {
      case "Seoul":
        return seoulServer;
      case "Virginia":
        return virginiaServer;
      case "London":
        return londonServer;
    }
  }

  useEffect(() => {
    async function getData(url) {
      try {
        const serverAddress = getServerRegion(selectedRegion);
        const response = await axios.post(
          `${serverAddress}/result/traceroute`,
          {
            url,
          },
        );

        setTracerouteData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getData(url);
  }, [url, selectedRegion]);

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
        {selectedRegion === "Total" ? (
          <Total />
        ) : (
          <>
            <div className="flex justify-between">
              <Information />
              <Security />
            </div>
            <div className="flex justify-between">
              <div>
                <Reliability />
                <Speed />
              </div>
              {markers && <Globe markers={markers} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";

export default function Reliability() {
  const {
    url,
    setLatencies,
    selectedRegion,
    reliabilityData,
    setReliabilityData,
  } = useStore();
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
      const serverAddress = getServerRegion(selectedRegion);

      try {
        const response = await axios.post(
          `${serverAddress}/result/reliability`,
          { url },
        );

        setReliabilityData(response.data);
        setLatencies(response.data.latencies);
      } catch (error) {
        console.error(error);
      }
    }

    getData(url);
  }, [url, selectedRegion]);

  return (
    reliabilityData && (
      <div className="flex flex-col justify-center mx-4 p-4 rounded-xl bg-blue-light shadow-md">
        <h2 className="text-xl font-bold">Reliability</h2>
        <div className="flex mt-2">
          <div className="mr-4 rounded-2xl bg-white text-md text-center shadow-md">
            <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Availability</h3>
            <div className="w-full h-1px bg-gray"></div>
            <p className="mx-5 mt-2 mb-1">
              {reliabilityData?.statusCode}{" "}
              <span
                className={
                  reliabilityData?.statusCode >= 200 &&
                  reliabilityData?.statusCode < 300
                    ? "text-green"
                    : "text-red"
                }
              >
                {reliabilityData?.statusCode >= 200 &&
                reliabilityData?.statusCode < 300
                  ? "OK"
                  : "Error"}
              </span>
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">Response Time: </span>
              {reliabilityData?.responseTime} ms
            </p>
          </div>
          <div className="rounded-2xl bg-white text-md text-center shadow-md">
            <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
            <div className="w-full h-1px bg-gray"></div>
            <div className="mt-2 mx-5 mb-2">
              <div className="mb-3 text-xl font-bold">
                {reliabilityData?.lossRate}%
              </div>
              <div className="text-sm">
                Sent: {reliabilityData?.sent} / Received:{" "}
                {reliabilityData?.received}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

import useStore from "../../store/store";
import { useEffect, useState } from "react";

export default function Reliability() {
  const { seoulData, virginiaData, londonData, selectedRegion } = useStore();
  const [reliabilityData, setReliabilityData] = useState({});

  useEffect(() => {
    if (selectedRegion === "Seoul") {
      setReliabilityData(seoulData.reliabilityData);
    } else if (selectedRegion === "Virginia") {
      setReliabilityData(virginiaData.reliabilityData);
    } else if (selectedRegion === "London") {
      setReliabilityData(londonData.reliabilityData);
    }
  }, [selectedRegion, seoulData, virginiaData, londonData]);

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
                {seoulData.pingData && seoulData.pingData[0].lossRate}%
              </div>
              <div className="text-sm">
                Sent: {seoulData.pingData && seoulData.pingData[0].sent} /
                Received: {seoulData.pingData && seoulData.pingData[0].received}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

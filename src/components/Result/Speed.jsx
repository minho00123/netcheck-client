import useStore from "../../store/store";
import { useEffect, useState } from "react";

export default function Speed() {
  const { seoulData, virginiaData, londonData, selectedRegion, pingData } =
    useStore();
  const [speedData, setSpeedData] = useState({});

  useEffect(() => {
    if (selectedRegion === "Seoul") {
      setSpeedData(seoulData.speedData);
    } else if (selectedRegion === "Virginia") {
      setSpeedData(virginiaData.speedData);
    } else if (selectedRegion === "London") {
      setSpeedData(londonData.speedData);
    }
  }, [selectedRegion, seoulData, virginiaData, londonData]);

  return (
    speedData && (
      <div className="flex flex-col justify-center mt-4 mx-4 p-4 rounded-xl bg-blue-light shadow-md">
        <h2 className="text-xl font-bold">Speed</h2>
        <div className="flex justify-around mt-2">
          <div className="mr-4 rounded-2xl bg-white text-md text-center shadow-md">
            <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
            <div className="w-full h-1px bg-gray"></div>
            <p className="mx-5 mt-2 mb-2">
              <span className="text-blue font-bold">min: </span>
              {pingData.latencies.length > 0
                ? Math.min(...pingData.latencies)
                : "N/A"}{" "}
              ms
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">max: </span>
              {pingData.latencies.length > 0
                ? Math.max(...pingData.latencies)
                : "N/A"}{" "}
              ms
            </p>
            <p className="mx-5 pb-2 ">
              <span className="text-blue font-bold">average: </span>
              {pingData.latencies.length > 0
                ? pingData.latencies.reduce((a, b) => a + b, 0) /
                  pingData.latencies.length
                : "N/A"}
              ms
            </p>
          </div>
          <div className="rounded-2xl bg-white text-md text-center shadow-md">
            <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
            <div className="w-full h-1px bg-gray"></div>
            <div className="mt-5 mx-5 mt-2">
              <div className="text-xl font-bold">{speedData?.bandwidth}</div>
              <div className="text-xl font-bold">Mbit/s</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

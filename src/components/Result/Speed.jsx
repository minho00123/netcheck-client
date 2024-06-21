import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Speed() {
  const { customId } = useParams();
  const {
    url,
    seoulData,
    virginiaData,
    londonData,
    selectedRegion,
    setSeoulData,
    setLondonData,
    setVirginiaData,
  } = useStore();
  const [speedData, setSpeedData] = useState({});
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;
  const virginiaServer = import.meta.env.VITE_VIRGINIA_SERVER;
  const londonServer = import.meta.env.VITE_LONDON_SERVER;

  useEffect(() => {
    async function fetchSpeedData() {
      try {
        const [seoulResponse, virginiaResponse, londonResponse] =
          await Promise.all([
            axios.post(`${seoulServer}/result/speed`, {
              customId,
              url,
              serverRegion: "Seoul",
            }),
            axios.post(`${virginiaServer}/result/speed`, {
              customId,
              url,
              serverRegion: "Virginia",
            }),
            axios.post(`${londonServer}/result/speed`, {
              customId,
              url,
              serverRegion: "London",
            }),
          ]);

        setSeoulData(seoulResponse.data);
        setVirginiaData(virginiaResponse.data);
        setLondonData(londonResponse.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSpeedData();
  }, [
    customId,
    url,
    seoulServer,
    virginiaServer,
    londonServer,
    setSeoulData,
    setVirginiaData,
    setLondonData,
  ]);

  useEffect(() => {
    if (selectedRegion === "Seoul") {
      setSpeedData(seoulData);
    } else if (selectedRegion === "Virginia") {
      setSpeedData(virginiaData);
    } else if (selectedRegion === "London") {
      setSpeedData(londonData);
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
              {selectedRegion === "Seoul"
                ? seoulData?.min
                : selectedRegion === "Virginia"
                  ? virginiaData?.min
                  : londonData?.min}{" "}
              ms
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">max: </span>
              {selectedRegion === "Seoul"
                ? seoulData?.max
                : selectedRegion === "Virginia"
                  ? virginiaData?.max
                  : londonData?.max}{" "}
              ms
            </p>
            <p className="mx-5 pb-2 ">
              <span className="text-blue font-bold">average: </span>
              {selectedRegion === "Seoul"
                ? seoulData?.avg
                : selectedRegion === "Virginia"
                  ? virginiaData?.avg
                  : londonData?.avg}{" "}
              ms
            </p>
          </div>
          <div className="rounded-2xl bg-white text-md text-center shadow-md">
            <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
            <div className="w-full h-1px bg-gray"></div>
            <div className="mt-5 mx-5 mt-2">
              <div className="text-xl font-bold">
                {speedData ? speedData.bandwidth : "N/A"}
              </div>
              <div className="text-xl font-bold">Mbit/s</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

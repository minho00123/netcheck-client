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
    async function getSeoulSpeedData(url) {
      try {
        const response = await axios.post(`${seoulServer}/result/speed`, {
          customId,
          url,
          serverRegion: "Seoul",
        });
        const data = response.data;

        setSeoulData(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function getVirginiaSpeedData(url) {
      try {
        const response = await axios.post(`${virginiaServer}/result/speed`, {
          customId,
          url,
          serverRegion: "Virginia",
        });
        const data = response.data;

        setVirginiaData(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function getLondonSpeedData(url) {
      try {
        const response = await axios.post(`${londonServer}/result/speed`, {
          customId,
          url,
          serverRegion: "London",
        });
        const data = response.data;

        setLondonData(data);
      } catch (error) {
        console.error(error);
      }
    }

    getSeoulSpeedData(url);
    getVirginiaSpeedData(url);
    getLondonSpeedData(url);

    if (selectedRegion === "Seoul") {
      setSpeedData(seoulData);
    } else if (selectedRegion === "Virginia") {
      setSpeedData(londonData);
    } else if (selectedRegion === "London") {
      setSpeedData(virginiaData);
    }
  }, [url, customId, speedData]);

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
              N/A ms
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">max: </span>
              N/A ms
            </p>
            <p className="mx-5 pb-2 ">
              <span className="text-blue font-bold">average: </span>
              N/A ms
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

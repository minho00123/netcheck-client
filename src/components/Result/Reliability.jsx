import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Reliability() {
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
  const [reliabilityData, setReliabilityData] = useState({});
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;
  const virginiaServer = import.meta.env.VITE_VIRGINIA_SERVER;
  const londonServer = import.meta.env.VITE_LONDON_SERVER;

  useEffect(() => {
    async function getSeoulReliabilityData(url) {
      try {
        const response = await axios.post(`${seoulServer}/result/reliability`, {
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

    async function getVirginiaReliabilityData(url) {
      try {
        const response = await axios.post(
          `${virginiaServer}/result/reliability`,
          {
            customId,
            url,
            serverRegion: "Virginia",
          },
        );
        const data = response.data;

        setVirginiaData(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function getLondonReliabilityData(url) {
      try {
        const response = await axios.post(
          `${londonServer}/result/reliability`,
          {
            customId,
            url,
            serverRegion: "London",
          },
        );
        const data = response.data;

        setLondonData(data);
      } catch (error) {
        console.error(error);
      }
    }

    getSeoulReliabilityData(url);
    getVirginiaReliabilityData(url);
    getLondonReliabilityData(url);

    if (selectedRegion === "Seoul") {
      setReliabilityData(seoulData);
    } else if (selectedRegion === "Virginia") {
      setReliabilityData(virginiaData);
    } else if (selectedRegion === "London") {
      setReliabilityData(londonData);
    }
  }, [url, customId, reliabilityData, seoulData, virginiaData, londonData]);

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
                {selectedRegion === "Seoul"
                  ? seoulData?.packetLoss
                  : selectedRegion === "Virginia"
                    ? virginiaData?.packetLoss
                    : londonData?.packetLoss}{" "}
                %
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

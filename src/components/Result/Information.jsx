import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Information() {
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
  const [informationData, setInformationData] = useState({});
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;
  const virginiaServer = import.meta.env.VITE_VIRGINIA_SERVER;
  const londonServer = import.meta.env.VITE_LONDON_SERVER;

  useEffect(() => {
    async function fetchInformationData() {
      try {
        const [seoulResponse, virginiaResponse, londonResponse] =
          await Promise.all([
            axios.post(`${seoulServer}/result/information`, {
              customId,
              url,
              serverRegion: "Seoul",
            }),
            axios.post(`${virginiaServer}/result/information`, {
              customId,
              url,
              serverRegion: "Virginia",
            }),
            axios.post(`${londonServer}/result/information`, {
              customId,
              url,
              serverRegion: "London",
            }),
          ]);

        setSeoulData(seoulResponse.data);
        setVirginiaData(virginiaResponse.data);
        setLondonData(londonResponse.data);
      } catch (error) {
        console.error("Error fetching information data:", error);
      }
    }

    fetchInformationData();
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
      setInformationData(seoulData);
    } else if (selectedRegion === "Virginia") {
      setInformationData(virginiaData);
    } else if (selectedRegion === "London") {
      setInformationData(londonData);
    }
  }, [selectedRegion, seoulData, virginiaData, londonData]);

  return (
    informationData && (
      <div className="flex flex-col justify-center mx-4 my-5 p-4 rounded-xl bg-blue-light shadow-md">
        <h2 className="text-xl font-bold">Information</h2>
        <div className="flex mt-2">
          <div className="mr-4 rounded-2xl bg-white text-md shadow-md">
            <h3 className="mx-5 mt-2 mb-1 text-lg text-center font-bold">
              Domain
            </h3>
            <div className="w-full h-1px bg-gray"></div>
            <p className="mx-5 mt-2 mb-2">
              <span className="text-blue font-bold">Registrar: </span>
              {informationData ? informationData.registrar : "N/A"}
            </p>
            <p className="mx-5 mb-2">
              <span className="text-sm text-blue font-bold">
                Registry Expiry Date:{" "}
              </span>
              {informationData ? informationData.registerExpiryDate : "N/A"}
            </p>
          </div>
          <div className="rounded-2xl bg-white text-md text-center shadow-md">
            <h3 className="mt-2 mx-5 mb-1 text-lg font-bold">IP Address</h3>
            <div className="w-full h-1px bg-gray"></div>
            <p className="mt-5 mx-5 mb-1">
              {informationData ? informationData.ipAddress : "N/A"}
            </p>
            <p className="mx-5 mb-2">
              {`${informationData ? informationData.city : "N/A"}, ${informationData ? informationData.country : "N/A"}`}
            </p>
          </div>
        </div>
      </div>
    )
  );
}

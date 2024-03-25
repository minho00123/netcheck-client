import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";

export default function Information() {
  const { url, selectedRegion, informationData, setInformationData } =
    useStore();
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
          `${serverAddress}/result/information`,
          { url },
        );

        setInformationData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getData(url);
  }, [url, selectedRegion]);

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
              {informationData?.registrar}
            </p>
            <p className="mx-5 mb-2">
              <span className="text-sm text-blue font-bold">
                Registry Expiry Date:{" "}
              </span>
              {informationData?.registerExpiryDate}
            </p>
          </div>
          <div className="rounded-2xl bg-white text-md text-center shadow-md">
            <h3 className="mt-2 mx-5 mb-1 text-lg font-bold">IP Address</h3>
            <div className="w-full h-1px bg-gray"></div>
            <p className="mt-5 mx-5 mb-1">{informationData?.ipAddress}</p>
            <p className="mx-5 mb-2">
              {informationData?.city &&
                `${informationData?.city}, ${informationData?.country}`}
            </p>
          </div>
        </div>
      </div>
    )
  );
}

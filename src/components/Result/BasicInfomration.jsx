import axios from "axios";
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { useParams } from "react-router-dom";

export default function BasicInformation() {
  const { customId } = useParams();
  const { url, selectedRegion } = useStore();
  const [basicInformation, setBasicInformation] = useState({});
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;
  const virginiaServer = import.meta.env.VITE_VIRGINIA_SERVER;
  const londonServer = import.meta.env.VITE_LONDON_SERVER;

  useEffect(() => {
    async function getBasicInformationData(url, server) {
      try {
        const response = await axios.post(`${server}/result/basicInformation`, {
          url,
        });

        setBasicInformation(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedRegion === "Seoul") {
      getBasicInformationData(url, seoulServer, "Seoul");
    } else if (selectedRegion === "Virginia") {
      getBasicInformationData(url, virginiaServer, "Virginia");
    } else if (selectedRegion === "London") {
      getBasicInformationData(url, londonServer, "London");
    }
  }, [
    url,
    customId,
    selectedRegion,
    seoulServer,
    virginiaServer,
    londonServer,
  ]);

  return (
    <div className="flex flex-col justify-center w-full mx-4 my-3 p-4 rounded-xl bg-blue-light shadow-md">
      <h2 className="text-xl font-bold">Basic Information</h2>
      <div className="flex mt-2">
        <div className="w-1/2 mr-4 rounded-2xl bg-white text-md shadow-md">
          <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Background</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">Site Title: </span>
            {basicInformation ? basicInformation.siteTitle : "N/A"}
          </p>
          <p className="mx-5 mb-2">
            <span className="text-blue font-bold">Site Description: </span>
            {basicInformation ? basicInformation.siteDescription : "N/A"}
          </p>
        </div>
        <div className="w-1/2 mr-4 rounded-2xl bg-white text-md shadow-md">
          <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Availability</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-1">
            {basicInformation?.statusCode}{" "}
            <span
              className={
                basicInformation?.statusCode >= 200 &&
                basicInformation?.statusCode < 300
                  ? "text-green"
                  : "text-red"
              }
            >
              {basicInformation?.statusCode >= 200 &&
              basicInformation?.statusCode < 300
                ? "OK"
                : "Error"}
            </span>
          </p>
          <p className="mx-5 mb-2">
            <span className="text-blue font-bold">Response Time: </span>
            {basicInformation?.responseTime} ms
          </p>
        </div>
      </div>
    </div>
  );
}

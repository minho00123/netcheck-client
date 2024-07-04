import axios from "axios";
import { useEffect, useState } from "react";
import useStore from "../../store/store";

export default function BasicInformation() {
  const { url, setData, historyData } = useStore();
  const [basicInformation, setBasicInformation] = useState({});

  useEffect(() => {
    async function getBasicInformationData(url) {
      if (historyData && historyData.basicInformation) {
        setBasicInformation(historyData.basicInformation);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER}/result/basicInformation`,
          { url },
        );

        setBasicInformation(response.data);
        setData({ basicInformation: response.data });
      } catch (error) {
        console.error(error);
      }
    }

    if (url) {
      getBasicInformationData(url);
    }
  }, [url, historyData, setData]);

  return (
    <div className="flex flex-col justify-center w-full mx-4 my-3 p-4 rounded-xl bg-blue-light shadow-md">
      <h2 className="text-xl font-bold">Basic Information</h2>
      <div className="flex mt-2 max-md:flex-col max-md:items-center">
        <div className="w-1/2 mr-4 rounded-2xl bg-white text-md shadow-md max-md:w-full">
          <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Background</h3>
          <div className="w-full h-[1.5px] bg-black"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">Site Title: </span>
            {basicInformation?.siteTitle || "N/A"}
          </p>
          <p className="mx-5 mb-2">
            <span className="text-blue font-bold">Site Description: </span>
            {basicInformation?.siteDescription || "N/A"}
          </p>
        </div>
        <div className="w-1/2 mr-4 rounded-2xl bg-white text-md shadow-md max-md:mt-2 max-md:w-full">
          <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Availability</h3>
          <div className="w-full h-[1.5px] bg-black"></div>
          <p className="mx-5 mt-2 mb-1">
            {basicInformation?.statusCode}{" "}
            <span
              className={
                basicInformation?.statusCode >= 200 &&
                basicInformation?.statusCode < 400
                  ? "text-green"
                  : "text-red"
              }
            >
              {basicInformation?.statusCode >= 200 &&
              basicInformation?.statusCode < 400
                ? "OK"
                : "Error"}
            </span>
          </p>
          <p className="mx-5 mb-2">
            <span className="text-blue font-bold">Response Time: </span>
            {basicInformation?.responseTime || "N/A"} ms
          </p>
        </div>
      </div>
    </div>
  );
}

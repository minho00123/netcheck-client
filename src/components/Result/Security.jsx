import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Security() {
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
  const [securityData, setSecurityData] = useState({});
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;
  const virginiaServer = import.meta.env.VITE_VIRGINIA_SERVER;
  const londonServer = import.meta.env.VITE_LONDON_SERVER;

  useEffect(() => {
    async function getSeoulSecurityData(url) {
      try {
        const response = await axios.post(`${seoulServer}/result/security`, {
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

    async function getVirginiaSecurityData(url) {
      try {
        const response = await axios.post(`${virginiaServer}/result/security`, {
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

    async function getLondonSecurityData(url) {
      try {
        const response = await axios.post(`${londonServer}/result/security`, {
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

    getSeoulSecurityData(url);
    getVirginiaSecurityData(url);
    getLondonSecurityData(url);

    if (selectedRegion === "Seoul") {
      setSecurityData(seoulData);
    } else if (selectedRegion === "Virginia") {
      setSecurityData(londonData);
    } else if (selectedRegion === "London") {
      setSecurityData(virginiaData);
    }
  }, [url, customId, securityData]);

  return (
    <div className="flex flex-col justify-center mr-4 my-5 p-4 rounded-xl bg-blue-light shadow-md">
      <h2 className="text-xl font-bold">Security</h2>
      <div className="flex mt-2">
        <div className="mr-4 rounded-2xl bg-white text-md shadow-md">
          <h3 className="mx-5 mb-1 pt-2 text-lg text-center font-bold">
            SSL Certificate
          </h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">Issuer: </span>
            {securityData ? securityData.issuer : "N/A"}
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Expiry Date: </span>
            {securityData ? securityData.expiryDate : "N/A"}
          </p>
        </div>
        <div className="rounded-2xl bg-white text-md shadow-md">
          <h3 className="mx-5 mt-2 mb-1 text-lg text-center font-bold">
            HTTP Header Analysis
          </h3>
          <div className="w-full h-1px bg-gray"></div>

          <p className="mt-2 mx-5 mb-1">
            <span className="text-blue font-bold">CSP: </span>
            {securityData && (securityData.csp ? securityData.csp : "none")}
          </p>
          <p className="mx-5">
            <span className="text-blue font-bold">HSTS: </span>
            {securityData && (securityData.hsts ? securityData.hsts : "none")}
          </p>
        </div>
      </div>
    </div>
  );
}

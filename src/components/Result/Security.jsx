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
    async function fetchSecurityData() {
      try {
        const [seoulResponse, virginiaResponse, londonResponse] =
          await Promise.all([
            axios.post(`${seoulServer}/result/security`, {
              customId,
              url,
              serverRegion: "Seoul",
            }),
            axios.post(`${virginiaServer}/result/security`, {
              customId,
              url,
              serverRegion: "Virginia",
            }),
            axios.post(`${londonServer}/result/security`, {
              customId,
              url,
              serverRegion: "London",
            }),
          ]);

        setSeoulData(seoulResponse.data);
        setVirginiaData(virginiaResponse.data);
        setLondonData(londonResponse.data);
      } catch (error) {
        console.error("Error fetching security data:", error);
      }
    }

    fetchSecurityData();
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
      setSecurityData(seoulData);
    } else if (selectedRegion === "Virginia") {
      setSecurityData(virginiaData);
    } else if (selectedRegion === "London") {
      setSecurityData(londonData);
    }
  }, [selectedRegion, seoulData, virginiaData, londonData]);

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

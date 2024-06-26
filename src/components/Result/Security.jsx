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
    <div className="flex flex-col justify-center mr-4 p-4 rounded-xl bg-blue-light shadow-md">
      <h2 className="text-xl font-bold">SSL/TLS</h2>
      <div className="flex flex-col mt-2">
        <div className="flex">
          <div className="w-1/2 mr-4 rounded-2xl bg-white text-md shadow-md break-words">
            <h3 className="mx-5 mb-1 pt-2 text-lg font-bold">Subject</h3>
            <div className="w-full h-1px bg-gray"></div>
            <p className="mx-5 mt-2 mb-2">
              <span className="text-blue font-bold">Common Name: </span>
              {securityData.subject && securityData.subject.commonName}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Organization: </span>
              {securityData.subject && securityData.subject.organization}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">State: </span>
              {securityData.subject && securityData.subject.state}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Country: </span>
              {securityData.subject && securityData.subject.country}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Location: </span>
              {securityData.subject && securityData.subject.location}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">
                Subject Alternative Name:{" "}
              </span>
              {securityData && securityData.subjectaltname}
            </p>
          </div>
          <div className="w-1/2 mr-4 rounded-2xl bg-white text-md shadow-md break-words">
            <h3 className="mx-5 mb-1 pt-2 text-lg font-bold">Issuer</h3>
            <div className="w-full h-1px bg-gray"></div>
            <p className="mx-5 mt-2 mb-2">
              <span className="text-blue font-bold">Common Name: </span>
              {securityData.issuer && securityData.issuer.commonName}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Organization: </span>
              {securityData.issuer && securityData.issuer.organization}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">State: </span>
              {securityData.issuer && securityData.issuer.state}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Country: </span>
              {securityData.issuer && securityData.issuer.country}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Location: </span>
              {securityData.issuer && securityData.issuer.location}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">CA Issuers: </span>
              {securityData && securityData.caIssuers}
            </p>
          </div>
        </div>
        <div className="mt-4 mr-4 rounded-2xl bg-white text-md shadow-md break-words">
          <h3 className="mx-5 mb-1 pt-2 text-lg font-bold">Other</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">Publick Key Size: </span>
            {securityData && securityData.publicKeySize}
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Public Key: </span>
            {securityData && securityData.publicKey}
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Serial Number: </span>
            {securityData && securityData.serialNumber}
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Valid From: </span>
            {securityData && securityData.validFrom}
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Valid To: </span>
            {securityData && securityData.validTo}
          </p>
        </div>
      </div>
    </div>
  );
}

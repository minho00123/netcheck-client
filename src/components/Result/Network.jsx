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
  const [domainData, setDomainData] = useState({});
  const [speedData, setSpeedData] = useState({});
  const [ipData, setIpData] = useState({});
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;
  const virginiaServer = import.meta.env.VITE_VIRGINIA_SERVER;
  const londonServer = import.meta.env.VITE_LONDON_SERVER;

  useEffect(() => {
    async function fetchDomainData() {
      try {
        const [seoulResponse, virginiaResponse, londonResponse] =
          await Promise.all([
            axios.post(`${seoulServer}/result/domain`, {
              customId,
              url,
              serverRegion: "Seoul",
            }),
            axios.post(`${virginiaServer}/result/domain`, {
              customId,
              url,
              serverRegion: "Virginia",
            }),
            axios.post(`${londonServer}/result/domain`, {
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

    fetchDomainData();
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
    async function getIpDataData(url, server) {
      try {
        const response = await axios.post(`${server}/result/ipData`, {
          url,
        });

        setIpData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedRegion === "Seoul") {
      getIpDataData(url, seoulServer, "Seoul");
    } else if (selectedRegion === "Virginia") {
      getIpDataData(url, virginiaServer, "Virginia");
    } else if (selectedRegion === "London") {
      getIpDataData(url, londonServer, "London");
    }
  }, [
    url,
    customId,
    selectedRegion,
    seoulServer,
    virginiaServer,
    londonServer,
  ]);

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
      setDomainData(seoulData);
      setSpeedData(seoulData);
    } else if (selectedRegion === "Virginia") {
      setDomainData(virginiaData);
      setSpeedData(virginiaData);
    } else if (selectedRegion === "London") {
      setDomainData(londonData);
      setSpeedData(londonData);
    }
  }, [selectedRegion, seoulData, virginiaData, londonData]);

  return (
    domainData && (
      <div className="flex flex-col justify-center mx-4 mb-3 p-4 rounded-xl bg-blue-light shadow-md">
        <h2 className="text-xl font-bold">Network</h2>
        <div className="flex mt-2">
          <div className="w-1/2 mr-4 rounded-2xl bg-white text-md shadow-md break-words">
            <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Domain</h3>
            <div className="w-full h-1px bg-gray"></div>
            <p className="mx-5 mt-2 mb-2">
              <span className="text-blue font-bold">Name: </span>
              {domainData ? domainData.domainName : "N/A"}
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">Registrar: </span>
              {domainData ? domainData.domainRegistrar : "N/A"}
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">Creation Date: </span>
              {domainData ? domainData.domainCreationDate : "N/A"}
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">Updated Date: </span>
              {domainData ? domainData.domainUpdatedDate : "N/A"}
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">Expiry Date: </span>
              {domainData ? domainData.domainExpiryDate : "N/A"}
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">
                Nameserver Organization:{" "}
              </span>
              {domainData ? domainData.nameServerOrganization : "N/A"}
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">Nameservers: </span>
              {domainData ? domainData.nameServers : "N/A"}
            </p>
          </div>
          <div className="flex flex-col justify-between w-1/2">
            <div className="mb-4 mr-4 py-1 rounded-2xl bg-white text-md shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">IP Address</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mx-5 mt-2 mb-2">
                <p className="text-blue font-bold">
                  IPv4:{" "}
                  <span className="text-black font-normal">
                    {ipData.ipv4 ? ipData.ipv4 : "N/A"}
                  </span>
                </p>
                <p className="text-blue font-bold">
                  IPv6:{" "}
                  <span className="text-black font-normal">
                    {ipData.ipv6 ? ipData.ipv6 : "N/A"}
                  </span>
                </p>
                <p className="text-blue font-bold">
                  Location:{" "}
                  <span className="text-black font-normal">
                    {ipData ? ipData.city : "N/A"},{" "}
                    {ipData ? ipData.country : "N/A"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-1/3 mr-4 rounded-2xl bg-white text-md shadow-md">
                <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">
                  Packet Loss
                </h3>
                <div className="w-full h-1px bg-gray"></div>
                <div className="mt-10 mx-5 mb-2 text-center">
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
              <div className="w-1/3 mr-4 rounded-2xl bg-white text-md shadow-md">
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
              <div className="w-1/3 rounded-2xl bg-white text-md shadow-md">
                <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
                <div className="w-full h-1px bg-gray"></div>
                <div className="mt-7 mx-5 mt-2 text-center">
                  <div className="text-xl font-bold">
                    {speedData ? speedData.bandwidth : "N/A"}
                  </div>
                  <div className="text-xl font-bold">Mbit/s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";
import Loading from "../Common/Loading";

export default function Information() {
  const { url, setData, historyData } = useStore();
  const [domainData, setDomainData] = useState(null);
  const [speedData, setSpeedData] = useState(null);
  const [ipData, setIpData] = useState(null);
  const [pingData, setPingData] = useState(null);
  const [loadingPing, setLoadingPing] = useState(true);

  useEffect(() => {
    if (!url) return;

    async function fetchData() {
      try {
        if (historyData?.domain) {
          setDomainData(historyData.domain);
        } else {
          const domainResponse = await axios.post(
            `${import.meta.env.VITE_SERVER}/result/domain`,
            { url },
          );
          setDomainData(domainResponse.data);
          setData(prevData => ({ ...prevData, domain: domainResponse.data }));
        }

        if (historyData?.ip) {
          setIpData(historyData.ip);
        } else {
          const ipResponse = await axios.post(
            `${import.meta.env.VITE_SERVER}/result/ipData`,
            { url },
          );
          setIpData(ipResponse.data);
          setData(prevData => ({ ...prevData, ip: ipResponse.data }));
        }

        if (historyData?.speed) {
          setSpeedData(historyData.speed);
        } else {
          const speedResponse = await axios.post(
            `${import.meta.env.VITE_SERVER}/result/speed`,
            { url },
          );
          setSpeedData(speedResponse.data);
          setData(prevData => ({ ...prevData, speed: speedResponse.data }));
        }

        if (historyData?.ping) {
          setPingData(historyData.ping);
          setLoadingPing(false);
        } else {
          const pingResponse = await axios.post(
            `${import.meta.env.VITE_SERVER}/result/ping`,
            { url },
          );
          setPingData(pingResponse.data);
          setData(prevData => ({ ...prevData, ping: pingResponse.data }));
          setLoadingPing(false);
        }
      } catch (error) {
        console.error("Error fetching information data:", error);
        setLoadingPing(false);
      }
    }

    fetchData();
  }, [url, historyData, setData]);

  return (
    <div className="flex flex-col justify-center mx-4 mb-3 p-4 rounded-xl bg-blue-light shadow-md">
      <h2 className="text-xl font-bold">Network</h2>
      <div className="flex mt-2 max-md:flex-col max-md:justify-center">
        <div className="w-1/2 mr-4 rounded-2xl bg-white text-md shadow-md break-words max-md:w-full">
          <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Domain</h3>
          <div className="w-full h-[1.5px] bg-black"></div>
          <div className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">Name: </span>
            {domainData ? domainData.domainName : "N/A"}
          </div>
          <div className="mx-5 mb-2">
            <span className="text-blue font-bold">Registrar: </span>
            {domainData ? domainData.domainRegistrar : "N/A"}
          </div>
          <div className="mx-5 mb-2">
            <span className="text-blue font-bold">Creation Date: </span>
            {domainData ? domainData.domainCreationDate : "N/A"}
          </div>
          <div className="mx-5 mb-2">
            <span className="text-blue font-bold">Updated Date: </span>
            {domainData ? domainData.domainUpdatedDate : "N/A"}
          </div>
          <div className="mx-5 mb-2">
            <span className="text-blue font-bold">Expiry Date: </span>
            {domainData ? domainData.domainExpiryDate : "N/A"}
          </div>
          <div className="mx-5 mb-2">
            <span className="text-blue font-bold">
              Nameserver Organization:{" "}
            </span>
            {domainData ? domainData.nameServerOrganization : "N/A"}
          </div>
          <div className="mx-5 mb-2">
            <span className="text-blue font-bold">Nameservers: </span>
            <ul className="list-disc list-inside">
              {domainData
                ? domainData.nameServers.map((server, index) => (
                    <li key={index}>{server}</li>
                  ))
                : "N/A"}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between w-1/2 max-md:w-full max-md:mt-4">
          <div className="mb-4 mr-4 py-1 rounded-2xl bg-white text-md shadow-md">
            <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">IP Address</h3>
            <div className="w-full h-[1.5px] bg-black"></div>
            <div className="mx-5 mt-2 mb-2">
              <p className="text-blue font-bold">
                IPv4:{" "}
                <span className="text-black font-normal">
                  {ipData ? ipData.ipv4 : "N/A"}
                </span>
              </p>
              <p className="text-blue font-bold">
                IPv6:{" "}
                <span className="text-black font-normal">
                  {ipData ? ipData.ipv6 : "N/A"}
                </span>
              </p>
              <p className="text-blue font-bold">
                Location:{" "}
                <span className="text-black font-normal">
                  {ipData ? `${ipData.city}, ${ipData.country}` : "N/A"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex justify-between max-md:flex-col">
            <div className="w-1/3 mr-4 rounded-2xl bg-white text-md shadow-md max-md:w-full">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
              <div className="w-full h-[1.5px] bg-black"></div>
              {loadingPing ? (
                <Loading />
              ) : (
                <div className="mt-10 mx-5 mb-2 text-center">
                  <div className="mb-3 text-xl font-bold">
                    {pingData ? pingData.packetLoss : "N/A"} %
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/3 mr-4 rounded-2xl bg-white text-md shadow-md max-md:w-full max-md:mt-4">
              <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
              <div className="w-full h-[1.5px] bg-black"></div>
              {loadingPing ? (
                <Loading />
              ) : (
                <>
                  <p className="mx-5 mt-2 mb-2">
                    <span className="text-blue font-bold">min: </span>
                    {pingData ? pingData.min : "N/A"} ms
                  </p>
                  <p className="mx-5 mb-2">
                    <span className="text-blue font-bold">max: </span>
                    {pingData ? pingData.max : "N/A"} ms
                  </p>
                  <p className="mx-5 pb-2 ">
                    <span className="text-blue font-bold">average: </span>
                    {pingData ? pingData.avg : "N/A"} ms
                  </p>
                </>
              )}
            </div>
            <div className="w-1/3 rounded-2xl bg-white text-md shadow-md max-md:w-full max-md:mt-4">
              <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
              <div className="w-full h-[1.5px] bg-black"></div>
              <div className="mt-5 mx-5 mb-3 text-center">
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
  );
}

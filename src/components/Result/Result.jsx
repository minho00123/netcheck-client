import axios from "axios";
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { useParams } from "react-router-dom";
import Globe from "./Globe";
import Speed from "./Speed";
import Total from "./Total";
import Header from "./Header";
import Loading from "../Common/Loading";
import History from "./History";
import Sidebar from "../Common/Sidebar";
import Security from "./Security";
import Network from "./Network";
import Reliability from "./Reliability";
import BasicInformation from "./BasicInfomration";

export default function Result() {
  const { customId } = useParams();
  const [markers, setMarkers] = useState([]);
  const {
    url,
    selectedRegion,
    setUrl,
    setSeoulData,
    setLondonData,
    setVirginiaData,
  } = useStore();
  const [basicInformation, setBasicInformation] = useState({});
  const [tracerouteData, setTracerouteData] = useState([]);
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

  useEffect(() => {
    async function getTracerouteData(url, server) {
      try {
        const response = await axios.post(`${server}/result/traceroute`, {
          url,
        });
        const data = response.data;

        setTracerouteData(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedRegion === "Seoul") {
      getTracerouteData(url, seoulServer, "Seoul");
    } else if (selectedRegion === "Virginia") {
      getTracerouteData(url, virginiaServer, "Virginia");
    } else if (selectedRegion === "London") {
      getTracerouteData(url, londonServer, "London");
    }

    async function getIdData(customId) {
      try {
        const response = await axios.post(`${seoulServer}/history/id`, {
          customId,
        });
        if (response.data && response.data.length > 0) {
          setUrl(response.data[0].url);
          response.data.forEach(data => {
            if (data.serverRegion === "Seoul") {
              setSeoulData(data);
            } else if (data.serverRegion === "Virginia") {
              setVirginiaData(data);
            } else if (data.serverRegion === "London") {
              setLondonData(data);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    getIdData(customId);
  }, [
    customId,
    seoulServer,
    setUrl,
    setSeoulData,
    setVirginiaData,
    setLondonData,
  ]);

  useEffect(() => {
    async function getSeoulPingData(url) {
      try {
        const response = await axios.post(`${seoulServer}/result/ping`, {
          url,
        });
        const data = response.data;

        setSeoulData(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function getVirginiaPingData(url) {
      try {
        const response = await axios.post(`${virginiaServer}/result/ping`, {
          url,
        });
        const data = response.data;

        setVirginiaData(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function getLondonPingData(url) {
      try {
        const response = await axios.post(`${londonServer}/result/ping`, {
          url,
        });
        const data = response.data;

        setLondonData(data);
      } catch (error) {
        console.error(error);
      }
    }

    getSeoulPingData(url);
    getVirginiaPingData(url);
    getLondonPingData(url);
  }, [
    url,
    customId,
    seoulServer,
    virginiaServer,
    londonServer,
    setSeoulData,
    setVirginiaData,
    setLondonData,
  ]);

  useEffect(() => {
    if (tracerouteData && selectedRegion === "Seoul") {
      const temp = [];

      tracerouteData.forEach(data => {
        if (data.lat && data.lon) {
          temp.push({
            country: data.country,
            city: data.city,
            lat: data.lat,
            lon: data.lon,
          });
        }
      });

      setMarkers(temp);
    }
  }, [selectedRegion, tracerouteData, basicInformation]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full" data-testid="network-info">
        <Header />
        <h1 className="text-2xl text-center font-bold">
          The network information of website for{" "}
          <span className="text-blue">{`${url}`}</span>
        </h1>
        {selectedRegion === "History" ? (
          <History />
        ) : selectedRegion === "Total" ? (
          <Total />
        ) : (
          <>
            <div className="flex justify-evenly w-full">
              <BasicInformation />
            </div>
            <div className="flex flex-col justify-evenly w-full">
              <div className="flex-1 p-2">
                <Network />
              </div>
              <div className="flex-1 p-2">
                <Security />
              </div>
            </div>
            <div className="flex justify-evenly">
              {markers && <Globe markers={markers} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

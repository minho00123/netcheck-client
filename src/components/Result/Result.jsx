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
import Information from "./Information";
import Reliability from "./Reliability";

export default function Result() {
  const { customId } = useParams();
  const [markers, setMarkers] = useState([]);
  const { url, selectedRegion, setUrl } = useStore();
  const [tracerouteData, setTracerouteData] = useState([]);
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;
  const virginiaServer = import.meta.env.VITE_VIRGINIA_SERVER;
  const londonServer = import.meta.env.VITE_LONDON_SERVER;

  useEffect(() => {
    async function getTracerouteData(url, server) {
      try {
        const response = await axios.post(`${server}/result/traceroute`, {
          url,
        });
        const data = response.data;
        console.log("DATA: ", data);

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

    // async function getIdData(customId) {
    //   try {
    //     const response = await axios.post(`${seoulServer}/history/id`, {
    //       customId,
    //     });
    //     if (response.data && response.data.length > 0) {
    //       setUrl(response.data[0].url);
    //       response.data.forEach(data => {
    //         if (data.serverRegion === "Seoul") {
    //           setSeoulData(data);
    //         } else if (data.serverRegion === "Virginia") {
    //           setVirginiaData(data);
    //         } else if (data.serverRegion === "London") {
    //           setLondonData(data);
    //         }
    //       });
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    getIdData(customId);
  }, [url, customId, setUrl, setTracerouteData]);

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
  }, [selectedRegion, tracerouteData]);

  return (
    <div className="flex h-100vh">
      <Sidebar />
      <div className="w-full" data-testid="network-info">
        <Header />
        <h1 className="text-2xl text-center font-bold">
          This is the network information of your website,{" "}
          <span className="text-blue">{`${url}`}</span>
        </h1>
        {selectedRegion === "History" ? (
          <History />
        ) : selectedRegion === "Total" ? (
          <Total />
        ) : (
          <>
            <div className="flex justify-evenly">
              <Information />
              <Security />
            </div>
            <div className="flex justify-evenly">
              <div>
                <Reliability />
                <Speed />
              </div>
              {markers && <Globe markers={markers} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

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
  const {
    url,
    seoulData,
    selectedRegion,
    tracerouteData,
    setUrl,
    setSeoulData,
    setVirginiaData,
    setLondonData,
    setTracerouteData,
  } = useStore();
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;
  const virginiaServer = import.meta.env.VITE_VIRGINIA_SERVER;
  const londonServer = import.meta.env.VITE_LONDON_SERVER;

  useEffect(() => {
    async function getSeoulData(url) {
      try {
        const response = await axios.post(`${seoulServer}/result/all`, {
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

    async function getVirginiaData(url) {
      try {
        const response = await axios.post(`${virginiaServer}/result/all`, {
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

    async function getLondonData(url) {
      try {
        const response = await axios.post(`${londonServer}/result/all`, {
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

    async function getTracerouteData(url) {
      try {
        const response = await axios.post(`${seoulServer}/result/traceroute`, {
          url,
        });
        const data = response.data;

        setTracerouteData(data);
      } catch (error) {
        console.error(error);
      }
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
        } else {
          getSeoulData(url);
          getVirginiaData(url);
          getLondonData(url);
          getTracerouteData(url);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getIdData(customId);
  }, [
    url,
    customId,
    seoulServer,
    virginiaServer,
    londonServer,
    setUrl,
    setSeoulData,
    setVirginiaData,
    setLondonData,
    setTracerouteData,
  ]);

  console.log(tracerouteData);

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
        ) : Object.keys(seoulData).length > 0 ? (
          selectedRegion === "Total" ? (
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
          )
        ) : (
          <Loading text="Getting the data" />
        )}
      </div>
    </div>
  );
}

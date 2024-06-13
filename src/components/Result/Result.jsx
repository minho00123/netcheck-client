import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../../store/store";
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
  const { id } = useParams();
  const [markers, setMarkers] = useState([]);
  const ws = useRef(null);
  const {
    url,
    seoulData,
    londonData,
    virginiaData,
    selectedRegion,
    setUrl,
    setSeoulData,
    setLondonData,
    setVirginiaData,
    setAddSeoulData,
  } = useStore(state => ({
    url: state.url,
    seoulData: state.seoulData,
    londonData: state.londonData,
    virginiaData: state.virginiaData,
    selectedRegion: state.selectedRegion,
    setUrl: state.setUrl,
    setSeoulData: state.setSeoulData,
    setLondonData: state.setLondonData,
    setVirginiaData: state.setVirginiaData,
    setAddSeoulData: state.setAddSeoulData,
  }));
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;
  const virginiaServer = import.meta.env.VITE_VIRGINIA_SERVER;
  const londonServer = import.meta.env.VITE_LONDON_SERVER;

  useEffect(() => {
    async function getSeoulData(url) {
      try {
        const response = await axios.post(`${seoulServer}/result/all`, {
          id,
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
          id,
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
          id,
          url,
          serverRegion: "London",
        });
        const data = response.data;
        setLondonData(data);
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
        }
      } catch (error) {
        console.error(error);
      }
    }

    getIdData(id);

    ws.current = new WebSocket(`wss://localhost:8000`);
    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ url }));
    };
    ws.current.onmessage = function (event) {
      const data = JSON.parse(event.data);

      if (data.done) {
        return;
      } else if (data.pingData) {
        setAddSeoulData({ pingData: data.pingData });
      } else if (data.tracerouteData) {
        changeTracerouteData(data.tracerouteData);
      }
    };
    ws.current.onerror = error => {
      console.error(error);
    };
    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [
    url,
    id,
    seoulServer,
    virginiaServer,
    londonServer,
    setAddSeoulData,
    setUrl,
    setSeoulData,
    setVirginiaData,
    setLondonData,
    setAddSeoulData,
  ]);

  async function changeTracerouteData(tracerouteData) {
    const updatedData = await Promise.all(
      tracerouteData.map(async data => {
        const response = await axios(
          `http://ip-api.com/json/${data.ipAddress}?fields=status,message,country,city,lat,lon,query`,
        );

        return {
          ...data,
          country: response.data.country,
          city: response.data.city,
          lat: response.data.lat,
          lon: response.data.lon,
        };
      }),
    );

    setAddSeoulData({ tracerouteData: updatedData });
  }

  useEffect(() => {
    let temp = [];

    if (selectedRegion === "Seoul" && seoulData.tracerouteData) {
      temp = seoulData.tracerouteData
        .filter(data => data.lat && data.lon)
        .map(data => ({
          country: data.country,
          city: data.city,
          lat: data.lat,
          lon: data.lon,
        }));
    } else if (selectedRegion === "Virginia" && virginiaData.tracerouteData) {
      temp = virginiaData.tracerouteData
        .filter(data => data.lat && data.lon)
        .map(data => ({
          country: data.country,
          city: data.city,
          lat: data.lat,
          lon: data.lon,
        }));
    } else if (selectedRegion === "London" && londonData.tracerouteData) {
      temp = londonData.tracerouteData
        .filter(data => data.lat && data.lon)
        .map(data => ({
          country: data.country,
          city: data.city,
          lat: data.lat,
          lon: data.lon,
        }));
    }

    setMarkers(temp);
  }, [selectedRegion, seoulData, londonData, virginiaData]);

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

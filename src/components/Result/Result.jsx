import useStore from "../../store/store";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Line from "./Line";
import Globe from "./Globe";
import Detail from "./Detail";
import Summary from "./Summary";
import Loading from "../Common/Loading";

export default function Result() {
  const [isSummary, setIsSummary] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const {
    setUrlInfo,
    setPingData,
    tracerouteData,
    setTrafficData,
    setBandwidthData,
    setTracerouteData,
  } = useStore();
  const markers = [];
  const { id } = useParams();

  useEffect(() => {
    async function getDbData() {
      const response = await fetch(`http://localhost:8000/result/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const text = await response.text();

      if (text) {
        const data = await response.json();

        setUrlInfo(data.urlInfo);
        setPingData(data.pingData);
        setTrafficData(data.trafficData);
        setBandwidthData(data.bandwidthData);
        setTracerouteData(data.tracerouteData);
      }
    }

    getDbData();
  }, []);

  tracerouteData.forEach(data => {
    if (data.lat && data.lon) {
      return markers.push({
        lat: data.lat,
        lon: data.lon,
        country: data.country,
        city: data.city,
      });
    }
  });

  function handleSummaryButtonClick() {
    setIsSummary(true);
  }

  function handleDetailButtonClick() {
    setIsSummary(false);
  }

  return (
    <>
      {tracerouteData.length === 0 ? (
        <div className="flex justify-center items-center h-75vh">
          <Loading />
        </div>
      ) : (
        <main className="flex h-full">
          <div className="flex justify-evenly w-full">
            <div className="flex">
              <div className="flex flex-col justify-center relative h-20 mt-12 p-5 border-2 rounded-xl text-sm">
                <p>
                  <span className="pr-3 text-green">●</span>
                  Start
                </p>
                <p>
                  <span className="pr-3 text-black">●</span>
                  End
                </p>
                <div>
                  <span className="pr-3 text-gray cursor-pointer">●</span>
                  <span
                    className="hover:underline"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    Unknown
                  </span>
                  {showTooltip && (
                    <div className="absolute top-18 left-0  mt-1 p-2 w-44 border-2 rounded bg-white text-xs  shadow-md">
                      <p>Possibilities of Timeout</p>
                      <p>1. Packet loss</p>
                      <p>2. Block packets by router</p>
                      <p>3. High network latency</p>
                    </div>
                  )}
                </div>
              </div>
              <Line data={tracerouteData} />
            </div>
            <Globe markers={markers} />
          </div>
          <div className="flex flex-col items-center mr-24">
            <div className="flex justify-center items-center">
              <button
                className={`mx-1 mr-3 px-6 py-2 border-2 border-blue rounded-xl text-xl font-bold shadow-md ${isSummary && "bg-blue text-white border-none"}`}
                onClick={handleSummaryButtonClick}
              >
                Summary
              </button>
              <button
                className={`mx-1 my-6 px-6 py-2 border-2 border-blue rounded-xl text-xl font-bold shadow-md ${!isSummary && "bg-blue text-white border-none"}`}
                onClick={handleDetailButtonClick}
              >
                Detail
              </button>
            </div>
            {isSummary ? <Summary /> : <Detail />}
          </div>
        </main>
      )}
    </>
  );
}

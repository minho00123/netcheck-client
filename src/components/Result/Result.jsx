import useStore from "../../store/store";
import { useState } from "react";
import Line from "./Line";
import Globe from "./Globe";
import Detail from "./Detail";
import Summary from "./Summary";
import Loading from "../Common/Loading";

export default function Result() {
  const [isSummary, setIsSummary] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const { tracerouteData } = useStore();
  const markers = [];

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
                  <span className="pr-3 text-blue">●</span>
                  Normal
                </p>
                <p>
                  <span className="pr-3 text-red cursor-pointer">●</span>
                  <span
                    className="hover:underline"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                  >
                    Timeout
                  </span>
                  {showTooltip && (
                    <div className="absolute top-14 left-0  mt-1 p-2 w-44 border-2 rounded bg-white text-xs  shadow-md">
                      <p>Possibilities of Timeout</p>
                      <p>1. Packet loss</p>
                      <p>2. Block packets by router</p>
                      <p>3. High network latency</p>
                      <p></p>
                    </div>
                  )}
                </p>
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

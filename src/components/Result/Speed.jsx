import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";

export default function Speed() {
  const { url, latencies } = useStore();
  const [speedData, setSpeedData] = useState({});

  useEffect(() => {
    async function getData(url) {
      try {
        const response = await axios.post(
          "http://localhost:8000/result/speed",
          {
            url,
          },
        );

        if (latencies && response.data) {
          const averageLatency =
            latencies.reduce((a, b) => a + b, 0) / latencies.length;

          setSpeedData({
            maxLatency: Math.max(...latencies),
            minLatency: Math.min(...latencies),
            averageLatency: averageLatency.toFixed(2),
            bandwidth: response.data.bandwidth.toFixed(2),
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    getData(url);
  }, [url]);

  return (
    speedData && (
      <div className="flex flex-col justify-center mt-4 mx-4 p-4 rounded-xl bg-blue-light shadow-md">
        <h2 className="text-xl font-bold">Speed</h2>
        <div className="flex justify-around mt-2">
          <div className="mr-4 rounded-2xl bg-white text-md text-center shadow-md">
            <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
            <div className="w-full h-1px bg-gray"></div>
            <p className="mx-5 mt-2 mb-2">
              <span className="text-blue font-bold">min: </span>
              {speedData.minLatency} ms
            </p>
            <p className="mx-5 mb-2">
              <span className="text-blue font-bold">max: </span>
              {speedData.maxLatency} ms
            </p>
            <p className="mx-5 pb-2 ">
              <span className="text-blue font-bold">average: </span>
              {speedData.averageLatency} ms
            </p>
          </div>
          <div className="rounded-2xl bg-white text-md text-center shadow-md">
            <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
            <div className="w-full h-1px bg-gray"></div>
            <div className="mt-5 mx-5 mt-2">
              <div className="text-xl font-bold">{speedData.bandwidth}</div>
              <div className="text-xl font-bold">Mbit/s</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

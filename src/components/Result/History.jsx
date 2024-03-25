import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";

export default function History() {
  const { url } = useStore();
  const [historyData, setHistoryData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const seoulServer = import.meta.env.VITE_SEOUL_SERVER;

  useEffect(() => {
    async function getHistoryData(url) {
      const response = await axios.post(`${seoulServer}/history/all`, {
        url,
      });

      setHistoryData(response.data);
    }

    getHistoryData(url);
  }, [url]);

  function handleClick(customId) {
    window.open(`http://localhost:5173/result/${customId}`);
  }

  return (
    <table className="mt-5 mx-auto text-center">
      <thead className="border-b-2 text-lg">
        <tr>
          <th className="px-5 py-2">No.</th>
          <th className="px-5 py-2">Date</th>
          <th className="px-5 py-2">
            <select
              value={selectedRegion}
              onChange={e => setSelectedRegion(e.target.value)}
              className=""
            >
              <option value="All">All</option>
              <option value="Seoul">Seoul</option>
              <option value="Virginia">Virginia</option>
              <option value="London">London</option>
            </select>
          </th>
          <th className="px-5 py-2">Status</th>
          <th className="px-5 py-2">Response Time</th>
          <th className="px-5 py-2">Packet Loss</th>
          <th className="px-5 py-2">Latency(ms)</th>
          <th className="px-5 py-2">Bandwidth(Mbit/s)</th>
        </tr>
      </thead>
      <tbody className="text-md">
        {historyData
          .filter(
            data =>
              selectedRegion === "All" || data.serverRegion === selectedRegion,
          )
          .map((data, index) => (
            <tr key={data._id} className="border-b border-gray-light">
              <td className="py-2">{index + 1}</td>
              <td
                className="cursor-pointer underline hover:text-blue"
                onClick={() => handleClick(data.customId)}
              >
                {new Date(data.createdAt).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </td>
              <td>{data.serverRegion}</td>
              <td>{data.reliabilityData.statusCode}</td>
              <td>{data.reliabilityData.responseTime}</td>
              <td>{data.reliabilityData.lossRate}%</td>
              <td>{data.speedData.averageLatency}</td>
              <td>{data.speedData.bandwidth}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

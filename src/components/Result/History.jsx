import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";

export default function History() {
  const { url } = useStore();
  const [sortOrder, setSortOrder] = useState("asc");
  const [historyData, setHistoryData] = useState([]);
  const [colorMapping, setColorMapping] = useState({});

  useEffect(() => {
    async function getHistoryData(url) {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/history/all`,
        {
          url,
        },
      );
      const sortedData = sortData(response.data, sortOrder);

      setHistoryData(sortedData);
      generateColorMapping(sortedData);
    }

    getHistoryData(url);
  }, [url, sortOrder]);

  function sortData(data, order) {
    return data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  function generateColorMapping(data) {
    const newColorMapping = {};
    const colors = ["#FFFFFF", "#caf0f8", "#a2d2ff"];
    let colorIndex = 0;

    data.forEach(item => {
      const dateTime = new Date(item.createdAt).toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      if (!newColorMapping[dateTime]) {
        newColorMapping[dateTime] = colors[colorIndex % colors.length];
        colorIndex++;
      }
    });

    setColorMapping(newColorMapping);
  }

  function handleClick(customId) {
    window.open(`https://client.netcheck.site/result/${customId}`);
  }

  return (
    <table className="mt-5 mx-auto text-center">
      <thead className="border-b-2 text-lg">
        <tr>
          <th className="px-5 py-2">No.</th>
          <th className="px-5 py-2">URL</th>
          <th className="px-5 py-2">
            Date
            <select
              className="text-sm"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
            >
              <option value="asc">↑ Asc.</option>
              <option value="desc">↓ Desc.</option>
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
        {historyData.map((data, index) => (
          <tr
            key={data._id}
            className="border-b border-gray-light"
            style={{
              backgroundColor:
                colorMapping[
                  new Date(data.createdAt).toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                ],
            }}
          >
            <td className="py-2">{index + 1}</td>
            <td>{data?.url}</td>
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
            <td>{data.data?.basicInformation?.statusCode}</td>
            <td>{data.data?.basicInformation?.responseTime}</td>
            <td>{data.data?.ping?.packetLoss}%</td>
            <td>{data.data?.ping?.avg}</td>
            <td>{data.data?.speed?.bandwidth}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

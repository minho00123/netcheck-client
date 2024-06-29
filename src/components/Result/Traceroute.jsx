import axios from "axios";
import useStore from "../../store/store";
import { useEffect, useState } from "react";
import Loading from "../Common/Loading";

export default function Traceroute() {
  const { url, setData, historyData } = useStore();
  const [tracerouteData, setTracerouteData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    async function getTracerouteData(url) {
      if (historyData && historyData.traceroute) {
        setTracerouteData(historyData.traceroute);
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER}/result/traceroute`,
          { url },
        );

        const data = response.data;
        setTracerouteData(data);
        setData({ traceroute: response.data });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    if (url) {
      getTracerouteData(url);
    }
  }, [url, historyData, setData]);

  return (
    <div className="flex flex-col justify-center w-full mx-4 mb-3 p-4 rounded-xl bg-blue-light shadow-md">
      <div
        className="relative inline-block"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <h2 className="text-xl font-bold">Traceroute</h2>
        {showTooltip && (
          <div className="absolute left-0 mt-2 w-64 p-2 bg-black text-white text-sm rounded-md shadow-md">
            Traceroute는 네트워크 경로를 추적하여 각 홉에서의 응답 시간을
            측정하는 도구입니다.
          </div>
        )}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full mt-2 mr-4 rounded-2xl bg-white text-md shadow-md break-words">
          <table className="w-full text-center">
            <thead>
              <tr className="border-b-2">
                <th>Hop</th>
                <th>IP Address</th>
                <th>City</th>
                <th>Country</th>
                <th>RTT</th>
              </tr>
            </thead>
            <tbody>
              {tracerouteData.map(data => (
                <tr
                  key={data.hop}
                  className={
                    data.hop !== tracerouteData.length - 1
                      ? "border-b-[1px]"
                      : ""
                  }
                >
                  <td>{data.hop}</td>
                  <td>{data.ip}</td>
                  <td>{data.city}</td>
                  <td>{data.country}</td>
                  <td>{data.rtt1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

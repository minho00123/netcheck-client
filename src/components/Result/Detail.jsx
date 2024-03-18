import useStore from "../../store/store";
import Graph from "./Graph";

export default function Detail() {
  const { urlInfo, pingData, bandwidthData } = useStore();

  return (
    <section className="text-center">
      <p className="px-5 py-3 border-2 border-blue rounded-xl bg-blue-light text-md">
        <span className="text-lg font-bold">URL: </span>
        {urlInfo.url}
      </p>
      <div className="my-5 px-5 py-3 border-2 border-blue rounded-xl bg-blue-light text-md">
        <p className="text-lg font-bold">IP Address / Location </p>
        {urlInfo.ipAddress} <br /> {urlInfo.city}, {urlInfo.country}
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col items-center px-2 py-3 border-2 border-blue rounded-xl bg-blue-light text-lg">
          <p className="text-md font-bold">Packet Loss</p>
          <p className="flex justify-center items-center size-20 border-2 border-blue rounded-full bg-white text-md">
            {pingData.lossRate}%
          </p>
          <p className="text-xs">
            Sent: {pingData.sent} / Received: {pingData.received}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center px-5 py-3 border-2 border-blue rounded-xl bg-blue-light text-lg">
          <p className="text-lg font-bold">Bandwidth</p>
          <p className="flex justify-center items-center size-20 border-2 border-blue rounded-full bg-white text-sm">
            {bandwidthData.bandwidth.toFixed(2)}Mbit/s
          </p>
        </div>
      </div>
      <Graph />
    </section>
  );
}

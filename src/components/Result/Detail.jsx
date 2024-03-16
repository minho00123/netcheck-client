import useStore from "../../store/store";

export default function Detail() {
  const { urlInfo, pingData } = useStore();

  return (
    <section className="text-center">
      <p className="my-5 px-5 py-3 border-2 border-blue rounded-xl text-md">
        <span className="text-lg font-bold">URL: </span>
        {urlInfo.url}
      </p>
      <p className="my-5 px-5 py-3 border-2 border-blue rounded-xl text-md">
        <p className="text-lg font-bold">IP Address / Location </p>
        {urlInfo.ipAddress} <br /> {urlInfo.city}, {urlInfo.country}
      </p>
      <div className="flex justify-around">
        <p className="flex flex-col items-center my-5 px-2 py-3 text-lg border-2 border-blue rounded-xl">
          <p className="text-md font-bold">Packet Loss</p>
          <p className="flex justify-center items-center size-20 border-2 border-blue rounded-full text-md">
            {pingData.lossRate}%
          </p>
          <p className="text-xs">
            Sent: {pingData.sent} / Received: {pingData.received}
          </p>
        </p>
      </div>
    </section>
  );
}

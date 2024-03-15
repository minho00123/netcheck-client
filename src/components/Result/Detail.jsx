import useStore from "../../store/store";

export default function Detail() {
  const { urlInfo } = useStore();

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
    </section>
  );
}

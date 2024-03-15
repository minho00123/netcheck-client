import useStore from "../../store/store";

export default function Summary() {
  const { urlInfo } = useStore();

  return (
    <section className="px-8 py-4 border-blue border-2 rounded-xl font-bold text-4xl shadow-2xl">
      <div
        className={`m-5 p-5 border-2 rounded-xl text-center shadow-md ${urlInfo.url ? "border-green bg-green-light" : "border-red bg-red-light"}`}
      >
        <p>URL</p>
        {urlInfo.url ? "✓" : "X"}
      </div>
    </section>
  );
}

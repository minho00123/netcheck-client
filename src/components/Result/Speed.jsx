export default function Speed() {
  return (
    <div className="flex flex-col mx-10 p-4 rounded-xl bg-blue-light shadow-md">
      <h2 className="text-xl font-bold">Speed</h2>
      <div className="my-5">
        <div className="rounded-2xl bg-white text-md text-center shadow-md">
          <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">min: </span>
            147.329 ms
          </p>
          <p className="mx-5 mb-2">
            <span className="text-blue font-bold">max: </span>
            147.329 ms
          </p>
          <p className="mx-5 pb-2 ">
            <span className="text-blue font-bold">average: </span>
            147.329 ms
          </p>
        </div>
        <div className="rounded-2xl bg-white text-md text-center shadow-md">
          <h3 className="mx-5 mt-4 mb-1 pt-2 font-bold text-lg">Bandwidth</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 pb-2">
            <div className="text-xl font-bold">1</div>
            <div className="text-xl font-bold">Mbit/s</div>
          </p>
        </div>
      </div>
    </div>
  );
}

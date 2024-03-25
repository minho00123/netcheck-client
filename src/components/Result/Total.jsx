import useStore from "../../store/store";

export default function Total() {
  const { seoulData, virginiaData, londonData } = useStore();

  return (
    seoulData && (
      <div className="flex justify-center">
        <div className="mt-4 mx-4 p-4 rounded-xl bg-blue-light shadow-md">
          <h2 className="text-xl font-bold">North East Asia - Seoul</h2>
          <div className="flex flex-col justify-center mt-2">
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Availability</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-1">
                {seoulData.reliability?.statusCode}{" "}
                <span
                  className={
                    seoulData.reliability?.statusCode >= 200 &&
                    seoulData.reliability?.statusCode < 300
                      ? "text-green"
                      : "text-red"
                  }
                >
                  {seoulData.reliability?.statusCode >= 200 &&
                  seoulData.reliability?.statusCode < 300
                    ? "OK"
                    : "Error"}
                </span>
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">Response Time: </span>
                {seoulData.reliability?.responseTime} ms
              </p>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-2 mx-5 mb-2">
                <div className="mb-3 text-xl font-bold">
                  {seoulData.reliability?.lossRate}%
                </div>
                <div className="text-sm">
                  Sent: {seoulData.reliability?.sent} / Received:{" "}
                  {seoulData.reliability?.received}
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-2">
                <span className="text-blue font-bold">min: </span>
                {seoulData.speed?.minLatency} ms
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">max: </span>
                {seoulData.speed?.maxLatency} ms
              </p>
              <p className="mx-5 pb-2 ">
                <span className="text-blue font-bold">average: </span>
                {seoulData.speed?.averageLatency} ms
              </p>
            </div>
            <div className="rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-5 mx-5 mb-2">
                <div className="text-xl font-bold">
                  {seoulData.speed?.bandwidth}
                </div>
                <div className="text-xl font-bold">Mbit/s</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 mx-4 p-4 rounded-xl bg-blue-light shadow-md">
          <h2 className="text-xl font-bold">US East - Virginia</h2>
          <div className="flex flex-col justify-center mt-2">
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Availability</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-1">
                {virginiaData.reliability?.statusCode}{" "}
                <span
                  className={
                    virginiaData.reliability?.statusCode >= 200 &&
                    virginiaData.reliability?.statusCode < 300
                      ? "text-green"
                      : "text-red"
                  }
                >
                  {virginiaData.reliability?.statusCode >= 200 &&
                  virginiaData.reliability?.statusCode < 300
                    ? "OK"
                    : "Error"}
                </span>
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">Response Time: </span>
                {virginiaData.reliability?.responseTime} ms
              </p>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-2 mx-5 mb-2">
                <div className="mb-3 text-xl font-bold">
                  {virginiaData.reliability?.lossRate}%
                </div>
                <div className="text-sm">
                  Sent: {virginiaData.reliability?.sent} / Received:{" "}
                  {virginiaData.reliability?.received}
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-2">
                <span className="text-blue font-bold">min: </span>
                {virginiaData.speed?.minLatency} ms
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">max: </span>
                {virginiaData.speed?.maxLatency} ms
              </p>
              <p className="mx-5 pb-2 ">
                <span className="text-blue font-bold">average: </span>
                {virginiaData.speed?.averageLatency} ms
              </p>
            </div>
            <div className="rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-5 mx-5 mb-2">
                <div className="text-xl font-bold">
                  {virginiaData.speed?.bandwidth}
                </div>
                <div className="text-xl font-bold">Mbit/s</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 mx-4 p-4 rounded-xl bg-blue-light shadow-md">
          <h2 className="text-xl font-bold">Europe - London</h2>
          <div className="flex flex-col justify-center mt-2">
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Availability</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-1">
                {londonData.reliability?.statusCode}{" "}
                <span
                  className={
                    londonData.reliability?.statusCode >= 200 &&
                    londonData.reliability?.statusCode < 300
                      ? "text-green"
                      : "text-red"
                  }
                >
                  {londonData.reliability?.statusCode >= 200 &&
                  londonData.reliability?.statusCode < 300
                    ? "OK"
                    : "Error"}
                </span>
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">Response Time: </span>
                {londonData.reliability?.responseTime} ms
              </p>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-2 mx-5 mb-2">
                <div className="mb-3 text-xl font-bold">
                  {londonData.reliability?.lossRate}%
                </div>
                <div className="text-sm">
                  Sent: {londonData.reliability?.sent} / Received:{" "}
                  {londonData.reliability?.received}
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-2">
                <span className="text-blue font-bold">min: </span>
                {londonData.speed?.minLatency} ms
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">max: </span>
                {londonData.speed?.maxLatency} ms
              </p>
              <p className="mx-5 pb-2 ">
                <span className="text-blue font-bold">average: </span>
                {londonData.speed?.averageLatency} ms
              </p>
            </div>
            <div className="rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-5 mx-5 mb-2">
                <div className="text-xl font-bold">
                  {londonData.speed?.bandwidth}
                </div>
                <div className="text-xl font-bold">Mbit/s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

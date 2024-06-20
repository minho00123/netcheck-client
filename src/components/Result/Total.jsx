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
                {seoulData?.statusCode}{" "}
                <span
                  className={
                    seoulData?.statusCode >= 200 && seoulData?.statusCode < 300
                      ? "text-green"
                      : "text-red"
                  }
                >
                  {seoulData?.statusCode >= 200 && seoulData?.statusCode < 300
                    ? "OK"
                    : "Error"}
                </span>
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">Response Time: </span>
                {seoulData?.responseTime} ms
              </p>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-2 mx-5 mb-2">
                <div className="mb-3 text-xl font-bold">
                  {seoulData?.lossRate}%
                </div>
                <div className="text-sm">
                  Sent: {seoulData?.sent} / Received: {seoulData?.received}
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-2">
                <span className="text-blue font-bold">min: </span>
                {seoulData?.minLatency} ms
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">max: </span>
                {seoulData?.maxLatency} ms
              </p>
              <p className="mx-5 pb-2 ">
                <span className="text-blue font-bold">average: </span>
                {seoulData?.averageLatency} ms
              </p>
            </div>
            <div className="rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-5 mx-5 mb-2">
                <div className="text-xl font-bold">{seoulData?.bandwidth}</div>
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
                {virginiaData?.statusCode}{" "}
                <span
                  className={
                    virginiaData?.statusCode >= 200 &&
                    virginiaData?.statusCode < 300
                      ? "text-green"
                      : "text-red"
                  }
                >
                  {virginiaData?.statusCode >= 200 &&
                  virginiaData?.statusCode < 300
                    ? "OK"
                    : "Error"}
                </span>
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">Response Time: </span>
                {virginiaData?.responseTime} ms
              </p>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-2 mx-5 mb-2">
                <div className="mb-3 text-xl font-bold">
                  {virginiaData?.lossRate}%
                </div>
                <div className="text-sm">
                  Sent: {virginiaData?.sent} / Received:{" "}
                  {virginiaData?.received}
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-2">
                <span className="text-blue font-bold">min: </span>
                {virginiaData?.minLatency} ms
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">max: </span>
                {virginiaData?.maxLatency} ms
              </p>
              <p className="mx-5 pb-2 ">
                <span className="text-blue font-bold">average: </span>
                {virginiaData?.averageLatency} ms
              </p>
            </div>
            <div className="rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-5 mx-5 mb-2">
                <div className="text-xl font-bold">
                  {virginiaData?.bandwidth}
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
                {londonData?.statusCode}{" "}
                <span
                  className={
                    londonData?.statusCode >= 200 &&
                    londonData?.statusCode < 300
                      ? "text-green"
                      : "text-red"
                  }
                >
                  {londonData?.statusCode >= 200 && londonData?.statusCode < 300
                    ? "OK"
                    : "Error"}
                </span>
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">Response Time: </span>
                {londonData?.responseTime} ms
              </p>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-2 mx-5 mb-2">
                <div className="mb-3 text-xl font-bold">
                  {londonData?.lossRate}%
                </div>
                <div className="text-sm">
                  Sent: {londonData?.sent} / Received: {londonData?.received}
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-2">
                <span className="text-blue font-bold">min: </span>
                {londonData?.minLatency} ms
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">max: </span>
                {londonData?.maxLatency} ms
              </p>
              <p className="mx-5 pb-2 ">
                <span className="text-blue font-bold">average: </span>
                {londonData?.averageLatency} ms
              </p>
            </div>
            <div className="rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-5 mx-5 mb-2">
                <div className="text-xl font-bold">{londonData?.bandwidth}</div>
                <div className="text-xl font-bold">Mbit/s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

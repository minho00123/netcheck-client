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
                {seoulData.reliabilityData?.statusCode}{" "}
                <span
                  className={
                    seoulData.reliabilityData?.statusCode >= 200 &&
                    seoulData.reliabilityData?.statusCode < 300
                      ? "text-green"
                      : "text-red"
                  }
                >
                  {seoulData.reliabilityData?.statusCode >= 200 &&
                  seoulData.reliabilityData?.statusCode < 300
                    ? "OK"
                    : "Error"}
                </span>
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">Response Time: </span>
                {seoulData.reliabilityData?.responseTime} ms
              </p>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-2 mx-5 mb-2">
                <div className="mb-3 text-xl font-bold">
                  {seoulData.reliabilityData?.lossRate}%
                </div>
                <div className="text-sm">
                  Sent: {seoulData.reliabilityData?.sent} / Received:{" "}
                  {seoulData.reliabilityData?.received}
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-2">
                <span className="text-blue font-bold">min: </span>
                {seoulData.speedData?.minLatency} ms
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">max: </span>
                {seoulData.speedData?.maxLatency} ms
              </p>
              <p className="mx-5 pb-2 ">
                <span className="text-blue font-bold">average: </span>
                {seoulData.speedData?.averageLatency} ms
              </p>
            </div>
            <div className="rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-5 mx-5 mb-2">
                <div className="text-xl font-bold">
                  {seoulData.speedData?.bandwidth}
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
                {virginiaData.reliabilityData?.statusCode}{" "}
                <span
                  className={
                    virginiaData.reliabilityData?.statusCode >= 200 &&
                    virginiaData.reliabilityData?.statusCode < 300
                      ? "text-green"
                      : "text-red"
                  }
                >
                  {virginiaData.reliabilityData?.statusCode >= 200 &&
                  virginiaData.reliabilityData?.statusCode < 300
                    ? "OK"
                    : "Error"}
                </span>
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">Response Time: </span>
                {virginiaData.reliabilityData?.responseTime} ms
              </p>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-2 mx-5 mb-2">
                <div className="mb-3 text-xl font-bold">
                  {virginiaData.reliabilityData?.lossRate}%
                </div>
                <div className="text-sm">
                  Sent: {virginiaData.reliabilityData?.sent} / Received:{" "}
                  {virginiaData.reliabilityData?.received}
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-2">
                <span className="text-blue font-bold">min: </span>
                {virginiaData.speedData?.minLatency} ms
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">max: </span>
                {virginiaData.speedData?.maxLatency} ms
              </p>
              <p className="mx-5 pb-2 ">
                <span className="text-blue font-bold">average: </span>
                {virginiaData.speedData?.averageLatency} ms
              </p>
            </div>
            <div className="rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-5 mx-5 mb-2">
                <div className="text-xl font-bold">
                  {virginiaData.speedData?.bandwidth}
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
                {londonData.reliabilityData?.statusCode}{" "}
                <span
                  className={
                    londonData.reliabilityData?.statusCode >= 200 &&
                    londonData.reliabilityData?.statusCode < 300
                      ? "text-green"
                      : "text-red"
                  }
                >
                  {londonData.reliabilityData?.statusCode >= 200 &&
                  londonData.reliabilityData?.statusCode < 300
                    ? "OK"
                    : "Error"}
                </span>
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">Response Time: </span>
                {londonData.reliabilityData?.responseTime} ms
              </p>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 text-lg font-bold">Packet Loss</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-2 mx-5 mb-2">
                <div className="mb-3 text-xl font-bold">
                  {londonData.reliabilityData?.lossRate}%
                </div>
                <div className="text-sm">
                  Sent: {londonData.reliabilityData?.sent} / Received:{" "}
                  {londonData.reliabilityData?.received}
                </div>
              </div>
            </div>
            <div className="mb-3 rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">Latency</h3>
              <div className="w-full h-1px bg-gray"></div>
              <p className="mx-5 mt-2 mb-2">
                <span className="text-blue font-bold">min: </span>
                {londonData.speedData?.minLatency} ms
              </p>
              <p className="mx-5 mb-2">
                <span className="text-blue font-bold">max: </span>
                {londonData.speedData?.maxLatency} ms
              </p>
              <p className="mx-5 pb-2 ">
                <span className="text-blue font-bold">average: </span>
                {londonData.speedData?.averageLatency} ms
              </p>
            </div>
            <div className="rounded-2xl bg-white text-md text-center shadow-md">
              <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Bandwidth</h3>
              <div className="w-full h-1px bg-gray"></div>
              <div className="mt-5 mx-5 mb-2">
                <div className="text-xl font-bold">
                  {londonData.speedData?.bandwidth}
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

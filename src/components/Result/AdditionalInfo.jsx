export default function AdditionalInfo() {
  return (
    <div className="my-5 mx-10 p-4 rounded-xl bg-blue-light shadow-md">
      <h2 className="text-xl font-bold">Additional Information</h2>
      <div className="flex justify-between my-5">
        <div className="rounded-2xl bg-white text-md text-center shadow-md">
          <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Availability</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-1">
            200 <span className="text-green">OK</span>
          </p>
          <p className="mx-5 mb-2">
            <span className="text-blue font-bold">Response Time: </span>
            100 ms
          </p>
        </div>
        <div className="rounded-2xl bg-white text-md shadow-md">
          <h3 className="mx-5 mt-2 mb-1 font-bold text-lg text-center ">
            Domain
          </h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">Registrar: </span>
            MarkMonitor Inc.
          </p>
          <p className="mx-5 mb-2">
            <span className="text-blue font-bold">Registry Expiry Date: </span>
            09/14/2028
          </p>
        </div>
        <div className="rounded-2xl bg-white text-md text-center shadow-md">
          <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">IP Address</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-1">123.123.123.123</p>
          <p className="mx-5 mb-2">Seoul, Korea</p>
        </div>
        <div className="rounded-2xl bg-white text-md text-center shadow-md">
          <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">SEO</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">Score: </span>
            <div className="text-lg font-bold">72</div>
          </p>
        </div>
        <div className="rounded-2xl bg-white text-md text-center shadow-md">
          <h3 className="mx-5 mt-2 mb-1 font-bold text-lg">Packet Loss</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-2">
            <div className="mb-3 text-xl font-bold">50%</div>
            <div className="text-sm">Sent: 10 / Received: 5</div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Security() {
  return (
    <div className="p-4 rounded-xl bg-blue-light shadow-md">
      <h2 className="text-xl font-bold">Security</h2>
      <div className="my-5">
        <div className="rounded-2xl bg-white text-md text-center shadow-md">
          <h3 className="mx-5 mb-1 pt-2 font-bold text-lg">SSL</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">Issuer: </span>
            Google Trust Services LLC
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Expiry Date: </span>
            09/14/2028
          </p>
        </div>
        <div className="rounded-2xl bg-white text-md text-center shadow-md">
          <h3 className="mx-5 mt-3 mb-1 pt-2 font-bold text-lg">
            HTTP Header Analysis
          </h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">HTTPS: </span>
            True
          </p>
          <p className="mx-5 mb-2">
            <span className="text-blue font-bold">CSP: </span>
            none
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">HSTS: </span>
            max-age=31536000
          </p>
        </div>
      </div>
    </div>
  );
}

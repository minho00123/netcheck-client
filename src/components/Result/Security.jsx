import useStore from "../../store/store";
import { useEffect, useState } from "react";

export default function Security() {
  const { seoulData, virginiaData, londonData, selectedRegion } = useStore();
  const [securityData, setSecurityData] = useState({});

  useEffect(() => {
    if (selectedRegion === "Seoul") {
      setSecurityData(seoulData.securityData);
    } else if (selectedRegion === "Virginia") {
      setSecurityData(virginiaData.securityData);
    } else if (selectedRegion === "London") {
      setSecurityData(londonData.securityData);
    }
  }, [selectedRegion, seoulData, virginiaData, londonData]);

  return (
    <div className="flex flex-col justify-center mr-4 my-5 p-4 rounded-xl bg-blue-light shadow-md">
      <h2 className="text-xl font-bold">Security</h2>
      <div className="flex mt-2">
        <div className="mr-4 rounded-2xl bg-white text-md shadow-md">
          <h3 className="mx-5 mb-1 pt-2 text-lg text-center font-bold">SSL</h3>
          <div className="w-full h-1px bg-gray"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">Issuer: </span>
            {securityData?.issuer}
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Expiry Date: </span>
            {securityData?.expiryDate}
          </p>
        </div>
        <div className="rounded-2xl bg-white text-md shadow-md">
          <h3 className="mx-5 mt-2 mb-1 text-lg text-center font-bold">
            HTTP Header Analysis
          </h3>
          <div className="w-full h-1px bg-gray"></div>

          <p className="mt-2 mx-5 mb-1">
            <span className="text-blue font-bold">CSP: </span>
            {securityData?.csp ? securityData?.csp : "none"}
          </p>
          <p className="mx-5">
            <span className="text-blue font-bold">HSTS: </span>
            {securityData?.hsts ? securityData?.hsts : "none"}
          </p>
        </div>
      </div>
    </div>
  );
}

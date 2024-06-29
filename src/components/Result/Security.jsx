import axios from "axios";
import { useEffect, useState } from "react";
import useStore from "../../store/store";

export default function Security() {
  const { url, setData, historyData } = useStore();
  const [securityData, setSecurityData] = useState({});
  const [showAllSubjectAltNames, setShowAllSubjectAltNames] = useState(false);

  useEffect(() => {
    async function fetchSecurityData(url) {
      if (historyData && historyData.security) {
        setSecurityData(historyData.security);
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER}/result/security`,
          { url },
        );

        setSecurityData(response.data);
        setData({ security: response.data });
      } catch (error) {
        console.error("Error fetching security data:", error);
      }
    }

    if (url) {
      fetchSecurityData(url);
    }
  }, [url, historyData, setData]);

  const renderSubjectAltNames = () => {
    if (!securityData?.subjectaltname) {
      return "N/A";
    }

    const altNames = securityData.subjectaltname;
    const displayNames = showAllSubjectAltNames
      ? altNames
      : altNames.slice(0, 10);
    const remainingCount = altNames.length - 10;

    return (
      <>
        <span>{displayNames.join(", ")}</span>
        {remainingCount > 0 && (
          <button
            className="text-blue ml-2"
            onClick={() => setShowAllSubjectAltNames(!showAllSubjectAltNames)}
          >
            {showAllSubjectAltNames
              ? "Show less"
              : `and ${remainingCount} more`}
          </button>
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col justify-center mr-4 p-4 rounded-xl bg-blue-light shadow-md">
      <h2 className="text-xl font-bold">SSL/TLS</h2>
      <div className="flex flex-col mt-2">
        <div className="flex max-sm:flex-col">
          <div className="w-1/2 mr-4 rounded-2xl bg-white text-md shadow-md break-words max-sm:w-full">
            <h3 className="mx-5 mb-1 pt-2 text-lg font-bold">Subject</h3>
            <div className="w-full h-[1.5px] bg-black"></div>
            <p className="mx-5 mt-2 mb-2">
              <span className="text-blue font-bold">Common Name: </span>
              {securityData?.subject?.commonName || "N/A"}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Organization: </span>
              {securityData?.subject?.organization || "N/A"}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">State: </span>
              {securityData?.subject?.state || "N/A"}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Country: </span>
              {securityData?.subject?.country || "N/A"}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Location: </span>
              {securityData?.subject?.location || "N/A"}
            </p>
            <div className="mx-5 pb-2">
              <span className="text-blue font-bold">
                Subject Alternative Name:{" "}
              </span>
              {renderSubjectAltNames()}
            </div>
          </div>
          <div className="w-1/2 mr-4 rounded-2xl bg-white text-md shadow-md break-words max-sm:w-full max-sm:mt-4">
            <h3 className="mx-5 mb-1 pt-2 text-lg font-bold">Issuer</h3>
            <div className="w-full h-[1.5px] bg-black"></div>
            <p className="mx-5 mt-2 mb-2">
              <span className="text-blue font-bold">Common Name: </span>
              {securityData?.issuer?.commonName || "N/A"}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Organization: </span>
              {securityData?.issuer?.organization || "N/A"}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">State: </span>
              {securityData?.issuer?.state || "N/A"}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Country: </span>
              {securityData?.issuer?.country || "N/A"}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">Location: </span>
              {securityData?.issuer?.location || "N/A"}
            </p>
            <p className="mx-5 pb-2">
              <span className="text-blue font-bold">CA Issuers: </span>
              {securityData?.caIssuers || "N/A"}
            </p>
          </div>
        </div>
        <div className="mt-4 mr-4 rounded-2xl bg-white text-md shadow-md break-words max-sm:w-full">
          <h3 className="mx-5 mb-1 pt-2 text-lg font-bold">Other</h3>
          <div className="w-full h-[1.5px] bg-black"></div>
          <p className="mx-5 mt-2 mb-2">
            <span className="text-blue font-bold">Public Key Size: </span>
            {securityData?.publicKeySize || "N/A"}
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Public Key: </span>
            {securityData?.publicKey || "N/A"}
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Serial Number: </span>
            {securityData?.serialNumber || "N/A"}
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Valid From: </span>
            {securityData?.validFrom || "N/A"}
          </p>
          <p className="mx-5 pb-2">
            <span className="text-blue font-bold">Valid To: </span>
            {securityData?.validTo || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

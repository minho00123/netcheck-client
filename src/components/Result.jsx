import useStore from "../store/store";
import { useState } from "react";
import Line from "./Line";
import Loading from "./Loading";

export default function Result() {
  const [isSummary, setIsSummary] = useState(true);
  const { tracerouteData } = useStore();

  function handleSummaryButtonClick() {
    setIsSummary(true);
  }

  function handleDetailButtonClick() {
    setIsSummary(false);
  }

  return (
    <>
      {tracerouteData.length === 0 ? (
        <div className="flex justify-center items-center h-75vh">
          <Loading />
        </div>
      ) : (
        <main className="flex h-full">
          <div className="flex flex-col justify-center items-center mr-24">
            <div className="flex justify-center items-center">
              <button
                className={`mx-1 mr-3 px-6 py-2 border-2 border-blue rounded-xl text-xl font-bold shadow-md ${isSummary && "bg-blue text-white border-none"}`}
                onClick={handleSummaryButtonClick}
              >
                Summary
              </button>
              <button
                className={`mx-1 my-6 px-6 py-2 border-2 border-blue rounded-xl text-xl font-bold shadow-md ${!isSummary && "bg-blue text-white border-none"}`}
                onClick={handleDetailButtonClick}
              >
                Detail
              </button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

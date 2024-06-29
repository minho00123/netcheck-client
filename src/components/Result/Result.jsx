import axios from "axios";
import { useEffect, useState } from "react";
import useStore from "../../store/store";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Loading from "../Common/Loading";
import History from "./History";
import Sidebar from "../Common/Sidebar";
import Security from "./Security";
import Network from "./Network";
import BasicInformation from "./BasicInformation";
import Traceroute from "./Traceroute";

export default function Result() {
  const { customId } = useParams();
  const { url, setUrl, selectedButton, historyData, data, setHistoryData } =
    useStore();

  useEffect(() => {
    async function getIdData(customId) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER}/history/id`,
          {
            customId,
          },
        );
        if (response.data && response.data.length > 0) {
          setUrl(response.data[0].url);
          setHistoryData(response.data[0].data);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getIdData(customId);
  }, [customId, setUrl, setHistoryData]);

  useEffect(() => {
    async function saveData(url, customId, data) {
      if (
        data.basicInformation &&
        data.domain &&
        data.ip &&
        data.ping &&
        data.security &&
        data.speed &&
        data.traceroute
      ) {
        try {
          await axios.post(`${import.meta.env.VITE_SERVER}/history/save`, {
            url,
            customId,
            data,
          });
        } catch (error) {
          console.error(error);
        }
      }
    }

    saveData(url, customId, data);
  }, [url, customId, data]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full" data-testid="network-info">
        <Header />
        <h1 className="text-2xl text-center font-bold max-sm:text-lg">
          The network information of website for{" "}
          <span className="text-blue">{`${url}`}</span>
        </h1>
        {selectedButton === "History" ? (
          <History />
        ) : (
          <>
            <div className="flex justify-evenly w-full">
              <BasicInformation />
            </div>
            <div className="flex flex-col justify-evenly w-full">
              <div className="flex-1 p-2">
                <Network />
              </div>
              <div className="flex-1 p-2">
                <Security />
              </div>
            </div>
            <div className="flex justify-evenly w-full">
              <Traceroute />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import PlanTable from "@components/PlanTable";
import SessionDetails from "@components/SessionDetails";
import SocketContext from "contexts/SocketContext";
import generateRandPlan from "functions/generateRandPlan";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Plan } from "types/db";

export const Home = (): JSX.Element => {
  const { socket, isConnected } = useContext(SocketContext);
  const [currentRandom, setCurrentRandom] = useState("");
  const [currentPlans, setCurrentPlans] = useState<Plan[]>([]);

  useEffect(() => {
    socket.emit("getCurrentPlans", setCurrentPlans);
    socket.on("randomUpdate", setCurrentRandom);
    socket.on("newPlan", (plan) =>
      setCurrentPlans((prev) => {
        return [...prev, plan];
      })
    );

    return () => {
      socket.off("randomUpdate");
      socket.off("currentPlans");
      socket.off("newPlan");
    };
  }, [socket]);

  return (
    <div>
      <Head>
        <title>Welcome to the template!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col">
        <div className="m-4 w-max">
          <div className="bg-blue-200 p-4 rounded relative">
            <SessionDetails />
            <p>Hello, you are {isConnected ? "connected" : "not connected"}</p>
            <p>Current random number is: {currentRandom}</p>
            <button
              className="flex mt-4 w-max text-left bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={() => socket.emit("ping")}
            >
              Emit
            </button>
            <button
              className="mt-4 mb-4 flex w-max text-left bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={() => {
                const plan = generateRandPlan();
                socket.emit("filePlan", plan);
              }}
            >
              File plan
            </button>
            <PlanTable plans={currentPlans} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

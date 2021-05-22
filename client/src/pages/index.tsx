import PlanTable from "@components/PlanTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SessionDetails from "@components/SessionDetails";
import SocketContext from "contexts/SocketContext";
import generateRandPlan from "functions/generateRandPlan";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Plan } from "types/db";

export const Home = (): JSX.Element => {
  const { socket, isConnected } = useContext(SocketContext);
  const [currentPlans, setCurrentPlans] = useState<Plan[]>([]);

  useEffect(() => {
    socket.emit("getCurrentPlans", setCurrentPlans);
    socket.on("newPlan", (plan: Plan) =>
      setCurrentPlans((prev) => {
        return [...prev, plan];
      })
    );
    socket.on("planDeleted", (id: string) =>
      setCurrentPlans((prev) => prev.filter((val) => val._id !== id))
    );

    return () => {
      socket.off("currentPlans");
      socket.off("newPlan");
      socket.off("planDeleted");
    };
  }, [socket]);

  return (
    <div>
      <Head>
        <title>Welcome to the template!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col">
        <div className="m-4 min-w-max max-w-4xl">
          <div className="bg-blue-100 p-4 rounded relative">
            <SessionDetails />
            <span className="flex items-center">
              {isConnected ? (
                <>
                  <FontAwesomeIcon
                    className="text-gray-700"
                    width={40}
                    icon="handshake"
                  />
                  <span className="ml-3 font-semibold">Connected</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    className="text-gray-500"
                    width={40}
                    icon="handshake-slash"
                  />
                  <span className="ml-3 font-semibold">Not Connected</span>
                </>
              )}
            </span>
            <button
              className="flex mt-4 w-max text-left bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={() => isConnected && socket.emit("ping")}
            >
              Ping
            </button>
            <button
              className="inline-flex items-center mt-4 mb-4 w-max text-left bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={() => {
                const plan = generateRandPlan();
                isConnected && socket.emit("filePlan", plan);
              }}
            >
              File plan
              <FontAwesomeIcon className="ml-2" width={18} icon="paper-plane" />
            </button>
            <PlanTable plans={currentPlans} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

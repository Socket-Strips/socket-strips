import PlanTable from "@components/PlanTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SessionDetails from "@components/SessionDetails";
import SocketContext from "contexts/SocketContext";
import generateRandPlan from "functions/generateRandPlan";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Plan } from "@prisma/client";
import toast from "react-hot-toast";

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
    socket.on("changedPlan", (id: Plan["id"], changes: Partial<Plan>) => {
      setCurrentPlans((prev) => {
        const idx = prev.findIndex((plan) => plan.id === id);
        prev[idx] = { ...prev[idx], ...changes };
        return [...prev];
      });
    });
    socket.on("planDeleted", (id: number) =>
      setCurrentPlans((prev) => prev.filter((val) => val.id !== id))
    );

    return () => {
      socket.off("currentPlans");
      socket.off("newPlan");
      socket.off("planDeleted");
      socket.off("changedPlan");
    };
  }, [socket]);

  return (
    <div>
      <Head>
        <title>Welcome to the template!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-700 text-gray-200 min-h-screen">
        <div className="flex flex-col">
          <div className="m-4 min-w-max max-w-4xl">
            <div className="bg-gray-600 p-4 rounded relative">
              <SessionDetails />
              <span className="flex items-center">
                {isConnected ? (
                  <>
                    <FontAwesomeIcon
                      className="text-gray-200"
                      width={40}
                      icon="handshake"
                    />
                    <span className="ml-3 font-semibold">Connected</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      className="text-gray-200"
                      width={40}
                      icon="handshake-slash"
                    />
                    <span className="ml-3 font-semibold">Not Connected</span>
                  </>
                )}
              </span>
              <button
                className="flex mt-4 w-max text-left bg-gray-500 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded"
                onClick={() =>
                  isConnected &&
                  socket.emit("ping") &&
                  toast("Sent a ping!", { icon: "👏" })
                }
              >
                Ping
              </button>
              <button
                className="inline-flex items-center mt-4 mb-4 w-max text-left bg-gray-500 hover:bg-gray-400 text-white font-medium py-2 px-4 rounded"
                onClick={() => {
                  const plan = generateRandPlan();
                  isConnected &&
                    socket.emit("filePlan", plan) &&
                    toast.success("Plan filed!");
                }}
              >
                File plan
                <FontAwesomeIcon
                  className="ml-2"
                  width={18}
                  icon="paper-plane"
                />
              </button>
              <PlanTable plans={currentPlans} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

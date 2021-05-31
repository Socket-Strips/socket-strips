import PlanTable from "@components/PlanTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocketContext from "contexts/SocketContext";
import generateRandPlan from "functions/generateRandPlan";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Plan } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/client";
import Layout from "@components/Layout";

export const ATC = (): JSX.Element => {
  const { socket, isConnected } = useContext(SocketContext);
  const [currentPlans, setCurrentPlans] = useState<Plan[]>([]);

  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
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
    }

    return () => {
      socket.off("currentPlans");
      socket.off("newPlan");
      socket.off("planDeleted");
      socket.off("changedPlan");
    };
  }, [session, socket]);

  if (loading) return <></>;

  if (!loading && !session) {
    router.push("/");
  }

  return (
    <div>
      <Head>
        <title>ATC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className="flex flex-col">
          <div className="m-4 min-w-max max-w-4xl">
            <div className="bg-gray-600 p-4 rounded relative">
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
      </Layout>
    </div>
  );
};

export default ATC;

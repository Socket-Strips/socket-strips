import PlanTable from "@components/PlanTable";
import SocketContext from "contexts/SocketContext";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { Plan } from "@prisma/client";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/client";
import Layout from "@components/Layout";
import PlanContext from "contexts/PlanContext";

export const ATC = (): JSX.Element => {
  const { socket } = useContext(SocketContext);
  const { plans, setPlans } = useContext(PlanContext);

  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
      socket.emit("getCurrentPlans", setPlans);
      socket.on("newPlan", (plan: Plan) =>
        setPlans((prev) => {
          return [...prev, plan];
        })
      );
      socket.on("changedPlan", (id: Plan["id"], changes: Partial<Plan>) => {
        setPlans((prev) => {
          const idx = prev.findIndex((plan) => plan.id === id);
          prev[idx] = { ...prev[idx], ...changes };
          return [...prev];
        });
      });
      socket.on("planDeleted", (id: number) =>
        setPlans((prev) => prev.filter((val) => val.id !== id))
      );
    }

    return () => {
      socket.off("currentPlans");
      socket.off("newPlan");
      socket.off("planDeleted");
      socket.off("changedPlan");
    };
  }, [session, setPlans, socket]);

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
              <PlanTable plans={plans} />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ATC;

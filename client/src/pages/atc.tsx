import PlanTable from "@components/PlanTable";
import Head from "next/head";
import { useEffect } from "react";
import { Plan } from "@prisma/client";
import { useRouter } from "next/dist/client/router";
import { useSession } from "next-auth/client";
import Layout from "@components/Layout";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectSocket } from "redux/slices/socketSlice";
import {
  addPlan,
  removePlan,
  setCurrentPlans,
  updatePlan,
} from "redux/slices/plansSlice";

export const ATC = (): JSX.Element => {
  const socket = useAppSelector(selectSocket);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (session) {
      socket.emit("getCurrentPlans", (plans: Plan[]) =>
        dispatch(setCurrentPlans(plans))
      );
      socket.on("newPlan", (plan: Plan) => dispatch(addPlan(plan)));
      socket.on("changedPlan", (id: Plan["id"], changes: Partial<Plan>) => {
        dispatch(updatePlan({ id, changes }));
      });
      socket.on("planDeleted", (id: Plan["id"]) => dispatch(removePlan(id)));
    }

    return () => {
      socket.off("currentPlans");
      socket.off("newPlan");
      socket.off("planDeleted");
      socket.off("changedPlan");
    };
  }, [dispatch, session, socket]);

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
              <PlanTable />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ATC;

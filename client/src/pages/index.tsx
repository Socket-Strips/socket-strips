import SocketContext from "contexts/SocketContext";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

export const Home = (): JSX.Element => {
  const { socket, isConnected } = useContext(SocketContext);
  const [currentRandom, setCurrentRandom] = useState("");
  const [currentPlans, setCurrentPlans] = useState<
    { _id: string; type: string; __v: string }[]
  >([]);

  useEffect(() => {
    socket.on("randomUpdate", setCurrentRandom);
    socket.on("currentPlans", setCurrentPlans);
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

      <div className="w-screen h-screen bg-blue-50 flex flex-col">
        <div className="m-4">
          <div className="max-w-lg bg-blue-200 p-4 rounded z-10">
            <p>Hello, you are {isConnected ? "connected" : "not connected"}</p>
            <p>Current random number is: {currentRandom}</p>
            <button onClick={() => socket.emit("ping")}>Emit</button>
            <button
              onClick={() =>
                socket.emit("filePlan", {
                  type: `B${Math.floor(Math.random() * 1000)}`,
                })
              }
            >
              File plan
            </button>
            <p>Current plans are: {JSON.stringify(currentPlans)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

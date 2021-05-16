import SocketContext from "contexts/SocketContext";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../index.css";

const socket = io("localhost:3001");

function MyApp({ Component, pageProps }: AppProps) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      <Component {...pageProps} />;
    </SocketContext.Provider>
  );
}

export default MyApp;

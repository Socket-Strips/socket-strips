import SetMyDetails from "@components/SetMyDetails";
import SocketContext from "contexts/SocketContext";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "../index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTimes,
  faSignOutAlt,
  faSignInAlt,
  faPaperPlane,
  faHandshake,
  faHandshakeSlash,
  faExclamationCircle,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

library.add(
  faTimes,
  faSignOutAlt,
  faSignInAlt,
  faPaperPlane,
  faHandshake,
  faHandshakeSlash,
  faExclamationCircle,
  faSave
);

function MyApp({ Component, pageProps }: AppProps) {
  const _socket = useRef(
    io(process.env.NEXT_PUBLIC_SOCKET_URL || "localhost:3001", {
      autoConnect: false,
    })
  );

  const [socket] = useState(_socket.current);

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      setIsConnected(true);
      toast.success("Socket connected!");
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
      toast.error("Socket disconnected!");
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Provider session={pageProps.session}>
      <SocketContext.Provider value={{ socket, isConnected }}>
        <Toaster position="top-right" />
        <SetMyDetails />
        <Component {...pageProps} />
      </SocketContext.Provider>
    </Provider>
  );
}

export default MyApp;

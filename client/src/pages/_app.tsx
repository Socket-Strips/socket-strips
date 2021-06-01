import SetMyDetails from "@components/SetMyDetails";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import "../index.css";

import { Toaster } from "react-hot-toast";

import { Provider as ReduxProvider } from "react-redux";

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
  faTableTennis,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { store } from "redux/store";
import SocketManager from "@components/SocketManager";
import SocketContext from "contexts/socketContext";
import { useRef, useState } from "react";
import { io } from "socket.io-client";

library.add(
  faTimes,
  faSignOutAlt,
  faSignInAlt,
  faPaperPlane,
  faHandshake,
  faHandshakeSlash,
  faExclamationCircle,
  faSave,
  faTableTennis,
  faEnvelope
);

function MyApp({ Component, pageProps }: AppProps) {
  const _socket = useRef(
    io(process.env.NEXT_PUBLIC_SOCKET_URL || "localhost:3001", {
      autoConnect: false,
    })
  );

  // Can't use redux for this because socket isn't serializable
  const [socket] = useState(_socket.current);

  return (
    <Provider session={pageProps.session}>
      <SocketContext.Provider value={socket}>
        <ReduxProvider store={store}>
          <SocketManager />
          <Toaster position="top-right" />
          <SetMyDetails />
          <Component {...pageProps} />
        </ReduxProvider>
      </SocketContext.Provider>
    </Provider>
  );
}

export default MyApp;

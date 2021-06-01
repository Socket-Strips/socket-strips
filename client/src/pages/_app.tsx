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
  return (
    <Provider session={pageProps.session}>
      <ReduxProvider store={store}>
        <SocketManager />
        <Toaster position="top-right" />
        <SetMyDetails />
        <Component {...pageProps} />
      </ReduxProvider>
    </Provider>
  );
}

export default MyApp;

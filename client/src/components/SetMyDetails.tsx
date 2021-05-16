import SocketContext from "contexts/SocketContext";
import { useSession } from "next-auth/client";
import { useEffect, useContext, useState } from "react";

// Have to use this because useSession be *b r o k e* in _app https://github.com/nextauthjs/next-auth/issues/345
export default function SetMyDetails() {
  const { socket, isConnected } = useContext(SocketContext);
  const [detailsSet, setDetailsSet] = useState(false); // Just in case page reloads for some reason e.g. in dev
  const [session] = useSession();

  useEffect(() => {
    if (!detailsSet && isConnected && session?.user) {
      socket.emit("setMyDetails", session.user);
      setDetailsSet(true);
    }
  }, [detailsSet, isConnected, session, socket]);

  return null;
}

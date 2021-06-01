import SocketContext from "contexts/socketContext";
import { useSession } from "next-auth/client";
import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  selectSocketIsConnected,
  selectUserDetails,
  setUserDetails,
} from "redux/slices/socketSlice";

// Have to use this because useSession be *b r o k e* in _app https://github.com/nextauthjs/next-auth/issues/345
export default function SetMyDetails() {
  const socket = useContext(SocketContext);
  const isConnected = useAppSelector(selectSocketIsConnected);
  const { isSet: detailsSet } = useAppSelector(selectUserDetails);

  const dispatch = useAppDispatch();

  const [session] = useSession();

  useEffect(() => {
    if (!detailsSet && isConnected && session?.user) {
      socket.emit("setMyDetails", session.user);
      dispatch(setUserDetails(session.user));
    }
  }, [detailsSet, dispatch, isConnected, session, socket]);

  return null;
}

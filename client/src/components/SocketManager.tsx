import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import {
  selectSocket,
  setConnected,
  setDisconnected,
} from "redux/slices/socketSlice";

export default function SocketManager() {
  const socket = useAppSelector(selectSocket);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      dispatch(setConnected());
      toast.success("Socket connected!");
    });
    socket.on("disconnect", () => {
      dispatch(setDisconnected());
      toast.error("Socket disconnected!");
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket]);

  return null;
}

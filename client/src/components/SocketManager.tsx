import SocketContext from "contexts/socketContext";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "redux/hooks";
import { setConnected, setDisconnected } from "redux/slices/socketSlice";

export default function SocketManager() {
  const socket = useContext(SocketContext);
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

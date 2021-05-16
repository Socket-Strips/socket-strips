import { createContext } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext<{ socket: Socket; isConnected: boolean }>({
  socket: (null as unknown) as Socket,
  isConnected: false,
});

export default SocketContext;

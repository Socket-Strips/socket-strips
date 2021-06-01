import { createContext } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext<Socket>(null as unknown as Socket);

export default SocketContext;

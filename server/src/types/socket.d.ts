import { Socket } from "socket.io";

interface CustomSocket extends Socket {
  user: {
    name: string;
  };
}

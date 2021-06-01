import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import { io, Socket } from "socket.io-client";
import { RootState } from "../store";

export interface SocketState {
  value: Socket;
  isConnected: boolean;
  userDetails: {
    isSet: boolean;
    value: Session["user"] | null;
  };
}

const initialState: SocketState = {
  value: io(process.env.NEXT_PUBLIC_SOCKET_URL || "localhost:3001", {
    autoConnect: false,
  }),
  isConnected: false,
  userDetails: {
    isSet: false,
    value: null,
  },
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state) => {
      state.isConnected = true;
    },
    setDisconnected: (state) => {
      state.isConnected = false;
      state.userDetails = { isSet: false, value: null };
    },
    setUserDetails: (state, action: PayloadAction<Session["user"]>) => {
      state.userDetails = { isSet: true, value: action.payload };
    },
  },
});

export const { setConnected, setDisconnected, setUserDetails } =
  socketSlice.actions;

export const selectSocket = (state: RootState) => state.socket.value;

export const selectSocketIsConnected = (state: RootState) =>
  state.socket.isConnected;

export const selectUserDetails = (state: RootState) => state.socket.userDetails;

export default socketSlice.reducer;

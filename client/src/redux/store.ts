import { configureStore } from "@reduxjs/toolkit";
import plansSlice from "./slices/plansSlice";
import socketSlice from "./slices/socketSlice";

export const store = configureStore({
  reducer: {
    plans: plansSlice,
    socket: socketSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

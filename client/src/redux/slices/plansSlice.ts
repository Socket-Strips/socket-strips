import { Plan } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface PlansState {
  value: Plan[];
}

const initialState: PlansState = {
  value: [],
};

export const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setCurrentPlans: (state, action: PayloadAction<Plan[]>) => {
      state.value = action.payload;
    },
    addPlan: (state, action: PayloadAction<Plan>) => {
      state.value = [...state.value, action.payload];
    },
    updatePlan: (
      state,
      action: PayloadAction<{ id: Plan["id"]; changes: Partial<Plan> }>
    ) => {
      const idx = state.value.findIndex(
        (plan) => plan.id === action.payload.id
      );
      state.value[idx] = { ...state.value[idx], ...action.payload.changes };
      state.value = [...state.value];
    },
    removePlan: (state, action: PayloadAction<Plan["id"]>) => {
      state.value = state.value.filter((val) => val.id !== action.payload);
    },
  },
});

export const { setCurrentPlans, addPlan, updatePlan, removePlan } =
  plansSlice.actions;

export const selectPlans = (state: RootState) => state.plans.value;

export default plansSlice.reducer;

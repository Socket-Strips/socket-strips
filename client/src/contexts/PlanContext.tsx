import { Plan } from "@prisma/client";
import { createContext, Dispatch, SetStateAction } from "react";

const PlanContext = createContext<{
  plans: Plan[];
  setPlans: Dispatch<SetStateAction<Plan[]>>;
}>({
  plans: [],
  setPlans: () => null,
});

export default PlanContext;

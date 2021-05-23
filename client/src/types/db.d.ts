import { Plan } from "@prisma/client";

export type PlanProto = Omit<Plan, "id" | "createdAt" | "updatedAt">;

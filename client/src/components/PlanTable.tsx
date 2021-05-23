import PlanTableElement from "./PlanTableElement";
import { Plan } from "@prisma/client";

interface Props {
  plans: Plan[];
}

export default function PlanTable({ plans }: Props) {
  return (
    <div className="bg-blue-200 rounded-md shadow-inner p-3">
      {plans.map((plan, idx) => (
        <PlanTableElement first={idx === 0} key={plan.id} plan={plan} />
      ))}
    </div>
  );
}

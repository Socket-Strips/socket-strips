import PlanTableElement from "./PlanTableElement";
import { Plan } from "types/db";

interface Props {
  plans: Plan[];
}

export default function PlanTable({ plans }: Props) {
  return (
    <div className="bg-blue-300 rounded-md shadow-inner p-3">
      {plans.map((plan, idx) => (
        <PlanTableElement first={idx === 0} key={plan._id} plan={plan} />
      ))}
    </div>
  );
}

import { useAppSelector } from "redux/hooks";
import { selectPlans } from "redux/slices/plansSlice";
import PlanTableElement from "./PlanTableElement";

export default function PlanTable() {
  const plans = useAppSelector(selectPlans);

  return (
    <div className="bg-gray-500 rounded-md shadow-inner p-3">
      {plans.map((plan, idx) => (
        <PlanTableElement first={idx === 0} key={plan.id} plan={plan} />
      ))}
    </div>
  );
}

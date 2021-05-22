import PlanTableSubElement from "./PlanTableSubElement";

import { Plan } from "types/db";

interface Props {
  first: boolean;
  plan: Plan;
}

export default function PlanTable({ plan, first }: Props) {
  return (
    <div
      className={`${
        first ? " " : "mt-8 "
      }grid grid-cols-5 gap-5 bg-blue-200 p-4 rounded-md shadow-md`}
    >
      <PlanTableSubElement title="Callsign" message={plan.callsign} />
      <PlanTableSubElement title="Aircraft" message={plan.aircraft} />
      <PlanTableSubElement title="Squawk" message={plan.squawk.toString()} />
      <PlanTableSubElement title="Temp. Altitude" message={plan.taltitude} />
      <PlanTableSubElement title="Rules" message={plan.rules} />
      <PlanTableSubElement
        title="Departure ICAO"
        message={plan.departure_icao}
      />
      <PlanTableSubElement title="Arrival ICAO" message={plan.arrival_icao} />
      <PlanTableSubElement title="Altitude" message={plan.altitude} />
      <PlanTableSubElement title="Route" message={plan.route} />
      <PlanTableSubElement title="Arrival RW" message={plan.arrival_rw} />
      <PlanTableSubElement title="Departure RW" message={plan.departure_rw} />
      <PlanTableSubElement
        title="Departure HDG"
        message={plan.departure_hdg.toString()}
      />
      <PlanTableSubElement title="Remarks" message={plan.remarks} />
      <PlanTableSubElement title="Scratchpad" message={plan.scratchpad} />
      <PlanTableSubElement title="Controller" message={plan.controller_id} />
      <PlanTableSubElement title="Controller ID" message={plan.controller_id} />
      <PlanTableSubElement title="Created At" message={plan.created_at} />
    </div>
  );
}

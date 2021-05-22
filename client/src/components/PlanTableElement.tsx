import { useContext } from "react";

import PlanTableSubElement from "./PlanTableSubElement";

import { Plan } from "types/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocketContext from "contexts/SocketContext";
import { Form, Formik } from "formik";
import planSchema from "@lib/schemas/planSchema";

interface Props {
  first: boolean;
  plan: Plan;
}

export default function PlanTable({ plan, first }: Props) {
  const { socket, isConnected } = useContext(SocketContext);

  return (
    <div
      className={`${
        first ? "" : "mt-8 "
      }bg-blue-100 p-4 rounded-md shadow-md relative`}
    >
      <Formik
        initialValues={plan}
        onSubmit={console.dir}
        validationSchema={planSchema}
      >
        <Form>
          <FontAwesomeIcon
            className="cursor-pointer absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            width={18}
            icon="times"
            onClick={() => isConnected && socket.emit("deletePlan", plan._id)}
          />
          <div className="mr-10 grid grid-cols-5 gap-5">
            <PlanTableSubElement
              label="Callsign"
              name="callsign"
              minLength={4}
              maxLength={6}
            />
            <PlanTableSubElement
              label="Aircraft"
              name="aircraft"
              minLength={2}
              maxLength={4}
            />
            <PlanTableSubElement
              label="Squawk"
              name="squawk"
              minLength={4}
              maxLength={4}
            />
            <PlanTableSubElement
              label="Temp. Altitude"
              name="taltitude"
              minLength={3}
              maxLength={6}
            />
            <PlanTableSubElement
              name="rules"
              label="Rules"
              minLength={3}
              maxLength={3}
            />
            <PlanTableSubElement
              label="Departure ICAO"
              name="departure_icao"
              minLength={4}
              maxLength={4}
            />
            <PlanTableSubElement
              label="Arrival ICAO"
              name="arrival_icao"
              minLength={4}
              maxLength={4}
            />
            <PlanTableSubElement
              label="Altitude"
              name="altitude"
              minLength={3}
              maxLength={6}
            />
            <PlanTableSubElement name="route" label="Route" maxLength={140} />
            <PlanTableSubElement
              label="Arrival RW"
              name="arrival_rw"
              minLength={1}
              maxLength={3}
            />
            <PlanTableSubElement
              label="Departure RW"
              name="departure_rw"
              minLength={1}
              maxLength={3}
            />
            <PlanTableSubElement
              label="Departure HDG"
              name="departure_hdg"
              minLength={3}
              maxLength={3}
            />
            <PlanTableSubElement
              label="Remarks"
              name="remarks"
              maxLength={140}
            />
            <PlanTableSubElement
              label="Scratchpad"
              name="scratchpad"
              maxLength={140}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center absolute right-4 bottom-4 self-end w-max text-left bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-3 rounded"
          >
            <FontAwesomeIcon width={18} icon="save" />
          </button>
        </Form>
      </Formik>
    </div>
  );
}

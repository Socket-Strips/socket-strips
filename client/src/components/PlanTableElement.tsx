import PlanTableSubElement from "./PlanTableSubElement";

import { Plan } from "@prisma/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import planSchema from "@lib/schemas/planSchema";
import deepDiffMapper from "functions/deepDiffMapper";
import toast from "react-hot-toast";
import { useAppSelector } from "redux/hooks";
import { selectSocketIsConnected } from "redux/slices/socketSlice";
import SocketContext from "contexts/socketContext";
import { useContext } from "react";

interface Props {
  first: boolean;
  plan: Plan;
}

export default function PlanTableElement({ plan, first }: Props) {
  const socket = useContext(SocketContext);
  const isConnected = useAppSelector(selectSocketIsConnected);

  return (
    <div
      className={`${
        first ? "" : "mt-8 "
      }bg-gray-600 p-4 rounded-md shadow-md relative`}
    >
      <Formik
        initialValues={plan}
        enableReinitialize
        onSubmit={(values, { setSubmitting, setStatus }) => {
          const changes = deepDiffMapper.map(values, plan) as Partial<Plan>;

          // TODO: Add toasts with messages
          if (Object.keys(changes).length !== 0) {
            if (isConnected) {
              socket.emit("updatePlan", plan.id, changes);
              toast.success("Plan saved successfully!");
            } else {
              setStatus("Socket could not connect");
              console.error("Socket could not connect");
              toast.error("Something went wrong!");
            }
          } else {
            setStatus("No change was made");
            toast.error("You need to make a change!");
          }

          setSubmitting(false);
        }}
        validationSchema={planSchema}
      >
        <Form>
          <FontAwesomeIcon
            className="cursor-pointer absolute right-4 top-4 text-gray-500 hover:text-gray-300"
            width={18}
            icon="times"
            onClick={() => isConnected && socket.emit("deletePlan", plan.id)}
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
              name="tAltitude"
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
              name="departureICAO"
              minLength={4}
              maxLength={4}
            />
            <PlanTableSubElement
              label="Arrival ICAO"
              name="arrivalICAO"
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
              name="arrivalRw"
              minLength={1}
              maxLength={3}
            />
            <PlanTableSubElement
              label="Departure RW"
              name="departureRw"
              minLength={1}
              maxLength={3}
            />
            <PlanTableSubElement
              label="Departure HDG"
              name="departureHdg"
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

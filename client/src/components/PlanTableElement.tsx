import { useContext } from "react";

import * as Yup from "yup";

import PlanTableSubElement from "./PlanTableSubElement";

import { Plan } from "types/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocketContext from "contexts/SocketContext";
import { Form, Formik } from "formik";

interface Props {
  first: boolean;
  plan: Plan;
}

const minMsg = ({ min }: { min: number }) =>
  `Must be at least ${min} characters`;

const maxMsg = ({ max }: { max: number }) =>
  `Cannot be longer than ${max} characters`;

export const valSchema = Yup.object({
  callsign: Yup.string()
    .min(4, minMsg)
    .max(6, maxMsg)
    .required("Callsign is required")
    .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
  aircraft: Yup.string()
    .min(2, minMsg)
    .max(4, maxMsg)
    .required("Aircraft is required")
    .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
  squawk: Yup.number()
    .required("Squawk is required")
    .test(
      "len",
      "Must be exactly 4 characters",
      (val) => typeof val === "number" && val.toString().length === 4
    ),
  taltitude: Yup.string()
    .min(3, minMsg)
    .max(6, maxMsg)
    .matches(/^[a-zA-Z0-9]+$/, "Can only contain letters and numbers"),
  rules: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Can only contain letters")
    .required("Rules are required")
    .test(
      "len",
      "Must be exactly 3 characters",
      (val) => typeof val === "string" && val.length === 3
    ),
  departure_icao: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Can only contain letters")
    .required("Departure is required")
    .test(
      "len",
      "Must be exactly 4 characters",
      (val) => typeof val === "string" && val.length === 4
    ),
  arrival_icao: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Can only contain letters")
    .required("Arrival is required")
    .test(
      "len",
      "Must be exactly 4 characters",
      (val) => typeof val === "string" && val.length === 4
    ),
  altitude: Yup.string()
    .min(3, minMsg)
    .max(6, maxMsg)
    .required("Altitude is required")
    .matches(/^[a-zA-Z0-9]+$/, "Can only contain letters and numbers"),
  route: Yup.string()
    .max(140, maxMsg)
    .required("Route is required")
    .matches(/^[a-zA-Z0-9 ]+$/, "Cannot contain special characters"),
  arrival_rw: Yup.string()
    .min(1, minMsg)
    .max(3, maxMsg)
    .matches(/^[a-zA-Z0-9]+$/, "Can only contain letters and numbers"),
  departure_rw: Yup.string()
    .min(1, minMsg)
    .max(3, maxMsg)
    .matches(/^[a-zA-Z0-9]+$/, "Can only contain letters and numbers"),
  departure_hdg: Yup.number().test(
    "len",
    "Must be exactly 3 characters",
    (val) => typeof val === "number" && val.toString().length === 3
  ),
  remarks: Yup.string()
    .max(140, maxMsg)
    .matches(/^[a-zA-Z0-9 ]+$/, "Cannot contain special characters"),
  scratchpad: Yup.string()
    .max(140, maxMsg)
    .matches(/^[a-zA-Z0-9 ]+$/, "Cannot contain special characters"),
});

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
        validationSchema={valSchema}
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
        </Form>
      </Formik>
    </div>
  );
}

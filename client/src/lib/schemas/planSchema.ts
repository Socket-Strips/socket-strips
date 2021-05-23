import * as Yup from "yup";

const minMsg = ({ min }: { min: number }) =>
  `Must be at least ${min} characters`;

const maxMsg = ({ max }: { max: number }) =>
  `Cannot be longer than ${max} characters`;

const a1 = /^[a-zA-Z0-9]+$/;
const a = /^[a-zA-Z]+$/;
const a_1 = /^[a-zA-Z0-9 ]+$/;

const planSchema = Yup.object({
  _id: Yup.string()
    .required("ID is required")
    .matches(a1, "Can only contain letters and numbers")
    .test(
      "len",
      "Must be exactly 24 characters",
      (val) => typeof val === "string" && val.length === 24
    ),
  callsign: Yup.string()
    .min(4, minMsg)
    .max(6, maxMsg)
    .required("Callsign is required")
    .matches(a1, "Cannot contain special characters or spaces"),
  aircraft: Yup.string()
    .min(2, minMsg)
    .max(4, maxMsg)
    .required("Aircraft is required")
    .matches(a1, "Cannot contain special characters or spaces"),
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
    .matches(a1, "Can only contain letters and numbers"),
  rules: Yup.string()
    .matches(a, "Can only contain letters")
    .required("Rules are required")
    .test(
      "len",
      "Must be exactly 3 characters",
      (val) => typeof val === "string" && val.length === 3
    ),
  departure_icao: Yup.string()
    .matches(a, "Can only contain letters")
    .required("Departure is required")
    .test(
      "len",
      "Must be exactly 4 characters",
      (val) => typeof val === "string" && val.length === 4
    ),
  arrival_icao: Yup.string()
    .matches(a, "Can only contain letters")
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
    .matches(a1, "Can only contain letters and numbers"),
  route: Yup.string()
    .max(140, maxMsg)
    .required("Route is required")
    .matches(a_1, "Cannot contain special characters"),
  arrival_rw: Yup.string()
    .min(1, minMsg)
    .max(3, maxMsg)
    .matches(a1, "Can only contain letters and numbers"),
  departure_rw: Yup.string()
    .min(1, minMsg)
    .max(3, maxMsg)
    .matches(a1, "Can only contain letters and numbers"),
  departure_hdg: Yup.number()
    .max(360)
    .test(
      "len",
      "Must be exactly 3 characters",
      (val) => typeof val === "number" && val.toString().length === 3
    ),
  remarks: Yup.string()
    .max(140, maxMsg)
    .matches(a_1, "Cannot contain special characters"),
  scratchpad: Yup.string()
    .max(140, maxMsg)
    .matches(a_1, "Cannot contain special characters"),
  controller_id: Yup.string()
    .matches(a1, "Cannot contain special characters or spaces")
    .test(
      "len",
      "Must be exactly 24 characters",
      (val) => typeof val === "string" && val.length === 24
    ),
  created_at: Yup.date().required("Created At is required"),
  __v: Yup.number().required("Versioning is required"),
});

export default planSchema;

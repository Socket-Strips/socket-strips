import * as Yup from "yup";

const minMsg = ({ min }: { min: number }) =>
  `Must be at least ${min} characters`;

const maxMsg = ({ max }: { max: number }) =>
  `Cannot be longer than ${max} characters`;

const a1 = /^[a-zA-Z0-9]+$/;
const a = /^[a-zA-Z]+$/;
const a_1 = /^[a-zA-Z0-9 ]+$/;

const planSchema = Yup.object({
  id: Yup.string()
    .required("ID is required")
    .matches(a1, "Can only contain letters and numbers"),
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
  squawk: Yup.number().required("Squawk is required"),
  tAltitude: Yup.string()
    .max(6, maxMsg)
    .nullable()
    .matches(a1, "Can only contain letters and numbers"),
  rules: Yup.string()
    .matches(a, "Can only contain letters")
    .required("Rules are required")
    .test(
      "len",
      "Must be exactly 3 characters",
      (val) => typeof val === "string" && val.length === 3
    ),
  departureICAO: Yup.string()
    .matches(a, "Can only contain letters")
    .required("Departure is required")
    .test(
      "len",
      "Must be exactly 4 characters",
      (val) => typeof val === "string" && val.length === 4
    ),
  arrivalICAO: Yup.string()
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
  arrivalRw: Yup.string()
    .nullable()
    .max(3, maxMsg)
    .matches(a1, "Can only contain letters and numbers"),
  departureRw: Yup.string()
    .nullable()
    .max(3, maxMsg)
    .matches(a1, "Can only contain letters and numbers"),
  departureHdg: Yup.number()
    .nullable()
    .max(360)
    .test(
      "len",
      "Must be longer than 0 characters",
      (val) => typeof val === "number" && val.toString().length > 0
    ),
  remarks: Yup.string()
    .max(140, maxMsg)
    .nullable()
    .matches(a_1, "Cannot contain special characters"),
  scratchpad: Yup.string()
    .max(140, maxMsg)
    .nullable()
    .matches(a_1, "Cannot contain special characters"),
  ownerId: Yup.number().nullable(),
  controllerId: Yup.number().nullable(),
  createdAt: Yup.date().required("Created At is required"),
  updatedAt: Yup.date().required("Updated At is required"),
});

export default planSchema;

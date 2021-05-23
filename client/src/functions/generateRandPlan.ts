import { PlanProto } from "types/db";

export default function generateRandPlan(): PlanProto {
  return {
    callsign: `UAL${Math.floor(Math.random() * 1000)}`,
    aircraft: `B${Math.floor(Math.random() * 1000)}`,
    squawk: `${Math.floor(Math.random() * 10000)}`,
    tAltitude: `${5000 + Math.floor(Math.random() * 1000)}`,
    rules: "VFR",
    departureICAO: "KJFK",
    arrivalICAO: "KSAN",
    altitude: `${Math.floor(Math.random() * 100000)}`,
    route: "DCT GPS",
    arrivalRw: `${2 + Math.floor(Math.random() * 10)}R`,
    departureRw: `${2 + Math.floor(Math.random() * 10)}`,
    departureHdg: `${100 + Math.floor(Math.random() * 100)}`,
    remarks: "New to FSX",
    scratchpad: "Lol",
    ownerId: null,
    controllerId: null,
  };
}

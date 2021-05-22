import { PlanProto } from "types/db";

export default function generateRandPlan(): PlanProto {
  return {
    callsign: `UAL${Math.floor(Math.random() * 1000)}`,
    aircraft: `B${Math.floor(Math.random() * 1000)}`,
    squawk: Math.floor(Math.random() * 10000),
    taltitude: `${Math.floor(Math.random() * 10000)}`,
    rules: "VFR",
    departure_icao: "KJFK",
    arrival_icao: "KSAN",
    altitude: `${Math.floor(Math.random() * 100000)}`,
    route: "DCT GPS",
    arrival_rw: `${Math.floor(Math.random() * 100)}R`,
    departure_rw: `${Math.floor(Math.random() * 100)}`,
    departure_hdg: Math.floor(Math.random() * 1000),
    remarks: "New to FSX",
    scratchpad: "Lol",
    controller_id: `${Math.floor(Math.random() * 10000000000)}`,
    created_at: Date.now().toString(),
  };
}

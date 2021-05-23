import { PlanProto } from "types/db";

export default function generateRandPlan(): PlanProto {
  return {
    callsign: `UAL${Math.floor(Math.random() * 1000)}`,
    aircraft: `B${Math.floor(Math.random() * 1000)}`,
    squawk: Math.floor(Math.random() * 10000),
    taltitude: `${5000 + Math.floor(Math.random() * 1000)}`,
    rules: "VFR",
    departure_icao: "KJFK",
    arrival_icao: "KSAN",
    altitude: `${Math.floor(Math.random() * 100000)}`,
    route: "DCT GPS",
    arrival_rw: `${2 + Math.floor(Math.random() * 10)}R`,
    departure_rw: `${2 + Math.floor(Math.random() * 10)}`,
    departure_hdg: 100 + Math.floor(Math.random() * 100),
    remarks: "New to FSX",
    scratchpad: "Lol",
    controller_id: `${Math.random().toString(24).substr(2, 12)}${Math.random()
      .toString(24)
      .substr(2, 12)}`,
    created_at: Date.now().toString(),
  };
}

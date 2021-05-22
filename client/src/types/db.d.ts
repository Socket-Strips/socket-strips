export interface Plan {
  _id: string;
  callsign: string;
  aircraft: string;
  squawk: number;
  taltitude: string;
  rules: string;
  departure_icao: string;
  arrival_icao: string;
  altitude: string;
  route: string;
  arrival_rw: string;
  departure_rw: string;
  departure_hdg: number;
  remarks: string;
  scratchpad: string;
  controller_id: string;
  created_at: string;
  __v: string;
}

export type PlanProto = Omit<Plan, "_id" | "__v">;

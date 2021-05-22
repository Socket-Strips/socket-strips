export interface Plan {
  _id: string;
  callsign: string;
  aircraft: string;
  squawk: number;
  taltitude: string | undefined;
  rules: string;
  departure_icao: string;
  arrival_icao: string;
  altitude: string;
  route: string;
  arrival_rw: string | undefined;
  departure_rw: string | undefined;
  departure_hdg: number | undefined;
  remarks: string | undefined;
  scratchpad: string | undefined;
  controller_id: string | undefined;
  created_at: string;
  __v: string;
}

export type PlanProto = Omit<Plan, "_id" | "__v">;

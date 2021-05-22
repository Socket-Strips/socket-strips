import { Schema, model, Document, Model, models } from "mongoose";

export interface IPlan extends Document {
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
}

const plan = new Schema({
  callsign: {
    type: String,
    required: true,
  },
  aircraft: {
    type: String,
    required: true,
  },
  squawk: {
    type: Number,
    required: true,
  },
  taltitude: {
    type: String,
  },
  rules: {
    type: String,
    required: true,
  },
  departure_icao: {
    type: String,
    required: true,
  },
  arrival_icao: {
    type: String,
    required: true,
  },
  altitude: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  arrival_rw: {
    type: String,
  },
  departure_rw: {
    type: String,
  },
  departure_hdg: {
    type: Number,
  },
  remarks: {
    type: String,
  },
  scratchpad: {
    type: String,
  },
  controller_id: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const Plan: Model<IPlan> = models["Plan"] || model("Plan", plan);

export default Plan;

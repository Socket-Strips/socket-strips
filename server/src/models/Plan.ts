import { Schema, model, Document, Model, models } from "mongoose";

export interface IPlan extends Document {
  type: string;
}

const plan = new Schema({
  type: {
    type: String,
    required: true,
  },
});

const Plan: Model<IPlan> = models["Plan"] || model("Plan", plan);

export default Plan;

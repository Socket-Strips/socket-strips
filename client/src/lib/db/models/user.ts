import { Schema, model, Document, Model, models } from "mongoose";

export interface IUser extends Document {
  name: string;
}

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  since: {
    type: Date,
    default: Date.now,
  },
});

const User: Model<IUser> = models.User || model("User", user);

export default User;

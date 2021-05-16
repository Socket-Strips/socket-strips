// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@lib/middleware/mongodb";
import User, { IUser } from "@lib/db/models/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  const user: IUser = await User.create({ name: "Jackson" });

  res.status(200).json({ user });
};

export default handler;

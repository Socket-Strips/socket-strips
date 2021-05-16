// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@lib/middleware/mongodb";
import User from "@lib/db/models/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  const users = await User.find();

  res.status(200).json(users);
};

export default handler;

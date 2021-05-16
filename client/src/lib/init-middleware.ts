// Helper method to wait for a middleware to execute before continuing

import { NextApiRequest, NextApiResponse } from "next";

export type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (result: unknown) => void
) => void;

// And to throw an error when an error happens in a middleware
export default function initMiddleware(middleware: Middleware) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

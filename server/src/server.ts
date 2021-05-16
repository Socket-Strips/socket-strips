import { yellow } from "chalk";
import { Server } from "socket.io";
import logger from "./winston";
import { config } from "dotenv";
import connectDB from "./db";
import Plan from "./models/Plan";

if (process.env["NODE_ENV"] !== "production") {
  config();
}

(async () => {
  await connectDB();
})();

const io = new Server(3001, { cors: { origin: process.env["CORS_ORIGIN"] } });

io.on("connect", async (socket) => {
  logger.info(`${yellow(socket.id)} connected`);

  socket.on("getCurrentPlans", async (cb) => {
    const plans = await Plan.find();
    cb(plans);
  });

  socket.on("setUsername", (name, cb) => {
    // @ts-ignore
    socket.username = name;
    cb(name);
  });

  socket.on("getUsername", (cb) => {
    //@ts-ignore
    cb(socket.username);
  });

  socket.on("ping", () => {
    logger.info(`ping from ${yellow(socket.id)}`);
  });

  socket.on("filePlan", async ({ type }: { type: string }) => {
    const doc = await Plan.create({ type });
    logger.info(`${yellow(socket.id)} filed plan ${yellow(doc._id)}`);
    io.emit("newPlan", doc);
  });

  socket.on("disconnect", () => {
    logger.info(`${yellow(socket.id)} disconnected`);
  });
});

setInterval(() => {
  io.emit("randomUpdate", Math.floor(Math.random() * 100));
}, 1000);

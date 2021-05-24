import { yellow } from "chalk";
import { Server } from "socket.io";
import logger from "./winston";
import { config } from "dotenv";
import { CustomSocket } from "./types/socket";

import { Plan, Prisma, PrismaClient } from "@prisma/client";

let prisma: PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

if (process.env["NODE_ENV"] === "production") {
  prisma = new PrismaClient();
} else {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  if (!global.prisma) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    global.prisma = new PrismaClient();
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  prisma = global.prisma;
}

if (process.env["NODE_ENV"] !== "production") {
  config();
}

let PORT;

if (Number(process.env["$PORT"] || process.env["SERVER_PORT"]) > 0) {
  PORT = Number(process.env["$PORT"] || process.env["SERVER_PORT"]);
} else {
  PORT = 3001;
}

const io = new Server(PORT, {
  cors: { origin: process.env["CORS_ORIGIN"] },
});

io.on("connect", async (socket) => {
  logger.info(`${yellow(socket.id)} connected`);

  socket.on("getCurrentPlans", async (cb) => {
    const plans = await prisma.plan.findMany();
    cb(plans);
  });

  socket.on("setMyDetails", (user) => {
    logger.info(
      `${yellow(socket.id)} identified as ${yellow(user?.name)} (${yellow(
        user?.email
      )})`
    );

    (socket as CustomSocket).user = user;
  });

  socket.on("ping", () => {
    logger.info(
      `ping from ${yellow(socket.id)} (${yellow(
        (socket as CustomSocket).user?.name || "Not Identified"
      )})`
    );
  });

  socket.on("filePlan", async (plan: Plan) => {
    const doc = await prisma.plan.create({ data: plan });
    logger.info(
      `${yellow((socket as CustomSocket).user?.name)} (${yellow(
        socket.id
      )}) filed plan ${yellow(doc.id)}`
    );
    io.emit("newPlan", doc);
  });

  socket.on("updatePlan", async (id: Plan["id"], changes: Partial<Plan>) => {
    const doc = await prisma.plan.update({ where: { id }, data: changes });

    logger.info(
      `${yellow((socket as CustomSocket).user?.name)} (${yellow(
        socket.id
      )}) updated plan ${yellow(doc.id)}`
    );

    io.emit("changedPlan", doc.id, changes);
  });

  socket.on("deletePlan", async (id: Plan["id"]) => {
    const doc = await prisma.plan.delete({ where: { id } });

    logger.info(
      `${yellow((socket as CustomSocket).user?.name)} (${yellow(
        socket.id
      )}) deleted plan ${yellow(doc.id)}`
    );

    io.emit("planDeleted", id);
  });

  socket.on("disconnect", () => {
    logger.info(`${yellow(socket.id)} disconnected`);
  });
});

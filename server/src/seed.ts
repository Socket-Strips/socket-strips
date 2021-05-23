import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.plan.create({
    data: {
      callsign: `UAL${Math.floor(Math.random() * 1000)}`,
      aircraft: `B${Math.floor(Math.random() * 1000)}`,
      squawk: Math.floor(Math.random() * 10000),
      tAltitude: `${5000 + Math.floor(Math.random() * 1000)}`,
      rules: "VFR",
      departureICAO: "KJFK",
      arrivalICAO: "KSAN",
      altitude: `${Math.floor(Math.random() * 100000)}`,
      route: "DCT GPS",
      arrivalRw: `${2 + Math.floor(Math.random() * 10)}R`,
      departureRw: `${2 + Math.floor(Math.random() * 10)}`,
      departureHdg: 100 + Math.floor(Math.random() * 100),
      remarks: "New to FSX",
      scratchpad: "Lol",
    },
  });

  const allPlans = await prisma.plan.findMany();

  console.dir(allPlans, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

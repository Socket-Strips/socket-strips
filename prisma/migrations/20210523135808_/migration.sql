-- CreateTable
CREATE TABLE "plans" (
    "id" SERIAL NOT NULL,
    "callsign" TEXT NOT NULL,
    "aircraft" TEXT NOT NULL,
    "squawk" INTEGER NOT NULL,
    "t_altitude" TEXT,
    "rules" TEXT NOT NULL,
    "departure_icao" TEXT NOT NULL,
    "arrival_icao" TEXT NOT NULL,
    "altitude" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "arrival_rw" TEXT,
    "departure_rw" TEXT,
    "departure_hdg" INTEGER,
    "remarks" TEXT,
    "scratchpad" TEXT,
    "owner_id" INTEGER,
    "controller_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "plans" ADD FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plans" ADD FOREIGN KEY ("controller_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

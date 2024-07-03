-- CreateTable
CREATE TABLE "routes" (
    "routeid" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "passengerArrivalTime" TEXT NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("routeid")
);

-- CreateIndex
CREATE UNIQUE INDEX "routes_from_to_departureTime_arrivalTime_passengerArrivalTi_key" ON "routes"("from", "to", "departureTime", "arrivalTime", "passengerArrivalTime");

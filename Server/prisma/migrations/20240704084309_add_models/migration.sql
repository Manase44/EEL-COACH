/*
  Warnings:

  - You are about to drop the `routes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "routes";

-- CreateTable
CREATE TABLE "Employee_number" (
    "employeeNumber" TEXT NOT NULL,

    CONSTRAINT "Employee_number_pkey" PRIMARY KEY ("employeeNumber")
);

-- CreateTable
CREATE TABLE "Employee" (
    "employeeId" TEXT NOT NULL,
    "employeeFirstName" TEXT NOT NULL,
    "employeeSecondName" TEXT NOT NULL,
    "employeePhotoUrl" TEXT NOT NULL,
    "employeePhoneNumber" TEXT NOT NULL,
    "employeeEmailAddress" TEXT NOT NULL,
    "employeeGender" TEXT NOT NULL,
    "employeePassword" TEXT NOT NULL,
    "employeeRole" TEXT NOT NULL DEFAULT 'employee',
    "employeeNumber" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employeeId")
);

-- CreateTable
CREATE TABLE "Bus" (
    "busId" TEXT NOT NULL,
    "busNumber" TEXT NOT NULL,
    "seatsNumber" INTEGER NOT NULL,

    CONSTRAINT "Bus_pkey" PRIMARY KEY ("busId")
);

-- CreateTable
CREATE TABLE "Route" (
    "routeid" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "passengerArrivalTime" TEXT NOT NULL,
    "busId" TEXT NOT NULL,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("routeid")
);

-- CreateTable
CREATE TABLE "Office" (
    "officeId" TEXT NOT NULL,
    "officeLocation" TEXT NOT NULL,
    "officeBuilding" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("officeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_number_employeeNumber_key" ON "Employee_number"("employeeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeePhoneNumber_key" ON "Employee"("employeePhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeEmailAddress_key" ON "Employee"("employeeEmailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeNumber_key" ON "Employee"("employeeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Bus_busNumber_key" ON "Bus"("busNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Route_busId_key" ON "Route"("busId");

-- CreateIndex
CREATE UNIQUE INDEX "Route_from_to_departureTime_arrivalTime_passengerArrivalTim_key" ON "Route"("from", "to", "departureTime", "arrivalTime", "passengerArrivalTime");

-- CreateIndex
CREATE UNIQUE INDEX "Office_employeeId_key" ON "Office"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "Office_officeLocation_officeBuilding_key" ON "Office"("officeLocation", "officeBuilding");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employeeNumber_fkey" FOREIGN KEY ("employeeNumber") REFERENCES "Employee_number"("employeeNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_busId_fkey" FOREIGN KEY ("busId") REFERENCES "Bus"("busId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Office" ADD CONSTRAINT "Office_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("employeeId") ON DELETE RESTRICT ON UPDATE CASCADE;

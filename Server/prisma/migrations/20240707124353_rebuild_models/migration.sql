/*
  Warnings:

  - You are about to drop the column `seatsNumber` on the `Bus` table. All the data in the column will be lost.
  - Added the required column `ac` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adjustableSeat` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `luggageCompartment` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfRows` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfSeatInRow` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberOfSeats` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rearSeat` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sockets` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wifi` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "seatsNumber",
ADD COLUMN     "ac" BOOLEAN NOT NULL,
ADD COLUMN     "adjustableSeat" BOOLEAN NOT NULL,
ADD COLUMN     "luggageCompartment" BOOLEAN NOT NULL,
ADD COLUMN     "numberOfRows" INTEGER NOT NULL,
ADD COLUMN     "numberOfSeatInRow" INTEGER NOT NULL,
ADD COLUMN     "numberOfSeats" INTEGER NOT NULL,
ADD COLUMN     "rearSeat" INTEGER NOT NULL,
ADD COLUMN     "sockets" BOOLEAN NOT NULL,
ADD COLUMN     "wifi" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "price" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Book" (
    "bookId" TEXT NOT NULL,
    "passengerName" TEXT NOT NULL,
    "passengerPhone" TEXT NOT NULL,
    "passengerID" TEXT NOT NULL,
    "travellingDate" TEXT NOT NULL,
    "selectedSeat" TEXT[],
    "numberOfSeats" INTEGER NOT NULL,
    "routeId" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("bookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_routeId_key" ON "Book"("routeId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("routeid") ON DELETE RESTRICT ON UPDATE CASCADE;

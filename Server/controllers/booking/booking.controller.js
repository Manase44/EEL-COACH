import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const booking = async (req, res) => {
  const {
    name,
    phoneNumber,
    idNumber,
    routeId,
    travellingDate,
    noOfSeats,
    selectedSeats,
  } = req.body;

  if (
    !name ||
    !phoneNumber ||
    !idNumber ||
    !routeId ||
    !travellingDate ||
    !noOfSeats ||
    !selectedSeats
  ) {
    res
      .status(400)
      .json({ ok: false, message: "some fields are missing", fname: name });
  } else {
    try {
      const registerBooking = await prisma.book.create({
        data: {
          passengerName: name,
          passengerPhone: phoneNumber,
          passengerID: idNumber,
          routeId,
          travellingDate,
          numberOfSeats: noOfSeats,
          selectedSeat: selectedSeats,
        },
      });
      if (registerBooking) {
        res.status(201).json({ ok: true, message: "booking was successfully" });
      }
    } catch (error) {
      res.status(500).json({ ok: false, message: "something went wrong" });
    }
  }
};

export default booking;

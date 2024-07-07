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
    res.status(401).json({ ok: false, message: "invalid booking" });
  }
  try {
    const registerBooking = await prisma.booking.create({
      data: {
        name,
        phoneNumber,
        idNumber,
        routeId,
        travellingDate,
        noOfSeats,
        selectedSeats,
      },
    });
    if (registerBooking) {
      res.status(201).json({ ok: true, message: "booking was successfully" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default booking;

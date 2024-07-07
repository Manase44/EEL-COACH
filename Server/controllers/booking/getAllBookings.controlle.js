import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllBookings = async (req, res) => {
  try {
    const gettingAllBookings = await prisma.book.findMany();
    if (!gettingAllBookings) {
      res.status(404).json({ ok: false, message: "No bookings available" });
    } else {
      res.status(200).json({ ok: true, bookings: gettingAllBookings });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getAllBookings;

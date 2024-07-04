import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllBuses = async (req, res) => {
  try {
    const gettingAllBuses = await prisma.bus.findMany();
    if (gettingAllBuses.length > 0) {
      res.status(200).json({ ok: true, data: gettingAllBuses });
    } else {
      res.status(400).json({ ok: false, message: "no avilable buses" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getAllBuses;

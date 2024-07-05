import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllBusRoutes = async (req, res) => {
  try {
    const gettingAllBusRoutes = await prisma.route.findMany();
    if (gettingAllBusRoutes.length < 1) {
      res.status(200).json({ ok: false, message: "No bus routes available" });
    } else {
      res.status(200).json({ ok: true, busRoutes: gettingAllBusRoutes });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "Something went wrong" });
  }
};

export default getAllBusRoutes;

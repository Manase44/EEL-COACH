import { PrismaClient } from "@prisma/client";
import e from "express";
const prisma = new PrismaClient();

const deleteBusRoute = async (req, res) => {
  const busRouteId = req.params.id;

  try {
    const confirmingExistense = await prisma.routes.findUnique({
      where: {
        routeid: busRouteId,
      },
    });
    if (confirmingExistense) {
      const deletingBusRoute = await prisma.routes.delete({
        where: {
          routeid: busRouteId,
        },
      });
      if (deletingBusRoute) {
        res.json({
          ok: true,
          message: "The specified bus route was deleted successfully",
        });
      }
    } else {
      res.status(400).json({
        ok: false,
        message: "the bus route you want to delete does not exist",
      });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default deleteBusRoute;

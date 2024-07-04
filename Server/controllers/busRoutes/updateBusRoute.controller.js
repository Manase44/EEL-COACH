import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateBusRoute = async (req, res) => {
  const busRouteId = req.params.id;
  const { from, to, departureTime, arrivalTime, passengerArrivalTime } =
    req.body;
  try {
    const confirmingExistense = await prisma.route.findUnique({
      where: {
        routeid: busRouteId,
      },
    });
    if (confirmingExistense) {
      const updatingBusRoute = await prisma.route.update({
        where: {
          routeid: busRouteId,
        },
        data: {
          from,
          to,
          departureTime,
          arrivalTime,
          passengerArrivalTime,
        },
      });
      if (updatingBusRoute) {
        res.status(200).json({
          ok: true,
          message: "The bus route has been updated successfully",
        });
      }
    } else {
      res.status(400).json({
        ok: false,
        message: "The bus route you want to update does not exist",
      });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export default updateBusRoute;

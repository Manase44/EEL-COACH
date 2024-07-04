import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createNewBusRoute = async (req, res) => {
  const { from, to, departureTime, arrivalTime, passengerArrivalTime, busId } =
    req.body;
  try {
    const confirmingExistense = await prisma.route.findFirst({
      where: {
        from,
        to,
        departureTime,
        arrivalTime,
        passengerArrivalTime,
      },
    });
    if (confirmingExistense) {
      res
        .status(400)
        .json({
          ok: false,
          message: "The bus route you are creating already exists",
        });
    } else {
      const creatingBusRoute = await prisma.route.create({
        data: {
          from,
          to,
          departureTime,
          arrivalTime,
          passengerArrivalTime,
          busId,
        },
      });
      if (creatingBusRoute) {
        res.status(400).json({
          ok: true,
          message: "The bus route was created successfully",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export default createNewBusRoute;

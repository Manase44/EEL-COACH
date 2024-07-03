import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createNewBusRoute = async (req, res) => {
  const { from, to, departureTime, arrivalTime, passengerArrivalTime } =
    req.body;
  try {
    const confirmingExistense = await prisma.routes.findFirst({
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
        .json({ ok: false, message: "The described bus route already exists" });
    } else {
      const creatingBusRoute = await prisma.routes.create({
        data: {
          from,
          to,
          departureTime,
          arrivalTime,
          passengerArrivalTime,
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
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default createNewBusRoute;

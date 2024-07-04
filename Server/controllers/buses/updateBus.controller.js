import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateBus = async (req, res) => {
  const busId = req.params.id;
  const { busNumber, seatsNumber } = req.body;
  try {
    const confirmBusExistence = await prisma.bus.findUnique({
      where: {
        busId,
      },
    });
    if (confirmBusExistence) {
      const updatingBusDetails = await prisma.bus.update({
        where: {
          busId,
        },
        data: {
          busNumber,
          seatsNumber,
        },
      });
      if (updatingBusDetails) {
        res
          .status(200)
          .json({
            ok: true,
            message: "The bus details were updated successfully",
          });
      }
    } else {
      res
        .status(404)
        .json({
          ok: false,
          message: "The bus you are trying to update does exists",
        });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: " something went wrong" });
  }
};

export default updateBus;

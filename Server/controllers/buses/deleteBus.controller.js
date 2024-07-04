import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteBus = async (req, res) => {
  const busId = req.params.id;

  try {
    const confirmBusExistence = await prisma.bus.findUnique({
      where: {
        busId,
      },
    });
    if (!confirmBusExistence) {
      res.status(404).json({
        ok: false,
        message: "The bus you are trying to delete does not exist",
      });
    } else {
      const confirmingDependentRoutesExistence = await prisma.route.findMany({
        where: {
          busId,
        },
      });
      if (confirmingDependentRoutesExistence) {
        res.status(404).json({
          ok: false,
          message: "You can not delete this bus, It has dependent routes",
        });
      } else {
        const deletingBus = await prisma.bus.delete({
          where: {
            busId,
          },
        });
        if (deletingBus) {
          res.status(200).json({
            ok: true,
            message: "The specified bus has been deleted successfully",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default deleteBus;

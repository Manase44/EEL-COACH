import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createBus = async (req, res) => {
  const { busNumber, seatsNumber } = req.body;

  if (!busNumber || !seatsNumber) {
    res.status(401).json({
      ok: false,
      message: "make sure you fill all the fields",
    });
  }
  try {
    const confirmBusExistence = await prisma.bus.findFirst({
      where: {
        busNumber,
        seatsNumber,
      },
    });
    if (confirmBusExistence) {
      res.status(400).json({
        ok: false,
        message: "The bus you are creating already exists",
      });
    } else {
      const creatingNewBus = await prisma.bus.create({
        data: {
          busNumber,
          seatsNumber,
        },
      });
      if (creatingNewBus) {
        res
          .status(201)
          .json({ ok: true, message: "The bus was created successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default createBus;

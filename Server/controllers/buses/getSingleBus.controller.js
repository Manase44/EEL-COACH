import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSingleBus = async (req, res) => {
  const busId = req.params.id;
  try {
    const gettingSingleBus = await prisma.bus.findUnique({
      where: {
        busId,
      },
    });
    if (gettingSingleBus) {
      res.status(200).json({ ok: true, data: gettingSingleBus });
    } else {
      res
        .status(404)
        .json({ ok: false, message: "The specifie bus does not exists" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getSingleBus;

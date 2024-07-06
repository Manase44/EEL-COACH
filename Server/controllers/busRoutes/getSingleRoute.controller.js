import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSingleBusRoute = async (req, res) => {
  const busRouteId = req.params.id;

  if (!busRouteId) {
    res.status(401).json({ ok: false, message: "invalid request" });
  }

  try {
    const gettingSingleBusRoute = await prisma.route.findUnique({
      where: {
        routeid: busRouteId,
      },
    });
    if (!gettingSingleBusRoute) {
      res
        .status(404)
        .json({ ok: false, message: "The specified bus route does not exist" });
    } else {
      res.status(200).json({ ok: true, busRoute: gettingSingleBusRoute });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getSingleBusRoute;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSpecifiedRoutes = async (req, res) => {
  const from = req.params.from;
  const to = req.params.to;

  if (!from || !to) {
    res
      .status(401)
      .json({ ok: false, message: "make sure to provide the from and to" });
  }

  try {
    const gettingSpecifiedRoutes = await prisma.route.findMany({
      where: {
        from,
        to,
      },
    });
    if (gettingSpecifiedRoutes.length > 0) {
      res.status(200).json({ ok: true, specificRoute: gettingSpecifiedRoutes });
    } else {
      res
        .status(404)
        .json({ ok: false, message: "We couldn't find a route for you" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getSpecifiedRoutes;

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSingleNumber = async (req, res) => {
  const numberId = req.params.id;
  try {
    const gettingSingleNumber = await prisma.employee_number.findUnique({
      where: {
        employeeNumber: numberId,
      },
    });
    if (gettingSingleNumber) {
      res.status(200).json({ ok: true, data: gettingSingleNumber });
    } else {
      res.status(404).json({ ok: false, message: "The Number does not exist" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getSingleNumber;

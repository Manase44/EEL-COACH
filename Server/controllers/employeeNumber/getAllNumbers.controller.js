import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllNumbers = async (req, res) => {
  try {
    const gettingAllEmployeeNumbers = await prisma.employee_number.findMany();
    if (gettingAllEmployeeNumbers.length > 0) {
      res.status(200).json({ ok: true, empCodes: gettingAllEmployeeNumbers });
    } else {
      res
        .status(404)
        .json({ ok: false, message: "No employee numbers available" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getAllNumbers;

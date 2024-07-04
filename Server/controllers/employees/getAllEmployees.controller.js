import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllEmployees = async (req, res) => {
  try {
    const gettingAllEmployees = await prisma.employee.findMany();
    if (gettingAllEmployees.length > 0) {
      res.status(200).json({ ok: true, data: gettingAllEmployees });
    } else {
      res.status(404).json({ ok: false, message: "No employees available" });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default getAllEmployees;

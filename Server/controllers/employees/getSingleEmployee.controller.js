import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSingleEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const gettingSingleEmployee = await prisma.employee.findUnique({
      where: {
        employeeId,
      },
    });
    if (!gettingSingleEmployee) {
      res
        .status(404)
        .json({ ok: false, message: "The employee does not exist" });
    } else {
      res.status(200).json({ ok: true, employee: gettingSingleEmployee });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: " something went wrong" });
  }
};

export default getSingleEmployee;

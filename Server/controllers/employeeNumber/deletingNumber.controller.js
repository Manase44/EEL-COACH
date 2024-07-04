import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteEmployeeNumber = async (req, res) => {
  const employeeNumber = req.params.id;

  try {
    const confirmingExistence = await prisma.employee_number.findUnique({
      where: {
        employeeNumber,
      },
    });
    if (!confirmingExistence) {
      res
        .status(404)
        .json({ ok: false, message: "The employee does not exist" });
    } else {
      const deletingEmployeeNumber = await prisma.employee_number.delete({
        employeeNumber,
      });
      if (deletingEmployeeNumber) {
        res
          .status(200)
          .json({ ok: true, message: "The number was deleted successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export default deleteEmployeeNumber;

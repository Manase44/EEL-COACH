import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const confirmingEmployeeExistence = await prisma.employee.findUnique({
      where: {
        employeeId,
      },
    });
    if (!confirmingEmployeeExistence) {
      res.status(404).json({
        ok: false,
        message: "The employee you want to delete does not exist",
      });
    } else {
      const deletingEmployee = await prisma.employee.delete({
        where: {
          employeeId,
        },
      });
      if (deletingEmployee) {
        res
          .status(200)
          .json({ ok: true, message: "The employee was deleted successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default deleteEmployee;

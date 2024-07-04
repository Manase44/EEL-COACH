import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const creatEmployeeNumber = async (req, res) => {
  const { employeeNumber } = req.body;

  try {
    const confirmNumberExistence = await prisma.employee_number.findUnique({
      where: {
        employeeNumber,
      },
    });
    if (confirmNumberExistence) {
      res
        .status(400)
        .json({
          ok: false,
          message: "The employe number specified already exists",
        });
    } else {
      const creatingNewEmployeeNumber = await prisma.employee_number.create({
        data: {
          employeeNumber,
        },
      });
      if (creatingNewEmployeeNumber) {
        res
          .status(201)
          .json({
            ok: true,
            message: "The employee number was created successfully",
          });
      }
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default creatEmployeeNumber;

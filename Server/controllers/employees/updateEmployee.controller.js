import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  const {
    firstName,
    secondName,
    photoUrl,
    phoneNumber,
    email,
    gender,
    role,
    password,
  } = req.body;
  try {
    const confirmingEmployeeExistence = await prisma.employee.findUnique({
      where: {
        employeeId,
      },
    });
    if (!confirmingEmployeeExistence) {
      res
        .status(404)
        .json({
          ok: false,
          message: "The employee you are updating does not exist",
        });
    } else {
      const updatingEmployeeDetails = await prisma.employee.update({
        where: {
          employeeId,
        },
        data: {
          employeeFirstName: firstName,
          employeeSecondName: secondName,
          employeePhotoUrl: photoUrl,
          employeeEmailAddress: email,
          employeePhoneNumber: phoneNumber,
          employeeGender: gender,
          employeePassword: password,
          employeeRole: role,
        },
      });
      res
        .status(200)
        .json({
          ok: true,
          message: "The employee details were upated successfully",
        });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export default updateEmployee;

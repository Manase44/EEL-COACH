import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createEmployee = async (req, res) => {
  const {
    firstName,
    secondName,
    photoUrl,
    phoneNumber,
    email,
    gender,
    password,
    employeeNumber,
  } = req.body;

  try {
    const confirmingEmailExistence = await prisma.employee.findFirst({
      where: {
        employeeEmailAddress: email,
      },
    });
    const confirmingPhoneExistence = await prisma.employee.findFirst({
      where: {
        employeeEmailAddress: email,
      },
    });
    if (confirmingEmailExistence || confirmingPhoneExistence) {
      res.status(400).json({ ok: false, message: "The user exists" });
    } else {
      const confirmingEmployeeNumberExistence =
        await prisma.employee_number.findUnique({
          where: {
            employeeNumber,
          },
        });
      if (confirmingEmployeeNumberExistence) {
        const confirmingIfNumberAlreadySigned =
          await prisma.employee.findUnique({
            where: {
              employeeNumber,
            },
          });
        if (confirmingIfNumberAlreadySigned) {
          res.status(400).json({ ok: false, message: "Invalid Number" });
        } else {
          const creatingNewEmployee = await prisma.employee.create({
            data: {
              employeeFirstName: firstName,
              employeeSecondName: secondName,
              employeePhotoUrl: photoUrl,
              employeePhoneNumber: phoneNumber,
              employeeEmailAddress: email,
              employeeGender: gender,
              employeePassword: password,
              employeeNumber,
            },
          });
          if (creatingNewEmployee) {
            res.status(201).json({
              ok: true,
              message: "The employee was created successfully",
              no: confirmingEmployeeNumberExistence,
            });
          }
        }
      } else {
        res.status(400).json({
          ok: false,
          message: "The employee number is not recognized",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export default createEmployee;

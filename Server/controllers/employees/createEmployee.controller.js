import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.js";
const prisma = new PrismaClient();

const createEmployee = async (req, res) => {
  const {
    firstName,
    secondName,
    employeeNumber,
    photoUrl,
    phoneNumber,
    email,
    gender,
    password,
    confirmPassword,
  } = req.body;

  if (
    !firstName ||
    !secondName ||
    !photoUrl ||
    !phoneNumber ||
    !email ||
    !gender ||
    !password ||
    !employeeNumber
  ) {
    return res
      .status(400)
      .json({ ok: false, message: "please provide all details" });
  }

  try {
    const confirmingEmailExistence = await prisma.employee.findFirst({
      where: {
        employeeEmailAddress: email,
      },
    });
    const confirmingPhoneExistence = await prisma.employee.findFirst({
      where: {
        employeePhoneNumber: phoneNumber,
      },
    });
    if (confirmingEmailExistence || confirmingPhoneExistence) {
      return res.status(400).json({ ok: false, message: "The user exists" });
    }

    const confirmingEmployeeNumberExistence =
      await prisma.employee_number.findUnique({
        where: {
          employeeNumber,
        },
      });
    const confirmingIfNumberAlreadySigned = await prisma.employee.findUnique({
      where: {
        employeeNumber,
      },
    });
    if (!confirmingEmployeeNumberExistence || confirmingIfNumberAlreadySigned) {
      return res.status(400).json({ ok: false, message: "Invalid Number" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const creatingNewEmployee = await prisma.employee.create({
      data: {
        employeeFirstName: firstName,
        employeeSecondName: secondName,
        employeePhotoUrl: photoUrl,
        employeePhoneNumber: phoneNumber,
        employeeEmailAddress: email,
        employeeGender: gender,
        employeePassword: hashedPassword,
        employeeNumber,
      },
    });
    if (creatingNewEmployee) {
      const payload = {
        employeeId: creatingNewEmployee.employeeId,
        employeeEmailAddress: creatingNewEmployee.employeeEmailAddress,
        employeeFirstName: creatingNewEmployee.employeeFirstName,
        employeeSecondName: creatingNewEmployee.employeeSecondName,
        employeePhotoUrl: creatingNewEmployee.employeePhotoUrl,
        employeeGender: creatingNewEmployee.employeeGender,
        employeeNumber: creatingNewEmployee.employeeNumber,
        employeePhoneNumber: creatingNewEmployee.employeePhoneNumber,
      };

      const access_token = generateToken(payload);

      return res
        .cookie("access_token", access_token, {
          httpOnly: true,
        })
        .status(201)
        .json({
          ok: true,
          message: "The employee was created successfully",
        });
    }
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
};

export default createEmployee;

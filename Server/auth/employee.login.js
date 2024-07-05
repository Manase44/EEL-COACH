import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import generateToken from "../utils/jwt.js";
const prisma = new PrismaClient();

const employeeLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const error = [];
    const confirmingEmployee = await prisma.employee.findUnique({
      where: {
        employeeEmailAddress: email,
      },
    });
    if (confirmingEmployee) {
      const comparePassword = bcrypt.compareSync(
        password,
        confirmingEmployee.employeePassword,
      );
      if (!comparePassword) {
        error.push("Invalid logins");
      } else {
        const payload = {
          employeeEmailAddress: confirmingEmployee.employeeEmailAddress,
        };
        const token = generateToken(payload);

        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({ ok: true, message: "Logged in successfully" });
      }
    } else {
      error.push("Invalid logins");
      res.status(400).res.json({ ok: false, message: error });
    }
  } catch (error) {
    token;
    res.status(500).json({ ok: false, message: "something went wrong" });
  }
};

export default employeeLogin;

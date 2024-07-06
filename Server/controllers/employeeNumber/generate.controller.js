import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const generatorEngine = () => {
  const characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
  ];

  const generator = () => {
    const char = characters[Math.floor(Math.random() * characters.length)];
    return char;
  };

  const empcode = `${generator()}${generator()}${generator()}${generator()}${generator()}`;
  return empcode;
};

const generateEmpCode = async (req, res) => {
  let employeeNumber = generatorEngine();
  try {
    const confirmCodeExistence = await prisma.employee_number.findUnique({
      where: {
        employeeNumber,
      },
    });
    while (confirmCodeExistence) {
      employeeNumber = generatorEngine();
    }
    res.status(200).json({ ok: true, code: `EC${employeeNumber}E` });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export default generateEmpCode;

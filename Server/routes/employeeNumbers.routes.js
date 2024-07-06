import { Router } from "express";
import creatEmployeeNumber from "../controllers/employeeNumber/createEmployeeNumber.controller.js";
import getAllNumbers from "../controllers/employeeNumber/getAllNumbers.controller.js";
import deleteEmployeeNumber from "../controllers/employeeNumber/deletingNumber.controller.js";
import getSingleNumber from "../controllers/employeeNumber/getSingleNumber.controller.js";
import generateEmpCode from "../controllers/employeeNumber/generate.controller.js";
const route = Router();

route
  .get("/", getAllNumbers)
  .get("/generator", generateEmpCode)
  .get("/:id", getSingleNumber)
  .post("/", creatEmployeeNumber)
  .delete("/:id", deleteEmployeeNumber);

export default route;

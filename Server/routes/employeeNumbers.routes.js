import { Router } from "express";
import creatEmployeeNumber from "../controllers/employeeNumber/createEmployeeNumber.controller.js";
import getAllNumbers from "../controllers/employeeNumber/getAllNumbers.controller.js";
import deleteEmployeeNumber from "../controllers/employeeNumber/deletingNumber.controller.js";
import getSingleNumber from "../controllers/employeeNumber/getSingleNumber.controller.js";
const route = Router();

route
  .get("/", getAllNumbers)
  .get("/:id", getSingleNumber)
  .post("/", creatEmployeeNumber)
  .delete("/:id", deleteEmployeeNumber);

export default route;

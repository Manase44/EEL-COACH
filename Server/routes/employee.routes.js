import { Router } from "express";
import getAllEmployees from "../controllers/employees/getAllEmployees.controller.js";
import getSingleEmployee from "../controllers/employees/getSingleEmployee.controller.js";
import createEmployee from "../controllers/employees/createEmployee.controller.js";
import deleteEmployee from "../controllers/employees/deleteEmployee.controller.js";
import updateEmployee from "../controllers/employees/updateEmployee.controller.js";
import employeeLogin from "../auth/employee.login.js";
const route = Router();

route
  .get("/", getAllEmployees)
  .get("/:id", getSingleEmployee)
  .post("/", createEmployee)
  .post("/login", employeeLogin)
  .patch("/:id", updateEmployee)
  .delete("/:id", deleteEmployee);

export default route;

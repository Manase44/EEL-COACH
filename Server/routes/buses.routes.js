import { Router } from "express";
import createBus from "../controllers/buses/createBus.controller.js";
import getAllBuses from "../controllers/buses/getAllBuses.controller.js";
import getSingleBus from "../controllers/buses/getSingleBus.controller.js";
import updateBus from "../controllers/buses/updateBus.controller.js";
import deleteBus from "../controllers/buses/deleteBus.controller.js";
const route = Router();

route
  .get("/", getAllBuses)
  .get("/:id", getSingleBus)
  .post("/", createBus)
  .patch("/:id", updateBus)
  .delete("/:id", deleteBus);

export default route;

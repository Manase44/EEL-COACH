import { Router } from "express";
import createBus from "../controllers/buses/createBus.controller.js";
import getAllBuses from "../controllers/buses/getAllBuses.controller.js";
const route = Router();

route.get("/", getAllBuses).post("/", createBus);

export default route;

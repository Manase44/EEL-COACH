import { Router } from "express";
import getAllBusRoutes from "../controllers/busRoutes/getAllRoutes.controller.js";
import createNewBusRoute from "../controllers/busRoutes/creatingBusRoute.controller.js";
import getSingleBusRoute from "../controllers/busRoutes/getSingleRoute.controller.js";
import deleteBusRoute from "../controllers/busRoutes/deleteBusRoute.controller.js";
import updateBusRoute from "../controllers/busRoutes/updateBusRoute.controller.js";
import getSpecifiedRoutes from "../controllers/busRoutes/getSpecifiedRoutes.controller.js";
const route = Router();

route
  .get("/", getAllBusRoutes)
  .get("/:id", getSingleBusRoute)
  .get("/:from/:to", getSpecifiedRoutes)
  .post("/", createNewBusRoute)
  .patch("/:id", updateBusRoute)
  .delete("/:id", deleteBusRoute);

export default route;

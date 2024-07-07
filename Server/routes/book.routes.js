import { Router } from "express";
import getAllBookings from "../controllers/booking/getAllBookings.controlle.js";
import booking from "../controllers/booking/booking.controller.js";
const route = Router();

route.get("/", getAllBookings).post("/", booking);

export default route;

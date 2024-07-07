import { Router } from "express";
import getAllBookings from "../controllers/booking/getAllBookings.controlle";
import booking from "../controllers/booking/booking.controller";
const route = Router();

route.get("/", getAllBookings).post("/", booking);

export default route;

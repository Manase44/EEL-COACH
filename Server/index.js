import e from "express";
import { config } from "dotenv";
import busRoutes from "./routes/busRoutes.routes.js";
import bus from "./routes/buses.routes.js";
const app = e();

config();

const port = process.env.PORT;

app.use(e.json());

app.use("/admin/routes", busRoutes);
app.use("/admin/buses", bus);

app.listen(port, () => {
  console.log(`The server is running successfully at port ${port}`);
});

import e from "express";
import { config } from "dotenv";
import cors from "cors";
import busRoutes from "./routes/busRoutes.routes.js";
import bus from "./routes/buses.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import employeeNumberRouter from "./routes/employeeNumbers.routes.js";
const app = e();
const port = process.env.PORT;

config();

app.use(e.urlencoded({ extended: true }));
app.use(e.json());

app.use(cors());

app.use("/admin/empcode", employeeNumberRouter);
app.use("/admin/employees", employeeRouter);
app.use("/admin/routes", busRoutes);
app.use("/admin/buses", bus);

app.listen(port, () => {
  console.log(`The server is running successfully at port ${port}`);
});

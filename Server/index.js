import e from "express";
import { config } from "dotenv";
const app = e();

config();

const port = process.env.PORT;

app.use(e.json());

app.get("/", (req, res) => {
  res.send("Hello There, We are Ready");
});

app.listen(port, () => {
  console.log(`The server is running successfully at port ${port}`);
});

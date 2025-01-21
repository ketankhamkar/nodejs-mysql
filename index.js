import express from "express";
const port = 4001;
const app = express();
import userRoute from "./src/routes/userRoute.js";
import documentRoute from "./src/routes/documentRoute.js";
import tripRoute from "./src/routes/tripRoute.js";
import emailRoute from "./src/routes/emailRoute.js";
import { serve, setup } from "swagger-ui-express";
import swaggerOutput from "./swagger-output.json" with { type: "json" };

app.use(express.json());
app.get("/", (_req, res) => {
  res.send("welcome to foodie app");
});
app.use('/docs', serve, setup(swaggerOutput));
app.use("/users", userRoute);
app.use('/documents',documentRoute);
app.use('/trips',tripRoute);
app.use('/send',emailRoute);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

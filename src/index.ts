import express, { Application } from "express";
import { errorHandler } from "./middleware";
import * as dotenv from "dotenv";

import clientRoutes from "./routes/client";

dotenv.config();

export const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use("/api", clientRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
	console.log("Server is running on port: ", PORT);
});

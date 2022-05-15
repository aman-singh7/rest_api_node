import express from "express";
import mongoose from "mongoose";
import { APP_PORT, DB_URL } from "./config";
import errorHandler from "./middlewares/errorHandler";
import routes from "./routes";

const app = express();

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));

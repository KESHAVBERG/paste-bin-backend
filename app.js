import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import pasteRoutes from "./routes/pasteRouter.js";
import { errorHandler } from "./middleware/erroHandler.js";
import { notFound } from "./middleware/notFound.js";
import { connectToDb } from "./config/db.js";

const app = express();

connectToDb();

app.use(cors());
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.status(200).json({
    ok: mongoose.connection.readyState === 1
  });
});
app.use("/api/pastes", pasteRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;

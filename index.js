import express from "express";
import mongoose from "mongoose";
import pasteRoutes from "./routes/pasteRouter.js";
import { errorHandler } from "./middleware/erroHandler.js";
import { notFound } from "./middleware/notFound.js";
import {connectToDb} from './config/db.js'
import cors from "cors";

import dotenv from "dotenv";



dotenv.config()

const app = express();
const Port = process.env.PORT
connectToDb()
app.use(cors())
app.use(express.json());

app.get("/api/healthz", (req, res) => {
  res.status(200).json({
    ok: mongoose.connection.readyState === 1
  });
});

app.use("/api/pastes", pasteRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(Port, ()=>{
    console.log("Server Started at", Port)
})

export default app;

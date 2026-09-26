import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/auth.routes.js";
import songRouter from "./routes/song.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", userRouter);
app.use("/api/songs", songRouter);


export default app;
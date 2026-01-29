import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API running on http://localhost:${port}`));

import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { conectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import authRouter from "./routes/auth.route.js";
import leadRouter from "./routes/lead.route.js";
import contactRouter from "./routes/contact.route.js";
import noteRouter from "./routes/note.route.js";
import taskRouter from "./routes/task.route.js";

import aiRouter from "./routes/ai.route.js";
import analyticRouter from "./routes/analytic.route.js";

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URI,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

/*Routes*/

app.get("/api/health", (req, res) =>
  res.json({ success: true, status: "ok", service: "TTP CRM API" }),
);
app.use("/api/auth", authRouter);
app.use("/api/leads", leadRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/notes", noteRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/ai", aiRouter);
app.use("/api/analytic", analyticRouter);

/*Error handling (last)*/

app.use(notFound);
app.use(errorHandler);

/*Boot*/

const PORT = process.env.PORT || 8000;
const start = async () => {
  try {
    await conectDB();
    app.listen(PORT, () =>
      console.log(`TTP CRM API running on http://localhost: ${PORT}`),
    );
  } catch (err) {
    console.error("X Failed to start server:", err.message);

    process.exit(1);
  }
};

start();

export default app;

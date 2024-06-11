import express, { Request, Response } from "express";
import middlewares from "./middlewares";
import routes from "./routes";

const app = express();

// middlewares
app.use(middlewares);

// routes
app.use(routes);

// check health
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "server is running smoothly",
  });
});

// welcome message
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message:
      "Welcome to your Meeting Room Booking System for Co-working spaces server",
  });
});

export default app;

import express, { Request, Response } from "express";
import httpStatus from "http-status";
import "express-async-errors";
import middlewares from "./middlewares";
import routes from "./routes";
import globalErrorHandler from "./errors";
import "../interfaces";

const app = express();

// middlewares
app.use(middlewares);

// routes
app.use("/api", routes);

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

app.all("*", (req: Request, res: Response) => {
  //? My preference
  // next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));

  //* Assignment requirement
  res.status(httpStatus.NOT_FOUND).json({
    success: true,
    statusCode: 404,
    message: "Not Found",
  });
});

app.use(globalErrorHandler);

export default app;

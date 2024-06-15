import { Server } from "http";
import app from "./app/app";
import connectDB from "./config/db";

 
let server: Server;

const port = 5000;

async function main() {
  await connectDB();
  server = app.listen(port, () => {
    console.info(`Check health at: http://localhost:${port}/health`);
    console.log(`Server is listening on port ${port}`);
  });
}
main();

process.on("unhandledRejection", () => {
  console.log("unhandledRejection found, shutting down..");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on("uncaughtException", () => {
  console.log(`uncaughtException found , shutting down ...`);
  process.exit(1);
});

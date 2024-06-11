import { Server } from "http";
import app from "./app/app";
import connectDB from "./config/db";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

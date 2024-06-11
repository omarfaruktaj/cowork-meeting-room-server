import { Server } from "http";
import app from "./app/app";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server;

const port = 5000;

async function main() {
  server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}
main();

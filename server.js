const app = require("./src/app");
require("dotenv").config();

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server start with port ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server stopped");
  });
});

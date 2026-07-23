import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app";

const PORT = Number(process.env.PORT) || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error(error);
});
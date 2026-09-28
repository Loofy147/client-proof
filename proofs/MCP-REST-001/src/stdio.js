import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { buildServer } from "./server.js";

serveStdio(() =>
  buildServer({
    apiBaseUrl: process.env.API_BASE_URL,
    apiKey: process.env.API_KEY,
  }),
);

console.error("[mcp-rest-bridge-proof] serving over stdio");

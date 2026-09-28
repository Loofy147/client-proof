import { createMcpHandler } from "@modelcontextprotocol/server";
import { buildServer } from "./server.js";

export const handler = createMcpHandler(() =>
  buildServer({
    apiBaseUrl: process.env.API_BASE_URL,
    apiKey: process.env.API_KEY,
  }),
);

export default handler;

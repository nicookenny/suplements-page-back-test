/*import { Server } from "./models/server";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const prisma = new PrismaClient();
const server = new Server();
server.listen();*/

import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { Server } from "./models/server"; // Asegúrate de que este archivo exponga una clase correcta

dotenv.config();

export const prisma = new PrismaClient();

const app = express();
const server = new Server(); // Asegúrate de que Server pueda ser instanciado y usado adecuadamente

server.listen();

// Exporta la app para que Vercel la pueda usar
export default app;

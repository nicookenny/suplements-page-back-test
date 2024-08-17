/*import { Server } from "../models/server";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
dotenv.config();
const server = new Server();
server.listen();*/
import { Request, Response } from "express";
import { Server } from "../models/server";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const server = new Server();

export default async (req: Request, res: Response) => {
  // Define how to handle requests, for example:
  if (req.method === "GET") {
    res.status(200).json({ message: "Hello from API!" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

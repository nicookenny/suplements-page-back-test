import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../app";

const JWTvalidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["x-token"] as string;
  if (!token) {
    res.status(401).json({ msg: "No hay token en la peticion" });
    return;
  }
  try {
    const secretKey = process.env.SECRETKEY as string;
    const payload = jwt.verify(token, secretKey) as JwtPayload;
    const { id } = payload;
    const verifiedUser = await prisma.user.findUnique({ where: { id: id } });
    if (!verifiedUser) {
      res.status(401).json({ msg: "Token inválido" });
      return;
    }
    req.body.verifiedUser = verifiedUser;
    req.body.id = id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token inválido" });
  }
};

export default JWTvalidation;

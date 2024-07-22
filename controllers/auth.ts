import { Request, Response } from "express";
import { IUser } from "../models/usuario";
import bcryptjs from "bcryptjs";
import randomString from "randomstring";
import { sendEmail } from "../mailer/mailer";
import newJWT from "../helpers/JWT";
import { prisma } from "../app";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password }: IUser = req.body;
  const user: IUser = { name, email, password };
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  const newCode = randomString.generate(8);
  user.code = newCode;
  await prisma.user.create({ data: user });
  await sendEmail(email, newCode);
  res.status(201).json({ user });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: IUser = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      res.status(400).json({ msg: "No existe ese mail en la DB" });
      return;
    }

    const passwordValidation = bcryptjs.compareSync(password, user.password); //1° parámetro lo ingresado 2° lo que quiero testear que esta hecho el hash
    if (!passwordValidation) {
      res.status(400).json({ msg: "Contraseña incorrecta" });
      return;
    }

    const token = await newJWT(user.id);
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en servidor" });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, code } = req.body;
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      res.status(400).json({ msg: "No existe ese mail en la DB" });
      return;
    }
    if (user.verified) {
      res.status(400).json({ msg: "Usuario ya verificado" });
      return;
    }
    if (user.code !== code) {
      res.status(400).json({ msg: "Código incorrecto" });
      return;
    }

    const updateVerified = await prisma.user.update({
      where: { email },
      data: { verified: true },
    });

    res.status(200).json({ msg: "Usuario verificado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en servidor" });
  }
};

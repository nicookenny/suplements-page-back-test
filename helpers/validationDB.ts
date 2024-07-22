import { sendEmail } from "../mailer/mailer";
import { prisma } from "../app";

export const existingEmail = async (email: string): Promise<void> => {
  const emailExists = await prisma.user.findFirst({ where: { email } });

  if (emailExists && emailExists.verified) {
    throw new Error(`El correo ya está registrado`);
  }

  if (emailExists && !emailExists.verified) {
    await sendEmail(email, emailExists.code as string);
    throw new Error("Usuario registrado. Se envió nuevamente el código");
  }
};

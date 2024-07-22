import jwt from "jsonwebtoken";

const newJWT = (id: number): Promise<string> => {
  return new Promise((res, rej) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRETKEY as string,
      { expiresIn: "8h" },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          console.error(err);
          rej("Error al generar el token");
        } else {
          res(token as string);
        }
      }
    );
  });
};

export default newJWT;

import { Router } from "express";
import { check } from "express-validator";
import { register } from "../controllers/auth";
import { login } from "../controllers/auth";
import { verifyUser } from "../controllers/auth";
import { mailExist } from "helpers/validacionesdb"; //este crep que no lo necesito.
import { catchErrors } from "../middlewares/catchErrors";
const router = Router();

router.post(
  "/register",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Email inválido").isEmail(),
    check("password", "Debe contener al menos 5 caracteres").isLength({
      min: 6,
    }),
    catchErrors, // ver si lo necesito.
  ],
  register
);

router.post(
  "/login",
  [
    check("email", "Email inválido").isEmail(),
    check("password", "Debe contener al menos 5 caracteres").isLength({
      min: 6,
    }),
    catchErrors,
  ],
  login
);

router.patch(
  "/verify",
  [
    check("email", "Email inválido").isEmail(),
    check("code", "La verificación es obligatoria").not().isEmpty(),
    catchErrors,
  ],
  verifyUser
);

export default router;

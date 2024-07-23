import { Router } from "express";
import { check } from "express-validator";
import { existingEmail } from "../helpers/validationDB";
import { register } from "../controllers/auth";
import { login } from "../controllers/auth";
import { verifyUser } from "../controllers/auth";
import { catchErrors } from "../middlewares/catchErrors";

const router = Router();

router.post(
  "/register",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Email inválido").isEmail(),
    check("password", "Debe contener al menos 5 caracteres").isLength({
      min: 6,
    }),
    check("email").custom(existingEmail),
    catchErrors,
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
    check("email", "Email es obligatorio").not().isEmpty(),
    check("code", "La verificación del usuario es obligatoria").not().isEmpty(),
    catchErrors,
  ],
  verifyUser
);

export default router;

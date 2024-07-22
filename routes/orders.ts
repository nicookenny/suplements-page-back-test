import { Router } from "express";
import newJWT from "../helpers/JWT";
//import validarJWT from "../middlewares/validarJWT";
import { catchErrors } from "../middlewares/catchErrors";

import { createOrder, getOrders } from "../controllers/orders";
import { check } from "express-validator";
import { isVerified } from "../middlewares/validarVerificado";

const router = Router();

router.get("/", [validarJWT, catchErrors], getOrders);

router.post(
  "/",
  [
    validarJWT,
    isVerified,
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envío es obligatorio").not().isEmpty(),
    check("total", "El total es obligatorio").not().isEmpty(),
    check("shippingDetails", "Los detalles de envío son obligatorios")
      .not()
      .isEmpty(),
    check("items", "El array de productos es obligatorio").not().isEmpty(),
    catchErrors,
  ],
  createOrder
);

export default router;

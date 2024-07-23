import { Router } from "express";
import JWTvalidation from "../middlewares/JWTvalidation";
import { catchErrors } from "../middlewares/catchErrors";
import { createOrder, getOrders } from "../controllers/orders";
import { check } from "express-validator";
import { isVerified } from "../middlewares/verifyUser";

const router = Router();

router.get("/", [JWTvalidation, catchErrors], getOrders);

router.post(
  "/",
  [
    JWTvalidation,
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

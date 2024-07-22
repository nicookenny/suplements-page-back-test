import { Request, Response } from "express";
import { prisma } from "../app";

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  const userId: number = req.body.verifiedUser.id;
  const orders = await prisma.order.findMany({
    where: { user: userId },
    include: { shippingDetails: true },
  });

  res.json({ data: [...orders] });
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user: number = req.body.verifiedUser.id;
  const orderData = req.body;
  const { price, shippingCost, total, items, shippingDetails } = orderData;

  const order = await prisma.order.create({
    data: {
      price,
      shippingCost,
      total,
      items: {
        create: [...items],
      },
      user,
      shippingDetails: {
        create: {
          ...shippingDetails,
        },
      },
    },
    include: {
      shippingDetails: true,
      items: true,
    },
  });

  res.status(201).json({ data: order });
};

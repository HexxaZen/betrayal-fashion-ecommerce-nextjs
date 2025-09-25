// src/app/api/checkout/route.ts
import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import { v4 as uuidv4 } from "uuid";

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
const serverKey = process.env.MIDTRANS_SERVER_KEY_BETRAYAL;
const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

// Pastikan kunci terdefinisi
if (!serverKey || !clientKey) {
  throw new Error('Midtrans server key and client key must be defined in environment variables.');
}

const snap = new midtransClient.Snap({
  isProduction,
  serverKey,
  clientKey,
});

export async function POST(req: Request) {
  try {
    const { orderDetails } = await req.json();

    const grossAmount = parseFloat(orderDetails.total);
    if (isNaN(grossAmount) || grossAmount <= 0) {
      return NextResponse.json({ message: "Invalid total amount" }, { status: 400 });
    }

    const orderId = `BETRAYAL-${uuidv4()}`;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      item_details: (orderDetails.items || []).map((item: any) => ({
        id: String(item.id),
        price: parseFloat(item.price),
        quantity: parseInt(item.quantity),
        name: item.name,
      })),
      customer_details: {
        first_name: orderDetails.shippingDetails?.name,
        email: orderDetails.shippingDetails?.email,
        phone: orderDetails.shippingDetails?.phone,
      },
    };

    const token = await snap.createTransaction(parameter);
    return NextResponse.json({ token });
  } catch (error: any) {
    console.error('Error creating Midtrans transaction:', error.ApiResponse || error);
    return NextResponse.json(
      { message: "Error creating Midtrans transaction" },
      { status: error.httpStatusCode || 500 }
    );
  }
}
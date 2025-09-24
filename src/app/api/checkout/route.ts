// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';
import { v4 as uuidv4 } from 'uuid';

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
const serverKey = process.env.MIDTRANS_SERVER_KEY;
const clientKey = process.env.MIDTRANS_CLIENT_KEY;

// 🔎 Debug log untuk pastikan env terbaca
console.log("🔑 Midtrans Server Key:", serverKey ? serverKey.slice(0, 10) + "..." : "❌ UNDEFINED");
console.log("🔑 Midtrans Client Key:", clientKey ? clientKey.slice(0, 10) + "..." : "❌ UNDEFINED");
console.log("🌍 Midtrans Mode:", isProduction ? "Production" : "Sandbox");

// ❌ Jangan lanjut kalau key tidak ada
if (!serverKey) {
  throw new Error('MIDTRANS_SERVER_KEY is not defined in environment variables.');
}

const snap = new midtransClient.Snap({
  isProduction,
  serverKey,
  clientKey: "-", // placeholder (tidak dipakai di backend)
});

export async function POST(req: Request) {
  try {
    const { orderDetails } = await req.json();

    const grossAmount = orderDetails.total;
    const orderId = `BETRAYAL-${uuidv4()}`;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      credit_card: { secure: true },
      item_details: orderDetails.items.map((item: any) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name,
      })),
      customer_details: {
        first_name: orderDetails.shippingDetails.name,
        email: orderDetails.shippingDetails.email,
        phone: orderDetails.shippingDetails.phone,
        billing_address: {
          first_name: orderDetails.shippingDetails.name,
          address: orderDetails.shippingDetails.address,
          city: orderDetails.shippingDetails.city,
          postal_code: orderDetails.shippingDetails.postalCode,
        },
      },
    };

    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;

    return NextResponse.json({ token: transactionToken, orderId });
  } catch (error: any) {
    console.error('❌ Error creating Midtrans transaction:', error.ApiResponse || error);
    return NextResponse.json(
      { message: 'Error creating Midtrans transaction', error },
      { status: 500 }
    );
  }
}

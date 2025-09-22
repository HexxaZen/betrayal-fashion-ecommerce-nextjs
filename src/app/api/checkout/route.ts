// src/app/api/checkout/route.ts

import { NextResponse } from 'next/server';
import midtransClient from 'midtrans-client';
import { v4 as uuidv4 } from 'uuid';

// Inisialisasi Midtrans Snap
const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true';
const serverKey = process.env.MIDTRANS_SERVER_KEY;
const clientKey = process.env.MIDTRANS_CLIENT_KEY;

// Check if keys are defined, and throw an error if not
if (!serverKey || !clientKey) {
  throw new Error('Midtrans server key and client key must be defined in environment variables.');
}

// Inisialisasi Midtrans Snap
const snap = new midtransClient.Snap({
  isProduction: isProduction,
  serverKey: serverKey, // TypeScript now knows this is a string
  clientKey: clientKey, // TypeScript now knows this is a string
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
      credit_card: {
        secure: true,
      },
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
      callbacks: {
        // opsional: Anda dapat mengimplementasikan callback di sini
        // finish: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status`
      }
    };

    const transaction = await snap.createTransaction(parameter);
    const transactionToken = transaction.token;

    return NextResponse.json({ token: transactionToken, orderId });
  } catch (error) {
    console.error('Error creating Midtrans transaction:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
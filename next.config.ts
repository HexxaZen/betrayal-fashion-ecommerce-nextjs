import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY,
  },
};

export default nextConfig;

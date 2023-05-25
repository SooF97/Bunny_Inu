"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Binance } from "@thirdweb-dev/chains";

const inter = Inter({ subsets: ["latin"] });

const activeChain = "binance";

export default function RootLayout({ children }) {
  return (
    <ThirdwebProvider activeChain={activeChain} supportedChains={[Binance]}>
      <html lang="en">
        <head>
          <title>Official Bunny Inu Minting Website</title>
          <meta
            name="description"
            content="Official Bunny Inu Minting Website"
          />
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ThirdwebProvider>
  );
}

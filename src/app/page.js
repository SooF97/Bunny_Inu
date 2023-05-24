"use client";
import React, { useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NextHead from "next/head";

import BunnyCollection from "../BunnyCollection.json";

const home = () => {
  const [mintAmount, setMintAmount] = useState(null);
  const [minting, setMinting] = useState(false);

  function handleNumber(e) {
    console.log(e.target.value);
    setMintAmount(e.target.value);
  }

  async function mintNFT() {
    setMinting(true);
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const nftPrice = ethers.utils.parseEther("0.1"); // Price of each NFT (0.1 BNB)
      const transactionValue = nftPrice.mul(mintAmount);
      console.log(address);
      console.log(BunnyCollection.address);
      try {
        const contract = new ethers.Contract(
          BunnyCollection.address,
          BunnyCollection.abi,
          signer
        );
        const transaction = await contract.mint(mintAmount.toString(), {
          value: transactionValue,
        });
        await transaction.wait();
        toast("NFT minted successfully!", { type: "success" });
        console.log(transaction);
      } catch (error) {
        console.log(error);
      }
    }
    setMinting(false);
  }
  return (
    <>
      <NextHead>
        <title>Official Bunny Inu Minting Website </title>

        <meta name="description" content="Official Bunny Inu Minting Website" />
      </NextHead>
      <div>
        <div className="flex flex-col items-center justify-center mt-8">
          <ToastContainer />
          <div className="flex flex-col">
            <ConnectWallet theme="dark" btnTitle="Connect your wallet" />
            <input
              type="submit"
              value="Mint"
              onClick={mintNFT}
              className="bg-orange-500 hover:bg-orange-400 border-black text-black font-bold py-2 px-4 rounded-md mt-8 drop-shadow-md cursor-pointer"
            />
            {minting && (
              <div className="mt-2 flex justify-center">
                <Loading type="spin" color="black" height={30} width={30} />
              </div>
            )}
          </div>
          <input
            className="mt-8 mb-4 px-4 py-2 border border-gray-300 rounded-md"
            type="number"
            placeholder="Enter your mint amount"
            onChange={handleNumber}
          />
        </div>
        <div className="container mx-auto p-4 grid md:grid-cols-2 gap-4">
          <div className="p-4">
            <h1 className="text-3xl md:text-3xl font-bold text-center text-gray-900">
              Bunny Inu NFT collection
            </h1>
            <h2 className="text-2xl md:text-xl font-bold mt-4 text-center text-gray-900">
              Bunny Inu NFTs will also be tradable on OpenSea and other NFT
              platforms so you can always trade them There will more utilities
              made for Bunny Inu in the near future since we plan to do this
              longterm. And there will be a lot of benefits from them to our
              community members that support us through the minting of Bunny Inu
              NFTs.🔶🐇
            </h2>
            <div className="max-w-md mx-auto p-4">
              <ul className="divide-y divide-gray-200">
                <li className="py-2">
                  <span className="text-black font-bold">Supply:</span> 200
                </li>
                <li className="py-2">
                  <span className="text-black font-bold">Price:</span> 0.1 BNB
                </li>
                <li className="py-2">
                  <span className="text-black font-bold">
                    Max. mint amount :
                  </span>{" "}
                  5
                </li>
              </ul>
            </div>
          </div>
          <div className=" p-4">
            <div className="max-w-md mx-auto">
              <img
                className="w-full rounded-lg shadow-lg"
                src="/bunny.gif"
                alt="NFT Collection"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default home;

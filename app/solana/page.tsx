"use client"

import { useState } from "react";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";

export default function Solana({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

  const handleClick = async () => {
    const seedBuffer = await mnemonicToSeed(mnemonic);
    const seed = new Uint8Array(seedBuffer);

    // Convert seed to hex correctly
    const seedHex = Buffer.from(seed).toString("hex");

    // Correct derivation path for Solana
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seedHex).key;

    // Generate keypair
    const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secretKey);

    // Update state correctly
    setCurrentIndex((prev) => prev + 1);
    setPublicKeys((prevKeys) => [...prevKeys, keypair.publicKey.toBase58()]);
  };

  return (
    <div>
      <button onClick={handleClick}>Add Wallet</button>
      {publicKeys.map((key, index) => (
        <div key={index}>SOL-{key}</div> // ✅ Added key
      ))}
    </div>
  );
}
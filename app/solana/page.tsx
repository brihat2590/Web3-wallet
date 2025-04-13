"use client"

import { useState } from "react"
import { Keypair } from "@solana/web3.js"
import nacl from "tweetnacl"
import { mnemonicToSeed } from "bip39"
import { derivePath } from "ed25519-hd-key"
import { motion, AnimatePresence } from "framer-motion"

export default function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [publicKeys, setPublicKeys] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const handleClick = async () => {
    setIsGenerating(true)
    const seedBuffer = await mnemonicToSeed(mnemonic)
    const seed = new Uint8Array(seedBuffer)

    const seedHex = Buffer.from(seed).toString("hex")
    const path = `m/44'/501'/${currentIndex}'/0'`
    const derivedSeed = derivePath(path, seedHex).key

    const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey
    const keypair = Keypair.fromSecretKey(secretKey)

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setPublicKeys((prevKeys) => [...prevKeys, keypair.publicKey.toBase58()])
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight dark:text-emerald-300 text-emerald-700">
        🪙 Solana Wallet Generator
      </h1>

      <p className="text-lg text-center max-w-xl mb-10 text-muted-foreground">
        Securely derive Solana wallet addresses from your mnemonic phrase using BIP44 and Ed25519 keys.
      </p>

      <button
        onClick={handleClick}
        disabled={isGenerating}
        className="bg-emerald-600 hover:bg-emerald-700 transition px-6 py-3 rounded-xl text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white"
      >
        {isGenerating ? "Generating..." : "➕ Generate New Wallet"}
      </button>

      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-8 text-sm text-emerald-500"
          >
            🧠 Deriving wallet and generating keypair...
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl mt-12 space-y-4">
        {publicKeys.map((key, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-muted border border-border rounded-xl p-4 shadow-md"
          >
            <p className="text-sm font-mono text-emerald-500 break-all">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">
                Wallet {index + 1}:
              </span>{" "}
              {key}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

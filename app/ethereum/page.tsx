"use client"

import { useState } from "react"
import { mnemonicToSeed } from "bip39"
import { Wallet, HDNodeWallet } from "ethers"
import { motion, AnimatePresence } from "framer-motion"

interface EthereumWalletProps {
  mnemonic: string
}

export const EthereumWallet = ({ mnemonic }: EthereumWalletProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [addresses, setAddresses] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateWallet = async () => {
    setIsGenerating(true)
    const seed = await mnemonicToSeed(mnemonic)
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`

    const hdNode = HDNodeWallet.fromSeed(seed)
    const child = hdNode.derivePath(derivationPath)
    const wallet = new Wallet(child.privateKey)

    setTimeout(() => {
      setAddresses((prev) => [...prev, wallet.address])
      setCurrentIndex((prev) => prev + 1)
      setIsGenerating(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight">
        ✨ Ethereum Wallet Generator
      </h1>
      <p className="text-lg text-center max-w-xl mb-10 text-neutral-400">
        Generate Ethereum wallet addresses from your mnemonic using HD derivation.
      </p>

      <button
        onClick={generateWallet}
        disabled={isGenerating}
        className="bg-purple-700 hover:bg-purple-800 transition px-6 py-3 rounded-xl text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? "Generating..." : "➕ Generate New Wallet"}
      </button>

      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-8 text-sm text-purple-300"
          >
            🧠 Deriving HD path and computing address...
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl mt-12 space-y-4">
        {addresses.map((address, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 shadow-md"
          >
            <p className="text-sm font-mono text-purple-200 break-all">
              <span className="font-bold text-purple-400">Wallet {index + 1}:</span> {address}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default EthereumWallet

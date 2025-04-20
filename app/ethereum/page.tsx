"use client"

import { useState } from "react"
import { mnemonicToSeed } from "bip39"
import { Wallet, HDNodeWallet } from "ethers"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"

interface EthereumWalletProps {
  mnemonic: string
}

export const EthereumWallet = ({ mnemonic }: EthereumWalletProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [wallets, setWallets] = useState<{ address: string; privateKey: string }[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPrivateKey, setShowPrivateKey] = useState(false)

  const generateWallet = async () => {
    setIsGenerating(true)
    const seed = await mnemonicToSeed(mnemonic)
    const derivationPath = `m/44'/60'/${currentIndex}'/0'`

    const hdNode = HDNodeWallet.fromSeed(seed)
    const child = hdNode.derivePath(derivationPath)
    const wallet = new Wallet(child.privateKey)

    setTimeout(() => {
      setWallets((prev) => [
        ...prev,
        {
          address: wallet.address,
          privateKey: wallet.privateKey,
        },
      ])
      setCurrentIndex((prev) => prev + 1)
      setIsGenerating(false)
    }, 1000)
  }

  const deleteWallet = () => {
    setWallets([])
    setCurrentIndex(0)
  }

  const privKeyHandler = () => {
    setShowPrivateKey(!showPrivateKey)
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight dark:text-purple-300 text-purple-700">
        ✨ Ethereum Wallet Generator
      </h1>

      <p className="text-lg text-center max-w-xl mb-10 text-muted-foreground">
        Generate Ethereum wallet addresses from your mnemonic using HD derivation.
      </p>

      <div className="flex gap-3">
        <button
          onClick={generateWallet}
          disabled={isGenerating}
          className="bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-xl text-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-white"
        >
          {isGenerating ? "Generating..." : "➕ Generate New Wallet"}
        </button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-xl text-lg font-semibold shadow-lg text-white">
              Delete Wallet
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove all generated Ethereum wallets. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteWallet}>Yes, Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <button
        onClick={privKeyHandler}
        className="text-sm text-blue-600 underline mt-6"
      >
        {showPrivateKey ? "🙈 Hide Private Keys" : "🔓 Show Private Keys"}
      </button>

      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-8 text-sm text-purple-500"
          >
            🧠 Deriving HD path and computing address...
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-2xl mt-12 space-y-4">
        {wallets.map((wallet, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-muted border border-border rounded-xl p-4 shadow-md"
          >
            <p className="text-sm font-mono text-purple-500 break-all">
              <span className="font-bold text-purple-700 dark:text-purple-400">
                Wallet {index + 1}:
              </span>{" "}
              {wallet.address}
            </p>

            {showPrivateKey && (
              <p className="text-sm font-mono text-red-500 break-all mt-2">
                <span className="font-bold text-red-600 dark:text-red-400">
                  Private Key:
                </span>{" "}
                {wallet.privateKey}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default EthereumWallet

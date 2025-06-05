"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { generateMnemonic } from "bip39"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function HeroSection() {
  const [mnemonic, setMnemonic] = useState("")
  const [selectedChain, setSelectedChain] = useState<"solana" | "ethereum" | null>(null)

  const { theme, setTheme } = useTheme()

  const mnemoHandler = async () => {
    const mn = await generateMnemonic()
    setMnemonic(mn)
    setSelectedChain(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 flex flex-col items-center">
      
      {/* Theme toggle button */}
      

      <motion.h1
        className="text-7xl font-semibold tracking-tight font-outfit text-neutral-800 dark:text-neutral-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        WalletWave supports multiple <br></br> <span className="text-primary flex justify-center">blockchains</span>
      </motion.h1>

      <motion.p
        className="text-2xl tracking-tight font-light py-4 mt-2 text-neutral-700 dark:text-neutral-300"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Choose a blockchain to get started
      </motion.p>

      <div className="flex gap-4 mt-4">
        <Button
          onClick={mnemoHandler}
          className="bg-purple-600 hover:bg-purple-700 px-7 py-5 rounded-xl text-lg text-white transition-all duration-300"
        >
          Generate Mnemonic
        </Button>

        <input
          value={mnemonic}
          readOnly
          type="text"
          className="py-2 w-96 border border-purple-600 bg-muted rounded-lg text-foreground px-4 focus:outline-none"
        />
      </div>

      <motion.div
        className="flex gap-4 items-center py-4 mt-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Link href="/solana">
          <button
            className="px-6 py-2 mt-2 border border-purple-600 text-purple-600 dark:text-white rounded-lg 
            hover:bg-purple-600 hover:text-white hover:border-purple-700 transition-all duration-300"
          >
            Solana
          </button>
        </Link>

        <Link href="/ethereum">
          <button
            className="px-6 py-2  mt-2 border border-purple-600 text-purple-600 dark:text-white rounded-lg 
            hover:bg-purple-600 hover:text-white hover:border-purple-700 transition-all duration-300"
          >
            Ethereum
          </button>
        </Link>
      </motion.div>
    </div>
  )
}

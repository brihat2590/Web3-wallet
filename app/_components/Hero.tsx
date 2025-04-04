
"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { generateMnemonic } from "bip39";
import { useState } from "react";

export default function HeroSection(){
    const router=useRouter();
    const [mnemonic,setMnemonic]=useState("")

    const mnemoHandler=async()=>{
        const mn = await generateMnemonic();
        setMnemonic(mn)

    }
    return(
        <div className="flex flex-col  mt-10 ">
            <h1 className="text-7xl font-semibold tracking-tight font ">Kosh supports multiple blockchains</h1>
            <p className="text-2xl tracking-tight  font-light py-4 mt-2">Choose a blockchain to get started</p>
            <div className="flex gap-4">
                <Button onClick={mnemoHandler} className="max-w-35 py-4 mt-2  ">Generate Mnemonic</Button>
                <input value={mnemonic} type="text" className="py-2 w-96  "/>
            </div>






            <div className="flex gap-4 items-center py-4 mt-2 bg-black ">
                <button
                    onClick={() => router.push("/solana")}
                    className="px-6 py-2 border border-white text-white rounded-lg 
                              hover:bg-pink-600 hover:border-pink-400 hover:text-white 
                            transition-all duration-300"
                >
                    Solana
                </button>

                <button
                    onClick={() => router.push("/ethereum")}
                    className="px-6 py-2 border border-white text-white rounded-lg 
                            hover:text-white hover:bg-indigo-600 hover:border-indigo-400
                            transition-all duration-300"
                >
                    Ethereum
                </button>
            </div>


        
        
        
        
        
        
        </div>



    )
}
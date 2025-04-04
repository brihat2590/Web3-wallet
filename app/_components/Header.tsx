import { AiFillAlipayCircle } from "react-icons/ai";
import { ModeToggle } from "./Dark";

export default function Header(){
  return(
    <nav className="flex py-4  justify-between ">

        <div className="flex gap-2 items-center p-2 pl-2">
            <span>{<AiFillAlipayCircle size={30}/>}</span>
            <span className="text-2xl font-bold">GUPS </span>
            <span className="rounded-full text-base border px-2 font-semibold py-2">v1.3</span>

        </div>

        <div className="flex items-center gap-2 p-2">
            <div className="p-2"><ModeToggle/></div>
            
        </div>


    </nav>
    
)}
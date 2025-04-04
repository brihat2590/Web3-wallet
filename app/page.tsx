import Header from "./_components/Header"
import HeroSection from "./_components/Hero"
export default function Home(){
  return(

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
      <Header/>
      <HeroSection/>

    </div>
  )
}
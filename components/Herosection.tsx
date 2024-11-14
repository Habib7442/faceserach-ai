import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Star, Download } from "lucide-react";
import Link from "next/link";

const Herosection = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="background"
          className="object-cover"
          fill
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027]/90 via-[#203a43]/80 to-[#2c5364]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 drop-shadow-lg">
          Welcome to FaceSearch AI
        </h1>
        <h4 className="text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-cyan-300 to-slate-400 font-medium">
          Experience AI-Powered Face Matching Like Never Before
        </h4>

       

        {/* Ratings and Downloads Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="w-6 h-6 text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="ml-2 text-white font-medium">5.0</span>
            </div>
            <div className="w-px h-8 bg-slate-600" /> {/* Vertical divider */}
            <div className="flex items-center text-white">
              <Download className="w-5 h-5 mr-2" />
              <span className="font-medium">1K+ Downloads</span>
            </div>
          </div>
          {/* <AnimatedTooltipPreview /> */}
          <div className="mt-8 flex justify-center gap-4">
            <Link href="sign-in">
          <Button className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-700 text-cyan-300 font-semibold px-8 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
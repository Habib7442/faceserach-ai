'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Download } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { motion, useScroll, useTransform } from "framer-motion";

const Herosection = () => {
  const { userId } = useAuth();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);

  return (
    <div className="relative w-full h-screen flex justify-center items-center overflow-hidden">
      {/* Background Image with 3D Effect */}
      <div className="absolute inset-0">
        <div className="perspective-[1000px]">
          <motion.div 
            style={{ scale }}
            className="transform-gpu w-full h-full"
          >
            <Image
              src="/hero.png"
              alt="AI Face Search Background"
              className="object-cover w-full h-full"
              layout="fill"
              priority
              sizes="100vw"
            />
          </motion.div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f2027]/90 via-[#203a43]/80 to-[#2c5364]/70" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6 px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 drop-shadow-lg"
        >
          Welcome to FaceSearch AI
        </motion.h1>
        <motion.h2 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-cyan-300 to-slate-400 font-medium"
        >
          Experience AI-Powered Face Matching Like Never Before
        </motion.h2>

        {/* Ratings and Downloads Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-800/50 p-4 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="w-6 h-6 text-yellow-400 fill-yellow-400"
                />
              ))}
              <span className="ml-2 text-white font-medium">5.0</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-slate-600" />
            <div className="flex items-center text-white">
              <Download className="w-5 h-5 mr-2" />
              <span className="font-medium">1K+ Downloads</span>
            </div>
          </div>

          <Link href={userId ? "/upload" : "/sign-in"}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-700 text-cyan-300 font-semibold px-8 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {userId ? "Explore" : "Get Started"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Herosection;
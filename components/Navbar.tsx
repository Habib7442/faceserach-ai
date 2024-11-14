"use client"
import { SignedOut, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, isSignedIn } = useUser();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-transparent dark:bg-slate-900/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="FaceSearch AI"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold text-slate-800 dark:text-slate-200">
              FaceSearch AI
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
              About
            </span>
          </Link>
          <Link href="/features">
            <span className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
              Features
            </span>
          </Link>
          <Link href="/contact">
            <span className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
              Contact
            </span>
          </Link>
        </div>

        {/* Sign In/Out Button */}
        <div>
          {isSignedIn ? (
            <div className="flex items-center space-x-2">
              <span className="text-slate-700 dark:text-slate-300">
                Welcome, {user?.firstName}!
              </span>
              <SignedOut>
                <Button
                  className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-700 text-cyan-300 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Sign Out
                </Button>
              </SignedOut>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button
                className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-700 hover:via-slate-800 hover:to-slate-700 text-cyan-300 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
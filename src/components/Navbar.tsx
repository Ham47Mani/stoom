import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      {/* --------------- Logo --------------- */}
      <Link href="/" className="flex items-center gap-1">
        <Image src="/icons/logo.svg" alt="logo" width={32} height={32}  className="max-sm:size-10"/>
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">STOOM</p>
      </Link>
      {/* --------------- Nav Menu --------------- */}
      <div className="flex justify-between items-center gap-5">
        {/* ------ Clerk - User Management ------ */}
        {/* --- If User sign-in --- */}
        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* --- If User sign-out --- */}
        <SignedOut>
          <SignInButton />
        </SignedOut>

        {/* ------ Mobile Nav ------ */}
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar
"use client";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { SidebarLinks } from "../../constants"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          <Image src="/icons/hamburger.svg" alt="hamburger menu" width={36} height={36} className="cursor-pointer sm:hidden"/>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          {/* ------ Logo ------ */}
          <Link href="/" className="flex items-center gap-1">
            <Image src="/icons/logo.svg" alt="logo" width={32} height={32}  className="max-sm:size-10"/>
            <p className="text-[26px] font-extrabold text-white">STOOM</p>
          </Link>

          {/* ------ Content ------ */}
          <div className="flex flex-col justify-between overflow-y-auto h-[calc(100vh-72px)]">
            <SheetClose asChild >
              <section className="flex flex-col gap-6 h-full pt-16 text-white">
              {
                SidebarLinks.map(link => {
                  const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link href={link.route} className={cn('flex gap-4 items-center justify-start p-4 rounded-lg w-full max-w-60', {
                        'bg-blue-1': isActive
                      })}>
                        <Image src={link.imgUrl} alt={link.label} width={20} height={20} />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  )
                })
              }
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
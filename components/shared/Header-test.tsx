import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./mobile-nav";
import { NavigationMenuTab } from "./NavigationMenuTab";

export default async function Header2() {
  return (
    <div className="w-full lg:py-3.5 py-1.5 relative">
      <div className={`component-container mx-auto`}>
        <div className="flex justify-between items-center">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/images/tmv-bd.png"
              alt="Track My Vehicle BD Logo"
              height={82}
              width={82}
              className="w-16 h-16 lg:w-20.5 lg:h-20.5 object-center object-contain"
            />
          </Link>
          <div className="hidden lg:flex grow justify-center items-center">
            <NavigationMenuTab />
          </div>

          <div className="flex justify-end items-center gap-3">
            <div className="border border-secondary-foreground/10 rounded-full cursor-pointer bg-white/50 backdrop-blur-sm">
              <Search className="w-6 h-6 m-3 text-secondary-foreground" />
            </div>
            <div className="hidden lg:block bg-white/50 backdrop-blur-sm">
              <LanguageSwitcher />
            </div>

            <div className="border border-secondary-foreground/10 rounded-full cursor-pointer bg-white/50 backdrop-blur-sm">
              <Cart />
            </div>

            <div className="border border-secondary-foreground/10 rounded-full lg:hidden block cursor-pointer bg-white/50 backdrop-blur-sm">
              {/* <TextAlignStart className="w-6 h-6 m-3 text-secondary-foreground" /> */}
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

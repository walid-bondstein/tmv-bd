import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./mobile-nav";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "../ui/navigation-menu";
import { headers } from "next/headers";
import FeatureLinks from "./FeatureLinks";

export default async function Header() {
    const headersList = await headers();
    const pathname = headersList.get("pathname") || "/";
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };
    return (
        <div className="w-full lg:py-3.5 py-1.5 relative flex">
            <NavigationMenu viewport className="max-h-full min-w-full">
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
                            <NavigationMenuList>
                                <NavigationMenuItem >
                                    <NavigationMenuLink asChild className={"inline-flex text-base bg-transparent hover:bg-transparent"}>
                                        <Link className={`${isActive("/") ? "text-gradient" : "text-[#777F92]"} whitespace-nowrap`} href="/">Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem >
                                    <NavigationMenuLink asChild className={"inline-flex text-base bg-transparent hover:bg-transparent"}>
                                        <Link className={`${isActive("/#products") ? "text-gradient" : "text-[#777F92]"} whitespace-nowrap`} href={"/#products"}>Products</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem className="">
                                    <NavigationMenuTrigger className={`${isActive("/features") ? "text-gradient" : "text-[#777F92]"} bg-transparent hover:bg-transparent whitespace-nowrap`}>Features</NavigationMenuTrigger>
                                    <NavigationMenuContent className="p-0 m-0 min-w-full max-w-full">
                                        <FeatureLinks />
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={"inline-flex text-base bg-transparent hover:bg-transparent"}>
                                        <Link className={`${isActive("/#how-it-work") ? "text-gradient" : "text-[#777F92]"} whitespace-nowrap`} href={"/#how-it-works"}>How It Works</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem >
                                    <NavigationMenuLink asChild className={"inline-flex text-base bg-transparent hover:bg-transparent"}>
                                        <Link className={`${isActive("/store-locations") ? "text-gradient" : "text-[#777F92]"} whitespace-nowrap`} href={"/store-locations"}>Store Locator</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </div>

                        <div className="flex justify-end items-center gap-3">
                            <div className="border hidden border-secondary-foreground/10 rounded-full cursor-pointer bg-white/50 backdrop-blur-sm">
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
                <NavigationMenuViewport className="rounded-none" />
            </NavigationMenu>
        </div>
    );
}

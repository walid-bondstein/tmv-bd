import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

// import { useIsMobile } from "@/hooks/use-mobile"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { headers } from "next/headers"

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export async function NavigationMenuTab() {
    //   const isMobile = useIsMobile()
    const headersList = await headers();
    const pathname = headersList.get("pathname") || "/";
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(href);
    };
    // <div className="flex justify-center items-center gap-6 text-secondary-foreground">
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={"inline-flex text-base bg-transparent hover:bg-transparent"}>
                        <Link className={`${isActive("/") ? "text-gradient" : "text-[#777F92]"}`} href="/">Home</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className={"inline-flex text-base bg-transparent hover:bg-transparent"}>
                        <Link className={`${isActive("/#products") ? "text-gradient" : "text-[#777F92]"}`} href={"/#products"}>Products</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={`${isActive("/features") ? "text-gradient" : "text-[#777F92]"} bg-transparent hover:bg-transparent`}>Features</NavigationMenuTrigger>
                    <NavigationMenuContent className="border border-green-500 min-w-full bg-amber-300 overscroll-none">
                        <ul className="grid gap-2 w-full">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={"inline-flex text-base bg-transparent hover:bg-transparent"}>
                        <Link className={`${isActive("/#how-it-work") ? "text-gradient" : "text-[#777F92]"}`} href={"/#how-it-works"}>How It Works</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild className={"inline-flex text-base bg-transparent hover:bg-transparent"}>
                        <Link className={`${isActive("/store-locations") ? "text-gradient" : "text-[#777F92]"}`} href={"/store-locations"}>Store Locator</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport asChild />
        </NavigationMenu>
    )
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href}>
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

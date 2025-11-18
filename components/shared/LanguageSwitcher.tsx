"use client"

import { Globe } from "lucide-react"
import { useState } from "react"

export function LanguageSwitcher() {
    const [language, setLanguage] = useState<"en" | "bn">("en")

    return (
        <div className="hidden items-center gap-2 px-1 py-1 max-h-max rounded-full border bg-background/50 backdrop-blur-sm">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1 text-sm">
                <button
                    onClick={() => setLanguage("en")}
                    className={`transition-all cursor-pointer ${language === "en" ? "font-bold text-foreground" : "font-normal text-muted-foreground hover:text-foreground"
                        }`}
                >
                    EN
                </button>
                <span className="text-muted-foreground">|</span>
                <button
                    onClick={() => setLanguage("bn")}
                    className={`transition-all cursor-pointer ${language === "bn" ? "font-bold text-foreground" : "font-normal text-muted-foreground hover:text-foreground"
                        }`}
                >
                    BN
                </button>
            </div>
        </div>
    )
}
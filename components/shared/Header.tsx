import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers"; // built-in cookies API
import { Search, ShoppingCart, TextAlignStart } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { i18n } from "@/i18.config";
import en from "@/app/locales/en/common.json";
import bn from "@/app/locales/bn/common.json";
import useTranslate from "@/hooks/translate-hook";

export default async function Header() {
  const { t, lang } = await useTranslate("header");
  return (
    <div className="w-full lg:py-3.5 py-1.5">
      <div className="component-container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Image
              src="/images/tmv-bd.png"
              alt="Track My Vehicle BD Logo"
              height={82}
              width={82}
              className="w-16 h-16 lg:w-[5.125rem] lg:h-[5.125rem]"
            />
          </div>

          {/* Links */}
          <div className="hidden lg:block">
            <div className="flex justify-center items-center gap-6 text-secondary-foreground">
              <Link href="/">{t("home")}</Link>
              <Link href="/products">{t("products")}</Link>
              <Link href="/features">{t("features")}</Link>
              <Link href="/how-it-works">{t("howItWorks")}</Link>
              <Link href="/store-locations">{t("storeLocation")}</Link>
            </div>
          </div>

          {/* Icons and Language */}
          <div className="flex justify-end items-center gap-3">
            <div className="border rounded-full cursor-pointer bg-white/50 backdrop-blur-sm">
              <Search className="w-6 h-6 m-3 text-secondary-foreground" />
            </div>

            <div className="hidden lg:block bg-white/50 backdrop-blur-sm">
              <LanguageSwitcher currentLang={lang} />
            </div>

            <div className="border rounded-full cursor-pointer bg-white/50 backdrop-blur-sm">
              <ShoppingCart className="w-6 h-6 m-3 text-secondary-foreground" />
            </div>

            <div className="border rounded-full lg:hidden block cursor-pointer bg-white/50 backdrop-blur-sm">
              <TextAlignStart className="w-6 h-6 m-3 text-secondary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

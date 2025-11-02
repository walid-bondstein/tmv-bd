import { cookies } from "next/headers";
import { i18n } from "@/i18.config";
import en from "@/app/locales/en/common.json";
import bn from "@/app/locales/bn/common.json";

const useTranslate = async (
  page: string
): Promise<{ lang: string; t: (page: string) => string }> => {
  const cookieStore = await cookies();

  const langCookie = cookieStore.get("lang");

  const lang =
    (langCookie?.value as (typeof i18n.locales)[number]) || i18n.defaultLocale;

  const translations: Record<string, Record<string, string>> = lang === "bn"
    ? en
    : bn;
  return {
    t: (key: string) => translations["header"]?.[key],
    lang,
  };
};

export default useTranslate;

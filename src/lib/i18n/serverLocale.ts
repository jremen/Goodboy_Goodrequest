import { cookies, headers } from "next/headers";
import { getT } from "./config";

export async function getServerLanguage(): Promise<"sk" | "cs"> {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  if (langCookie === "cs" || langCookie === "sk") return langCookie;

  const h = await headers();
  const accept = h.get("accept-language") ?? "";
  return accept.toLowerCase().startsWith("cs") ? "cs" : "sk";
}

export async function getServerT() {
  const lang = await getServerLanguage();
  return getT(lang);
}

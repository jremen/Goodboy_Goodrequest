import { headers } from "next/headers";
import { getT } from "./config";

export async function getServerLanguage(): Promise<"sk" | "cs"> {
  const h = await headers();
  const accept = h.get("accept-language") ?? "";
  return accept.toLowerCase().startsWith("cs") ? "cs" : "sk";
}

export async function getServerT() {
  const lang = await getServerLanguage();
  return getT(lang);
}

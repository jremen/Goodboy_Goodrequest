import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";

export default getRequestConfig(async () => {
  const store = await cookies();
  let locale = store.get("locale")?.value;

  if (locale !== "cs" && locale !== "sk") {
    const h = await headers();
    const accept = h.get("accept-language") ?? "";
    locale = accept.toLowerCase().startsWith("cs") ? "cs" : "sk";
  }

  const [common, form, subpages] = await Promise.all([
    import(`../locales/${locale}/common.json`).then((m) => m.default),
    import(`../locales/${locale}/form.json`).then((m) => m.default),
    import(`../locales/${locale}/subpages.json`).then((m) => m.default),
  ]);

  return {
    locale,
    messages: { common, form, subpages },
  };
});

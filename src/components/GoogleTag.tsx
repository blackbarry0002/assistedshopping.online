import Script from "next/script";
import { googleTag } from "@/config/site";

/**
 * Google tag (gtag.js), as supplied by Google Ads, loaded on every page.
 * The ID lives in `src/config/site.ts` (`googleTag.id`).
 */
export function GoogleTag() {
  const id = googleTag.id;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}

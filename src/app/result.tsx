import { FC, useMemo } from "react";
import { useApp } from "@/context/app/use-app";
import { CopyBlock, dracula } from "react-code-blocks";
import {
  META_ANDROID_DEFAULT_CAPABLE,
  META_ANDROID_DEFAULT_FULLSCREEN,
  META_ANDROID_DEFAULT_ORIENTATION,
  META_DEFAULT_DISTRIBUTION,
  META_DEFAULT_RATING,
  META_DEFAULT_REVISIT,
  META_DEFAULT_VIEWPORT,
  META_EQUIV_DEFAULT_IE,
  META_EQUIV_DEFAULT_TYPE,
  META_OG_DEFAULT_TYPE,
  generateMetaCSP,
  getOgImageSize,
} from "metaseo";

export const Result: FC = () => {
  const {state: {meta}} = useApp();

  const metaText = useMemo(() => {
    const result: string[] = [];

    const {
      charSet,
      equiv = {},
      copyright,
      revisit = META_DEFAULT_REVISIT,
      rating = META_DEFAULT_RATING,
      distribution = META_DEFAULT_DISTRIBUTION,
      mode,
      viewport,
      name,
      title,
      keywords,
      description,
      image,
      shortcut,
      icon,
      canonical,
      robots = "index, follow, noodp, noydir",
      apple,
      android,
      hreflang = {},
      disableOg,
      og = {},
      userAgent,
      csp,
    } = meta;

    const charSetValue = charSet?.trim() || META_EQUIV_DEFAULT_TYPE;
    charSet === "off" || result.push(`<meta charset="${charSetValue}" />`);

    const {
      type = META_EQUIV_DEFAULT_TYPE,
      language,
      ie = META_EQUIV_DEFAULT_IE,
      clearType,
    } = equiv;

    result.push(`<meta http-equiv="Content-type" content="text/html; charset=${type.toLowerCase()}" />`);
    language?.trim() && result.push(`<meta http-equiv="Content-Language" content="${language}" />`);
    ie && result.push('<meta http-equiv="X-UA-Compatible" content="IE=edge" />');
    clearType && result.push('<meta http-equiv="cleartype" content="on" />');

    copyright?.trim() && result.push(`<meta name="copyright" content="${copyright}" />`);
    revisit !== "off" && result.push(`<meta name="REVISIT-AFTER" content="${revisit}" />`);
    rating !== "off" && result.push('<meta name="RATING" content="GENERAL" />');
    distribution !== "off" && result.push(`<meta name="distribution" content="${distribution}" />`);

    mode && result.push(
      '<meta name="browsermode" content="application" />',
      '<meta name="layoutmode" content="fitscreen" />',
      '<meta name="imagemode" content="force" />',
    );

    viewport && result.push(`<meta name="viewport" content="${
      typeof viewport === "string" ? viewport : META_DEFAULT_VIEWPORT
    }" />`);

    name?.trim() && result.push(`<meta name="application-name" content="${name}" />`);
    title?.trim() && result.push(`<title>${title}</title>`);

    const keywordString = Array.isArray(keywords) ? keywords.join(", ") : keywords?.trim();
    keywordString && result.push(`<meta name="keywords" content="${keywordString}" />`);

    description?.trim() && result.push(`<meta name="description" content="${description}" />`);
    image?.trim() && result.push(`<link rel="image_src" href="${image}" />`);
    shortcut?.trim() && result.push(`<link rel="shortcut icon" href="${shortcut}" />`);
    icon && result.push(`<link rel="icon" sizes="${icon.size}" href="${icon.href}" />`);
    canonical?.trim() && result.push(`<link rel="canonical" href="${canonical}"/>`);

    result.push(`<meta name="robots" content="${robots}" />`);

    apple && result.push(
      `<meta name="apple-mobile-web-app-title" content="${apple.title}" />`,
      `<meta name="apple-mobile-web-app-capable" content="${apple.capable ? "yes" : "no"}" />`,
      `<meta name="apple-mobile-web-app-status-bar-style" content="${apple.statusBarStyle || "black"}" />`,
      `<link rel="apple-touch-icon" href="${apple.touchIcon}" />`,
      `<link rel="apple-touch-startup-image" sizes="${apple.touchStartupIcon?.size}" href="${apple.touchStartupIcon?.href}" />`
    );

    android && result.push(
      `<meta name="theme-color" content="${android.theme}" />`,
      `<meta name="mobile-web-app-capable" content="${(android.capable ?? META_ANDROID_DEFAULT_CAPABLE) ? "yes" : "no"}" />`,
      `<meta name="fullscreen" content="${(android.fullscreen ?? META_ANDROID_DEFAULT_FULLSCREEN) ? "yes" : "no"}" />`,
     ` <meta name="screen-orientation" content="${android.orientation ?? META_ANDROID_DEFAULT_ORIENTATION}" />`,
    );

    Object.keys(hreflang).forEach((lang) => {
      result.push(`<link rel="alternate" hrefLang="${lang}" href="${hreflang[lang as keyof typeof hreflang]}" />`);
    });

    if (!disableOg) {
      const ogImageSize = getOgImageSize(userAgent);

      result.push(
        `<meta property="og:site_name" content="${og.siteName || ""}" />`,
        `<meta property="og:type" content="${og.type || META_OG_DEFAULT_TYPE}" />`,
        `<meta property="og:title" name="title" content="${og.title || title || ""}" />`,
        `<meta property="og:description" name="description" content="${og.description || description || ""}" />`,
        `<meta property="og:url" content="${og.url || canonical || ""}" />`,
        `<meta property="og:image" content="${og.image || image || ""}" />`,
        `<meta property="og:image:width" content="${og.imageWidth || ogImageSize.width}" />`,
        `<meta property="og:image:height" content="${og.imageHeight || ogImageSize.height}" />`
      );

      if (Array.isArray(og.locale)) {
        og.locale.forEach((locale) => {
          result.push(`<meta property="og:locale" itemprop="inLanguage" content="${locale}" />`);
        });
      } else if (og.locale) {
        result.push(`<meta property="og:locale" itemprop="inLanguage" content="${og.locale}" />`);
      }
    }

    csp && result.push(`<meta http-equiv="Content-Security-Policy" content="${generateMetaCSP(csp)}" />`);

    return result.join("\n");
  }, [meta]);

  return (
    <div className="text-[13px] font-mono mt-4">
      <CopyBlock
        text={metaText}
        language="html"
        showLineNumbers
        theme={dracula}
        codeBlock
        codeBlockStyle={{
          width: "100%",
        }}
        customStyle={{
          width: "100%",
        }}
      />
    </div>
  );
};
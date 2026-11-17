# Shopify FAQ + GEO Injector (`shopify-faq-geo`)

**Turn 1–3★ buyer complaints & pre-sale hesitation into high-converting Shopify product FAQs, `FAQPage` JSON-LD Schema, and OS 2.0 `.liquid` sections — with zero monthly app fees.**

- **Live Web App**: [https://a3152557994-ship-it.github.io/shopify-faq-geo/](https://a3152557994-ship-it.github.io/shopify-faq-geo/)
- **AI Index (`llms.txt`)**: [https://a3152557994-ship-it.github.io/shopify-faq-geo/llms.txt](https://a3152557994-ship-it.github.io/shopify-faq-geo/llms.txt)

## Why Merchants Use It

1. **6-Axis Purchase Friction Radar**: Drop in raw Amazon/AliExpress/Judge.me/Loox review CSVs or plain text. Instantly clusters buyer objections across **Sizing & Compatibility, Shipping & Packaging, Battery & Durability, Returns & Warranty, Material & Safety, and Setup & Usability**.
2. **Objection-Busting Native Copy (EN / DE / JP)**: Synthesizes your exact warranty, dispatch speed, and material specs into natural D2C reassurance Q&As.
3. **Zero-Error `FAQPage` JSON-LD for Google & ChatGPT Shopping**: Structured `https://schema.org/FAQPage` output engineered so AI shopping assistants quote accurate shipping, sizing, and warranty policies.
4. **Drop-In `sections/faq-geo.liquid`**: Paste directly into Shopify Online Store 2.0 (`sections/faq-geo.liquid`) — zero theme bloat, zero `$9.99/mo` recurring app bills.

## Local CLI / ESM Usage

```js
import { PRESET_SAMPLES, generateFaqPack } from "./src/engine.mjs";

const sample = PRESET_SAMPLES["anc-earbuds"];
const pack = generateFaqPack({
  productName: sample.productName,
  sellingPoints: sample.sellingPoints,
  reviewsInput: sample.reviewsCsv,
  productUrl: sample.productUrl,
  locale: "en",
  isPro: true,
});

console.log(pack.rankedCategories[0]); // Top purchase friction cluster
console.log(pack.jsonLd.jsonLdScriptTag); // Valid Schema.org FAQPage JSON-LD
```

## Run Tests

```bash
npm test
```

## Pro Buyout (`$29 / ¥99`)

- Free tier includes real-time 6-axis friction radar + top 3 FAQs + live accordion preview.
- One-time Pro activation (`$29 USD / ¥99 CNY`, offline WebCrypto Ed25519 `OPC1.` license) unlocks all 12 high-converting Q&As, full `sections/faq-geo.liquid` download, and multi-market `EN / DE / JP` export.
- Order & support: `3152557994@qq.com` / `a3152557994@gmail.com`.

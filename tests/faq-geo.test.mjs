import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  PUBLIC_SPKI_BASE64,
  PRODUCT_SLUG,
  FRICTION_CATEGORIES,
  PRESET_SAMPLES,
  parseReviewsInput,
  clusterObjections,
  generateFaqPack,
  verifyLicenseToken,
} from "../src/engine.mjs";
import * as browserEngine from "../docs/engine.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function toBase64Url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function signTestToken(payloadObj, privateKey) {
  const payloadB64 = toBase64Url(Buffer.from(JSON.stringify(payloadObj), "utf8"));
  const sig = crypto.sign(null, Buffer.from(`OPC1.${payloadB64}`, "utf8"), privateKey);
  return `OPC1.${payloadB64}.${toBase64Url(sig)}`;
}

test("src/engine.mjs and docs/engine.js are byte-identical", () => {
  const src = fs.readFileSync(path.join(ROOT, "src", "engine.mjs"), "utf8");
  const docs = fs.readFileSync(path.join(ROOT, "docs", "engine.js"), "utf8");
  assert.equal(src, docs);
  assert.equal(browserEngine.PUBLIC_SPKI_BASE64, PUBLIC_SPKI_BASE64);
  assert.equal(PRODUCT_SLUG, "shopify-faq-geo");
});

test("CSV and multiline plain-text review parsing extracts ratings and text cleanly", () => {
  const csvParsed = parseReviewsInput(PRESET_SAMPLES["anc-earbuds"].reviewsCsv);
  assert.equal(csvParsed.length, 8);
  assert.equal(csvParsed[0].rating, 2);
  assert.match(csvParsed[0].text, /medium tips slipped out/i);

  const plainParsed = parseReviewsInput([
    "[2★] Sleeve ran tight when layering over fleece.",
    "1 star: Box arrived dented and tracking was slow.",
    "- How do I pair two laptops at once?",
  ].join("\n"));
  assert.equal(plainParsed.length, 3);
  assert.equal(plainParsed[0].rating, 2);
  assert.equal(plainParsed[1].rating, 1);
});

test("6-category objection clustering covers all 3 cross-border bestseller presets accurately", () => {
  assert.equal(FRICTION_CATEGORIES.length, 6);

  for (const [key, sample] of Object.entries(PRESET_SAMPLES)) {
    const reviews = parseReviewsInput(sample.reviewsCsv);
    const clustered = clusterObjections(reviews, {
      productName: sample.productName,
      sellingPoints: sample.sellingPoints,
    });

    assert.equal(clustered.radar.length, 6, `Expected 6 radar axes for ${key}`);
    assert.ok(clustered.totalMentions >= 6, `Expected >=6 objection mentions for ${key}`);
    for (const axis of clustered.radar) {
      assert.ok(axis.mentionCount >= 1, `Expected every friction axis represented in ${key}, missing ${axis.id}`);
      assert.ok(axis.intensity >= 18 && axis.intensity <= 100);
    }
  }
});

test("Free vs Pro funnel gating, JSON-LD FAQPage validity, Liquid schema JSON validity, and EN/DE/JP locales", () => {
  const sample = PRESET_SAMPLES["pet-fountain"];

  // 1. Free preview mode
  const freePack = generateFaqPack({
    productName: sample.productName,
    sellingPoints: sample.sellingPoints,
    reviewsInput: sample.reviewsCsv,
    productUrl: sample.productUrl,
    locale: "en",
    isPro: false,
  });

  assert.equal(freePack.totalFaqCount, 12);
  assert.equal(freePack.visibleFaqs.length, 3);
  assert.equal(freePack.lockedTeasers.length, 9);
  assert.equal(freePack.allFaqs, undefined);

  const parsedFreeJsonLd = JSON.parse(freePack.jsonLd.jsonLdString);
  assert.equal(parsedFreeJsonLd["@context"], "https://schema.org");
  assert.equal(parsedFreeJsonLd["@type"], "FAQPage");
  assert.equal(parsedFreeJsonLd.mainEntity.length, 3);

  // 2. Pro mode across EN / DE / JA
  for (const locale of ["en", "de", "ja"]) {
    const proPack = generateFaqPack({
      productName: sample.productName,
      sellingPoints: sample.sellingPoints,
      reviewsInput: sample.reviewsCsv,
      productUrl: sample.productUrl,
      locale,
      isPro: true,
    });

    assert.equal(proPack.visibleFaqs.length, 12);
    assert.equal(proPack.lockedTeasers.length, 0);

    // Validate JSON-LD
    const parsedProJsonLd = JSON.parse(proPack.jsonLd.jsonLdString);
    assert.equal(parsedProJsonLd["@context"], "https://schema.org");
    assert.equal(parsedProJsonLd["@type"], "FAQPage");
    assert.equal(parsedProJsonLd["@id"], `${sample.productUrl}#faq`);
    assert.equal(parsedProJsonLd.mainEntity.length, 12);
    for (const qNode of parsedProJsonLd.mainEntity) {
      assert.equal(qNode["@type"], "Question");
      assert.ok(qNode.name.length > 10);
      assert.equal(qNode.acceptedAnswer["@type"], "Answer");
      assert.ok(qNode.acceptedAnswer.text.length > 20);
    }

    // Validate Shopify Liquid template & embedded {% schema %} JSON
    assert.match(proPack.liquidSection, /id="faq-geo-\{\{ section\.id \}\}"/);
    assert.match(proPack.liquidSection, /"@type": "FAQPage"/);
    const schemaMatch = proPack.liquidSection.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/);
    assert.ok(schemaMatch, `Expected {% schema %} block for locale ${locale}`);
    const liquidSchemaObj = JSON.parse(schemaMatch[1].trim());
    assert.equal(liquidSchemaObj.name, "FAQ + GEO Schema");
    assert.equal(liquidSchemaObj.presets[0].blocks.length, 12);
  }
});

test("Ed25519 OPC1 license verification passes valid, wildcard, mismatch, expired, and tampered cases", async () => {
  const prodSpkiDer = Buffer.from(PUBLIC_SPKI_BASE64, "base64");
  const prodKey = crypto.createPublicKey({ key: prodSpkiDer, format: "der", type: "spki" });
  assert.equal(prodKey.asymmetricKeyType, "ed25519");

  const forged = await verifyLicenseToken("OPC1.eyJ2IjoxLCJwIjoic2hvcGlmeS1mYXEtZ2VvIn0.AAAA");
  assert.equal(forged.valid, false);
  assert.equal(forged.reason, "BAD_SIGNATURE");

  const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
  const testSpkiB64 = publicKey.export({ format: "der", type: "spki" }).toString("base64");
  const nowSec = Math.floor(Date.now() / 1000);

  const validToken = signTestToken(
    { v: 1, p: "shopify-faq-geo", e: "seller@store.example", plan: "lifetime", iat: nowSec, exp: 0 },
    privateKey
  );
  const wildcardToken = signTestToken(
    { v: 1, p: "*", e: "all@store.example", plan: "matrix", iat: nowSec, exp: 0 },
    privateKey
  );
  const mismatchToken = signTestToken(
    { v: 1, p: "silicon-brief", e: "wrong@store.example", iat: nowSec, exp: 0 },
    privateKey
  );
  const expiredToken = signTestToken(
    { v: 1, p: "shopify-faq-geo", e: "old@store.example", iat: nowSec - 3600, exp: nowSec - 10 },
    privateKey
  );

  const okRes = await verifyLicenseToken(validToken, { publicSpkiBase64: testSpkiB64, nowSec });
  assert.equal(okRes.valid, true);
  assert.equal(okRes.payload.p, "shopify-faq-geo");

  const starRes = await verifyLicenseToken(wildcardToken, { publicSpkiBase64: testSpkiB64, nowSec });
  assert.equal(starRes.valid, true);

  const wrongRes = await verifyLicenseToken(mismatchToken, { publicSpkiBase64: testSpkiB64, nowSec });
  assert.equal(wrongRes.valid, false);
  assert.equal(wrongRes.reason, "PRODUCT_MISMATCH");

  const expRes = await verifyLicenseToken(expiredToken, { publicSpkiBase64: testSpkiB64, nowSec });
  assert.equal(expRes.valid, false);
  assert.equal(expRes.reason, "EXPIRED");
});

test("SEO/GEO static files exist and contain zero local machine path leaks", () => {
  for (const rel of ["docs/index.html", "docs/llms.txt", "docs/robots.txt", "docs/sitemap.xml", "README.md"]) {
    const content = fs.readFileSync(path.join(ROOT, rel), "utf8");
    assert.ok(content.length > 50, `Expected non-empty ${rel}`);
    assert.equal(content.includes("/Users/"), false, `Unexpected local path leak in ${rel}`);
  }
});

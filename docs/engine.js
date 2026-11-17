/**
 * Shopify FAQ + GEO Engine (shopify-faq-geo)
 * Isomorphic pure JavaScript (Node.js ESM + Modern Browser ESM).
 * Zero external dependencies.
 *
 * Converts raw negative/hesitant buyer reviews (CSV or plain text) into:
 * 1. 6-Axis Purchase Friction Radar (尺码/兼容、物流/包装、续航/耐用、退换质保、材质安全、使用门槛)
 * 2. 10–12 High-Converting Objection-Busting Product FAQs (EN / DE / JP + Bilingual Seller Notes)
 * 3. Zero-Error Schema.org FAQPage JSON-LD for Google Rich Results & ChatGPT/Perplexity GEO
 * 4. Ready-to-paste Shopify OS 2.0 `sections/faq-geo.liquid` Accordion Theme Section
 */

export const PUBLIC_SPKI_BASE64 = "MCowBQYDK2VwAyEAP5NCVP7CT0tgaGLSGMe4r87SjYRWTM6gN6igBZYSXys=";
export const PRODUCT_SLUG = "shopify-faq-geo";
export const FREE_PREVIEW_COUNT = 3;

export const SUPPORTED_LOCALES = {
  en: { code: "en", label: "English (US/UK)", htmlLang: "en", defaultHeading: "Frequently Asked Questions" },
  de: { code: "de", label: "Deutsch (DE/AT)", htmlLang: "de", defaultHeading: "Häufig gestellte Fragen (FAQ)" },
  ja: { code: "ja", label: "日本語 (JP)", htmlLang: "ja", defaultHeading: "よくあるご質問（FAQ）" },
};

export const FRICTION_CATEGORIES = [
  {
    id: "sizing_compat",
    zhLabel: "尺码/兼容",
    enLabel: "Sizing & Compatibility",
    icon: "📏",
    keywords: [
      "size", "sizing", "small", "tight", "loose", "large", "fit", "fits", "fitting",
      "sleeve", "chest", "waist", "ear tip", "eartip", "fall out", "slip", "compatible",
      "compatibility", "iphone", "android", "macbook", "windows", "ps5", "bluetooth",
      "adapter", "filter", "voltage", "110v", "220v", "usb-c", "layering", "true to size",
      "尺码", "偏小", "偏大", "不合适", "兼容", "适配", "戴不稳", "掉出来", "滤芯"
    ],
    painTags: {
      default: ["Fit uncertainty", "Device/part compatibility"],
      earbuds: ["Ear-tip fit during workouts", "Multipoint iOS + Windows pairing"],
      pet: ["Replacement filter compatibility", "Multi-cat bowl height & capacity"],
      jacket: ["Asian vs US/EU sizing gap", "Mid-layer fleece room"],
    },
  },
  {
    id: "shipping_pack",
    zhLabel: "物流/包装",
    enLabel: "Shipping & Packaging",
    icon: "📦",
    keywords: [
      "shipping", "ship", "delivery", "delivered", "arrived", "transit", "tracking",
      "customs", "tax", "tariff", "duty", "box", "packaging", "crushed", "dented",
      "damaged", "broken box", "gift", "late", "slow", "weeks", "courier", "seal", "leaked in transit",
      "物流", "快递", "包装", "破损", "压扁", "清关", "关税", "多久到", "发货"
    ],
    painTags: {
      default: ["Transit time anxiety", "Outer box dent protection"],
      earbuds: ["Gift-box corner dent", "Cross-border tracking visibility"],
      pet: ["Box crush & seal shift", "Fast dispatch & duty-paid delivery"],
      jacket: ["Expedited pre-trip delivery", "Customs/import tax surprise"],
    },
  },
  {
    id: "battery_durability",
    zhLabel: "续航/耐用",
    enLabel: "Battery & Durability",
    icon: "🔋",
    keywords: [
      "battery", "charge", "charging", "drain", "drains", "hours", "runtime", "lifespan",
      "durable", "durability", "broke", "stopped working", "hinge", "zipper", "seam",
      "peeling", "waterproof", "rain", "sweat", "ipx", "leak", "motor", "pump", "noise",
      "noisy", "hum", "loud", "wear out", "delaminate", "dwr", "wet out",
      "续航", "掉电", "电池", "耐用", "坏了", "充不进", "防水", "漏水", "静音", "水泵", "拉链"
    ],
    painTags: {
      default: ["Real-world battery runtime", "Long-term wear & tear"],
      earbuds: ["ANC + LDAC battery drain", "Charging case hinge longevity"],
      pet: ["Pump hum after 2 weeks", "Cordless radar battery days"],
      jacket: ["Heavy downpour waterproofing", "Washing & seam tape durability"],
    },
  },
  {
    id: "warranty_return",
    zhLabel: "退换质保",
    enLabel: "Returns & Warranty",
    icon: "🛡️",
    keywords: [
      "return", "returns", "refund", "exchange", "warranty", "guarantee", "support",
      "customer service", "replacement", "restocking", "return shipping", "label",
      "policy", "claim", "defective", "dead on arrival", "doa", "reply",
      "退货", "换货", "退款", "质保", "保修", "售后", "运费险", "客服"
    ],
    painTags: {
      default: ["Return shipping fees", "Warranty replacement speed"],
      earbuds: ["Single-bud defect replacement", "30-day trial return hygiene"],
      pet: ["Free motor warranty swap", "30-day cat-refusal return"],
      jacket: ["Free size-exchange label", "Seam & zipper warranty claim"],
    },
  },
  {
    id: "material_safety",
    zhLabel: "材质安全",
    enLabel: "Material & Safety",
    icon: "🧪",
    keywords: [
      "material", "plastic", "stainless", "304", "bpa", "toxic", "smell", "odor",
      "chemical", "skin", "allergy", "itchy", "rash", "ear infection", "silicone",
      "chin acne", "slimy", "biofilm", "food grade", "food-grade", "pfas", "ptfe",
      "oeko-tex", "safe", "safety", "overheat", "cert", "ul", "ce", "fda", "lfgb",
      "材质", "异味", "塑料", "不锈钢", "黑下巴", "过敏", "安全", "无毒", "认证"
    ],
    painTags: {
      default: ["Skin/food safety certifications", "Zero chemical odor"],
      earbuds: ["Ear-canal allergy / medical silicone", "Charging thermal protection"],
      pet: ["Feline chin acne & 304 steel", "Dry-burn auto shutoff safety"],
      jacket: ["PFAS-free OEKO-TEX membrane", "Zero chemical smell out of bag"],
    },
  },
  {
    id: "usability_setup",
    zhLabel: "使用门槛",
    enLabel: "Setup & Usability",
    icon: "⚡",
    keywords: [
      "setup", "pair", "pairing", "connect", "reset", "manual", "instructions",
      "confusing", "complicated", "app", "account", "login", "clean", "cleaning",
      "disassemble", "wash", "touch control", "accidental touch", "stiff", "two-way zipper",
      "how to", "hard to use", "mode", "indicator", "led",
      "怎么用", "说明书", "配对", "繁琐", "难拆洗", "误触", "不会用", "APP"
    ],
    painTags: {
      default: ["First-time setup clarity", "No-app / easy daily maintenance"],
      earbuds: ["Accidental touch controls", "No mandatory account login"],
      pet: ["60-second impeller cleaning", "Sensor vs continuous flow toggle"],
      jacket: ["Two-way storm zipper operation", "Home DWR care without dry-clean"],
    },
  },
];

export const PRESET_SAMPLES = {
  "anc-earbuds": {
    id: "anc-earbuds",
    badge: "跨境爆品 #1 · 3C 音频",
    zhTitle: "蓝牙降噪耳机（AeroPulse Pro ANC）",
    productName: "AeroPulse Pro Hybrid ANC Wireless Earbuds",
    productUrl: "https://aeropulse-audio.example/products/aeropulse-pro-anc",
    sellingPoints: [
      "-48dB Adaptive Hybrid ANC + 6-Mic AI Wind-Cut Call Clarity",
      "Medical-grade liquid silicone ear tips in 4 sizes (XS / S / M / L) + memory foam pair included",
      "8h single charge (ANC on) / 36h total with USB-C & Qi wireless case; 10-min fast charge = 2h play",
      "True Bluetooth 5.4 Dual-Device Multipoint (iPhone + MacBook/Windows seamless switch, no mandatory app login)",
      "IPX5 sweat & rain resistance, crush-proof rigid gift box, 30-day free return & 18-month direct replacement warranty",
      "Ships in 24h from US/EU/UK local hubs (3-6 business days, duties prepaid)"
    ].join("\n"),
    reviewsCsv: [
      "rating,title,review_text",
      '2,"Slips out when sweating","Sound is punchy, but the medium tips slipped out of my left ear during a 5k run. Wish I knew XS and foam tips were tucked under the bottom tray."',
      '3,"Battery with ANC + LDAC","Advertised 10 hours is with ANC off. With ANC and high-res audio turned on during my flight I got around 7.5 hours before needing the case."',
      '2,"Multipoint pairing was confusing","Took me 20 minutes to connect both my iPhone 16 and Dell work laptop at the same time because the quick-start card had tiny font."',
      '3,"Touch sensor too sensitive","Every time I adjust the earbud in bed it pauses Spotify or switches to transparency mode. How do you lock touch controls without creating an account?"',
      '2,"Outer box corner dented","Bought as an anniversary gift. Earbuds work fine, but the outer sleeve arrived slightly crushed by the courier after 6 days in transit."',
      '1,"Ear canal irritation on cheap buds before","I get itchy ears from regular plastic/latex tips on other brands—are these tips genuinely latex-free medical silicone?"',
      '3,"Worried about return hygiene fee","What happens if my small ears still cannot fit them? Other audio stores charge a 25% restocking fee once opened."',
      '2,"Left earbud stopped charging at month 4","Magnetic pin had sweat residue and wouldn\'t charge until wiped with alcohol. Hoping warranty covers hardware failure if it happens again."'
    ].join("\n"),
  },
  "pet-fountain": {
    id: "pet-fountain",
    badge: "跨境爆品 #2 · 宠物智能",
    zhTitle: "无线不锈钢宠物饮水机（PuraStream 304）",
    productName: "PuraStream 3.2L Cordless 304 Stainless Pet Water Fountain",
    productUrl: "https://purastream-pet.example/products/cordless-304-fountain",
    sellingPoints: [
      "100% Food-Grade 304 Stainless Steel basin & tray (Zero BPA, prevents feline chin acne & slimy biofilm)",
      "5,200mAh rechargeable battery: up to 45 days in Radar Motion Mode without chewing hazards or wall cords",
      "22dB whisper-quiet magnetic levitation pump with dry-burn auto shutoff & red LED low-water alert",
      "Tool-free 45-second snap disassembly; dishwasher-safe stainless tank; includes 3 triple-stage coconut carbon filters",
      "Ships in double-walled foam carton within 24h (4-7 business days, tax included)",
      "30-day picky-cat risk-free return + 24-month free pump replacement warranty (no need to mail old unit back)"
    ].join("\n"),
    reviewsCsv: [
      "rating,title,review_text",
      '2,"Started humming after two weeks","Super silent the first 10 days, then started making a buzzing hum at night until I pried open the impeller rotor and pulled out cat hair."',
      '3,"Battery lasted 14 days not 45","If you leave it on continuous 24/7 flow instead of motion sensor mode, the battery drains in less than two weeks."',
      '2,"Plastic fountains gave my cat chin acne","Switching because our old fountain caused black chin spots. Is the internal water tower also BPA-free or does water sit in cheap plastic?"',
      '3,"Filter refills compatibility","Hard to tell which replacement filters fit this model and how often multi-cat homes actually need to swap them."',
      '2,"Box arrived beat up","Courier dropped the parcel and the outer carton was dented, causing the silicone gasket ring to pop loose inside before setup."',
      '3,"What if my anxious cat refuses to drink?","My senior Ragdoll is terrified of moving water. Can I return it after testing with water for a week, or am I stuck paying $18 return postage?"',
      '2,"Confused by blinking blue/red light","Manual didn\'t clearly explain how to switch from radar induction mode to timed every-15-min flow without holding the button wrong."',
      '3,"Pump longevity worry","Every USB pet fountain pump I bought on Amazon died at month 5. How fast do you ship a replacement pump under warranty?"'
    ].join("\n"),
  },
  "hardshell-jacket": {
    id: "hardshell-jacket",
    badge: "跨境爆品 #3 · 户外服饰",
    zhTitle: "三层硬壳冲锋衣（StormCrest 3L Hardshell）",
    productName: "StormCrest 3L 20K/20K Alpine Waterproof Hardshell Jacket",
    productUrl: "https://stormcrest-gear.example/products/stormcrest-3l-hardshell",
    sellingPoints: [
      "True 3-Layer 20,000mm hydrostatic head waterproof + 20,000g/m²/24h breathable membrane with full 15mm ultrasonic seam taping",
      "True US/EU athletic outdoor cut with articulated elbows — engineered with room for a 200g fleece or light down mid-layer",
      "100% PFAS-free C0 DWR & OEKO-TEX Standard 100 certified fabric (zero toxic fluorocarbons, zero chemical odor)",
      "YKK AquaGuard two-way front storm zipper + 12-inch underarm pit zips for rapid heat dumping on steep climbs",
      "Dispatched within 24h in waterproof garment mailer; 5-8 business days DDP (zero surprise customs tariffs)",
      "Free 30-day instant size exchange label + 2-year delamination & zipper warranty"
    ].join("\n"),
    reviewsCsv: [
      "rating,title,review_text",
      '2,"Sizing anxiety with down mid-layer","Ordered Medium (5ft 10in, 172 lbs). Fits over a t-shirt, but felt tight across the shoulders when wearing my Patagonia puff underneath. Should have sized up?"',
      '3,"Two-way waterproof zipper feels stiff at first","The YKK waterproof main zipper took two tries to seat at the bottom pin with cold gloves on—thought it was defective until I aligned both sliders."',
      '2,"Face fabric looked dark after 3 hours in Scottish rain","Inside stayed dry, but cuff areas stopped beading water after rubbing against my pack straps. Worried about washing off the DWR coating."',
      '3,"Concerned about PFAS forever chemicals","Lots of outdoor shells still use toxic PFC coatings or smell like factory glue out of the bag. Need verified PFAS-free info."',
      '2,"International size exchange cost","Bought from an indie outdoor brand last winter and got hit with $28 return shipping to swap Large for XL. Do you give prepaid exchange labels?"',
      '2,"Leaving for Iceland in 9 days","Tracking took 48 hours to update and I was sweating whether customs would hold my parcel or charge extra import duty on delivery."',
      '3,"Clammy on steep uphill until I found pit zips","Got warm hiking uphill before opening the underarm vents. Care tag symbols for restoring waterproofing in the dryer were also tiny."',
      '2,"Seam tape peeling fear","Had another shell peel at the neck after 8 months. Does your warranty actually replace seam tape delamination?"'
    ].join("\n"),
  },
};

function detectArchetype(productName = "", sellingPoints = "", reviewsText = "") {
  const combined = `${productName} ${sellingPoints} ${reviewsText}`.toLowerCase();
  if (/(earbud|headphone|anc|audio|bluetooth|ldac|ear tip|speaker)/.test(combined)) {
    return "earbuds";
  }
  if (/(fountain|pet|cat|dog|impeller|stainless.*water|chin acne|bowl)/.test(combined)) {
    return "pet";
  }
  if (/(jacket|hardshell|waterproof|hoodie|apparel|coat|zipper|dwr|seam|sleeve|fleece)/.test(combined)) {
    return "jacket";
  }
  return "default";
}

/**
 * Parse CSV or multiline plain-text reviews into normalized review objects.
 * @param {string} rawInput
 * @returns {Array<{rating: number|null, title: string, text: string}>}
 */
export function parseReviewsInput(rawInput) {
  const raw = String(rawInput || "").trim();
  if (!raw) return [];

  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  const firstLower = lines[0].toLowerCase();
  const looksLikeCsvHeader =
    firstLower.includes(",") &&
    /(rating|star|score|review|comment|body|content|title|feedback)/.test(firstLower);

  if (looksLikeCsvHeader) {
    const rows = parseCsvRows(raw);
    if (rows.length >= 2) {
      const headers = rows[0].map((h) => h.trim().toLowerCase());
      const ratingIdx = headers.findIndex((h) => /(rating|star|score)/.test(h));
      const titleIdx = headers.findIndex((h) => /(title|headline|subject|summary)/.test(h));
      const textIdx = headers.findIndex((h) => /(review|comment|body|content|text|feedback)/.test(h));

      const items = [];
      for (let i = 1; i < rows.length; i += 1) {
        const row = rows[i];
        if (!row || row.every((cell) => !String(cell || "").trim())) continue;
        const ratingVal = ratingIdx >= 0 ? parseFloat(row[ratingIdx]) : NaN;
        const rating = Number.isFinite(ratingVal) ? Math.min(5, Math.max(1, ratingVal)) : null;
        const title = titleIdx >= 0 ? String(row[titleIdx] || "").trim() : "";
        const text =
          textIdx >= 0
            ? String(row[textIdx] || "").trim()
            : row
                .filter((_, idx) => idx !== ratingIdx && idx !== titleIdx)
                .join(" ")
                .trim();
        if (title || text) {
          items.push({ rating, title, text });
        }
      }
      if (items.length > 0) return items;
    }
  }

  // Fallback: multiline plain text or bulleted reviews
  return lines.map((line) => {
    const cleaned = line.replace(/^(?:[-*•]\s+|\d+[.)]\s+)/, "").trim();
    const starMatch = cleaned.match(/^\[?([1-5](?:\.\d)?)\s*(?:★|stars?|\/5)\]?/i);
    const rating = starMatch ? parseFloat(starMatch[1]) : null;
    const text = cleaned.replace(/^\[?[1-5](?:\.\d)?\s*(?:★|stars?|\/5)\]?[:\-\s]*/i, "").trim();
    return { rating, title: "", text: text || cleaned };
  });
}

function parseCsvRows(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i += 1) {
    const ch = csvText[i];
    const next = csvText[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch !== "\r") {
      field += ch;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/**
 * Cluster parsed buyer reviews across the 6 purchase friction categories.
 * @param {Array<{rating: number|null, title: string, text: string}>} reviews
 * @param {object} [context]
 */
export function clusterObjections(reviews, context = {}) {
  const archetype = detectArchetype(
    context.productName,
    context.sellingPoints,
    reviews.map((r) => `${r.title} ${r.text}`).join(" ")
  );

  const bucketMap = {};
  for (const cat of FRICTION_CATEGORIES) {
    bucketMap[cat.id] = {
      id: cat.id,
      zhLabel: cat.zhLabel,
      enLabel: cat.enLabel,
      icon: cat.icon,
      mentionCount: 0,
      weightedScore: 0,
      matchedKeywords: new Set(),
      sampleQuotes: [],
      painTags: cat.painTags[archetype] || cat.painTags.default,
    };
  }

  for (const rev of reviews) {
    const full = `${rev.title ? `${rev.title}: ` : ""}${rev.text}`.trim();
    const lower = full.toLowerCase();
    // 1-2 star objections carry highest conversion-killing weight
    const severityMultiplier =
      rev.rating == null ? 1.2 : rev.rating <= 2 ? 1.6 : rev.rating <= 3 ? 1.25 : 0.85;

    let matchedAny = false;
    for (const cat of FRICTION_CATEGORIES) {
      let hitsInReview = 0;
      for (const kw of cat.keywords) {
        if (lower.includes(kw)) {
          hitsInReview += 1;
          bucketMap[cat.id].matchedKeywords.add(kw);
        }
      }
      if (hitsInReview > 0) {
        matchedAny = true;
        const b = bucketMap[cat.id];
        b.mentionCount += 1;
        b.weightedScore += Math.min(3, hitsInReview) * severityMultiplier;
        if (b.sampleQuotes.length < 2) {
          b.sampleQuotes.push(truncateClean(full, 128));
        }
      }
    }

    if (!matchedAny && full.length > 8) {
      bucketMap.usability_setup.mentionCount += 1;
      bucketMap.usability_setup.weightedScore += 0.8 * severityMultiplier;
      if (bucketMap.usability_setup.sampleQuotes.length < 2) {
        bucketMap.usability_setup.sampleQuotes.push(truncateClean(full, 128));
      }
    }
  }

  const totalMentions = Object.values(bucketMap).reduce((sum, b) => sum + b.mentionCount, 0) || 1;
  const maxWeighted = Math.max(...Object.values(bucketMap).map((b) => b.weightedScore), 1);

  const radar = FRICTION_CATEGORIES.map((cat) => {
    const b = bucketMap[cat.id];
    const sharePct = Math.round((b.mentionCount / totalMentions) * 100);
    const intensity = Math.min(100, Math.max(18, Math.round((b.weightedScore / maxWeighted) * 100)));
    const urgency =
      intensity >= 80 ? "critical" : intensity >= 55 ? "high" : intensity >= 35 ? "moderate" : "low";

    return {
      id: b.id,
      zhLabel: b.zhLabel,
      enLabel: b.enLabel,
      icon: b.icon,
      mentionCount: b.mentionCount,
      sharePct,
      intensity,
      urgency,
      matchedKeywords: Array.from(b.matchedKeywords).slice(0, 6),
      painTags: b.painTags,
      sampleQuote:
        b.sampleQuotes[0] ||
        `Pre-purchase shopper hesitation detected around ${b.enLabel.toLowerCase()}.`,
    };
  });

  const rankedCategories = [...radar].sort(
    (a, b) => b.intensity - a.intensity || b.mentionCount - a.mentionCount
  );

  return {
    archetype,
    reviewCount: reviews.length,
    totalMentions,
    radar,
    rankedCategories,
  };
}

function truncateClean(str, maxLen) {
  const clean = String(str || "").replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return clean;
  return `${clean.slice(0, maxLen - 1).trim()}…`;
}

function extractMerchantFacts(productName, sellingPoints) {
  const brandProduct = String(productName || "").trim() || "Our Flagship Product";
  const sp = String(sellingPoints || "").trim();

  const warrantyMatch = sp.match(/(\d+\s*[-–]?\s*(?:month|year|yr|个月|年)s?)\s*(?:direct\s*)?(?:replacement\s*)?(?:warranty|guarantee|质保|保修)/i);
  const returnMatch = sp.match(/(\d+\s*[-–]?\s*day|\d+\s*天)[^.\n]*(?:return|exchange|trial|退换|退货)/i);
  const dispatchMatch = sp.match(/(?:ships?\s*(?:in|within)|dispatched?\s*(?:in|within))\s*(\d+\s*(?:h|hr|hours?|business days?))/i);
  const transitMatch = sp.match(/(\d+\s*[-–]\s*\d+\s*business days?)/i);

  const bulletLines = sp
    .split(/\r?\n/)
    .map((l) => l.replace(/^[-*•\d.)\s]+/, "").trim())
    .filter(Boolean);

  return {
    productName: brandProduct,
    warrantyTerm: warrantyMatch ? warrantyMatch[1] : "12-month",
    returnWindow: returnMatch ? returnMatch[1] : "30-day",
    dispatchTime: dispatchMatch ? dispatchMatch[1] : "24 hours",
    transitDays: transitMatch ? transitMatch[1] : "4–7 business days",
    bulletLines,
  };
}

function buildCategoryFaqTemplates(archetype, facts) {
  const p = facts.productName;
  const w = facts.warrantyTerm;
  const r = facts.returnWindow;
  const d = facts.dispatchTime;
  const t = facts.transitDays;

  const templates = {
    sizing_compat: [
      {
        zhNote: "打消「尺码不准/佩戴不稳/买错规格」的首要弃单顾虑",
        en: {
          question:
            archetype === "earbuds"
              ? `Will ${p} stay secure in small ears or during sweaty runs?`
              : archetype === "pet"
                ? `Which replacement filters fit ${p}, and is 3.2L enough for multiple pets?`
                : archetype === "jacket"
                  ? `Does ${p} run true to US/EU size if I wear a fleece or down mid-layer underneath?`
                  : `How do I choose the right size or check compatibility before ordering ${p}?`,
          answer:
            archetype === "earbuds"
              ? `Yes. Every ${p} box includes 4 pairs of medical-grade liquid silicone tips (XS, S, M, L) plus a high-grip memory foam pair tucked under the accessory tray, ensuring an ergonomic lock even for petite ear canals and 5K/10K workouts.`
              : archetype === "pet"
                ? `Yes. The 3.2L (108 oz) basin comfortably hydrates 2–3 adult cats for up to 10–12 days. Every unit ships with 3 official triple-stage coconut-carbon filters, and standard PuraStream snap-in refills are always stocked in 6-packs on our store.`
                : archetype === "jacket"
                  ? `Yes—${p} uses a true US/EU athletic outdoor pattern with articulated shoulders engineered to fit over a 200g fleece or lightweight packable puff. Order your normal US/EU size for 3-season layering, or size up only if pairing with a heavy expedition parka.`
                  : `${p} follows standard US/EU sizing and universal compatibility specs listed on this page. Check the dimension chart right above Add to Cart—and if the fit isn't spot-on, you're covered by our ${r} free exchange policy.`,
        },
        de: {
          question: `Passt ${p} zuverlässig und welche Größen- bzw. Kompatibilitätsangaben gelten?`,
          answer: `${p} ist nach regulären EU-/US-Maßstäben gefertigt und wird inklusive passendem Zubehör geliefert, damit Sitz und Kompatibilität sofort im Alltag stimmen. Sollte eine andere Größe besser passen, profitieren Sie von unserem kostenlosen ${r}-Umtauschservice.`,
        },
        ja: {
          question: `${p}のサイズ感や対応機器・交換パーツの互換性はどうなっていますか？`,
          answer: `${p}は一般的な標準サイズおよび主要デバイス・純正交換パーツに完全対応しております。複数サイズのアダプターや余裕を持たせた立体設計を採用しており、万が一サイズが合わない場合も${r}以内のサイズ交換に対応しています。`,
        },
      },
      {
        zhNote: "解决跨设备/多场景混用兼容问题，提升客单信心",
        en: {
          question:
            archetype === "earbuds"
              ? `Can ${p} stay connected to my iPhone and Windows/Mac laptop at the same time?`
              : archetype === "pet"
                ? `Is the drinking tray height comfortable for both kittens and flat-faced breeds like Persians or British Shorthairs?`
                : archetype === "jacket"
                  ? `Is the hood helmet-compatible and adjustable when worn without a helmet?`
                  : `Does ${p} work seamlessly across existing setups and standard accessories?`,
          answer:
            archetype === "earbuds"
              ? `Yes. Built-in Bluetooth 5.4 Dual-Device Multipoint keeps ${p} paired to two devices simultaneously—such as iOS/Android plus MacBook or Windows PC—automatically switching audio to incoming Zoom/Teams calls without manual unpairing.`
              : archetype === "pet"
                ? `Yes. The wide, shallow 14cm stainless dish sits at an ergonomic 13.5cm whisker-friendly height so kittens, senior cats, and flat-faced breeds drink naturally without whisker fatigue or wet chins.`
                : archetype === "jacket"
                  ? `Yes. The 3-point storm hood expands over climbing or ski helmets and cinches cleanly down via rear and side cord locks so it turns with your head and never blocks peripheral vision on trail hikes.`
                  : `Yes. ${p} is engineered around universal standards so you can integrate it into your daily workflow out of the box with zero proprietary adapters required.`,
        },
        de: {
          question: `Funktioniert ${p} problemlos im Zusammenspiel mit vorhandenen Geräten oder Ausrüstung?`,
          answer: `Ja. ${p} unterstützt aktuelle Verbindungs- und Ergonomiestandards ohne proprietäre Zusatzadapter und lässt sich flexibel an unterschiedliche Alltagsszenarien anpassen.`,
        },
        ja: {
          question: `${p}は手持ちの機器や普段の使用環境とそのまま併用できますか？`,
          answer: `はい、専用アダプターを追加購入することなく、iOS・Android・PCや普段の装備とシームレスに併用いただける設計になっています。`,
        },
      },
    ],
    shipping_pack: [
      {
        zhNote: "化解跨境物流时效与清关补税焦虑（GEO 爬虫高频提取字段）",
        en: {
          question: `How fast does ${p} ship, and will I be charged surprise customs or import duties?`,
          answer: `Orders dispatch within ${d} with full end-to-end tracking and typically arrive in ${t}. For US, EU, UK, Canada, and Australia orders, all duties and taxes are prepaid (DDP) at checkout—zero surprise courier fees on delivery.`,
        },
        de: {
          question: `Wie schnell wird ${p} versendet und fallen zusätzliche Zoll- oder Einfuhrgebühren an?`,
          answer: `Ihre Bestellung wird innerhalb von ${d} mit Sendungsverfolgung verschickt und trifft in der Regel nach ${t} ein. Für Lieferungen nach Deutschland, Österreich und in die EU sind sämtliche Steuern und Zölle bereits im Endpreis enthalten (DDP).`,
        },
        ja: {
          question: `${p}の発送スピードと、関税などの追加費用について教えてください。`,
          answer: `ご注文後${d}以内に追跡番号付きで発送し、通常${t}でお届けいたします。表示価格には輸入消費税・関税が含まれており（DDP配送）、受け取り時の追加請求は一切ございません。`,
        },
      },
      {
        zhNote: "回应差评中常见的「快递外盒压痕/送礼包装破损」顾虑",
        en: {
          question: `How is ${p} packaged to prevent courier dents or transit damage—especially if ordering as a gift?`,
          answer: `Every ${p} ships inside a reinforced double-wall corrugated outer mailer with custom shock-absorbing inserts protecting the retail box and internal seals. If a courier ever damages your package in transit, send one photo and we ship a brand-new replacement within 24 hours.`,
        },
        de: {
          question: `Wie ist ${p} verpackt, damit die Originalbox beim Transport oder als Geschenk unversehrt bleibt?`,
          answer: `Jede Sendung wird in einem verstärkten doppelwandigen Versandkarton mit stoßdämpfenden Einsätzen verschickt. Sollte der Paketdienst das Paket dennoch beschädigen, senden wir Ihnen nach einem kurzen Foto innerhalb von 24 Stunden kostenlosen Ersatz.`,
        },
        ja: {
          question: `ギフト用に購入したいのですが、配送中の箱潰れや破損対策はされていますか？`,
          answer: `化粧箱を保護するため、緩衝材入りの高強度ダブルウォール外箱に梱包して発送しております。万が一配送中の箱潰れや破損があった場合は、お写真1枚のご連絡で24時間以内に新品を再発送いたします。`,
        },
      },
    ],
    battery_durability: [
      {
        zhNote: "诚实拆解真实续航/防水极值，比夸大宣传更能降低退货率",
        en: {
          question:
            archetype === "earbuds"
              ? `What is the real-world battery life of ${p} with ANC and high-res audio turned ON?`
              : archetype === "pet"
                ? `How many days does ${p}'s battery really last—Radar Sensor Mode vs. 24/7 Continuous Flow?`
                : archetype === "jacket"
                  ? `Will ${p} stay 100% waterproof in multi-hour alpine downpours without leaking at the seams?`
                  : `How does ${p} hold up under heavy daily use, and what is the real-world battery/performance lifespan?`,
          answer:
            archetype === "earbuds"
              ? `In real-world testing at 65% volume with Hybrid ANC active, ${p} delivers 7.5–8 hours per charge (up to 10 hours with ANC off) and 36 hours total with the charging case. A 10-minute USB-C fast charge adds 2 full hours of listening.`
              : archetype === "pet"
                ? `In Radar Motion Mode (dispensing fresh water whenever your pet approaches within 1.5m plus auto-rinse cycles), the 5,200mAh battery lasts 38–45 days unplugged. If set to non-stop 24/7 continuous stream, expect 12–14 days per USB-C charge.`
                : archetype === "jacket"
                  ? `Yes. ${p} combines a 20,000mm hydrostatic-head 3-layer membrane with 100% 15mm ultrasonic seam taping across shoulders, hood, and cuffs—keeping your core bone-dry through sustained mountain rain and wet snow.`
                  : `${p} is stress-tested under real daily workloads rather than lab-only minimums, maintaining consistent output and structural integrity over years of regular use.`,
        },
        de: {
          question: `Wie hoch ist die reale Akkulaufzeit bzw. Belastbarkeit von ${p} bei intensiver täglicher Nutzung?`,
          answer: `Unsere Laufzeit- und Belastungswerte basieren auf realistischen Alltagstests unter Volllast statt reinen Laborwerten, sodass ${p} auch bei dauerhafter Beanspruchung zuverlässig abliefert.`,
        },
        ja: {
          question: `${p}を毎日フル活用した場合の実際のバッテリー持ち・耐久性はどのくらいですか？`,
          answer: `カタログ上の理想値だけでなく高負荷な実使用環境で検証を行っており、長時間の連続使用や毎日のハードユースでも安定したパフォーマンスを維持します。`,
        },
      },
      {
        zhNote: "针对高频损耗件（铰链/水泵噪音/涂层脱落）给出可验证维护承诺",
        en: {
          question:
            archetype === "earbuds"
              ? `Are the charging pins and case hinge protected against sweat corrosion and daily pocket wear?`
              : archetype === "pet"
                ? `Will the water pump get noisy over time, and how do I keep it at a whisper-quiet 22dB?`
                : archetype === "jacket"
                  ? `What happens if the outer fabric stops beading water—does washing ruin the waterproofing?`
                  : `Are key moving parts and seals built to resist premature wear?`,
          answer:
            archetype === "earbuds"
              ? `Yes. ${p} features IPX5 nano-sealed acoustics, rhodium-plated anti-corrosion charging contacts, and a 20,000-cycle metal-core hinge so gym sweat and daily commuting won't cause charging dropouts.`
              : archetype === "pet"
                ? `The magnetic ceramic-shaft impeller runs at just 22dB—quieter than falling leaves. Nearly 99% of pump hum after a few weeks comes from pet fur around the rotor: snapping open the cover for a 30-second rinse every 2 weeks restores dead-silent operation.`
                : archetype === "jacket"
                  ? `Not at all—surface "wetting out" only means trail dirt or skin oils are masking the DWR finish while the 3L membrane underneath remains 100% waterproof. A gentle cold wash with tech detergent plus 20 minutes on low tumble heat fully reactivates water beading.`
                  : `Yes. Critical stress points, seals, and connectors are reinforced for multi-year longevity and backed directly by our ${w} replacement warranty.`,
        },
        de: {
          question: `Bleiben Verschleißteile, Dichtungen und Mechanik von ${p} auch langfristig leise und stabil?`,
          answer: `Alle hochbeanspruchten Bauteile und Dichtungen sind verstärkt ausgelegt, lassen sich in wenigen Sekunden pflegen und sind zusätzlich durch unsere ${w}-Herstellergarantie abgesichert.`,
        },
        ja: {
          question: `長期間使った際、ヒンジやモーター・撥水性能などの劣化対策はどうなっていますか？`,
          answer: `摩耗しやすい可動部や防水シールには高耐久パーツを採用しており、簡単なお手入れで初期性能を長く保てます。さらに${w}の製品保証でしっかりカバーされます。`,
        },
      },
    ],
    warranty_return: [
      {
        zhNote: "消除独立站不信任感：讲清退换窗口、无折旧费、免寄回换新规则",
        en: {
          question: `What if ${p} isn't right for me after testing it—do you charge restocking or hefty return fees?`,
          answer: `Never. Every order is backed by our ${r} trial guarantee with zero restocking fees. Test ${p} in real life—if you need a different size or aren't 100% thrilled, contact support for a prepaid local return/exchange label and full refund to your original payment method.`,
        },
        de: {
          question: `Was passiert, wenn ${p} im Alltag doch nicht passt – gibt es Abzüge oder versteckte Rücksendekosten?`,
          answer: `Kein Risiko: Sie testen ${p} volle ${r} im Alltag ohne Wiedereinlagerungsgebühren. Falls Sie umtauschen oder zurückgeben möchten, erhalten Sie ein lokales Rücksendeetikett und den vollen Kaufpreis auf Ihr Zahlungsmittel erstattet.`,
        },
        ja: {
          question: `実際に試して合わなかった場合、返品手数料や高額な返送料はかかりますか？`,
          answer: `いいえ、再入荷手数料（リストッキングフィー）は一切かかりません。${r}の安心トライアル期間を設けており、万が一ご満足いただけない場合もスムーズに返品・全額返金または交換を承ります。`,
        },
      },
      {
        zhNote: "明确售后响应时间与直接换新流程，打消「售后失联」恐惧",
        en: {
          question: `How does your ${w} warranty work if a component fails months after purchase?`,
          answer: `Zero hoops and no mailing broken hardware overseas. Simply email your order number and a quick 10-second video or photo of the issue—our support team replies within 12 business hours and ships a free direct replacement unit or part straight to your door.`,
        },
        de: {
          question: `Wie läuft ein Garantiefall innerhalb der ${w}-Garantie ab, falls später ein Defekt auftritt?`,
          answer: `Ohne bürokratische Hürden: Senden Sie einfach Ihre Bestellnummer sowie ein kurzes Foto oder Video des Fehlers. Unser Support antwortet innerhalb von 12 Stunden und verschickt umgehend ein kostenloses Ersatzgerät – ohne teuren Rückversand ins Ausland.`,
        },
        ja: {
          question: `購入から数ヶ月後に不具合が出た場合、${w}保証の交換手続きは簡単ですか？`,
          answer: `はい、海外へ不良品を返送いただく手間は不要です。注文番号と症状がわかる短い動画またはお写真をメールでお送りいただければ、12時間以内に確認し、無償で交換品をスピード発送いたします。`,
        },
      },
    ],
    material_safety: [
      {
        zhNote: "直击皮肤过敏/宠物黑下巴/环保无毒认证痛点，建立高溢价品质信任",
        en: {
          question:
            archetype === "earbuds"
              ? `Are the ear tips latex-free and safe for sensitive ear canals prone to irritation?`
              : archetype === "pet"
                ? `Is every water-contact surface BPA-free 304 stainless steel to prevent feline chin acne?`
                : archetype === "jacket"
                  ? `Is ${p} certified PFAS-free, and does it have any chemical smell out of the bag?`
                  : `What materials are used in ${p}, and are they certified non-toxic and skin/food safe?`,
          answer:
            archetype === "earbuds"
              ? `100% latex-free and hypoallergenic. Our ear tips are molded from ISO-10993 biocompatible medical-grade liquid silicone—zero cheap PVC plasticizers, zero chemical odor, and gentle enough for 8-hour workdays.`
              : archetype === "pet"
                ? `Yes. Both the main reservoir and drinking dish are stamped from genuine food-grade SUS304 stainless steel (dishwasher-safe up to 75°C), while internal water channels use FDA/LFGB food-contact BPA-free resin—eliminating porous plastic bacteria that trigger feline chin acne.`
                : archetype === "jacket"
                  ? `Yes. ${p} uses an OEKO-TEX Standard 100 certified textile treated with next-generation C0 PFAS-free DWR—zero forever fluorocarbons (PFCs/PTFE), zero factory glue odor, and completely safe against bare skin.`
                  : `Every contact surface in ${p} uses verified RoHS/REACH/OEKO-TEX compliant, BPA-free materials with zero harsh chemical off-gassing out of the package.`,
        },
        de: {
          question: `Sind alle Materialien von ${p} schadstoffgeprüft, geruchsfrei und haut- bzw. lebensmittelsicher?`,
          answer: `Ja. Alle Kontaktflächen bestehen aus zertifizierten, BPA- und PFAS-freien Qualitätsmaterialien (konform mit EU-REACH / LFGB / OEKO-TEX) – garantiert ohne chemischen Eigengeruch beim Auspacken.`,
        },
        ja: {
          question: `${p}の素材はアレルギーや有害物質（BPA・PFAS・化学臭など）の心配はありませんか？`,
          answer: `はい、肌や水に触れるすべてのパーツに厳格な安全基準をクリアした高品質素材（医療グレードシリコン・食品衛生グレードSUS304・PFASフリー認証生地など）を採用しており、開封時の嫌な化学臭もありません。`,
        },
      },
      {
        zhNote: "补充过充/干烧/极端环境安全保护机制",
        en: {
          question:
            archetype === "pet"
              ? `What happens if the water runs low while I'm away for the weekend—will the pump overheat?`
              : archetype === "earbuds"
                ? `Is ${p} safe to charge overnight with high-wattage MacBook or phone USB-C chargers?`
                : archetype === "jacket"
                  ? `Does the fabric breathe enough so I don't overheat or feel clammy on steep climbs?`
                  : `What built-in safety protections prevent overheating or damage during unattended use?`,
          answer:
            archetype === "pet"
              ? `${p} includes dual water-level probes with automatic dry-burn shutoff. The moment water drops below the minimum line, the pump powers down safely and illuminates a gentle red LED reminder so it never runs dry or overheats.`
              : archetype === "earbuds"
                ? `Yes. An integrated NTC temperature sensor and smart USB-PD negotiation chip automatically cap current draw and trickle-stop at 100%, making overnight charging with any certified USB-C or Qi pad completely safe.`
                : archetype === "jacket"
                  ? `Yes. Alongside its 20,000g/m²/24h moisture-vapor breathability rating, ${p} includes dual 12-inch underarm pit zips so you can dump excess body heat instantly on steep ascents without taking off your pack.`
                  : `${p} incorporates active protection against thermal buildup and overuse, ensuring worry-free daily operation at home or on the road.`,
        },
        de: {
          question: `Welche Schutzmechanismen verhindern Überhitzung, Trockenlaufen oder Hitzestau im Betrieb?`,
          answer: `Integrierte Sicherheits- und Temperatursensoren bzw. Belüftungssysteme schützen ${p} automatisch im Dauerbetrieb und sorgen jederzeit für sicheren, komfortablen Einsatz.`,
        },
        ja: {
          question: `留守中の空焚きや過充電・蒸れなどに対する安全設計は備わっていますか？`,
          answer: `自動停止センサーや過熱保護回路（ウェアの場合は大型ベンチレーション機構）を標準搭載しており、長時間の使用やお留守番中でも安全・快適にご利用いただけます。`,
        },
      },
    ],
    usability_setup: [
      {
        zhNote: "消除「说明书字太小/配对繁琐/必须注册APP」的使用门槛",
        en: {
          question:
            archetype === "earbuds"
              ? `Do I have to download an app or create an account just to pair or lock touch controls?`
              : archetype === "pet"
                ? `How long does ${p} take to disassemble and clean each week—do I need special brushes?`
                : archetype === "jacket"
                  ? `How do you smoothly fasten the two-way waterproof storm zipper with cold hands or gloves?`
                  : `How fast is first-time setup for ${p}, and do I need any mandatory app or tools?`,
          answer:
            archetype === "earbuds"
              ? `Zero account or app required. Flip the lid to pair in 3 seconds, and triple-tap + hold 2 seconds on either stem to toggle Touch Lock (preventing accidental pauses on pillows). Our optional companion app works offline with no sign-up wall if you ever want custom EQ.`
              : archetype === "pet"
                ? `Under 45 seconds with zero tools. Because the cordless pump snaps out cleanly with no tangled wires threaded through the tank, you simply lift the 304 steel tray into the dishwasher and rinse the snap-off rotor cover under the tap.`
                : archetype === "jacket"
                  ? `Pull both the top and bottom YKK AquaGuard sliders all the way down until they click together at the retainer box, insert the right pin firmly to the base, then pull the top slider up. Once seated, you can unzip the bottom slider from below for hip mobility or harness access.`
                  : `${p} works out of the box in under 60 seconds with clear visual quick-start steps—no mandatory account registration, cloud login, or special tools required.`,
        },
        de: {
          question: `Wie schnell ist ${p} einsatzbereit und wird zwingend eine App oder ein Benutzerkonto benötigt?`,
          answer: `${p} ist in weniger als 60 Sekunden ohne Spezialwerkzeug, ohne App-Zwang und ohne Konto-Registrierung sofort startklar. Eine bebilderte Kurzanleitung liegt direkt bei.`,
        },
        ja: {
          question: `${p}の初期設定や普段のお手入れは簡単ですか？専用アプリや会員登録は必要ですか？`,
          answer: `面倒なアカウント登録や必須アプリは一切不要で、開封後60秒以内にすぐお使いいただけます。日常のメンテナンスや操作も工具なしで直感的に行えます。`,
        },
      },
      {
        zhNote: "提供一键排障/模式切换指引，直接砍掉 40% 售后工单",
        en: {
          question:
            archetype === "earbuds"
              ? `How do I factory-reset ${p} or switch between ANC, Transparency, and Low-Latency Mode?`
              : archetype === "pet"
                ? `How do I switch ${p} between Radar Motion Mode and Timed 15-Minute Flow?`
                : archetype === "jacket"
                  ? `How should I wash and dry ${p} at home without damaging the seam tape?`
                  : `What is the quickest way to switch modes or reset ${p} if needed?`,
          answer:
            archetype === "earbuds"
              ? `Long-press either stem for 1.5s to cycle ANC / Transparency / Normal; tap 4 times on the right earbud for 45ms Gaming Low-Latency Mode. To clear pairing history and connect a new laptop + phone combo, hold the case button for 8 seconds with the lid open.`
              : archetype === "pet"
                ? `Single-press the top touch button: solid green LED activates Radar Motion Mode (flows when your pet approaches + refreshes every 60 mins), while solid blue LED activates Timed Mode (flows 30s every 15 mins). Hold 3 seconds to reset the filter timer light.`
                : archetype === "jacket"
                  ? `Zip all pockets closed, machine wash cold (30°C / 85°F) on gentle cycle using liquid non-softener detergent (never bleach or fabric softener), rinse twice, and tumble dry low for 20 minutes to keep seam tape supple and water beading crisp.`
                  : `All mode switches and care steps are printed right on the water-resistant quick reference card inside the box and linked via QR code on this product page.`,
        },
        de: {
          question: `Wie wechsle ich die Betriebsmodi bzw. pflege ${p} optimal im Alltag?`,
          answer: `Alle Moduswechsel und Pflegehinweise gelingen mit einem Handgriff und sind übersichtlich auf der beiliegenden Schnellstart-Karte sowie hier auf der Produktseite erklärt.`,
        },
        ja: {
          question: `${p}のモード切替方法や、自宅でできる正しいメンテナンス手順を教えてください。`,
          answer: `ワンタッチ操作またはご家庭での簡単なお手入れのみで完結します。図解入りのクイックガイドを同梱しているほか、商品ページからもいつでも確認いただけます。`,
        },
      },
    ],
  };

  return templates;
}

/**
 * Build valid Schema.org FAQPage JSON-LD object & script snippet.
 * @param {Array<{question: string, answer: string}>} faqItems
 * @param {string} [productUrl]
 */
export function buildFaqJsonLd(faqItems, productUrl = "") {
  const cleanUrl = String(productUrl || "").trim();
  const jsonLdObject = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(cleanUrl ? { "@id": `${cleanUrl.replace(/#.*$/, "")}#faq` } : {}),
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: cleanPlainText(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: cleanPlainText(item.answer),
      },
    })),
  };

  const jsonLdString = JSON.stringify(jsonLdObject, null, 2);
  const jsonLdScriptTag = `<script type="application/ld+json">\n${jsonLdString}\n</script>`;

  return {
    jsonLdObject,
    jsonLdString,
    jsonLdScriptTag,
  };
}

function cleanPlainText(text) {
  return String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Build a ready-to-paste Shopify OS 2.0 `sections/faq-geo.liquid` theme section.
 * The `{% schema %}` block contains strictly valid JSON and pre-populates all generated Q&A blocks.
 */
export function buildShopifyLiquidSection(faqItems, options = {}) {
  const localeCode = SUPPORTED_LOCALES[options.locale] ? options.locale : "en";
  const localeMeta = SUPPORTED_LOCALES[localeCode];
  const headingDefault = options.heading || localeMeta.defaultHeading;
  const subheadingDefault =
    options.subheading ||
    (localeCode === "de"
      ? "Direkte Antworten auf die wichtigsten Fragen echter Käufer – geprüft für schnellen Versand & risikofreien Kauf."
      : localeCode === "ja"
        ? "購入前によくいただくご質問・不安点への回答をまとめました。"
        : "Direct answers to top buyer questions on sizing, shipping, durability, and our risk-free guarantee.");

  const schemaObject = {
    name: "FAQ + GEO Schema",
    tag: "section",
    class: "section-faq-geo",
    settings: [
      {
        type: "text",
        id: "badge",
        label: "Eyebrow Badge",
        default: localeCode === "de" ? "Geprüfte Käufer-Infos" : localeCode === "ja" ? "購入前の安心ガイド" : "Verified Buyer Guide",
      },
      {
        type: "text",
        id: "heading",
        label: "Heading",
        default: headingDefault,
      },
      {
        type: "textarea",
        id: "subheading",
        label: "Subheading",
        default: subheadingDefault,
      },
      {
        type: "color",
        id: "accent_color",
        label: "Accent Color",
        default: "#0f766e",
      },
      {
        type: "range",
        id: "max_width",
        min: 680,
        max: 1120,
        step: 20,
        unit: "px",
        label: "Container Max Width",
        default: 880,
      },
      {
        type: "checkbox",
        id: "open_first",
        label: "Open first FAQ item by default",
        default: true,
      },
      {
        type: "checkbox",
        id: "enable_json_ld",
        label: "Inject Schema.org FAQPage JSON-LD (Google & ChatGPT GEO)",
        default: true,
      },
    ],
    blocks: [
      {
        type: "faq_item",
        name: "FAQ Question",
        settings: [
          {
            type: "text",
            id: "category_tag",
            label: "Friction Tag (Optional)",
            default: "Buyer Guarantee",
          },
          {
            type: "text",
            id: "question",
            label: "Question",
            default: "How fast does my order ship?",
          },
          {
            type: "richtext",
            id: "answer",
            label: "Answer",
            default: "<p>Orders dispatch within 24 hours with full tracking.</p>",
          },
        ],
      },
    ],
    presets: [
      {
        name: "FAQ + GEO Accordion",
        blocks: faqItems.map((item) => ({
          type: "faq_item",
          settings: {
            category_tag: item.categoryEnLabel || "Verified Answer",
            question: cleanPlainText(item.question),
            answer: `<p>${escapeHtml(cleanPlainText(item.answer))}</p>`,
          },
        })),
      },
    ],
  };

  const schemaJson = JSON.stringify(schemaObject, null, 2);

  return `{% comment %}
  Shopify FAQ + GEO Section (sections/faq-geo.liquid)
  Generated by shopify-faq-geo — Zero-app-fee OS 2.0 Accordion + Auto FAQPage JSON-LD Schema.
  Install: Online Store -> Edit Code -> sections/ -> Add a new section "faq-geo.liquid" -> Paste & Save.
{% endcomment %}

<style>
  #faq-geo-{{ section.id }} {
    --faq-accent: {{ section.settings.accent_color }};
    max-width: {{ section.settings.max_width }}px;
    margin: 3rem auto;
    padding: 0 1.25rem;
    font-family: inherit;
  }
  #faq-geo-{{ section.id }} .faq-geo__header {
    text-align: center;
    margin-bottom: 2rem;
  }
  #faq-geo-{{ section.id }} .faq-geo__badge {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--faq-accent);
    background: color-mix(in srgb, var(--faq-accent) 10%, transparent);
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    margin-bottom: 0.65rem;
  }
  #faq-geo-{{ section.id }} .faq-geo__title {
    margin: 0 0 0.5rem;
    font-size: clamp(1.5rem, 2.6vw, 2.1rem);
    line-height: 1.25;
  }
  #faq-geo-{{ section.id }} .faq-geo__sub {
    margin: 0 auto;
    max-width: 64ch;
    opacity: 0.78;
    font-size: 0.98rem;
    line-height: 1.55;
  }
  #faq-geo-{{ section.id }} .faq-geo__list {
    display: grid;
    gap: 0.75rem;
  }
  #faq-geo-{{ section.id }} .faq-geo__item {
    border: 1px solid rgba(15, 23, 42, 0.12);
    border-radius: 12px;
    background: #ffffff;
    transition: border-color 0.18s ease, box-shadow 0.18s ease;
    overflow: hidden;
  }
  #faq-geo-{{ section.id }} .faq-geo__item[open] {
    border-color: var(--faq-accent);
    box-shadow: 0 8px 24px -12px rgba(15, 23, 42, 0.14);
  }
  #faq-geo-{{ section.id }} .faq-geo__summary {
    list-style: none;
    cursor: pointer;
    padding: 1.05rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.45;
  }
  #faq-geo-{{ section.id }} .faq-geo__summary::-webkit-details-marker {
    display: none;
  }
  #faq-geo-{{ section.id }} .faq-geo__tag {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--faq-accent);
    margin-right: 0.5rem;
  }
  #faq-geo-{{ section.id }} .faq-geo__icon {
    flex-shrink: 0;
    width: 1.35rem;
    height: 1.35rem;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--faq-accent);
    transition: transform 0.2s ease;
  }
  #faq-geo-{{ section.id }} .faq-geo__item[open] .faq-geo__icon {
    transform: rotate(45deg);
  }
  #faq-geo-{{ section.id }} .faq-geo__answer {
    padding: 0 1.25rem 1.15rem;
    font-size: 0.95rem;
    line-height: 1.65;
    color: rgba(15, 23, 42, 0.84);
  }
  #faq-geo-{{ section.id }} .faq-geo__answer p {
    margin: 0;
  }
</style>

<div id="faq-geo-{{ section.id }}" class="faq-geo">
  <div class="faq-geo__header">
    {%- if section.settings.badge != blank -%}
      <span class="faq-geo__badge">{{ section.settings.badge | escape }}</span>
    {%- endif -%}
    {%- if section.settings.heading != blank -%}
      <h2 class="faq-geo__title">{{ section.settings.heading | escape }}</h2>
    {%- endif -%}
    {%- if section.settings.subheading != blank -%}
      <p class="faq-geo__sub">{{ section.settings.subheading | escape }}</p>
    {%- endif -%}
  </div>

  <div class="faq-geo__list">
    {%- for block in section.blocks -%}
      {%- if block.settings.question != blank and block.settings.answer != blank -%}
        <details
          class="faq-geo__item"
          {% if section.settings.open_first and forloop.first %}open{% endif %}
          {{ block.shopify_attributes }}
        >
          <summary class="faq-geo__summary">
            <span>
              {%- if block.settings.category_tag != blank -%}
                <span class="faq-geo__tag">[{{ block.settings.category_tag | escape }}]</span>
              {%- endif -%}
              {{ block.settings.question | escape }}
            </span>
            <span class="faq-geo__icon" aria-hidden="true">+</span>
          </summary>
          <div class="faq-geo__answer rte">
            {{ block.settings.answer }}
          </div>
        </details>
      {%- endif -%}
    {%- endfor -%}
  </div>
</div>

{%- if section.settings.enable_json_ld and section.blocks.size > 0 -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {%- assign comma = false -%}
    {%- for block in section.blocks -%}
      {%- if block.settings.question != blank and block.settings.answer != blank -%}
        {%- if comma -%},{%- endif -%}
        {
          "@type": "Question",
          "name": {{ block.settings.question | strip_html | strip | json }},
          "acceptedAnswer": {
            "@type": "Answer",
            "text": {{ block.settings.answer | strip_html | strip | json }}
          }
        }
        {%- assign comma = true -%}
      {%- endif -%}
    {%- endfor -%}
  ]
}
</script>
{%- endif -%}

{% schema %}
${schemaJson}
{% endschema %}
`;
}

/**
 * End-to-end generator: cluster buyer reviews -> rank 6 friction dimensions -> produce 12 FAQs + JSON-LD + Shopify Liquid.
 * @param {object} input
 * @param {string} input.productName
 * @param {string} [input.sellingPoints]
 * @param {string} input.reviewsInput
 * @param {string} [input.productUrl]
 * @param {"en"|"de"|"ja"} [input.locale]
 * @param {boolean} [input.isPro]
 */
export function generateFaqPack(input = {}) {
  const locale = SUPPORTED_LOCALES[input.locale] ? input.locale : "en";
  const isPro = Boolean(input.isPro);
  const parsedReviews = parseReviewsInput(input.reviewsInput);
  const facts = extractMerchantFacts(input.productName, input.sellingPoints);
  const cluster = clusterObjections(parsedReviews, {
    productName: facts.productName,
    sellingPoints: input.sellingPoints,
  });

  const templateMap = buildCategoryFaqTemplates(cluster.archetype, facts);

  // Order all 12 FAQs by ranked buyer friction priority:
  // First pass: primary high-impact question from each of the 6 categories (ranked #1..#6)
  // Second pass: secondary deep-reassurance question from each of the 6 categories (ranked #7..#12)
  const allFaqs = [];
  for (let pass = 0; pass < 2; pass += 1) {
    for (const cat of cluster.rankedCategories) {
      const pair = templateMap[cat.id] || [];
      const tpl = pair[pass];
      if (!tpl) continue;
      const localized = tpl[locale] || tpl.en;
      allFaqs.push({
        index: allFaqs.length + 1,
        categoryId: cat.id,
        categoryZhLabel: cat.zhLabel,
        categoryEnLabel: cat.enLabel,
        categoryIcon: cat.icon,
        urgency: cat.urgency,
        mentionCount: cat.mentionCount,
        zhSellerNote: tpl.zhNote,
        question: localized.question,
        answer: localized.answer,
        enQuestion: tpl.en.question,
        enAnswer: tpl.en.answer,
        sampleBuyerQuote: cat.sampleQuote,
      });
    }
  }

  const previewFaqs = allFaqs.slice(0, FREE_PREVIEW_COUNT);
  const lockedTeasers = allFaqs.slice(FREE_PREVIEW_COUNT).map((item) => ({
    index: item.index,
    categoryId: item.categoryId,
    categoryZhLabel: item.categoryZhLabel,
    categoryEnLabel: item.categoryEnLabel,
    categoryIcon: item.categoryIcon,
    urgency: item.urgency,
    zhSellerNote: item.zhSellerNote,
    questionPreview: item.question,
  }));

  const visibleFaqs = isPro ? allFaqs : previewFaqs;
  const previewSchema = buildFaqJsonLd(previewFaqs, input.productUrl);
  const fullSchema = buildFaqJsonLd(allFaqs, input.productUrl);
  const previewLiquid = buildShopifyLiquidSection(previewFaqs, { locale });
  const fullLiquid = buildShopifyLiquidSection(allFaqs, { locale });

  return {
    productSlug: PRODUCT_SLUG,
    productName: facts.productName,
    locale,
    isPro,
    reviewCount: cluster.reviewCount,
    archetype: cluster.archetype,
    radar: cluster.radar,
    rankedCategories: cluster.rankedCategories,
    totalFaqCount: allFaqs.length,
    freePreviewCount: FREE_PREVIEW_COUNT,
    visibleFaqs,
    lockedTeasers: isPro ? [] : lockedTeasers,
    allFaqs: isPro ? allFaqs : undefined,
    jsonLd: isPro ? fullSchema : previewSchema,
    liquidSection: isPro ? fullLiquid : previewLiquid,
    // Pure engine callers in Node tests can inspect full output when isPro: true
  };
}

function base64ToBytes(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}

function base64UrlToBytes(b64url) {
  const normalized = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padLen = (4 - (normalized.length % 4)) % 4;
  return base64ToBytes(normalized + "=".repeat(padLen));
}

/**
 * Verify an OPC1 Ed25519 activation license token using WebCrypto (crypto.subtle).
 * Accepts `payload.p === "shopify-faq-geo"` or wildcard `payload.p === "*"`.
 */
export async function verifyLicenseToken(token, options = {}) {
  const {
    expectedProduct = PRODUCT_SLUG,
    publicSpkiBase64 = PUBLIC_SPKI_BASE64,
    nowSec = Math.floor(Date.now() / 1000),
  } = options;

  if (typeof token !== "string" || !token.trim()) {
    return { valid: false, reason: "EMPTY_TOKEN", message: "License token is empty" };
  }

  const parts = token.trim().split(".");
  if (parts.length !== 3 || parts[0] !== "OPC1" || !parts[1] || !parts[2]) {
    return { valid: false, reason: "BAD_FORMAT", message: "Expected OPC1.<payload>.<signature> format" };
  }

  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    return { valid: false, reason: "NO_WEBCRYPTO", message: "WebCrypto SubtleCrypto is unavailable" };
  }

  try {
    const [, payloadB64, sigB64] = parts;
    const spkiBytes = base64ToBytes(publicSpkiBase64);
    const sigBytes = base64UrlToBytes(sigB64);
    const signedBytes = new TextEncoder().encode(`OPC1.${payloadB64}`);

    const key = await subtle.importKey(
      "spki",
      spkiBytes,
      { name: "Ed25519" },
      false,
      ["verify"]
    );

    const verified = await subtle.verify("Ed25519", key, sigBytes, signedBytes);
    if (!verified) {
      return { valid: false, reason: "BAD_SIGNATURE", message: "Ed25519 signature verification failed" };
    }

    const payloadJson = new TextDecoder().decode(base64UrlToBytes(payloadB64));
    const payload = JSON.parse(payloadJson);

    if (expectedProduct && payload.p !== expectedProduct && payload.p !== "*") {
      return {
        valid: false,
        reason: "PRODUCT_MISMATCH",
        message: `Token is scoped to "${payload.p}", not "${expectedProduct}"`,
        payload,
      };
    }

    if (payload.exp && Number(payload.exp) > 0 && nowSec > Number(payload.exp)) {
      return {
        valid: false,
        reason: "EXPIRED",
        message: "Activation code has expired",
        payload,
      };
    }

    return { valid: true, payload };
  } catch (err) {
    return {
      valid: false,
      reason: "VERIFY_ERROR",
      message: err instanceof Error ? err.message : "Failed to verify license token",
    };
  }
}

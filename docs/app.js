import {
  PRESET_SAMPLES,
  SUPPORTED_LOCALES,
  generateFaqPack,
  verifyLicenseToken,
} from "./engine.js";

const STORAGE_KEY = "opc_license_shopify_faq_geo_v1";
const GLOBAL_WILDCARD_KEY = "opc_global_license_v1";

const state = {
  presetId: "anc-earbuds",
  locale: "en",
  activeTab: "preview",
  isPro: false,
  licensePayload: null,
  lastReport: null,
};

const els = {
  presetButtons: document.querySelectorAll("[data-preset]"),
  productName: document.getElementById("productName"),
  productUrl: document.getElementById("productUrl"),
  sellingPoints: document.getElementById("sellingPoints"),
  reviewsInput: document.getElementById("reviewsInput"),
  csvUpload: document.getElementById("csvUpload"),
  generateBtn: document.getElementById("generateBtn"),
  radarSvgWrap: document.getElementById("radarSvgWrap"),
  radarBars: document.getElementById("radarBars"),
  reviewSummaryBadge: document.getElementById("reviewSummaryBadge"),
  tabButtons: document.querySelectorAll("[data-tab]"),
  localeButtons: document.querySelectorAll("[data-locale]"),
  tabContent: document.getElementById("tabContent"),
  actionBar: document.getElementById("actionBar"),
  licenseInput: document.getElementById("licenseInput"),
  activateBtn: document.getElementById("activateBtn"),
  licenseStatus: document.getElementById("licenseStatus"),
  proBadgeTop: document.getElementById("proBadgeTop"),
};

function loadPreset(presetId) {
  const sample = PRESET_SAMPLES[presetId];
  if (!sample) return;
  state.presetId = presetId;
  els.productName.value = sample.productName;
  els.productUrl.value = sample.productUrl;
  els.sellingPoints.value = sample.sellingPoints;
  els.reviewsInput.value = sample.reviewsCsv;

  els.presetButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.preset === presetId);
  });
  runGenerator();
}

function renderRadarHexagon(radar) {
  const size = 210;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 74;

  const angleFor = (idx) => -Math.PI / 2 + (idx * 2 * Math.PI) / 6;

  const rings = [0.33, 0.66, 1].map((scale) => {
    const pts = radar
      .map((_, i) => {
        const a = angleFor(i);
        return `${(cx + Math.cos(a) * maxR * scale).toFixed(1)},${(cy + Math.sin(a) * maxR * scale).toFixed(1)}`;
      })
      .join(" ");
    return `<polygon points="${pts}" fill="none" stroke="#cbd5e1" stroke-width="1" />`;
  });

  const dataPts = radar
    .map((item, i) => {
      const r = (Math.max(18, item.intensity) / 100) * maxR;
      const a = angleFor(i);
      return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
    })
    .join(" ");

  const labels = radar
    .map((item, i) => {
      const a = angleFor(i);
      const lx = cx + Math.cos(a) * (maxR + 22);
      const ly = cy + Math.sin(a) * (maxR + 18);
      return `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="10.5" font-weight="600" fill="#334155">${item.zhLabel}</text>`;
    })
    .join("");

  els.radarSvgWrap.innerHTML = `
    <svg viewBox="0 0 ${size} ${size}" width="100%" height="210" role="img" aria-label="6-Axis Buyer Objection Radar">
      ${rings.join("")}
      <polygon points="${dataPts}" fill="rgba(15, 118, 110, 0.22)" stroke="#0f766e" stroke-width="2.2" />
      ${labels}
    </svg>
  `;
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderRadarList(report) {
  els.reviewSummaryBadge.textContent = `已扫描 ${report.reviewCount} 条评论 · 生成 ${report.totalFaqCount} 条高转化 Q&A`;
  renderRadarHexagon(report.radar);

  els.radarBars.innerHTML = report.rankedCategories
    .map(
      (c) => `
      <div class="radar-row">
        <div class="radar-row-top">
          <span>${c.icon} ${escapeHtml(c.zhLabel)} (${escapeHtml(c.enLabel)})</span>
          <span>阻力指数 ${c.intensity}% · 提及 ${c.mentionCount} 次</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill ${c.urgency}" style="width:${c.intensity}%"></div>
        </div>
        <div class="quote-caption">买家原声：“${escapeHtml(c.sampleQuote)}”</div>
      </div>
    `
    )
    .join("");
}

function renderMainOutput(report) {
  // Action buttons
  els.actionBar.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.9rem;">
      <button class="btn-secondary" id="copyJsonLdBtn">复制 FAQPage JSON-LD (${report.visibleFaqs.length} 条)</button>
      <button class="btn-secondary" id="downloadLiquidBtn">
        ${report.isPro ? "⬇️ 下载完整 sections/faq-geo.liquid (12 条)" : "🔒 下载完整 faq-geo.liquid (Pro 解锁 12 条)"}
      </button>
    </div>
  `;

  document.getElementById("copyJsonLdBtn")?.addEventListener("click", async () => {
    await navigator.clipboard.writeText(report.jsonLd.jsonLdScriptTag);
    const btn = document.getElementById("copyJsonLdBtn");
    btn.textContent = "✅ 已复制 JSON-LD Script 标签！";
    setTimeout(() => {
      btn.textContent = `复制 FAQPage JSON-LD (${report.visibleFaqs.length} 条)`;
    }, 1800);
  });

  document.getElementById("downloadLiquidBtn")?.addEventListener("click", () => {
    if (!report.isPro) {
      openCheckoutModal();
      return;
    }
    const blob = new Blob([report.liquidSection], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `faq-geo-${report.locale}.liquid`;
    a.click();
    URL.revokeObjectURL(url);
  });

  if (state.activeTab === "jsonld") {
    els.tabContent.innerHTML = `
      <p style="margin:0 0 0.6rem;font-size:0.84rem;color:#475569;">
        零语法报错 Schema.org <code>FAQPage</code> 结构化代码（可直接粘贴至商品模板或随 <code>faq-geo.liquid</code> 自动注入，喂给 Google 富结果与 ChatGPT Shopping）：
      </p>
      <pre class="code-box">${escapeHtml(report.jsonLd.jsonLdScriptTag)}</pre>
    `;
    return;
  }

  if (state.activeTab === "liquid") {
    els.tabContent.innerHTML = `
      <p style="margin:0 0 0.6rem;font-size:0.84rem;color:#475569;">
        Shopify Online Store 2.0 原生手风琴组件（保存为 <code>sections/faq-geo.liquid</code>，无需月租插件，自带 <code>strip_html | json</code> 防崩 Schema）：
      </p>
      <pre class="code-box">${escapeHtml(report.liquidSection)}</pre>
    `;
    return;
  }

  // Default: Storefront Accordion Preview
  const visibleHtml = report.visibleFaqs
    .map(
      (item, idx) => `
      <details class="faq-item" ${idx === 0 ? "open" : ""}>
        <summary>
          <div style="flex:1">
            <div class="faq-meta">
              <span class="badge-cat">${item.categoryIcon} #${item.index} ${escapeHtml(item.categoryZhLabel)}</span>
              <span class="badge-note">💡 转化策略：${escapeHtml(item.zhSellerNote)}</span>
            </div>
            <div>${escapeHtml(item.question)}</div>
          </div>
          <span style="color:#0f766e;font-size:1.15rem;">+</span>
        </summary>
        <div class="faq-answer">${escapeHtml(item.answer)}</div>
      </details>
    `
    )
    .join("");

  const lockedHtml =
    !report.isPro && report.lockedTeasers.length > 0
      ? `
      <div class="locked-wall">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.75rem;">
          <div>
            <strong style="color:#0f766e;">🔒 剩余 ${report.lockedTeasers.length} 条高转化消虑问答 + 完整 .liquid 组件 + DE/JP 多语种已就绪</strong>
            <div style="font-size:0.8rem;color:#475569;">免费版实时展示前 3 条最高频购买阻力 Q&A；支持单品买断 ($29 / ¥99) 或 ¥39 / $14.99 全站通票解锁</div>
          </div>
          <button type="button" class="btn-secondary" id="lockedOpenModalBtn" style="border-color:#0f766e;color:#0f766e;">立即申领 / 激活码解锁 →</button>
        </div>
        <div class="locked-teasers">
          ${report.lockedTeasers
            .map(
              (t) => `
            <div class="teaser-row">
              <span><strong>#${t.index} [${escapeHtml(t.categoryZhLabel)}]</strong> ${escapeHtml(t.questionPreview)}</span>
              <span class="blur-answer">Verified conversion answer hidden in preview</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `
      : "";

  els.tabContent.innerHTML = `<div class="faq-preview-list">${visibleHtml}</div>${lockedHtml}`;
  document.getElementById("lockedOpenModalBtn")?.addEventListener("click", () => openCheckoutModal());
}

function runGenerator() {
  const effectiveLocale = state.isPro ? state.locale : "en";
  const report = generateFaqPack({
    productName: els.productName.value,
    productUrl: els.productUrl.value,
    sellingPoints: els.sellingPoints.value,
    reviewsInput: els.reviewsInput.value,
    locale: effectiveLocale,
    isPro: state.isPro,
  });
  state.lastReport = report;
  renderRadarList(report);
  renderMainOutput(report);

  els.localeButtons.forEach((btn) => {
    const code = btn.dataset.locale;
    btn.classList.toggle("active", code === effectiveLocale);
    if (!state.isPro && code !== "en") {
      btn.title = "Pro 解锁德语 / 日语本土化导出";
    } else {
      btn.title = SUPPORTED_LOCALES[code]?.label || code;
    }
  });
}

let modalPlan = "all";
let currentOrderId = "";

function makeOrderId() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `SFG-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function updateCheckoutOrderText() {
  document.getElementById("planAllAccessBtn")?.classList.toggle("active", modalPlan === "all");
  document.getElementById("planSingleItemBtn")?.classList.toggle("active", modalPlan === "single");

  const itemTitle =
    modalPlan === "all"
      ? 'OPC All-Access 全站 14 款微工具通票 (p="*")'
      : "Shopify FAQ + GEO Injector Pro 永久买断 (slug: shopify-faq-geo)";
  const itemPrice = modalPlan === "all" ? "¥39 / $14.99" : "$29 / ¥99";
  const prod = els.productName.value.trim() || "Shopify Product";

  const cmd = [
    `【OPC 订单口令】${currentOrderId}`,
    `【选购商品】${itemTitle}`,
    `【订单价格】${itemPrice}`,
    `【当前店铺商品】${prod}`,
    `【发货请求】请签发对应 OPC1. 离线激活码`,
  ].join("\n");

  const box = document.getElementById("orderCmdBox");
  if (box) box.textContent = cmd;
  const mailLink = document.getElementById("fallbackMailtoLink");
  if (mailLink) {
    const subj = encodeURIComponent(`[OPC 订单 ${currentOrderId}] ${itemTitle} (${itemPrice})`);
    const body = encodeURIComponent(cmd);
    mailLink.href = `mailto:3152557994@qq.com?cc=a3152557994@gmail.com&subject=${subj}&body=${body}`;
  }
}

function openCheckoutModal() {
  currentOrderId = makeOrderId();
  updateCheckoutOrderText();
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.hidden = false;
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.hidden = true;
}

async function copyQuick(text, btn, okLabel) {
  const prev = btn.textContent;
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = okLabel;
    setTimeout(() => {
      btn.textContent = prev;
    }, 1800);
  } catch {
    btn.textContent = text;
  }
}

async function tryActivateToken(tokenStr, silent = false) {
  const res = await verifyLicenseToken(tokenStr);
  const modalStatus = document.getElementById("modalLicenseStatus");
  if (res.valid) {
    state.isPro = true;
    state.licensePayload = res.payload;
    const clean = tokenStr.trim();
    try {
      localStorage.setItem(STORAGE_KEY, clean);
      if (res.payload?.p === "*") {
        localStorage.setItem(GLOBAL_WILDCARD_KEY, clean);
      }
    } catch {}
    els.licenseInput.value = clean;
    const mIn = document.getElementById("modalLicenseInput");
    if (mIn) mIn.value = clean;
    els.proBadgeTop.textContent = "PRO 已解锁 · 无限生成";
    els.proBadgeTop.style.background = "#059669";
    const okMsg = `✅ Pro 永久授权验证通过（${res.payload.e || (res.payload.p === "*" ? "全站通票 *" : res.payload.plan || "shopify-faq-geo")}）！已解锁全部 12 条 FAQ、.liquid 下载与 EN/DE/JP 切换。`;
    els.licenseStatus.style.color = "#5eead4";
    els.licenseStatus.textContent = okMsg;
    if (modalStatus) {
      modalStatus.style.color = "#059669";
      modalStatus.textContent = okMsg;
    }
    runGenerator();
    return true;
  }
  if (!silent) {
    const errMsg = `❌ 激活码无效：${res.message || res.reason}`;
    els.licenseStatus.style.color = "#fca5a5";
    els.licenseStatus.textContent = errMsg;
    if (modalStatus) {
      modalStatus.style.color = "#dc2626";
      modalStatus.textContent = errMsg;
    }
  }
  return false;
}

// Event bindings
els.presetButtons.forEach((btn) => {
  btn.addEventListener("click", () => loadPreset(btn.dataset.preset));
});

els.generateBtn.addEventListener("click", () => runGenerator());

els.csvUpload.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const text = await file.text();
  els.reviewsInput.value = text;
  runGenerator();
});

els.tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.activeTab = btn.dataset.tab;
    els.tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.tab === state.activeTab));
    if (state.lastReport) renderMainOutput(state.lastReport);
  });
});

els.localeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetLocale = btn.dataset.locale;
    if (!state.isPro && targetLocale !== "en") {
      openCheckoutModal();
      return;
    }
    state.locale = targetLocale;
    runGenerator();
  });
});

els.activateBtn.addEventListener("click", () => {
  tryActivateToken(els.licenseInput.value, false);
});

document.getElementById("topUnlockBtn")?.addEventListener("click", openCheckoutModal);
document.getElementById("openCheckoutBtn")?.addEventListener("click", openCheckoutModal);
document.getElementById("closeCheckoutModalBtn")?.addEventListener("click", closeCheckoutModal);
document.getElementById("checkoutModal")?.addEventListener("click", (e) => {
  if (e.target.id === "checkoutModal") closeCheckoutModal();
});
document.getElementById("planAllAccessBtn")?.addEventListener("click", () => {
  modalPlan = "all";
  updateCheckoutOrderText();
});
document.getElementById("planSingleItemBtn")?.addEventListener("click", () => {
  modalPlan = "single";
  updateCheckoutOrderText();
});
document.getElementById("copyOrderCmdBtn")?.addEventListener("click", (e) => {
  copyQuick(document.getElementById("orderCmdBox")?.textContent || "", e.currentTarget, "✅ 已复制订单口令！发给客服 3152557994 秒发码");
});
document.getElementById("copyQqNumBtn")?.addEventListener("click", (e) => copyQuick("3152557994", e.currentTarget, "✅ 已复制 3152557994"));
document.getElementById("copyQqMailBtn")?.addEventListener("click", (e) => copyQuick("3152557994@qq.com", e.currentTarget, "✅ 已复制 QQ 邮箱"));
document.getElementById("copyGmailBtn")?.addEventListener("click", (e) => copyQuick("a3152557994@gmail.com", e.currentTarget, "✅ 已复制 Gmail"));
document.getElementById("modalActivateBtn")?.addEventListener("click", async () => {
  const ok = await tryActivateToken(document.getElementById("modalLicenseInput")?.value || "", false);
  if (ok) {
    setTimeout(closeCheckoutModal, 900);
  }
});

// Restore saved Pro token if present
const savedToken = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(GLOBAL_WILDCARD_KEY);
if (savedToken) {
  els.licenseInput.value = savedToken;
  tryActivateToken(savedToken, true);
}

// Boot with Bestseller #1
loadPreset("anc-earbuds");

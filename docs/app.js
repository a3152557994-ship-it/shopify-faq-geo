import {
  PRESET_SAMPLES,
  SUPPORTED_LOCALES,
  generateFaqPack,
} from "./engine.js";

const state = {
  presetId: "anc-earbuds",
  locale: "en",
  activeTab: "preview",
  isPro: true,
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
  els.reviewSummaryBadge.textContent = `已扫描 ${report.reviewCount} 条评论 · 免费解锁全部 ${report.totalFaqCount} 条高转化 Q&A`;
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
  els.actionBar.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.9rem;">
      <button class="btn-secondary" id="copyJsonLdBtn">📋 复制 FAQPage JSON-LD (${report.visibleFaqs.length} 条)</button>
      <button class="btn-secondary" id="downloadLiquidBtn">
        ⬇️ 免费下载完整 sections/faq-geo.liquid (${report.visibleFaqs.length} 条)
      </button>
    </div>
  `;

  document.getElementById("copyJsonLdBtn")?.addEventListener("click", async () => {
    await navigator.clipboard.writeText(report.jsonLd.jsonLdScriptTag);
    const btn = document.getElementById("copyJsonLdBtn");
    btn.textContent = "✅ 已复制 JSON-LD Script 标签！";
    setTimeout(() => {
      btn.textContent = `📋 复制 FAQPage JSON-LD (${report.visibleFaqs.length} 条)`;
    }, 1800);
  });

  document.getElementById("downloadLiquidBtn")?.addEventListener("click", () => {
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

  els.tabContent.innerHTML = `<div class="faq-preview-list">${visibleHtml}</div>`;
}

function runGenerator() {
  const report = generateFaqPack({
    productName: els.productName.value,
    productUrl: els.productUrl.value,
    sellingPoints: els.sellingPoints.value,
    reviewsInput: els.reviewsInput.value,
    locale: state.locale,
    isPro: state.isPro,
  });
  state.lastReport = report;
  renderRadarList(report);
  renderMainOutput(report);

  els.localeButtons.forEach((btn) => {
    const code = btn.dataset.locale;
    btn.classList.toggle("active", code === state.locale);
    btn.title = SUPPORTED_LOCALES[code]?.label || code;
  });
}

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
    state.locale = btn.dataset.locale;
    runGenerator();
  });
});

document.getElementById("copyQqNumBtn")?.addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  const prev = btn.textContent;
  try {
    await navigator.clipboard.writeText("3152557994");
    btn.textContent = "✅ 已复制 3152557994";
    setTimeout(() => {
      btn.textContent = prev;
    }, 1800);
  } catch {
    btn.textContent = "3152557994";
  }
});

loadPreset("anc-earbuds");

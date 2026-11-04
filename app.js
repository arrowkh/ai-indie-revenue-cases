/* AI Indie Revenue Cases — client-side filters + i18n */
(function () {
  const LANG_KEY = "ai-cases-lang";

  const I18N = {
    en: {
      title: "AI Indie Revenue Cases",
      documentTitle: "AI Indie Revenue Cases",
      eyebrow: "Curated · sourced · static",
      subtitle:
        "Public revenue snapshots from indie AI products and a few scaled ceiling cases.",
      search: "Search",
      searchPlaceholder: "Name, idea, founder…",
      category: "Category",
      stage: "Stage",
      sort: "Sort",
      all: "All",
      sortRevenueDesc: "Revenue (high → low)",
      sortRevenueAsc: "Revenue (low → high)",
      sortNameAsc: "Name A–Z",
      sortAsOfDesc: "Newest as_of",
      cards: "Cards",
      table: "Table",
      count: (n) => (n === 1 ? "1 case" : n + " cases"),
      loading: "Loading…",
      loadFailed: "Failed to load",
      loadFailedBody:
        "Could not load cases.json. Serve this folder over HTTP (not file://).",
      empty: "No cases match these filters.",
      disclaimerLabel: "Disclaimer:",
      disclaimerBody:
        " Revenues are mostly self-reported or press-cited and may be outdated. Treat figures as snapshots, not audited financials. Always open the linked source before citing a number.",
      footerMore: "More AI / Grok Bot packs → ",
      thName: "Name",
      thIdea: "Idea",
      thRevenue: "Revenue",
      thCategory: "Category",
      thStage: "Stage",
      thAsOf: "as_of",
      thSource: "Source",
      source: "source",
      open: "open",
      asOf: "as_of",
      exitSuffix: " exit (at ~$10K MRR)",
      replyguyRev: "~$10K MRR → 6-fig exit",
      categories: {
        "image-video": "image-video",
        "writing-research": "writing-research",
        chatbots: "chatbots",
        "marketing-seo": "marketing-seo",
        agents: "agents",
        devtools: "devtools",
        productivity: "productivity",
        vertical: "vertical",
      },
      stages: {
        mvp: "mvp",
        early: "early",
        growing: "growing",
        breakout: "breakout",
        scaled: "scaled",
        exited: "exited",
        declining: "declining",
      },
      teams: { solo: "solo", "2-5": "2-5", vc: "vc" },
      evidence: {
        self_reported: "self_reported",
        screenshot: "screenshot",
        stripe_verified: "stripe_verified",
        press: "press",
      },
    },
    zh: {
      title: "AI 独立产品收入案例",
      documentTitle: "AI 独立产品收入案例",
      eyebrow: "精选 · 有来源 · 静态站",
      subtitle: "精选 AI 独立产品与部分规模化案例的公开收入快照（idea / 收入 / 分类 / 进程）。",
      search: "搜索",
      searchPlaceholder: "名称、idea、创始人…",
      category: "分类",
      stage: "进程",
      sort: "排序",
      all: "全部",
      sortRevenueDesc: "收入（高 → 低）",
      sortRevenueAsc: "收入（低 → 高）",
      sortNameAsc: "名称 A–Z",
      sortAsOfDesc: "最新 as_of",
      cards: "卡片",
      table: "表格",
      count: (n) => n + " 条案例",
      loading: "加载中…",
      loadFailed: "加载失败",
      loadFailedBody: "无法加载 cases.json。请用 HTTP 打开本文件夹（不要用 file://）。",
      empty: "没有符合筛选条件的案例。",
      disclaimerLabel: "免责声明：",
      disclaimerBody:
        " 收入多为自述或媒体引用，可能过时。请视为快照而非经审计财务数据；引用数字前务必打开来源链接核实。",
      footerMore: "更多 AI / Grok Bot 工具包 → ",
      thName: "名称",
      thIdea: "Idea",
      thRevenue: "收入",
      thCategory: "分类",
      thStage: "进程",
      thAsOf: "as_of",
      thSource: "来源",
      source: "来源",
      open: "打开",
      asOf: "截至",
      exitSuffix: " 退出（约 $10K MRR）",
      replyguyRev: "~$10K MRR → 六位数退出",
      categories: {
        "image-video": "图像/视频",
        "writing-research": "写作/研究",
        chatbots: "聊天机器人",
        "marketing-seo": "营销/SEO",
        agents: "Agent/自动化",
        devtools: "开发工具",
        productivity: "效率/工作区",
        vertical: "垂直行业",
      },
      stages: {
        mvp: "MVP",
        early: "早期收入",
        growing: "增长中",
        breakout: "爆发",
        scaled: "规模化",
        exited: "已退出",
        declining: "下滑",
      },
      teams: { solo: "个人", "2-5": "2–5人", vc: "VC" },
      evidence: {
        self_reported: "自述",
        screenshot: "截图",
        stripe_verified: "Stripe验证",
        press: "媒体",
      },
    },
  };

  function detectLang() {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "zh") return saved;
    } catch (_) {}
    const nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    return nav.startsWith("zh") ? "zh" : "en";
  }

  let lang = detectLang();
  let cases = [];
  let view = "cards";

  const els = {
    q: document.getElementById("q"),
    category: document.getElementById("category"),
    stage: document.getElementById("stage"),
    sort: document.getElementById("sort"),
    count: document.getElementById("count"),
    cards: document.getElementById("cards"),
    tableWrap: document.getElementById("table-wrap"),
    tableBody: document.getElementById("table-body"),
    empty: document.getElementById("empty"),
    viewCards: document.getElementById("view-cards"),
    viewTable: document.getElementById("view-table"),
    langEn: document.getElementById("lang-en"),
    langZh: document.getElementById("lang-zh"),
  };

  function t() {
    return I18N[lang] || I18N.en;
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatMoney(n) {
    if (n == null || Number.isNaN(n)) return null;
    if (n >= 1_000_000) {
      const m = n / 1_000_000;
      return "$" + (m % 1 === 0 ? m.toFixed(0) : m.toFixed(1).replace(/\.0$/, "")) + "M";
    }
    if (n >= 1_000) {
      const k = n / 1_000;
      return "$" + (k % 1 === 0 ? k.toFixed(0) : k.toFixed(1).replace(/\.0$/, "")) + "K";
    }
    return "$" + n.toLocaleString("en-US");
  }

  function revenueSortValue(c) {
    if (typeof c.revenue === "number") {
      if (c.revenue_unit === "MRR") return c.revenue * 12;
      if (c.revenue_unit === "last_30d") return c.revenue * 12;
      if (c.revenue_unit === "exit") return c.revenue;
      return c.revenue;
    }
    if (c.revenue_range && /300\s*K/i.test(c.revenue_range)) return 300000 * 12;
    return 0;
  }

  function formatRevenue(c) {
    const dict = t();
    const unit = c.revenue_unit;
    const money = formatMoney(c.revenue);
    let main;
    if (!money) {
      main = c.revenue_range || "n/a";
    } else if (unit === "MRR") {
      main = money + " MRR";
    } else if (unit === "ARR") {
      main = money + " ARR";
    } else if (unit === "last_30d") {
      main = money + " / 30d";
    } else if (unit === "exit") {
      main = money + dict.exitSuffix;
      if (c.id === "replyguy") main = dict.replyguyRev;
    } else {
      main = money;
    }
    return { main, range: c.revenue_range || "" };
  }

  function oneLiner(c) {
    if (lang === "zh" && c.one_liner_zh) return c.one_liner_zh;
    return c.one_liner || "";
  }

  function notesText(c) {
    if (lang === "zh" && c.notes_zh) return c.notes_zh;
    return c.notes || "";
  }

  function filtered() {
    const q = (els.q.value || "").trim().toLowerCase();
    const cat = els.category.value;
    const stage = els.stage.value;
    let list = cases.filter((c) => {
      if (cat && c.category !== cat) return false;
      if (stage && c.stage !== stage) return false;
      if (q) {
        const blob = [
          c.name,
          c.one_liner,
          c.one_liner_zh,
          c.founder,
          c.notes,
          c.notes_zh,
          c.category,
          c.stage,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });

    const sort = els.sort.value;
    list = list.slice().sort((a, b) => {
      if (sort === "name-asc") return a.name.localeCompare(b.name);
      if (sort === "as_of-desc") return String(b.as_of).localeCompare(String(a.as_of));
      if (sort === "revenue-asc") return revenueSortValue(a) - revenueSortValue(b);
      return revenueSortValue(b) - revenueSortValue(a);
    });
    return list;
  }

  function chip(text, extraClass) {
    return `<span class="chip ${extraClass || ""}">${escapeHtml(text)}</span>`;
  }

  function labelCategory(key) {
    return t().categories[key] || key;
  }
  function labelStage(key) {
    return t().stages[key] || key;
  }
  function labelTeam(key) {
    return t().teams[key] || key;
  }
  function labelEvidence(key) {
    return t().evidence[key] || key;
  }

  function renderCards(list) {
    const dict = t();
    els.cards.innerHTML = list
      .map((c) => {
        const rev = formatRevenue(c);
        const founder = c.founder ? `<span>${escapeHtml(c.founder)}</span>` : "<span></span>";
        const notes = notesText(c);
        return `
<article class="card">
  <div class="card-top">
    <h2>${escapeHtml(c.name)}</h2>
    <div class="revenue">${escapeHtml(rev.main)}${
          rev.range && rev.main !== rev.range
            ? `<span class="revenue-range">${escapeHtml(rev.range)}</span>`
            : ""
        }</div>
  </div>
  <p class="one-liner">${escapeHtml(oneLiner(c))}</p>
  <div class="chips">
    ${chip(labelCategory(c.category))}
    ${chip(labelStage(c.stage), "stage-" + c.stage)}
    ${chip(labelTeam(c.team_size))}
    ${chip(labelEvidence(c.evidence))}
  </div>
  ${notes ? `<p class="notes">${escapeHtml(notes)}</p>` : ""}
  <div class="card-foot">
    ${founder}
    <span>${escapeHtml(dict.asOf)} ${escapeHtml(c.as_of)} · <a href="${escapeHtml(
          c.source_url
        )}" target="_blank" rel="noopener noreferrer">${escapeHtml(dict.source)}</a></span>
  </div>
</article>`;
      })
      .join("");
  }

  function renderTable(list) {
    const dict = t();
    els.tableBody.innerHTML = list
      .map((c) => {
        const rev = formatRevenue(c);
        const revCell =
          escapeHtml(rev.main) +
          (rev.range && rev.main !== rev.range
            ? `<div class="revenue-range">${escapeHtml(rev.range)}</div>`
            : "");
        return `<tr>
  <td><strong>${escapeHtml(c.name)}</strong>${
          c.founder ? `<div class="revenue-range">${escapeHtml(c.founder)}</div>` : ""
        }</td>
  <td>${escapeHtml(oneLiner(c))}</td>
  <td>${revCell}</td>
  <td>${escapeHtml(labelCategory(c.category))}</td>
  <td>${escapeHtml(labelStage(c.stage))}</td>
  <td>${escapeHtml(c.as_of)}</td>
  <td><a href="${escapeHtml(c.source_url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
          dict.open
        )}</a></td>
</tr>`;
      })
      .join("");
  }

  function render() {
    const list = filtered();
    els.count.textContent = t().count(list.length);
    const empty = list.length === 0;
    els.empty.classList.toggle("hidden", !empty);
    els.cards.classList.toggle("hidden", view !== "cards" || empty);
    els.tableWrap.classList.toggle("hidden", view !== "table" || empty);
    if (!empty) {
      if (view === "cards") renderCards(list);
      else renderTable(list);
    }
  }

  function applyStaticI18n() {
    const dict = t();
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = dict.documentTitle;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key];
      if (typeof val === "string") el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (typeof dict[key] === "string") el.setAttribute("placeholder", dict[key]);
    });

    // Category / stage option labels (keep value= keys)
    Array.from(els.category.options).forEach((opt) => {
      if (!opt.value) {
        opt.textContent = dict.all;
      } else {
        opt.textContent = dict.categories[opt.value] || opt.value;
      }
    });
    Array.from(els.stage.options).forEach((opt) => {
      if (!opt.value) {
        opt.textContent = dict.all;
      } else {
        opt.textContent = dict.stages[opt.value] || opt.value;
      }
    });

    els.langEn.classList.toggle("active", lang === "en");
    els.langZh.classList.toggle("active", lang === "zh");
  }

  function setLang(next) {
    lang = next === "zh" ? "zh" : "en";
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (_) {}
    applyStaticI18n();
    render();
  }

  function setView(next) {
    view = next;
    els.viewCards.classList.toggle("active", view === "cards");
    els.viewTable.classList.toggle("active", view === "table");
    render();
  }

  ["input", "change"].forEach((evt) => {
    els.q.addEventListener(evt, render);
    els.category.addEventListener(evt, render);
    els.stage.addEventListener(evt, render);
    els.sort.addEventListener(evt, render);
  });
  els.viewCards.addEventListener("click", () => setView("cards"));
  els.viewTable.addEventListener("click", () => setView("table"));
  els.langEn.addEventListener("click", () => setLang("en"));
  els.langZh.addEventListener("click", () => setLang("zh"));

  applyStaticI18n();
  els.count.textContent = t().loading;

  fetch("cases.json")
    .then((r) => {
      if (!r.ok) throw new Error("Failed to load cases.json");
      return r.json();
    })
    .then((data) => {
      cases = Array.isArray(data) ? data : [];
      render();
    })
    .catch((err) => {
      els.count.textContent = t().loadFailed;
      els.empty.classList.remove("hidden");
      els.empty.textContent = t().loadFailedBody;
      console.error(err);
    });
})();

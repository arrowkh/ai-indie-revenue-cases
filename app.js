/* AI Indie Revenue Cases — client-side filters + i18n */
(function () {
  const LANG_KEY = "ai-cases-lang";

  // Owner contact for mailto submissions. Leave empty to disable mailto.
  // Example: "you@domain.com"
  const OWNER_EMAIL = "jinxingle1983@gmail.com";

  // Optional Formspree form id (e.g. "xyzabcde"). Leave empty to disable.
  // When set, POSTs JSON to https://formspree.io/f/<id>
  const FORMSPREE_ID = "";

  // Curator X profile (static hardcode — do not call X API from the browser)
  const OWNER_X = {
    username: "coienJxl",
    name: "inVi_At",
    description: "inVi_At,Author Of CryptoPunk Dolls",
    profile_image_url:
      "https://pbs.twimg.com/profile_images/1503896775425671170/Fd4H0Gc6_400x400.jpg",
    profile_url: "https://x.com/coienJxl",
    followers: 1,
    following: 14,
    tweets: 64,
    verified: false,
    gumroad: "https://jinxingle.gumroad.com",
  };

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
      prev: "Previous",
      next: "Next",
      pageOf: (n, m) => `Page ${n} of ${m}`,
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
      submitCase: "Submit a case",
      submitTitle: "Submit a case",
      submitReviewNote: "Reviewed before publish — submissions are not auto-listed.",
      submitHintCopy: "Static site — copy JSON or email the maintainer.",
      submitHintMailto: "Email submission, or copy JSON for cases.json.",
      submitHintFormspree: "Send via Formspree, or copy JSON as backup.",
      fName: "Product name",
      fOneLiner: "One-liner (idea)",
      fRevenue: "Revenue",
      fRevenueUnit: "Unit",
      fCategory: "Category",
      fStage: "Stage",
      fTeam: "Team size",
      fSource: "Source URL",
      fFounder: "Founder",
      fContact: "Your email",
      fNotes: "Notes",
      optional: "(optional)",
      copyJson: "Copy as JSON",
      sendMailto: "Email submission",
      sendFormspree: "Send via Formspree",
      copied: "JSON copied — paste into cases.json after review.",
      copyFailed: "Could not copy. Select and copy manually.",
      mailtoOpened: "Mail client opened with your submission.",
      mailtoDisabled: "Email not configured — use Copy as JSON.",
      formspreeOk: "Sent. We’ll review before publishing.",
      formspreeFail: "Send failed. Please Copy as JSON instead.",
      formMissing: "Please fill required fields (name, idea, category, stage, team, source URL).",
      close: "Close",
      followOnX: "Follow on X",
      shopGumroad: "Gumroad shop",
      profileMeta: (f, g, t) => `${f} followers · ${g} following · ${t} posts`,
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
      prev: "上一页",
      next: "下一页",
      pageOf: (n, m) => `第 ${n} / ${m} 页`,
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
      submitCase: "提交案例",
      submitTitle: "提交案例",
      submitReviewNote: "人工审核后收录 — 提交不会自动上线。",
      submitHintCopy: "静态站 — 复制 JSON 或邮件发给维护者。",
      submitHintMailto: "邮件提交，或复制 JSON 写入 cases.json。",
      submitHintFormspree: "Formspree 发送，或复制 JSON 备份。",
      fName: "产品名称",
      fOneLiner: "一句话介绍（idea）",
      fRevenue: "收入",
      fRevenueUnit: "单位",
      fCategory: "分类",
      fStage: "进程",
      fTeam: "团队规模",
      fSource: "来源链接",
      fFounder: "创始人",
      fContact: "你的邮箱",
      fNotes: "备注",
      optional: "（可选）",
      copyJson: "复制为 JSON",
      sendMailto: "邮件提交",
      sendFormspree: "通过 Formspree 发送",
      copied: "已复制 JSON — 审核后粘贴进 cases.json。",
      copyFailed: "复制失败，请手动选择复制。",
      mailtoOpened: "已打开邮件客户端（含提交内容）。",
      mailtoDisabled: "未配置邮箱 — 请用「复制为 JSON」。",
      formspreeOk: "已发送。我们会人工审核后再收录。",
      formspreeFail: "发送失败。请改用「复制为 JSON」。",
      formMissing: "请填写必填项（名称、idea、分类、进程、团队、来源链接）。",
      close: "关闭",
      followOnX: "在 X 上关注",
      shopGumroad: "Gumroad 店铺",
      profileMeta: (f, g, t) => `${f} 关注者 · ${g} 正在关注 · ${t} 帖子`,
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
  const PAGE_SIZE = 12;
  let page = 1;

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
    pager: document.getElementById("pager"),
    pagerPrev: document.getElementById("pager-prev"),
    pagerNext: document.getElementById("pager-next"),
    pagerStatus: document.getElementById("pager-status"),
    btnSubmit: document.getElementById("btn-submit"),
    modal: document.getElementById("submit-modal"),
    submitClose: document.getElementById("submit-close"),
    submitForm: document.getElementById("submit-form"),
    submitHint: document.getElementById("submit-hint"),
    submitStatus: document.getElementById("submit-status"),
    btnCopyJson: document.getElementById("btn-copy-json"),
    btnMailto: document.getElementById("btn-mailto"),
    btnFormspree: document.getElementById("btn-formspree"),
    fName: document.getElementById("f-name"),
    fOneLiner: document.getElementById("f-one-liner"),
    fRevenue: document.getElementById("f-revenue"),
    fRevenueUnit: document.getElementById("f-revenue-unit"),
    fCategory: document.getElementById("f-category"),
    fStage: document.getElementById("f-stage"),
    fTeam: document.getElementById("f-team"),
    fSource: document.getElementById("f-source"),
    fFounder: document.getElementById("f-founder"),
    fContact: document.getElementById("f-contact"),
    fNotes: document.getElementById("f-notes"),
    profileMeta: document.getElementById("profile-meta"),
    profileBio: document.getElementById("profile-bio"),
    profileName: document.getElementById("profile-name"),
    profileAvatarImg: document.getElementById("profile-avatar-img"),
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

  function shortRevenueFromRange(range, c) {
    if (!range) return null;
    // e.g. "Widely cited peak ~$300K/mo sales ..." → "~$300K/mo peak"
    const peakMo = range.match(/~?\$?\s*([\d.,]+)\s*([KkMm])\s*\/?\s*mo/i);
    if (peakMo) {
      const num = peakMo[1].replace(/,/g, "");
      const unit = peakMo[2].toUpperCase() === "M" ? "M" : "K";
      const tilde = /~/.test(range) ? "~" : "";
      const peak = /peak/i.test(range) ? " peak" : "";
      return tilde + "$" + num + unit + "/mo" + peak;
    }
    if (c && c.id === "headshotpro") return "~$300K/mo peak";
    const money = range.match(/~?\$\s*([\d.,]+\s*[KkMm]\+?)/);
    if (money) {
      const tilde = range.trim().startsWith("~") ? "~" : "";
      return tilde + "$" + money[1].replace(/\s+/g, "");
    }
    if (range.length > 28) return range.slice(0, 24).trim() + "…";
    return range;
  }

  function formatRevenue(c) {
    const dict = t();
    const unit = c.revenue_unit;
    const money = formatMoney(c.revenue);
    let main;
    let range = c.revenue_range || "";
    if (!money) {
      if (range) {
        const short = shortRevenueFromRange(range, c);
        if (short && short !== range) {
          return { main: short, range };
        }
        main = short || range;
        // Avoid duplicating the same long string as secondary
        if (main === range) range = "";
      } else {
        main = "n/a";
      }
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
    return { main, range };
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

  function totalPages(n) {
    return Math.max(1, Math.ceil(n / PAGE_SIZE));
  }

  function updatePager(listLength) {
    const dict = t();
    const pages = totalPages(listLength);
    if (page > pages) page = pages;
    if (page < 1) page = 1;
    const show = listLength > 0 && pages > 1;
    els.pager.classList.toggle("hidden", !show);
    els.pagerPrev.textContent = dict.prev;
    els.pagerNext.textContent = dict.next;
    els.pagerStatus.textContent = dict.pageOf(page, pages);
    els.pagerPrev.disabled = page <= 1;
    els.pagerNext.disabled = page >= pages;
  }

  function pageSlice(list) {
    const start = (page - 1) * PAGE_SIZE;
    return list.slice(start, start + PAGE_SIZE);
  }

  function render() {
    const list = filtered();
    const pages = totalPages(list.length);
    if (page > pages) page = pages;
    if (page < 1) page = 1;

    els.count.textContent = t().count(list.length);
    const empty = list.length === 0;
    els.empty.classList.toggle("hidden", !empty);
    els.cards.classList.toggle("hidden", view !== "cards" || empty);
    els.tableWrap.classList.toggle("hidden", view !== "table" || empty);

    updatePager(list.length);

    if (!empty) {
      const slice = pageSlice(list);
      if (view === "cards") renderCards(slice);
      else renderTable(slice);
    }
  }

  function resetPageAndRender() {
    page = 1;
    render();
  }


  function fillOwnerProfile() {
    const dict = t();
    const x = OWNER_X;
    if (els.profileName) els.profileName.textContent = x.name;
    if (els.profileBio) els.profileBio.textContent = x.description;
    if (els.profileMeta && typeof dict.profileMeta === "function") {
      els.profileMeta.textContent = dict.profileMeta(x.followers, x.following, x.tweets);
    }
    if (els.profileAvatarImg && x.profile_image_url) {
      els.profileAvatarImg.src = x.profile_image_url;
      els.profileAvatarImg.alt = x.name;
    }
    const handleLink = document.getElementById("profile-handle-link");
    if (handleLink) {
      handleLink.href = x.profile_url;
      handleLink.textContent = "@" + x.username;
    }
    const follow = document.getElementById("profile-follow");
    if (follow) follow.href = x.profile_url;
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

    fillOwnerProfile();

    // Submit form category/stage/team option labels
    if (els.fCategory) {
      Array.from(els.fCategory.options).forEach((opt) => {
        opt.textContent = dict.categories[opt.value] || opt.value;
      });
    }
    if (els.fStage) {
      Array.from(els.fStage.options).forEach((opt) => {
        opt.textContent = dict.stages[opt.value] || opt.value;
      });
    }
    if (els.fTeam) {
      Array.from(els.fTeam.options).forEach((opt) => {
        opt.textContent = dict.teams[opt.value] || opt.value;
      });
    }
    if (els.submitClose) {
      els.submitClose.setAttribute("aria-label", dict.close);
    }
    updateSubmitChannelUi();
  }


  function slugify(name) {
    return String(name || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "case";
  }

  function todayAsOf() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    return y + "-" + m;
  }

  function readSubmitDraft() {
    const name = (els.fName.value || "").trim();
    const one_liner = (els.fOneLiner.value || "").trim();
    const source_url = (els.fSource.value || "").trim();
    const category = els.fCategory.value;
    const stage = els.fStage.value;
    const team_size = els.fTeam.value;
    const founder = (els.fFounder.value || "").trim();
    const notes = (els.fNotes.value || "").trim();
    const contact = (els.fContact.value || "").trim();
    const revRaw = (els.fRevenue.value || "").trim();
    const revenue_unit = els.fRevenueUnit.value;
    const revenue = revRaw === "" ? null : Number(revRaw);

    return {
      name,
      one_liner,
      source_url,
      category,
      stage,
      team_size,
      founder,
      notes,
      contact,
      revenue: Number.isFinite(revenue) ? revenue : null,
      revenue_unit,
    };
  }

  function validateSubmit(draft) {
    if (
      !draft.name ||
      !draft.one_liner ||
      !draft.source_url ||
      !draft.category ||
      !draft.stage ||
      !draft.team_size
    ) {
      return false;
    }
    return true;
  }

  function buildCaseJson(draft) {
    const obj = {
      id: slugify(draft.name),
      name: draft.name,
      one_liner: draft.one_liner,
      revenue: draft.revenue,
      revenue_unit: draft.revenue_unit || "MRR",
      revenue_range: draft.revenue == null ? "" : undefined,
      category: draft.category,
      stage: draft.stage,
      team_size: draft.team_size,
      founder: draft.founder || "",
      source_url: draft.source_url,
      evidence: "self_reported",
      as_of: todayAsOf(),
      notes: draft.notes || "",
      status: "pending_review",
    };
    if (obj.revenue_range === undefined) delete obj.revenue_range;
    if (draft.contact) obj.submitter_email = draft.contact;
    return obj;
  }

  function setSubmitStatus(msg, isError) {
    if (!els.submitStatus) return;
    els.submitStatus.textContent = msg || "";
    els.submitStatus.classList.toggle("is-error", !!isError);
  }

  function updateSubmitChannelUi() {
    const dict = t();
    const hasMail = !!(OWNER_EMAIL && String(OWNER_EMAIL).trim());
    const hasFormspree = !!(FORMSPREE_ID && String(FORMSPREE_ID).trim());

    if (els.btnMailto) {
      els.btnMailto.disabled = !hasMail;
      els.btnMailto.title = hasMail ? "" : dict.mailtoDisabled;
    }
    if (els.btnFormspree) {
      els.btnFormspree.classList.toggle("hidden", !hasFormspree);
    }
    if (els.submitHint) {
      if (hasFormspree) els.submitHint.textContent = dict.submitHintFormspree;
      else if (hasMail) els.submitHint.textContent = dict.submitHintMailto;
      else els.submitHint.textContent = dict.submitHintCopy;
    }
  }

  function openSubmitModal() {
    if (!els.modal) return;
    els.modal.classList.remove("hidden");
    els.modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    setSubmitStatus("");
    updateSubmitChannelUi();
    applyStaticI18n();
    setTimeout(() => {
      try {
        els.fName.focus();
      } catch (_) {}
    }, 50);
  }

  function closeSubmitModal() {
    if (!els.modal) return;
    els.modal.classList.add("hidden");
    els.modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
    setSubmitStatus("");
  }

  async function copyCaseJson() {
    const dict = t();
    const draft = readSubmitDraft();
    if (!validateSubmit(draft)) {
      setSubmitStatus(dict.formMissing, true);
      return;
    }
    const obj = buildCaseJson(draft);
    const text = JSON.stringify(obj, null, 2);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setSubmitStatus(dict.copied, false);
    } catch (err) {
      console.error(err);
      setSubmitStatus(dict.copyFailed, true);
    }
  }

  function sendMailto() {
    const dict = t();
    const email = (OWNER_EMAIL || "").trim();
    if (!email) {
      setSubmitStatus(dict.mailtoDisabled, true);
      return;
    }
    const draft = readSubmitDraft();
    if (!validateSubmit(draft)) {
      setSubmitStatus(dict.formMissing, true);
      return;
    }
    const obj = buildCaseJson(draft);
    const subject = "[AI Cases] New submission: " + draft.name;
    const body =
      "New case submission (pending review)\n\n" +
      JSON.stringify(obj, null, 2) +
      (draft.contact ? "\n\nSubmitter contact: " + draft.contact : "");
    const href =
      "mailto:" +
      encodeURIComponent(email).replace(/%40/g, "@") +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(body);
    window.location.href = href;
    setSubmitStatus(dict.mailtoOpened, false);
  }

  async function sendFormspree() {
    const dict = t();
    const id = (FORMSPREE_ID || "").trim();
    if (!id) return;
    const draft = readSubmitDraft();
    if (!validateSubmit(draft)) {
      setSubmitStatus(dict.formMissing, true);
      return;
    }
    const obj = buildCaseJson(draft);
    els.btnFormspree.disabled = true;
    try {
      const res = await fetch("https://formspree.io/f/" + encodeURIComponent(id), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: "[AI Cases] " + draft.name,
          case: obj,
          submitter_email: draft.contact || "",
          message: "Pending review case submission",
        }),
      });
      if (!res.ok) throw new Error("Formspree " + res.status);
      setSubmitStatus(dict.formspreeOk, false);
    } catch (err) {
      console.error(err);
      setSubmitStatus(dict.formspreeFail, true);
    } finally {
      els.btnFormspree.disabled = false;
    }
  }

  function setLang(next) {
    lang = next === "zh" ? "zh" : "en";
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (_) {}
    page = 1;
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
    els.q.addEventListener(evt, resetPageAndRender);
    els.category.addEventListener(evt, resetPageAndRender);
    els.stage.addEventListener(evt, resetPageAndRender);
    els.sort.addEventListener(evt, resetPageAndRender);
  });
  els.pagerPrev.addEventListener("click", () => {
    if (page > 1) {
      page -= 1;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  els.pagerNext.addEventListener("click", () => {
    page += 1;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  els.viewCards.addEventListener("click", () => setView("cards"));
  els.viewTable.addEventListener("click", () => setView("table"));
  els.langEn.addEventListener("click", () => setLang("en"));
  els.langZh.addEventListener("click", () => setLang("zh"));

  if (els.btnSubmit) els.btnSubmit.addEventListener("click", openSubmitModal);
  if (els.submitClose) els.submitClose.addEventListener("click", closeSubmitModal);
  if (els.modal) {
    els.modal.querySelectorAll("[data-close-modal]").forEach((el) => {
      el.addEventListener("click", closeSubmitModal);
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && els.modal && !els.modal.classList.contains("hidden")) {
      closeSubmitModal();
    }
  });
  if (els.btnCopyJson) els.btnCopyJson.addEventListener("click", () => { copyCaseJson(); });
  if (els.btnMailto) els.btnMailto.addEventListener("click", sendMailto);
  if (els.btnFormspree) els.btnFormspree.addEventListener("click", () => { sendFormspree(); });
  if (els.submitForm) {
    els.submitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      copyCaseJson();
    });
  }

  applyStaticI18n();
  els.count.textContent = t().loading;

  fetch("cases.json")
    .then((r) => {
      if (!r.ok) throw new Error("Failed to load cases.json");
      return r.json();
    })
    .then((data) => {
      cases = Array.isArray(data) ? data : (data && Array.isArray(data.cases) ? data.cases : []);
      render();
    })
    .catch((err) => {
      els.count.textContent = t().loadFailed;
      els.empty.classList.remove("hidden");
      els.empty.textContent = t().loadFailedBody;
      console.error(err);
    });
})();

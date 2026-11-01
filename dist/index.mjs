import { h as K, resolveDynamicComponent as fe, reactive as Ye, getCurrentInstance as Ut, toRaw as he, markRaw as ft, cloneVNode as Ge, computed as mt, unref as je, isReadonly as ee, createApp as qe } from "vue";
import Qe from "lz-string";
import * as Ee from "acorn";
import * as Qn from "acorn-walk";
import Y from "js-cookie";
import tn from "crypto-js";
import tr from "dompurify";
import zt from "markdown-it";
import Wt from "markdown-it-anchor";
import { JsonViewer as en } from "vue3-json-viewer";
import er from "markdown-it-code-copy";
import nn from "turndown";
const rn = (t) => typeof t == "string" && (/^[A-Z]/.test(t) || t.includes("-")), nr = (t) => t.replace(/(^|-)([a-z0-9])/g, (e, n, r) => r.toUpperCase()), I = (t, ...e) => {
  if (!rn(t)) return K(t, ...e);
  const n = fe(t);
  if (typeof n != "string" && Array.isArray(e[1])) {
    const r = e[1];
    return K(n, e[0], { default: () => r });
  }
  return K(n, ...e);
};
I.withInstance = (t) => (e, ...n) => {
  var o;
  if (!rn(e)) return K(e, ...n);
  const r = (o = t == null ? void 0 : t.appContext) == null ? void 0 : o.components, i = (r == null ? void 0 : r[e]) || e.includes("-") && (r == null ? void 0 : r[nr(e)]) || fe(e);
  if (typeof i != "string" && Array.isArray(n[1])) {
    const a = n[1];
    return K(i, n[0], { default: () => a });
  }
  return K(i, ...n);
};
const rr = {
  key: "primary",
  string: "success",
  number: "warning",
  literal: "error",
  punct: "on-surface",
  keyword: "secondary",
  comment: "info"
}, ir = /* @__PURE__ */ new Set([
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "export",
  "extends",
  "finally",
  "for",
  "from",
  "function",
  "get",
  "if",
  "import",
  "in",
  "instanceof",
  "let",
  "new",
  "of",
  "return",
  "set",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "try",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield"
]);
function or(t) {
  const e = /\/\/[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$)|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|`(?:\\[\s\S]|[^`\\])*`|\b(?:0[xX][\da-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?n?)\b|[$\p{ID_Start}_][$\p{ID_Continue}\u200c\u200d]*|[{}[\](),:;.?+*/%<>=!&|^~\-]/gu, n = [];
  let r = 0;
  const i = (o, a) => K("span", a ? {
    class: `wbc-hl-${a}`,
    style: { color: `rgb(var(--v-theme-${rr[a]}))` }
  } : null, o);
  for (const o of t.matchAll(e)) {
    const a = o[0], s = o.index + a.length;
    o.index > r && n.push(i(t.slice(r, o.index)));
    let l;
    a.startsWith("//") || a.startsWith("/*") ? l = "comment" : /^["'`]/.test(a) ? l = /^\s*:/.test(t.slice(s)) ? "key" : "string" : /^\d/.test(a) ? l = "number" : ["true", "false", "null", "undefined"].includes(a) ? l = "literal" : ir.has(a) ? l = "keyword" : /^[{}[\](),:;.?+*/%<>=!&|^~\-]$/.test(a) && (l = "punct"), n.push(i(a, l)), r = s;
  }
  return r < t.length && n.push(i(t.slice(r))), n;
}
const Te = { direction: "ltr", textAlign: "left" };
function Tt(t = "70vh") {
  return { maxHeight: t === "none" ? void 0 : t, overflow: "auto" };
}
function sr(t) {
  if (t == null) return "";
  if (typeof t == "string") return t;
  try {
    return JSON.stringify(t, null, 2);
  } catch {
    return String(t);
  }
}
function ar(t) {
  return typeof t == "string" && t.split(/[?#]/)[0].split(/[\\/]/).pop() || "source.txt";
}
async function cr(t) {
  var r, i;
  if ((i = (r = globalThis.navigator) == null ? void 0 : r.clipboard) != null && i.writeText) {
    await navigator.clipboard.writeText(t);
    return;
  }
  const e = document.createElement("textarea");
  e.value = t, e.style.cssText = "position:fixed;opacity:0";
  const n = document.activeElement;
  document.body.appendChild(e);
  try {
    e.select(), document.execCommand("copy");
  } finally {
    e.remove(), n == null || n.focus();
  }
}
function ur(t, e) {
  const n = URL.createObjectURL(new Blob([t], { type: "text/plain;charset=utf-8" })), r = document.createElement("a");
  r.href = n, r.download = e, document.body.appendChild(r);
  try {
    r.click();
  } finally {
    r.remove(), setTimeout(() => {
      typeof URL.revokeObjectURL == "function" && URL.revokeObjectURL(n);
    }, 1e3);
  }
}
function Ae(t, e, n, r, i) {
  const o = [];
  e.title !== !1 && o.push(t("span", {
    class: "wbc-code-title font-weight-bold",
    style: { flex: "1 1 auto", minWidth: 0, overflowWrap: "anywhere" }
  }, e.title ?? r));
  const a = (s, l, c) => t("button", {
    type: "button",
    class: `wbc-code-${s} pa-2 rounded`,
    "aria-label": l,
    onClick: (p) => (p.stopPropagation(), c())
  }, l);
  return e.copy !== !1 && o.push(a("copy", "Copy source", () => cr(n))), e.download !== !1 && o.push(a("download", "Download source", () => ur(
    n,
    typeof e.download == "string" ? e.download : i
  ))), t("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem", width: "100%" } }, o);
}
const se = ["en", "fr", "ar"], U = {
  IMAGE: [".apng", ".avif", ".ico", ".gif", ".tiff", ".webp", ".jpeg", ".png", ".jpg"],
  VIDEO: [".mp4", ".avi", ".mov", ".wmv", ".avchd", ".flv", ".f4v", ".swf", ".mkv", ".webm", ".html5", ".mpeg-2"],
  AUDIO: [".mp3", ".wav", ".aiff", ".flac", ".m4a", ".ogg", ".aac", ".wma", ".ape", ".realaudio"],
  OFFICE: {
    DOCX: [".docx", ".Docx"],
    XLSX: [".xlsx", ".Xlsx"],
    GENERAL: [".doc", ".xls", ".md", ".txt", ".pptx"]
  },
  CODE: [".py", ".php", ".c", ".sh", ".rs", ".cpp"],
  TEXT: [".txt", ".tex", ".md", ".html"],
  STYLE: [".css", ".scss", ".sass"]
}, lr = ["//www.youtube", "//youtube", "//www.youtu.be", "//youtu.be"], Kt = {
  md: "markdown",
  txt: "text",
  py: "python",
  js: "javascript",
  ts: "typescript",
  json: "json",
  html: "markup",
  css: "css",
  scss: "css",
  sass: "css",
  sh: "bash",
  tex: "latex",
  rs: "rust",
  c: "c",
  cpp: "cpp",
  vue: "html",
  php: "php"
}, $t = function(t) {
  return typeof t != "object" || t === null ? !1 : t.__v_isVNode === !0 ? !0 : Object.prototype.hasOwnProperty.call(t, "context") && Object.prototype.hasOwnProperty.call(t, "tag");
}, dr = function(t) {
  if (typeof t != "string") return !1;
  const e = /^\d{4}-\d{2}-\d{2}$/;
  if (t.match(e) === null) return !1;
  const n = new Date(t), r = n.getTime();
  return typeof r != "number" || Number.isNaN(r) ? !1 : n.toISOString().startsWith(t);
};
function vt(t) {
  return t == null || Array.isArray(t) && t.length === 0 || typeof t == "object" && Object.keys(t).length === 0 || typeof t == "string" && t.trim() === "" || t instanceof Set && t.size === 0;
}
function Jt(t) {
  return !vt(t);
}
function ut(t) {
  return typeof t == "object" && !Array.isArray(t) && t !== null && !(t instanceof Function);
}
const on = {
  required(t, e = {}) {
    var n;
    return e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: "This field is required.", fr: "Ce champ est requis.", ar: "هذه الخانة مطلوبه." }), t && t.length != 0 || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message);
  },
  banned(t, e = {}) {
    var n, r;
    return e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `"${t}" is banned`, fr: `"${t}" est interdite`, ar: `"${t}" محظور` }), Array.isArray(e.banned) ? !e.banned.includes(t) || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message) : typeof e.banned == "string" ? e.banned != t || ((r = e.message) == null ? void 0 : r[e.lg]) || JSON.stringify(e.message) : !0;
  },
  includes(t, e = {}) {
    var n, r;
    return e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `"${t}" does not contain "${e.containingValues}"`, fr: `"${t}" ne contient pas "${e.containingValues}"`, ar: `"${t}" لا يحتوي على "${e.containingValues}"` }), Array.isArray(e.containingValues) ? e.containingValues.every((i) => t.includes(i)) || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message) : typeof e.containingValues == "string" ? t && t.includes(e.containingValues) || ((r = e.message) == null ? void 0 : r[e.lg]) || JSON.stringify(e.message) : !0;
  },
  excludes(t, e = {}) {
    var n, r;
    return e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `"${t}" must not contain "${e.containingValues}"`, fr: `"${t}" ne doivent pas contenir "${e.containingValues}"`, ar: `"${t}" يجب ألا تحتوي "${e.containingValues}"` }), Array.isArray(e.containingValues) ? e.containingValues.every((i) => !t.includes(i)) || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message) : typeof e.containingValues == "string" ? !t.includes(e.containingValues) || ((r = e.message) == null ? void 0 : r[e.lg]) || JSON.stringify(e.message) : !0;
  },
  username(t, e = {}) {
    var n;
    return e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: "Only letters, numbers and underscore are allowed.", fr: "Chiffres et soulignement autorisés", ar: "فقط الحروف والأرقام والأحرف السفلية مسموح بها" }), /^[a-zA-Z0-9_]+$/.test(t) || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message);
  },
  maxLength(t, e = {}) {
    var n;
    return e.len ?? (e.len = 25), e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `Max ${e.len} characters allowed.`, fr: `Au maximum ${e.len} caractères sont autorisés.`, ar: `الحد الأقصى المسموح به من الأحرف ${e.len}.` }), t && t.length <= e.len || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message);
  },
  minLength(t, e = {}) {
    var n;
    return e.len ?? (e.len = 4), e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `Min ${e.len} characters allowed.`, fr: `Au minimum ${e.len} caractères sont autorisés.`, ar: `الحد الأدنى المسموح به من الأحرف ${e.len}.` }), t && t.length >= e.len || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message);
  },
  upperCharNb(t, e = {}) {
    var n;
    if (e.len ?? (e.len = 1), e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `At least ${e.len} Uppercase letter is needed.`, fr: `Au moins ${e.len} lettre majuscule.`, ar: `مطلوب على الأقل ${e.len} حرف كبير.` }), t) {
      const r = JSON.stringify(t).match(/[A-Z]/g);
      return r && r.length >= e.len || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message);
    }
    return !0;
  },
  lowerCharNb(t, e = {}) {
    var n;
    if (e.len ?? (e.len = 1), e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `At least ${e.len} lowercase letter is needed.`, fr: `Au moins ${e.len} lettre minuscule.`, ar: `مطلوب على الأقل ${e.len} حرف صغير.` }), t) {
      const r = JSON.stringify(t).match(/[a-z]/g);
      return r && r.length >= e.len || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message);
    }
    return !0;
  },
  specialCharNb(t, e = {}) {
    var n;
    if (e.len ?? (e.len = 1), e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `At least ${e.len} special characters is needed.`, fr: `Au moins ${e.len} caractère spécial.`, ar: `مطلوب ما لا يقل عن ${e.len} حرف خاص` }), t) {
      const r = JSON.stringify(t).match(/[@#$%^&*()_+\-=[\]{}!`;':"\\|,.<>/?]/g);
      return r && r.length - 2 >= e.len || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message);
    }
    return !0;
  },
  digitCharNb(t, e = {}) {
    var n;
    if (e.len ?? (e.len = 1), e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `At least ${e.len} digit is needed.`, fr: `Au moins ${e.len} chiffre.`, ar: `مطلوب ما لا يقل عن ${e.len} رقم.` }), t) {
      const r = JSON.stringify(t).match(/[1-9]/g);
      return r && r.length >= e.len || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message);
    }
    return !0;
  },
  isValidDate(t, e = {}) {
    var o, a;
    if (e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `"${t}" is not a valid date.`, fr: `"${t}" n'est pas une date valide`, ar: `"${t}" ليس تاريخًا صالحًا.` }), !/^\d\d\d\d-\d\d\-\d\d$/.test(t)) return ((o = e.message) == null ? void 0 : o[e.lg]) || JSON.stringify(e.message);
    const n = t.split("-").map((s) => parseInt(s, 10)), r = new Date(n[0], n[1] - 1, n[2]);
    return r.getMonth() === n[1] - 1 && r.getDate() === n[2] && r.getFullYear() === n[0] || ((a = e.message) == null ? void 0 : a[e.lg]) || JSON.stringify(e.message);
  },
  email(t, e = {}) {
    var n;
    return e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `"${t}" Invalid format.`, fr: "Format non valide.", ar: "شكل غير صالح." }), /^\w+([.\-+]?\w+)*\+*@\w+([.-]?\w+)*(\.\w{2,24})+$/.test(t) || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message);
  },
  phone(t, e = {}) {
    var n;
    return e.lg ?? (e.lg = "en"), e.message ?? (e.message = { en: `"${t}" Invalid format.`, fr: "Format non valide.", ar: "تنسيق غير صالح." }), /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(t) || ((n = e.message) == null ? void 0 : n[e.lg]) || JSON.stringify(e.message);
  }
}, sn = /^on[A-Z]/, pr = /* @__PURE__ */ new Set(["class", "style"]);
function kt(t) {
  const e = String(t);
  return sn.test(e) ? e : `on${e.charAt(0).toUpperCase()}${e.slice(1)}`;
}
function an(t, e) {
  if (e === null) return !0;
  const n = typeof e;
  return n !== "object" && n !== "function" || pr.has(t) ? !0 : sn.test(String(t)) ? n === "function" || Array.isArray(e) && e.every((r) => typeof r == "function") : !1;
}
function cn(t) {
  return typeof t == "string" && !/^[A-Z]/.test(t);
}
function me(t, e) {
  if (!e || typeof e != "object" || !cn(t)) return e;
  const n = Object.keys(e), r = n.filter((o) => an(o, e[o]));
  if (r.length === n.length) return e;
  const i = {};
  for (const o of r) i[o] = e[o];
  return i;
}
const bt = (t, e) => {
  if (!t || !e) return !1;
  const n = t.split("?")[0].split("#")[0].toLowerCase();
  return e.some((r) => n.endsWith(r.toLowerCase()));
}, un = (t) => t.startsWith("http://") || t.startsWith("https://") ? "online" : t.startsWith("/") ? "served" : t.startsWith("./") || t.startsWith("../") ? "local" : "text", ln = (t, e, n = {}) => {
  const r = {
    title: e,
    src: e,
    class: "container",
    ...n
  };
  return e.includes(".ico") && (r.alt = "Icon"), t("img", r);
}, ye = (t, e, n = {}) => t("video", {
  title: e,
  src: e,
  controls: !0,
  frameborder: "0",
  allow: "autoplay; encrypted-media",
  allowfullscreen: !0,
  referrerpolicy: "strict-origin-when-cross-origin",
  class: "container",
  ...n
}), ge = (t, e, n = {}) => t("audio", {
  title: e,
  src: e,
  controls: !0,
  autoplay: !1,
  class: "container",
  style: {
    height: "revert",
    width: "revert"
  },
  ...n
}), dn = (t, e, n = {}) => {
  let r = "";
  try {
    const s = new URL(e);
    s.hostname === "youtu.be" ? r = s.pathname.split("/").filter(Boolean)[0] || "" : s.pathname.startsWith("/embed/") ? r = s.pathname.split("/")[2] || "" : r = s.searchParams.get("v") || "";
  } catch {
  }
  const i = r ? `https://www.youtube-nocookie.com/embed/${r}` : e.replace(".com/", "-nocookie.com/embed/").replace(".be/", "be-nocookie.com/embed/"), o = /^[A-Za-z0-9_-]+$/.test(r) ? r : "", a = o ? `<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}a{display:block;position:relative;height:100%;background:#000}img{width:100%;height:100%;object-fit:cover}.play{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font:64px/1 sans-serif;color:white;text-shadow:0 2px 8px #000}</style><a href="${i}" aria-label="Play YouTube video"><img src="https://i.ytimg.com/vi/${o}/hqdefault.jpg" alt=""><span class="play">▶</span></a>` : void 0;
  return t("iframe", {
    class: "video-stream html5-main-video container",
    title: e,
    src: i,
    ...a ? { srcdoc: a } : {},
    controls: !0,
    frameborder: "0",
    allow: "autoplay; encrypted-media",
    allowfullscreen: !0,
    referrerpolicy: "strict-origin-when-cross-origin",
    ...n
  });
};
function fr(t) {
  if (!t || typeof t != "object") return t;
  const { scope: e, comp: n, ...r } = t;
  return r;
}
function tt(t) {
  return typeof t != "string" ? !1 : /^<~?[A-Za-z][\w.-]*(,[^<>]*)?>$/.test(t.trim());
}
const hr = ["comp", "options", "header", "footer", "hOptions", "hHeader", "hFooter", "output", "switch", "wrap", "to", "asChild"];
function be(t, e) {
  if (!t || typeof t != "object" || Array.isArray(t) || typeof e == "function" && e(t)) return !1;
  for (const n of Object.keys(t)) {
    if (hr.includes(n)) return !1;
    const r = t[n];
    if (tt(r) && r.includes("~")) return !1;
  }
  return Object.keys(t).length > 0;
}
function mr(t) {
  return tt(t) ? t.trim().slice(1, -1).includes(",") : !1;
}
function Ht(t) {
  if (!tt(t)) return null;
  const n = t.trim().slice(1, -1).split(",").map((s) => s.trim()), r = n[0].replace("~", ""), i = n[1] || "", o = n[2] || "", a = {};
  return i && (a.class = i), o && (a.to = o), { comp: r, options: a, __tilde: n[0].includes("~") };
}
function yr(t) {
  if (!t || typeof t != "object" || typeof t.comp != "string") return null;
  const e = t.options || {};
  if (Object.keys(e).filter((a) => !["class", "to"].includes(a)).length) return null;
  const r = typeof e.class == "string" ? e.class : "", i = typeof e.to == "string" ? e.to : "", o = [t.comp];
  return (r || i) && o.push(r), i && o.push(i), `<${o.join(",")}>`;
}
function gr(t, e, n) {
  const r = Ht(t);
  if (!r) return t;
  const i = typeof (e == null ? void 0 : e.class) == "string" ? e.class : "", o = r.options.class || "", a = n ? i || o : [o, i].filter(Boolean).join(" "), s = {
    comp: (r.__tilde ? "~" : "") + r.comp,
    options: {
      ...n ? {} : r.options,
      ...e,
      ...a ? { class: a } : {}
    }
  };
  return delete s.options.scope, s;
}
function br(t) {
  let e = (t == null ? void 0 : t.switch) === !0 ? (t == null ? void 0 : t.hComp) || (t == null ? void 0 : t.comp) : (t == null ? void 0 : t.comp) || (t == null ? void 0 : t.hComp);
  return typeof e == "string" ? e.replace("~", "").replace("*", "").replace("<", "").replace(">", "") : e;
}
function wr(t, e) {
  var s, l, c;
  const n = e || this;
  let r = (t == null ? void 0 : t.switch) === !0 ? (t == null ? void 0 : t.hOptions) || (t == null ? void 0 : t.options) : (t == null ? void 0 : t.options) || (t == null ? void 0 : t.hOptions);
  r || (t && typeof t == "object" && !t.comp ? r = t : r = {}), r = {
    ...r,
    ...n.menu ? (s = r == null ? void 0 : r.menu) == null ? void 0 : s.activeOptions : (l = r == null ? void 0 : r.menu) != null && l.active ? (c = r == null ? void 0 : r.menu) == null ? void 0 : c.activeRootOptions : {}
  };
  const i = "validators" in n ? n.validators || {} : {}, o = r != null && r.rules ? { ...on, ...i } : null;
  let a = [];
  if (Array.isArray(r == null ? void 0 : r.rules) ? a = ((r == null ? void 0 : r.rules) || []).map((p) => o != null && o[p] ? (f) => o[p](f, { lg: n.lang }) : p) : typeof (r == null ? void 0 : r.rules) == "object" && (r == null ? void 0 : r.rules) !== null && (a = Object.entries(r.rules).map(([p, f]) => o[p] && typeof f == "function" ? f : o[p] && typeof f == "object" ? (u) => o[p](u, f) : o != null && o[p] ? (u) => o[p](u, { lg: n.lang, message: f }) : typeof f == "function" ? f : () => f)), typeof r != "object" || r === null)
    return n.objLang(r, n.lang);
  if (r.props || (r.props = {}), a.length >= 1 && (r.props.rules = a, r.rules = a), typeof (t == null ? void 0 : t.switch) == "boolean") {
    const p = (t == null ? void 0 : t.switchEvent) || "mouseenter", f = kt(p);
    n.itemListeners[f] = (u) => {
      t.switch = !t.switch;
    };
  } else if (t instanceof Object) {
    const p = t[(t == null ? void 0 : t.switch) || "options"];
    p !== t.options && (t.options = p);
  }
  return n.objLang(r, n.lang);
}
function _r(t, e, n) {
  const r = n || this;
  let i = (t == null ? void 0 : t.switch) === !0 ? (t == null ? void 0 : t.hHeader) || (t == null ? void 0 : t.header) : (t == null ? void 0 : t.header) || (t == null ? void 0 : t.hHeader);
  return i ? e("WBC", {
    keyy: `wbc-key-header-${r.computedKey}`,
    item: i
  }) : null;
}
function Cr(t, e, n) {
  const r = n || this;
  let i = (t == null ? void 0 : t.switch) === !0 ? (t == null ? void 0 : t.hFooter) || (t == null ? void 0 : t.footer) : (t == null ? void 0 : t.footer) || (t == null ? void 0 : t.hFooter);
  return i ? e("WBC", {
    keyy: `wbc-key-footer-${r.computedKey}`,
    item: i
  }) : null;
}
function Or(t, e, n) {
  var o, a, s, l;
  const r = n || this;
  let i = (t == null ? void 0 : t.switch) === !0 ? ((o = t == null ? void 0 : t.hOptions) == null ? void 0 : o.headers) || ((a = t == null ? void 0 : t.options) == null ? void 0 : a.headers) : ((s = t == null ? void 0 : t.options) == null ? void 0 : s.headers) || ((l = t == null ? void 0 : t.hOptions) == null ? void 0 : l.headers);
  return i ? r.toWBC_(i, e) : null;
}
function Wr(t, e, n) {
  var o, a, s, l;
  const r = n || this;
  let i = (t == null ? void 0 : t.switch) === !0 ? ((o = t == null ? void 0 : t.hOptions) == null ? void 0 : o.footers) || ((a = t == null ? void 0 : t.options) == null ? void 0 : a.footers) : ((s = t == null ? void 0 : t.options) == null ? void 0 : s.footers) || ((l = t == null ? void 0 : t.hOptions) == null ? void 0 : l.footers);
  return i ? r.toWBC_(i, e) : null;
}
function xr(t, e) {
  var r, i, o, a;
  return (e || this).isPlainObject(t) ? (t == null ? void 0 : t.switch) === !0 ? ((r = t == null ? void 0 : t.hOptions) == null ? void 0 : r.html) || ((i = t == null ? void 0 : t.options) == null ? void 0 : i.html) : ((o = t == null ? void 0 : t.options) == null ? void 0 : o.html) || ((a = t == null ? void 0 : t.hOptions) == null ? void 0 : a.html) : t;
}
const $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _getPathType: un,
  _matchesFileType: bt,
  _mergeTagWithOptions: gr,
  _renderAudio: ge,
  _renderImage: ln,
  _renderVideo: ye,
  _renderYouTube: dn,
  _stripScope: fr,
  _tagHasOptions: mr,
  _tagStrToWBC: Ht,
  _wbcObjToTagStr: yr,
  _wbcOptions: wr,
  comp: br,
  globalFooterVN: Cr,
  globalHeaderVN: _r,
  hasAttributeForm: an,
  html: xr,
  insideFootersVN: Wr,
  insideHeadersVN: Or,
  isChildrenMap: be,
  isPlainElementType: cn,
  isTagToken: tt,
  stripNonAttributeProps: me,
  toVue3ListenerKey: kt
}, Symbol.toStringTag, { value: "Module" }));
function vr(t, e, n) {
  return typeof e == "boolean" ? n("VCheckbox", {
    keyy: `bool-${t.computedKey}-${Number(e)}`,
    modelValue: e,
    // Primitives reach this renderer by value.  There is no parent slot to
    // update, so advertising v-model handlers would silently discard input.
    readonly: !0
  }) : typeof e == "number" ? n("span", {}, [e]) : null;
}
function kr(t, e, n) {
  let r;
  return ["tracker", "init", "update", "init0"].includes(e == null ? void 0 : e.name) ? r = null : (e == null ? void 0 : e.length) === 0 ? r = n(e) : (e == null ? void 0 : e.length) === 1 ? r = e(n) : r = [
    n("div", { class: "red--text" }, [
      "Function got more than 1 arguments (Expected 0 or 1 argument)",
      n("div", {}, [e.toString()])
    ])
  ], r;
}
function pn(t, e, n, r, i = {}) {
  var a, s, l, c, p;
  const o = ((s = (a = t == null ? void 0 : t.$options) == null ? void 0 : a.components) == null ? void 0 : s.WBLatex) || ((p = (c = (l = t == null ? void 0 : t.$) == null ? void 0 : l.appContext) == null ? void 0 : c.components) == null ? void 0 : p.WBLatex);
  return t && !o ? e("div", {
    style: { backgroundColor: "#F8F9FA", color: "red", width: "100%", height: "100%", margin: "10px" }
  }, ['#WBLatexMissing: "wb-latex" not registered']) : e("div", { title: r, ...i }, [
    e("div", (t != null && t.parseTexFile ? t.parseTexFile(n) : []).map((f) => {
      if (f.type === "text") return e("div", [e("WBHtml", { html: f.content })]);
      if (f.type === "math") return e("WBLatex", { expression: f.expression, "display-mode": f.displayMode ?? !1 });
      if (f.type === "mixed")
        return e(
          "div",
          { class: "d-inline-flex align-center" },
          f.lineContent.map(
            (u) => u.expression ? e("WBLatex", { expression: u.expression, "display-mode": !1 }) : e("WBHtml", { html: u.content })
          )
        );
    }))
  ]);
}
const Sr = {
  millisecond: 1,
  second: 1e3,
  minute: 60 * 1e3,
  hour: 3600 * 1e3,
  day: 1440 * 60 * 1e3,
  week: 10080 * 60 * 1e3
};
function jr(t = "millisecond") {
  if (t === "M") return "month";
  const e = String(t).toLowerCase();
  return e === "ms" || e === "milliseconds" ? "millisecond" : e === "s" || e === "seconds" ? "second" : e === "m" || e === "minutes" ? "minute" : e === "h" || e === "hours" ? "hour" : e === "d" || e === "days" ? "day" : e === "w" || e === "weeks" ? "week" : e === "month" || e === "months" ? "month" : e === "year" || e === "years" || e === "y" ? "year" : "millisecond";
}
function Le(t) {
  return t && typeof t.toDate == "function" ? t.toDate() : t instanceof Date ? new Date(t.getTime()) : t == null ? /* @__PURE__ */ new Date() : new Date(t);
}
function Ve(t, e) {
  return (t.getFullYear() - e.getFullYear()) * 12 + (t.getMonth() - e.getMonth());
}
function fn(t) {
  const e = Le(t);
  return {
    diff(n, r = "millisecond", i = !1) {
      const o = Le(n), a = jr(r);
      let s;
      return a === "month" ? s = Ve(e, o) : a === "year" ? s = Ve(e, o) / 12 : s = (e.getTime() - o.getTime()) / Sr[a], i ? s : Math.trunc(s);
    },
    format() {
      return Number.isNaN(e.getTime()) ? "Invalid Date" : e.toISOString();
    },
    isValid() {
      return !Number.isNaN(e.getTime());
    },
    toDate() {
      return new Date(e.getTime());
    },
    toISOString() {
      return e.toISOString();
    },
    valueOf() {
      return e.getTime();
    }
  };
}
function Er(t) {
  return typeof (t == null ? void 0 : t.dayjs) == "function" ? t.dayjs.bind(t) : typeof (t == null ? void 0 : t.$dayjs) == "function" ? t.$dayjs.bind(t) : typeof globalThis < "u" && typeof globalThis.dayjs == "function" ? globalThis.dayjs : fn;
}
function Tr(t, e, n = "core") {
  var l, c, p, f;
  const r = typeof t < "u" && "$cookies" in t ? t.$cookies : void 0, i = Er(t), o = {
    get: (u) => typeof t.getCookie == "function" ? t.getCookie(u) : r != null && r.get ? r.get(u) : Y.get(u),
    set: (u, d, m) => {
      var g, y;
      let b;
      return typeof t.setCookie == "function" ? b = t.setCookie(u, d, m) : r != null && r.set ? b = r.set(u, d, m) : b = Y.set(u, d, m), u === "lg" && d && ((y = (g = t.$store) == null ? void 0 : g.commit) == null || y.call(g, "updateLang", d)), b;
    },
    remove: (u, d) => typeof t.removeCookie == "function" ? t.removeCookie(u) : r != null && r.remove ? r.remove(u) : Y.remove(u, d),
    ...r || {},
    state: typeof t.getCookies == "function" ? t.getCookies : () => Y.get() || {}
  }, a = Object.create(localStorage);
  Object.assign(a, {
    getItem: localStorage.getItem.bind(localStorage),
    setItem: localStorage.setItem.bind(localStorage),
    removeItem: localStorage.removeItem.bind(localStorage),
    clear: localStorage.clear.bind(localStorage),
    key: localStorage.key.bind(localStorage),
    get: (u = t.nameEl) => localStorage.getItem(u),
    set: (u = t.nameEl, d) => localStorage.setItem(u, d)
  }), Object.defineProperty(a, "length", {
    get: () => localStorage.length,
    enumerable: !0
  });
  const s = {
    userTier: n,
    nameEl: t.nameEl,
    props: t.$props,
    data: t.$data,
    toggleLoad: (u) => {
      u !== void 0 ? t.load_ = u : t.load_ = !t.load_;
    },
    toggleProtected: (u) => {
      u !== void 0 ? t.protected_ = u : t.protected_ = !t.protected_;
    },
    toggleFloat: (u) => {
      u !== void 0 ? t.float_ = u : t.float_ = !t.float_;
    },
    toggleClose: (u) => {
      u !== void 0 ? t.close_ = u : t.close_ = !t.close_;
    },
    toggleFocus: (u) => {
      u !== void 0 ? t.focus_ = u : t.focus_ = !t.focus_;
    },
    toggleDrag: (u) => {
      u !== void 0 ? t.drag_ = u : t.drag_ = !t.drag_;
    },
    toggleHide: (u) => {
      u !== void 0 ? t.hide_ = u : t.hide_ = !t.hide_;
    },
    update: (u) => {
      t.update(u);
    },
    compKey: () => t.compKey,
    lg: {
      lang: t.lang,
      get: () => {
        var u, d;
        return ((d = (u = t == null ? void 0 : t.$store) == null ? void 0 : u.state) == null ? void 0 : d.lg) || "en";
      },
      set: (u) => {
        t.$store.commit("updateLang", u);
      }
    },
    dayjs: i,
    emit: (u, d) => {
      t.$emit(u, d);
    },
    isValid: () => t.internalValueIsValid,
    cookies: o,
    key: t.key_
  };
  return Object.defineProperty(s, "data", {
    get() {
      return t.item_;
    },
    set(u) {
      typeof u == "string" || typeof u == "number" || typeof u == "boolean" ? (t.item_ = null, t.$nextTick(() => {
        t.item_ = u;
      })) : t.item_ = u;
    },
    enumerable: !0,
    configurable: !0
  }), Object.assign(s, {
    root: t.$root,
    ref: (u) => t.$refs[u],
    el: (u) => t.$el,
    routeParams: () => {
      var u;
      return ((u = t.$route) == null ? void 0 : u.params) || {};
    },
    val: (u) => t.val(u),
    isValidFn: (u) => t.isValid(u),
    set: (u, d = "item_") => {
      t.$data[d] = u;
    },
    get: (u = "item_") => t.$data[u],
    refs: t == null ? void 0 : t.$refs,
    content: () => t.contentRegistry,
    proto: Object.getPrototypeOf(t),
    vm: t,
    emit: t.$emit,
    markdown: { md2Html: (u) => t.$md.render(u), html2Md: (u) => t.$turnDown.turndown(u) },
    store: t.$store,
    router: t.$router,
    routes: (c = (l = t == null ? void 0 : t.$router) == null ? void 0 : l.options) != null && c.routes ? Object.fromEntries(
      (f = (p = t == null ? void 0 : t.$router) == null ? void 0 : p.options) == null ? void 0 : f.routes.map((u) => [u.name, u])
    ) : null,
    watch: (u, d, m) => t.$watch(u, d, m),
    queryData: t.queryData,
    aes: { enc: t.aesEnc, dec: t.aesDec },
    lzStr: Qe,
    validators: { ...on, ..."validators" in t ? t.validators || {} : {} },
    storage: a,
    cookies: o,
    dayjs: i,
    trigger: (u, ...d) => {
      if (typeof t[u] == "function") return t[u](...d);
      console.warn(`[WBC-UI3] Method '${u}' not found on component instance.`);
    }
  }), Object.defineProperty(s, "focusOn", { get() {
    return t.focusOn_;
  }, set(u) {
    t.focusOn_ = u;
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(s, "protected", { get() {
    return t.protected_;
  }, set(u) {
    t.protected_ = u;
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(s, "focus", { get() {
    return t.focus_;
  }, set(u) {
    t.focus_ = u;
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(s, "load", { get() {
    return t.load_;
  }, set(u) {
    t.load_ = u;
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(s, "float", { get() {
    return t.float_;
  }, set(u) {
    t.float_ = u;
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(s, "drag", { get() {
    return t.drag_;
  }, set(u) {
    t.drag_ = u;
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(s, "close", { get() {
    return t.close_;
  }, set(u) {
    t.close_ = u;
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(s, "hide", { get() {
    return t.hide_;
  }, set(u) {
    t.hide_ = u;
  }, enumerable: !0, configurable: !0 }), Object.defineProperty(s, "user", {
    get() {
      var u, d, m, b;
      return ((d = (u = t.$store) == null ? void 0 : u.state) == null ? void 0 : d.user) ?? ((b = (m = t.$store) == null ? void 0 : m.getters) == null ? void 0 : b.user) ?? {};
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(s, "loggedIn", {
    get() {
      var u, d, m, b;
      return ((d = (u = t.$store) == null ? void 0 : u.state) == null ? void 0 : d.loggedIn) ?? ((b = (m = t.$store) == null ? void 0 : m.getters) == null ? void 0 : b.loggedIn) ?? !1;
    },
    enumerable: !0,
    configurable: !0
  }), s;
}
function hn(t, e = /* @__PURE__ */ new WeakSet()) {
  if (t === null || typeof t != "object" || t instanceof Function || t._isVue || t.$options || t.__v_isVNode || e.has(t))
    return 0;
  e.add(t);
  let n = 0;
  for (const r in t)
    if (Object.prototype.hasOwnProperty.call(t, r)) {
      const i = hn(t[r], e);
      n = Math.max(n, i);
    }
  return n + 1;
}
const Ar = {
  methods: {
    startDrag(t) {
      this.draggable = !0, this.dragStartX = t.clientX - this.offsetX, this.dragStartY = t.clientY - this.offsetY, document.addEventListener("mousemove", this.doDrag), document.addEventListener("mouseup", this.endDrag), t.preventDefault();
    },
    doDrag(t) {
      this.draggable && (this.offsetX = t.clientX - this.dragStartX, this.offsetY = t.clientY - this.dragStartY);
    },
    endDrag() {
      this.draggable = !1, document.removeEventListener("mousemove", this.doDrag), document.removeEventListener("mouseup", this.endDrag);
    }
  }
}, mn = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]), lt = function(t, e = /* @__PURE__ */ new WeakMap()) {
  if (t == null || typeof t != "object") return t;
  if (t._isVue || t.$options || t.__v_isVNode || t._scope || t._effects || t.vm) return "vue object cannot be cloned";
  if (t instanceof Date) {
    const r = /* @__PURE__ */ new Date();
    return r.setTime(t.getTime()), r;
  }
  if (Array.isArray(t)) {
    const r = [];
    for (let i = 0, o = t.length; i < o; i++) r[i] = lt(t[i], e);
    return r;
  }
  if (e.has(t)) return e.get(t);
  const n = {};
  e.set(t, n);
  for (let r in t)
    Object.prototype.hasOwnProperty.call(t, r) && !mn.has(r) && (n[r] = lt(t[r], e));
  return n;
}, yn = function(t, ...e) {
  (typeof t != "object" || t === null) && (t = {});
  for (const n of e)
    if (!(typeof n != "object" || n === null)) {
      for (const r in n)
        if (Object.prototype.hasOwnProperty.call(n, r) && !mn.has(r)) {
          const i = t[r], o = n[r];
          ut(o) ? t[r] = ut(i) ? yn(i, o) : lt(o) : Array.isArray(o) ? t[r] = lt(o) : t[r] = o;
        }
    }
  return t;
};
function Lr(t, e) {
  function n(r) {
    return Array.isArray(r) ? r.map(n) : typeof r == "string" && e.hasOwnProperty(r) ? e[r] : r;
  }
  return t.map(n);
}
function Vr(t, e, n = "default_") {
  function r(a) {
    return a.toString();
  }
  function i(a, s, l) {
    s.forEach((c, p) => {
      const f = l + r(p);
      Array.isArray(c) ? (a[f] = {}, i(a[f], c, "")) : typeof c == "string" && e.hasOwnProperty(c) ? a[f] = e[c] : a[f] = c;
    });
  }
  const o = {};
  return i(o, t, n), o;
}
function gn(t, e) {
  if (t === null || typeof t != "object")
    return typeof t == "string" && e.hasOwnProperty(t) ? e[t] : t;
  const n = Array.isArray(t) ? [] : {};
  for (const r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (n[r] = gn(t[r], e));
  return n;
}
function Nt(t, e) {
  if (t === null || typeof t != "object")
    return typeof t == "string" && e.hasOwnProperty(t) ? e[t] : t;
  const n = Array.isArray(t) ? [] : {};
  if (Array.isArray(t))
    for (let r = 0; r < t.length; r++) n[r] = Nt(t[r], e);
  else
    for (const r in t)
      Object.prototype.hasOwnProperty.call(t, r) && (n[r] = Nt(t[r], e));
  return n;
}
const ae = (t, e) => {
  let n = lt(t);
  if (typeof n == "function" || vt(n) || $t(n)) return n;
  if (Array.isArray(n))
    for (let r = 0; r < n.length; r++) n[r] = ae(n[r], e);
  else if (typeof n == "object" && n !== null)
    for (let r in n)
      n.hasOwnProperty(r) && (n[r] = ae(n[r], e));
  else return e(n);
  return n;
}, Br = (t) => {
  const e = (r) => r.toString().replace(/\s+/g, " ").trim();
  if (typeof t == "function") return e(t);
  if (typeof t != "object" || t === null) return JSON.stringify(t);
  const n = (r) => {
    const i = Array.isArray(r) ? [] : {};
    for (const [o, a] of Object.entries(r))
      typeof a == "function" ? i[o] = e(a) : typeof a == "object" && a !== null ? i[o] = n(a) : i[o] = a;
    return i;
  };
  return JSON.stringify(n(t));
}, Ir = (t, e) => {
  const n = (r) => {
    if (typeof r == "string")
      try {
        return JSON.parse(r);
      } catch {
        return e ? e(r) : r;
      }
    else if (typeof r == "object" && r !== null) {
      if (Array.isArray(r)) return r.map(n);
      const i = {};
      for (const [o, a] of Object.entries(r)) i[o] = n(a);
      return i;
    }
    return r;
  };
  return n(t);
}, bn = function(t, e) {
  const n = lt(t), r = (i, o) => typeof i == "function" || vt(i) || $t(i) ? i : typeof i == "object" && i !== null ? Array.isArray(i) ? i.map((a) => r(a, o)) : bn(i, o) : o && o.hasOwnProperty(i) ? o[i] : i;
  if (Array.isArray(n))
    for (let i = 0; i < n.length; i++) n[i] = r(n[i], e);
  else if (typeof n == "object" && n !== null)
    for (let i in n)
      n.hasOwnProperty(i) && (n[i] = r(n[i], e));
  else return r(n, e);
  return n;
}, Nr = ["error", "lang", "val", "txt", "json", "blob", "text", "init", "tracker", "encFn", "decFn", "resolved", "owners", "filter", "alert", "context", "item-value", "item-text"], Vt = function(t, e = {}, n = "en", r = Nr) {
  if (!t || vt(t) || $t(t)) return t;
  if (typeof t == "function") return t.length >= 1 ? (...o) => t(e, ...o) : t;
  const i = lt(t);
  if (Array.isArray(i)) {
    for (let o = 0; o < i.length; o++)
      r.includes(i[o]) || (i[o] = Vt(i[o], e, n, r));
    return i;
  }
  if (i instanceof Object) {
    for (const [o, a] of Object.entries(i))
      if (!r.includes(o))
        if (typeof a == "function") {
          if (a.length >= 2) i[o] = (...s) => a(e, ...s);
          else if (a.length === 1) {
            let s = a(e);
            s instanceof Object ? typeof s == "function" ? i[o] = s : s.hasOwnProperty(n) ? i[o] = s[n] : i[o] = Vt(s, e, n, r) : i[o] = s;
          }
        } else i[o] = Vt(a, e, n, r);
    return i;
  }
  return i;
}, et = function(t, e) {
  if (!(t instanceof Object) || typeof t == "function" || t === null || t === void 0 || Number.isNaN(t) || t._isVue || t.__v_isVNode) return t;
  if (Array.isArray(t)) return t.map((r) => et(r, e));
  if (t.hasOwnProperty(e)) return et(t[e], e);
  let n = { ...t };
  for (const [r, i] of Object.entries(n)) r || (n[r] = et(i, e));
  return n;
}, wn = function(t) {
  let e = [];
  for (let n = 0; n < t.length; n++)
    Array.isArray(t[n]) ? e = e.concat(wn(t[n])) : e.push(t[n]);
  return e;
}, _n = ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue", "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown", "blue-grey", "grey", "shades", "black", "white", "transparent"], Fr = ["red", "pink", "purple", "indigo", "blue", "cyan", "teal", "green", "lime", "yellow", "amber", "orange", "brown", "grey", "shades", "white"], Dr = function() {
  const t = "0123456789ABCDEF";
  let e = "#";
  for (let n = 0; n < 6; n++) e += t[Math.floor(Math.random() * 16)];
  return e;
}, Pr = function(t = "", e = 1e3) {
  const i = Math.floor(Math.random() * 25 + 65), o = Math.floor(Math.random() * 25 + 65), a = Math.floor(Math.random() * e);
  return `${t}${String.fromCharCode(i, o)}${a}`;
}, Cn = function(t = 0, e) {
  return Math.floor(Math.random() * (e - t) + t);
}, On = function(t) {
  return t[Cn(0, t.length)];
}, Rr = function() {
  return On(_n);
};
function Mr(t) {
  const e = [], n = (s) => {
    s.trim() && e.push({ type: "text", content: s.trim() });
  }, r = t.split(`
`);
  let i = !1, o = "";
  for (let s = 0; s < r.length; s++) {
    const c = r[s].replace(/%.*/, "").trimEnd();
    if (i) {
      const f = c.indexOf("$$");
      f !== -1 ? (o += c.slice(0, f), o.trim() && e.push({ type: "math", expression: o.trim(), displayMode: !0 }), i = !1, o = "", a(c.slice(f + 2))) : o += c + `
`;
      continue;
    }
    const p = c.indexOf("$$");
    if (p !== -1) {
      p > 0 && a(c.slice(0, p));
      const f = c.slice(p + 2), u = f.indexOf("$$");
      if (u !== -1) {
        const d = f.slice(0, u);
        d.trim() && e.push({ type: "math", expression: d.trim(), displayMode: !0 }), a(f.slice(u + 2));
      } else
        i = !0, o = "";
      continue;
    }
    a(c);
  }
  i && o.trim() && e.push({ type: "math", expression: o.trim(), displayMode: !0 });
  function a(s, l) {
    if (!s) return;
    const c = [];
    let p = 0;
    for (; p < s.length; ) {
      const m = s.indexOf("$", p);
      if (m === -1) {
        c.push({ content: s.slice(p) });
        break;
      }
      m > p && c.push({ content: s.slice(p, m) });
      const b = s.slice(m + 1), g = b.indexOf("$");
      if (g === -1) {
        c.push({ content: s.slice(m) });
        break;
      }
      const y = b.slice(0, g);
      y.trim() && c.push({ expression: y.trim() }), p = m + 1 + g + 1;
    }
    if (c.length === 0) return;
    if (c.length === 1) {
      const m = c[0];
      m.content !== void 0 ? n(m.content) : e.push({ type: "math", expression: m.expression, displayMode: !1 });
      return;
    }
    const f = { type: "mixed", lineContent: [] };
    let u = "";
    const d = () => {
      u.trim() && (f.lineContent.push({ content: u.trim() }), u = "");
    };
    for (const m of c)
      m.content !== void 0 ? u += m.content + " " : (d(), f.lineContent.push({ expression: m.expression }));
    d(), e.push(f);
  }
  return e;
}
function Ur(t, e, n) {
  function r(i, o) {
    const a = n === void 0 || o === n;
    if (Array.isArray(i))
      for (let s = 0; s < i.length; s++)
        a && i[s] in e ? i[s] = e[i[s]] : r(i[s], o + 1);
    else if (i && typeof i == "object")
      for (const s in i)
        a && i[s] in e ? i[s] = e[i[s]] : r(i[s], o + 1);
  }
  return r(t, 0), t;
}
function Bt(t, e, n = {}) {
  const { mode: r = "first" } = n;
  if (!t || typeof t != "object" || !e || typeof e != "object")
    return r === "all" ? [] : null;
  function i(c, p) {
    const f = [];
    if (!c || typeof c != "object") return f;
    p in c && f.push(c);
    for (const u in c)
      c[u] && typeof c[u] == "object" && !Array.isArray(c[u]) && f.push(...i(c[u], p));
    return f;
  }
  function o(c, p) {
    const f = [];
    if (!c || typeof c != "object") return f;
    p in c && f.push(c[p]);
    for (const u in c)
      c[u] && typeof c[u] == "object" && !Array.isArray(c[u]) && f.push(...o(c[u], p));
    return f;
  }
  function a(c, p, f) {
    const u = {};
    return Object.keys(p).forEach((d) => {
      if (d === "_parent_") return;
      const m = p[d];
      if (m && typeof m == "object") {
        const b = m._parent_ || d, g = i(c, d);
        if (g.length > 0) {
          const y = f === "merge" ? g[g.length - 1] : g[0], C = Bt(y, m, { mode: f });
          C && Object.keys(C).length > 0 && (u[b] = C);
        }
      } else {
        const b = o(c, d);
        if (b.length > 0) {
          const g = m || d;
          u[g] = f === "merge" ? b[b.length - 1] : b[0];
        }
      }
    }), Object.keys(u).length > 0 ? u : null;
  }
  function s(c, p, f) {
    const u = {};
    return Object.keys(p).forEach((d) => {
      if (d === "_parent_") return;
      const m = p[d];
      if (m && typeof m == "object") {
        const b = m._parent_ || d, g = i(c, d);
        if (g.length > f) {
          const y = Bt(g[f], m, { mode: f });
          y && Object.keys(y).length > 0 && (u[b] = y);
        }
      } else {
        const b = o(c, d);
        if (b.length > f) {
          const g = m || d;
          u[g] = b[f];
        }
      }
    }), Object.keys(u).length > 0 ? u : null;
  }
  function l(c, p) {
    const f = Object.keys(p).filter((m) => m !== "_parent_");
    if (f.length === 0) return [];
    const u = i(c, f[0]), d = [];
    return u.forEach((m, b) => {
      const g = Bt(m, p, { mode: b });
      g && d.push(g);
    }), d;
  }
  return r === "all" ? l(t, e) : typeof r == "number" && r >= 0 ? s(t, e, r) : a(t, e, r);
}
const Wn = /* @__PURE__ */ new Date(), xn = Wn.toISOString(), zr = xn.slice(0, 10);
function Zt(t, e) {
  const n = t.replace(/^WB/, "wb-").toLowerCase(), r = `#${t}Missing: "${n}" not registered`;
  return console.error(`[WBC-UI3] ${t} is not registered. Install the "${n}" sub-package.`), e(
    "div",
    {
      style: {
        backgroundColor: "#F8F9FA",
        color: "red",
        width: "100%",
        height: "100%",
        margin: "10px"
      }
    },
    [r]
  );
}
const Kr = [
  "VMenu",
  "VDialog",
  "VTooltip",
  "VHover",
  "VDropdown",
  "VDatePicker",
  "VExpansionPanel",
  "VBottomSheet"
];
function Jr(t, e, n, r) {
  var l, c, p, f, u, d, m, b, g, y, C, w, v;
  if (!(r != null && r.menu)) return n;
  if (t.menu = t.menuOpen_ || !1, Kr.includes((l = r == null ? void 0 : r.menu) == null ? void 0 : l.comp)) {
    const $ = {
      ref: "menuHtml",
      modelValue: t.menuOpen_,
      "onUpdate:modelValue": (k) => {
        t.menuOpen_ = k;
      },
      // Ternary corrected by row 24: OPEN takes `activeOptions`, CLOSED takes
      // `options`. It previously read `self.menu?.active` — a `.active` lookup on a
      // boolean, always `undefined` — so `activeOptions` was applied unconditionally,
      // including to a closed menu.
      ...t.menu ? (c = r == null ? void 0 : r.menu) == null ? void 0 : c.activeOptions : (p = r == null ? void 0 : r.menu) == null ? void 0 : p.options
    }, E = {
      activator: ({ on: k, props: T }) => {
        var W, x;
        const V = (t.menu ? (W = r == null ? void 0 : r.menu) == null ? void 0 : W.activeRootOptions : (x = r == null ? void 0 : r.menu) == null ? void 0 : x.options) || {};
        return e(
          (r == null ? void 0 : r.comp) || "VCard",
          {
            ...V,
            // `$refs['menu']` was never registered anywhere in src/ — the ref this
            // file creates is named `menuHtml` — so this read was always `undefined`
            // and the key evaluated `undefined + false` → NaN. Vue warned on every
            // render, and because NaN !== NaN the node was re-created each pass
            // instead of patched. `self.menu` is derived from `$refs.menuHtml`
            // immediately above, so it already carries the intended value; the
            // `$refs` read here was redundant as well as dead. Plan row 21.
            key: `menu-${t.menu}`,
            ...V.attrs || {},
            ...T || {},
            ...V.on || {}
          },
          [n]
        );
      },
      default: () => [
        e("WBC", { item: r == null ? void 0 : r.menu.content })
      ]
    };
    return e((f = r == null ? void 0 : r.menu) == null ? void 0 : f.comp, $, E);
  }
  const i = {
    ...(u = r == null ? void 0 : r.menu) != null && u.active ? (m = r == null ? void 0 : r.menu) == null ? void 0 : m.activeOptions : (d = r == null ? void 0 : r.menu) == null ? void 0 : d.options
  }, o = ((b = r == null ? void 0 : r.menu) == null ? void 0 : b.event) || "click", a = `on${o.charAt(0).toUpperCase()}${o.slice(1)}`, s = {
    // Same dead `$refs['menu']` read as the activator branch — see the note there.
    // On this branch no `menuHtml` ref is registered either, so repointing the read
    // would still yield NaN; the value that actually varies is `self.menu`. Plan row 21.
    key: `menu-${t.menu}`,
    ...(g = r == null ? void 0 : r.menu) != null && g.active ? (y = r == null ? void 0 : r.menu) == null ? void 0 : y.activeRootOptions : {},
    [a]: () => {
      var $;
      r.menu.active = !(($ = r == null ? void 0 : r.menu) != null && $.active), t.key_ = `${t.key_}_`.replace("___", "_");
    }
  };
  return e(
    ((C = r == null ? void 0 : r.menu) == null ? void 0 : C.comp) || "div",
    i,
    [
      e((r == null ? void 0 : r.comp) || "div", s, [n]),
      (w = r == null ? void 0 : r.menu) != null && w.active ? e("WBC", { item: (v = r == null ? void 0 : r.menu) == null ? void 0 : v.content }) : null
    ]
  );
}
const ce = /* @__PURE__ */ new Set([
  "comp",
  "output",
  "props",
  "options",
  "hOptions",
  "switch",
  "footer",
  "footers",
  "header",
  "headers",
  "hFooter",
  "hHeader",
  "asChild",
  "wrap",
  "to",
  "disp",
  "mode",
  "prod",
  "key",
  "fStyle",
  "dive",
  "tbDive",
  "watch",
  "forward",
  "class",
  "style",
  "id",
  "attrs"
]);
function Hr(t, e, n, r) {
  if (!Array.isArray(n) || n.length === 0 || typeof n[0] != "string" || !n[0].startsWith("<") || !n[0].endsWith(">"))
    return null;
  const i = r == null ? void 0 : r.options, o = i && typeof i == "object" && Object.keys(i).some((f) => f !== "wrap" && f !== "scope"), a = n[0].includes("~"), l = (i == null ? void 0 : i.scope) || (a ? "root" : "container"), c = t._stripScope(i || {}), p = l === "update" ? "each+merge" : l;
  if (!o)
    return t.toWBC_(n, e);
  if (p === "container") {
    const f = i.comp || "div";
    return t.toWBC_(
      { comp: f, options: c },
      e,
      t.toWBC_(n, e)
    );
  }
  if (p === "root" && a) {
    const f = t._mergeTagWithOptions(n[0], c, !1), d = [t._wbcObjToTagStr(f) || n[0], ...n.slice(1)];
    return t.toWBC_(d, e);
  }
  if (p === "root" && !a)
    return t.toWBC_(
      { comp: i.comp || "div", options: c },
      e,
      t.toWBC_(n, e)
    );
  if (p === "each" || p === "each+merge" || p === "inherit") {
    const f = p === "each", u = a ? 1 : 0, d = [];
    a && d.push(n[0]);
    for (let m = u; m < n.length; m++) {
      const b = n[m];
      if (!(typeof b == "string" && b.startsWith("<") && b.endsWith(">"))) {
        d.push(b);
        continue;
      }
      if (p === "inherit" && t._tagHasOptions(b))
        d.push(b);
      else {
        const y = t._mergeTagWithOptions(b, c, f), C = t._wbcObjToTagStr(y);
        d.push(C || y);
      }
    }
    return t.toWBC_(d, e);
  }
  if (p === "wrap-each") {
    const f = i.comp || "span", u = a ? 1 : 0, d = [];
    a && d.push(n[0]);
    for (let m = u; m < n.length; m++)
      d.push({ comp: f, options: { ...c, html: n[m] } });
    return t.toWBC_(d, e);
  }
  return t.toWBC_(n, e);
}
const $n = {
  props: {
    /**
     * Main UI definition object. Can be a string, object, array, function, or VNode.
     * Defines the component structure, layout, and behavior using WBC syntax.
     * @type {string|object|array|function|VNode}
     * @default null
     */
    item: {
      type: [String, Object, Array, Function, Number],
      default: () => null
    },
    /**
     * Code display configuration for showing the WBC item source code.
     * Controls the visibility and appearance of the code block panel (development only).
     * Supports options: activator, collapsed, and additional WBCode props.
     * @type {boolean|object}
     * @default null
     */
    wbCode: {
      type: [Boolean, Object],
      default: () => null
    },
    /**
     * File code display configuration for showing linked file source code.
     * Controls the visibility and appearance of file content code blocks (development only).
     * Supports options: activator, collapsed, language, and additional WBCode props.
     * @type {boolean|object}
     * @default null
     */
    wbCodeFile: {
      type: [Boolean, Object],
      default: () => null
    },
    /**
     * Data viewer configuration for displaying item data in a table format.
     * Controls the visibility and appearance of the data viewer panel (development only).
     * Supports options: activator, collapsed, and additional WBDataViewer props.
     * @type {boolean|object}
     * @default null
     */
    wbDataViewer: {
      type: [Boolean, Object],
      default: () => null
    },
    /**
     * Additional props to pass through to rendered components.
     * Falls back to $route.params if not provided.
     * @type {object}
     * @default null
     */
    props: {
      type: Object,
      default: () => null
    },
    /**
     * Access protection flag or configuration. When true or an object,
     * displays a "Forbidden access" alert instead of the content.
     * Can be a boolean, string (custom message), or object with alert options.
     * @type {boolean|string|object}
     * @default false
     */
    protected: {
      type: [Boolean, String, Object],
      default: () => !1
    },
    /**
     * Loading state flag or configuration. When active, displays a loading
     * spinner instead of content. Can be a boolean, string (custom message),
     * or object with { active, options } for custom loading component.
     * @type {boolean|string|object}
     * @default false
     */
    load: {
      type: [Boolean, String, Object],
      default: () => !1
    },
    /**
     * Floating window configuration. When set, wraps content in a floating/draggable panel
     * with float icon in the corner.
     * @type {boolean|object}
     * @default null
     */
    float: {
      type: [Boolean, Object],
      default: () => null
    },
    /**
     * External child components or content to inject into the rendered output.
     * Passed to renderObject for integration with the item's children slots.
     * @type {array|object}
     * @default null
     */
    children: {
      type: [Array, Object],
      default: () => null
    },
    /**
     * Wrapper component configuration. Wraps the main rendered content
     * inside a specified WBC component definition.
     * Can be a string (component name) or object (WBC item definition).
     * @type {string|object}
     * @default null
     */
    wrap: {
      type: [String, Object],
      default: () => null
    },
    /**
     * External key for component identification and caching.
     * Stored internally as extKey_ and used for unique component instances.
     * @type {string}
     * @default ""
     */
    extKey: {
      type: String,
      default: () => ""
    },
    /**
     * Wiki integration flag. When true, enables wiki-specific rendering
     * and requires the WBCWikiObj to be registered. Shows error if missing.
     * @type {boolean}
     * @default null
     */
    wiki: {
      type: Boolean,
      default: () => null
    },
    /**
     * Transform flag controlling item transformation during rendering.
     * When true (default), enables item parsing and transformation logic.
     * @type {boolean}
     * @default true
     */
    transform: {
      type: Boolean,
      default: () => !0
    },
    /**
     * Global reference string for accessing shared/global state or components.
     * Stored internally as global_ and used for cross-component communication.
     * @type {string}
     * @default null
     */
    global: {
      type: String,
      default: () => null
    },
    /**
     * Hide flag. When true, renders nothing (returns null).
     * Can also be set via item.options.hide for conditional hiding.
     * @type {boolean}
     * @default null
     */
    hide: {
      type: Boolean,
      default: () => null
    },
    /**
     * Close button configuration. When set, renders a close icon
     * that can be used to dismiss or close the component.
     * @type {boolean|object}
     * @default null
     */
    close: {
      type: [Boolean, Object],
      default: () => null
    },
    /**
     * Drag handle configuration. When set, renders a drag icon
     * that enables dragging/moving the component.
     * @type {boolean|object}
     * @default null
     */
    drag: {
      type: [Boolean, Object],
      default: () => null
    },
    /**
     * Focus target identifier. Specifies which element or component
     * should receive focus when this component is rendered.
     * @type {string}
     * @default null
     */
    focusOn: {
      type: String,
      default: () => null
    },
    /**
     * Focus configuration or flag. Controls component focus behavior.
     * @type {boolean|string|object}
     * @default null
     */
    focus: {
      type: [Boolean, String, Object],
      default: () => null
    },
    /**
     * Content trust boundary. External content is the safe default and uses the
     * hardened AST sandbox. Authored content is an explicit opt-in that preserves
     * the legacy evaluator for first-party descriptors.
     * @type {"external"|"authored"}
     * @default "external"
     */
    contentTrust: {
      type: String,
      default: () => "external"
    },
    /**
     * Deprecated one-release alias for `contentTrust`.
     * `true` maps to `external`; explicit `false` maps to `authored`.
     * Prefer `contentTrust="external"` or `contentTrust="authored"`.
     * @type {boolean}
     * @default false
     */
    untrusted: {
      type: Boolean,
      default: () => !1
    }
  }
};
function vn(t, e, n) {
  return t.lang == "ar" ? e(
    "span",
    { style: { direction: "rtl", textAlign: "right", display: "contents" } },
    Array.isArray(n) && n.length > 0 ? n : [n]
  ) : n;
}
const Zr = (t) => ` ${t}`.replace(/_/g, " ").replace(/ ./g, (e) => e.toUpperCase()).trim(), Xr = function(t) {
  return typeof t != "string" ? t : t.toLowerCase().split(" ").map(function(e) {
    return e.charAt(0).toUpperCase() + e.slice(1);
  }).join(" ");
}, Yr = function(t) {
  if (typeof t == "object" || !t)
    return "";
  var e, n, r, i, o;
  for (r = t.replace(/([^\W_]+[^\s-]*) */g, function(a) {
    return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
  }), i = ["A", "An", "The", "And", "But", "Or", "For", "Nor", "As", "At", "By", "For", "From", "In", "Into", "Near", "Of", "On", "Onto", "To", "With"], e = 0, n = i.length; e < n; e++)
    r = r.replace(new RegExp("\\s" + i[e] + "\\s", "g"), function(a) {
      return a.toLowerCase();
    });
  for (o = ["Id", "Tv"], e = 0, n = o.length; e < n; e++)
    r = r.replace(new RegExp("\\b" + o[e] + "\\b", "g"), o[e].toUpperCase());
  return r;
}, Gr = function(t) {
  return typeof t != "string" ? t : t.replace(/[_-]/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([A-Z])([A-Z][a-z])/g, "$1 $2").replace(/^./, (e) => e.toUpperCase()).replace(/\s+/g, " ");
};
function qr(t) {
  const e = Math.floor(t / 60), n = t % 60;
  return n == 0 ? `${e}h` : `${e}h ${n}m`;
}
const Qr = function(t) {
  return t.replace(/^([A-Z])/, (e) => e.toLowerCase()).replace(/([a-z])([A-Z])/g, "$1-$2");
};
function ti(t) {
  return t.split(/\r?\n/).map((e) => `<p>${e}</p>`).join("");
}
function ei(t) {
  if (!t) return "";
  if (typeof t != "string")
    try {
      t = JSON.stringify(t, null, 2);
    } catch {
      t = String(t);
    }
  return t.split(/\n+/).map((e) => e.trim()).filter((e) => e.length).map((e) => `<p>${e}</p>`).join(`
`);
}
async function ni(t, e = null) {
  var n, r;
  if (typeof t != "string") return t;
  try {
    const i = await import("prettier/standalone");
    let o = null, a = [];
    if (e && (o = {
      html: "html",
      htm: "html",
      vue: "vue",
      js: "babel",
      javascript: "babel",
      jsx: "babel",
      ts: "babel-ts",
      typescript: "babel-ts",
      tsx: "babel-ts",
      css: "css",
      scss: "scss",
      less: "less",
      json: "json",
      json5: "json5",
      markdown: "markdown",
      md: "markdown",
      graphql: "graphql",
      yaml: "yaml",
      yml: "yaml"
    }[e.toLowerCase()] || "html"), !o) {
      const [s, l, c, p] = await Promise.all([
        import("prettier/parser-html"),
        import("prettier/parser-babel"),
        import("prettier/parser-postcss"),
        import("prettier/parser-yaml").catch(() => null)
      ]);
      a = [s, l, c], p && a.push(p);
      const f = await ((n = i.getSupportInfo) == null ? void 0 : n.call(i)), u = ((r = f == null ? void 0 : f.languages) == null ? void 0 : r.flatMap((d) => d.parsers)) || [];
      o = "html";
      for (const d of u)
        try {
          await i.format(t.slice(0, 1e3), { parser: d, plugins: a }), o = d;
          break;
        } catch {
        }
    }
    return ["html", "vue", "markdown"].includes(o) ? a = [await import("prettier/parser-html")] : o.includes("babel") ? a = [await import("prettier/parser-babel")] : ["css", "scss", "less", "postcss"].includes(o) ? a = [await import("prettier/parser-postcss")] : ["yaml", "yml"].includes(o) && (a = [await import("prettier/parser-yaml")]), i.format(t, {
      parser: o,
      plugins: a,
      tabWidth: 2,
      useTabs: !1,
      printWidth: 100,
      semi: !0,
      singleQuote: !0,
      trailingComma: "es5",
      bracketSameLine: !1,
      htmlWhitespaceSensitivity: "css",
      vueIndentScriptAndStyle: !0
    });
  } catch (i) {
    return console.warn("[formatCode] Failed:", i.message), t;
  }
}
function Xt(t, { indentSize: e = 4, removeComments: n = !0 } = {}) {
  if (!t || typeof t != "string") return t;
  let r = t.trim();
  n && (r = r.replace(/<!--[\s\S]*?-->/g, "").replace(/<!---->/g, ""));
  const i = " ".repeat(e);
  let o = 0, a = "";
  const s = r.replace(/></g, "> <").split(/(<[^>]+>)/g).filter(Boolean);
  let l = !1;
  for (let c of s) {
    const p = c.trim(), f = /^</.test(p), u = /^<\//.test(p), d = /\/>$/.test(p);
    if (f)
      u && !d && (o = Math.max(0, o - 1)), a += `
` + i.repeat(o) + p, l = !0, !u && !d && o++;
    else {
      const m = c.trim();
      m && ((l || a.endsWith(`
`)) && (a += `
` + i.repeat(o)), a += m, l = !1);
    }
  }
  return a.trim() + `
`;
}
const ri = (t) => Xt(t, { indentSize: 4 }), ii = (t) => Xt(t, { indentSize: 2 }), oi = Xt;
function we(t, { indent: e = 4 } = {}) {
  if (typeof t == "string")
    try {
      t = JSON.parse(t);
    } catch {
      return t;
    }
  return JSON.stringify(t, null, " ".repeat(e));
}
const si = (t) => we(t, { indent: 2 }), ai = (t) => we(t, { indent: 4 });
function St(t, { indent: e = 4 } = {}) {
  if (typeof t == "string")
    try {
      const r = JSON.parse(t);
      return JSON.stringify(r, null, e);
    } catch {
      return t;
    }
  if (typeof t != "object" || t === null)
    return typeof t == "function" ? `function ${t.name || ""}() { ... }` : t === void 0 ? "undefined" : String(t);
  const n = " ".repeat(e);
  return JSON.stringify(t, (r, i) => typeof i == "function" ? `[Function${i.name ? ` ${i.name}` : ""}]` : i === void 0 ? "[undefined]" : typeof i == "symbol" || typeof i == "bigint" ? i.toString() + (typeof i == "bigint" ? "n" : "") : i, n);
}
const ci = St, ui = (t, e = 4) => St(t, { indent: e }), li = (t) => St(t, { indent: 2 }), di = (t) => St(t, { indent: 4 }), pi = (t) => {
};
function kn(t) {
  return typeof t != "string" ? t : tr.sanitize(t, { ADD_ATTR: ["target"] });
}
const fi = function(t) {
  const e = document.createElement("textarea");
  e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e);
};
function wt(t, e = {}) {
  const { removeEmpty: n = ["span", "div", "i", "em"], collapseWrappers: r = ["span", "div", "i"], removeComments: i = !0, trimWhitespace: o = !0 } = e;
  if (!t || typeof t != "string") return t;
  const a = document.createElement("div");
  if (a.innerHTML = t, i) {
    const c = document.createTreeWalker(a, NodeFilter.SHOW_COMMENT);
    let p;
    for (; p = c.nextNode(); ) p.remove();
  }
  a.querySelectorAll("*").forEach((c) => {
    c.getAttributeNames().filter((p) => /^data-v-/.test(p)).forEach((p) => c.removeAttribute(p));
  });
  const s = r.join(",");
  let l = !0;
  for (; l; )
    l = !1, a.querySelectorAll(s).forEach((c) => {
      c.children.length === 1 && c.textContent.trim() === c.firstChild.textContent.trim() && !Array.from(c.attributes).some((p) => !/^data-v-/.test(p.name)) && (c.parentNode.insertBefore(c.firstChild, c), c.remove(), l = !0);
    });
  return n.length > 0 && a.querySelectorAll(n.join(",")).forEach((c) => {
    c.children.length === 0 && c.textContent.trim() === "" && !Array.from(c.attributes).some((p) => !/^data-v-/.test(p.name)) && c.remove();
  }), a.innerHTML;
}
function hi(t) {
  return wt(t, { removeEmpty: ["span", "div", "i"], collapseWrappers: ["span", "div", "i"] });
}
const mi = (t) => wt(t, { removeEmpty: ["span", "div"], collapseWrappers: ["span", "div"] }), yi = (t) => wt(t, { removeEmpty: ["span"], collapseWrappers: ["span"] });
function ue(t) {
  return t ? Array.isArray(t) ? t.map(ue).filter(Boolean) : t.type === Symbol.for("v-cmt") || t.type === "Comment" ? null : t.type === Symbol.for("v-txt") || t.type === "Text" ? t.children && t.children.trim() ? t : null : (t.children && Array.isArray(t.children) && (t.children = t.children.map(ue).filter(Boolean)), t) : null;
}
function gi({ obj_request: t, encFn: e = null, decFn: n = null, cacheName: r = null }) {
  if (!t || Object.keys(t).length === 0) return null;
  const { data: i, url: o, head: a, method: s = "get", actions: l = [] } = t;
  let c = i;
  e && typeof e == "function" && (c = e(t));
  let p;
  r && localStorage.getItem(`${r}_query`) == c && localStorage.getItem(`${r}_resp`) ? p = Promise.resolve({ body: localStorage.getItem(`${r}_resp`) }) : (p = fetch(o, {
    method: s.toUpperCase(),
    headers: { "Content-Type": "application/json", ...a || {} },
    body: s.toLowerCase() !== "get" ? JSON.stringify({ body: c }) : void 0
  }).then(async (u) => {
    const d = await u.text();
    let m;
    try {
      m = JSON.parse(d);
    } catch {
      m = d;
    }
    return { body: m, status: u.status, ok: u.ok };
  }), r && (localStorage.setItem(`${r}_query`, c), p.then((u) => localStorage.setItem(`${r}_resp`, u.body))));
  for (const u of l)
    p = p.then((d) => {
      const m = n && typeof n == "function" ? n(d, t) : d.body;
      try {
        d.data = JSON.parse(m);
      } catch {
        d.data = m;
      }
      return d;
    }).then(u == null ? void 0 : u[0]).catch((d) => Promise.reject(d)).catch(u == null ? void 0 : u[1]);
  return p;
}
const bi = (t, e = "en") => {
  const n = ["description", "keywords", "author", "viewport", "robots", "theme-color", "twitter:card", "twitter:site", "twitter:creator", "twitter:title", "twitter:description", "twitter:image"], r = ["og:title", "og:type", "og:url", "og:image", "og:description", "og:site_name", "og:locale"], i = [...n, ...r];
  if (t != null && t.title && (document.title = et(t.title, e)), t != null && t.favIcon) {
    let o = et(t.favIcon, e), a = document.querySelector('link[rel="icon"]') || document.createElement("link");
    a.rel = "icon", a.href = o, a.parentNode || document.head.appendChild(a);
  }
  Object.entries(t || {}).forEach(([o, a]) => {
    if (o === "title" || o === "favIcon" || !i.includes(o)) return;
    let s = et(a, e), l = r.includes(o) ? "property" : "name", c = document.querySelector(`meta[${l}='${o}']`);
    c ? c.content = s : (c = document.createElement("meta"), c.setAttribute(l, o), c.content = s, document.head.appendChild(c));
  });
}, wi = (t = "lg", e = "en") => {
  try {
    const n = document.cookie.match(new RegExp(`(?:^|; )${t}=([^;]*)`));
    if (n) return decodeURIComponent(n[1]);
    const r = navigator.language || navigator.userLanguage;
    if (r) return r.split("-")[0];
  } catch {
  }
  return e;
}, ne = ["constructor", "__proto__", "prototype", "getPrototypeOf", "setPrototypeOf", "callee"], re = ["globalThis", "eval", "Function", "window", "document", "process", "Reflect", "Object", "Array", "this", "arguments", "callee"], _i = typeof __WBC_TRUSTED_CONTENT__ < "u" && __WBC_TRUSTED_CONTENT__ === !0;
function Ci(t, e = {}, n = !1) {
  if (typeof t != "string" || !t.trim()) return t;
  const i = { ...{
    window: null,
    document: null,
    fetch: null,
    localStorage: null,
    sessionStorage: null,
    process: null,
    global: null,
    XMLHttpRequest: null
  }, ...e }, o = Object.keys(i), a = Object.values(i);
  try {
    const s = t.trim();
    if (s.startsWith("(") || s.startsWith("function") || s.includes("=>")) {
      const p = new Function(...o, `"use strict"; return (${t});`)(...a);
      if (typeof p == "function")
        return p(e);
    }
    return s.startsWith("[") || s.startsWith("{") || s.startsWith("`") || s.startsWith("'") || s.startsWith('"') ? new Function(...o, `"use strict"; return (${t});`)(...a) : new Function(...o, `"use strict"; return (function(){ ${t} })();`)(...a);
  } catch {
    try {
      return new Function(...o, `"use strict"; return (${t});`)(...a);
    } catch (l) {
      n || console.error("[WBC-UI SafeEval Error]", l, "Code:", t);
      return;
    }
  }
}
function F(t, e) {
  if (t != null)
    switch (t.type) {
      case "Program":
        return Oi(t, e);
      case "ExpressionStatement":
        return F(t.expression, e);
      case "BlockStatement":
        return _e(t, e);
      case "ReturnStatement":
        return t.argument ? F(t.argument, e) : void 0;
      case "Literal":
        return t.value;
      case "Identifier":
        return e[t.name];
      case "ObjectExpression": {
        const n = {};
        for (const r of t.properties) {
          const i = r.computed ? F(r.key, e) : r.key.type === "Identifier" ? r.key.name : r.key.value, o = F(r.value, e);
          n[i] = o;
        }
        return n;
      }
      case "ArrayExpression":
        return t.elements.map((n) => n ? F(n, e) : void 0);
      case "MemberExpression": {
        const n = F(t.object, e), r = t.computed ? F(t.property, e) : t.property.type === "Identifier" ? t.property.name : t.property.value;
        return n == null ? void 0 : n[r];
      }
      case "CallExpression": {
        const n = F(t.callee, e);
        if (typeof n != "function") return;
        const r = t.arguments.map((i) => F(i, e));
        return n(...r);
      }
      case "ArrowFunctionExpression":
        return Wi(t, e);
      case "FunctionExpression":
        return xi(t, e);
      case "BinaryExpression":
        return $i(t, e);
      case "LogicalExpression":
        return vi(t, e);
      case "UnaryExpression":
        return ki(t, e);
      case "ConditionalExpression":
        return F(t.test, e) ? F(t.consequent, e) : F(t.alternate, e);
      case "TemplateLiteral": {
        let n = "";
        for (let r = 0; r < t.quasis.length; r++)
          n += t.quasis[r].value.cooked, r < t.expressions.length && (n += String(F(t.expressions[r], e)));
        return n;
      }
      case "SequenceExpression":
        return t.expressions.reduce((n, r) => F(r, e), void 0);
      case "AssignmentExpression":
        return Si(t, e);
      case "UpdateExpression":
        return ji(t, e);
      case "ThisExpression":
        return;
      case "NewExpression":
        throw new Error("Blocked: unsafe code pattern");
      case "VariableDeclaration":
        return;
      default:
        throw new Error(`[SafeEval] Unsupported AST node: ${t.type}`);
    }
}
function Oi(t, e) {
  let n;
  for (const r of t.body)
    n = F(r, e);
  return n;
}
function _e(t, e) {
  let n;
  for (const r of t.body)
    n = F(r, e);
  return n;
}
function Wi(t, e) {
  const n = t.params.map((r) => r.type === "Identifier" ? r.name : r.type === "RestElement" ? r.argument.name : null).filter(Boolean);
  return (...r) => {
    const i = Object.create(e);
    return n.forEach((o, a) => {
      i[o] = r[a];
    }), i.__proto__ = void 0, t.body.type === "BlockStatement" ? _e(t.body, i) : F(t.body, i);
  };
}
function xi(t, e) {
  const n = t.params.map((r) => r.type === "Identifier" ? r.name : r.type === "RestElement" ? r.argument.name : r.type === "AssignmentPattern" ? r.left.name : null).filter(Boolean);
  return function(...r) {
    const i = Object.create(e);
    return n.forEach((o, a) => {
      i[o] = r[a];
    }), i.__proto__ = void 0, _e(t.body, i);
  };
}
function $i(t, e) {
  const n = F(t.left, e), r = F(t.right, e);
  switch (t.operator) {
    case "+":
      return n + r;
    case "-":
      return n - r;
    case "*":
      return n * r;
    case "/":
      return n / r;
    case "%":
      return n % r;
    case "**":
      return n ** r;
    case "==":
      return n == r;
    case "!=":
      return n != r;
    case "===":
      return n === r;
    case "!==":
      return n !== r;
    case "<":
      return n < r;
    case ">":
      return n > r;
    case "<=":
      return n <= r;
    case ">=":
      return n >= r;
    case "<<":
      return n << r;
    case ">>":
      return n >> r;
    case ">>>":
      return n >>> r;
    case "&":
      return n & r;
    case "|":
      return n | r;
    case "^":
      return n ^ r;
    case "in":
      return n in r;
    case "instanceof":
      return n instanceof r;
    default:
      return;
  }
}
function vi(t, e) {
  const n = F(t.left, e);
  if (t.operator === "&&") return n && F(t.right, e);
  if (t.operator === "||") return n || F(t.right, e);
  if (t.operator === "??") return n ?? F(t.right, e);
}
function ki(t, e) {
  const n = F(t.argument, e);
  switch (t.operator) {
    case "-":
      return -n;
    case "+":
      return +n;
    case "!":
      return !n;
    case "~":
      return ~n;
    case "typeof":
      return typeof n;
    case "void":
      return;
    case "delete":
      return !0;
    default:
      return;
  }
}
function Si(t, e) {
  const n = F(t.right, e);
  if (t.left.type === "Identifier")
    e[t.left.name] = n;
  else if (t.left.type === "MemberExpression") {
    const r = F(t.left.object, e), i = t.left.computed ? F(t.left.property, e) : t.left.property.name;
    r != null && (r[i] = n);
  }
  switch (t.operator) {
    case "=":
      return n;
    case "+=":
      return e[t.left.name] = (e[t.left.name] || 0) + n;
    case "-=":
      return e[t.left.name] = (e[t.left.name] || 0) - n;
    case "*=":
      return e[t.left.name] = (e[t.left.name] || 0) * n;
    default:
      return n;
  }
}
function ji(t, e) {
  const n = t.argument.name, r = e[n] || 0;
  return t.operator === "++" && (e[n] = r + 1), t.operator === "--" && (e[n] = r - 1), t.prefix ? e[n] : r;
}
function Ei(t) {
  const n = Object.assign(/* @__PURE__ */ Object.create(null), {
    window: void 0,
    document: void 0,
    fetch: void 0,
    localStorage: void 0,
    sessionStorage: void 0,
    process: void 0,
    global: void 0,
    XMLHttpRequest: void 0,
    globalThis: void 0,
    eval: void 0,
    Function: void 0,
    Reflect: void 0,
    Object: void 0,
    Array: void 0,
    setTimeout: void 0,
    setInterval: void 0,
    console: void 0,
    location: void 0,
    navigator: void 0
  }, t);
  return n.__proto__ = void 0, n;
}
const Ti = (t) => !!(t != null && t._isVue || t != null && t.$options || t != null && t.__v_isVNode || t != null && t.__v_isReactive || t != null && t.__v_raw), Sn = (t, e = /* @__PURE__ */ new WeakSet()) => {
  if (t && typeof t == "object" && !Object.isFrozen(t)) {
    if (e.has(t)) return t;
    e.add(t);
    const n = typeof Element < "u" && t instanceof Element;
    if (Ti(t) || n) return t;
    Object.freeze(t), Object.getOwnPropertyNames(t).forEach((r) => Sn(t[r], e));
  }
  return t;
};
function jn(t, e = {}, n = !1, r = {}) {
  if (typeof t != "string" || !t.trim()) return t;
  if (r.trusted === !0 ? !0 : r.trusted === !1 ? !1 : _i)
    return Ci(t, e, n);
  const o = t.trim();
  let a;
  try {
    a = Ee.parse(o, { ecmaVersion: 2020 });
  } catch {
    try {
      a = Ee.parse(`(${o})`, { ecmaVersion: 2020 });
    } catch {
      n || console.error("[SafeEval Parse Error]", t);
      return;
    }
  }
  let s = !0;
  if (Qn.simple(a, {
    Identifier(c) {
      re.includes(c.name) && (s = !1);
    },
    Literal(c) {
      typeof c.value == "string" && ne.includes(c.value) && (s = !1);
    },
    MemberExpression(c) {
      !c.computed && c.property.type === "Identifier" && ne.includes(c.property.name) && (s = !1), c.computed && c.property.type !== "Literal" && (s = !1), c.computed && c.property.type === "Literal" && typeof c.property.value == "string" && ne.includes(c.property.value) && (s = !1);
    },
    CallExpression(c) {
      c.callee.type === "Identifier" && re.includes(c.callee.name) && (s = !1);
    },
    NewExpression(c) {
      c.callee.type === "Identifier" && re.includes(c.callee.name) && (s = !1);
    },
    ThisExpression() {
      s = !1;
    }
  }), !s)
    throw n || console.error("[SafeEval Error] Blocked by AST Validator."), new Error("Blocked: unsafe code pattern");
  Object.keys(e).forEach((c) => {
    typeof e[c] == "object" && e[c] !== null && Sn(e[c]);
  });
  const l = Ei(e);
  try {
    const c = F(a, l);
    return typeof c == "function" && e && Object.keys(e).length > 0 ? c(e) : c;
  } catch (c) {
    n || console.error("[SafeEval] Interpreter Error", t, c);
    return;
  }
}
function yt(t, e = {}) {
  if (typeof t != "string") return t;
  try {
    return JSON.parse(t);
  } catch {
    if (!(/[\(\)\{\}\[]/.test(t) || // parens/braces/brackets
    /[\+\-\*\/\%\?\:]/.test(t)) || /^\s*[A-Za-z][\w-]*__/.test(t)) return t;
    const r = jn(t, {}, !0, e);
    return r === void 0 || typeof r == "number" && Number.isNaN(r) ? t : r;
  }
}
function En(t) {
  if (typeof t != "string")
    return t;
  {
    const e = [];
    let n = e, r = "", i = 0;
    for (let o = 0; o < t.length; o++) {
      const a = t[o];
      a === "|" && i === 0 ? (r.length > 0 && (n.push(r), r = ""), n.push([]), n = n[n.length - 1]) : a === "+" && i === 0 ? r.length > 0 && (n.push(r), r = "") : a === "(" ? (i++, r += a) : (a === ")" && i--, r += a);
    }
    return r.length > 0 && n.push(r), e;
  }
}
function Ai(t, e, n, r) {
  if (!r) return t;
  try {
    const i = r.enc.Utf8.parse(e), o = r.enc.Utf8.parse(n), a = r.enc.Utf8.parse(t);
    return r.AES.encrypt(a, i, {
      iv: o,
      mode: r.mode.CBC,
      padding: r.pad.Pkcs7
    }).ciphertext.toString();
  } catch (i) {
    return console.error("[WBC-UI SafeEval AES Error]", i), "";
  }
}
function Li(t, e, n, r) {
  if (!r) return t;
  try {
    const i = r.enc.Utf8.parse(e), o = r.enc.Utf8.parse(n), a = r.enc.Hex.parse(t), s = r.enc.Base64.stringify(a);
    return r.AES.decrypt(s, i, {
      iv: o,
      mode: r.mode.CBC,
      padding: r.pad.Pkcs7
    }).toString(r.enc.Utf8);
  } catch (i) {
    return console.error("[WBC-UI SafeEval AES Decrypt Error]", i), "";
  }
}
function Tn(t, e, n) {
  const r = tn || (typeof window < "u" ? window.CryptoJS : null);
  return r ? Ai(t, e, n, r) : (console.warn("[WBC] crypto-js is unavailable — aesEnc failed"), "");
}
function An(t, e, n) {
  const r = tn || (typeof window < "u" ? window.CryptoJS : null);
  return r ? Li(t, e, n, r) : (console.warn("[WBC] crypto-js is unavailable — aesDec failed"), "");
}
const Yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aesDec: An,
  aesEnc: Tn,
  beautifyHtml: ri,
  camelToKebab: Qr,
  capitalizeWords: Zr,
  cleanMinimal: mi,
  cleanVueHtml: wt,
  cleanVueVNode: ue,
  clone: lt,
  colorLibelle: Fr,
  copyToClipboard: fi,
  detectLang: wi,
  extractSubObject: Bt,
  flattenArray: wn,
  fmtJS: ui,
  fmtJS2: li,
  fmtJS4: di,
  formatCode: ni,
  formatHtml: Xt,
  formatHtml2: ii,
  formatJS: St,
  formatJSON: we,
  formatToStr: Gr,
  generalVal: Vt,
  getObjectDepth: hn,
  indexMapWithSource: Vr,
  isDate: dr,
  isEmpty: vt,
  isNonEmpty: Jt,
  isPlainObject: ut,
  isVnode: $t,
  json2: si,
  json4: ai,
  logJS: pi,
  mapObjectWithSource: gn,
  mapWithSource: Lr,
  mergeObjects: yn,
  minsToHours: qr,
  objLang: et,
  paragraphsFromText: ei,
  parse: Ir,
  parseTexFile: Mr,
  pretty: oi,
  prettyJS: ci,
  project: bn,
  purifyHtml: hi,
  queryData: gi,
  randColLib: Rr,
  randInt: Cn,
  randItem: On,
  randomColor: Dr,
  randomKey: Pr,
  removeEmptySpans: yi,
  replaceInObject: Ur,
  resolveValuesWithSource: Nt,
  safeEval: jn,
  sanitizeHtml: kn,
  setMetaParams: bi,
  strToComps: En,
  strToObj: yt,
  stringify: Br,
  textToParagraphs: ti,
  titleCase: Xr,
  toTitleCase: Yr,
  today: Wn,
  todayISO: xn,
  todayStr: zr,
  transfObj: ae,
  vuetifyColorList: _n
}, Symbol.toStringTag, { value: "Module" })), Vi = !1, Bi = "\0PIPE\0", Ii = /\x00PIPE\x00/g;
function xt(t, e, n) {
  var o, a, s, l, c, p;
  const r = ((s = (a = (o = t == null ? void 0 : t.$) == null ? void 0 : o.appContext) == null ? void 0 : a.components) == null ? void 0 : s.WBC) || ((c = (l = t == null ? void 0 : t.$options) == null ? void 0 : l.components) == null ? void 0 : c.WBC) || "WBC", i = n && ((p = n.item) != null && p.__v_isVNode) ? { ...n, item: ft(n.item) } : n;
  return e(r, i);
}
const Be = /* @__PURE__ */ new WeakMap();
function nt(t, e, n) {
  if (!t || typeof t != "object" && typeof t != "function") return;
  let r = Be.get(t);
  if (r || (r = { values: /* @__PURE__ */ new Map(), multiple: !1 }, Be.set(t, r)), r.values.set(e, n), !r.multiple && r.values.size > 1) {
    r.multiple = !0, t.source !== null && (t.source = null, t._sourceFilePath = null);
    return;
  }
  r.multiple || he(t.source) === n || (t.source = n, t._sourceFilePath = e);
}
const Ie = /* @__PURE__ */ new WeakMap();
function Ni(t, e, n) {
  if (typeof n != "string") return n;
  if (!t || typeof t != "object" && typeof t != "function")
    try {
      return JSON.parse(n);
    } catch {
      return n;
    }
  let r = Ie.get(t);
  r || (r = /* @__PURE__ */ new Map(), Ie.set(t, r));
  const i = r.get(e);
  if (i && i.raw === n) return i.value;
  let o;
  try {
    o = JSON.parse(n);
  } catch {
    return n;
  }
  return r.set(e, { raw: n, value: o }), o;
}
function Ln(t, e) {
  var a, s, l;
  if (t != null && t.getContext) {
    const c = t.getContext();
    if (c && c.__mode !== "relative") return c;
  }
  if (e != null && e.getContext) {
    const c = e.getContext();
    if (c && c.__mode !== "relative") return c;
  }
  if (typeof (e == null ? void 0 : e.context) == "function") return e.context;
  if ((a = e == null ? void 0 : e.context) != null && a.root) return e.context.root;
  let n;
  try {
    n = Ut();
  } catch {
  }
  const r = (l = (s = n == null ? void 0 : n.appContext) == null ? void 0 : s.config) == null ? void 0 : l.globalProperties, i = (t == null ? void 0 : t.$wbcUi3Options) || (t == null ? void 0 : t.$wbcUi2Options) || (e == null ? void 0 : e.$wbcUi3Options) || (e == null ? void 0 : e.$wbcUi2Options) || (r == null ? void 0 : r.$wbcUi3Options) || (r == null ? void 0 : r.$wbcUi2Options), o = i == null ? void 0 : i.context;
  return typeof o == "function" ? o : o && o.root ? o.root : o || null;
}
function Fi(t, e) {
  var b;
  const r = t.replace(/\\\|/g, Bi).split("|").map((g) => g.replace(Ii, "|")), [i, o, a, s] = r, l = (e == null ? void 0 : e.strToObj) || yt, c = (e == null ? void 0 : e.isPlainObject) || ut, p = (e == null ? void 0 : e.isNonEmpty) || Jt, f = l(o), u = c(f) ? f : p(f) ? { class: f || {} } : {}, d = (b = i.split(".").pop()) == null ? void 0 : b.toLowerCase(), m = Kt[d] || null;
  return { el1: i, classOrOptionsObj: u, theFileLink: a, parsedAs: s, ext: d, fileLanguage: m };
}
function Di(t, e, n, r) {
  const i = Ln(t, r), o = n;
  if (i) {
    const s = ((l) => {
      try {
        if (!l || typeof l != "function") return null;
        const c = l.keys ? l.keys() : [], p = [
          o,
          o.startsWith("./") ? o : "./" + o,
          o.startsWith("./") ? "./src/" + o.slice(2) : "./src/" + o,
          o.startsWith("/") ? "." + o : o
        ];
        for (const f of p)
          if (c.includes(f)) {
            const u = l(f);
            return (u == null ? void 0 : u.default) !== void 0 ? u.default : u;
          }
      } catch {
      }
      return null;
    })(i);
    if (s) return s;
  }
  return ["image", "video", "audio"].includes(e) ? o.startsWith("./") ? "/src/" + o.slice(2) : !o.startsWith("/") && !o.startsWith("http") ? "/src/" + o : o : null;
}
function Q(t, e, n, r) {
  return (t != null && t.loadFile ? t.loadFile(e) : null) || (r != null && r.loadFile ? r.loadFile(e) : null) || Di(t, n, e, r);
}
function Pi(t, e, n, r, i) {
  const { el1: o, classOrOptionsObj: a, parsedAs: s, ext: l, fileLanguage: c } = r, p = o.startsWith("./") ? o.substring(2) : o;
  let f, u;
  const d = s == null ? void 0 : s.toLowerCase(), b = [
    { test: o.includes(".vue") || d === "vue", type: "vue", contentType: "text/x-vue", lang: "html" },
    { test: o.includes(".py") || ["py", "python"].includes(d), type: "py", contentType: "text/x-python", lang: "python" },
    { test: o.includes(".rs") || ["rs", "rust"].includes(d), type: "rs", contentType: "text/x-rust", lang: "rust" },
    { test: o.includes(".css") || d === "css", type: "css", contentType: "text/css", lang: "css" },
    { test: o.includes(".scss") || d === "scss", type: "scss", contentType: "text/css", lang: "css" },
    { test: o.includes(".sass") || d === "sass", type: "sass", contentType: "text/css", lang: "css" },
    { test: o.includes(".php") || d === "php", type: "php", contentType: "application/x-httpd-php", lang: "php" },
    { test: o.includes(".sh") || d === "sh", type: "sh", contentType: "text/html", lang: "html" },
    { test: o.includes(".js") || o.includes(".ts") || o.includes(".json") || ["js", "ts", "json"].includes(d), type: "js", contentType: "text/javascript", lang: "javascript" },
    { test: o.includes(".md") || d === "md", type: "md", contentType: "text/x-markdown", lang: "markdown" },
    { test: o.includes(".tex") || d === "tex", type: "tex", contentType: "text/html", lang: "html" },
    { test: o.includes(".txt") || d === "txt", type: "txt", contentType: "text/html", lang: "text" },
    { test: o.includes(".html") || d === "html", type: "html", contentType: "text/html", lang: "markup" },
    { test: o.includes(".c") || o.includes(".cpp") || ["c", "cpp"].includes(d), type: "c", contentType: "text/x-csrc", lang: "c" }
  ].find((w) => w.test);
  if (b && (f = Q(n, p, b.type, i), u = b.lang, b.contentType), f === void 0 && (f = Q(n, p, l || "text", i)), nt(n, p, f), !(f || n != null && n.fileContent))
    throw new Error(`#CodeFileError: ${o} not found`);
  const g = {
    language: u || c || "WBC",
    extra: p,
    ...typeof (n == null ? void 0 : n.resolvedWbCodeFile) == "boolean" ? {} : (n == null ? void 0 : n.resolvedWbCodeFile) || {}
  }, C = (n != null && n.renderDefaultWbcode ? n.renderDefaultWbcode.bind(n) : (w, v, $) => w("WBCode", { item: { code: v, ...$ || {} } }))(e, f, g);
  return f ? xt(n, e, {
    ...a,
    item: C
  }) : n == null ? void 0 : n.fileContent;
}
function Ri(t, e, n, r, i) {
  var c, p, f, u;
  const { el1: o, classOrOptionsObj: a } = r, s = o.startsWith("./") ? o.substring(2) : o;
  let l = Q(n, s, "json", i);
  if (l = Ni(n, s, l), nt(n, s, l), l)
    return l.WBC ? xt(n, e, { title: o, item: l.WBC, ...a }) : (p = (c = n == null ? void 0 : n.$options) == null ? void 0 : c.components) != null && p.JsonViewer || (f = i == null ? void 0 : i.components) != null && f.JsonViewer ? e("JsonViewer", { title: o, value: l, ...a }) : (n != null && n.renderDefaultWbcode ? n.renderDefaultWbcode.bind(n) : (b, g, y) => b("WBCode", { item: { code: g, ...y || {} } }))(e, JSON.stringify(l, null, 2), {
      language: "json",
      extra: s,
      codeBar: [["json"], ["download", "copy"]]
    });
  if (!(n != null && n.fileContent) && !((u = st(n)) != null && u.promise)) {
    const d = o.startsWith("./") ? "/src/" + o.slice(2) : o;
    at(n, e, d, a);
  }
  return n == null ? void 0 : n.fileContent;
}
function Mi(t, e, n, r, i) {
  const { el1: o, classOrOptionsObj: a, parsedAs: s } = r, l = o.startsWith("./") ? o.substring(2) : o;
  let c = Q(n, l, "txt", i);
  if (nt(n, l, c), !(c || n != null && n.fileContent))
    throw new Error(`#TxtFileError: ${o} not found`);
  const f = {
    language: o.endsWith(".txt") ? "txt" : "text",
    extra: l,
    ...typeof (n == null ? void 0 : n.resolvedWbCodeFile) == "boolean" ? {} : (n == null ? void 0 : n.resolvedWbCodeFile) || {}
  };
  return (n != null && n.renderDefaultWbcode ? n.renderDefaultWbcode.bind(n) : (d, m, b) => d("WBCode", { item: { code: m, ...b || {} } }))(e, c, f);
}
function Ui(t, e, n, r, i) {
  var u;
  const { el1: o, classOrOptionsObj: a, parsedAs: s } = r, l = o.startsWith("./") ? o.substring(2) : o, c = s == null ? void 0 : s.toLowerCase();
  let p = Q(n, l, "js", i);
  if (nt(n, l, p), !(p || n != null && n.fileContent))
    throw new Error(`#JsFileError: ${o} not found`);
  const f = n != null && n.renderDefaultWbcode ? n.renderDefaultWbcode.bind(n) : (d, m, b) => d("WBCode", { item: { code: m, ...b || {} } });
  if (typeof p == "string") {
    const d = /export\s+default/i.test(p) && /(render\s*\(|setup\s*\(|template\s*[:=`'"]|setup\s*[:=`'"])/i.test(p), m = p.includes("@wbc-logic") || p.includes("@wbc-mixin");
    if (d || m || c === "vue") {
      if (n && !n._jsLazyComp && !n._jsLazyLoading) {
        n._jsLazyLoading = !0;
        const y = Ln(n, i), C = (u = y == null ? void 0 : y.lazyImport) == null ? void 0 : u.call(y, o);
        C ? C.then((w) => {
          var k;
          const v = (w == null ? void 0 : w.default) || w, $ = n.itemAccessibility;
          w.setup || w.init || w.tracker || w.logic || typeof v == "function" && m ? (w.init && w.init($), w.setup && w.setup($), w.tracker && w.tracker($), w.logic && w.logic($), typeof v == "function" && m && v($), n._jsLazyComp = {
            render: () => e("div", {
              class: "caption grey--text pa-1 px-2 border-dashed blue lighten-5 rounded d-inline-block"
            }, [e("VIcon", { xSmall: !0, left: !0, color: "blue" }, ["mdi-cog-outline"]), `Logic Provider: ${l}`])
          }, n._jsLazyLoading = !1) : v && typeof v == "object" && (v.render || v.setup || v.template) ? (n._jsLazyComp = { ...v }, n._jsLazyLoading = !1) : (n._jsLazyLoading = !1, n.fileContent = f(e, p, { language: "javascript", extra: l })), (k = n.$forceUpdate) == null || k.call(n);
        }).catch((w) => {
          var v;
          n && (n._jsLazyLoading = !1, n.fileContent = f(e, p, { language: "javascript", extra: l }), (v = n.$forceUpdate) == null || v.call(n));
        }) : (n._jsLazyLoading = !1, n.fileContent = f(e, p, { language: "javascript", extra: l }));
      }
      return n != null && n._jsLazyComp ? e(n._jsLazyComp, {
        ...n.props_ || n._jsLazyComp.params || {},
        ...a
      }) : (n == null ? void 0 : n.fileContent) || e("VProgressLinear", { indeterminate: !0, color: "blue", height: 2 });
    }
    const g = {
      language: o.endsWith(".ts") ? "typescript" : "javascript",
      extra: l,
      ...typeof (n == null ? void 0 : n.resolvedWbCodeFile) == "boolean" ? {} : (n == null ? void 0 : n.resolvedWbCodeFile) || {}
    };
    return f(e, p, g);
  }
  if (p && typeof p == "object") {
    const d = n == null ? void 0 : n.itemAccessibility;
    return p.setup || p.init || p.tracker || p.logic ? (p.init && p.init(d), p.setup && p.setup(d), p.tracker && p.tracker(d), p.logic && p.logic(d), e("div", { class: "caption blue--text px-2 border-dashed rounded" }, ["Executed Object Logic: " + l])) : p.render || p.setup || p.template ? e(p, {
      ...(n == null ? void 0 : n.props_) || p.params || {},
      ...a
    }) : xt(n, e, { item: p, ...a });
  }
  if (typeof p == "function") {
    if (p.toString().includes("@wbc-logic"))
      return n != null && n.itemAccessibility && p(n.itemAccessibility), e("div", { class: "caption blue--text px-2 border-dashed rounded" }, ["Executed Logic Function: " + l]);
    const d = p.toString();
    return xt(n, e, {
      ...a,
      item: f(e, d, {
        language: "javascript",
        extra: l,
        output: {
          header: { 0: "<~VRow,pb-1 grey grey--text lighten-2 font-weight-bold mb-1>", 1: `small__${l} (Function)`, 2: "VSpacer", 3: "download", 4: "copy" },
          main: { 1: "code" },
          terminus: { 0: "<~VRow,pt-1 grey grey--text lighten-4 mt-1>", 1: "small__WBC-function-self.source", 2: "VSpacer" }
        }
      })
    });
  }
  return e("VAlert", {
    type: "warning",
    border: "left",
    coloredBorder: !0,
    elevation: 2,
    icon: "mdi-alert-circle",
    class: "my-2 pa-2 orange--text"
  }, [
    e("div", { class: "font-weight-bold" }, "Unknown Content Type"),
    e("div", `The file "${o}" returned a value of type "${typeof p}".`),
    e("div", { class: "caption mt-1 d-block" }, "WBC lacks a direct renderer for this data type. Check the console for more details.")
  ]);
}
function zi(t, e, n, r, i) {
  const { el1: o, classOrOptionsObj: a, parsedAs: s } = r, l = o.startsWith("./") ? o.substring(2) : o;
  let c = Q(n, l, "css", i);
  nt(n, l, c);
  const p = s == null ? void 0 : s.toLowerCase();
  if (p === "txt" || p === "md") {
    const f = {
      language: "css",
      extra: l,
      ...typeof (n == null ? void 0 : n.resolvedWbCodeFile) == "boolean" ? {} : (n == null ? void 0 : n.resolvedWbCodeFile) || {}
    }, u = n != null && n.renderDefaultWbcode ? n.renderDefaultWbcode.bind(n) : (d, m, b) => d("WBCode", { item: { code: m, ...b || {} } });
    return xt(n, e, {
      ...a,
      item: u(e, c, f)
    });
  }
  return e("style", {
    type: "text/css"
  }, [c]);
}
function Ki(t, e, n, r, i) {
  var c;
  const { el1: o, classOrOptionsObj: a } = r, s = o.startsWith("./") ? o.substring(2) : o;
  let l = Q(n, s, "vue", i);
  if (nt(n, s, l), !(l || n != null && n.fileContent))
    throw new Error(`#VueFileError: ${o} not found`);
  return l ? e((l == null ? void 0 : l.default) || l, {
    ...((c = l == null ? void 0 : l.default) == null ? void 0 : c.params) || (n == null ? void 0 : n.props_) || {},
    ...a
  }) : n == null ? void 0 : n.fileContent;
}
function Ji(t, e, n, r, i) {
  var u, d, m, b, g, y, C, w, v, $, E, k;
  const { el1: o, classOrOptionsObj: a, parsedAs: s } = r, l = o.startsWith("./") ? o.substring(2) : o, c = (u = o.split(".").pop()) == null ? void 0 : u.toLowerCase(), p = s == null ? void 0 : s.toLowerCase();
  let f = Q(n, l, c, i);
  if (nt(n, l, f), p === "tex" || p === "latex" || c === "tex" && !s) {
    const T = ((m = (d = n == null ? void 0 : n.$options) == null ? void 0 : d.components) == null ? void 0 : m.WBLatex) || ((y = (g = (b = n == null ? void 0 : n.$) == null ? void 0 : b.appContext) == null ? void 0 : g.components) == null ? void 0 : y.WBLatex);
    if (f || n && !T)
      return pn(n, e, f, o, a);
    if (!(n != null && n.fileContent) && !((C = st(n)) != null && C.promise)) {
      const V = o.startsWith("./") ? "/src/" + o.slice(2) : o;
      at(n, e, V, a);
    }
    return n == null ? void 0 : n.fileContent;
  }
  if (["md", "markdown", "markup"].includes(p) || c === "md" && !s) {
    if (f) {
      let T = n == null ? void 0 : n.$md;
      if (!T)
        try {
          const W = Ut();
          T = ($ = (v = (w = W == null ? void 0 : W.appContext) == null ? void 0 : w.config) == null ? void 0 : v.globalProperties) == null ? void 0 : $.$md;
        } catch {
        }
      const V = T ? T.render(gt(f) || "") : "MD__" + (gt(f) || "");
      return e("WBHtml", { html: V, ...a });
    }
    if (!(n != null && n.fileContent) && !((E = st(n)) != null && E.promise)) {
      const T = o.startsWith("./") ? "/src/" + o.slice(2) : o;
      at(n, e, T, a);
    }
    return n == null ? void 0 : n.fileContent;
  }
  if (f)
    return e("WBHtml", { html: f, ...a });
  if (!(n != null && n.fileContent) && !((k = st(n)) != null && k.promise)) {
    const T = o.startsWith("./") ? "/src/" + o.slice(2) : o;
    at(n, e, T, a);
  }
  return n == null ? void 0 : n.fileContent;
}
function Hi(t, e, n, r, i) {
  const { el1: o, classOrOptionsObj: a, parsedAs: s } = r, l = o.startsWith("./") ? o.substring(2) : o, c = s == null ? void 0 : s.toLowerCase(), p = (n == null ? void 0 : n._matchesFileType) || bt, f = (n == null ? void 0 : n._renderVideo) || ye, u = (n == null ? void 0 : n._renderAudio) || ge;
  if (p(o, U.IMAGE) || ["image", "img", "png", "jpg", "jpeg", "gif", "svg"].includes(c)) {
    let d = Q(n, l, "image", i);
    if (nt(n, l, d), !(d || n != null && n.fileContent)) throw new Error(`#ImageFileError: ${o} not found`);
    return d ? e("img", { src: `${d}`.replace("/js/", "/"), class: "container", ...a }) : n == null ? void 0 : n.fileContent;
  }
  if (p(o, U.VIDEO) || ["video", "mp4", "webm"].includes(c)) {
    let d = Q(n, l, "video", i) || (o.startsWith("/") ? o : null);
    if (nt(n, l, d), !(d || n != null && n.fileContent)) throw new Error(`#VideoFileError: ${o} not found`);
    return d ? f(e, d, a) : n == null ? void 0 : n.fileContent;
  }
  if (p(o, U.AUDIO) || ["audio", "mp3", "wav"].includes(c)) {
    let d = Q(n, l, "audio", i);
    if (nt(n, l, d), !(d || n != null && n.fileContent)) throw new Error(`#AudioFileError: ${o} not found`);
    return d ? u(e, d, a) : n == null ? void 0 : n.fileContent;
  }
  return null;
}
function Zi(t, e, n, r, i) {
  const { el1: o, classOrOptionsObj: a } = r, s = o.startsWith("./") ? o.substring(2) : o;
  let l = Q(n, s, "office", i);
  if (nt(n, s, l), !(l || n != null && n.fileContent)) throw new Error(`#OfficeFileError: ${o} not found`);
  const c = (n == null ? void 0 : n._matchesFileType) || bt;
  return c(o, U.OFFICE.DOCX) ? e("VueOfficeDocx", { src: l, class: "container", style: { top: 0, left: 0 } }) : c(o, U.OFFICE.XLSX) ? e("VueOfficeExcel", { src: l, class: "container white", style: { top: 0, left: 0, height: "100vh", width: "100vh" } }) : e("VueDocPreview", { value: l, type: "office", class: "container", style: { top: 0, left: 0, width: "100vh", height: "100vh" } });
}
function Xi(t, e, n, r, i) {
  const { el1: o } = r, a = o.startsWith("./") ? o.substring(2) : o;
  let s = Q(n, a, "pdf", i);
  if (nt(n, a, s), !(s || n != null && n.fileContent)) throw new Error(`#PdfFileError: ${o} not found`);
  return s ? e("iframe", { src: s, class: "container white", style: { top: 0, left: 0, height: "100vh", width: "100vh", border: 0 } }) : n == null ? void 0 : n.fileContent;
}
function Yi(t, e, n, r, i) {
  var f, u;
  if (n != null && n.fileContent) return n.fileContent;
  const { el1: o, parsedAs: a } = r, s = a == null ? void 0 : a.toLowerCase(), l = t.split("/"), c = (n == null ? void 0 : n._matchesFileType) || bt;
  if ((f = l[l.length - 1]) != null && f.startsWith("__") || c(t, U.CODE) || ["py", "python", "php", "c", "cpp", "sh", "rs", "rust", "code"].includes(s))
    return Pi(t, e, n, r, i);
  if (o.endsWith(".json") || s === "json")
    return Ri(t, e, n, r, i);
  if (o.endsWith(".txt") || s === "txt" || s === "text")
    return Mi(t, e, n, r, i);
  if (s === "js" || s === "ts" || (o.endsWith(".js") || o.endsWith(".ts")) && !a)
    return Ui(t, e, n, r, i);
  if (c(t, U.STYLE) || ["css", "scss", "sass", "style"].includes(s))
    return zi(t, e, n, r, i);
  if (o.endsWith(".vue") || s === "vue")
    return Ki(t, e, n, r, i);
  if (c(t, U.TEXT))
    return Ji(t, e, n, r, i);
  const p = Hi(t, e, n, r, i);
  return p !== null ? p : c(t, [...U.OFFICE.DOCX, ...U.OFFICE.XLSX, ...U.OFFICE.GENERAL]) || ["office", "docx", "xlsx", "doc", "xls", "pptx"].includes(s) ? Zi(t, e, n, r, i) : o.endsWith(".pdf") || s === "pdf" ? Xi(t, e, n, r, i) : (n && !n.fileContent && !((u = st(n)) != null && u.promise) && at(n, e, t, r.classOrOptionsObj), n == null ? void 0 : n.fileContent);
}
function Gi(t, e, n, r) {
  var d, m, b, g, y, C, w, v, $;
  const { classOrOptionsObj: i, parsedAs: o, theFileLink: a } = r;
  t = typeof t == "string" ? t.trim() : t;
  const s = typeof r.el1 == "string" ? r.el1.trim() : r.el1;
  o == null || o.toLowerCase();
  const l = (n == null ? void 0 : n._matchesFileType) || bt, c = (n == null ? void 0 : n._renderAudio) || ge, p = (n == null ? void 0 : n._renderImage) || ln, f = (n == null ? void 0 : n._renderVideo) || ye, u = (n == null ? void 0 : n._renderYouTube) || dn;
  if (l(t, U.OFFICE.DOCX))
    return e("VueOfficeDocx", { src: s, class: "container", style: { top: 0, left: 0 } });
  if (l(t, U.OFFICE.XLSX))
    return e("VueOfficeExcel", { src: s, class: "container white", style: { top: 0, left: 0, height: "100vh", width: "100vh" } });
  if (l(t, U.OFFICE.GENERAL))
    return e("VueDocPreview", { url: s, type: "office", class: "container", style: { top: 0, left: 0, width: "100vh", height: "100vh" } });
  if (l(t, U.AUDIO))
    return c(e, s, i);
  if (l(t, U.IMAGE))
    return p(e, s, i);
  if (l(t, U.VIDEO))
    return f(e, s, i);
  if (lr.some((E) => t.includes(E)) && !t.includes("embed"))
    return u(e, s, i);
  if (l(t, [".pdf"])) {
    const E = ((b = (m = (d = n == null ? void 0 : n.$) == null ? void 0 : d.appContext) == null ? void 0 : m.components) == null ? void 0 : b.pdf) || ((C = (y = (g = n == null ? void 0 : n.$) == null ? void 0 : g.appContext) == null ? void 0 : y.components) == null ? void 0 : C.Pdf);
    return E ? e(E, { src: s, class: "container", style: {}, ...i }) : e("embed", { type: "application/pdf", src: s, class: "container", style: { width: "100%", minHeight: "480px" }, ...i });
  }
  if (l(t, U.CODE) || l(t, U.TEXT) || l(t, U.STYLE) || l(t, [".js", ".ts", ".json", ".vue", ".jsx", ".tsx", ".mmd"])) {
    if (!(n != null && n.mediaData) && !(n != null && n.fileContent)) {
      const E = { ...Kt, jsx: "javascript", tsx: "typescript", mmd: "markdown" }, k = (v = (w = s.split(".").pop()) == null ? void 0 : w.split("?")[0]) == null ? void 0 : v.toLowerCase(), T = E[k] || "text", V = fetch(s).then((W) => W.text()).then((W) => {
        if (k === "md" && (n != null && n.$md)) {
          const x = e("WBHtml", {
            html: n.$md.render(gt(W) || ""),
            ...i
          });
          return n && (n.fileContent = x), x;
        } else {
          const x = {
            language: T,
            topBar: null,
            codeBar: [[`${s}|green`, "filename"], ["download", "copy"]],
            outputFn: null,
            extra: s
          }, S = (n != null && n.renderDefaultWbcode ? n.renderDefaultWbcode.bind(n) : (L, D, P) => L("WBCode", { item: { code: D, ...P || {} } }))(e, W, x);
          return n && (n.fileContent = S), S;
        }
      }).catch(() => {
        const W = e("iframe", {
          src: s,
          frameborder: "0",
          allowfullscreen: !0,
          referrerpolicy: "strict-origin-when-cross-origin",
          class: "container white",
          style: { resize: "both", top: 0, left: 0, height: "100%", width: "100%", border: 0 },
          ...i
        });
        return n && (n.fileContent = W), W;
      });
      n && de(n, V);
    }
    return n == null ? void 0 : n.fileContent;
  }
  return n && !n.mediaData && !n.fileContent && !(($ = st(n)) != null && $.promise) && at(n, e, s, i), n == null ? void 0 : n.fileContent;
}
function qi(t, e, n, r) {
  const { el1: i, classOrOptionsObj: o, theFileLink: a } = e;
  if (typeof i == "string" && i.includes("__")) {
    const s = i.indexOf("__"), l = i.slice(0, s).trim(), c = i.slice(s + 2), p = c.trimStart();
    if (p.startsWith("{") || p.startsWith("~") || p.startsWith("[") || p.startsWith("("))
      return null;
    if (/^[a-zA-Z][a-zA-Z0-9-]*$/.test(l) && !["WBC", "MD", "http", "https", "tex", "latex"].includes(l)) {
      let f = n(l, { ...o }, [c]);
      return a && (f = n("WBLink", { to: a, html: f })), f;
    }
  }
  return null;
}
function Qi(t, e, n) {
  if (typeof t == "string" && t.startsWith("<") && t.endsWith(">") && (t.match(/</g) || []).length === 1 && (t.match(/>/g) || []).length === 1) {
    let r = t.slice(1, -1);
    r.startsWith("~") && (r = r.slice(1));
    const [i, o] = r.split("|"), [a, s] = i.split(",").map((c) => c.trim()), l = {
      class: s || void 0
    };
    return o && (l.href = o.trim()), e(a, l);
  }
  return null;
}
function to(t, e) {
  let n = null, r = t;
  const i = /* @__PURE__ */ new Set();
  for (; r && !i.has(r); ) {
    i.add(r);
    const p = (r == null ? void 0 : r.$options) || {};
    if (p.__file || p.file) {
      n = p.__file || p.file;
      break;
    }
    r = (r == null ? void 0 : r.$parent) || null;
  }
  if (!n)
    return console.warn(`[WBC] No __file found on any authoring ancestor. Cannot resolve "${e}" relatively. Serving from root.`), "/" + e.replace(/^\.[\/]/, "");
  const s = (n.substring(0, n.lastIndexOf("/") + 1) + e.replace(/^\.[\/]/, "")).split("/"), l = [];
  for (const p of s)
    p === ".." ? l.pop() : p !== "." && p !== "" && l.push(p);
  let c = "/" + l.join("/");
  return (c.startsWith("/home/") || c.startsWith("/Users/") || c.match(/^\/[a-zA-Z]:\//)) && (c = "/@fs" + c), c;
}
function Vn(t, e, n, r) {
  let i, o = !1;
  typeof t == "object" && t !== null && typeof e == "string" && (i = t, t = e, e = { h: n, self: i, ...r || {} }, o = !0), e || (e = {});
  let { h: a } = e;
  const s = a || I;
  i || (e.self ? (i = e.self, i.content || (i.content = {})) : i = Ye({ content: {}, fileContent: null, source: null, mediaData: null }));
  let l = () => {
    var v, $;
    if (typeof t != "string") return null;
    const c = (i == null ? void 0 : i.computedKey) || (e == null ? void 0 : e.computedKey) || "str";
    if (t.includes("{{") || t.includes("[["))
      return s("WBHtml", {
        key: `wbhtml-key-${c}-${t.length}`,
        html: t
      });
    if (t.includes("|")) {
      const E = t.replace(/^[a-zA-Z][\w-]*__/, "").trimStart();
      if (E.startsWith("[") || E.startsWith("{"))
        return s("WBHtml", {
          key: `wbhtml-key-${c}-${t.length}`,
          html: t
        });
    }
    const p = Fi(t, i), { el1: f, classOrOptionsObj: u, theFileLink: d, parsedAs: m } = p, g = ((i == null ? void 0 : i._getPathType) || un)(t), y = m == null ? void 0 : m.toLowerCase();
    let C = !1, w;
    if (g === "local")
      try {
        w = Yi(t, s, i, p, e);
      } catch {
        const k = to(i, f);
        !(i != null && i.mediaData) && !(i != null && i.fileContent) && !((v = st(i)) != null && v.promise) && at(i, s, k, u), w = i == null ? void 0 : i.fileContent;
      }
    else if (g === "served" || g === "online")
      g === "served" ? (!(i != null && i.mediaData) && !(i != null && i.fileContent) && !(($ = st(i)) != null && $.promise) && at(i, s, f, u), w = i == null ? void 0 : i.fileContent) : w = Gi(t, s, i, p);
    else if (w = Qi(t, s), w || (w = qi(t, p, s)), !w) {
      const k = ((i == null ? void 0 : i.isNonEmpty) || Jt)(p.classOrOptionsObj) || !!d;
      w = s("WBHtml", {
        key: `wbhtml-key-${c}-${t.length}`,
        html: k ? t : f
      }), C = k;
    }
    return d && !C && (w = s("WBLink", { to: d, html: w })), m && !["css", "js", "python", "php", "rs", "sh", "md", "html", "tex", "latex", "vue", "json", "txt"].includes(y) && (w = s(
      m || "pre",
      { ...u, title: t },
      [w]
    )), w;
  };
  return o ? l() : l;
}
const le = "wbc-plain-", eo = /* @__PURE__ */ new Set(["class", "style", "attrs", "html", "id", "key", "innerHTML", "textContent"]), Bn = /* @__PURE__ */ new Set(["comp", "options"]), no = /^level\d+$/, ro = ["install", "setup", "_isVue", "$options", "__v_isVNode", "_scope", "_effects", "vm"], io = [
  "header",
  "footer",
  "hOptions",
  "hHeader",
  "hFooter",
  "output",
  "switch",
  "fStyle",
  "dive",
  "update",
  "init",
  "init0",
  "tracker",
  "watch",
  "forward"
], oo = /^[a-z][a-z0-9-]*$/, so = ["<", ">", "&", "|", "~", "{", "}", "[", "]", "*", "/", "\\"], ao = new RegExp(`[${so.map((t) => "\\" + t).join("")}\\x00-\\x1f]`), co = ["VSpacer", "VDivider"];
function Ce(t) {
  return !(typeof t != "string" || t.trim() === "" || ao.test(t) || t.includes("__") || co.includes(t));
}
function uo(t) {
  return t == null || t === "" || typeof t == "number" || typeof t == "boolean" ? !0 : typeof t != "string" ? !1 : Ce(t);
}
function lo(t) {
  const e = t.comp;
  if (!ut(e)) return t;
  if (ro.some((o) => e[o])) return null;
  for (const o of Object.keys(t))
    if (!Bn.has(o) && !no.test(o)) return null;
  for (const o of [e, t])
    if (io.some((a) => o[a] !== void 0)) return null;
  const n = { ...e };
  delete n.options;
  const r = Nt(n, t), i = e.options !== void 0 ? e.options : t.options;
  return i !== void 0 && (r.options = i), r;
}
function po(t) {
  if (t.comp !== void 0 || tt(t[0])) return t;
  const e = t.options;
  if (e !== void 0 && !ut(e)) return null;
  const n = Object.keys(t);
  if (n.length === 0 || se.some((s) => n.includes(s))) return null;
  for (const s of n)
    if (s !== "options" && ce.has(s)) return null;
  const r = n.filter((s) => !ce.has(s)).sort();
  if (r.length === 0 || tt(t[r[0]])) return null;
  const i = e && e.comp || "span", o = { ...e || {} };
  delete o.comp;
  const a = { 0: `<${i}>`, options: o };
  return r.forEach((s, l) => {
    a[String(l + 1)] = t[s];
  }), a;
}
function fo(t) {
  if (t.comp !== void 0) return { comp: t.comp, options: t.options, children: [] };
  if (!tt(t[0]) || String(t[0]).trim().slice(1, -1).split(",").length > 2) return null;
  const n = Ht(t[0]);
  if (!n || n.options.to !== void 0) return null;
  const r = { ...n.options, ...t.options || {} }, i = Object.keys(t).filter((o) => o !== "0" && o !== "options" && o !== "comp").map((o) => t[o]);
  return { comp: n.comp, options: r, children: i };
}
function In(t) {
  if (!ut(t)) return null;
  const e = lo(t);
  if (e === null) return null;
  const n = po(e);
  if (n === null) return null;
  const r = fo(n);
  if (r === null) return null;
  const { comp: i, options: o, children: a } = r;
  return typeof i != "string" || !oo.test(i) || n.comp !== void 0 && Object.keys(n).some((s) => !Bn.has(s)) || o != null && !ut(o) || o != null && Object.keys(o).some((s) => !eo.has(s)) || !uo(o == null ? void 0 : o.html) ? null : { comp: i, options: o || {}, children: a };
}
function Nn(t) {
  return Ce(t) ? !0 : In(t) !== null;
}
function Fn(t, e = 0) {
  return e >= t.length ? [null] : [t[e], Fn(t, e + 1)];
}
function ho(t, e, n, r) {
  return Ge(Vn(t, n, e), { key: `${le}${r}` });
}
function Ne(t, e, n) {
  const r = vn(t, e, n);
  return r === n ? n : Ge(r, { key: n.key });
}
function Oe(t, e, n, r = "0") {
  if (Ce(n)) return Ne(t, e, ho(t, e, n, r));
  const i = In(n);
  if (i === null)
    return e("WBC", { key: `${le}${r}`, item: n });
  const { comp: o, options: a, children: s } = i, l = [];
  a.html !== void 0 && Jt(a.html) && l.push(a.html);
  const c = s.map((f, u) => Oe(t, e, f, `${r}-${u}`)), p = me(o, rt(a));
  return p.key = `${le}${p.key !== void 0 ? p.key : r}`, Ne(t, e, e(o, p, [...l, ...Fn(c)].filter((f) => f != null)));
}
const mo = [
  "input",
  "checkbox",
  // row 28: the list said "checbox" — a typo, so a real
  "checbox",
  //         `comp: 'checkbox'` was never treated as input-like.
  //         The misspelling is kept alongside it for compatibility.
  "radio",
  "select",
  "textarea",
  "VTextField",
  "VCheckbox",
  "VTextarea",
  "VSelect",
  "VRadio",
  "VSlider",
  "VRangeSlider",
  "VSwitch",
  "VAutocomplete",
  "VDatePicker",
  "VColorPicker",
  "VMenu",
  "VRadioGroup",
  // row 28: was "vTimePicker" — lowercase `v`, so it matched nothing. Every other
  // entry is PascalCase, and Vuetify 3 does export `VTimePicker`.
  "VTimePicker"
], yo = new Set(Object.keys($n.props));
function go(t, e, n, r) {
  var g, y, C, w, v, $, E, k, T, V, W, x, A, S, L, D, P, X, R, ht;
  let {
    externalChildren: i,
    insideHeadersVN: o,
    insideFootersVN: a,
    globalHeaderVN: s,
    globalFooterVN: l,
    externalWrapperObj: c,
    extChildren: p,
    wbcObj: f
  } = r, u, d, m, b;
  if (e && typeof e == "object" && !e.comp && typeof e[0] == "string" && e[0].startsWith("<")) {
    const _ = Ht(e[0]);
    if (_) {
      const O = Object.keys(e).filter((B) => B !== "0" && B !== "options" && B !== "comp"), j = {};
      O.forEach((B) => {
        j[B] = e[B];
      }), e = {
        comp: _.comp,
        options: {
          ..._.options,
          ...e.options || {}
        },
        ...j
      }, Object.keys(j).length > 0 && i == null && (i = j);
    }
  }
  if (e && typeof e == "object" && !e.comp && e[0] && typeof e[0] == "object" && typeof e[0].comp == "string" && e[0].comp.includes("~")) {
    const _ = e[0], O = {};
    Object.keys(e).filter((j) => j !== "0" && j !== "options" && j !== "comp").forEach((j) => {
      O[j] = e[j];
    }), e = { comp: _.comp, options: _.options || {}, ...O }, Object.keys(O).length > 0 && i == null && (i = O);
  }
  if (i != null) {
    const O = be(i, (j) => t.isVnode(j)) ? Object.values(i) : i;
    p = t.toWBC_(O, n);
  } else
    p = null;
  if (d = t._wbcOptions(e), t.refName && !d.ref && (d = { ...d, ref: t.refName }), m = t.comp(e), d && d.props && typeof d.props == "object") {
    const _ = t.lang;
    let O = !1;
    const j = {};
    for (const B in d.props) {
      const M = d.props[B];
      M && typeof M == "object" && !Array.isArray(M) && Object.keys(M).length > 0 && Object.keys(M).every((G) => se.includes(G)) ? (j[B] = et(M, _), O = !0) : j[B] = M;
    }
    O && (d = { ...d, props: j });
  }
  if (mo.includes(m)) {
    const _ = (N) => Promise.resolve(N).then(
      (H) => Array.isArray(H) ? H.length === 0 : !!H
    ), O = (N) => N && typeof N == "object" && N.target && "value" in N.target ? N.target.type === "checkbox" ? N.target.checked : N.target.value : N, j = (N) => {
      t.$nextTick(() => {
        var jt;
        const H = (jt = t == null ? void 0 : t.$refs) == null ? void 0 : jt[t.refName], z = H == null ? void 0 : H.validate;
        if (typeof z != "function") {
          t.internalValueIsValid = null;
          return;
        }
        _(z.call(H, !0, N)).then((Et) => {
          t.internalValueIsValid = Et;
        }).catch(() => {
          t.internalValueIsValid = !1;
        });
      });
    }, B = ((y = (g = t == null ? void 0 : t.item_) == null ? void 0 : g.options) == null ? void 0 : y.on) || {}, M = {};
    for (const N of Object.keys(B)) M[kt(N)] = B[N];
    const G = (N, H) => {
      typeof N == "function" ? N(...H) : Array.isArray(N) && N.forEach((z) => {
        typeof z == "function" && z(...H);
      });
    }, dt = M.onInput, it = M["onUpdate:modelValue"];
    t.itemListeners.onInput = (...N) => {
      t.$_wbcValueEdited = !0, t.internalValue = O(N[0]), j(t.internalValue), G(dt, N);
    }, t.itemListeners["onUpdate:modelValue"] = (...N) => {
      t.$_wbcValueEdited = !0, t.internalValue = N[0], j(N[0]), G(it, N);
    };
    const q = d != null && d.props && typeof d.props == "object" && !Array.isArray(d.props) ? d.props : null, ot = (N) => {
      const H = fe(N), z = H && typeof H == "object" ? H.props : null;
      return z ? Array.isArray(z) ? z.includes("value") : Object.prototype.hasOwnProperty.call(z, "value") : !1;
    }, J = q ? q.modelValue !== void 0 ? "modelValue" : q.value !== void 0 && !ot(m) ? "value" : null : null;
    if (J) {
      const N = t.internalValue === void 0 ? q[J] : t.internalValue;
      d = { ...d, props: { ...q, [J]: N } };
    }
  }
  if (d != null && d.hide || t.hide)
    u = null;
  else if (Object.keys(e).length > 0 && se.some((_) => Object.keys(e).includes(_))) {
    const _ = t.lang, O = _ != null && Object.prototype.hasOwnProperty.call(e, _) ? et(e, _) : void 0;
    O != null && typeof O != "string" ? u = n("WBC", {
      key: `wbc-lang-${t.computedKey}-${_}`,
      item: O
    }) : u = n("WBHtml", {
      key: `wbhtml-key-${t.computedKey}-${e.length}`,
      html: e
    });
  } else if (Object.keys(e).length > 0 && !(e != null && e.comp)) {
    let _ = [], O = {
      comp: ((C = e == null ? void 0 : e.options) == null ? void 0 : C.comp) || "span",
      options: { ...(e == null ? void 0 : e.options) || {} }
    };
    (w = O == null ? void 0 : O.options) == null || delete w.float, (v = O == null ? void 0 : O.options) == null || delete v.drag, ($ = O == null ? void 0 : O.options) == null || delete $.close;
    let j = (E = e == null ? void 0 : e.options) == null ? void 0 : E.wrap, B = ce;
    Object.keys(e).sort().forEach((q) => {
      B.has(q) || _.push(e[q]);
    }), j && (O.comp = ((T = (k = j == null ? void 0 : j.options) == null ? void 0 : k.wrap) == null ? void 0 : T.comp) || O.comp, O.options = {
      ...((W = (V = O == null ? void 0 : O.options) == null ? void 0 : V.wrap) == null ? void 0 : W.options) || {},
      ...(O == null ? void 0 : O.options) || {}
    }, delete O.options.wrap);
    const M = !((x = e == null ? void 0 : e.options) != null && x.comp) && ((A = O.options) == null ? void 0 : A.to) !== void 0, G = M ? O.options.to : void 0, dt = M ? O.options.class : void 0;
    M && (delete O.options.to, delete O.options.class);
    const it = Hr(t, n, _, e);
    it !== null ? u = it : u = t.toWBC_(O, n, _), M && (u = n("WBLink", { to: G, class: dt, style_: {}, attrs: {}, html: u }));
  } else if (Array.isArray(m)) {
    let _ = t.resolveValuesWithSource(m, e);
    e != null && e.header && (_.header = e == null ? void 0 : e.header), e != null && e.footer && (_.footer = e == null ? void 0 : e.footer), e != null && e.output && (_.output = e == null ? void 0 : e.output), e != null && e.options && (_.options = e == null ? void 0 : e.options), e != null && e.hOptions && (_.hOptions = e == null ? void 0 : e.hOptions), e != null && e.switch && (_.switch = e == null ? void 0 : e.switch), e != null && e.hFooter && (_.hFooter = e == null ? void 0 : e.hFooter), e != null && e.hHeader && (_.hHeader = e == null ? void 0 : e.hHeader), e != null && e.fStyle && (_.fStyle = e == null ? void 0 : e.fStyle), e != null && e.dive && (_.dive = e == null ? void 0 : e.dive), e != null && e.update && (_.update = e == null ? void 0 : e.update), e != null && e.init && (_.init = e == null ? void 0 : e.init), e != null && e.init0 && (_.init0 = e == null ? void 0 : e.init0), e != null && e.tracker && (_.tracker = e == null ? void 0 : e.tracker), e != null && e.watch && (_.watch = e == null ? void 0 : e.watch), e != null && e.forward && (_.forward = e == null ? void 0 : e.forward), u = n("WBC", {
      key: `wbc-flat-arr-${(_.length || 0) % 1e3}`,
      item: _
    });
  } else if (typeof m == "object" && !(m.install || m.setup || m._isVue || m.$options || m.__v_isVNode || m._scope || m._effects || m.vm)) {
    const _ = ["options", "header", "footer", "hOptions", "hHeader", "hFooter"], O = { ...m };
    for (const J of _) delete O[J];
    let j = t.resolveValuesWithSource(O, e);
    for (const J of _)
      m[J] !== void 0 ? j[J] = m[J] : (e == null ? void 0 : e[J]) !== void 0 && (j[J] = e[J]);
    e != null && e.output && (j.output = e == null ? void 0 : e.output), e != null && e.switch && (j.switch = e == null ? void 0 : e.switch), e != null && e.fStyle && (j.fStyle = e == null ? void 0 : e.fStyle), e != null && e.dive && (j.dive = e == null ? void 0 : e.dive), e != null && e.update && (j.update = e == null ? void 0 : e.update), e != null && e.init && (j.init = e == null ? void 0 : e.init), e != null && e.init0 && (j.init0 = e == null ? void 0 : e.init0), e != null && e.tracker && (j.tracker = e == null ? void 0 : e.tracker), e != null && e.watch && (j.watch = e == null ? void 0 : e.watch), e != null && e.forward && (j.forward = e == null ? void 0 : e.forward), j.options || (j.options = {});
    const { float: B, drag: M, close: G, focus: dt, focusOn: it, ...q } = d || {}, ot = {};
    for (const J of Object.keys(q))
      yo.has(J) && (ot[J] = q[J]);
    Nn(e) ? u = Oe(t, n, e, `tpl-${t.computedKey}`) : u = n("WBC", {
      ...ot,
      item: j
    });
  } else if (typeof m == "string" && (m.includes("|") || m.includes("+"))) {
    typeof m == "string" && (m.includes("|") || m.includes("+")) && (m = t.strToComps(m));
    let _ = [];
    m.forEach((O, j) => {
      let B = {};
      if (typeof O == "string")
        B = (e == null ? void 0 : e[O.replace("~", "")]) || `<${O.replace("<", "").replace(">", "")}>`;
      else if (Array.isArray(O)) {
        let M = {
          comp: O
        };
        t.flattenArray(O).forEach((G) => {
          Object.keys(e).includes(G) && (M[G] = e[G]);
        }), B = n("WBC", {
          key: `wbc-flat-arr-${t.computedKey}`,
          item: M
        });
      } else
        B = O;
      _.push(B);
    }), u = n("WBC", {
      key: `wbc-flat-arr-${t.computedKey}`,
      item: _
    });
  } else if (typeof m == "string" && (m != null && m.startsWith("./"))) {
    let _ = {
      mainContent: n("WBC", {
        ...d || {},
        props: (d == null ? void 0 : d.props) || {},
        item: m
      }),
      options: {
        ...d || {}
      }
    };
    u = n("WBC", { item: _ });
  } else if (typeof m == "function" && m.length == 0) {
    let _ = m;
    const O = ((L = (S = Ut()) == null ? void 0 : S.appContext) == null ? void 0 : L.app) || null;
    _().then((j) => {
      let B = (j == null ? void 0 : j.default) || (j == null ? void 0 : j.name) || {};
      O && (B != null && B.name) && O.component(B.name, B), f && f.components && (f.components[B.name] = B), m = B.name, typeof d == "object" && d !== null && (d.props = {
        ...B.props || {},
        ...d.props
      });
    }).catch((j) => {
    });
  } else {
    let _, O, j, B = t.html(e);
    typeof (d == null ? void 0 : d.html) == "object" || typeof (d == null ? void 0 : d.html) == "function" || (D = d == null ? void 0 : d.html) != null && D.startsWith("https://") || (P = d == null ? void 0 : d.html) != null && P.startsWith("http://") || (X = d == null ? void 0 : d.html) != null && X.startsWith("/") || (R = d == null ? void 0 : d.html) != null && R.startsWith("./") || (ht = d == null ? void 0 : d.html) != null && ht.startsWith("../") || t.isVnode(d == null ? void 0 : d.html) || ["VSpacer", "VDivider"].includes(d == null ? void 0 : d.html) ? _ = t.toWBC_(B, n) : (O = B, t.isNonEmpty(O) ? typeof O == "number" || typeof O == "boolean" || typeof O == "string" && !O.includes("{{") && !O.includes("]]") && !O.includes("|") && !O.includes("__") && !O.startsWith("<") ? _ = O : _ = n("WBHtml", {
      key: `wbhtml-key-${O == null ? void 0 : O.length}-${t.computedKey}`,
      html: O
    }) : _ = null);
    const M = $o[m];
    if (M)
      u = M(t, n, e, d, _, {
        insideHeadersVN: o,
        insideFootersVN: a,
        extChildren: p
      });
    else {
      const G = (z, jt, Et) => {
        const Yn = bo(t, n, d), Gn = wo(t, n, d), ke = { ...Yn, ...Gn }, qn = typeof z == "function" || typeof z == "object" || typeof z == "string" && /^[A-Z]/.test(z), Se = me(z, jt);
        return qn || Object.keys(ke).length > 0 ? n(z, Se, { default: () => Et, ...ke }) : n(z, Se, Et);
      }, dt = rt(d), it = (e == null ? void 0 : e.switch) === !0 ? (t.isVnode(j), j) : t.isVnode(_) ? _ : (_ == null ? void 0 : _.children) || _, q = Array.isArray(it) ? it : [it], ot = t.isVnode(p) ? p : (p == null ? void 0 : p.children) || p, J = Array.isArray(ot) ? ot : ot != null ? [ot] : [];
      b = G(
        m,
        {
          ...dt,
          ...t.itemListeners || {},
          key: `key-raw0-${t.computedKey}`
        },
        [
          ...q,
          ...J
        ].filter((z) => z != null)
      ), t.vNodes.raw0 = b;
      const N = t.isVnode(_) ? _ : (_ == null ? void 0 : _.children) || _, H = Array.isArray(N) ? N : [N];
      u = G(
        m,
        {
          ...dt,
          ...t.itemListeners || {}
        },
        [
          o,
          ...H,
          ...J,
          a
        ].filter((z) => z != null)
      );
    }
    c && (u = n(
      c.comp,
      {
        ...rt(c.options)
      },
      [u]
    )), d != null && d.to && (u = n("WBLink", {
      to: d == null ? void 0 : d.to,
      class: (d == null ? void 0 : d.class) || void 0,
      style_: {},
      attrs: {},
      html: u
    }));
  }
  return t.vNodes.main = u == null ? u : ft(u), t.vNodes.raw0 = b == null ? b : ft(b), (l || s) && (u = n(
    "div",
    {
      key: e == null ? void 0 : e.switch
    },
    [s, u, l]
  )), u = Jr(t, n, u, d), { main: u, options: d, comp: m, raw0: b, extChildren: p };
}
function rt(t) {
  let e = { ...t || {} };
  if (delete e.html, delete e.comp, delete e.header, delete e.footer, delete e.hOptions, delete e.hHeader, delete e.hFooter, delete e.wrap, delete e.scope, delete e.disposition, delete e.hide, delete e.switch, delete e.tracker, delete e.watch, delete e.init, delete e.init0, delete e.update, delete e.output, delete e.float, delete e.drag, delete e.close, delete e.focus, delete e.focusOn, delete e.slots, delete e.scopedSlots, e.props && typeof e.props == "object" && !Array.isArray(e.props) && Object.assign(e, e.props), delete e.props, e.attrs && typeof e.attrs == "object" && !Array.isArray(e.attrs) && Object.assign(e, e.attrs), delete e.attrs, e.on && typeof e.on == "object" && !Array.isArray(e.on))
    for (const [n, r] of Object.entries(e.on)) {
      const i = kt(n);
      e[i] === void 0 && (e[i] = r);
    }
  return delete e.on, e;
}
function Gt(t, e) {
  var i, o, a;
  const n = (i = t == null ? void 0 : t.$options) == null ? void 0 : i.components, r = (a = (o = t == null ? void 0 : t.$) == null ? void 0 : o.appContext) == null ? void 0 : a.components;
  return !!(n != null && n[e] || r != null && r[e]);
}
function gt(t) {
  if (typeof t != "string") return t;
  const e = t.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/);
  return !e || !/^[ \t]*[A-Za-z_][\w-]*[ \t]*:/m.test(e[1]) ? t : t.slice(e[0].length);
}
function bo(t, e, n) {
  const r = {};
  return Object.entries((n == null ? void 0 : n.slots) || {}).forEach(([i, o]) => {
    r[i] = () => [
      e("WBC", {
        key: `key-slots-${i}-${t.computedKey}`,
        item: o
      })
    ];
  }), r;
}
function wo(t, e, n) {
  const r = {};
  return Object.entries((n == null ? void 0 : n.scopedSlots) || {}).forEach(([i, o]) => {
    r[i] = (a) => {
      if (typeof o != "function")
        return [e("WBC", {
          key: `key-scoped-slots-${i}-${t.computedKey}`,
          item: o
        })];
      const s = o(a);
      return s == null ? [] : typeof s == "string" || typeof s == "number" || typeof s == "boolean" ? [s] : [e("WBC", {
        key: `key-scoped-slots-${i}-${t.computedKey}`,
        item: s
      })];
    };
  }), r;
}
function _o(t, e, n, r, i, { insideHeadersVN: o, insideFootersVN: a, extChildren: s }) {
  return e(
    "div",
    {
      class: "markdown-body " + ((r == null ? void 0 : r.class) || ""),
      ...rt(r),
      ...t.itemListeners || {},
      key: `main-key-${t.computedKey}`
    },
    [
      o,
      (i == null ? void 0 : i.children) || i,
      e("WBHtml", {
        ...(r == null ? void 0 : r.MDOptions) || {},
        html: t.$md.render(gt(r == null ? void 0 : r.src) || "")
      }),
      s,
      a
    ]
  );
}
function Co(t, e, n, r, i, { insideHeadersVN: o, insideFootersVN: a, extChildren: s }) {
  var l, c;
  return Gt(t, "WBMermaid") ? e(
    "div",
    {
      class: "markdown-body " + ((r == null ? void 0 : r.class) || ""),
      ...rt(r),
      ...t.itemListeners || {}
    },
    [
      o,
      (i == null ? void 0 : i.children) || i,
      e("WBMermaid", {
        src: (r == null ? void 0 : r.src) || ((l = r == null ? void 0 : r.props) == null ? void 0 : l.src) || "",
        wbcObj: (r == null ? void 0 : r.wbcObj) || ((c = r == null ? void 0 : r.props) == null ? void 0 : c.wbcObj) || "",
        ...rt(r),
        ...t.itemListeners || {}
      }),
      s,
      a
    ]
  ) : Zt("WBMermaid", e);
}
function Oo(t, e, n, r, i, { insideHeadersVN: o, insideFootersVN: a, extChildren: s }) {
  return Gt(t, "WBChart") ? e(
    "div",
    {
      ...rt(r),
      ...t.itemListeners || {}
    },
    [
      o,
      (i == null ? void 0 : i.children) || i,
      e("WBChart", {
        ...rt(r),
        src: r.src || {},
        ...(r == null ? void 0 : r.props) || {},
        ...t.itemListeners || {}
      }),
      s,
      a
    ]
  ) : Zt("WBChart", e);
}
function Wo(t, e, n, r, i, { insideHeadersVN: o, insideFootersVN: a, extChildren: s }) {
  var l;
  return Gt(t, "WBCode") ? e(
    "div",
    {
      ...rt(r),
      ...t.itemListeners || {},
      key: `key-${JSON.stringify(n)}`
    },
    [
      o,
      (i == null ? void 0 : i.children) || i,
      e("WBCode", {
        code: r.src || "",
        language: "markup",
        inline: !1,
        ...(r == null ? void 0 : r.props) || {},
        class: `${(r == null ? void 0 : r.class) || ""} language-${((l = r == null ? void 0 : r.props) == null ? void 0 : l.lang) || "markup"}`
      }),
      s,
      a
    ]
  ) : Zt("WBCode", e);
}
function ie(t, e, n, r, i, { insideHeadersVN: o, insideFootersVN: a, extChildren: s }) {
  var c;
  if (!Gt(t, "WBLatex"))
    return Zt("WBLatex", e);
  let l = e("WBLatex", {
    expression: (r == null ? void 0 : r.html) || "",
    ...(r == null ? void 0 : r.props) || {},
    ...t.itemListeners || {}
  });
  return e(
    ((c = r == null ? void 0 : r.props) == null ? void 0 : c["display-mode"]) == !0 ? "div" : "span",
    {
      ...rt(r)
    },
    [
      o,
      l,
      s,
      a
    ]
  );
}
function xo(t, e, n, r, i, { insideHeadersVN: o, insideFootersVN: a, extChildren: s }) {
  return e(
    "span",
    {},
    [
      o,
      e(
        "VIcon",
        {
          ...rt(r),
          ...t.itemListeners || {},
          key: `icon-${t.computedKey}`
        },
        [
          r == null ? void 0 : r.html
        ]
      ),
      s,
      a
    ]
  );
}
const $o = {
  MD: _o,
  WBMermaid: Co,
  WBChart: Oo,
  WBCode: Wo,
  tex: ie,
  latex: ie,
  WBLatex: ie,
  VIcon: xo
}, vo = (t) => t && (t.default || t), ko = vo(zt), Fe = new ko({ html: !0, linkify: !0, typographer: !0 }), We = /* @__PURE__ */ new WeakMap();
function st(t) {
  return We.get(t) || null;
}
function de(t, e, n = null) {
  We.set(t, { promise: e, response: n });
}
function So(t) {
  We.delete(t);
}
function Ot(t) {
  var e, n, r, i;
  try {
    (i = (r = (n = (e = t == null ? void 0 : t.body) == null ? void 0 : e.cancel) == null ? void 0 : n.call(e)) == null ? void 0 : r.catch) == null || i.call(r, () => {
    });
  } catch {
  }
}
function at(t, e, n, r = {}) {
  var u, d, m, b;
  let i = {
    language: "php",
    topBar: null,
    codeBar: [["code|yellow", "filename"], ["download", "copy"]],
    extra: "code"
  }, o;
  try {
    o = Ut();
  } catch {
  }
  const a = (d = (u = o == null ? void 0 : o.appContext) == null ? void 0 : u.config) == null ? void 0 : d.globalProperties;
  (b = (m = o == null ? void 0 : o.appContext) == null ? void 0 : m.components) != null && b.WBCode, t != null && t.$md || a != null && a.$md;
  let s = fetch(n);
  const l = (t == null ? void 0 : t._matchesFileType) || bt, c = e.withInstance ? e.withInstance(o) : e, p = (g, y, C) => c("WBCode", {
    item: { code: y, ...C || {} }
  });
  t.content.promise = s;
  const f = s.then((g) => {
    var C, w, v, $, E, k, T, V;
    de(t, f, g);
    const y = g.headers.get("Content-Type") || "";
    if (t.content.response = g, y.includes("application/json") || n.endsWith(".json"))
      return g.json().then((W) => {
        var A, S, L, D;
        const x = JSON.stringify(W, null, 2);
        t.source = x, t._sourceFilePath = n, W != null && W.WBC ? t.fileContent = c("WBC", { item: W == null ? void 0 : W.WBC, ...r }) : !!((S = (A = o == null ? void 0 : o.appContext) == null ? void 0 : A.components) != null && S.JsonViewer || (D = (L = t == null ? void 0 : t.$options) == null ? void 0 : L.components) != null && D.JsonViewer) ? t.fileContent = c("JsonViewer", { value: W, ...r }) : t.fileContent = c("pre", {
          style: "background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 6px; overflow-x: auto; font-family: monospace; font-size: 14px; margin: 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #333;"
        }, [x]);
      }).catch(() => g.text().then((W) => {
        try {
          const x = JSON.parse(W);
          t.fileContent = x != null && x.WBC ? c("WBC", { item: x == null ? void 0 : x.WBC, ...r }) : c("pre", {
            style: "background: #1e1e1e; color: #d4d4d4; padding: 16px; border-radius: 6px; overflow-x: auto; font-family: monospace; font-size: 14px; margin: 0; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 1px solid #333;"
          }, [JSON.stringify(x, null, 2)]);
        } catch {
          t.fileContent = c("div", { style: "margin:4px 0;padding:4px 8px;color:#c62828;font-weight:bold;" }, `#JsonError: Invalid JSON in ${n}`);
        }
      }));
    if (y.includes("image/"))
      Ot(g), t.fileContent = c("img", {
        src: n,
        class: "container",
        style: {},
        ...r
      });
    else if (y.includes("video/"))
      Ot(g), t.fileContent = c("video", {
        title: n,
        src: n,
        controls: !0,
        frameborder: "0",
        allowfullscreen: !0,
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        referrerpolicy: "strict-origin-when-cross-origin",
        class: "container",
        style: { width: "auto" },
        ...r
      });
    else if (y.includes("audio/"))
      Ot(g), t.fileContent = c("audio", {
        title: n,
        src: n,
        controls: !0,
        autoplay: !1,
        class: "container",
        style: { height: "revert", width: "revert" },
        ...r
      });
    else if (["/html"].some((W) => y.includes(W)) && n.includes("html") && (g != null && g.data) && !n.includes("?src"))
      t.fileContent = c("WBHtml", {
        html: g.data,
        ...r
      });
    else if ((C = n.toLowerCase()) != null && C.endsWith(".xlsx") || (w = n.toLowerCase()) != null && w.endsWith(".xls") || y.includes("excel") || y.includes("application/excel"))
      Ot(g), t.fileContent = c("VueOfficeExcel", {
        src: n,
        class: "container",
        style: {},
        ...r
      });
    else {
      if (n.includes("html") || (v = n.toLowerCase()) != null && v.endsWith(".docx") || ($ = n.toLowerCase()) != null && $.endsWith(".doc") || y.includes("msword") || y.includes("officedocument"))
        return g.text().then((W) => {
          t.fileContent = c("WBHtml", {
            title: n,
            html: W,
            ...r
          });
        });
      if (y.includes("application/pdf")) {
        Ot(g);
        const W = ((k = (E = o == null ? void 0 : o.appContext) == null ? void 0 : E.components) == null ? void 0 : k.pdf) || ((V = (T = o == null ? void 0 : o.appContext) == null ? void 0 : T.components) == null ? void 0 : V.Pdf);
        t.fileContent = W ? c(W, { src: n, class: "container", style: {}, ...r }) : c("embed", {
          type: "application/pdf",
          src: n,
          class: "container",
          style: { width: "100%", minHeight: "480px" },
          ...r
        });
      } else return y.includes("php") ? g.text().then((W) => {
        t.fileContent = p(c, W, i);
      }) : y.includes("text/") || y.includes("application/javascript") || y.includes("application/x-python") || y.includes("application/x-tex") || y.includes("application/x-rust") || y.includes("application/x-sh") || l(n, U.CODE) || l(n, U.TEXT) || l(n, U.STYLE) || l(n, [".js", ".ts", ".json", ".vue", ".jsx", ".tsx", ".mmd"]) ? g.text().then((W) => {
        var L;
        t.source = W, t._sourceFilePath = n;
        const x = ((L = n.split(".").pop()) == null ? void 0 : L.toLowerCase()) || "";
        if (W.trim().toLowerCase().startsWith("<!doctype html") && x !== "html" && x !== "htm") {
          t.fileContent = c("div", { style: "margin:4px 0;padding:4px 8px;color:#c62828;font-weight:bold;" }, `#FileError: "${n}" not found (SPA fallback detected)`);
          return;
        }
        const S = Kt[x] || "text";
        if (x === "tex")
          t.fileContent = pn(t, c, W, n, r);
        else if (x === "md") {
          const D = (t == null ? void 0 : t.$md) || (a == null ? void 0 : a.$md) || Fe, P = D ? D.render(gt(W) || "") : gt(W);
          t.fileContent = c("WBHtml", {
            html: P,
            ...r
          });
        } else
          i.language = S, i.codeBar = [[`${S}`], ["download", "copy"]], i.extra = n, t.fileContent = c("WBCode", {
            item: {
              code: W,
              language: S,
              extra: n,
              ...i
            },
            ...r
          });
      }) : g.text().then((W) => {
        W && W.trim() ? (i.language = "text", t.fileContent = p(c, W, i)) : t.fileContent = c(
          "div",
          {
            style: {
              backgroundColor: "#F8F9FA",
              color: "red",
              width: "100%",
              height: "100%",
              margin: "10px"
            },
            ...r
          },
          `${n}`.startsWith("/") || `${n}`.startsWith("url://") || `${n}`.startsWith("urls://") ? [`# Url/Serving Error: WBC can not load/serve "${n}"`] : [`# Path/Type Error: WBC can not load this file ${n}`]
        );
      });
    }
  }).catch((g) => {
    t.fileContent = c("iframe", {
      src: n,
      controls: !0,
      frameborder: "0",
      allow: "autoplay; encrypted-media",
      allowfullscreen: !0,
      allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
      referrerpolicy: "strict-origin-when-cross-origin",
      class: "container white",
      style: {
        resize: "both",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        border: 0
      },
      ...r
    });
  }).finally(() => {
    So(t);
  });
  de(t, f);
}
const De = (t) => be(t, $t), oe = (t) => {
  var n, r;
  const e = ((r = (n = t == null ? void 0 : t.item_) == null ? void 0 : n.options) == null ? void 0 : r.key) ?? (t == null ? void 0 : t.extKey);
  return typeof e == "number" ? `-${e}` : typeof e == "string" && e !== "" ? `-${e}` : "";
}, Pe = (t) => tt(t), Re = (t) => {
  var e, n, r, i;
  return typeof (t == null ? void 0 : t.comp) == "string" && (((e = t == null ? void 0 : t.comp) == null ? void 0 : e.includes("~")) || ((n = t == null ? void 0 : t.comp) == null ? void 0 : n.includes("*")) || tt(t == null ? void 0 : t.comp)) || ["nested", "inherit", "adjacent"].includes((r = t == null ? void 0 : t.options) == null ? void 0 : r.disposition) && ((i = t == null ? void 0 : t.options) == null ? void 0 : i.hide);
};
function At(t, e) {
  if (typeof e == "number" || typeof e == "boolean") return !0;
  if (typeof e != "string" || tt(e) || /<[A-Za-z!\/~]/.test(e) || e.includes("|") || e.includes("__") || e === "VSpacer" || e === "VDivider") return !1;
  const n = t._getPathType(e);
  return !["online", "served", "local", "url"].includes(n);
}
function jo(t, e, n) {
  var i, o, a, s, l, c, p, f, u, d, m, b;
  let r;
  if (Pe(e == null ? void 0 : e[0])) {
    let g, y, C, w = e == null ? void 0 : e[0].replace("<", "").replace(">", "").split(",");
    if (g = w == null ? void 0 : w[0].replace("<", "").replace(">", ""), y = t.strToObj(w == null ? void 0 : w[1]), C = t.strToObj(w == null ? void 0 : w[2]), t.isNonEmpty(y) ? typeof y == "string" && (y = { class: y }) : y = {}, C && (y.to = C), typeof y.class == "string" && !((i = y.style) != null && i.backgroundColor)) {
      const $ = {
        "bg-grey-lighten-3": "#e0e0e0",
        "bg-grey-lighten-4": "#f5f5f5",
        "bg-grey-lighten-5": "#fafafa",
        "bg-blue-lighten-5": "#e3f2fd"
      }, E = Object.keys($).find(
        (k) => y.class.split(/\s+/).includes(k)
      );
      E && (y.style = {
        ...y.style || {},
        backgroundColor: $[E]
      });
    }
    let v = {
      comp: g,
      options: y
    };
    if ((o = e == null ? void 0 : e[0]) != null && o.includes("~")) {
      let $ = [], E = null;
      if (e.length > 1) {
        let V = e.length;
        for (let W = 1; W < e.length; W++)
          if (tt(e[W])) {
            V = W;
            break;
          }
        for (let W = 1; W < V; W++) {
          let x = e[W];
          if (At(t, x))
            $.push(x);
          else if (De(x))
            for (const A of Object.keys(x))
              $.push(t.toWBC_(x[A], n));
          else
            $.push(t.toWBC_(x, n));
        }
        V < e.length && (E = e.slice(V));
      }
      const k = { ...y || {} };
      delete k.to;
      const T = [
        ...$,
        E ? t.toWBC_(E, n) : null
      ].filter(Boolean);
      r = n(
        g.replace("~", ""),
        k,
        T
      ), t.isNonEmpty(C) && (r = n("WBLink", { to: C, html: r }));
    } else {
      let $ = g.replace("<", "").replace(">", "");
      r = e.slice(1).map((E, k) => {
        if (At(t, E))
          return n($, y || {}, [E]);
        if (Array.isArray(E)) {
          let T = E.map((V) => At(t, V) ? V : t.toWBC_(V, n));
          return n($, y || {}, T);
        }
        if (De(E)) {
          let T = Object.keys(E).map((V) => {
            const W = E[V];
            return At(t, W) ? W : t.toWBC_(W, n);
          });
          return n($, y || {}, T);
        }
        return t.toWBC_(v, n, E);
      });
    }
  } else if (Re(e == null ? void 0 : e[0])) {
    let g = [], y = t.clone(e == null ? void 0 : e[0]);
    if (((s = (a = e == null ? void 0 : e[0]) == null ? void 0 : a.options) == null ? void 0 : s.disposition) == "nested" || (c = (l = e == null ? void 0 : e[0]) == null ? void 0 : l.comp) != null && c.includes("~")) {
      const C = {
        ...e[0],
        options: {
          ...e[0].options || {},
          footers: e.length > 1 ? e.slice(1) : null
        }
      };
      g = n("WBC", { item: C });
    } else ((f = (p = e == null ? void 0 : e[0]) == null ? void 0 : p.options) == null ? void 0 : f.disposition) == "inherit" || (u = y == null ? void 0 : y.comp) != null && u.includes("*") ? e.slice(1).forEach((C, w) => {
      var v;
      if (t.isPlainObject(C)) {
        let $ = t.mergeObjects(t.clone(y), C);
        const E = `wbc-key-arr-${w}${oe(t)}`;
        g.push(
          n("WBC", {
            key: E,
            keyy: E,
            item: $
          })
        );
      } else {
        let $ = {
          ...y,
          options: {
            ...(y == null ? void 0 : y.options) || {}
          }
        };
        $.options.html = [(v = $ == null ? void 0 : $.options) == null ? void 0 : v.html, C], $.comp = $.comp.replace("*", "").replace("<", "").replace(">", "");
        const E = `wbc-key-arr-${w}${oe(t)}`;
        g.push(
          n("WBC", {
            key: E,
            keyy: E,
            item: $
          })
        );
      }
    }) : (((m = (d = e == null ? void 0 : e[0]) == null ? void 0 : d.options) == null ? void 0 : m.disposition) == "adjacent" || tt((b = e == null ? void 0 : e[0]) == null ? void 0 : b.comp)) && (g = e.slice(1).map((C, w) => t.toWBC_(y, n, C)));
    r = g;
  } else {
    const g = oe(t), y = [];
    let C = 0;
    for (; C < e.length; C++) {
      const w = e[C];
      if (Pe(w) || Re(w)) break;
      if (Nn(w))
        y.push(Oe(t, n, w, `arr-${C}${g}`));
      else {
        const v = `wbc-child-${C}${g}`;
        y.push(n("WBC", { key: v, keyy: v, item: w }));
      }
    }
    y.push(C < e.length ? t.toWBC_(e.slice(C), n) : [null]), r = y;
  }
  return r;
}
function Eo(t, e, n) {
  var a;
  const r = t.resolvedWbCode == null ? null : t.vNodes.wbCode, i = t.resolvedWbCodeFile == null ? null : t.vNodes.wbCodeFile, o = t.resolvedWbDataViewer == null ? null : t.vNodes.wbDataViewer;
  if (r || i || o) {
    const s = [
      ((a = t.item_) == null ? void 0 : a.comp) == "meta" ? null : n,
      r,
      i,
      o
    ].filter(Boolean);
    return e("VCard", {
      key: `wbc-wrapper-${t.resolvedWbCode != null}-${t.resolvedWbCodeFile != null}-${t.resolvedWbDataViewer != null}-k${t.key_ || 0}`,
      class: "pa-3 my-3",
      outlined: !0,
      shaped: !0,
      rounded: !0
    }, { default: () => s });
  }
  return n;
}
function Me(t, e, n, r) {
  var l;
  const { _float: i, _close: o, _drag: a, _focus: s } = r;
  if (i || o || a || s || t.focusOn_) {
    let c = t.item_;
    if (!c) return n;
    let p = {
      position: "fixed",
      top: "13% ",
      left: "30%",
      "z-index": "10",
      height: "auto",
      width: "40%",
      padding: "1.8%",
      transform: `translate(${t.offsetX}px, ${t.offsetY}px)`,
      cursor: t.draggable ? "grabbing" : "grab",
      "background-color": "#FAFAFA",
      border: "1px solid grey",
      resize: "both",
      overflow: "auto"
    };
    const f = Dn(t, e, c, i), u = Rn(t, e, c, a), d = Pn(t, e, c, o);
    let m = {
      options: {
        class: "pa-15",
        style: t.float_ ? p : (l = c == null ? void 0 : c.options) != null && l.focus ? { border: "1px solid black" } : {},
        html: {
          comp: t.focusOn_ ? t.focusOn_ : {
            0: {
              0: "<~VRow,mb-5 d-flex justify-end align-end>",
              1: "float",
              2: "drag",
              3: "close"
            },
            1: "main"
          },
          float: f,
          drag: u,
          close: d,
          main: n
        }
      }
    };
    return e("WBC", {
      key: `focusOn-key-${JSON.stringify(t.clone(m)).length % 1e3}`,
      item: m
    });
  }
  return n;
}
function Dn(t, e, n, r) {
  var a, s;
  const i = r;
  let o = {
    default: typeof t.float_ == "boolean" || r == null && t.focusOn_ || ((a = n == null ? void 0 : n.options) == null ? void 0 : a.float) === !0 ? {
      comp: "VIcon",
      options: {
        html: i == !0 ? "mdi-dock-window" : "mdi-fullscreen-exit"
      }
    } : t.float_ || ((s = n == null ? void 0 : n.options) == null ? void 0 : s.float),
    options: {
      title: "Float Output",
      class: " pa-2",
      onClick: () => {
        t.float_ = !t.float_;
      },
      style: { cursor: "pointer" }
    }
  };
  return e("WBC", { item: o });
}
function Pn(t, e, n, r) {
  let i = {
    default: r == !0 || r == null && t.focusOn_ ? {
      comp: "VIcon",
      options: { html: "mdi-close-box-outline" }
    } : r != !1 ? r : null,
    options: {
      title: "Close window",
      class: " pa-2",
      onClick: () => {
        n != null && n.options && (n.options.hide = !0, n.options.close = null), t.hide_ = !0;
      },
      style: { cursor: "pointer" }
    }
  };
  return e("WBC", { item: i });
}
function Rn(t, e, n, r) {
  var s, l;
  if (r == null && ((s = n == null ? void 0 : n.options) == null ? void 0 : s.drag) == null) return null;
  const i = r ?? ((l = n == null ? void 0 : n.options) == null ? void 0 : l.drag);
  let o = { onMousedown: t.startDrag }, a = {
    content: {
      comp: "VIcon",
      options: {
        title: "Drag window",
        class: " pa-2",
        html: "mdi-drag",
        ...i ? o : {}
      }
    },
    ...t.isPlainObject(t.drag_) ? t.drag_ : {}
  };
  return e("WBC", { item: a });
}
function To(t, e, n) {
  if (t.select === !0 || t.isNonEmpty(t.alertObjs)) {
    let r = {
      keyy: `key-${t.alertObjs.length}`,
      class: "pa-1 my-1",
      style: {
        backgroundColor: t.rColor,
        border: "10px dashed black"
      },
      title: `=== WBC === 
 el: ${t.nameEl} 
 isVnode: ${t.isVnode(t.item_)}
`
    };
    return e("div", r, [
      `${t.isVnode(t.item_) ? "VNode:" : ""}${t.nameEl}=>`,
      n,
      e("VListGroup", { value: !1 }, [
        e("JsonViewer", {
          value: {
            item: t.item,
            item_: t.item_,
            itemAccessibility: t.itemAccessibility
          }
        })
      ]),
      e("VBtn", {
        value: !1,
        onClick: () => {
          t.select = !t.select;
        }
      }, ["close"])
    ]);
  }
  return n;
}
function Ao(t, e, n) {
  return Array.isArray(n) ? e(
    "span",
    n.filter((r) => r).map((r) => {
      var i;
      return ((i = r == null ? void 0 : r.$el) == null ? void 0 : i.children) || r;
    })
  ) : n;
}
function Lo(t, e, n, r) {
  return r ? e(
    "VContainer",
    {
      ...t.isPlainObject(r) ? r : r == !0 ? { style: { border: "1px solid black" } } : {}
    },
    Array.isArray(n) && n.length > 0 ? n : [n]
  ) : n;
}
const {
  compressToEncodedURIComponent: Vo,
  decompressFromEncodedURIComponent: Bo
} = Qe, Lt = /* @__PURE__ */ new Map(), _t = /* @__PURE__ */ new Set(), Ft = /* @__PURE__ */ new Map(), Io = /^(https?:|mailto:|tel:|sms:|ftp:|\/\/|www\.|#)/i, No = /^([A-Za-z][\w-]*)__([\s\S]+)$/;
function Fo(t) {
  return t.replace(/&lbrack;/g, "[").replace(/&rbrack;/g, "]").replace(/&lbrace;/g, "{").replace(/&rbrace;/g, "}").replace(/&lpar;/g, "(").replace(/&rpar;/g, ")").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&vert;/g, "|").replace(/&#95;&#95;/g, "__");
}
function Ue(t) {
  if (typeof t != "string" || !t) return;
  const e = Fo(t.trim());
  if (/^https?:\/\//.test(e)) return e;
  if (/^['"\d]/.test(e) && e.includes(",")) {
    const r = yt("[" + e + "]");
    if (Array.isArray(r)) return r;
  }
  const n = yt(e);
  return n && typeof n == "object" ? n : void 0;
}
function Do(t) {
  const e = t.match(No);
  if (!e) return null;
  const n = e[1], r = e[2], i = r.indexOf("__");
  if (i > 0) {
    const a = Ue(r.slice(i + 2));
    if (a !== void 0) return { name: n, path: r.slice(0, i), item: a };
  }
  const o = Ue(r);
  return o !== void 0 ? { name: n, path: null, item: o } : null;
}
function Po(t) {
  return typeof t == "string" && (t.startsWith("./") || t.startsWith("../"));
}
function Ct(t, e) {
  return typeof t.hasRoute == "function" ? t.hasRoute(e) : typeof t.getRoutes == "function" ? t.getRoutes().some((n) => n.name === e) : _t.has(e);
}
function Ro(t, e) {
  if (typeof t.getRoutes == "function") {
    const n = t.getRoutes().find((r) => r.path === e);
    return n ? n.name : null;
  }
  return null;
}
function Mo(t, e) {
  try {
    if (typeof t.resolve == "function") {
      const n = t.resolve(e), r = n && n.route || n;
      return !!(r && r.matched && r.matched.length > 0);
    }
  } catch {
  }
  return !1;
}
function Uo(t, e) {
  const n = [];
  for (const r of `${t}/${e}`.split("/"))
    r === "" || r === "." || (r === ".." ? n.pop() : n.push(r));
  return "/" + n.join("/");
}
function xe(t) {
  return (t || "").replace(/[^a-zA-Z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean).map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join("");
}
function zo(t) {
  const e = `${t}`.match(/^([^?#]*)([?#].*)?$/);
  return { core: e[1], suffix: e[2] || "" };
}
const qt = () => Promise.resolve().then(() => fs).then((t) => t.default || t);
function ct(t) {
  const e = (r) => r.toString().replace(/\s+/g, " ").trim();
  if (typeof t == "function") return e(t);
  if (typeof t != "object" || t === null) return t;
  const n = Array.isArray(t) ? [] : {};
  for (const [r, i] of Object.entries(t))
    n[r] = typeof i == "function" ? e(i) : i && typeof i == "object" ? ct(i) : i;
  return n;
}
function Ko(t) {
  return JSON.stringify(ct(t));
}
let pe = null;
function Es(t) {
  pe = typeof t == "function" ? t : null;
}
function Qt(t, e, n, r, i) {
  if (pe)
    try {
      const o = { name: t, path: e, item: ct(n) };
      r !== void 0 && (o.meta = ct(r)), i && Object.keys(i).length && (o.route = ct(i)), pe(o);
    } catch (o) {
      console.error(`#WBCRouteSinkError: ${o.message}`);
    }
}
const ze = /* @__PURE__ */ new Set();
function Jo(t, e) {
  ze.has(t) || (ze.add(t), typeof console < "u" && console.warn(e));
}
function $e(t) {
  const e = t && typeof t == "object" && !Array.isArray(t) ? t.options : null;
  if (!e) return null;
  const n = e.route;
  if (n != null) {
    if (typeof n == "string")
      return { name: n, path: null, meta: void 0, extra: {} };
    if (typeof n == "object" && !Array.isArray(n)) {
      const { name: r, path: i, meta: o, ...a } = n;
      return !r && !i ? null : { name: r, path: i || null, meta: o, extra: a };
    }
    return null;
  }
  return e.name || e.path ? (Jo(
    "options.name/path",
    "#WBCDeprecation: WBC item-route `options.name` / `options.path` are deprecated — use `options.route` (a string, or `{ name, path, meta, …guards }`). See _docs/wbc-links-routes."
  ), { name: e.name, path: e.path || null, meta: e.meta, extra: {} }) : null;
}
function Ho(t, e, n) {
  if (!t || typeof t.addRoute != "function")
    throw new Error(`#WBCRouteError: router unavailable for "${e}"`);
  const { core: r, suffix: i } = zo(e), o = (n || "/").replace(/\/[^/]*$/, "") || "/", s = Uo(o, r).replace(/\.[^/.]+$/, ""), l = "/wbc" + (s.startsWith("/") ? s : "/" + s);
  if (Lt.has(l))
    return { name: Lt.get(l), path: l, suffix: i };
  const c = Ro(t, l);
  if (c)
    return Lt.set(l, c), { name: c, path: l, suffix: i };
  const p = s.split("/").filter(Boolean).pop() || "page", f = "WBC" + xe(p);
  let u = f, d = 0;
  for (; Ct(t, u); ) u = f + ++d;
  return t.addRoute({
    path: l,
    name: u,
    component: qt,
    props: { item: e }
  }), Lt.set(l, u), _t.add(u), Qt(u, l, e), { name: u, path: l, suffix: i };
}
function Zo(t, e) {
  var r;
  if (!t || typeof t.addRoute != "function")
    throw new Error("#WBCRouteError: router unavailable");
  if (!e || typeof e != "object" || typeof e.path != "string")
    throw new Error('#WBCRouteError: invalid route definition (needs a string "path")');
  let n = e.name;
  if (!n) {
    const i = e.path.split("/").filter(Boolean).pop() || "page";
    n = "WBC" + xe(i);
  }
  return Ct(t, n) ? { name: n, path: e.path } : (t.addRoute({ ...e, name: n }), _t.add(n), Qt(n, e.path, (r = e.props) == null ? void 0 : r.item), { name: n, path: e.path });
}
function Mn(t, e) {
  if (!t || typeof t.addRoute != "function")
    throw new Error("#WBCRouteError: router unavailable");
  const n = $e(e);
  if (!n)
    throw new Error("#WBCRouteError: item route needs options.route (a string, or { name, path })");
  const { meta: r, extra: i } = n;
  let o = n.name;
  const a = n.path || (o ? "/wbc/" + o : null);
  if (!a)
    throw new Error("#WBCRouteError: item route needs options.route with a name or path");
  if (!o) {
    const c = a.split("/").filter(Boolean).pop() || "page";
    o = "WBC" + xe(c);
  }
  const s = JSON.stringify({
    item: ct(e),
    meta: r ?? null,
    path: a,
    route: Object.keys(i).length ? ct(i) : null
  }), l = Ft.get(o) !== s;
  return Ct(t, o) || (t.addRoute({
    ...i,
    // object-form guards (beforeEnter, alias, …); the lines below win
    path: a,
    name: o,
    component: qt,
    props: { item: e },
    ...r !== void 0 ? { meta: r } : {}
  }), _t.add(o)), l && (Ft.set(o, s), Qt(o, a, e, r, i)), { name: o, path: a };
}
function Xo(t, e, n, r) {
  if (!t || typeof t.addRoute != "function")
    throw new Error(`#WBCRouteError: router unavailable for named route "${e}"`);
  const i = r ? r.startsWith("/") ? r : "/" + r : "/wbc/" + e, o = JSON.stringify({ item: ct(n), path: i }), a = Ft.get(e) !== o;
  return Ct(t, e) || (t.addRoute({
    path: i,
    name: e,
    component: qt,
    props: { item: n }
  }), _t.add(e)), a && (Ft.set(e, o), Qt(e, i, n)), { name: e, path: i };
}
function Yo(t, e) {
  if (!e || typeof e != "object" || Array.isArray(e) || !$e(e) || !t || typeof t.addRoute != "function") return null;
  try {
    return Mn(t, e);
  } catch (n) {
    return console.error(`#WBCItemRouteError: ${n.message}`), null;
  }
}
function Go(t) {
  const e = "WBCDynamicRouting", n = "/wbc/dynamic/routing/:item";
  if (!t || typeof t.addRoute != "function")
    throw new Error("#WBCRouteError: router unavailable");
  return Ct(t, e) ? { name: e, path: n } : (t.addRoute({
    path: n,
    name: e,
    component: qt,
    props: (r) => {
      var o;
      let i = null;
      try {
        const a = Bo((o = r == null ? void 0 : r.params) == null ? void 0 : o.item);
        try {
          i = JSON.parse(a);
        } catch {
          i = a;
        }
      } catch {
        i = null;
      }
      return { contentTrust: "external", untrusted: !0, item: i };
    }
  }), _t.add(e), { name: e, path: n });
}
function qo(t, e, n, r) {
  const i = r === !0;
  if (e && typeof e == "object") {
    if (e.__defineRoute) {
      if (i) return { kind: "external" };
      const { __defineRoute: s, ...l } = e;
      return { kind: "route", location: { name: Zo(t, l).name } };
    }
    return e.options && $e(e) ? i ? { kind: "external" } : { kind: "route", location: { name: Mn(t, e).name } } : e.name || e.path ? { kind: "route", location: e } : (Go(t), {
      kind: "route",
      location: {
        name: "WBCDynamicRouting",
        params: {
          item: Vo(Ko(e))
        }
      }
    });
  }
  if (typeof e != "string") return { kind: "none" };
  const o = e.trim();
  if (!o) return { kind: "none" };
  const a = Do(o);
  if (a)
    return i ? { kind: "external" } : { kind: "route", location: { name: Xo(t, a.name, a.item, a.path).name } };
  if (Io.test(o)) return { kind: "external" };
  if (Po(o)) {
    if (i) return { kind: "external" };
    const s = Ho(t, o, n), l = { name: s.name };
    return s.suffix && s.suffix.startsWith("#") ? l.hash = s.suffix : s.suffix && s.suffix.startsWith("?") && (l.query = Object.fromEntries(new URLSearchParams(s.suffix.slice(1)))), { kind: "route", location: l };
  }
  return t && Ct(t, o) ? { kind: "route", location: { name: o } } : o.startsWith("/") && t && Mo(t, o) ? { kind: "route", location: { path: o } } : { kind: "external" };
}
function Qo(t = "lg") {
  try {
    const e = Y.get(t);
    if (e)
      return decodeURIComponent(e);
  } catch (e) {
    console.warn("detectLang() failed:", e);
  }
  return "en";
}
const ts = !1;
function es(t = {}) {
  const e = { ...t };
  for (const s of [
    "tiers",
    "_wbcPro",
    "_wbcProValidationStarted",
    "_wbcProDetails",
    "_wbcProAuthorized"
  ])
    delete e[s];
  const n = Ye({
    lg: Qo(),
    _wbcDev: ts,
    keyIndex: 0,
    ...e
  }), r = {
    lg: mt(() => n.lg),
    keyIndex: mt(() => n.keyIndex),
    _wbcDev: mt(() => n._wbcDev),
    /**
     * @deprecated ADR-004 keeps this shim for one release so satellite packages
     * keep their existing behaviour while core itself has no tiers.
     */
    isPackageAuthorized: mt(() => (s = "core") => s === "core"),
    /** @deprecated See `isPackageAuthorized`. */
    isWbcPro: mt(() => r.isPackageAuthorized.value("core")),
    /** @deprecated See `isPackageAuthorized`. */
    userTier: mt(() => (s = "core") => r.isPackageAuthorized.value(s) ? "premium" : "free")
  }, i = new Proxy(r, {
    get(s, l) {
      if (l in s)
        return je(s[l]);
    },
    has(s, l) {
      return l in s;
    },
    ownKeys(s) {
      return Reflect.ownKeys(s);
    },
    getOwnPropertyDescriptor(s, l) {
      if (l in s)
        return { enumerable: !0, configurable: !0, value: je(s[l]) };
    }
  }), o = {
    updateLang(s) {
      n.lg = s;
      try {
        Y.set("lg", encodeURIComponent(s), { path: "/", expires: 365, sameSite: "Lax" });
      } catch {
      }
    },
    updateKeyIndex(s) {
      n.keyIndex = s;
    },
    setWbcProAuthorized() {
    },
    setWbcProDetails() {
    },
    setTierStatus() {
    }
  }, a = {
    setLang(s) {
      Y.get("lg") ? o.updateLang(s) : (o.updateLang("en"), Y.set("lg", "en"));
    },
    setKeyIndex(s) {
      s > 1e3 ? o.updateKeyIndex(0) : o.updateKeyIndex(s);
    }
  };
  return {
    state: n,
    getters: i,
    commit(s, l) {
      o[s] ? o[s](l) : console.warn(`[WBC Store] Unknown mutation: ${s}`);
    },
    dispatch(s, l) {
      if (a[s])
        return a[s](l);
      console.warn(`[WBC Store] Unknown action: ${s}`);
    }
  };
}
const Un = es(), ns = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/, rs = /* @__PURE__ */ new Set(["__proto__", "constructor", "prototype"]), zn = /* @__PURE__ */ new WeakSet();
function is(t) {
  return typeof t == "string" && ns.test(t) && !rs.has(t) && (!(t in globalThis) || zn.has(globalThis[t]));
}
function Kn(t) {
  return Array.isArray(t) ? t.map((e) => e == null ? "" : typeof e.children == "string" ? e.children : Array.isArray(e.children) ? Kn(e.children) : "").join("") : "";
}
const os = {
  beforeCreate() {
    this.$store || (this.$store = Un), this.vNodes = ft({}), this.content = ft({ input: {}, output: {} }), this.$_finalRender = null;
  },
  created() {
    var a, s, l, c, p, f, u, d, m, b, g, y, C, w, v, $, E, k, T, V, W, x, A;
    const t = (s = (a = this.$store) == null ? void 0 : a.state) == null ? void 0 : s.lg;
    if (!(t && typeof t == "string" && t.trim() !== "")) {
      const S = (typeof this.getCookies == "function" ? (l = this.getCookies()) == null ? void 0 : l.lg : null) || Y.get("lg");
      S && typeof S == "string" && S.trim() !== "" ? (p = (c = this.$store) == null ? void 0 : c.commit) == null || p.call(c, "updateLang", S) : (u = (f = this.$store) == null ? void 0 : f.commit) == null || u.call(f, "updateLang", "en");
    }
    if ((this.item === void 0 || this.item === null) && this.$slots && this.$slots.default) {
      const S = typeof this.$slots.default == "function" ? this.$slots.default() : this.$slots.default, L = Kn(S).trim();
      if (L)
        if (L.startsWith("~")) {
          const D = L.slice(1).trim();
          try {
            this.item_ = this.strToObj(D);
          } catch {
            this.item_ = D;
          }
        } else
          this.item_ = L;
      else
        this.item_ = this.item;
    } else
      this.item_ = this.item;
    if (typeof this.item_ == "string" && (this._originalItem = this.item_), typeof this.item == "string" && this.item.startsWith("~") && (this.item_ = { comp: "span", options: { html: this.item.slice(1) } }), this.wiki_ = this.wiki, this.wiki)
      if (this.wiki.includes(","))
        this.item_ = this.wiki.split(",").map((S) => {
          var L;
          return (L = this.wbcWikiObj) == null ? void 0 : L[S];
        });
      else {
        let S = (d = this.wbcWikiObj) == null ? void 0 : d[this.wiki_];
        this.item_ = S || this.item_;
      }
    if (!this.item_ || !this.item)
      return null;
    if (this.wrap_ = this != null && this.wrap ? {
      comp: ((m = this.wrap) == null ? void 0 : m.comp) || this.wrap,
      options: ((b = this.wrap) == null ? void 0 : b.options) || {}
    } : null, this.children_ = this.children, this.rColor = ((g = this == null ? void 0 : this.item) == null ? void 0 : g.rColor) || this.randomColor(), this.nameEl = this.global_, this.isPlainObject(this.item_)) {
      if ((y = this.item_) != null && y.init0 && this.item_.init0(this.itemAccessibility), this.nameEl = ((w = (C = this == null ? void 0 : this.item_) == null ? void 0 : C.options) == null ? void 0 : w.global) || this.nameEl, this.refName = (($ = (v = this.item_) == null ? void 0 : v.options) == null ? void 0 : $.ref) || "main_" + this.randomKey("", 3).toLowerCase(), (E = this.item_) != null && E.options) {
        this.internalValue = (T = (k = this == null ? void 0 : this.item_) == null ? void 0 : k.options) == null ? void 0 : T.val;
        const S = this.item_.options.props && typeof this.item_.options.props == "object" ? this.item_.options.props : null;
        this.internalValue === void 0 && S && (S.modelValue !== void 0 ? this.internalValue = S.modelValue : S.value !== void 0 && (this.internalValue = S.value));
      }
      this.dive = (V = this.item_) == null ? void 0 : V.dive;
    } else
      this.internalValue = this.item_;
    this.nameEl = this.nameEl || this.randomKey("", 3).toLowerCase();
    let e, n;
    const r = (S) => {
      if (e && globalThis[e] === n && delete globalThis[e], e = void 0, n = void 0, !S) return;
      const L = this.itemAccessibility;
      if (zn.add(L), !is(S)) {
        console.error(`[WBC-UI3] Refused to assign global name "${S}" — invalid, reserved, or already owned outside WBC.`);
        return;
      }
      globalThis[S] = L, e = S, n = L;
    }, i = () => {
      var S, L;
      return ((L = (S = this.item_) == null ? void 0 : S.options) == null ? void 0 : L.global) || this.global;
    };
    r(i()), this.$watch(i, r), this.dive && (this._preDiveItem = this.clone(this.item_), this.item_ = this.generalVal(
      this.item_,
      this.itemAccessibility,
      this.lang
    ));
    const o = ((x = (W = this == null ? void 0 : this.item_) == null ? void 0 : W.options) == null ? void 0 : x.on) || {};
    this.itemListeners = {};
    for (const [S, L] of Object.entries(o))
      this.itemListeners[kt(S)] = L;
    for (let S of ((A = this.item_) == null ? void 0 : A.watch) || []) {
      let L, D = (P, X) => S[1](this.itemAccessibility, P, X);
      S[0] instanceof Function ? L = () => S[0](this.itemAccessibility) : typeof S[0] == "string" ? L = "itemAccessibility." + S[0] : Array.isArray(S[0]) && (L = () => S[0].map((P) => {
        if (P instanceof Function)
          return P(this.itemAccessibility);
        if (typeof P == "string")
          return P.split(".").reduce((X, R) => X == null ? void 0 : X[R], this.itemAccessibility);
      })), this.$watch(L, D, ...S.slice(2));
    }
  },
  mounted() {
    var t, e, n, r, i;
    this.isPlainObject(this.item_) && (typeof ((t = this.item_) == null ? void 0 : t.init) == "function" && this.item_.init(this.itemAccessibility), typeof ((e = this.item_) == null ? void 0 : e.logic) == "function" && this.item_.logic(this.itemAccessibility)), ((n = this.item_) == null ? void 0 : n.comp) == "meta" && this.setMetaParams(this.item_, (i = (r = this.$store) == null ? void 0 : r.state) == null ? void 0 : i.lg), typeof window < "u" && this.isPlainObject(this.item_) && Yo(this.$router, this.item_);
  },
  updated() {
    var t, e, n, r;
    this.item_ instanceof Object && (t = this.item_) != null && t.updater && this.item_.updater(this.itemAccessibility), ((e = this.item_) == null ? void 0 : e.comp) == "meta" && this.setMetaParams(this.item_, (r = (n = this.$store) == null ? void 0 : n.state) == null ? void 0 : r.lg);
  },
  // Vue 3: `beforeDestroy` was renamed to `beforeUnmount`. Keeping the old name
  // here would silently leak the listeners this hook is meant to remove.
  beforeUnmount() {
    this._debugListenerAttached && this.$el && typeof this.$el.removeEventListener == "function" && (this.$el.removeEventListener("mousedown", this.handleMouseDown), this._debugListenerAttached = !1), document.removeEventListener("mousemove", this.doDrag), document.removeEventListener("mouseup", this.endDrag);
  }
}, ss = {
  computed: {
    computedKey() {
      var i, o, a;
      const t = this.item_, e = t && typeof t == "object" ? t.options : null;
      let n = this.nameEl || "";
      if (e) {
        const s = e.key;
        typeof s == "string" || typeof s == "number" ? n = s : typeof s == "object" && s !== null && (n = JSON.stringify(s).slice(0, 20));
      }
      const r = [
        "key",
        this.nameEl || "",
        "n",
        n,
        this.extKey || "",
        this.key_ || ""
        // `this.key` was a Vue 2 read. In Vue 3 `key` is a reserved VNode
        // property that is stripped before it reaches the instance, so this
        // was ALWAYS undefined — it contributed an empty segment and logged
        // "Property \"key\" was accessed during render" on every render.
        // `key_` above is the supported escape hatch.
      ];
      if (e && e.reactiveKey) {
        const s = (i = e.val) == null ? void 0 : i.length, l = (a = (o = e.props) == null ? void 0 : o.value) == null ? void 0 : a.length;
        s !== void 0 && r.push("v", s), l !== void 0 && r.push("vv", l);
      }
      return r.join("-");
    },
    isWbcPro() {
      var t, e;
      return ((e = (t = this.$store) == null ? void 0 : t.getters) == null ? void 0 : e.isWbcPro) || !1;
    },
    wbcTier() {
      var t, e;
      return ((e = (t = this.$store) == null ? void 0 : t.getters) == null ? void 0 : e.userTier()) || "free";
    },
    itemMode: () => "itemMode",
    itemDisp: () => "itemDisp",
    itemProd: () => "itemProd",
    // CQ-4 FIX: Corrected typo from 'itemAccessebility' to 'itemAccessibility'
    itemAccessibility() {
      return Tr(this, this.isWbcPro, this.wbcTier);
    },
    itemAccessebility() {
      return this.itemAccessibility;
    },
    configuredWbCode() {
      var t, e;
      return ((e = (t = this.item_) == null ? void 0 : t.options) == null ? void 0 : e.wbCode) ?? this.wbCode ?? null;
    },
    resolvedWbCode() {
      var n, r;
      const t = ((r = (n = this.item_) == null ? void 0 : n.options) == null ? void 0 : r.wbCode) ?? this.wbCode ?? null, e = this.wbCode_;
      return e === void 0 ? t : e == null ? null : typeof e == "boolean" && t && typeof t == "object" ? { ...t, collapsed: !e } : e;
    },
    configuredWbCodeFile() {
      var t, e;
      return ((e = (t = this.item_) == null ? void 0 : t.options) == null ? void 0 : e.wbCodeFile) ?? this.wbCodeFile ?? null;
    },
    resolvedWbCodeFile() {
      const t = this.configuredWbCodeFile, e = this.wbCodeFile_;
      return e === void 0 ? t : e == null ? null : typeof e == "boolean" && t && typeof t == "object" ? { ...t, collapsed: !e } : e;
    },
    resolvedWbDataViewer() {
      var t, e, n, r;
      return ((e = (t = this.item_) == null ? void 0 : t.options) == null ? void 0 : e.wbDataViewer) != null ? (r = (n = this.item_) == null ? void 0 : n.options) == null ? void 0 : r.wbDataViewer : this.wbDataViewer != null ? this.wbDataViewer : null;
    },
    resolvedHide() {
      var t, e;
      return this.hide_ != null ? this.hide_ : ((e = (t = this.item_) == null ? void 0 : t.options) == null ? void 0 : e.hide) != null ? this.item_.options.hide : this.hide != null ? this.hide : null;
    },
    itemFileLanguage() {
      var r;
      const t = typeof this.item_ == "string" ? this.item_ : this._sourceFilePath || this._originalItem;
      if (typeof t != "string") return null;
      const e = Kt, n = (r = t.split(".").pop()) == null ? void 0 : r.toLowerCase();
      return e[n] || null;
    },
    lang() {
      var e, n, r, i, o, a;
      if ((n = (e = this == null ? void 0 : this.item_) == null ? void 0 : e.options) != null && n.lang) return this.item_.options.lang;
      if ((i = (r = this == null ? void 0 : this.$store) == null ? void 0 : r.state) != null && i.lg) return this.$store.state.lg;
      const t = (typeof this.getCookies == "function" ? (o = this.getCookies()) == null ? void 0 : o.lg : null) || Y.get("lg");
      return t ? ((a = this == null ? void 0 : this.$store) != null && a.commit && this.$store.commit("updateLang", t), t) : "en";
    }
  }
}, as = {
  data() {
    var t, e, n;
    return {
      fileContent: null,
      source: null,
      _sourceFilePath: null,
      protected_: null,
      // undefined follows descriptor/prop configuration; null explicitly disables.
      wbCode_: ((e = (t = this.item) == null ? void 0 : t.options) == null ? void 0 : e.wbCode) ?? this.wbCode ?? null,
      // Clicks override the value-derived open state until the next
      // configuration or runtime write.
      wbCodeOpen_: null,
      wbCodeFile_: this.wbCodeFile != null ? this.wbCodeFile : null,
      wbCodeFileOpen_: null,
      wbDataViewer_: this.wbDataViewer != null ? this.wbDataViewer : null,
      props_: this.props || ((n = this == null ? void 0 : this.$route) == null ? void 0 : n.params),
      wiki_: null,
      main: null,
      internalValue: null,
      internalValueIsValid: null,
      load_: this == null ? void 0 : this.load,
      float_: null,
      hide_: null,
      close_: null,
      focus_: null,
      drag_: null,
      focusOn_: null,
      menu: !1,
      switch: !1,
      wbcItem: null,
      compMedia: null,
      mediaData: null,
      codeMirroMode: "text/html",
      media: null,
      item_: {},
      // Plan row 24 — per-instance open state for the Vuetify activator-slot menu,
      // bound to VMenu's `modelValue`. Replaces a dead `$refs.menuHtml.isActive`
      // read, which is a Vuetify 2 API that Vuetify 3 does not expose. Deliberately
      // NOT stored on the descriptor: rows 22/23 established that per-instance state
      // on shared input is what causes the update loop.
      menuOpen_: !1,
      _originalItem: null,
      watch_: [],
      rColor: null,
      mainItemTextArea: {
        class: "white",
        label: "Object/array to parse",
        rules: [],
        key: "main-item"
      },
      draggable: !1,
      dragStartX: 0,
      dragStartY: 0,
      offsetX: 0,
      offsetY: 0,
      alertObjs: [],
      children_: null,
      extKey_: this.extKey,
      key_: 0,
      wrap_: null,
      data: null,
      select: !1,
      itemListeners: {},
      attrs: {},
      dive: !1,
      nameEl: null,
      AsyncComponent: null,
      isComponentLoaded: !1,
      refName: null,
      global_: this.global,
      _jsLazyComp: null,
      _jsLazyLoading: !1
    };
  }
}, cs = {
  watch: {
    // PERF-4 FIX: Batch syncVNodes calls to prevent excessive updates.
    // Initial sync happens in render() rather than immediately.
    // $_syncPending flag batches multiple watcher triggers into a single call.
    resolvedWbCode: {
      handler() {
        this.wbCodeOpen_ = null, this._scheduleSyncVNodes();
      },
      deep: !0
    },
    configuredWbCode: {
      handler(t) {
        this.wbCode_ = t, this.wbCodeOpen_ = null;
      },
      // Only the code configuration is traversed, never the whole item.
      deep: !0
    },
    configuredWbCodeFile: {
      handler(t) {
        this.wbCodeFile_ = t, this.wbCodeFileOpen_ = null;
      },
      deep: !0
    },
    wbCode_: {
      handler() {
        this.wbCodeOpen_ = null, this._scheduleSyncVNodes();
      },
      deep: !0
    },
    wbCodeFile_: {
      handler() {
        this.wbCodeFileOpen_ = null, this._scheduleSyncVNodes();
      },
      deep: !0
    },
    resolvedWbCodeFile: {
      handler() {
        this._scheduleSyncVNodes();
      }
    },
    resolvedWbDataViewer: {
      handler() {
        this._scheduleSyncVNodes();
      }
    },
    item: {
      handler(t) {
        var e, n;
        this.item_ = t, this.wbCode_ = ((e = t == null ? void 0 : t.options) == null ? void 0 : e.wbCode) ?? this.wbCode ?? null, this.wbCodeFile_ = ((n = t == null ? void 0 : t.options) == null ? void 0 : n.wbCodeFile) ?? this.wbCodeFile ?? null, this.dive && (this._preDiveItem = this.clone(this.item_), this.item_ = this.generalVal(
          this.item_,
          this.itemAccessibility,
          this.lang
        )), this._scheduleSyncVNodes();
      },
      // WBC descriptors are frequently rebuilt by reactive consumers
      // such as WBCode. A deep watch traverses listener functions and
      // nested options, then observes WBC's own normalization writes as
      // input changes, producing render -> watcher -> render loops.
      // Consumers replace the top-level item when they change it, so a
      // shallow watcher is sufficient and avoids self-triggering.
      deep: !1
    },
    "item_.options.val"(t) {
      this.internalValue = t;
    },
    internalValue(t) {
      var e;
      if ((e = this == null ? void 0 : this.item_) != null && e.options) {
        if (!ee(this.item_)) {
          if (t === void 0 && !("val" in this.item_.options) || !this.$_wbcValueEdited && !("val" in this.item_.options)) return;
          this.item_.options.val = t;
        }
      } else
        this.item_ = t;
    },
    // Plan row 23 — the per-instance validity contract.
    //
    // Validity used to be published ONLY by writing `options.isValid` onto the caller's
    // descriptor in updated(). That cannot be correct: a descriptor is shared input, and
    // validity is per-instance output. Two <WBC> instances over one descriptor fought
    // over the field (row 22's loop), and writing it through toRaw() to stop the fight
    // left reactive host bindings permanently stale.
    //
    // An event has neither problem — it is per-instance by construction and reactive by
    // construction. A watcher rather than an emit at the assignment site, so every path
    // that changes validity publishes it, not just renderObject's onInput handler.
    internalValueIsValid(t) {
      var e;
      this.$emit("update:isValid", t), this.item_ instanceof Object && ((e = this.item_) != null && e.options) && (ee(this.item_) || (he(this.item_).options.isValid = t));
    },
    // Plan row 62 — the HOST half of "an initial value is only a starting value", and why
    // it needs NO new machinery. Binding the control to `internalValue` could have made the
    // binding one-way: a host that rebuilds its descriptor with a new value — `wb-press`
    // `createAppShell.js:730`, a `VSelect` whose `modelValue: current` follows the route —
    // would be ignored while the instance kept its own older value.
    //
    // It is not, and the path is worth naming because it is not obvious. Replacing the
    // descriptor moves `item_.options.val` from whatever the last edit published back to
    // `undefined`; the watcher above resets `internalValue` with it; and `renderObject`
    // treats `undefined` as "this instance has no value yet" and renders the author's new
    // literal. A dedicated `item_.options.props.modelValue` watcher was written for this and
    // then REMOVED: every path it could serve was already covered, and it survived its
    // mutation test — dead code that only looks load-bearing. Two cases in
    // `tests/initialValueStarting.test.js` pin the behaviour so the next reader does not
    // have to rediscover the mechanism.
    "item_.options.props.value"(t) {
      var e, n, r, i;
      ((r = (n = (e = this == null ? void 0 : this.item_) == null ? void 0 : e.options) == null ? void 0 : n.props) == null ? void 0 : r.modelValue) === void 0 && t !== this.internalValue && (this.internalValue = t, (i = this == null ? void 0 : this.item_) != null && i.options && (ee(this.item_) || (this.item_.options.val = t)));
    },
    "$store.state.lg"(t, e) {
      Y.set("lg", t, { path: "/" }), this.dive && this._preDiveItem && (this.item_ = this.generalVal(
        this.clone(this._preDiveItem),
        this.itemAccessibility,
        t
      )), this.key_ += 1;
    }
  }
}, Z = "external", Dt = "authored", us = /* @__PURE__ */ new Set([Z, Dt]), Ke = /* @__PURE__ */ new Set();
function It(t, e, n = console.warn) {
  Ke.has(t) || (Ke.add(t), typeof n == "function" && n(e));
}
function Pt(t, e) {
  var i, o;
  const n = ((o = (i = t == null ? void 0 : t.$) == null ? void 0 : i.vnode) == null ? void 0 : o.props) || {}, r = e.replace(/[A-Z]/g, (a) => "-" + a.toLowerCase());
  return Object.prototype.hasOwnProperty.call(n, e) || Object.prototype.hasOwnProperty.call(n, r);
}
function Je(t, e = console.warn) {
  return t === Dt || t === Z ? t : (t != null && It(
    `invalid:${t}`,
    `[WBC] Invalid contentTrust="${t}". Expected "external" or "authored"; using "external".`,
    e
  ), Z);
}
function Jn({
  contentTrust: t,
  untrusted: e,
  inheritedContentTrust: n,
  inheritedUntrusted: r,
  hasContentTrust: i = !1,
  hasUntrusted: o = !1,
  dev: a = !1,
  warn: s = console.warn
} = {}) {
  const l = n != null ? Je(n, s) : r === !0 ? Z : null, c = Je(t, s), p = e === !0 ? Z : Dt;
  if (i && o && p !== c) {
    const u = `[WBC] contentTrust="${c}" conflicts with deprecated untrusted=${e}; using "external" for this subtree.`;
    if (a) throw new Error(u);
    return It(`conflict:${c}:${e}`, u, s), Z;
  }
  let f = i ? c : o ? p : l || Z;
  return o && It(
    `alias:${e}`,
    `[WBC] The untrusted prop is deprecated for one release; use contentTrust="${p}" instead.`,
    s
  ), l === Z && f === Dt && (It(
    "blocked-upgrade",
    '[WBC] An external contentTrust boundary cannot be upgraded to "authored" by a descendant; using "external".',
    s
  ), f = Z), us.has(f) ? f : Z;
}
const te = {
  name: "WBLink",
  inheritAttrs: !1,
  inject: {
    // Inherit an ancestor's "untrusted" verdict from the WBC/WBHtml subtree.
    // When set, route registration (name__ routes, file-ref routes, __defineRoute,
    // options.route self-registration) is blocked — untrusted content cannot create
    // persistent named vue-router routes. See registerWbcRoute.resolveWbLinkTarget.
    wbcUntrustedInjected: { default: !1 },
    wbcContentTrustInjected: { default: null }
  },
  // Re-provide so nested WBLink instances (e.g. links inside rendered html)
  // also inherit the untrusted flag — the verdict cascades through the subtree.
  provide() {
    const t = this.wbcContentTrustInjected === Z || this.wbcUntrustedInjected === !0;
    return {
      wbcContentTrustInjected: t ? Z : this.wbcContentTrustInjected,
      wbcUntrustedInjected: t
    };
  },
  props: {
    to: {},
    html: "",
    style_: {},
    attrs_: {},
    inactiveClass: String
  },
  data() {
    return {
      // Resolved vue-router location when `to` points at a route (a `./`/`../`
      // file ref → auto-registered WBC route, an existing named route like
      // "AboutView", a route path like "/about", or a route-definition object).
      // null → render a plain <a> (external URL / in-page anchor / unknown).
      routeLoc: null
    };
  },
  created() {
    this.resolveTarget();
  },
  mounted() {
    this.routeLoc || this.resolveTarget();
  },
  watch: {
    // Links rarely change target, but stay correct if `to` is reassigned.
    to() {
      this.routeLoc = null, this.resolveTarget();
    }
  },
  methods: {
    // Register-off-render (spec §7): resolve `to` once into a route location or
    // an external link. Any failure (no router, bad def) is swallowed so the
    // link still renders as a plain <a>.
    resolveTarget() {
      var t;
      try {
        const e = this.wbcContentTrustInjected === Z || this.wbcUntrustedInjected === !0, r = this.$route && this.$route.matched && this.$route.matched.length > 0 ? this.$route.path : typeof window < "u" ? window.location.pathname : (t = this.$route) == null ? void 0 : t.path, i = qo(this.$router, this.to, r, e);
        this.routeLoc = i.kind === "route" ? i.location : null;
      } catch (e) {
        console.error(`#WBLinkRouteError: ${e.message}`), this.routeLoc = null;
      }
    }
  },
  render() {
    if (this.routeLoc)
      return I(
        "RouterLink",
        {
          ...this.attrs_,
          class: this.$attrs.class || void 0,
          to: this.routeLoc,
          style: { "text-decoration": "none", ...this.style_ }
        },
        { default: () => [this.html] }
      );
    const t = typeof this.to == "string" ? this.to.trim() : this.to;
    let e = {
      class: this.$attrs.class || void 0,
      style: { "text-decoration": "none", ...this.style_ },
      href: t,
      ...this.attrs_
    };
    return typeof t == "string" && t[t.length - 1] === ">" && (e.href = t.slice(0, -1), e.target = "_blank"), typeof this.html == "object" ? K("a", e, [this == null ? void 0 : this.html]) : !this.to || !this.html ? (e.class = this.$attrs.class || void 0, K("span", e, this == null ? void 0 : this.html)) : (e = {
      class: this.$attrs.class || void 0,
      style: { "text-decoration": "none", ...this.style_ },
      innerHTML: kn([this == null ? void 0 : this.html].join("")),
      href: t,
      ...this.attrs_
    }, K("a", e));
  },
  components: {}
}, Hn = (t) => t && (t.default || t), ls = Hn(zt), Rt = Hn(Wt);
Wt.permalink && !Rt.permalink && (Rt.permalink = Wt.permalink);
const pt = "", ds = new RegExp(pt + "([A-Za-z0-9+/=]*)" + pt, "g"), ps = !1, ve = {
  name: "WBHtml",
  props: {
    /**
     * HTML content to render. Supports WBC's custom markup syntax including
     * [[component|styles|link]] patterns, {{wrapper}}content{{/wrapper}} syntax,
     * multilingual objects, and markdown. Can be a string, object, or array.
     * @type {string|object|array}
     * @default null
     */
    html: null,
    contentTrust: {
      type: String,
      default: "external"
    },
    untrusted: {
      type: Boolean,
      default: !1
    }
  },
  // --- Eval trust boundary (security) ---
  // Inherit the ancestor WBC/WBHtml trust verdict and re-provide it, so nested
  // WBC/WBHtml/WBLink instances cannot upgrade an external subtree.
  inject: {
    wbcUntrustedInjected: { default: !1 },
    wbcContentTrustInjected: { default: null }
  },
  provide() {
    const t = this.resolvedContentTrust();
    return {
      wbcContentTrustInjected: t,
      wbcUntrustedInjected: t === Z
    };
  },
  data() {
    return {
      viewMeta: null,
      html_: this.html || "",
      MarkdownIt: new ls({
        html: !0,
        linkify: !0,
        typographer: !0,
        breaks: !1
      }).use(Rt, {
        permalink: Rt.permalink.headerLink({
          safariReaderFix: !0
        }),
        slugify: (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      })
    };
  },
  render() {
    let t = this.mainRender(this.html_);
    return typeof t == "string" ? K("span", { key: `${this.html_}` }, t) : Array.isArray(t) ? K("span", { key: `${this.html_}` }, [t]) : this.mainRender(this.html_);
  },
  methods: {
    mainRender(t) {
      try {
        return this._mainRender(t);
      } catch (e) {
        const n = typeof t == "string" ? t : JSON.stringify(t);
        console.error(`-WBHtml Error-:
[message]:${e.message}
[error]:${e}
[html]:${n}`);
        const r = n.length > 80 ? n.slice(0, 80) + "…" : n;
        return K("div", {
          style: {
            padding: "10px",
            margin: "10px",
            border: "1px solid #ff5252",
            borderRadius: "4px",
            backgroundColor: "#fff1f1",
            color: "#c62828",
            fontFamily: "sans-serif",
            fontSize: "13px"
          }
        }, [
          K("div", { style: { fontWeight: "bold", marginBottom: "5px" } }, `#WBHtmlError: ${e.message}`),
          K("div", { style: { fontSize: "12px", opacity: 0.85, marginTop: "4px", wordBreak: "break-all" } }, `Source: ${r}`)
        ]);
      }
    },
    _mainRender(t) {
      var o, a, s, l;
      const e = this._parsePipeForm(t);
      if (e) return I("WBC", { item: e });
      const n = this._parseEmbedForm(t);
      if (n) return I("WBC", { item: n });
      let r = this.objLang(t, (a = (o = this == null ? void 0 : this.$store) == null ? void 0 : o.state) == null ? void 0 : a.lg), i = this.styling(r);
      if (i) {
        if (["string", "number", "boolean"].includes(typeof i))
          return K("span", {
            innerHTML: this.sanitizeHtml(this.strToObj(i))
          });
        if (Array.isArray(i)) {
          let c = [];
          return i.forEach((p) => {
            var y, C, w, v, $, E;
            let f = [];
            for (let k of (p == null ? void 0 : p[1]) || []) {
              let T, V, W = typeof k == "string" ? null : this.strToObj(k == null ? void 0 : k[2]), x = typeof k == "string" ? k : k[0], A;
              if (k[0].trimStart().startsWith("~"))
                A = "WBC", x = k[0];
              else if (k[0].includes("__")) {
                let S = k[0].split("__")[0];
                /^[a-zA-Z][a-zA-Z0-9-]*$/.test(S.trim()) ? (A = S, x = k[0].split("__").slice(1).join("__")) : x = k[0];
              }
              if (A && (A = A.trim()), A && A !== "WBC" && A !== "MD" && !/^[a-zA-Z][a-zA-Z0-9-]*$/.test(A))
                throw new Error(`Bad tag "${A}"`);
              if (typeof k == "string" ? (V = {}, T = {}) : k != null && k[1] && ((y = k == null ? void 0 : k[1]) != null && y.includes("__")) ? (V = this.strToObj((C = k[1].split("__")) == null ? void 0 : C[0]), T = this.strToObj(k[1].split("__").slice(1).join("__"))) : (V = {}, T = this.strToObj((k == null ? void 0 : k[1]) || {})), typeof T == "string" && (T = { class: T }), typeof V == "string" && (V = { class: V }), A && !Object.keys(V || {}).length && T && Object.keys(T).length && (V = { ...T }, T = null), ["", "null", "undefined"].includes(typeof k == "string" ? k : k[0]))
                return K("div", {}, ["null"]);
              {
                let S;
                if (typeof x == "string" && (x != null && x.startsWith("./")) ? A = "WBC" : A == "MD" && typeof x == "string" && (x = this.MarkdownIt.render(x)), this.isNonEmpty(W) ? S = I("WBLink", {
                  ...A == "MD" ? {
                    ...T,
                    class: "markdown-body " + ((T == null ? void 0 : T.class) || "")
                  } : T,
                  to: this.strToObj(k[2]),
                  html: x,
                  style_: {},
                  attrs_: {}
                }) : A == "WBC" || (T || !A ? S = K("span", {
                  ...T,
                  innerHTML: this.sanitizeHtml(this.objLang(
                    this.strToObj(x),
                    (v = (w = this == null ? void 0 : this.$store) == null ? void 0 : w.state) == null ? void 0 : v.lg
                  ))
                }) : S = this.objLang(
                  this.strToObj(x),
                  (E = ($ = this == null ? void 0 : this.$store) == null ? void 0 : $.state) == null ? void 0 : E.lg
                )), A)
                  if (A == "tex" || A == "latex" || `${A}`.toLowerCase() == "latex") {
                    let L;
                    A == "tex" ? L = [
                      I("WBLatex", {
                        ...T,
                        expression: x
                      })
                    ] : L = this.parseTexFile(x || "").map((P) => {
                      if (P.type === "text")
                        return K("div", [
                          I("WBHtml", {
                            html: P.content + " "
                          })
                        ]);
                      if (P.type === "math")
                        return I("WBLatex", {
                          expression: P.expression,
                          "display-mode": P.displayMode ?? !1
                        });
                      if (P.type === "mixed")
                        return K(
                          "div",
                          { class: "d-inline-flex align-center" },
                          P.lineContent.map((X) => X.expression ? I("WBLatex", {
                            expression: X.expression,
                            "display-mode": !1
                          }) : I("WBHtml", {
                            html: " " + X.content + " "
                          }))
                        );
                    });
                    let D = K(
                      "span",
                      {
                        ...V
                      },
                      L
                    );
                    this.isNonEmpty(W) && (D = I("WBLink", {
                      to: this.strToObj(k[2]),
                      html: D,
                      style_: {},
                      attrs_: {}
                    })), f.push(D);
                  } else if (A == "WBC") {
                    const L = x.trimStart().startsWith("~") ? x.trimStart().slice(1) : x;
                    let D = this.strToObj(L);
                    f.push(
                      I("WBC", {
                        item: D
                      })
                    );
                  } else x.startsWith("~") ? f.push(
                    I(A, this.strToObj(x.slice(1)))
                  ) : f.push(
                    I(
                      A == "MD" ? "div" : this.charCoding(A, [
                        ["&vert;", "\\|"],
                        ["&#95;&#95;", "__"],
                        ["\\", ""],
                        ["&lbrack;", "["],
                        ["&rbrack;", "]"],
                        ["&lbrace;", "{"],
                        ["&rbrace;", "}"],
                        ["&lpar;", "("],
                        ["&rpar;", ")"],
                        ["&lt;", "<"],
                        ["&gt;", ">"]
                      ]),
                      {
                        ...A == "MD" ? {
                          ...T,
                          class: "markdown-body " + ((T == null ? void 0 : T.class) || "")
                        } : {},
                        ...V
                      },
                      [S]
                    )
                  );
                else
                  f.push(S);
              }
            }
            let u = "span", d = {}, m = null;
            if (typeof p[0] == "string" && ([u, d, m] = p[0].split("|")), typeof u == "string" && (u = u.trim()), u && u !== "WBC" && u !== "MD" && !/^[a-zA-Z][a-zA-Z0-9-]*$/.test(u))
              throw new Error(`Bad tag "${u}"`);
            let b = this.strToObj(d);
            typeof b == "string" && (b = {
              class: b
            }), m && (f = I("WBLink", {
              to: this.strToObj(m),
              html: f,
              style_: {},
              attrs_: {}
            }));
            let g = I(u, { ...b }, [f]);
            c.push(g);
          }), c;
        } else if (typeof i == "object") {
          let c = this.objLang(i, (l = (s = this == null ? void 0 : this.$store) == null ? void 0 : s.state) == null ? void 0 : l.lg);
          return this.mainRender(this.styling(c));
        }
      } else return null;
    },
    styling(t) {
      let e = t;
      return typeof t != "string" ? `${JSON.stringify(t)}` : (typeof t == "string" && t.indexOf("[[") == 0 && (t = "{{span}}" + t), typeof t == "string" && t.indexOf("[[") != 0 && !t.startsWith("{{") && t.slice(-2) !== "]]" && (t = "{{span}}[[" + t + "]]"), typeof t == "string" && (t.includes("[[") || t.includes("]]") || t.includes("|") || t.includes("{{") || t.includes("}}")) && (t[0] != "{" || t[t.length - 1] != "}") && (e = t.split("{{").filter((n) => !!n).map(
        (n) => n.split("}}").map((r) => r.includes("[[") || r.includes("]]") ? r.replace(/\[\[/g, "**").replace(/\]\]/g, "**").split("**").filter((i) => !!i).map((i) => i.split("|")) : r)
      )), this.strToObj(e));
    },
    // A vertical bar in ordinary markdown text is not the pipe separator. The whole page string is
    // wrapped in `{{span}}[[ … ]]` and split on `|` into wrapTag|wrapOptions|wrapLink, so ONE bar
    // between two code spans (`"external"` | `"authored"`), or an escaped bar in a table cell,
    // used to hand the rest of the page to wrapOptions and lose it (plan row 44: the changelog
    // lost 8 of 11 headings; latex and chart `/api` lost a section). The shorthand grammar is
    // whitespace-tight (`li__hello|blue|link`), so a bar with whitespace on BOTH sides is prose.
    // Bars inside `[[ … ]]` blocks are left alone: the legacy link syntax writes `[[ text | class | to ]]`.
    protectProseBars(t) {
      return typeof t != "string" || t.indexOf("|") === -1 ? t : t.split(/(\[\[[\s\S]*?\]\])/).map((e, n) => n % 2 ? e : e.replace(/(\s)\|(?=\s)/g, "$1&vert;")).join("");
    },
    // `<p>…</p>` → `<p>[[…]]</p>` for paragraphs whose content uses WBC syntax (pipes, `__`,
    // `~`, braces, `**`, a protected payload, or a component / WBC tag token); plain paragraphs
    // are left untouched (see the call site in created()).
    wrapWbcParagraphs(t) {
      if (typeof t != "string") return t;
      const e = new RegExp("[|~{}" + pt + "]|__|\\*\\*|<~|<[A-Z]|<[A-Za-z][\\w.-]*,");
      return t.replace(/<p>([\s\S]*?)<\/p>/g, (n, r) => e.test(r) ? "<p>[[" + r + "]]</p>" : n);
    },
    charCoding(t, e) {
      return typeof t != "string" || e.forEach((n) => {
        const [r, i] = n;
        t = t.split(r).join(i);
      }), t;
    },
    // Verbatim/raw-text regions (code-display panels, <script>/<style> examples, and the
    // copy-button's data-clipboard-text attribute) often contain WBC syntax being *documented*
    // — literal [[ ]] {{ }} __ | sequences. Those must NOT drive WBC's markup tokenization,
    // or the bracket/`**` pairing in styling() mis-aligns and a chunk of surrounding HTML is
    // parsed as a tag ("Bad tag"). Encode ONLY the tokenizer's marker *sequences* to entities:
    // they render as the exact same glyphs but are inert to the tokenizer. Single { [ _ are
    // left intact so real CSS/code (and legit single-char content) is untouched.
    // `*` is encoded too: styling() converts [[ ]] → `**` and SPLITS on `**`, so a literal
    // `**` in a fence (e.g. a glob `'./content/**/*.md'`) injects a phantom split boundary
    // that mis-pairs the surrounding brackets and truncates the block. `&#42;` renders as the
    // exact same glyph but carries no `**` for the splitter to trip on.
    protectCodeRegions(t) {
      if (typeof t != "string" || t.indexOf("<") === -1) return t;
      const e = (n) => n.split("[[").join("&lbrack;&lbrack;").split("]]").join("&rbrack;&rbrack;").split("{{").join("&lbrace;&lbrace;").split("}}").join("&rbrace;&rbrace;").split("__").join("&#95;&#95;").split("*").join("&#42;").split("|").join("&vert;");
      return t.replace(/<(pre|code|script|style|textarea)\b[\s\S]*?<\/\1>/gi, e).replace(/data-clipboard-text="[^"]*"/gi, e);
    },
    // ── WBC / general-component PAYLOAD protection ──────────────────────────────────
    // A WBC alias (`~{…}` / `~[…]`) or component-object payload (`WBC__{…}`, `Comp__~{…}`)
    // is an arbitrary JS object/array literal. Its braces, brackets, pipes and quotes collide
    // head-on with the WBC tokenizer (styling() splits on `{{` `}}` `[[` `]]` `|`; created()'s
    // charCoding rewrites `}}}`→`} }}` etc.) AND, for the bare (non-comment) form, markdown-it
    // has already smart-quoted (`'`→`’`) and HTML-escaped (`"`→`&quot;`) the source. Either way a
    // deeply-nested payload (`…{c13:{c131:131}}}}`) is shredded before strToObj ever sees it.
    //
    // Fix: lift each payload OUT of the tokenizer's reach. Balanced-scan the literal, normalize
    // its quotes back to straight ASCII, base64-encode it (base64's alphabet shares no character
    // with any tokenizer marker), and leave `MARK<base64>MARK` in its place. The `~`/`WBC__`/`__`
    // prefix is preserved so existing routing still recognises the block; the inert blob is then
    // decoded back to source at the strToObj parse boundary (and in display paths, as a fallback).
    protectWbcPayloads(t) {
      if (typeof t != "string") return t;
      const e = /(?:~|WBC__)(\{|\[)/g;
      let n = "", r = 0, i;
      for (; i = e.exec(t); ) {
        const o = i.index + i[0].length - 1, a = this._scanBalancedPayload(t, o);
        if (a === -1) continue;
        const s = this._normalizePayloadQuotes(t.slice(o, a));
        n += t.slice(r, o) + pt + this._encodePayload(s) + pt, r = a, e.lastIndex = a;
      }
      return r === 0 ? t : n + t.slice(r);
    },
    // Decode any `MARK<base64>MARK` blobs back to their raw payload source.
    unprotectWbcPayloads(t) {
      return typeof t != "string" || t.indexOf(pt) === -1 ? t : t.replace(ds, (e, n) => this._decodePayload(n));
    },
    // Balanced scan from an opening `{`/`[`, returning the index AFTER its matching close (or -1).
    // String literals (incl. markdown-it's curly-quote pairs) are skipped so braces inside strings
    // never throw off the depth count.
    _scanBalancedPayload(t, e) {
      const n = { "'": "'", '"': '"', "`": "`", "‘": "’", "“": "”" };
      let r = 0, i = null;
      for (let o = e; o < t.length; o++) {
        const a = t[o];
        if (i) {
          if (a === "\\") {
            o++;
            continue;
          }
          a === i && (i = null);
          continue;
        }
        if (n[a]) {
          i = n[a];
          continue;
        }
        if (a === "{" || a === "[") r++;
        else if ((a === "}" || a === "]") && --r === 0)
          return o + 1;
      }
      return -1;
    },
    // Reverse markdown-it's typographic + HTML-entity mangling so the lifted payload is valid JS.
    _normalizePayloadQuotes(t) {
      return t.replace(/[‘’‚‛]/g, "'").replace(/[“”„‟]/g, '"').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#0*39;/g, "'").replace(/&#x0*27;/gi, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    },
    _encodePayload(t) {
      try {
        return btoa(unescape(encodeURIComponent(t)));
      } catch {
        try {
          return btoa(t);
        } catch {
          return t;
        }
      }
    },
    _decodePayload(t) {
      try {
        return decodeURIComponent(escape(atob(t)));
      } catch {
        try {
          return atob(t);
        } catch {
          return t;
        }
      }
    },
    // ── Dev-only shorthand explainer ───────────────────────────────────────────
    // Exposes the WBC item a shorthand string compiles to, for debugging. Only
    // available in dev builds (__WBC_DEV__). Returns null when the input is not a
    // pipe-form shorthand (legacy string markup returns null — use the component's
    // own render output to debug that path).
    explainShorthand(t) {
      return null;
    },
    // ── Pipe-form parser (internal) ────────────────────────────────────────────
    // Parses a pipe-delimited shorthand string into the WBC item it would produce.
    // Returns the compiled item (object/array) when the input matches the pipe form,
    // or null when the input is legacy string markup (falls through to styling()).
    // Throws descriptive errors on malformed input when `opts.diagnostics` is true.
    //
    // Split on ROOT-level pipes only. Pipes inside the content's array/object literal
    // (or inside quotes) belong to the inner items' own `text|class|link` markup and
    // MUST be preserved — e.g. VTabs__['44444|blue|link', …]|red__pink|HomeView has 3
    // root segments, not 5. Walk left→right tracking [ ] { } ( ) depth + quote state.
    _splitTopLevel(t, e) {
      const n = [];
      let r = 0, i = null, o = "";
      for (let a = 0; a < t.length; a++) {
        const s = t[a];
        if (i)
          o += s, s === i && t[a - 1] !== "\\" && (i = null);
        else if (s === "'" || s === '"' || s === "`")
          i = s, o += s;
        else if (s === "[" || s === "{" || s === "(")
          r++, o += s;
        else if (s === "]" || s === "}" || s === ")")
          r--, o += s;
        else if (s === "|" && r === 0) {
          if (o === "" && n.length === 0 && e != null && e.diagnostics)
            throw new Error("Pipe form segment 0 is empty");
          n.push(o), o = "";
        } else
          o += s;
      }
      if (o === "" && n.length > 0 && e != null && e.diagnostics)
        throw new Error("Pipe form ends with an empty segment");
      return n.push(o), n;
    },
    _parseEmbedForm(t) {
      if (typeof t != "string") return null;
      const e = t.match(/^\s*~([A-Z][A-Za-z0-9]*|[a-z][a-z0-9]*(?:-[a-z0-9]+)+)\|(\{[\s\S]*?\})(?:\|([^|]*))?\s*$/);
      if (!e) return null;
      let n;
      try {
        n = JSON.parse(e[2]);
      } catch {
        return null;
      }
      if (!n || typeof n != "object" || Array.isArray(n)) return null;
      const r = e[3] === void 0 ? "" : e[3].trim();
      return { comp: e[1], options: { ...n, ...r ? { html: r } : {} } };
    },
    _parsePipeForm(t, e) {
      if (typeof t != "string" || !t.includes("|")) return null;
      const n = (e == null ? void 0 : e.diagnostics) === !0, r = this._splitTopLevel(t, e);
      if (r.length < 1) return null;
      let i = null, o = r[0];
      if (r[0].includes("__")) {
        const y = r[0].indexOf("__"), C = r[0].slice(0, y).trim();
        /^[a-zA-Z][a-zA-Z0-9-]*$/.test(C) && (i = C, o = r[0].slice(y + 2));
      }
      if (o.trimStart().startsWith("[[")) return null;
      const a = this.strToObj(o);
      if (!a || typeof a != "object") return null;
      if (n) {
        if (r.length > 1 && r[1] !== "" && this.strToObj(r[1]) === void 0)
          throw new Error(`Pipe segment 1 didn't parse as a WBC style/options: "${r[1]}"`);
        if (r.length > 2) {
          const y = r.slice(2).join("|");
          if (y && this.strToObj(y) === void 0)
            throw new Error(`Pipe segment 2 (link) didn't parse: "${y}"`);
        }
      }
      const s = Array.isArray(a), l = s ? [] : Object.keys(a), c = s || l.length > 0 && l.every((y) => /^\d+$/.test(y)), p = (y, C) => {
        const w = C === void 0 || C === "" ? void 0 : this.strToObj(C);
        return w && typeof w == "object" && !Array.isArray(w) ? Object.assign(y, w) : this.isNonEmpty(w) && (y.class = w), y;
      }, f = r.length > 1 ? r[1] : "";
      let u = f, d = "";
      if (f.includes("__")) {
        const y = f.indexOf("__");
        u = f.slice(0, y), d = f.slice(y + 2);
      }
      const m = r.length > 2 ? r.slice(2).join("|") : "", b = m ? this.strToObj(m) : void 0;
      if (c) {
        let y = s ? a.slice() : l.sort((v, $) => v - $).map((v) => a[v]);
        const C = d && d.trim() ? d : "";
        C && (y = y.map(
          (v) => tt(v) ? v : { options: p({ html: v }, C) }
        ));
        let w = y;
        return i && (w = ["<~" + i + "," + (u || "") + (this.isNonEmpty(b) ? "," + m : "") + ">", ...y]), w;
      }
      let g;
      if (i)
        g = {
          comp: i,
          options: {
            ...p({}, u),
            html: { a, options: p({}, d) }
          }
        }, this.isNonEmpty(b) && (g.options.to = b);
      else {
        const y = p({ html: a }, r.length > 1 ? r[1] : void 0);
        this.isNonEmpty(b) && (y.to = b), g = { options: y };
      }
      return g;
    },
    ...Object.fromEntries(
      Object.entries(Yt).filter(
        ([t, e]) => typeof e == "function"
      )
    ),
    resolvedContentTrust() {
      return Jn({
        contentTrust: this.contentTrust,
        untrusted: this.untrusted,
        inheritedContentTrust: this.wbcContentTrustInjected,
        inheritedUntrusted: this.wbcUntrustedInjected,
        hasContentTrust: Pt(this, "contentTrust"),
        hasUntrusted: Pt(this, "untrusted"),
        dev: ps
      });
    },
    // Trust-aware override of the spread `strToObj` (defined AFTER the spread so it wins).
    // Forces the AST sandbox for external subtrees.
    strToObj(t, e) {
      return typeof t == "string" && t.indexOf(pt) !== -1 && (t = this.unprotectWbcPayloads(t)), yt(t, {
        trusted: this.resolvedContentTrust() !== Z,
        ...e || {}
      });
    }
  },
  components: {
    // `JsonViewer` is NOT listed here, but it is no longer dropped: since 2026-09-29
    // (plan_wb-press_20260929 row 17) `extended_install.js` registers the bundled
    // `vue3-json-viewer` APP-WIDE, which reverses the earlier "DROPPED per ADR-001 —
    // hosts inject via options.plugins if needed" note. A global registration is what
    // the render paths need (`renderString.js` / `renderFile.js` resolve the name off
    // `appContext.components`), so a local entry here would only shadow a host's
    // override.
    WBLink: te
  },
  created() {
    typeof this.html_ == "string" && (this.html_ = this.html_.replace(
      /<!--\s*(\[\[[\s\S]*?\]\])\s*-->/g,
      "$1"
    )), this.html_ = this.protectCodeRegions(this.html_), this.html_ = this.protectWbcPayloads(this.html_), this.html_ = this.protectProseBars(this.html_), this.html_ = this.wrapWbcParagraphs(this.html_), this.html_ = this.charCoding(this.html_, [
      ["\\|", "&vert;"],
      ["\\__", "&#95;&#95;"],
      ["\\{", "&lbrace;"],
      ["\\}", "&rbrace;"],
      ["\\[", "&lbrack;"],
      ["\\]", "&rbrack;"],
      ["\\(", "&lpar;"],
      ["\\)", "&rpar;"],
      ["\\<", "&lt;"],
      ["\\>", "&gt;"],
      ["-->", ""],
      ["]]]", "] ]]"],
      ["[[[", "[[ ["],
      ["}}}", "} }}"],
      ["{{{", "{{ {"]
    ]);
  }
}, He = !1, Mt = {
  ...os,
  render() {
    var t, e, n, r, i, o, a, s, l, c, p, f, u, d, m, b, g, y, C, w, v, $, E, k, T, V;
    try {
      if (this.wiki && !this.wbcWikiObj)
        return I(
          "div",
          {
            style: {
              backgroundColor: "#F8F9FA",
              color: "red",
              width: "100%",
              height: "100%",
              margin: "10px"
            }
          },
          ['#WBCWikiObjMissing: "wbc-wiki-obj" not registered']
        );
      if (this.isEmpty(this.item_))
        return null;
      let W = {
        title: ((t = this.item_) == null ? void 0 : t.title) || ((e = this.$route) == null ? void 0 : e.name) || "-" + ((r = (n = this.$store) == null ? void 0 : n.state) == null ? void 0 : r.lg) || "en",
        ...((i = this == null ? void 0 : this.$route) == null ? void 0 : i.meta) || {},
        ...this.item_
      }, x = this.protected_ ? this.protected_ : this.protected ?? null, A = this.load_ ? this.load_ : this.load ?? null, S = this.float_ ? this.float_ : this.float ?? null, L = this.hide_ ? this.hide_ : this.hide ?? null, D = this.close_ ? this.close_ : this.close ?? null, P = this.drag_ ? this.drag_ : this.drag ?? null, X = this.focus_ ? this.focus_ : this.focus ?? null;
      if (this.focusOn_ = this.focusOn_ ? this.focusOn_ : this.focusOn ?? null, L === !0 || this.item_ instanceof Object && (typeof ((o = this.item_) == null ? void 0 : o.tracker) == "function" && this.item_.tracker(this.itemAccessibility), x = this.protected_ ? this.protected_ : ((s = (a = this.item_) == null ? void 0 : a.options) == null ? void 0 : s.protected_) ?? this.protected ?? null, A = this.load_ ? this.load_ : ((c = (l = this.item_) == null ? void 0 : l.options) == null ? void 0 : c.load) ?? this.load ?? null, S = this.float_ ? this.float_ : ((f = (p = this.item_) == null ? void 0 : p.options) == null ? void 0 : f.float) ?? this.float ?? null, L = this.hide_ ? this.hide_ : ((d = (u = this.item_) == null ? void 0 : u.options) == null ? void 0 : d.hide) ?? this.hide ?? null, D = this.close_ ? this.close_ : ((b = (m = this.item_) == null ? void 0 : m.options) == null ? void 0 : b.close) ?? this.close ?? null, P = this.drag_ ? this.drag_ : ((y = (g = this.item_) == null ? void 0 : g.options) == null ? void 0 : y.drag) ?? this.drag ?? null, X = this.focus_ ? this.focus_ : ((w = (C = this.item_) == null ? void 0 : C.options) == null ? void 0 : w.focus) ?? this.focus ?? null, this.focusOn_ = this.focusOn_ ? this.focusOn_ : (($ = (v = this.item_) == null ? void 0 : v.options) == null ? void 0 : $.focusOn) ?? this.focusOn ?? null, ["LImageOverlay", "LVideoOverlay", "LSVGOverlay"].includes(
        (E = this.item_) == null ? void 0 : E.comp
      ) && !this.mapReady) || L === !0)
        return null;
      let R;
      if (x) {
        const ht = { en: "Forbidden access", fr: "Accès interdit", ar: "الوصول ممنوع" };
        let _;
        if (typeof x == "object" && x !== null) {
          _ = {};
          for (const [j, B] of Object.entries(x))
            j === "html" || j === "text" || j === "title" ? _[j] = typeof B == "object" ? et(B, this.lang) : B : _[j] = B;
        } else typeof x == "string" ? _ = x : _ = et(ht, this.lang);
        let O = {
          comp: "VAlert",
          options: {
            class: "red",
            variant: "outlined",
            ...typeof x == "object" && x !== null ? _ : { html: _ }
          }
        };
        R = I("WBC", {
          key: `wbc-key-protected-${x}`,
          item: O
        });
      } else if (A === !0 || typeof A == "object" && (A == null ? void 0 : A.active) === !0 || typeof A == "string") {
        const ht = { en: "loading...", fr: "chargement...", ar: "تحميل..." };
        let _ = {
          comp: "VProgressCircular",
          options: {
            keyy: `load-${this.computedKey}`,
            hide: !1,
            size: "60",
            width: "3",
            color: "grey",
            indeterminate: !0,
            html: typeof A == "string" ? A : et(ht, this.lang),
            ...typeof ((k = this.load_) == null ? void 0 : k.options) == "object" ? (T = this.load_) == null ? void 0 : T.options : {}
          }
        };
        R = I("WBC", {
          key: `wbc-key-load-${A}`,
          item: [
            "<~VRow,pa-2 my-2 justify-center container>",
            _
          ]
        });
      } else
        R = this.toWBC_(this.item_, I, this.children_, this.wrap_) || {}, this.syncVNodes(I, R), R = Eo(this, I, R);
      return R = Me(this, I, R, { _float: S, _close: D, _drag: P, _focus: X }), R = Ao(this, I, R), R = To(this, I, R), R = vn(this, I, R), R = Lo(this, I, R, X), this.$_finalRender = R, this.updateContentRegistry(), R;
    } catch (W) {
      let x;
      try {
        x = typeof this.item_ == "string" ? this.item_ : (V = JSON.stringify(this.item_, (L, D) => typeof D == "function" ? "[fn]" : D)) == null ? void 0 : V.slice(0, 900);
      } catch {
        x = String(this.item_);
      }
      console.error(`-WBC Error-:
[message]:${W.message}
[error]:${W}
[stack]:${W.stack}
[item]:${x}`);
      const A = /not found/i.test(W.message || ""), S = typeof this.item_ == "string" ? this.item_ : null;
      return I("div", {
        style: {
          padding: "10px",
          margin: "10px",
          border: "1px solid #ff5252",
          borderRadius: "4px",
          backgroundColor: "#fff1f1",
          color: "#c62828",
          fontFamily: "sans-serif",
          fontSize: "13px"
        }
      }, [
        I("div", { style: { fontWeight: "bold", marginBottom: "5px" } }, `${W.message}`),
        ...A && S ? [I("div", { style: { fontSize: "12px", opacity: 0.85 } }, `Target not found: ${S}`)] : []
      ]);
    }
  },
  ...$n,
  ...as,
  ...ss,
  ...cs,
  inject: {
    wbcUntrustedInjected: { default: !1 },
    wbcContentTrustInjected: { default: null }
  },
  provide() {
    const t = this.resolvedContentTrust();
    return {
      wbcContentTrustInjected: t,
      wbcUntrustedInjected: t === Z
    };
  },
  methods: {
    countStr(t, e) {
      return (t.match(new RegExp(e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
    },
    ...$r,
    _scheduleSyncVNodes() {
      this.$_syncPending || (this.$_syncPending = !0, this.$nextTick(() => {
        this.$_syncPending = !1, this.$forceUpdate();
      }));
    },
    update(t) {
      typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? (this.item_ = null, this.$nextTick(() => {
        this.item_ = t;
      })) : this.item_ = t;
    },
    renderDefaultWbcode(t, e, n) {
      var o, a, s;
      let r = e;
      if (r != null && typeof r != "string")
        try {
          r = JSON.stringify(r, null, 2);
        } catch {
          r = String(r);
        }
      const i = ((s = (a = (o = this.$) == null ? void 0 : o.appContext) == null ? void 0 : a.components) == null ? void 0 : s.WBCode) || "WBCode";
      return (t || I)(i, {
        item: {
          code: r,
          ...n || {}
        }
      });
    },
    renderDefaultWbDataViewer(t, e, n) {
      return (t || I)("WBDataViewer", {
        value: e,
        ...n || {},
        onInput: (r) => {
          this.item_ = r;
        },
        "onUpdate:modelValue": (r) => {
          this.item_ = r;
        }
      });
    },
    updateContentRegistry() {
      var t;
      this.content || (this.content = { input: {}, output: {} }), this.content.input = {
        ...this.content.input || {},
        item: this.item,
        item_: this.item_,
        file: { js: this.source, html: this.paragraphsFromText(this.source), md: (t = this.$turnDown) == null ? void 0 : t.turndown(this.paragraphsFromText(this.source)) }
      }, this.content.output = {
        html: {
          htmlObj: () => this.$el,
          html: () => {
            var e;
            return (e = this.$el) == null ? void 0 : e.outerHTML;
          },
          pureHtml: () => {
            var e;
            return this.purifyHtml((e = this.$el) == null ? void 0 : e.outerHTML);
          },
          FHtml: (e = 2) => {
            var n;
            return this.formatHtml((n = this.$el) == null ? void 0 : n.outerHTML, { indentSize: e });
          },
          FPureHtml: (e = 2) => {
            var n;
            return this.formatHtml(this.purifyHtml((n = this.$el) == null ? void 0 : n.outerHTML), { indentSize: e });
          }
        },
        md: {
          md: () => {
            var e, n;
            return (n = this.$turnDown) == null ? void 0 : n.turndown((e = this.$el) == null ? void 0 : e.outerHTML);
          },
          pureMd: () => {
            var e, n;
            return (n = this.$turnDown) == null ? void 0 : n.turndown(this.purifyHtml((e = this.$el) == null ? void 0 : e.outerHTML));
          }
        },
        vNodes: this.vNodes,
        vNode: this.$_finalRender,
        file: this.fileContent
      };
    },
    loadFile(t) {
      var n, r;
      const e = (r = (n = this.$wbcUi3Options || this.$wbcUi2Options) == null ? void 0 : n.context) == null ? void 0 : r.resolveFile;
      if (e)
        try {
          return e(t);
        } catch (i) {
          return console.error(`Failed to resolve ${t}:`, i), null;
        }
      return null;
    },
    getContext() {
      var o;
      const t = (o = this.$wbcUi3Options || this.$wbcUi2Options) == null ? void 0 : o.context, e = null;
      let n = null;
      if (typeof t == "function")
        n = t;
      else if (t && t.root)
        n = t.root;
      else {
        if (t)
          return t;
        n = e;
      }
      if (!n) {
        const a = (s) => null;
        return a.keys = () => [], a.resolve = () => {
          throw new Error("Context not available — using relative mode");
        }, a.rawSource = () => null, a.lazyImport = () => null, a.id = "relative", a.__mode = "relative", a;
      }
      const r = (a) => {
        try {
          return n(a);
        } catch {
        }
        const s = ["./src/", "./src/public/", "./docs/"];
        for (const l of s)
          try {
            const c = a.startsWith("./") ? l + a.slice(2) : l + a;
            return n(c);
          } catch {
          }
        throw new Error(`Cannot find module '${a}' in smart root context`);
      };
      r.keys = () => n.keys(), r.resolve = (a) => n.resolve(a), r.id = n.id;
      const i = (a, s) => {
        if (!a) return null;
        let l = a(s);
        if (l) return l;
        const c = ["./src/", "./src/public/", "./docs/"];
        for (const p of c) {
          const f = s.startsWith("./") ? p + s.slice(2) : p + s;
          if (l = a(f), l) return l;
        }
        return null;
      };
      return r.rawSource = (a) => i(n.rawSource, a), r.lazyImport = (a) => i(n.lazyImport, a), r;
    },
    codeOutputWBCVN(t) {
      var g, y, C, w;
      const e = t || I;
      if (this.resolvedWbCode == null || typeof this.item_ == "string" && this.item_.startsWith("./")) return null;
      let {
        activator: n,
        collapsed: r = typeof this.resolvedWbCode == "boolean" ? this.resolvedWbCode : !1,
        title: i,
        copy: o,
        download: a,
        maxHeight: s,
        ...l
      } = this.resolvedWbCode || {};
      const c = this.wbCodeOpen_ ?? (typeof this.resolvedWbCode == "object" ? !r : this.resolvedWbCode === !0);
      l.extra = 'Syntax: &lt;WBC item="item"/&gt;|bg-grey-lighten-1 font-weight-bold__';
      const p = typeof this.item_ == "string" ? this.item_ : this._originalItem || this.item_, f = typeof p == "string" ? p : JSON.stringify(p, null, 2), u = { title: i, copy: o, download: a }, d = this.lang === "ar" ? { ...Tt(s), ...Te } : Tt(s), m = l.output != null && ((C = (y = (g = this.$) == null ? void 0 : g.appContext) == null ? void 0 : y.components) != null && C.WBCode) ? e("div", { class: "wbc-code-body", style: d }, [
        this.renderDefaultWbcode(e, f, { ...l, language: "json" })
      ]) : e("pre", {
        class: "wbc-code-content pa-3 ma-0",
        style: { whiteSpace: "pre-wrap", ...d }
      }, or(f ?? "")), b = e("VListGroup", {
        class: "rounded border ma-5",
        value: "wbc-code-group"
      }, {
        activator: (v = {}) => {
          const $ = v.props || {}, E = n == null || typeof n == "boolean" ? "" : n;
          return e("VListItem", {
            ...$,
            class: [$.class, "pa-1", "bg-grey-lighten-1", "justify-end"]
          }, {
            // VListGroup supplies the expand/collapse icon through
            // VListItem defaults. Keep the custom WBC activator content
            // in the item's default slot so the icon remains visible.
            default: () => [n === void 0 ? Ae(e, u, f ?? "", "WBC source", "wbc-source.json") : e("WBC", { item: E })]
          });
        },
        default: () => [m]
      });
      return e("VList", {
        key: `wbc-code-${((w = this.item_) == null ? void 0 : w.id) || this.item_}`,
        class: "wbc-code-list",
        opened: c ? ["wbc-code-group"] : [],
        "onUpdate:opened": (v = []) => {
          this.wbCodeOpen_ = v.includes("wbc-code-group");
        }
      }, [b]);
    },
    codeFileOutputVN(t) {
      var v;
      const e = t || I, n = this.itemFileLanguage;
      if (this.resolvedWbCodeFile == null || !n || !this.source) return null;
      let {
        activator: r,
        collapsed: i,
        title: o,
        copy: a,
        download: s,
        maxHeight: l,
        ...c
      } = this.resolvedWbCodeFile || {}, p = r == null || typeof r == "boolean" ? "" : r, f = i ?? !1;
      const u = typeof this.wbCodeFileOpen_ == "boolean" ? this.wbCodeFileOpen_ : typeof this.wbCodeFile_ == "boolean" ? this.wbCodeFile_ : !f;
      c.language = n, c.extra = this.item_;
      const d = sr(this.source), m = ar(this._sourceFilePath || this._originalItem || this.item_), b = { title: o, copy: a, download: s }, g = this.lang === "ar" ? { ...Tt(l), ...Te } : Tt(l), y = e("div", {
        class: "wbc-code-body",
        style: g
      }, [this.renderDefaultWbcode(e, d, c)]), C = e("VListGroup", {
        class: "rounded border ma-5",
        value: "wbc-file-code-group"
      }, {
        activator: ($ = {}) => {
          const E = $.props || {};
          return e("VListItem", {
            ...E,
            class: [E.class, "pa-1", "bg-grey-lighten-1", "justify-end"]
          }, {
            default: () => [r === void 0 ? Ae(e, b, d, m, m) : e("WBC", { item: p })]
          });
        },
        default: () => [y]
      });
      let w = `wbc-file-code-${((v = this.item_) == null ? void 0 : v.id) || this.item_}`;
      return e("VList", {
        key: w,
        class: "wbc-code-list",
        opened: u ? ["wbc-file-code-group"] : [],
        "onUpdate:opened": ($ = []) => {
          this.wbCodeFileOpen_ = $.includes("wbc-file-code-group");
        }
      }, [C]);
    },
    dataViewerOutputVN(t) {
      var f, u;
      const e = t || I;
      if (this.resolvedWbDataViewer == null || this.item_ == null) return null;
      let {
        activator: n,
        collapsed: r,
        ...i
      } = this.resolvedWbDataViewer || {}, o = n || "div__Show/Hide WBC-data-content|align-end font-weight-bold px-1 ", a = typeof this.resolvedWbDataViewer == "boolean" ? this.resolvedWbDataViewer : ((f = this.resolvedWbDataViewer) == null ? void 0 : f.collapsed) || !1;
      const s = typeof this.wbDataViewer_ == "boolean" ? this.wbDataViewer_ : a;
      let l = this.renderDefaultWbDataViewer(e, this.item_, i), c = `wbc-data-viewer-${((u = this.item_) == null ? void 0 : u.id) || this.item_}`;
      const p = e("VListGroup", {
        class: "rounded border ma-5",
        value: "wbc-data-viewer-group"
      }, {
        activator: (d = {}) => {
          const m = d.props || {};
          return e("VListItem", {
            ...m,
            class: [m.class, "pa-1", "bg-grey-lighten-1", "justify-end"]
          }, {
            default: () => [e("WBC", { item: o })]
          });
        },
        default: () => [l]
      });
      return e("VList", {
        key: c,
        class: "wbc-data-viewer-list",
        opened: s ? ["wbc-data-viewer-group"] : [],
        "onUpdate:opened": (d = []) => {
          this.wbDataViewer_ = d.includes("wbc-data-viewer-group");
        }
      }, [p]);
    },
    setVNode(t, e) {
      this.vNodes || (this.vNodes = {}), e != null ? this.vNodes[t] = ft(e) : delete this.vNodes[t];
    },
    syncVNodes(t, e) {
      const n = t || I, r = this.item_;
      this.setVNode("main", e || this.toWBC_(r, n, this.children_, this.wrap_)), this.setVNode("wbCode", this.codeOutputWBCVN(n)), this.setVNode("wbCodeFile", this.codeFileOutputVN(n)), this.setVNode("wbDataViewer", this.dataViewerOutputVN(n));
      const i = this.globalHeaderVN(r, n), o = this.globalFooterVN(r, n), a = this.insideHeadersVN(r, n), s = this.insideFootersVN(r, n);
      this.setVNode("globalHeader", i), this.setVNode("gHeader", i), this.setVNode("header", i), this.setVNode("globalFooter", o), this.setVNode("gFooter", o), this.setVNode("footer", o), this.setVNode("insideHeaders", a), this.setVNode("headers", a), this.setVNode("insideFooters", s), this.setVNode("footers", s), this.float_ != null || this.close_ != null || this.drag_ != null || this.focus_ != null || this.focusOn_ != null || r != null && r.options && (r.options.float != null || r.options.close != null || r.options.drag != null || r.options.focus != null || r.options.focusOn != null) ? (this.setVNode("float", Dn(this, n, r, this.float_)), this.setVNode("close", Pn(this, n, r, this.close_)), this.setVNode("drag", Rn(this, n, r, this.drag_))) : (this.setVNode("float", null), this.setVNode("close", null), this.setVNode("drag", null)), this.float_ != null || this.focus_ != null || r != null && r.options && typeof r.options.focus == "boolean" ? this.setVNode("focusOn", Me(this, n, this.vNodes.main, { _float: this.float_, _close: this.close_, _drag: this.drag_, _focus: this.focus_ })) : this.setVNode("focusOn", null);
    },
    getCookies() {
      const t = typeof this < "u" && "$cookies" in this ? this.$cookies : void 0;
      if (t != null && t.keys) {
        const e = t.keys();
        let n = {};
        return e.forEach((r) => {
          n[r] = t.get(r);
        }), n;
      }
      return Y.get() || {};
    },
    getCookie(t) {
      const e = typeof this < "u" && "$cookies" in this ? this.$cookies : void 0;
      return e != null && e.get ? e.get(t) : Y.get(t);
    },
    setCookie(t, e, n) {
      const r = typeof this < "u" && "$cookies" in this ? this.$cookies : void 0;
      return r != null && r.set ? r.set(t, e, n) : Y.set(t, e, n);
    },
    removeCookie(t, e) {
      const n = typeof this < "u" && "$cookies" in this ? this.$cookies : void 0;
      return n != null && n.remove ? n.remove(t, e) : Y.remove(t, e);
    },
    handleMouseDown(t) {
    },
    _attachDebugListener() {
      !this.$el || typeof this.$el.addEventListener != "function" || this._debugListenerAttached || (this.$el.addEventListener("mousedown", this.handleMouseDown), this._debugListenerAttached = !0);
    },
    aesEnc: Tn,
    aesDec: An,
    ...Ar.methods,
    toWBC_(t, e, n, r) {
      var u;
      const i = e || I;
      if (!this.isNonEmpty(t))
        return null;
      let o, a, s, l, c, p;
      a = this.globalHeaderVN(t, i), s = this.globalFooterVN(t, i), l = this.insideHeadersVN(t, i), c = this.insideFootersVN(t, i), this.setVNode("insideHeaders", l), this.setVNode("headers", l), this.setVNode("insideFooters", c), this.setVNode("footers", c);
      let f;
      if (typeof t == "function")
        return kr(this, t, i);
      if (this.isVnode(t))
        f = t;
      else if (["VSpacer", "VDivider"].includes(t))
        f = i(t, {});
      else if (typeof t == "string")
        f = Vn(this, t, i, { __DEV__: He });
      else if (typeof t == "boolean" || typeof t == "number")
        f = vr(this, t, i);
      else if (Array.isArray(t))
        f = jo(this, t, i);
      else {
        let d = { externalChildren: n, insideHeadersVN: l, insideFootersVN: c, globalHeaderVN: a, globalFooterVN: s, externalWrapperObj: r, extChildren: p, wbcObj: ((u = this.$options) == null ? void 0 : u.wbcObj) || {} }, m = go(this, t, i, d);
        f = m.main, o = m.options, p = m.extChildren;
      }
      if (o != null && o.wrap) {
        let d;
        typeof (o == null ? void 0 : o.wrap) == "string" ? d = {
          comp: o == null ? void 0 : o.wrap,
          options: {
            html: f
          }
        } : (o == null ? void 0 : o.wrap) instanceof Object && (d = o == null ? void 0 : o.wrap, d.options || (d.options = {}), he(d).options.html = ft(f)), f = i("WBC", {
          item: d
        });
      }
      return f;
    },
    strToComps: En,
    updateInputValue(t) {
      var e, n, r, i, o, a, s;
      typeof t == "object" && (t != null && t.target) ? (((e = t == null ? void 0 : t.target) == null ? void 0 : e.type) == "checkbox" && (this.item_.options.attrs.checked = ((n = t == null ? void 0 : t.target) == null ? void 0 : n.checked) || !1), this.item_.options.val = ((r = t == null ? void 0 : t.target) == null ? void 0 : r.value) || ((i = t == null ? void 0 : t.target) == null ? void 0 : i.checked) || !1) : ((o = this == null ? void 0 : this.item_) == null ? void 0 : o.comp) == "VCheckbox" ? this.item_.options.val = !((s = (a = this == null ? void 0 : this.item_) == null ? void 0 : a.options) != null && s.val) || !1 : this.item_.options.val = t || "";
    },
    updateKey(t) {
      return t != null && t.includes("_") ? t.replace("_", "-") : t != null && t.includes("-") ? t.replace("-", "_") : t ? t + "_" : this.randomKey("key");
    },
    getNextVariableName(t) {
      let e = -1;
      for (let n in window) {
        let r = n.match(new RegExp(`^${t}_(\\d+)$`));
        if (r) {
          let i = parseInt(r[1], 10);
          e = Math.max(e, i);
        }
      }
      return `${t}_${e + 1}`;
    },
    ...Object.fromEntries(
      Object.entries(Yt).filter(
        ([t, e]) => typeof e == "function"
      )
    ),
    resolvedContentTrust() {
      return Jn({
        contentTrust: this.contentTrust,
        untrusted: this.untrusted,
        inheritedContentTrust: this.wbcContentTrustInjected,
        inheritedUntrusted: this.wbcUntrustedInjected,
        hasContentTrust: Pt(this, "contentTrust"),
        hasUntrusted: Pt(this, "untrusted"),
        dev: He
      });
    },
    strToObj(t, e) {
      return yt(t, {
        trusted: this.resolvedContentTrust() !== Z,
        ...e || {}
      });
    }
  },
  components: {
    WBHtml: ve,
    WBLink: te
  },
  // `store:` was the Vue 2 Vuex root-injection option — inert in Vue 3. The
  // reactive `$store` surface is now wired via the plugin (globalProperties) and,
  // for standalone mounts, via wbLifecycleMixin.beforeCreate. (task 10 / ADR-002)
  name: "WBC"
  // ⚠️ DO NOT ADD AN `emits` OPTION. Tried and reverted in plan row 23.
  //
  // WBC has an OPEN-ENDED emit surface: `itemAccessibility` exposes
  // `acc.emit(name, value)` to descriptor authors, who may emit any event name they like.
  // Declaring `emits` makes Vue warn for every name not in the list —
  //
  //   [Vue warn]: Component emitted event "…" but it is neither declared in the emits
  //               option nor as an "on…" prop.
  //
  // — so a single declaration would produce a warning on every consumer using `acc.emit`,
  // and the suite's 0-warning gate would fail on the first one. Verified by declaring
  // a fixed `emits` list, probing an arbitrary `acc.emit()`, and
  // watching the gate fail.
  //
  // The cost of omitting it is small and known: a host's `@update:isValid` listener also
  // falls through as an attr. That is the correct trade for a component whose emit surface
  // cannot be enumerated. `$emit` works regardless, and VTU's `emitted()` captures it.
}, fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mt,
  wbcObj: Mt
}, Symbol.toStringTag, { value: "Module" })), hs = (t, e) => {
  let n;
  return (...r) => {
    clearTimeout(n), n = setTimeout(() => t(...r), e);
  };
};
if (typeof ResizeObserver < "u") {
  const t = ResizeObserver;
  window.ResizeObserver = class {
    constructor(n) {
      this.debouncedCallback = hs(n, 50), this.observer = new t(this.debouncedCallback);
    }
    observe(n) {
      this.observer.observe(n);
    }
    unobserve(n) {
      this.observer.unobserve(n);
    }
    disconnect() {
      this.observer.disconnect();
    }
  };
}
const ms = new zt({
  html: !0,
  linkify: !0,
  typographer: !0,
  breaks: !1
}).use(Wt, {
  permalink: Wt.permalink.headerLink({ safariReaderFix: !0 }),
  slugify: (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}).use(er, {
  copyButtonText: "Copy",
  copiedButtonText: "Copied!",
  buttonClass: "pa-3",
  onSuccess: (t) => {
    const e = t.trigger, n = e.querySelector(".mdi") || e.querySelector("i"), r = n ? n.className : "", i = n ? n.style.color : "";
    n && (n.className = "mdi mdi-check", n.textContent = "copied!", n.style.color = "grey", setTimeout(() => {
      n.className = r, n.style.color = i, n.textContent = "";
    }, 1e4));
  }
}), ys = () => new nn({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "_"
}), Ze = ["Vuetify", "Router", "Store", "JsonViewer", "Cookies", "Dayjs"];
function Zn(t, e = !0) {
  const n = typeof t == "function" ? t(h) : t, r = document.createElement("div"), i = qe({ render: () => n });
  i.mount(r);
  let o = r.innerHTML;
  return i.unmount(), e !== !1 && (o = wt(o, e === !0 ? { removeEmpty: ["span", "div"], collapseWrappers: ["span", "div"] } : e)), o;
}
function Xn(t) {
  const e = typeof t == "function" ? t(h) : t, n = document.createElement("div"), r = qe({ render: () => e });
  return r.mount(n), {
    app: r,
    el: n.firstElementChild || n,
    get html() {
      return wt(n.innerHTML);
    },
    destroy: () => r.unmount()
  };
}
function gs(t, e = {}) {
  var i, o, a, s, l, c;
  if (!t) return;
  const n = t.config.globalProperties;
  if (Object.entries((e == null ? void 0 : e.plugins) || {}).forEach(([p, f]) => {
    const u = f == null ? void 0 : f.plugin, d = f == null ? void 0 : f.options;
    if (u && !(f.property && n[f.property]))
      try {
        d ? t.use(u, d) : t.use(u);
      } catch (m) {
        console.error(`[WBC Install] Failed to install ${p}:`, m);
      }
  }), Object.keys((e == null ? void 0 : e.plugins) || {}).forEach((p) => {
    Ze.includes(p) || console.warn(
      `[WBC] Unknown plugin key "${p}". Recognised optional peers: ${Ze.join(", ")}.`
    );
  }), n.$md || (n.$md = ms), !n.$turndown) {
    const p = ys();
    n.$turndown = p, n.$turnDown = p;
  }
  n.$dayjs || (n.$dayjs = (e == null ? void 0 : e.dayjs) || ((o = (i = e == null ? void 0 : e.plugins) == null ? void 0 : i.Dayjs) == null ? void 0 : o.plugin) || fn), Object.assign(n, Yt), n.$wbcUi3Options = e, n.$store || (n.$store = e.store || Un), Object.prototype.hasOwnProperty.call(n, "$route") || (n.$route = void 0), Object.prototype.hasOwnProperty.call(n, "$router") || (n.$router = void 0), Object.prototype.hasOwnProperty.call(n, "$wbcUi2Options") || (n.$wbcUi2Options = void 0), t.component("WBHtml", ve), t.component("WBLink", te), !t.component("JsonViewer") && !((a = e == null ? void 0 : e.components) != null && a.JsonViewer) && t.component("JsonViewer", en), Object.entries((e == null ? void 0 : e.components) || {}).forEach(([p, f]) => {
    t.component(p, f);
  }), n.renderVNodeToString = Zn, n.mountVNode = Xn;
  const r = Y.get("lg");
  if (r) {
    const p = decodeURIComponent(r);
    (s = n.$store) != null && s.commit && n.$store.commit("updateLang", p);
  } else if (e != null && e.lg) {
    try {
      document.cookie = `lg=${encodeURIComponent(e.lg)}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (p) {
      console.warn("[WBC] could not persist lg cookie:", p);
    }
    (l = n.$store) != null && l.commit && n.$store.commit("updateLang", e.lg);
  } else
    (c = n.$store) != null && c.commit && n.$store.commit("updateLang", "en");
}
const bs = {
  ...Yt,
  install: gs,
  WBHtml: ve,
  WBLink: te,
  JsonViewer: en,
  MarkdownIt: zt,
  TurnDown: nn,
  renderVNodeToString: Zn,
  mountVNode: Xn
}, Xe = /* @__PURE__ */ new WeakSet();
function ws(t, e = {}) {
  if (!(!t || Xe.has(t))) {
    Xe.add(t);
    try {
      if (bs.install(t, e), !Mt) {
        console.error("[WBC] WBCOptions is UNDEFINED!");
        return;
      }
      t.component("WBC", Mt);
    } catch (n) {
      console.error("[WBC] Installation FAILED:", n);
    }
  }
}
const As = { install: ws };
export {
  Mt as WBC,
  ve as WBHtml,
  te as WBLink,
  lt as clone,
  As as default,
  Nr as excludeList,
  bs as extendedInstall,
  Vt as generalVal,
  ws as install,
  jn as safeEval,
  Es as setWbcRouteSink,
  yt as strToObj
};

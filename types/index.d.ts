// Type declarations for @wbc-ui/core
//
// Hand-written and maintained deliberately — see _meta/adr_008_type_declarations.md for
// why generation from JSDoc was rejected (6 of 50 source files carry @param, and the
// descriptor grammar is unions of object literals that JSDoc expresses poorly).
//
// THESE DESCRIBE THE API AS IT IS, not as it should be. Where the runtime accepts two
// shapes for one key, both are in the union, with the difference documented rather than
// tidied away.
//
// DRIFT WARNING: a hand-written .d.ts can disagree with the runtime. The accessor members
// below are pinned by tests/noTiers.test.js and the consumer fixture. If you add an `acc`
// member, add it in BOTH places or the guard fails.

import type { App, Component, VNode, Plugin } from 'vue';

// ─────────────────────────────────────────────────────────────────────────────
// Validators
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The 14 named validators in `utils/validation.js`.
 *
 * A name not in this union is NOT an error: `rules: ['nope']` passes the literal string
 * through to Vuetify, which renders it as a static error message. That is deliberate
 * (plan row 27 — an unknown name used to throw). The union exists for autocomplete on
 * the supported set, which is why `WbcRules` widens to `string` alongside it.
 */
export type WbcValidatorName =
  | 'required' | 'banned' | 'includes' | 'excludes' | 'username'
  | 'maxLength' | 'minLength' | 'upperCharNb' | 'lowerCharNb'
  | 'specialCharNb' | 'digitCharNb' | 'isValidDate' | 'email' | 'phone';

/** A localised validator message, keyed by language code (`lg`). */
export interface WbcLocalisedMessage {
  en?: string;
  fr?: string;
  ar?: string;
  [lang: string]: string | undefined;
}

/** Options object accepted by a named validator's second parameter. */
export interface WbcValidatorOptions {
  lg?: string;
  message?: string | WbcLocalisedMessage;
  /** `banned` */
  banned?: string | string[];
  /** `includes` / `excludes` */
  containingValues?: string | string[];
  [option: string]: unknown;
}

/** A Vuetify-style rule: `true` when valid, or a string to display as the error. */
export type WbcRuleFn = (value: unknown) => boolean | string;

/**
 * `options.rules` accepts two shapes, and the object form has FOUR distinct behaviours
 * depending on the value type. Both are resolved in `renderHelpers.js`.
 *
 * @example Array form — named validators, defaults applied
 *   rules: ['required', 'email']
 *
 * @example Object form — value decides the behaviour
 *   rules: {
 *     required: true,                       // string|other → used as the message
 *     minLength: { minLength: 8 },          // object       → validator options
 *     custom:    (v) => v !== 'x' || 'no',  // function     → used as the rule itself
 *   }
 */
export type WbcRules =
  | Array<WbcValidatorName | (string & {}) | WbcRuleFn>
  | Record<string, WbcValidatorOptions | WbcRuleFn | string | boolean>;

// ─────────────────────────────────────────────────────────────────────────────
// The descriptor
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Anything WBC can render.
 *
 * A string is parsed as WBC shorthand; a function is called; an array renders as
 * siblings; an object is the full descriptor form below.
 */
export type WbcDescriptor =
  | string
  | number
  | boolean
  | null
  | undefined
  | VNode
  | WbcObjectDescriptor
  | WbcDescriptor[]
  | ((...args: any[]) => WbcDescriptor);

/** `options.menu` — wraps the rendered node in a Vuetify menu/tooltip activator. */
export interface WbcMenu {
  /** The activator component, e.g. `'VMenu'`, `'VTooltip'`. */
  comp?: string;
  /** Props applied while the menu is CLOSED. */
  options?: Record<string, unknown>;
  /** Props applied while the menu is OPEN. */
  activeOptions?: Record<string, unknown>;
  /** Root-level props applied when open (`theOpts.menu.activeRootOptions`). */
  activeRootOptions?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * `options` — the per-component payload.
 *
 * Unknown keys are spread onto the rendered component as props, which is why this is
 * open-ended rather than a closed union.
 */
export interface WbcOptions {
  /** Component name when the descriptor uses `options.comp` rather than `comp`. */
  comp?: string;
  /** Raw HTML body, sanitised before insertion. */
  html?: string;
  /** Explicit props for the rendered component. */
  props?: Record<string, unknown>;
  /** Attributes passed through to the element. */
  attrs?: Record<string, unknown>;
  class?: string | string[] | Record<string, boolean>;

  /**
   * Template ref name.
   *
   * See ADR-007: WBC writes this key back onto the descriptor during mount, so a
   * descriptor object reused across two mounts carries the first mount's value.
   */
  ref?: string;

  /** Validation rules — see {@link WbcRules}. */
  rules?: WbcRules;

  /** Current value for input-like components. */
  val?: unknown;
  value?: unknown;

  /**
   * @deprecated Deprecated for one release by plan row 23. Read validity through
   * `acc.isValid()` instead — this field is unreliable on re-mount (ADR-007
   * Consequence 5). Do not adopt it in new descriptors.
   */
  isValid?: boolean;

  /** Menu/tooltip wrapper — see {@link WbcMenu}. */
  menu?: WbcMenu;

  /** Named slot content. */
  slots?: Record<string, WbcDescriptor>;

  /** Wrap the rendered node in another descriptor. */
  wrap?: WbcDescriptor;

  /** Router target for link-like components. */
  to?: string | Record<string, unknown>;
  href?: string;
  target?: string;
  route?: string | Record<string, unknown>;
  path?: string;
  name?: string;
  meta?: Record<string, unknown>;

  /** Per-descriptor language override. */
  lg?: string;
  /** Locally registered components. */
  components?: Record<string, Component>;
  hide?: boolean;
  key?: string | number;

  [option: string]: unknown;
}

/** The object form of a descriptor. */
export interface WbcObjectDescriptor {
  /** Component to render — a registered name, an element tag, or a component object. */
  comp?: string | Component;
  options?: WbcOptions;

  /** Structural slots. */
  header?: WbcDescriptor;
  footer?: WbcDescriptor;
  output?: WbcDescriptor;
  hHeader?: WbcDescriptor;
  hFooter?: WbcDescriptor;
  hOptions?: WbcOptions;
  fStyle?: Record<string, unknown>;

  /**
   * Render the descriptor's own data one level deeper instead of rendering it directly.
   */
  dive?: boolean;

  /**
   * Swap `options` for `activeOptions` on an event (default `mouseenter`; override with
   * `switchEvent`). Only a **boolean** activates this branch.
   */
  switch?: boolean;
  switchEvent?: string;

  /** Lifecycle hooks. */
  init0?: (...args: any[]) => unknown;
  init?: (...args: any[]) => unknown;
  tracker?: (...args: any[]) => unknown;
  update?: (...args: any[]) => unknown;
  watch?: Record<string, unknown> | ((...args: any[]) => unknown);
  forward?: unknown;

  [key: string]: unknown;
}

// ─────────────────────────────────────────────────────────────────────────────
// The `acc` accessor
// ─────────────────────────────────────────────────────────────────────────────

/**
 * The core accessor surface, available in every build.
 */
export interface WbcAcc {
  /** @deprecated ADR-004 legacy name retained for one release; no tiering behaviour remains. */
  userTier: string;
  nameEl: string;
  props: Record<string, unknown>;
  key: string | number;
  compKey(): string | number;

  /** The live descriptor. Assigning a primitive re-renders via `nextTick`. */
  data: WbcDescriptor;

  update(value?: unknown): void;
  emit(event: string, value?: unknown): void;

  /** Current validity of this instance's input. */
  isValid(): boolean | null;

  /** The seven decorator setters assign explicit values or toggle when omitted. */
  toggleLoad(value?: boolean): void;
  toggleProtected(value?: boolean): void;
  toggleFloat(value?: boolean): void;
  toggleClose(value?: boolean): void;
  toggleFocus(value?: boolean): void;
  toggleDrag(value?: boolean): void;
  toggleHide(value?: boolean): void;

  lg: {
    lang: string;
    get(): string;
    set(language: string): void;
  };

  dayjs(value?: unknown): unknown;

  storage: {
    get(key?: string): unknown;
    set(key: string | null, value: unknown): void;
  };
  cookies: {
    get(key?: string): unknown;
    set(key: string | null, value: unknown): void;
  };
  root: unknown;
  vm: unknown;
  proto: unknown;
  el(selector?: string): Element | undefined;
  ref(name: string): unknown;
  refs: Record<string, unknown>;

  set(value: unknown, key?: string): void;
  get(key?: string): unknown;
  val(value?: unknown): unknown;
  isValidFn(value?: unknown): boolean;

  content(): unknown;
  queryData: unknown;
  trigger(method: string, ...args: unknown[]): unknown;
  watch(path: string, cb: (...args: any[]) => void, options?: Record<string, unknown>): () => void;

  store: unknown;
  router: unknown;
  routes: Record<string, unknown> | null;
  routeParams(): Record<string, unknown>;

  user: Record<string, unknown>;
  loggedIn: boolean;

  markdown: {
    md2Html(markdown: string): string;
    html2Md(html: string): string;
  };
  aes: {
    enc(plaintext: string, key: string, iv: string): string;
    dec(ciphertext: string, key: string, iv: string): string;
  };
  lzStr: unknown;

  /** The standard table merged with any instance-level overrides (plan row 27). */
  validators: Record<string, (value: unknown, options?: WbcValidatorOptions) => boolean | string>;

  /** Decorator state as read/write properties. */
  focusOn: unknown;
  protected: boolean;
  focus: boolean;
  load: boolean;
  float: boolean;
  drag: boolean;
  close: boolean;
  hide: boolean;
}

/** @deprecated Alias retained for one release. Use {@link WbcAcc}. */
export interface WbcAccPro extends WbcAcc {}

/**
 * The DEV accessor surface — the code-inspection affordances.
 *
 * These are reachable only when a consumer sets `define: { __WBC_DEV__: true }` in
 * their own bundler.
 */
export interface WbcAccDev extends WbcAcc {
  wbCode: boolean | object | null;
  wbCodeFile: boolean | object | null;
  toggleWbCode(value?: boolean | null): void;
  toggleWbCodeFile(value?: boolean | null): void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Components and plugin
// ─────────────────────────────────────────────────────────────────────────────

export interface WbcProps {
  item?: WbcDescriptor;
  props?: Record<string, unknown>;
  children?: WbcDescriptor;
  wrap?: WbcDescriptor;
  global?: boolean;
  extKey?: string | number;
  wiki?: unknown;
  transform?: unknown;

  /** Decorator chrome. */
  protected?: boolean;
  load?: boolean;
  float?: boolean;
  close?: boolean;
  drag?: boolean;
  focus?: boolean;
  focusOn?: unknown;
  hide?: boolean;

  /**
   * Trust boundary for descriptor strings. `external` is the safe default and uses
   * the AST sandbox; `authored` is an explicit opt-in for first-party descriptors
   * that need legacy interactive evaluation.
   */
  contentTrust?: 'external' | 'authored';

  /**
   * Deprecated one-release alias for `contentTrust`.
   * `true` maps to `external`; explicit `false` maps to `authored`.
   */
  untrusted?: boolean;

  /** Dev-only inspection panels — see {@link WbcAccDev}. */
  wbCode?: boolean | object;
  wbCodeFile?: boolean | object;
  wbDataViewer?: boolean | object;
}

export declare const WBC: Component;
export declare const WBHtml: Component;
export declare const WBLink: Component;

export declare function install(app: App, options?: Record<string, unknown>): void;
export declare function extendedInstall(app: App, options?: Record<string, unknown>): void;

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

export interface SafeEvalOptions {
  /**
   * Force the trust decision for this call, overriding the compile-time default.
   *
   * `false` → hardened acorn AST sandbox. `true` → full-power evaluator; only for content
   * the host authored. See `utils/security.js`.
   */
  trusted?: boolean;
}

/**
 * Evaluate an expression against a context object.
 *
 * @throws `Error('Blocked: unsafe code pattern')` when the sandbox rejects the input —
 *   it does NOT return `undefined` for blocked code. A parse failure returns `undefined`.
 */
export declare function safeEval(
  code: string,
  context?: Record<string, unknown>,
  quiet?: boolean,
  opts?: SafeEvalOptions,
): unknown;

/** Parse a string into an object, falling back to `safeEval` when it is not JSON. */
export declare function strToObj(input: string, opts?: SafeEvalOptions): unknown;

/** Install a storage sink for dynamically registered WBC routes. */
export declare function setWbcRouteSink(sink: unknown): void;

/**
 * Resolve a value that may be a function, a language map, or a plain value.
 *
 * @param obj the value to resolve
 * @param thiss the context object bound into resolved callbacks — **NOT a language
 *   string**. A function with `length >= 1` is returned as `(...rest) => obj(thiss, ...rest)`
 * @param lg language code used to resolve `{ en, fr, … }` maps (top level only)
 * @param listToExclude keys whose values must NOT be resolved; defaults to
 *   {@link excludeList}
 *
 * ARITY IS THE CONTRACT: `generalVal` dispatches on `fn.length`. Do not "tidy away" an
 * unused parameter on a function passed here (plan row 25).
 */
export declare function generalVal(
  obj: unknown,
  thiss?: Record<string, unknown>,
  lg?: string,
  listToExclude?: readonly string[],
): unknown;

/**
 * Deep clone. `visited` is internal cycle-tracking state — callers pass one argument.
 */
export declare function clone<T>(value: T, visited?: WeakMap<object, unknown>): T;

/**
 * Keys whose values `generalVal` must NOT resolve, because they are callbacks invoked
 * later with their own arguments.
 *
 * This is a CONSTANT ARRAY, not a function. It was declared as a callable in the first
 * draft of this file — a fabricated export that would have produced
 * `excludeList is not a function` at runtime with no type error (caught by Claude
 * Sonnet 5's validation of plan row 3.2, 2026-07-26).
 */
export declare const excludeList: readonly string[];

declare const plugin: Plugin;
export default plugin;

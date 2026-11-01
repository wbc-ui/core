// packages/wb-core/core/src/styles/index.js  —  Vue 3
//
// Ported from the Vue 2 line (task 7). One deliberate omission (task 12 / ADR-001):
// the ui2 file also did `import 'vuetify/dist/vuetify.min.css'`. Vuetify is an
// OPTIONAL peer in the ui3 line — wb-core never imports it. A host that uses
// Vuetify ships Vuetify's own CSS; wb-core must not drag it into every bundle.
//
// markdown.css is framework-agnostic (GitHub-markdown styling for `.markdown-body`,
// self-contained data-URI icons) and carries over verbatim.

import "./markdown.css";

// Stylesheet for the bundled `JsonViewer` (`vue3-json-viewer`), registered in
// `extended_install.js` — see note 3 there. Without it `.jv-container` renders as
// unstyled nested `<div>`s: no box, no indent guides, no copy button affordance.
// The file name is `vue3-json-viewer.css`, NOT the `dist/style.css` the package's
// own `"style"` field and README advertise — that path does not exist in 2.4.1.
import "vue3-json-viewer/dist/vue3-json-viewer.css";

export default {};

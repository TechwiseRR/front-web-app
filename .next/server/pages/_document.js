const CHUNK_PUBLIC_PATH = "server/pages/_document.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules__pnpm_e0fc70._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__e5892b._.js");
runtime.loadChunk("server/chunks/ssr/[next]_internal_font_google_84d48c._.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/pages/_document.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;

const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules__pnpm_cdcb9f._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__8fe41c._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__4ddf35._.css");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.tsx [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;

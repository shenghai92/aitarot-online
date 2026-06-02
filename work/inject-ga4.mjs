import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = "C:/Users/赵海升/Documents/Codex/2026-05-29/corepapers";
const measurementId = "G-LZC9CZG7RE";
const snippet = `    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    </script>
`;

for (const file of readdirSync(root)) {
  if (!file.endsWith(".html")) continue;

  const fullPath = join(root, file);
  const source = readFileSync(fullPath, "utf8");
  if (source.includes(`gtag/js?id=${measurementId}`)) continue;

  const updated = source.replace("  </head>", `${snippet}  </head>`);
  writeFileSync(fullPath, updated, "utf8");
}

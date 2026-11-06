# Lighthouse – design

Run: 2026-11-06T09:43:22.947Z · Lighthouse 13.6.0 · production build served by `next start` on localhost · simulated throttling.

| Page | Form | Perf | A11y | Best practices | SEO | LCP | CLS | TBT | Speed Index | Bytes |
|---|---|---|---|---|---|---|---|---|---|---|
| home | mobile | 100 | 100 | 100 | 100 | 0.8 s | 0 | 60 ms | 0.8 s | Total size was 320 KiB |
| home | desktop | 99 | 100 | 100 | 100 | 0.8 s | 0 | 50 ms | 0.8 s | Total size was 341 KiB |
| products | mobile | 100 | 100 | 100 | 100 | 0.8 s | 0 | 40 ms | 0.8 s | Total size was 320 KiB |
| products | desktop | 99 | 100 | 100 | 100 | 0.8 s | 0 | 40 ms | 0.8 s | Total size was 341 KiB |

INP is a field metric and is not measured by Lighthouse lab runs; TBT is reported as its lab proxy.

## Audits scoring below 90

- **home / mobile:** max-potential-fid (150 ms), forced-reflow-insight (0), network-dependency-tree-insight (0)
- **home / desktop:** max-potential-fid (150 ms), interactive (3.2 s), network-dependency-tree-insight (0)
- **products / mobile:** max-potential-fid (140 ms), forced-reflow-insight (0), network-dependency-tree-insight (0)
- **products / desktop:** max-potential-fid (140 ms), interactive (2.8 s), network-dependency-tree-insight (0)

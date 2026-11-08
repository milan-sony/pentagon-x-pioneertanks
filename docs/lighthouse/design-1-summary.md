# Lighthouse – design-1

Run: 2026-11-08T11:29:55.319Z · Lighthouse 13.6.0 · production build served by `next start` on localhost · simulated throttling.

| Page | Form | Perf | A11y | Best practices | SEO | LCP | CLS | TBT | Speed Index | Bytes |
|---|---|---|---|---|---|---|---|---|---|---|
| home | mobile | 84 | 100 | 100 | 100 | 4.0 s | 0 | 170 ms | 3.2 s | Total size was 631 KiB |
| home | desktop | 70 | 100 | 100 | 100 | 3.1 s | 0 | 160 ms | 3.2 s | Total size was 633 KiB |
| products | mobile | 94 | 100 | 100 | 100 | 2.4 s | 0 | 210 ms | 3.0 s | Total size was 560 KiB |
| products | desktop | 74 | 100 | 100 | 100 | 2.8 s | 0 | 140 ms | 3.0 s | Total size was 577 KiB |

INP is a field metric and is not measured by Lighthouse lab runs; TBT is reported as its lab proxy.

## Audits scoring below 90

- **home / mobile:** largest-contentful-paint (4.0 s), max-potential-fid (210 ms), interactive (4.1 s), forced-reflow-insight (0), lcp-discovery-insight (0), network-dependency-tree-insight (0)
- **home / desktop:** first-contentful-paint (1.1 s), largest-contentful-paint (3.1 s), speed-index (3.2 s), total-blocking-time (160 ms), max-potential-fid (190 ms), interactive (4.1 s), forced-reflow-insight (0), lcp-discovery-insight (0)
- **products / mobile:** total-blocking-time (210 ms), max-potential-fid (180 ms), interactive (4.1 s), lcp-discovery-insight (0), network-dependency-tree-insight (0)
- **products / desktop:** first-contentful-paint (1.0 s), largest-contentful-paint (2.8 s), speed-index (3.0 s), max-potential-fid (150 ms), interactive (4.1 s), lcp-discovery-insight (0), network-dependency-tree-insight (0)

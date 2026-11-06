# Lighthouse – design-04

Run: 2026-11-06T12:07:20.891Z · Lighthouse 13.6.0 · production build served by `next start` on localhost · simulated throttling.

| Page | Form | Perf | A11y | Best practices | SEO | LCP | CLS | TBT | Speed Index | Bytes |
|---|---|---|---|---|---|---|---|---|---|---|
| home | mobile | 83 | 100 | 100 | 100 | 4.1 s | 0 | 200 ms | 1.2 s | Total size was 627 KiB |
| home | desktop | 77 | 100 | 100 | 100 | 3.8 s | 0 | 110 ms | 1.0 s | Total size was 629 KiB |
| products | mobile | 86 | 100 | 100 | 100 | 3.8 s | 0 | 210 ms | 1.0 s | Total size was 561 KiB |
| products | desktop | 78 | 100 | 100 | 100 | 3.7 s | 0 | 80 ms | 1.1 s | Total size was 576 KiB |

INP is a field metric and is not measured by Lighthouse lab runs; TBT is reported as its lab proxy.

## Audits scoring below 90

- **home / mobile:** largest-contentful-paint (4.1 s), total-blocking-time (200 ms), max-potential-fid (220 ms), interactive (4.2 s), forced-reflow-insight (0), lcp-discovery-insight (0), network-dependency-tree-insight (0)
- **home / desktop:** first-contentful-paint (1.0 s), largest-contentful-paint (3.8 s), max-potential-fid (160 ms), interactive (4.0 s), lcp-discovery-insight (0), network-dependency-tree-insight (0)
- **products / mobile:** largest-contentful-paint (3.8 s), total-blocking-time (210 ms), max-potential-fid (140 ms), interactive (4.0 s), lcp-discovery-insight (0), network-dependency-tree-insight (0)
- **products / desktop:** first-contentful-paint (1.1 s), largest-contentful-paint (3.7 s), max-potential-fid (130 ms), interactive (4.1 s), lcp-discovery-insight (0), network-dependency-tree-insight (0)

# Testing and release acceptance

Status: future acceptance plan. This documentation task does not establish
storefront, Theme Editor, accessibility, or cross-theme test results.

## Documentation-only checks

Confirm that the requested files exist, local documentation links resolve, and
the diff contains only documentation. No Shopify runtime checks are needed until
implementation exists. Do not modify the development theme to satisfy this phase.

## Static checks for future implementation

- Run `shopify theme check` locally using the existing configuration. Record
  pre-existing host findings separately; introduce no new Techora errors.
- Validate JSON templates, section schemas, block references, setting defaults,
  and current platform limits. Ensure each referenced dependency is packaged.
- Audit Liquid render/include and asset references for host dependencies; check
  for host settings, translation keys, classes, and JavaScript assumptions.
- Inspect CSS and JavaScript for unscoped selectors, generic names, global writes,
  duplicate IDs, and hardcoded store/product data. Ensure all Techora component
  names follow the prefix convention, except Shopify-required syntax.
- Inspect release contents against its manifest, including provenance and absence
  of secrets or unrelated host files. Do not weaken checks to conceal failures.

## Runtime acceptance matrix

| Area | Minimum scenarios and expected outcome |
| --- | --- |
| Clean install | Install only the pack into each test host; no missing assets, snippets, translations, or code changes |
| Multiple packs | Install two packs sharing components; detect incompatible versions and preserve both pages |
| Editor | Add, remove, duplicate, reorder, save, reload, and select sections/blocks; settings persist and controls work without duplicate listeners |
| Multiple instances | Render a component twice with different settings; styles, IDs, forms, and interactions remain independent |
| Content | Empty/long headings, rich text, missing images, long translations, empty blocks; no broken layout or fake commercial claims |
| Products | Unselected, deleted/unpublished, sold out, single/multiple variants, and unavailable combinations; valid prices, links, forms, and availability states |
| Commerce | Correct variant and quantity reach the cart, errors are readable, and no dependency on a host drawer |
| Responsive | 320, 375, 768, 1024, and 1440 CSS-pixel widths, plus intermediate widths and mobile landscape; no unintended horizontal overflow |
| Browsers | Current Chrome, Firefox, Safari, and Edge; iOS Safari and Android Chrome, recording exact versions |
| Accessibility | Keyboard-only use, visible focus, labels, heading/landmark structure, meaningful alt text, contrast, 200% zoom, reflow, reduced motion, and screen-reader checks |
| Host isolation | Compare ordinary product/cart/content pages before and after install; Techora styles/scripts do not change unrelated content |
| Degraded operation | Disable JavaScript or fail enhancement loading; core content, links, and native form behavior remain usable |
| Upgrade/removal | Preserve merchant content and shared dependencies; verify rollback and reassignment of affected pages |

Use semantic comparison tables where appropriate, with a usable small-screen
strategy. Ensure sticky elements do not obscure content or focus. Supplement an
automated accessibility scan with manual checks; a passing scanner is insufficient.
Target WCAG 2.2 AA in implementation and record any unresolved failures.

## Performance checks

Capture a baseline of the host and compare the Techora page under matching device,
network, and content conditions. Record asset sizes, requests, console/network
errors, and Lighthouse/LCP/CLS/INP evidence as appropriate; distinguish laboratory
measurements from field data. Set a concrete asset budget when the first page's
content and interactions are specified, then enforce it for that release.

Use responsive Shopify-hosted images with intrinsic dimensions, sensible sizes,
and lazy loading below the fold. Do not lazy-load the likely LCP image. Verify that
repeated components do not multiply initialization work or unnecessary downloads.
No third-party framework, font service, tracking script, or remote asset is required
by default. Investigate material regressions before release.

## Release evidence and authorization

For each release, retain its version, manifest/checksums, exact host versions,
browser/device matrix, screenshots, static-check output, accessibility and
performance observations, known limitations, and migration/rollback instructions.
Mark unrun scenarios explicitly; do not convert this checklist into a claim of
tested compatibility. Block release on broken purchase flows, missing dependencies,
data loss, or unresolved material accessibility failures.

Local static validation does not authorize remote writes. Do not run
`shopify theme dev`, push/upload a theme, publish, or deploy automatically; obtain
explicit authorization for the remote workflow. Do not push Git changes without
the user's approval. Once a testing workflow is authorized, perform its ordinary
checks within that scope without repeatedly asking for the same permission.

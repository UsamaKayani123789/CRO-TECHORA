# Techora repository instructions

## Purpose and current scope

This repository is the development environment for a commercial library of
standalone native Shopify Online Store 2.0 pages: listicles, advertorials,
comparison pages, and landing pages. Customers install individual page packs
into their existing themes without Replo, PageFly, GemPages, or another builder.

The initial task is documentation and architecture only. Do not create a Shopify
page, section, block, asset, or template until implementation is requested.

## Mandatory architecture and working rules

1. Commercial page components must be self-contained. Each delivered page pack
   must include every Techora dependency it needs.
2. Never depend on this development theme's snippets, CSS classes, JavaScript,
   components, styling, global settings, or translation keys.
3. Do not modify existing theme files unless absolutely necessary. Prefer new,
   additive Techora files; explain any necessary exception and its impact.
4. Prefix Techora component filenames and component types with `techora-`.
   Alternate page templates use Shopify's required form
   `page.techora-<page-name>.json`. Preserve platform-required names and IDs.
5. Namespace CSS classes with `techora-`, custom properties with `--techora-`,
   and custom elements, events, and data attributes appropriately.
6. Avoid global CSS selectors. Scope styles to Techora roots; never style bare
   `html`, `body`, `:root`, `*`, or all `.shopify-section` elements.
7. Use Shopify-standard Liquid objects, filters, forms, routes, and APIs
   wherever possible. Do not introduce proprietary runtime dependencies.
8. Build with Shopify OS 2.0 sections, blocks, and JSON templates.
9. Make everything practical customizable in the Shopify Theme Editor,
   including content, media, product choices, colors, spacing, and layout options.
10. Use native Shopify `product` settings for product selection. Do not hardcode
    store-specific product handles or IDs in commercial defaults.
11. Support responsive desktop, tablet, and mobile layouts.
12. Follow accessibility and performance best practices; preserve useful content
    and core actions without JavaScript wherever practical.
13. Design components for reuse across future Techora templates.
14. Never copy proprietary code from another Shopify store.
15. Never copy competitor text, images, logos, branding, or assets.
16. Use competitor pages only as visual or structural references. Write original
    implementations and use original, merchant-supplied, or licensed assets.
17. Never publish or deploy automatically. Remote preview uploads, including
    `shopify theme dev`, require explicit authorization for that workflow.
18. Never push changes to Git without the user's approval. Existing repository
    contribution examples do not authorize a push or deployment.

## Implementation contract

- Read [architecture](docs/architecture.md), [compatibility](docs/compatibility.md),
  and [testing](docs/testing.md) before implementing commercial components.
- Keep the development theme separate from the distributed product. Never ship
  the entire repository as a customer page pack.
- Use explicit inputs for Techora snippets. Declare and bundle all dependencies;
  never assume another Techora purchase is installed.
- Scope instance IDs and JavaScript to their section/block. Support repeated
  instances and Theme Editor insertion, reordering, and removal.
- Preserve merchant settings and existing files during installation and upgrades.
  Never silently overwrite a different installed Techora version.
- Verify changes appropriately and report what actually ran. Do not claim theme
  compatibility or storefront validation based only on local static checks.

The architecture documents describe recommendations and future acceptance
criteria, not an already implemented or tested page system.

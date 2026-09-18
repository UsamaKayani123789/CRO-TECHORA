# Techora page system architecture

Status: proposed architecture; documentation only. No Techora storefront code or
templates have been implemented in this task.

## Repository findings

Inspection on 2026-09-18 found Shopify Skeleton, identified as version 0.1.0 in
`config/settings_schema.json`. The repository contains standard theme directories,
existing JSON templates, section groups, and theme blocks. Theme Check extends
`theme-check:recommended`; no automated test suite or package manifest was found
at the repository root.

`layout/theme.liquid` loads `assets/critical.css`, renders `css-variables` and
`meta-tags`, and includes header/footer groups. The CSS applies global resets and
a grid to `.shopify-section`, with a `full-width` utility. `sections/custom-section.liquid`
uses that utility, `--content-grid`, and theme blocks. `sections/product.liquid`
uses the theme's `image` snippet. These are development-host details, not Techora
dependencies. Existing `templates/page.json` renders `sections/page.liquid`.

Keep these files intact. The root README and contribution guide describe the
upstream Skeleton project; Techora instructions live in `AGENTS.md` and these docs.
Retain existing license notices. Record provenance and permitted use for anything
included in future commercial packages; do not assume the README's license badge
alone describes all terms in `LICENSE.md`.

## Recommended composition

Use one alternate page JSON template per sellable design. It composes reusable
Techora sections, with section-local blocks for repeatable content. Shopify JSON
templates store section order and settings; sections expose editor presets and
schema controls. See [JSON templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates)
and [section schema](https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema).

The proposed dependency direction is:

```text
page.techora-<design>.json
  -> techora-* sections
       -> section-local techora-* blocks
       -> explicitly bundled techora-* snippets and assets
       -> native Shopify objects, filters, forms, and routes
```

Self-contained means a complete installable page pack, with independently usable
sections and their declared dependencies. It does not require duplicating every
helper into each Liquid file. No page pack requires a previous Techora purchase.

Proposed paths below are examples only, not files to create now:

| Path | Responsibility |
| --- | --- |
| `templates/page.techora-listicle-v1.json` | Original default composition and settings |
| `sections/techora-hero-v1.liquid` | Heading, introduction, media, CTA, editor schema |
| `sections/techora-reasons-v1.liquid` | Reorderable reason blocks |
| `sections/techora-comparison-v1.liquid` | Accessible comparison content |
| `sections/techora-product-offer-v1.liquid` | Native product selection and purchase UI |
| `sections/techora-faq-v1.liquid` | Reorderable questions and answers |
| `snippets/techora-image-v1.liquid` | Optional reusable responsive image rendering |
| `assets/techora-faq-v1.js` | Optional component interaction |
| `assets/techora-hero-v1.css` | Component styles if kept in an external asset |

Extract helpers only when useful reuse emerges. Avoid a mandatory sitewide core
script, framework, shared runtime registry, or giant section with every page mode.
Use section-local blocks initially; reusable snippets can share their rendering.
Introduce bundled `blocks/techora-*.liquid` theme blocks later only when their
editor benefits justify an explicitly tested feature requirement.

## Styling and assets

Give each section a Techora root and a Techora schema wrapper class. Establish
local defaults for typography, colors, spacing, box sizing, controls, and layout;
do not rely on the host's reset, font variables, button classes, or containers.
Use classes such as `techora-hero__title`, properties such as `--techora-gap`, and
instance IDs derived from `section.id` and, where needed, `block.id`.

Restrict every selector, including rich-text descendants and pseudo-elements, to
Techora-owned elements. A scoped wrapper adjustment may neutralize the host's
section grid; never change `.shopify-section` globally or use its `full-width`
class. Prefer local properties over broad resets or blanket `!important`.
Namespacing prevents outward collisions but cannot fully stop incoming host CSS.

Use component stylesheets or Shopify section stylesheet tags, with per-instance
settings passed through scoped CSS variables. Keep Liquid-dependent style values
outside static stylesheet blocks. Load assets from the components that need them,
without editing `layout/theme.liquid`; check repeated components for redundant
loading. Start with a system font stack and offer deliberate editor customization.

## Editor, content, and commerce

Expose practical settings for text, images, links, colors, content width, spacing,
alignment, and responsive layout. Prefer constrained meaningful choices over
arbitrary CSS input. Keep settings local to sections/blocks, with matching defaults
across sections; the tradeoff is that changing a page-wide color may require
editing several sections. Do not add dependencies on global theme settings.

Use native `product` and `image_picker` settings, and suitable text/rich-text/URL
controls. See Shopify's [input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings).
Leave store-specific selections empty in packages and provide helpful editor
empty states. Treat missing, deleted, or unavailable products as normal states.
Use Shopify-rendered prices and product URLs; never hardcode currency or domains.

Default CTAs can link to the selected product. When inline purchasing is included,
use native product forms with an explicit valid variant selection, availability
handling, quantity validation, and understandable errors. Do not assume a host
cart drawer API. Offer advanced commerce features only when implemented and tested.

Provide section presets and `block.shopify_attributes`. JavaScript must initialize
idempotently, scope queries to its instance, and clean up listeners on removal.
Handle relevant Theme Editor load/unload and selection events; see
[editor integration](https://shopify.dev/docs/storefronts/themes/best-practices/editor/integrate-sections-and-blocks).
Keep basic reading, navigation, and forms usable without script enhancements.

Avoid dependencies on the host's locale keys. Initially use self-contained schema
labels and editor-configurable customer-facing strings. If locale support later
requires additions to host locale files, package an explicit namespaced merge
procedure rather than replacing those files.

## Packaging and versioning

Each future release should include only its template, full dependency closure,
installation/uninstallation guide, changelog, asset provenance, compatibility
results, and a manifest of file paths, versions, and checksums. Generate packages
from an explicit allowlist; exclude host layouts, settings, locales, demo content,
credentials, and unrelated theme files.

Use major-versioned reusable component names from the first commercial release.
Compatible updates retain filenames; breaking schema or behavior changes use new
major-version filenames. Minor updates still require conflict checks and regression
testing across all page packs sharing those files.

Before installation, compare existing paths: identical files can be reused;
different files require an explicit upgrade/migration decision. Never overwrite
merchant edits silently. Preserve setting IDs and block types within a compatible
major version. Track shared files so removing one pack does not break another.

Template settings are shared by pages assigned to that template. Recommend
duplicating the alternate template for independently edited pages, or deliberately
designing supported dynamic sources; do not imply every assigned page receives
independent section settings.

The default installation uses the customer's existing layout and header/footer.
A headerless landing-page mode would require a separately designed and tested
additive layout, with its own integration implications. Defer that feature; do not
hide host chrome with CSS or remove the layout merely to achieve visual isolation.

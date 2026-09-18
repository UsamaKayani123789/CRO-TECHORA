# Techora Template 01: reusable editorial listicle

Status: proposed specification, awaiting approval. Documentation only; no Liquid,
CSS, JavaScript, snippets, sections, blocks, or JSON templates are created here.

Read alongside [architecture](../architecture.md),
[compatibility](../compatibility.md), [testing](../testing.md), and
[repository instructions](../../AGENTS.md). Filenames below describe future work.

## 1. Reference review and evidence boundaries

Reference: [Javvy editorial page](https://try.javvycoffee.com/rs01), inspected on
2026-09-18. Review used extracted page content and a rendered headless Chrome
inspection at 1440 x 1000, 390 x 844, and 768 x 1024 CSS pixels. Desktop/mobile
top, middle, and end views and a tablet top view were inspected. A fresh mobile
load confirmed the smaller-screen behavior. This was viewport emulation, not a
physical-device or exhaustive accessibility test. Exact breakpoints, all scroll
thresholds, and all visitor/experiment variations were not established.

No source code, stylesheet, script, branded asset, or marketing copy was copied
into the repository. Temporary rendered screenshots were used only for visual
inspection outside the repository; they are not package assets. Observations
below concern experience and structure. Everything after this review is an
original Techora proposal, not a description of the reference's implementation.

### Observed experience

The reference uses a sticky promotion strip, editorial headline, compact portrait
byline/date, summary, repeated numbered media-and-copy rows, contextual links,
then a highlighted offer and compact disclosure/policy footer. Desktop has a
narrow centered reading area, media left and text right. Mobile and tablet stack
heading, media/caption, and copy; a bottom promotional link persists during
reading. The end offer stacks on smaller screens.

Ten numbered editorial rows precede a conclusion framed as the next item. The
rows contain muted looping videos without visible controls; playback varied with
visibility. The end card combines product imagery, promotion, timer, shipping and
guarantee messaging. Header and offer timers displayed different values; their
underlying rules were not determined. The rendered markup had a second H1 in the
offer. The article contained no forms or variant selectors; visible commercial
links led to a separate offer route. These observations are from the
[reference page](https://try.javvycoffee.com/rs01).

At the checked desktop width the reading area was approximately 768px wide;
smaller views used approximately 16px side gutters. The mobile bottom CTA was
visible mid-article and absent from the captured footer view. These measurements
are reference observations, not pixel-matching requirements.

The [linked offer page](https://try.javvycoffee.com/rf01) exposes purchase-frequency,
quantity/package, gift, pricing, and further selection UI in its extracted content.
Only that boundary was reviewed; no cart, checkout, or purchase was attempted.
Its business logic is outside this listicle's observed functionality. Inline
commerce below is a proposed Techora extension, not something to reverse-engineer.

### Conversion flow to preserve in an original design

1. Establish the subject and context with a clear editorial heading and summary.
2. Build understanding through independently editable reasons and relevant media.
3. Provide contextual exits to the offer without forcing a click after every item.
4. Present a clear final product/offer with relevant terms and reassurance.
5. Keep an optional purchase path within reach on small screens.

No industry-specific claims, reason count, discount, guarantee period, colors,
typography, creator identity, or seasonal language carries into Techora defaults.

## 2. Proposed native architecture

Future composition file: `templates/page.techora-listicle-01-v1.json`.
Keep the existing host layout, header, footer, metadata, and app integration points.
Do not replace `templates/page.json` or modify global theme settings.

| Sequence | Component | Default role |
| --- | --- | --- |
| 1 | Announcement | Optional campaign message; normal flow by default |
| 2 | Article header | One H1, optional byline/date/disclosure, summary |
| 3 | Editorial content | Optional expanded introduction or media explanation |
| 4 | Reasons | One reorderable list; arbitrary merchant-authored reason count |
| 5 | CTA band | Optional transition or standalone CTA between section groups |
| 6 | Product offer | Primary conversion destination; owns optional sticky CTA and deadline |
| 7 | Trust content | Optional expanded guarantee/service reassurance |
| 8 | Article end | Closing note, disclosures, and optional policy links |

These are eight reusable section types, not eight mandatory page instances.
Do not add a separate section for each reason, author field, timer, or sticky bar.
The default article header already supports a summary; section 3 is optional.
Concise reassurance belongs inside the offer; section 7 is for longer content.

Template-01-specific work is the original preset composition, layout defaults,
spacing rhythm, and example content. All runtime section types remain reusable
for other listicles, advertorials, landing pages, and product education pages.
The list numbering mode is specialized to editorial lists, not to Template 01.

### Common schema and rendering contract

Every profile below inherits these local controls where applicable:

- `content_width` (range), `padding_top`/`padding_bottom` (range),
  `mobile_padding_top`/`mobile_padding_bottom` (range), `column_gap` (range).
- `background_color`, `text_color`, `accent_color`, `border_color` (color),
  `button_color`, `button_text_color` (color when a button exists).
- `heading_scale`, `body_scale`, `corner_radius` (bounded ranges),
  `text_alignment` (select). System typography by default; optional local
  `font_picker` controls must not require the host's font settings.
- Own section schema wrapper class, `techora-` classes, `--techora-` properties,
  and unique section/block-based IDs. No global selectors or host utility classes.
- No custom HTML/Liquid/JavaScript input needed for ordinary content editing.
  Use native `text`, `inline_richtext`, `richtext`, `image_picker`, `video`, `url`,
  `product`, `checkbox`, `select`, and `range` settings as appropriate.

Exact ranges and schema validation will be finalized during implementation.
Shopify's [input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings)
provide the native editor control types. Dates/deadlines use validated text input
with a documented format; do not invent a native date-time schema control.

Proposed responsive behavior is content-led: one column below 900px and two
columns when sufficient width exists. Test 768px and 1024px explicitly. Keep
reading text near 65-75 characters per line, flexible heights, and at least 16px
small-screen gutters. These are Techora defaults, not copied reference dimensions.

## 3. Section specifications

### S1. Announcement / campaign bar

1. **Purpose:** Surface a concise, optional campaign message before the article.
   It must not displace or replace the merchant's site header.
2. **Filename:** `sections/techora-announcement-v1.liquid`.
3. **Schema settings:** Common colors/spacing; `message` (inline_richtext),
   `supporting_text` (text), `link_label` (text), `destination_mode` (select:
   none/URL/offer anchor), `link` (url), `offer_key` (text), `sticky_enabled`
   (checkbox, false), `sticky_top_offset` (range), `show_offer_countdown`
   (checkbox, false). No discount value implied by default.
4. **Blocks:** None initially. A single message avoids an announcement carousel
   and unnecessary rotation, pause controls, and animation.
5. **Desktop:** Message and optional action/deadline align in a compact wrapping
   row. Optional sticky positioning stays inside Techora's own wrapper; verify
   ancestor constraints in each host.
6. **Mobile:** Allow multiple lines, legible type, and no horizontal scrolling.
   Timer may wrap below the message; never shrink content to force one line.
   Sticky mode is opt-in because the host may already have sticky navigation.
7. **Reuse:** Shared across all page types. Template 01 only supplies neutral
   presentation defaults. No brand header or navigation replacement.
8. **Dependencies:** Own CSS and shared CTA renderer if linked. Optional timer
   mirror uses the offer key and shared countdown controller described below;
   without a valid owner it renders the static message and no timer.
9. **Accessibility:** Semantic text/link, sufficient contrast, visible focus,
   descriptive action label, no marquee. Do not announce every timer tick.
   Sticky mode must not conceal keyboard focus or consume most of a zoomed view.
10. **Performance:** Text-first and no media, carousel, or script by default.
    Timer code is loaded only when needed and does not create a second clock.

### S2. Article header, byline, date, and summary

1. **Purpose:** Establish the topic, editorial context, authorship, and introduction.
2. **Filename:** `sections/techora-article-header-v1.liquid`.
3. **Schema settings:** Common controls; `eyebrow` (text), `title`
   (inline_richtext; blank falls back to `page.title`), `heading_level` (select:
   H1/H2, preset H1), `disclosure` (text), `show_author` (checkbox), `author_name`
   and `author_role` (text), `author_image` (image_picker), `author_link` (url),
   `show_date` (checkbox), `date_label` (text), `date_iso` (text, YYYY-MM-DD),
   `date_display` (text), `summary` (richtext), `show_divider` (checkbox).
4. **Blocks:** None for v1: one author and one date area. Multi-author bios can be
   added later without turning the header into a general block framework.
5. **Desktop:** Left-aligned editorial title within the reading width; compact
   avatar/byline row underneath, followed by the summary and optional divider.
6. **Mobile:** Natural title wrapping, flexible byline row, and full-width summary.
   No fixed height, text clipping, or manual desktop line breaks.
7. **Reuse:** Shared with advertorials and editorial landing pages. The preset
   hierarchy and spacing are Template 01 choices, not specialized runtime logic.
8. **Dependencies:** Native `page` object for title fallback; optional shared
   Techora media/byline snippets and component CSS. No blog/article object,
   custom author metaobject, host locale key, or external profile service required.
9. **Accessibility:** One page H1 in the default composition; use semantic `time`
   only for a valid machine-readable date. Portrait can have empty alt when the
   adjacent name supplies its meaning. Do not simulate editorial credentials.
10. **Performance:** Small responsive avatar with intrinsic dimensions. Static
    rendering; no date script, external author widget, or large hero by default.

Date policy: dates are merchant-maintained editorial information, not automatically
set to today's date or moved forward per visit. If invalid or empty, omit the date
and show an editor hint. A title containing a reason count is merchant text and
will not auto-sync across sections; the default title should omit a numeric count.

### S3. Editorial content / media explanation (optional)

1. **Purpose:** Provide a longer introduction, narrative interlude, or explanatory
   image-and-copy section outside the numbered list.
2. **Filename:** `sections/techora-editorial-content-v1.liquid`.
3. **Schema settings:** Common controls; `heading` (inline_richtext), `body`
   (richtext), `image` (image_picker), `image_alt` (text), `image_decorative`
   (checkbox), `caption` (text), `layout` (select: text/stacked/split),
   `media_side` (select), `image_ratio` (select), `image_fit` (select: contain/cover),
   `cta_label` (text), and CTA destination controls from section 4 below.
4. **Blocks:** None initially. Rich text handles paragraphs and lists; merchants
   can add/reorder additional section instances for separate narrative units.
5. **Desktop:** Text-only measure or image/copy split, with optional caption.
   No image means no reserved empty column.
6. **Mobile:** Heading, media, caption, then body/action in a single coherent
   reading sequence. Maintain the same meaningful DOM order at every width.
7. **Reuse:** Fully shared; useful for advertorial introductions and landing-page
   explanations. Optional in the default listicle to avoid repeating the summary.
8. **Dependencies:** Shared Techora image/CTA renderers and own CSS only.
9. **Accessibility:** H2 beneath the page title, meaningful alt or explicit
   decorative image, semantic lists and figure/caption relationships, proper links.
10. **Performance:** Responsive image sizes and dimensions; lazy-load only when
    actually below the fold. No animation or JavaScript required.

### S4. Reorderable numbered reasons

1. **Purpose:** Present the substantive editorial arguments as merchant-managed
   repeatable content, independent of product category and reason count.
2. **Filename:** `sections/techora-reasons-v1.liquid`.
3. **Schema settings:** Common controls; optional `heading` (inline_richtext),
   `show_numbers` (checkbox), `start_number` (range, default 1), `row_gap` (range),
   `desktop_media_side` (select: left/right/alternate), `image_ratio` (select),
   `media_column_width` (range), `show_dividers` (checkbox). Optional section
   heading changes reason headings from H2 to H3 to preserve hierarchy.
4. **Blocks:** Repeatable `techora-reason`, up to 50 within platform limits.
   Each has `heading` (inline_richtext), `body` (richtext), `media_type` (select:
   image/video/none), `image` (image_picker), `image_alt` (text),
   `image_decorative` (checkbox), `video` (native video picker), `video_poster`
   (image_picker), `video_accessibility_text` (richtext), `caption` (text),
   `caption_style` (select: plain/emphasized), `media_side` (select: inherit/left/right),
   `cta_label` (text), `cta_style` (select: text/button), and destination controls.
   Video is optional and subject to the media policy below. No nested blocks.
5. **Desktop:** Repeated image/copy rows, with default media left and text right.
   Heading, body, optional CTA form one text area; caption stays with media.
   Text-only reasons use the reading width. Alignment does not require equal
   heights or truncating copy.
6. **Mobile:** Heading -> media/caption -> body -> optional CTA, using one copy
   of each element. No horizontally swiped reasons or concealed primary content.
   Media is capped sensibly on tablet rather than always becoming screen-tall.
7. **Reuse:** Shared editorial list component. Numbering can be off for a benefits
   sequence; no hardcoded final item, category, total, or special eleventh reason.
8. **Dependencies:** Own CSS, shared Techora media and CTA helpers; optional
   media enhancement only if required. No page-wide reason registry or host blocks.
9. **Accessibility:** Native ordered-list semantics when numbered; every block
   exposes `block.shopify_attributes`. Avoid announcing duplicate visual numbers.
   DOM reading order remains logical even when grid placement changes. Captions
   remain text, not text burned into an image. Video needs controls and accessible
   equivalent content; no autoplay by default.
10. **Performance:** Responsive image-first output, dimensions reserved, lazy
    loading below the fold. Video uses a poster and no speculative playback/download.
    No duplication of desktop/mobile media or large serialized media collections.

**Reason management contract:** Merchants add, remove, duplicate, and drag reason
blocks inside the section. Numbering follows current block order using the start
offset; it is never typed into each heading. Removing a block closes the gap.
The original preset can contain five neutral demonstration reasons; it is not a
fixed count. With zero blocks, omit the storefront list and show an editor hint.
With an unfinished block, preserve its editor position; validate content before
release rather than silently renumbering differently from the editor.

Prefer one reasons section. A contextual CTA can be enabled on any reason block,
which gives merchants precise placement without nesting sections. To place a full
CTA band or another standalone section between groups, use two reasons sections
and set the second start offset explicitly. Cross-section counts are not automatically
linked; document this tradeoff. Shopify currently allows 25 sections per JSON
template and 50 blocks per section; see
[JSON templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates).

### S5. CTA band / editorial transition (optional)

1. **Purpose:** Offer a clear transition after a set of reasons or before the final
   offer, without forcing the conclusion to masquerade as a numbered reason.
2. **Filename:** `sections/techora-cta-band-v1.liquid`.
3. **Schema settings:** Common controls; `heading` (inline_richtext), `body`
   (richtext), `cta_label` (text), destination controls, `supporting_note` (text),
   `layout` (select: centered/inline), and optional `secondary_label` (text) plus
   `secondary_url` (url). One primary action, no fabricated offer value.
4. **Blocks:** None. This is a compact transition, not an offer builder.
5. **Desktop:** Centered heading/body/button or a wrapping text/action row.
6. **Mobile:** Stack text and full-width primary action; secondary link remains
   distinct and does not overlap or reduce the primary target size.
7. **Reuse:** Shared across all page types. Template 01 determines whether to
   include it; per-reason links may make an extra band unnecessary.
8. **Dependencies:** Shared CTA helper and own CSS; optional in-page offer anchor.
   It must not create an independent product form or price state.
9. **Accessibility:** Link for navigation, button only for a real action. Distinct
   action names, visible focus, sufficient contrast and target size. No empty links.
10. **Performance:** Static markup/styles, no image or script required.

### S6. Product / offer presentation

1. **Purpose:** Present the final commercial choice with real product data and
   clear terms. Own the product selection, purchase state, urgency, and sticky UI.
2. **Filename:** `sections/techora-product-offer-v1.liquid`.
3. **Schema settings:** Common controls; `offer_key` (text, unique validated slug),
   `product` (native product), `purchase_mode` (select: product_link/inline),
   `eyebrow` (text), `heading` (inline_richtext), `body` (richtext),
   `image_override` (image_picker), `image_alt` (text), `media_side` (select),
   `show_vendor`, `show_price`, `show_compare_at`, `show_savings`, `show_quantity`
   (checkboxes), `cta_label`, `choose_options_label`, `sold_out_label`,
   `unavailable_label`, `error_label` (text), `terms` (richtext), `terms_url` (url).
   Sticky and deadline settings are defined in sections 5 and 6 below; they belong
   to this schema. Titles/media can override presentation, never numeric prices.
4. **Blocks:** Up to six `techora-offer-detail` blocks: `heading` (text), `body`
   (richtext), `icon` (select from original bundled icons/none), `link` (url).
   These describe inclusions, delivery terms, or concise reassurance. They do
   not create extra products, discounts, gifts, or cart rules.
5. **Desktop:** Offer media and content/form in two columns, with terms near the
   action. Price, selected variant, availability, and CTA stay visually associated.
6. **Mobile:** Media above offer text and form. Native selection controls span
   available width; no nested scrolling form or full-screen upsell modal.
7. **Reuse:** Shared across landing pages, advertorials, and listicles. Template 01
   sets presentation defaults only. Default purchase mode is a native product link.
8. **Dependencies:** Selected Shopify product; own CSS; shared media, price,
   product-form, countdown, and sticky helpers as enabled. Inline mode uses a
   native product form and a self-contained Techora variant controller. No host
   cart drawer, subscription widget, review app, or proprietary checkout service.
9. **Accessibility:** H2 offer title, visible variant/quantity labels, readable
   terms, explicit availability, accessible error/status feedback. No duplicate
   form IDs, invented savings, preselected recurring purchase, or second H1.
10. **Performance:** One primary responsive image, no default gallery/carousel.
    Bounded variant data for supported inline products; otherwise a product link.
    Only enable interaction assets for features actually used.

**Product data and variants:** Use the selected product object, not the page's
global product context, hardcoded handles, or demo IDs. Product-link mode delegates
variant and selling-plan selection to the existing native product page and supports
catalogs beyond the inline feature set. No product selection means an editor hint
and no broken storefront purchase action.

Proposed v1 inline scope: a single product, ordinary one-time purchase, and at most
100 variants. Use a labeled native variant selector listing complete variant names
and their formatted prices, plus a small enhancement that updates price, compare-at
price, image, availability, and submit state together. This cap is a Techora
maintainability/UX decision, not Shopify's maximum. Never silently truncate a product
to the first variants. Higher-variant products, required selling plans, or unsupported
quantity/bundle rules fall back to product-link mode with an editor explanation.
Advanced per-option/high-variant selection is a future shared component extension.
See Shopify's [variant guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants)
and [high-variant guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants/support-high-variant-products).

Initialize from a valid selected or first available variant, tolerate a null variant,
and never replace a shopper's explicit unavailable choice with a different item.
The form submits the chosen variant ID and valid quantity. Sold-out selections
disable purchase; catalog removal/market restrictions produce a clear unavailable
state. Server/cart validation remains authoritative. Native form submission is
the baseline, with no interception required to update a host cart drawer. Without
JavaScript, the native selector's price-bearing labels identify the chosen option;
hide an enhanced standalone price readout if it would become stale. Keep normal
form validation and a native product-page fallback available.

**Pricing:** Render Shopify money values in the active storefront context. Show
compare-at price only when greater than the same variant's price. Calculate any
savings from that same pair, and label it accurately. Before a unique variant is
selected, show a clearly labeled range/from-price or omit the precise amount.
Do not calculate percentage savings from a mixture of product min/max values.
Respect unit pricing where applicable. Static promotion copy does not implement a
discount, gift, free-shipping rule, or subscription; those require separately
configured merchant commerce rules. Never show fabricated inventory urgency.

### S7. Guarantee / trust content (optional)

1. **Purpose:** Explain merchant-provided service, warranty, returns, or assurance
   information beyond the short notes already inside the offer.
2. **Filename:** `sections/techora-trust-content-v1.liquid`.
3. **Schema settings:** Common controls; `heading` (inline_richtext),
   `introduction` (richtext), `desktop_columns` (range, 1-3),
   `layout` (select: cards/plain), `icon_size` (bounded range).
4. **Blocks:** Up to six `techora-trust-item` blocks with `heading` (text),
   `body` (richtext), `icon` (select from original icons/none), `image`
   (image_picker for merchant-owned marks), `image_alt` (text),
   `link_label` (text), `link` (url).
5. **Desktop:** One to three readable columns; expand to rows for long policy text.
6. **Mobile:** Single-column cards or text; no trust-logo carousel.
7. **Reuse:** Fully shared across industries. No assumed money-back period,
   certification, test result, rating count, or payment-brand endorsement.
8. **Dependencies:** Own CSS and bundled original icon/media renderer. Merchant
   supplies truthful terms and authorized imagery; no live review service required.
9. **Accessibility:** Heading hierarchy, informative link names, meaningful image
   alternatives, no reliance on a checkmark or color alone to convey a promise.
10. **Performance:** Small icons or appropriately sized images; static content
    without counters, logo animation, or third-party embeds.

### S8. Article conclusion / disclosures / end links

1. **Purpose:** Close the editorial experience, make offer/editorial disclosures
   available, and provide optional relevant links before the existing theme footer.
2. **Filename:** `sections/techora-article-end-v1.liquid`.
3. **Schema settings:** Common controls; `heading` (inline_richtext),
   `closing_text` (richtext), `disclosure` (richtext), `show_policy_links`
   (checkbox), `show_copyright` (checkbox, false), `copyright_text` (text),
   `show_divider` (checkbox).
4. **Blocks:** Up to eight `techora-end-link` blocks with `label` (text), `url`
   (url), or `policy_source` (select: custom/privacy/terms/refund/shipping).
   A selected native shop policy is used only when configured; omit empty links.
5. **Desktop:** Readable disclosure above a wrapping link row. Keep long terms
   constrained to a comfortable measure rather than spanning the entire viewport.
6. **Mobile:** Stack or wrap links with generous targets and readable text.
   Disclosures remain visible and the sticky purchase bar must yield space here.
7. **Reuse:** Shared with advertorials and editorial landing pages. Template 01
   chooses its closing tone; the section is not a replacement site footer.
8. **Dependencies:** Standard shop policy objects or explicit merchant URLs;
   own CSS. Optional boundary marker lets Techora's sticky controller yield when
   this section enters view; no host footer selector required.
9. **Accessibility:** Logical end-of-article heading, navigation label for links,
   adequate disclosure contrast and size. Do not create an extra site-wide
   contentinfo landmark or make material terms readable only on hover.
10. **Performance:** Static text/links. No external badges, tracking pixel,
    automatic current-date insertion, or footer animation.

## 4. CTA placement and destination contract

All non-purchase CTAs are navigation links. Shared controls consist of
`destination_mode` (select: offer_anchor/product/custom_url), `offer_key` (text),
`product` (native product when product mode is used), and `link` (url when custom).
Use link pickers for normal URLs; use the separate key for in-page anchors rather
than assuming Shopify offers a section-picker setting. Blank destinations omit
the action and show an editor hint. No hardcoded external funnel URLs.

Supported placements: announcement link, individual reason CTA, optional editorial
CTA, optional CTA band, primary offer action, and offer-owned sticky action.
No automatic CTA after every reason and no independent add-to-cart form in each row.

Offer keys are stable merchant-controlled slugs mapped to a namespaced anchor,
for example `techora-offer-primary`. Validate format and uniqueness. Section/block
IDs still scope internal controls. Duplicating an offer requires a new key;
duplicate or missing matches disable dependent enhancements and generate editor
diagnostics. Installation checks must catch dangling anchors. Links to products
or custom URLs have no offer-section dependency.

Anchor scrolling respects reduced motion and an optional local sticky-header
offset. Do not globally alter host scrolling. When a control actively moves the
shopper to a form, place focus predictably on its heading or first required control.

## 5. Sticky CTA / add-to-cart contract

This is a **shared feature of S6**, not a separately selectable section. Its parent
filename is `sections/techora-product-offer-v1.liquid`; the renderer/controller may
be shared with future Techora commerce sections. It has no blocks of its own.

- **Purpose and settings:** Maintain access to the configured offer without
  duplicating variant state. `sticky_enabled` (checkbox, false), `sticky_devices`
  (select: small screens/all), `sticky_action` (select: view_offer/product_link/add_to_cart),
  `sticky_label` (text), `sticky_note` (text), `sticky_show_price` (checkbox),
  `sticky_bottom_offset` (range), `sticky_dismissible` (checkbox, true).
- **Desktop:** Off by default; optional compact bottom bar for tested layouts.
  Do not introduce an editorial sidebar solely to match a screenshot.
- **Mobile/tablet:** Single primary action, optional concise label/price, safe-area
  inset, and reserved layout space within the Techora page. Reveal after reading
  begins; suppress while the primary offer controls or article end are in view.
  In the editor, keep a selected feature inspectable without trapping the preview.
- **Reuse:** Shared offer capability. Template 01 can recommend view-offer mode;
  it never assumes every industry needs persistent direct purchase.
- **Dependencies and state:** Same selected product, variant, quantity, form ID,
  availability, and deadline as S6. In direct-submit mode, reference the original
  native form using the button's form association; do not clone it or create a
  second hidden variant input. Unsupported inline products force link/view mode.
  Require valid selection before direct submission; otherwise the action becomes
  choose-options and takes the shopper to the form. Failed validation/errors must
  also bring the main form into view. Do not add a default item silently.
- **Accessibility:** Real button for submit, link for navigation, adequate target
  size, clear close label, predictable focus, no modal overlay. Hide/suppress when
  space is insufficient, an editable field is focused, or the software keyboard
  would be obstructed. Never obscure terms, focused content, or consent controls.
- **Performance:** Scoped IntersectionObserver where available; no continuous
  scroll polling. No sticky UI without JavaScript; the primary offer remains usable.
  Initialize once and clean up on editor unload/reload. One sticky owner per page;
  duplicated offers retain static functionality and receive an editor conflict hint.

Do not query proprietary host header, drawer, consent-banner, or footer selectors.
Offer an explicit offset and disable option; compatibility testing determines
whether sticky mode is suitable for a given host. Do not portal content into the
host body to bypass ancestor constraints. If positioning is constrained, degrade
to an in-flow action rather than modifying the theme.

## 6. Optional urgency / deadline contract

This is a **shared S6 feature optionally mirrored by S1**, not another section.
Parent filename: `sections/techora-product-offer-v1.liquid`; mirrored display lives
in `sections/techora-announcement-v1.liquid`. No blocks are required.

- **Purpose and settings:** Communicate a real merchant-configured campaign end.
  Default off. `countdown_enabled` (checkbox), `deadline_iso` (text requiring a
  full ISO-8601 timestamp and explicit UTC offset), `deadline_label` (text),
  `deadline_display` (text for a readable date/time/zone), `expired_message` (text),
  `expiry_behavior` (select: hide_promotion/show_message).
- **Desktop:** Compact visible deadline near the offer action; announcement mirror
  can sit alongside its message without becoming a separate clock.
- **Mobile:** Wrap cleanly; retain the readable deadline instead of tiny numerals.
  Do not consume sticky-bar space with another timer.
- **Reuse:** Shared campaign display, independent of industry or Template 01.
- **Dependencies:** S6 owns the one deadline. An enabled S1 mirror resolves that
  owner by offer key and uses the same value and expiry event. No duplicate editable
  deadlines or global theme setting is introduced. Missing/ambiguous owner hides
  the mirror; an independently installed announcement remains useful without it.
- **Accessibility:** Include a static readable end date. Do not use a per-second
  live region; announce expiry at most once. No flashing, alarm sound, forced
  redirect, or purchase-blocking time pressure.
- **Performance:** One lightweight controller per active offer, shared by its
  displays. Stop updates at expiry, clean up on removal, and recompute from the
  timestamp when a hidden tab resumes instead of counting down local ticks.

Reject invalid/missing timestamps rather than displaying misleading zeros. With
JavaScript disabled, show only the static end date. On expiry hide timer/promotion
decoration or show the configured message; keep ordinary product navigation and
purchase available. Do not claim this client-side display enforces prices or
discounts; actual promotion schedules must be configured in Shopify separately.
No per-visitor resetting evergreen timer, fake inventory warning, or artificial
stock count. Local device time is a display limitation, not an authority for
commerce eligibility. Review campaign prose when the promotion ends.

## 7. Shared implementation boundaries and packaging

Potential reusable helpers, created only where actual repeated use warrants them:

| Future helper | Responsibility and consumers |
| --- | --- |
| `snippets/techora-media-v1.liquid` | Responsive image/video markup for header, editorial, reasons, offer, trust |
| `snippets/techora-byline-v1.liquid` | Author/date semantics, initially header and later advertorials |
| `snippets/techora-cta-v1.liquid` | Link rendering and destination contract across content sections |
| `snippets/techora-price-v1.liquid` | Consistent product/variant price rendering in main and sticky offers |
| `snippets/techora-product-form-v1.liquid` | Native form markup for supported inline products |
| `snippets/techora-countdown-v1.liquid` | Accessible deadline display |
| `snippets/techora-sticky-offer-v1.liquid` | Offer-owned sticky markup |
| `assets/techora-product-offer-v1.js` | Bounded variant enhancement and offer state |
| `assets/techora-sticky-offer-v1.js` | Visibility, focus handling, cleanup |
| `assets/techora-countdown-v1.js` | One explicit deadline and optional display mirrors |

Component CSS is namespaced and loaded by the owning component, using section
stylesheet tags or named Techora assets. No mandatory global CSS/JS include is
added to the layout. Shared code is included in every pack that requires it, with
version/checksum conflict handling as defined in the architecture document.

No `blocks/` theme-block dependency is required for v1: section-local blocks give
the requested add/remove/reorder behavior. No page builder, custom app, custom
metaobject definition, storefront token, tracking library, external font CDN, or
host snippet is required. Shopify's standard platform rendering remains expected.

Separate section settings cannot automatically become one shared page-wide
product/style setting. Default content CTAs point to the primary offer anchor so
only S6 needs a product choice. Merchants choosing direct product-link mode in
another section explicitly configure that section's native product setting.
Shared presentation defaults reduce initial setup, but later per-section styling
remains local. Pages sharing this template share its section settings; independent
editorial pages need duplicated alternate templates or a future deliberate dynamic
source design.

## 8. Patterns to avoid or deliberately change

These decisions are based on observed patterns and integration risks; they are
not claims about the reference site's internal code or measured performance.

| Pattern | Techora decision and reason |
| --- | --- |
| Fixed reason total / final offer framed as another reason | Real editable reason blocks; separate conclusion and offer prevent count-dependent logic |
| Autoplay looping media in every reason | Static images by default; merchant video is click-to-play with controls, poster, and accessible equivalent content |
| Full-width tablet media that dominates a viewport | Cap media size and retain readable pacing without losing content |
| Different visible countdowns | Single explicit deadline owner and optional mirror; no assumptions about the reference's timer algorithms |
| Strong inventory/urgency claims | No invented scarcity or default claim; accurate merchant terms only |
| Repeated promotional navigation treated as add-to-cart | Preserve clear link semantics; direct submit exists only with a valid native form state |
| Additional H1 in an offer | One default page H1; offer and reason headings follow the article hierarchy |
| Small dense offer disclosures | Readable disclosure text and nearby material terms; no fine-print-only recurring purchase |
| Gift/package/subscription funnel behavior | Exclude automated gifts, bundles, subscriptions, upsell modals, and custom checkout from v1; link to supported native product flows |
| Always-on top and bottom sticky content | Both optional, with device/space/focus checks and host-theme validation |
| Branded footer duplication | Article-end content before the existing site footer; copyright/policy repetition optional |
| Background media carrying meaningful information | Semantic images/video with text equivalents and responsive loading |
| Pixel-identical host-independent promise | Test scoped integration; host ancestors and aggressive CSS remain compatibility constraints |
| Copied badges, claims, creator identity, text, or visuals | Original neutral defaults and merchant-owned/licensed material only |

Video policy: the native Shopify video picker is optional. Do not ship an external
video platform SDK. Meaningful speech requires captions before release; all
essential visual information needs an equivalent text description. If the chosen
native media workflow cannot provide the required accessibility, use a still image
and text for v1 instead of adding a noncompliant video. Do not preload every video.

## 9. Acceptance checks before future release

Apply the existing [testing plan](../testing.md), plus:

- Reasons: test 0, 1, 5, 12, and 50 blocks; add/remove/reorder/duplicate, captions,
  no media, long text, disabled numbering, and split-section start offsets.
- Editor: every control, selection outline, missing-product hint, duplicate key,
  instance duplication, removal/reload, and no listener or ID duplication.
- Responsive: 320, 390, 768, 900, 1024, and 1440px; intermediate widths, portrait/
  landscape, long translations, zoom/reflow, and dynamic sticky height.
- Commerce: one/multiple variants, 100/101 variants to verify the inline boundary,
  missing/deleted products, sold-out selection, market availability, compare-at
  absent/below/above price, quantities, and required-selling-plan fallback.
- Form/sticky: selected variant and quantity are identical at submit; no-JS native
  path works; keyboard focus and server errors remain discoverable; footer, consent,
  keyboard, and host navigation do not get obscured. Repeated offers fail safely.
- Countdown: valid/invalid timestamp, explicit offsets, elapsed deadline, tab
  suspension, reload, missing owner, duplicate owner, and synchronized mirror.
- Portability: clean install using only packaged files in Skeleton and two
  independently structured OS 2.0 themes. Ordinary host pages remain unchanged.
- Accessibility: one H1, list semantics and reading order, meaningful alternatives,
  contrast, labels, keyboard use, reduced motion, screen reader, and captions.
- Performance: no default autoplay/video fetches, no duplicate responsive media,
  reserved media dimensions, correct LCP image priority, and no script for static
  sections. Set measured image/script budgets against the first original design;
  do not promise scores from this reference inspection.

## 10. Approval proposal

Approve this architecture before implementation: eight reusable section types,
one flexible reasons section using local blocks, native product-link mode as the
default, bounded optional inline purchasing, and offer-owned optional sticky and
deadline features. Use an original industry-neutral preset and static images by
default. Keep the host theme layout and all existing files intact.

Deferred: headerless custom layout, subscription/bundle/gift automation, advanced
high-variant inline picker, nested theme-block framework, reviews integration,
automatic cross-section reason counting, and guaranteed universal sticky behavior.

Approval of the design authorizes only the implementation scope subsequently
requested. It does not authorize deployment, publication, or a Git push. No
implementation has begun.

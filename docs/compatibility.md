# Compatibility policy

Status: targets and limitations only. No Techora page pack has been tested or
certified against any theme yet.

## Supported design target

Target existing Shopify Online Store 2.0 themes that support alternate page JSON
templates and standard Liquid sections. Customers should need no page builder,
app subscription, build tooling, or external JavaScript library to run a pack.
The development repository is a host for testing, not a required base theme.

The initial baseline is JSON templates plus sections with section-local blocks.
Do not infer support for every optional theme feature merely from the OS 2.0 label.
Check platform limits when releasing; Shopify currently documents up to 25
sections per JSON template and 50 blocks per section in its
[JSON template reference](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates).

## Integration boundaries

| Area | Techora responsibility | Host dependency or limitation |
| --- | --- | --- |
| Page content | Own markup, styles, assets, and editor settings | Existing layout still surrounds content |
| Width and spacing | Own responsive containers and scoped wrapper rules | Ancestor max-width, padding, clipping, or transforms may constrain output |
| Typography and controls | Explicit local defaults and settings | Aggressive host selectors can still override them |
| Header/footer | Retain the existing layout by default | Theme controls store chrome, navigation, and much metadata |
| Products | Native product settings and Shopify data | Merchant must select products available to the storefront |
| Cart | Native product form or product link | Automatic host drawer refresh is not promised |
| Apps | No required app runtime | Third-party scripts may alter forms or styling; test claimed integrations |
| Localization | Editable UI text, Shopify money/URL handling | Full translation, RTL, and market coverage require explicit testing |
| Theme Editor | Presets, selectable blocks, lifecycle-safe scripts | Future theme-block features require a declared tested baseline |

Namespaced CSS is not a sandbox. Do not advertise universal pixel-identical
rendering or guaranteed full viewport width across arbitrary themes. Document
observed exceptions and implement scoped Techora fixes when feasible. Host file
changes are a last resort, with an explanation of necessity and upgrade impact.

Use a neutral content wrapper by default, avoiding a nested `main` landmark in
themes that already provide one. Validate heading order, an appropriate page H1,
and landmarks within the complete host page. Skeleton itself does not wrap
`content_for_layout` in `main`, so a single landmark assumption will not fit all
hosts.

## Future installation procedure

1. Back up or duplicate the destination theme and inventory existing Techora files.
2. Check the release's supported theme versions and dependency manifest.
3. Add only the package files, resolving any filename/version conflicts first.
4. Assign the alternate template to the intended page through Shopify Admin when
   available. Template availability follows Shopify's theme workflow; an unpublished
   preview is not the same as making a template available on the live theme.
5. Configure products, images, content, and styling in the Theme Editor. Independent
   content across several pages may require separate alternate templates.
6. Preview and run the release checks before any separately authorized deployment.

Do not replace `templates/page.json`, `layout/theme.liquid`, `config/settings_data.json`,
global styles, or host locale files as a routine installation step. A page pack is
not a full theme ZIP to upload as a replacement theme.

For upgrades, preserve merchant-edited template data and migrate deliberately.
For removal, reassign affected pages first, then remove only files with no remaining
references from other templates or packs. Provide a rollback path through backups.

## Evidence required for support claims

Test on Skeleton and at least two independently structured OS 2.0 themes: include
a conventional section-based theme such as Dawn and a modern theme-block host.
Record exact versions or commits, browsers, dates, enabled apps, and exceptions.
Theme names alone are not sufficient evidence. Test commercial third-party themes
only with authorized access. See [testing](testing.md) for the acceptance matrix.

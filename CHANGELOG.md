# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2021-04-08
### Added
- none
### Changed
- **Resolved issues with Configurables/Swatches:**
    - Empty swatches now render correctly
    - Dropdown attributes now render correctly with Swatches enabled. Therefore `Magento_ConfigurableProduct/templates/product/view/options/configurable.phtml` needed to be moved to `Magento_ConfigurableProduct/templates/product/view/type/options/configurable.phtml`
    - `initConfigurableOptions_{product_id}()` changed to `initConfigurableDropdownOptions_{product_id}()` in order to add `$block->getJsonConfig()` in a `<script>` block instead passing it through the `x-data=` attribute.
    - PLPs no longer try to render non-swatch attributes
    
   Thanks to Antonio Carboni (Magenio) for reporting
    
Please refer to [1.1.1] for all diff changes 

### Removed
- none

## [1.1.0] - 2021-04-02
### Added
- **Compare products sidebar added**
  
  Thanks to Timon de Groot and Sean van Zuidam (Mooore) for contributing.

- **Product Attributes listing added**
  
  The `product.attributes` was added to product detail pages, which list all available attributes for a product (as an addition to the 'featured attributes' listed on top of PDPs).  

  Thanks to Sean van Zuidam (Mooore) for contributing.
  
- **In Product Listings, price and image can now be updated**
  
  To support swatches on PLPs, the price and image can now be updated with events:
  `update-gallery-<?= (int)$productId ?>` and `update-prices-<?= (int)$productId ?>`
  
  See `Magento_Catalog/templates/product/list/item.phtml`

- **Empty checkout now shows message**
  
  If no checkout installed, a message is now being shown.
  
  See `Magento_Checkout/layout/checkout_index_index.xml`

- **Checkout registration now works**
  
  After checkout, the registration option is now shown.
  
  See `Magento_Checkout/templates/registration.phtml`
  
  Thanks to Vincent Marmiesse (PH2M) for contributing.

- **A footer column container was introduced**

  A wrapper column for the footer was added `Magento_Theme::html/footer/column.phtml`
  
  See `Magento_Directory/layout/default.xml` for usage.

- **Login as customer is now fully compatible**
  
  The default login as customer from the admin area now works, including the customer-account-area toggle to allow accounts to be controlled by store-owners.

  See `/Magento_LoginAsCustomerFrontendUi/`
  
  Thanks to Barry vd. Heuvel (Fruitcake) for contributing.  
  
- **Currency switchers were added**
  
  The footer now loads a currency switcher.
  
  See `Magento_Directory/layout/default.xml` and `Magento_Directory/templates/currency.phtml`
  
- **Store and Language switchers were added**
  
  The footer now loads a store and language switcher, if required.
  
  See `Magento_Store/layout/default.xml`, `Magento_Store/templates/switch/languages.phtml` and `Magento_Store/templates/switch/stores.phtml`

- **Configurable swatches were added**
  
  Swatches are now loaded on PLP and PDP pages. The swatches in layered navigation were already present but are now better styled and include tooltips.
  
  See `/Magento_Swatches/` for all changes.
  
  An important new pattern is the extension of already existing Alpine Components by merging/extending the initObjects.
  As present in `Magento_Swatches/templates/product/view/renderer.phtml`:
  
  ```
      <?= $block->getChildHtml('options_configurable_js') ?>
      <?= $block->getChildHtml('options_swatch_js') ?>
  
      <script>
          function initConfigurableSwatchOptions_<?= (int) $productId ?>() {
              const configurableOptionsComponent = initConfigurableOptions(
                  '<?= (int) $productId ?>',
                  <?= /* @noEscape */ $block->getJsonConfig() ?>
              );
              const swatchOptionsComponent = initSwatchOptions(
                  <?= /* @noEscape */ $block->getJsonSwatchConfig() ?>
              );
  
              // here we merge `configurableOptionsComponent` with `swatchOptionsComponent`
              return Object.assign(
                  configurableOptionsComponent,
                  swatchOptionsComponent
              );
          }
      </script>

  ```
- **Default Footer links were added**
  
  A static phtml file was added to load common footer links.
  
  See `Magento_Theme/layout/default.xml` and `Magento_Theme/templates/html/footer/links.phtml`
### Changed
- **Improved bundle option performance**
  
  On bundled products with large amount of options, `x-ref` used excessively in a loop caused performance issues.
  These were refactored to `document.querySelector()` and `document.getElementById()` lookups.
  
  See `Magento_Bundle/templates/catalog/product/view/type/bundle/options.phtml` and https://gitlab.hyva.io/hyva-themes/magento2-default-theme/-/issues/93
  
  Thanks to Gautier Masdupuy (Diglin) for reporting.

- **product.info.options.wrapper was reintroduced**
  
  https://gitlab.hyva.io/hyva-themes/magento2-default-theme/-/issues/117
  
  For compatibility with 3rd party modules / extensibility.
  See `Magento_Catalog/layout/catalog_product_view.xml`
  
  Thanks to Laura Folco for reporting.
  
- **Limiter and ViewMode in toolbar no longer break layout when empty**
  
  The Limiter and ViewMode now render empty containers to prevent the layout from breaking when they are disabled.
  
  Thanks to Judith Demets (Storefront) for contributing

- **Alt and Title fallbacks are added to the PDP image gallery**
  
  See `Magento_Catalog/templates/product/view/gallery.phtml`
  
  Thanks to Aad Mathijssen (Isaac) for contributing.

- **Tax display on PDP is now correct**
  
  https://gitlab.hyva.io/hyva-themes/magento2-default-theme/-/issues/115
  
  Previously, if catalog prices were excluding tax but displayed with tax, the tax would not be added correctly.
  
  Thanks to Antonio Carboni (Magenio) for reporting

- **Configurable prices now show 'as low as' until all options selected**
  
  See `Magento_Catalog/templates/product/view/price.phtml`
  
  Thanks to Konrad Langenberg (imi) for contributing.

- **min and max screenheight values are better named**
  
  Previously, `min-height: 50vh` was declared as `min-h-50`, this has been changed to `min-h-screen-50`.
  
  See `web/tailwind/tailwind.config.js`
  
  Please check your codebase for any instance of `min-h-{25,50,75}` as well as `max-h-{25,50,75}` and replace with `min-h-screen-X` and `max-h-screen-X` values. 

  Thanks to Sean Zuidam (Mooore) for reporting

- **Cart shipping totals now display correctly**

  See `Magento_Checkout/templates/cart/totals.phtml`
  
  Thanks to Victor Chiriac (Mage Check) for contributing.

- **Alpine Component JS for Configruable options moved to child block**
  
  In order to make `initConfigurableOptions()` reusable and extendable, it was moved into `Magento_ConfigurableProduct::product/view/options/js/configurable-options.phtml`

  This was needed for integration of Configurable Swatches without duplication of a large amount of JavaScript code.
  
  See `Magento_ConfigurableProduct/layout/catalog_product_view_type_configurable.xml`, `Magento_ConfigurableProduct/templates/product/view/options/configurable.phtml` and `Magento_ConfigurableProduct/templates/product/view/options/js/configurable-options.phtml`.

- **Customer account edit page password error message moved**
  
  for better layout stability, the structure of `Magento_Customer/templates/form/edit.phtml` changed to prevent layout shifts.

- **Customer menu in header now respects `isAllowed` setting for account registration**
  
  See `Magento_Customer/templates/header/customer-menu.phtml`
  
  Thanks to Barry vd. Heuvel (Fruitcake) for contributing.
  
- **Customer account edit prefix field now respects `isPrefixRequired` setting**
  
  Thanks to Philipp Neuteufel (Limesoda) for reporting.  

- **Footer newsletter subscription styled more consistently**
  
  The footer newsletter form is now styled more in line with the rest of the layout.

- **PDP reviews now take current storeview in account**
  
  The `store` header was previously missing from GraphQL calls.
  
  See `Magento_Review/templates/customer/list.phtml` and `Magento_Review/templates/form.phtml`

- **Orders and Returns for guests now correctly toggles between Email and ZIP code`
  
  Previously, the change event of the "Find Order By" dropdown was handling the wrong event data.
  
  `event.originalTarget.value` was changed into `event.target.value`.
  
  See `Magento_Sales/templates/guest/form.phtml`
  
- **The cart drawer now respects the `display sidebar` setting for minicart**
  
  If `checkout/sidebar/display` is set to `no`, the cart-drawer is no longer loaded.
  
  See `Magento_Theme/layout/default.xml`
  
  Thanks to Rik Willems (RedKiwi) for contributing.

- **The product slider now checks for `visiblity` and `status` of linked products**
  
  Upsells, Cross-sells and Related products are not filtered by graphql on storefront visiblity.
  We therefore added the `visibility` and `status` attributes to the graphql result so that we can filter on them.
  
  See `Magento_Theme/templates/elements/slider.phtml`

- **Escaping was improved in the topmenu**
  
  See `Magento_Theme/templates/html/header/topmenu.phtml`
  
  Thanks to Aad Mathijssen (Isaac) for contributing.

- **Browsersync improvements**
  
  Improvements to browsersync config were made to prevent form-key issues.
  
  Thanks to Javier Villanueva (Media Lounge) for contributing.
     
### Removed
- **`<script>` tags no longer contain the `defer` attribute**
  
  Since these have no effect...

- **Duplicate function declarations in Alpine Components**
  
  For IE11 compatibility we used to declare function names in Alpine init objects with an explicit function name. These have now been removed.
  For example:
  ```
  { addToWishlist: function addToWishlist(productId) { ... } }
  ```
  became:
  ```
  { addTowishList(productId) { ... } }
  ``` 

## [1.0.0] - 2021-02-15
### Added
- Initial Release added

### Changed
- see [1.0.0]

### Removed
- none

# Beta releases
#### [0.2.0] - 2021-02-03
#### [0.1.0] - 202-12-09

[Unreleased]: https://gitlab.hyva.io/hyva-themes/magento2-default-theme/-/compare/1.1.1...master
[1.1.1]: https://gitlab.hyva.io/hyva-themes/magento2-default-theme/-/compare/1.1.0...1.1.1
[1.1.0]: https://gitlab.hyva.io/hyva-themes/magento2-default-theme/-/compare/1.0.0...1.1.0
[1.0.0]: https://gitlab.hyva.io/hyva-themes/magento2-default-theme/-/compare/0.2.0...1.0.0
[0.2.0]: https://gitlab.hyva.io/hyva-themes/magento2-default-theme/-/compare/0.1.0...0.2.0
[0.1.0]: https://gitlab.hyva.io/hyva-themes/magento2-default-theme/-/tags/0.1.0

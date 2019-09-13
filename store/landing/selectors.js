import _ from 'lodash';
import lang from '../../utils/language';

const getPage = store => {
  const { page_content, merchandising_data } = store.landingReducer.data
  page_content.forEach((item) => {
    if (item.id_attribute) {
      let merchandiseData = merchandising_data.filter(merchandise => merchandise.page_id.includes(item.id_attribute))
      item.data[lang].banners = [...merchandiseData];
    }
  })
  return store.landingReducer.data;
};

const getCartStatus = (store, listingId) => {
  const selectedCartItem = _.find(store.cartReducer.data.items, ({ listing_id }) => listingId === listing_id);
  return !!selectedCartItem;
};

const getListings = (store, ownProps) => {
  if (store.landingReducer.listings[ownProps.index]) {
    let listings = [];
    store.landingReducer.listings[ownProps.index].forEach((product) => {
      const { product_details, listing_info } = product;
      if (listing_info === null || product_details === null) {
        listings = [];
        return;
      }
      const {
        pricing, listing_id: listingId, product_id: productId,
      } = listing_info;
      const {
        mrp, offer_price: sellingPrice, discount_per_mrp,
      } = pricing;
      const { catalog_details } = product_details;
      const { cached_product_details } = product_details.product_details_vo;
      listings.push({
        mrp,
        listingId,
        productId,
        sellingPrice,
        discountPerMrp: discount_per_mrp,
        catalogId: catalog_details.catalog_id,
        itemType: catalog_details.item_type_name,
        image: cached_product_details.media.gallery_media[0].url,
        brand: catalog_details && catalog_details.attribute_map.brand.attribute_values[0].value,
        name: cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
        isAddedToCart: getCartStatus(store, listingId),
      });
    });
    return listings;
  }
  return [];
};

const getZonedItems = (store) => {
  const results = [];
  store.landingReducer.items.content.forEach((rv) => {
    const { products = [] } = store.wishlistReducer;
    const wishListProductIds = products && products.length > 0 &&
      (products.map(w => w.product_id) || []);

    let wishlistId = '';
    products.forEach((p) => {
      if (p.product_id === rv.product_details.product_id) {
        wishlistId = p.wishlist_id;
      }
    });

    const { variant_preferred_listings, variant_id } = rv;
    const { cached_product_details = {}, cached_variant = {} } = rv.product_details.product_details_vo;
    const variantAttributes = cached_variant[variant_id].attribute_map;
    if (variant_preferred_listings[variant_id]) {
      const variantDetails = variant_preferred_listings[variant_id][0];
      results.push({
        nm: cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
        br: rv.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
        im: cached_product_details.media.gallery_media[0].url,
        pr: variantDetails.pricing.offer_price.display_value,
        cd: variantDetails.pricing.offer_price.currency_code,
        mrp: variantDetails.pricing.mrp.display_value,
        tuin: variantAttributes.tuin.attribute_values[0].value,
        id: variantDetails.listing_id,
        pid: rv.product_details.product_id,
        vid: rv.variant_id,
        cid: rv.product_details.catalog_details.catalog_id,
        wishlistId,
        isWishlisted: wishListProductIds && wishListProductIds.indexOf(rv.product_details.product_id) !== -1,
        isAddedToCart: getCartStatus(store, variantDetails.listing_id),
      });
    }
  });
  return results;
};

const getIsListingLoading = store => store.landingReducer.ui.isListingLoading;

export {
  getPage,
  getListings,
  getZonedItems,
  getIsListingLoading,
};

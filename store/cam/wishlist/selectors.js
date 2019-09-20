import _ from 'lodash';
import constants from '../../../constants';

const getWishListResults = (store) => {
  if (store.wishlistReducer.data) {
    const { data } = store.wishlistReducer;

    const img_url = constants.mediaDomain;

    const newData = [];

    data && data.length > 0 && data.forEach((item) => {
      //console.log('wishlistItem', item);
      // const variant = Object.keys(item.product_details.product_details_vo.cached_variant)[0];
      // const variant_info = item.variant_preferred_listings[variant][0];
      const variant = item.variant_preferred_listings ? Object.keys(item.variant_preferred_listings)[0] : '';
      const variant_info = item.variant_preferred_listings ? item.variant_preferred_listings[variant][0] : {};
      const variant_key = item && item.product_details && item.product_details.product_details_vo && item.product_details.product_details_vo.cached_variant && item.product_details.product_details_vo.cached_variant.length > 0 && Object.keys(item.product_details.product_details_vo.cached_variant)[0];
      const tuinId = item && item.product_details && item.product_details.product_details_vo && item.product_details.product_details_vo.cached_variant && item.product_details.product_details_vo.cached_variant.length > 0
      ? item.product_details.product_details_vo.cached_variant[variant_key].attribute_map && item.product_details.product_details_vo.cached_variant[variant_key].attribute_map.tuin.attribute_values[0].value : null;
      const values = store.cartReducer && store.cartReducer.data && store.cartReducer.data.items && store.cartReducer.data.items.length > 0 && store.cartReducer.data.items.map(e => e.product_details && e.product_details.product_id).indexOf(item.product_id);
      newData.push({
        wishlist_id: item.wishlist_id,
        listing_id: variant_info.listing_id,
        product_id: item.product_id,
        tuin_id: tuinId,
        variant_id: variant_info.variant_id,
        name: item && item.product_details && item.product_details.product_details_vo.cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
        brand_name: item && item.product_details && item.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
        img: `${img_url}/${item}` && item.product_details && item.product_details.product_details_vo.cached_product_details.media.gallery_media[0].url,
        cur: variant_info && variant_info.selling_price && variant_info.selling_price.display_currency_code,
        price: variant_info.selling_price && variant_info.selling_price.display_value,
        mrp: variant_info.mrp && variant_info.mrp.display_value,
        wishlisted_price: item.wishlisted_price,
        changed_price: item.changed_price,
        changed_status: item.changed_status,
        catalog_id: item && item.product_details && item.product_details.catalog_details.catalog_id,
        itemType: item && item.product_details && item.product_details.catalog_details.item_type_name,
        inventory_count: variant_info.total_inventory_count,
        buttonValue: (values === -1) || store.cartReducer.data.items.length === 0,
      });
    });

    return newData;
  }
  return [];
};

const getPaginationDetails = (store) => {
  const {
    number = 0, total_pages = 0, total_elements = 0, number_of_elements = 0, size = 10,
  } = store.wishlistReducer.paginationData;

  return {
    size,
    number,
    total_pages,
    total_elements,
    number_of_elements,
  };
};

const getLoader = (store) => {
  if (store.wishlistReducer.ui.loading) {
    return store.wishlistReducer.ui.loading;
  }
};

const getNotifyLoading = (store) => {
  if (store.wishlistReducer.ui.notifyLoading) {
    return store.wishlistReducer.ui.notifyLoading;
  }
};

const getCartStatus = (store, listingId) => {
  const selectedCartItem = _.find(store.cartReducer.data.items, ({ listing_id }) => listingId === listing_id);
  return !!selectedCartItem;
};

const recentlyViewed = store => store.wishlistReducer.recentlyViewed.map((rv) => {
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
  const variantDetails = variant_preferred_listings[variant_id][0];
  return {
    nm: cached_product_details.attribute_map.calculated_display_name.attribute_values[0].value,
    br: rv.product_details.catalog_details.attribute_map.brand.attribute_values[0].value,
    im: cached_product_details && cached_product_details.media && cached_product_details.media.gallery_media && cached_product_details.media.gallery_media[0] && cached_product_details.media.gallery_media[0].url,
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
  };
});

const getProductsDetails = store => store.wishlistReducer.products;

export {
  getWishListResults, getPaginationDetails, getLoader,
  getProductsDetails, getNotifyLoading, recentlyViewed, getCartStatus,
};

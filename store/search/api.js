import _ from "lodash";
import axios from "axios";
import constants from "../helper/constants";

const getSearchResultsApi = ({
  categoryFilter,
  country,
  pageSize,
  query,
  language,
  facetFilters,
  pageNum,
  fl,
  isListed,
  categoryTree,
  shippingDetails,
  sort
}) => {
  const options = {
    country,
    facetFilters,
    language,
    pageNum,
    pageSize,
    query,
    fl,
    isListed,
    shippingDetails,
    sort
  };
  if (categoryTree) {
    options.categoryId = categoryFilter.id;
  } else {
    options.categoryFilter = categoryFilter;
  }
  return axios
    .get(
      `${constants.SEARCH_API_URL}/search${
        categoryTree ? "/browseByCatId/" : ""
      }?query=${escape(JSON.stringify(options))}`
    )
    .then(({ data }) => {
      if (data.categoryFilter) {
        data.categoryFilter.parentCategories.forEach(parentCategory => {
          parentCategory.canonicalId = _.kebabCase(parentCategory.name);
          parentCategory.childCategories.forEach(childCategory => {
            childCategory.canonicalId = _.kebabCase(childCategory.name);
          });
        });
      }
      const { products, noOfProducts } = data.productResponse;
      const hasMore =
        (pageNum - 1) * pageSize + products.length !== noOfProducts;

      data.paginationDetails = {
        pageSize,
        pageNum,
        hasMore
      };
      data.searchDetails = {
        query,
        facetFilters,
        categoryFilter,
        shippingDetails,
        sort,
        categoryTree
      };
      data.geoDetails = {
        country,
        language
      };
      data.hardCodedValues = {
        fl,
        isListed
      };
      return { data };
    });
};
const getAutoSuggestions = data => {
  if (data.toLocaleLowerCase()[0] === "r") {
    const autoData = {
      searchTerm: data,
      suggestions: [
        {
          value: "Running shoes in Shoes",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        },
        {
          value: "Running shoes in Mens Shoes",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        },
        {
          value: "Running shoes in Women Shoes",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        },
        {
          value: "Running shoes in Fitness",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        },
        {
          value: "Running shoes in Men Reebok",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        },
        {
          value: "Running shoes in Men Adidas",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        },
        {
          value: "Running shoes in Women under 500",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        },
        {
          value: "Running shoes without Lace",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        }
      ],
      recommendedProducts: [
        {
          value: "Nike orange running shoe",
          price: 129.9,
          currency: "AED",
          img: "/static/img/bg-img/nike-orange.png",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        },
        {
          value: "Nike White running shoe",
          price: 139.9,
          currency: "AED",
          img: "/static/img/bg-img/nike-white.png",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        },
        {
          value: "Nike orange running shoe",
          price: 129.9,
          currency: "AED",
          img: "/static/img/bg-img/nike-orange.png",
          id: Math.random()
            .toString(36)
            .substr(2, 9)
        }
      ]
    };
    return autoData;
  } else {
    return [];
  }
};
export default { getSearchResultsApi, getAutoSuggestions };

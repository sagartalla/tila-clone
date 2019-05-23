const formats = {
  'GET_SEARCH_RESULTS_FULFILLED': {
    "productResponse": {
      value: {
        "noOfProducts": {
          value: 'Number'
        },
        "products": {
          canBeEmpty: true,
          value: [{
            "id": {
              value: 'String'
            },
            "attributes": {
              value: {
                "itemType": {
                  value: 'String'
                },
                "brand": {
                  value: []
                },
                "media_unrestricted_images": {
                  value: []
                },
                "productId": {
                  value: 'String'
                },
                'calculated_display_name': {
                  value: []
                },
              }
            },
            "variantAdapters": {
              value: [{
                "id": {
                  value: 'String'
                },
                "attributes": {
                  value: {}
                },
                "listingAdapters": {
                  canBeEmpty: true,
                  value: [{
                    "id": {
                      value: 'String'
                    },
                    "attributes": {
                      value: {
                      "listingPrice": {value:'Number'},
                      "sellerName": {value: 'String'},
                      "discount": {value: 'Number'},
                      "mrp": {value: 'Number'},
                      "listingId": {value: "String"},
                      "isActive": {value: 'Boolean'},
                      "sellingPrice": {value: 'Number'},
                      "sellerId": {value: "String"},
                      "tilaWarehouse": {value: 'Boolean'},
                      "rank": {value: 'Number'},
                      "inStock": {value: 'Boolean'},
                      "currency": {value: "String"},
                      "variantId": {value: "String"},
                      "listingCountry": {value: "String"},
                      "stockCount":{ value: 'Number'}
                    }}
                  }]
                }
              }]
            },
            "flags": {
              value: {
                "comparable": {
                  value: 'Boolean'
                }
              }
            }
          }]
        }
      }
    },
    "categoryFilter": {
      isOptional: true,
      value: {
        "nodes": {
          value: {
            "RANDOM_ID": {
              value: {
                "id": {value: "String"},
                "name": {value: "String"},
                "count": {value: 'Number'},
                "prdPath": {value: "String"},
                "child": {
                  canBeEmpty: true,
                  value: 'RECURSE'
                }
              }
            }
          }
        }
      }
    },
    "facetResponse": {
      value: {
      "facets": {
        value: [{
          "Id": {value: "String"},
          "Type": {value: "String"},
          "attributeDisplayName": {value: "String"},
          "OfVariant": {value: 'Boolean'},
          "attributeName": {value: "String"},
          "Values": {
            value:[{
                "Count": {value: 'Number'},
                "Param": {value: 'String'},
                "attributeValue": {value: "String"},
              },
              {
                "Count": {value: 'Number'},
                "Param": {value: "String"},
                "attributeValue": {value: "String"}
              }]
            }
          }]
        }
      }
    }
  },
}

export default formats

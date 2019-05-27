const formats = {
    'GET_SEARCH_RESULTS_FULFILLED': {
        "productResponse": {
            "VALUE_TYPE": {
                "noOfProducts": {
                    "VALUE_TYPE": 'Number'
                },
                "products": {
                    "canBeEmpty": true,
                    "VALUE_TYPE": [{
                        "id": {
                            "VALUE_TYPE": 'String'
                        },
                        "attributes": {
                            "VALUE_TYPE": {
                                "itemType": {
                                    "VALUE_TYPE": 'String'
                                },
                                "brand": {
                                    "VALUE_TYPE": []
                                },
                                "media_unrestricted_images": {
                                    "VALUE_TYPE": []
                                },
                                "productId": {
                                    "VALUE_TYPE": 'String'
                                },
                                'calculated_display_name': {
                                    "VALUE_TYPE": []
                                },
                            }
                        },
                        "variantAdapters": {
                            "VALUE_TYPE": [{
                                "id": {
                                    "VALUE_TYPE": 'String'
                                },
                                "attributes": {
                                    "VALUE_TYPE": {}
                                },
                                "listingAdapters": {
                                    "canBeEmpty": true,
                                    "VALUE_TYPE": [{
                                        "id": {
                                            "VALUE_TYPE": 'String'
                                        },
                                        "attributes": {
                                            "VALUE_TYPE": {
                                                "listingPrice": { "VALUE_TYPE": 'Number' },
                                                "sellerName": { "VALUE_TYPE": 'String' },
                                                "discount": { "VALUE_TYPE": 'Number' },
                                                "mrp": { "VALUE_TYPE": 'Number' },
                                                "listingId": { "VALUE_TYPE": "String" },
                                                "isActive": { "VALUE_TYPE": 'Boolean' },
                                                "sellingPrice": { "VALUE_TYPE": 'Number' },
                                                "sellerId": { "VALUE_TYPE": "String" },
                                                "tilaWarehouse": { "VALUE_TYPE": 'Boolean' },
                                                "rank": { "VALUE_TYPE": 'Number' },
                                                "inStock": { "VALUE_TYPE": 'Boolean' },
                                                "currency": { "VALUE_TYPE": "String" },
                                                "variantId": { "VALUE_TYPE": "String" },
                                                "listingCountry": { "VALUE_TYPE": "String" },
                                                "stockCount": { "VALUE_TYPE": 'Number' }
                                            }
                                        }
                                    }]
                                }
                            }]
                        },
                        "flags": {
                            "VALUE_TYPE": {
                                "comparable": {
                                    "VALUE_TYPE": 'Boolean'
                                }
                            }
                        }
                    }]
                }
            }
        },
        "categoryFilter": {
            "isOptional": true,
            "VALUE_TYPE": {
                "nodes": {
                    "VALUE_TYPE": {
                        "RANDOM_ID": {
                            "VALUE_TYPE": {
                                "id": { "VALUE_TYPE": "String" },
                                "name": { "VALUE_TYPE": "String" },
                                "count": { "VALUE_TYPE": 'Number' },
                                "prdPath": { "VALUE_TYPE": "String" },
                                "child": {
                                    "canBeEmpty": true,
                                    "VALUE_TYPE": 'RECURSE'
                                }
                            }
                        }
                    }
                }
            }
        },
        "facetResponse": {
            "VALUE_TYPE": {
                "facets": {
                    "VALUE_TYPE": [{
                        "Id": { "VALUE_TYPE": "String" },
                        "Type": { "VALUE_TYPE": "String" },
                        "attributeDisplayName": { "VALUE_TYPE": "String" },
                        "OfVariant": { "VALUE_TYPE": 'Boolean' },
                        "attributeName": { "VALUE_TYPE": "String" },
                        "Values": {
                            "VALUE_TYPE": [{
                                "Count": { "VALUE_TYPE": 'Number' },
                                "Param": { "VALUE_TYPE": 'String' },
                                "attributeValue": { "VALUE_TYPE": "String" },
                            },
                            {
                                "Count": { "VALUE_TYPE": 'Number' },
                                "Param": { "VALUE_TYPE": "String" },
                                "attributeValue": { "VALUE_TYPE": "String" }
                            }]
                        }
                    }]
                }
            }
        }
    },
    'GET_PRODUCT_FULFILLED': [
        {
            "product_details": {
                "VALUE_TYPE": {
                    "catalog_details": {
                        "VALUE_TYPE": {
                            "catalog_id": {
                                "VALUE_TYPE": "String"
                            },
                            "item_type_name": {
                                "VALUE_TYPE": "String"
                            },
                            "attribute_map": {
                                "VALUE_TYPE": {
                                    "RANDOM_ID": {
                                        "VALUE_TYPE": {
                                            "name": {
                                                "VALUE_TYPE": "String"
                                            },
                                            "visible": {
                                                "VALUE_TYPE": "Boolean"
                                            },
                                            "searchable": {
                                                "VALUE_TYPE": "Boolean"
                                            },
                                            "filterable": {
                                                "VALUE_TYPE": "Boolean"
                                            },
                                            "attribute_values": {
                                                "VALUE_TYPE": []
                                            }
                                        }
                                    }
                                }
                            },
                            "comparable": {
                                "VALUE_TYPE": "Boolean"
                            }
                        }
                    },
                    "product_details_vo": {
                        "VALUE_TYPE": {
                            "cached_product_details": {
                                "VALUE_TYPE": {
                                    "catalog_id": {
                                        "VALUE_TYPE": "String"
                                    },
                                    "product_id": {
                                        "VALUE_TYPE": "String"
                                    },
                                    "item_type_name": {
                                        "VALUE_TYPE": "String"
                                    },
                                    "media": {
                                        "VALUE_TYPE": {
                                            "gallery_media": {
                                                "VALUE_TYPE": [
                                                    {
                                                        "type": {
                                                            "VALUE_TYPE": "String"
                                                        },
                                                        "url": {
                                                            "VALUE_TYPE": "String"
                                                        },
                                                        "caption": {
                                                            "VALUE_TYPE": "String"
                                                        },
                                                        "order": {
                                                            "VALUE_TYPE": "String"
                                                        },
                                                        "restricted": {
                                                            "VALUE_TYPE": "Boolean"
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                    "rich_product_desc": {
                                        "canBeEmpty": "Boolean",
                                        "VALUE_TYPE": []
                                    },
                                    "attribute_map": {
                                        "VALUE_TYPE": {
                                            "RANDOM_ID": {
                                                "VALUE_TYPE": {
                                                    "name": {
                                                        "VALUE_TYPE": "String"
                                                    },
                                                    "visible": {
                                                        "VALUE_TYPE": "Boolean"
                                                    },
                                                    "searchable": {
                                                        "VALUE_TYPE": "Boolean"
                                                    },
                                                    "filterable": {
                                                        "VALUE_TYPE": "Boolean"
                                                    },
                                                    "attribute_values": {
                                                        "VALUE_TYPE": []
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "cached_variant": {
                                "VALUE_TYPE": {
                                    "RANDOM_ID": {
                                        "VALUE_TYPE": {
                                            "attribute_map": {
                                                "VALUE_TYPE": {
                                                    "RANDOM_ID": {
                                                        "VALUE_TYPE": {
                                                            "name": {
                                                                "VALUE_TYPE": "String"
                                                            },
                                                            "visible": {
                                                                "VALUE_TYPE": "Boolean"
                                                            },
                                                            "searchable": {
                                                                "VALUE_TYPE": "Boolean"
                                                            },
                                                            "filterable": {
                                                                "VALUE_TYPE": "Boolean"
                                                            },
                                                            "attribute_values": {
                                                                "VALUE_TYPE": []
                                                            }
                                                        }

                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "product_id": {
                        "VALUE_TYPE": "String"
                    }
                }
            },
            "variant_preferred_listings": {
                "isOptional": true,
                "VALUE_TYPE": {
                    "RANDOM_ID": {
                        "VALUE_TYPE": [
                            {
                                "listing_id": {
                                    "VALUE_TYPE": "String"
                                },
                                "product_id": {
                                    "VALUE_TYPE": "String"
                                },
                                "variant_id": {
                                    "VALUE_TYPE": "String"
                                },
                                "seller_rating": {
                                    "VALUE_TYPE": "Number"
                                },
                                "mrp": {
                                    "VALUE_TYPE": {
                                        "currency_code": {
                                            "VALUE_TYPE": "String"
                                        },
                                        "money_value": {
                                            "VALUE_TYPE": "Number"
                                        },
                                        "display_value": {
                                            "VALUE_TYPE": "String"
                                        }
                                    }
                                },
                                "mrp_currency": {
                                    "VALUE_TYPE": "String"
                                },
                                "selling_price": {
                                    "VALUE_TYPE": {
                                        "currency_code": {
                                            "VALUE_TYPE": "String"
                                        },
                                        "money_value": {
                                            "VALUE_TYPE": "Number"
                                        },
                                        "display_value": {
                                            "VALUE_TYPE": "String"
                                        }
                                    }
                                },
                                "merchant_sku_id": {
                                    "VALUE_TYPE": "String"
                                },
                                "created_timestamp": {
                                    "VALUE_TYPE": "String"
                                },
                                "inhouse_seller": {
                                    "VALUE_TYPE": "Boolean"
                                },
                                "tila_warehouse": {
                                    "VALUE_TYPE": "Boolean"
                                },
                                "total_inventory_count": {
                                    "VALUE_TYPE": "Number"
                                },
                                "selling_price_currency": {
                                    "VALUE_TYPE": "String"
                                },
                                "seller_name": {
                                    "VALUE_TYPE": "String"
                                },
                                "merchant_id": {
                                    "VALUE_TYPE": "String"
                                },
                                "country_code": {
                                    "VALUE_TYPE": "String"
                                },
                                "inventory_list": {
                                    "VALUE_TYPE": [
                                        {
                                            "inventory_id": {
                                                "VALUE_TYPE": "String"
                                            },
                                            "inventory_city": {
                                                "VALUE_TYPE": "String"
                                            },
                                            "city_code": {
                                                "VALUE_TYPE": "String"
                                            },
                                            "stock_count": {
                                                "VALUE_TYPE": "Number"
                                            },
                                            "inventory_name": {
                                                "VALUE_TYPE": "String"
                                            },
                                            "zipcode": {
                                                "VALUE_TYPE": "String"
                                            },
                                            "dispatch_days": {
                                                "VALUE_TYPE": "Number"
                                            },
                                            "dispatch_hours": {
                                                "VALUE_TYPE": "Number"
                                            }
                                        }
                                    ]
                                },
                                "max_limit_per_user": {
                                    "VALUE_TYPE": "Number"
                                },
                                "accepts_returns": {
                                    "VALUE_TYPE": "Boolean"
                                },
                                "max_days_to_return": {
                                    "VALUE_TYPE": "Number"
                                },
                                "shipping": {
                                    "VALUE_TYPE": {
                                        "listing_id": {
                                            "VALUE_TYPE": "String"
                                        },
                                        "inventory_id": {
                                            "VALUE_TYPE": "String"
                                        },
                                        "shipping_days": {
                                            "VALUE_TYPE": "Number"
                                        },
                                        "shippable": {
                                            "VALUE_TYPE": "Boolean"
                                        }
                                    }
                                },
                                "warranty_details": {
                                    "VALUE_TYPE": []
                                },
                                "pricing": {
                                    "VALUE_TYPE": {
                                        "id": {
                                            "VALUE_TYPE": "String"
                                        },
                                        "total_discount_on_sp": {
                                            "VALUE_TYPE": {
                                                "currency_code": {
                                                    "VALUE_TYPE": "String"
                                                },
                                                "money_value": {
                                                    "VALUE_TYPE": "Number"
                                                },
                                                "display_value": {
                                                    "VALUE_TYPE": "String"
                                                }
                                            }
                                        },
                                        "total_discount_mrp": {
                                            "VALUE_TYPE": {
                                                "currency_code": {
                                                    "VALUE_TYPE": "String"
                                                },
                                                "money_value": {
                                                    "VALUE_TYPE": "Number"
                                                },
                                                "display_value": {
                                                    "VALUE_TYPE": "String"
                                                }
                                            }
                                        },
                                        "offer_price": {
                                            "VALUE_TYPE": {
                                                "currency_code": {
                                                    "VALUE_TYPE": "String"
                                                },
                                                "money_value": {
                                                    "VALUE_TYPE": "Number"
                                                },
                                                "display_value": {
                                                    "VALUE_TYPE": "String"
                                                }
                                            }
                                        },
                                        "price": {
                                            "VALUE_TYPE": {
                                                "currency_code": {
                                                    "VALUE_TYPE": "String"
                                                },
                                                "money_value": {
                                                    "VALUE_TYPE": "Number"
                                                },
                                                "display_value": {
                                                    "VALUE_TYPE": "String"
                                                }
                                            }
                                        },
                                        "mrp": {
                                            "VALUE_TYPE": {
                                                "currency_code": {
                                                    "VALUE_TYPE": "String"
                                                },
                                                "money_value": {
                                                    "VALUE_TYPE": "Number"
                                                },
                                                "display_value": {
                                                    "VALUE_TYPE": "String"
                                                }
                                            }
                                        },
                                        "discount_per_sp": {
                                            "VALUE_TYPE": {
                                                "currency_code": {
                                                    "VALUE_TYPE": "String"
                                                },
                                                "money_value": {
                                                    "VALUE_TYPE": "Number"
                                                },
                                                "display_value": {
                                                    "VALUE_TYPE": "String"
                                                }
                                            }
                                        },
                                        "discount_per_mrp": {
                                            "VALUE_TYPE": {
                                                "currency_code": {
                                                    "VALUE_TYPE": "String"
                                                },
                                                "money_value": {
                                                    "VALUE_TYPE": "Number"
                                                },
                                                "display_value": {
                                                    "VALUE_TYPE": "String"
                                                }
                                            }
                                        },
                                        "quantity": {
                                            "VALUE_TYPE": "Number"
                                        },
                                        "extra_offers": {
                                            "VALUE_TYPE": "Number"
                                        },
                                        "actions": {
                                            "VALUE_TYPE": []
                                        },
                                    }
                                },
                                "return_policy": {
                                    "VALUE_TYPE": {
                                        "policies": {
                                            "VALUE_TYPE": {
                                                "SELLER": {
                                                    "VALUE_TYPE": {
                                                        "allowed": { "VALUE_TYPE": "Boolean" },
                                                        "duration": { "VALUE_TYPE": "Number" },
                                                        "duration_unit": { "VALUE_TYPE": "String" },
                                                    }
                                                },
                                                "TILA": {
                                                    "VALUE_TYPE": {
                                                        "allowed": { "VALUE_TYPE": "Boolean" },
                                                        "duration": { "VALUE_TYPE": "Number" },
                                                        "duration_unit": { "VALUE_TYPE": "String" },
                                                    }
                                                }
                                            }
                                        },
                                        "preferred_policy": { "VALUE_TYPE": "String" },
                                        "extra_duration": { "VALUE_TYPE": "Number" },
                                        "extra_duration_unit": { "VALUE_TYPE": "String" },
                                        "extra_duration_refund": { "VALUE_TYPE": "Number" }
                                    }
                                },
                                "exchange_policy": {
                                    "VALUE_TYPE": {
                                        "policies": {
                                            "VALUE_TYPE": {
                                                "SELLER": {
                                                    "VALUE_TYPE": {
                                                        "allowed": { "VALUE_TYPE": "Boolean" },
                                                        "duration": { "VALUE_TYPE": "Number" },
                                                        "duration_unit": { "VALUE_TYPE": "String" },
                                                    }
                                                },
                                                "TILA": {
                                                    "VALUE_TYPE": {
                                                        "allowed": { "VALUE_TYPE": "Boolean" },
                                                        "duration": { "VALUE_TYPE": "Number" },
                                                        "duration_unit": { "VALUE_TYPE": "String" },
                                                    }
                                                }
                                            }
                                        },
                                        "preferred_policy": { "VALUE_TYPE": "String" }
                                    }
                                },
                                "replacement_policy": {
                                    "VALUE_TYPE": {
                                        "policies": {
                                            "VALUE_TYPE": {
                                                "SELLER": {
                                                    "VALUE_TYPE": {
                                                        "allowed": { "VALUE_TYPE": "Boolean" },
                                                        "duration": { "VALUE_TYPE": "Number" },
                                                        "duration_unit": { "VALUE_TYPE": "String" },
                                                    }
                                                },
                                                "TILA": {
                                                    "VALUE_TYPE": {
                                                        "allowed": { "VALUE_TYPE": "Boolean" },
                                                        "duration": { "VALUE_TYPE": "Number" },
                                                        "duration_unit": { "VALUE_TYPE": "String" },
                                                    }
                                                }
                                            }
                                        },
                                        "preferred_policy": { "VALUE_TYPE": "String" }
                                    }
                                },
                                "warranty_policy": {
                                    "VALUE_TYPE": {
                                        "policies": {
                                            "VALUE_TYPE": {
                                                "RANDOM_ID": {
                                                    "isOptional": true,
                                                    "VALUE_TYPE": {
                                                        "duration": { "VALUE_TYPE": "Number" },
                                                        "duration_unit": { "VALUE_TYPE": "String" },
                                                        "warranty_sla": { "VALUE_TYPE": "Number" },
                                                        "sla_breach_refund": { "VALUE_TYPE": "Number" },
                                                        "summary": { "VALUE_TYPE": "String" },
                                                        "covered": { "VALUE_TYPE": "String" }
                                                    }
                                                }
                                            }
                                        },
                                        "preferred_policy": { "VALUE_TYPE": "String" },
                                        "warranty_sla": { "VALUE_TYPE": "Number" },
                                        "sla_breach_refund": { "VALUE_TYPE": "Number" }
                                    }
                                },
                                "active": { "VALUE_TYPE": "Boolean" }
                            }
                        ]
                    }
                }
            },
            "country_code": { "VALUE_TYPE": "String" },
            "product_id": { "VALUE_TYPE": "String" },
            "blocked": { "VALUE_TYPE": "Boolean" }
        }
    ]
}

export default formats

const getOrdersData = (store) => {
  return [{
    id: '407-6785852-5808340',
    shippingTo: {
      name: 'Vinoth Thirumalai',
      address: '1600 Pennsylvania Ave NW, Washington, DC, 20500. USA.',
      phone: '1202-456-1111',
    },
    orderItems: [
      {
        id: '1',
        products: [
          {
            id: '1',
            img: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/shirt/PSHTFXDNSEZVRTM2S8/GALLERY/MEDIAFII9DXPT4GPHNCGWFDRV15/1-web-desktop-product.jpg',
            name: 'Ginger Women Shirt Multicolor',
          },
          {
            id: '2',
            img: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/shoe/PSHOQYHGGWFU33MGGM/GALLERY/MEDIAOWI988VRHV8KCRAKRQB23V/43563421_4036030161.jpg',
            name: 'Fancy Woodlan Shoe',
          }
        ],
        status: 'PACKED'
      }, {
        id: '2',
        products: [
          {
            id: '1',
            img: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBAEVVF5MXM4HOTU/GALLERY/MEDIAGDUK41QF5PIA51CXRAELOA/apple-iphone-se-na-original-imaey5ny62z823wb.jpeg',
            name: 'Faltu Iphone',
          }
        ],
        status: 'PACKED'
      }
    ],
  }, {
    id: '407-6785852-5808340',
    shippingTo: {
      name: 'Vinoth Thirumalai',
      address: '1600 Pennsylvania Ave NW, Washington, DC, 20500. USA.',
      phone: '1202-456-1111',
    },
    orderItems: [
      {
        id: '1',
        products: [
          {
            id: '1',
            img: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/shirt/PSHTFXDNSEZVRTM2S8/GALLERY/MEDIAFII9DXPT4GPHNCGWFDRV15/1-web-desktop-product.jpg',
            name: 'Ginger Women Shirt Multicolor',
          },
          {
            id: '2',
            img: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/shoe/PSHOQYHGGWFU33MGGM/GALLERY/MEDIAOWI988VRHV8KCRAKRQB23V/43563421_4036030161.jpg',
            name: 'Fancy Woodlan Shoe',
          }
        ],
        status: 'PACKED'
      }, {
        id: '2',
        products: [
          {
            id: '1',
            img: 'https://dev-catalog-imgs.s3.ap-south-1.amazonaws.com/catalog/mobile/PMOBAEVVF5MXM4HOTU/GALLERY/MEDIAGDUK41QF5PIA51CXRAELOA/apple-iphone-se-na-original-imaey5ny62z823wb.jpeg',
            name: 'Faltu Iphone',
          }
        ],
        status: 'PACKED'
      }
    ],
  }
  ];
};

export { getOrdersData };
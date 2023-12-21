
'use strict'

const { BadRequestError } = require("../core/error.response");
const { clothes, electronics, product, furnitures } = require("../models/product.model");
const { rFindAllProductDraftForShop, rFindAllProductPublishedForShop, rPublishProductForShop, rUnPublishProductForShop, rSearchProductByUser } = require("../models/repositories/product.repo");

// define factory class to create product
class ProductFactory {

  /**
   * type: clothing, electronic
   * payload
   */

  // Level switch, you need to edit code at here when you add new product type

  /*
  static async createProduct(product_type, payload) {
    switch (product_type) {
      case 'Clothes':
        return new Clothes(payload).createProduct();

      case 'Electronics':
        return new Electronics(payload).createProduct();

      default:
        throw new BadRequestError(`Invalid product types:: ${product_type}`)
    }
  }
  */

  // Level another, do not edit code at here when you add new product type
  // 1. Create model Furniture Schema
  // 2. Take Strategy:
  static productRegistry = {} // object contain key-class

  static sRegisterProductType(product_type, classRef) {
    ProductFactory.productRegistry[product_type] = classRef;
  }

  static async sCreateProduct(product_type, payload) {
    const productClass = ProductFactory.productRegistry[product_type];
    if (!productClass) throw new BadRequestError(`Invalid Product Types ${product_type}`);

    return new productClass(payload).createProduct();
  }


  // query
  static async sFindAllProductDraftForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, is_draft: true };

    return await rFindAllProductDraftForShop({ query, limit, skip });
  }

  static async sFindAllProductPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, is_published: true };

    return await rFindAllProductPublishedForShop({ query, limit, skip });
  }

  // 
  static async sPublishProductForShop({ product_shop, product_id }) {
    return await rPublishProductForShop({ product_shop, product_id });
  }

  static async sUnPublishProductForShop({ product_shop, product_id }) {
    return await rUnPublishProductForShop({ product_shop, product_id });
  }

  static async sSearchProducts({ keySearch }) {
    return await rSearchProductByUser({ keySearch });
  }
}

// define base Product class
class Product {
  constructor({
    product_name,
    product_thumb,
    product_description,
    product_price,
    product_type,
    product_shop,
    product_attributes,
    product_quantity
  }) {

    this.product_name = product_name;
    this.product_thumb = product_thumb;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
    this.product_quantity = product_quantity;
  }

  // create new Product
  async createProduct(product_id) {
    return await product.create({ ...this, _id: product_id });
  }
}

// define sub-class for different product type
// Clothes
class Clothes extends Product {
  async createProduct() {
    const newClothing = await clothes.create({ ...this.product_attributes, product_shop: this.product_shop });

    if (!newClothing) throw new BadRequestError('Create newClothing error!');

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) throw new BadRequestError('Create newProduct error!');

    return newProduct;
  }
}

// electronic
class Electronics extends Product {
  async createProduct() {
    const newElectronic = await electronics.create({ ...this.product_attributes, product_shop: this.product_shop });

    if (!newElectronic) throw new BadRequestError('Create newElectronic error!');

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) throw new BadRequestError('Create newProduct error!');

    return newProduct;

  }
}

// furniture
class Furnitures extends Product {
  async createProduct() {
    const newFurniture = await furnitures.create({ ...this.product_attributes, product_shop: this.product_shop });

    if (!newFurniture) throw new BadRequestError('Create newFurniture error!');

    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct) throw new BadRequestError('Create newProduct error!');

    return newProduct;

  }
}

// register product types

ProductFactory.sRegisterProductType('Electronics', Electronics);
ProductFactory.sRegisterProductType('Clothes', Clothes);
ProductFactory.sRegisterProductType('Furnitures', Furnitures);

// ProductFactory.registerProductType('Electronics', Electronics);

module.exports = ProductFactory;
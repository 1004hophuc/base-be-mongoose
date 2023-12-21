const express = require('express');
const productController = require('../../controllers/product.controller');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.get('/search/:keySearch', asyncHandler(productController.getListSearchProduct))

// authentication
router.use(authentication);

router.post('', asyncHandler(productController.createProduct))
router.put('/publish/:productId', asyncHandler(productController.publishProductForShop))
router.put('/un-publish/:productId', asyncHandler(productController.unPublishProductForShop))

router.get('/drafts/all', asyncHandler(productController.getAllProductDraftForShop))
router.get('/published/all', asyncHandler(productController.getAllProductPublishedForShop))

module.exports = router
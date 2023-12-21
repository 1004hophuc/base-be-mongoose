const express = require('express');
const { asyncHandler } = require('../../helpers/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const locationController = require('../../controllers/location.controller');
const router = express.Router();

router.get('/list/province', asyncHandler(locationController.getListAllProvince));
router.get('/list/district/:provinceId', asyncHandler(locationController.getListAllDistrict));
router.get('/list/ward/:provinceId/:districtId', asyncHandler(locationController.getListAllSubDistrict));

router.get('/list/church', asyncHandler(locationController.getListAllChurch));



router.post('/create/province', asyncHandler(locationController.createProvince))


// authentication
router.use(authentication);

// router.post('', asyncHandler(productController.createProduct))
// router.put('/publish/:productId', asyncHandler(productController.publishProductForShop))
// router.put('/un-publish/:productId', asyncHandler(productController.unPublishProductForShop))

// router.get('/drafts/all', asyncHandler(productController.getAllProductDraftForShop))
// router.get('/published/all', asyncHandler(productController.getAllProductPublishedForShop))

module.exports = router
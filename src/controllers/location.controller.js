'use strict'

const { SuccessResponse } = require("../core/success.response");
const LocationService = require("../services/location.service");

class LocationController {
  // query
  getListAllProvince = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get all province success!',
      metadata: await LocationService.sGetAllProvince()
    }).send(res)
  }

  getListAllDistrict = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get all district success!',
      metadata: await LocationService.sGetAllDistrict({ province_code: +req.params.provinceId })
    }).send(res)
  }

  getListAllSubDistrict = async (req, res, next) => {
    console.log('req.params::: ', req.params);
    new SuccessResponse({
      message: 'Get all sub-district success!',
      metadata: await LocationService.sGetAllSubDistrict({ province_code: +req.params.provinceId, district_code: +req.params.districtId })
    }).send(res)
  }

  getListAllChurch = async (req, res, next) => {
    console.log('req.query:: ', req.query);
    new SuccessResponse({
      message: 'Get list church success!',
      metadata: await LocationService.sGetAllChurch({ province_code: req.query.provinceId, district_code: req.query.districtId, sub_district_code: req.query.wardId })
    }).send(res)
  }

  createProvince = async (req, res, next) => {
    new SuccessResponse({
      message: 'Create province success!',
      metadata: await LocationService.sCreateProvince()
    }).send(res)
  }
}

module.exports = new LocationController()
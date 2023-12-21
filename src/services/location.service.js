'use strict'

const provinceModel = require("../models/province.model");
const districtModel = require("../models/district.model");
const subDistrictModel = require("../models/sub-district-model");
const { isNull, isNil, isUndefined } = require("lodash");
// const fs = require('fs');
// const path = require('path');

// const xlsx = require('xlsx');
// const { Types } = require("mongoose");
// const subDistrictModel = require("../models/sub-district-model");
class LocationService {
  static sGetAllProvince = async () => {
    return await provinceModel.find().select('name code_province -_id').lean();
  }

  static sGetAllDistrict = async ({ province_code }) => {
    return await districtModel.find({ province_code: Number(province_code) }).select('name code_district province_code -_id').lean()
  }

  static sGetAllSubDistrict = async ({ province_code, district_code }) => {
    return await subDistrictModel.find({ province_code: Number(province_code), district_code: Number(district_code) }).select('name code_sub_district district_code province_code -_id').lean()
  }

  static sGetAllChurch = async ({ province_code, district_code, sub_district_code }) => {
    console.log('sub_district_code:', sub_district_code)
    console.log('district_code:', district_code)
    console.log('province_code:', province_code)
    console.log('11111');

    if (!isUndefined(province_code) && isUndefined(district_code) && isUndefined(sub_district_code)) {
      console.log('province_code111:: ', province_code);
      console.log('22222');
      return this.sGetAllChurchOfProvince({ province_code });
    }

    if (!isUndefined(district_code) && isUndefined(sub_district_code)) {
      console.log('3333');
      return this.sGetAllChurchOfDistrict({ district_code, province_code });
    }

    if (!isUndefined(sub_district_code)) {
      console.log('4444');
      let arrData = [];

      for (let index = 0; index < 5; index++) {
        const data = {
          name: `Church ${index + 1}`,
          sub_district_code,
          time: ['9h', '14', '16h']
        }
        arrData.push(data)
      }

      return arrData;
    }
  }

  static sGetAllChurchOfProvince = async ({ province_code }) => {
    if (!isUndefined(province_code)) {
      let arrData = [];

      for (let index = 0; index < 15; index++) {
        const data = {
          name: `Church ${index + 1}`,
          province_code,
          time: ['9h', '14', '16h']
        }
        arrData.push(data)
      }

      return arrData;
    }
  }

  static sGetAllChurchOfDistrict = async ({ province_code, district_code }) => {
    if (!isUndefined(province_code) && !isUndefined(district_code)) {
      let arrData = [];

      for (let index = 0; index < 8; index++) {
        const data = {
          name: `Church ${index + 1}`,
          province_code,
          district_code,
          time: ['9h', '14', '16h']
        }
        arrData.push(data)
      }

      return arrData;
    }
  }

  // static sCreateProvince = async () => {
  //   const dirPath = path.join(__dirname, './excel_files/Danh sách quận huyện phường xã thuộc Tỉnh Đồng Tháp.xls');
  //   console.log('dirPath:', dirPath)

  //   let workbook = xlsx.readFile(dirPath);
  //   let workSheet = workbook.Sheets[workbook.SheetNames[0]];
  //   let range = xlsx.utils.decode_range(workSheet["!ref"]);
  //   let dataFinal = [];

  //   for (let row = range.s.r; row < range.e.r; row++) {
  //     let data = [];
  //     for (let col = range.s.c; col < range.e.c; col++) {
  //       let cell = workSheet[xlsx.utils.encode_cell({ r: row, c: col })];
  //       data.push(cell.v);
  //     }

  //     dataFinal.push(data);
  //   }
  //   dataFinal.shift();
  //   console.log('dataFinal:', dataFinal)
  //   console.log('dataFinal?.[0][0]:: ', dataFinal?.[0][0]);
  //   console.log('dataFinal?.[0][1]::: ', dataFinal?.[0][1]);


  //   const dataSubDistrict = dataFinal.map((item) => {
  //     return { subDistrict: item[4], subDistrict_code: item[5], districtCode: item[3], districtProvince: item[1] }
  //   })

  //   const uniqueCombinations = new Set();


  //   for (let index = 10; index < dataSubDistrict.length; index++) {
  //     const element = dataSubDistrict[index];

  //     const payLoadSubDistrict = {
  //       name: element.subDistrict,
  //       code_sub_district: +element?.subDistrict_code,
  //       province_code: +element?.districtProvince,
  //       district_code: +element?.districtCode
  //     }

  //     await subDistrictModel.create(payLoadSubDistrict);

  //   }

  //   // const filteredData = dataDistrict.filter(item => {
  //   //   const key = `${item.district}-${item.district_code}`;
  //   //   if (!uniqueCombinations.has(key)) {
  //   //     uniqueCombinations.add(key);
  //   //     return true;
  //   //   }
  //   //   return false;
  //   // });

  //   // console.log('filteredData:', filteredData)

  //   // for (let index = 0; index < filteredData.length; index++) {
  //   //   const element = filteredData[index];

  //   //   const payLoadDistrict = {
  //   //     name: element.district,
  //   //     code_district: +element?.district_code,
  //   //     province_code: +dataFinal?.[0][1]
  //   //   }

  //   //   await districtModel.create(payLoadDistrict);
  //   // }
  // }

}

module.exports = LocationService;
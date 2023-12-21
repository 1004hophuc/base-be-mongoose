const xlsx = require('xlsx');
const provinceModel = require('../models/province.model');
let workbosok = xlsx.readFile('./excel_files/Danh sách quận huyện phường xã thuộc Tỉnh Khánh Hoà.xls');
console.log('workbook:', workbook)
let workSheet = workbook.Sheets[workbook.SheetNames[0]];
let range = xlsx.utils.decode_range(workSheet["!ref"]);

for (let row = range.s.r; row < range.e.r; row++) {
  let data = [];
  for (let col = range.s.c; col < range.e.c; col++) {
    let cell = workSheet[xlsx.utils.encode_cell({ r: row, c: col })];
    data.push(cell.v);
  }
  console.log('data:', data)
}
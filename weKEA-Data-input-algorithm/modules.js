require('dotenv').config();
const { DataSource } = require('typeorm');

const weKEADataSource = new DataSource({
     type: process.env.TYPEORM_CONNECTION,
     username: process.env.TYPEORM_USERNAME,
     password: process.env.TYPEORM_PASSWORD,
     host: process.env.TYPEORM_HOST,
     port: process.env.TYPEORM_PORT,
     database: process.env.TYPEORM_DATABASE
 });



const envToArr = (productData) => {
     let arr = productData.split('\n');
     let PDarr = [];
     
     for(let i=1; i<arr.length; i++){
        PDarr.push(arr[i].split(','));
     }
     return PDarr;
} 

module.exports ={ envToArr, weKEADataSource }





const fileSystem = require('fs');
const { envToArr, weKEADataSource } = require('./modules.js');

const products = envToArr(fileSystem.readFileSync("./weKEA-products.csv", "utf-8"));
const images = envToArr(fileSystem.readFileSync("./weKEA-images.csv", "utf-8"));
const product_options = envToArr(fileSystem.readFileSync("./weKEA-product_options.csv", "utf-8"));

//console.log(product_options);

const main = async() => {
     await weKEADataSource.initialize()
     .then(() => {
          console.log("Data Source has been initialized");
     })
     .catch((err) => {
          console.error('Error occured during Data Source initialization', err);
          weKEADataSource.destroy();
     });
     
     // Add category name to table categories
     let category = ['책상', '의자', '서랍', '선반'];
     for(value of category){
          weKEADataSource.query(
               `INSERT INTO categories(
                    name
               ) values(?)`,[value]
          )
     };

     // Add products to table products 
     for(let i=0;i<products.length;i++){
          weKEADataSource.query(
               `INSERT INTO products(
                    name,
                    description,
                    category_id,
                    thumbnail
               ) values(?,?,?,?)`,[products[i][0], products[i][1], products[i][2], products[i][3]])
     };

     // Add images to table images
     for(let i=0; i<images.length; i++){
          const product = await weKEADataSource.query(
               `SELECT 
                    id,
                    name
               FROM products
               WHERE products.name like '%${images[i][0]}%'
             `)
          //console.log(product[0].name, images[i][1], product[0].id);

          await weKEADataSource.query(
               `INSERT INTO images(
                    image_url,
                    product_id
               ) values(?,?)`,[images[i][1], product[0].id])
     };

     // Add product options to table product_options
     for(let i=0; i<product_options.length; i++){
          const product2 = await weKEADataSource.query(
               `SELECT 
                    id,
                    name
               FROM products
               WHERE products.name like '%${product_options[i][0]}%'
             `);
          await weKEADataSource.query(
               `INSERT INTO product_options(
                    product_id,
                    size,
                    price,
                    color
               ) values(?,?,?,?)`,[product2[0].id, product_options[i][1], product_options[i][2], 'black'])
          await weKEADataSource.query(
               `INSERT INTO product_options(
                    product_id,
                    size,
                    price,
                    color
               ) values(?,?,?,?)`,[product2[0].id, product_options[i][1], product_options[i][2], 'White'])      
      };
}

main();
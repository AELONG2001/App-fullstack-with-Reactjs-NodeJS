var express = require('express');
var router = express.Router();
const cors = require('cors');

router.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000']
}));

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'products',
  password: 'longkmhd',
  port: 5432,
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

//get data from postgresSQL
router.get('/getData', function(err, res) {
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
   
  pool.query('SELECT * FROM product_info', (error, response) => {
      res.send(response.rows)
    pool.end()
  })
});

router.get('/add', function(req, res, next) {
  res.render('add', {})
})

router.post('/add', function(req, res, next) {

  const product_name = req.body.product_name
  const product_price = req.body.product_price
  const product_image = req.body.product_image

  pool.query("INSERT INTO product_info (product_name, product_price, product_image) VALUES ($1, $2, $3)", 
  [product_name, product_price, product_image], (error, response) => {
    if(error) {
      res.send(error)
    }else {
      res.send(response)
    }
  }
  )

})


module.exports = router;

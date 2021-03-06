const express = require('express');
const morgan = require('morgan');
const dbConnection = require('./db/config');
const logger = require('./tools/logger');

require('dotenv').config();

const app = express();
app.use( express.json());
app.use(morgan(process.env.MORGAN, { stream: logger.stream }));
dbConnection();


const paths = {
  user : '/api/user',
  auth: '/api/auth',
  role: '/api/role',
  category: '/api/category',
  product: '/api/product',
  shoppingCart: '/api/shopping-cart',
  order: '/api/order'
}

app.use(paths.user, require('./routes/user'));
app.use(paths.auth, require('./routes/auth'));
app.use(paths.role, require('./routes/role'));
app.use(paths.category, require('./routes/category'));
app.use(paths.product, require('./routes/product'));
app.use(paths.shoppingCart, require('./routes/shoppingCart'));
app.use(paths.order, require('./routes/order'));

app.get('/', (req, res) => {
  res.send('Hello Geeks');
});

app.listen(process.env.PORT, ()=> {
  console.log(`API server running on port ${process.env.PORT}`);
});
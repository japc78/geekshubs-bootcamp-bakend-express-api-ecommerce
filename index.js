const express = require('express');
const morgan = require('morgan');
const dbConnection = require('./db/config');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const logger = require('./tools/logger');
require('dotenv').config();
const { name, version, description} = require('./package.json');


const apiDocSetup = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: name,
      version,
      description
    }
  },
  apis: ['./routes/*.js']
})


const app = express();
app.use( express.json());
app.use(morgan(process.env.MORGAN, { stream: logger.stream }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDocSetup));
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
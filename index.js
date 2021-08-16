const express = require('express');
const dbConnection = require('./db/config');

require('dotenv').config();

const app = express();
app.use( express.json());
dbConnection();

const paths = {
  user : '/api/user',
  auth: '/api/auth',
  role: '/api/role'
}

app.use(paths.user, require('./routes/user'));
app.use(paths.auth, require('./routes/auth'));
app.use(paths.role, require('./routes/role'));

app.get('/', (req, res) => {
  res.send('Hello Geeks');
});

app.listen(process.env.PORT, ()=> {
  console.log(`API server running on port ${process.env.PORT}`);
});
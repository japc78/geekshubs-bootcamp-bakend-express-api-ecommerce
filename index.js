const express = require('express');
const dbConnection = require('./db/config');

require('dotenv').config();

const app = express();
app.use( express.json());

dbConnection();

const paths = {
  user : '/api/user',
}

app.use(paths.user, require('./routes/user'));

app.get('/', (req, res) => {
  res.send('Hello Geeks');
});

app.listen(process.env.PORT, ()=> {
  console.log(`Server running on port ${process.env.PORT}`);
});
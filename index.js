const express = require('express');
const dbConnection = require('./db/config');

require('dotenv').config();

const app = express();

dbConnection();

app.get('/', (req, res) => {
  res.send('Hello Geeks');
});

app.listen(process.env.PORT, ()=> {
  console.log(`Server running on port ${process.env.PORT}`);
});
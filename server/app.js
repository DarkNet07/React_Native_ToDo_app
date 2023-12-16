require('@babel/register');
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const serverConfig = require('./config/serverCofnig');
const indexRouter = require('./routes/index.routes');

const app = express();
app.use(cors());
serverConfig(app);

app.use('/', indexRouter);

const PORT = 3000;

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервак летит на ${PORT}`);
});

const express = require('express');

const morgan = require('morgan');
const path = require('path');

function serverConfig(app) {
  // настройки для сервера, чтобы при отправке формы появлялось req.body

  // const corsOptions = {
  //   origin: 'http://localhost:8081', // Укажите домен вашего клиента
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  //   optionsSuccessStatus: 204,
  // };

  app.use(express.urlencoded({ extended: true }));

  // учу сервер читать json
  app.use(express.json());

  //  чтобы логировались запросы
  app.use(morgan('dev'));

  // чтобы подключались стили (первым делом будет искать файлы в папке public)
  app.use(express.static(path.join(__dirname, '../public')));
}

module.exports = serverConfig;

const path = require('path');
const express = require('express');
const { PORT = 3000, BASE_PATH } = process.env;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
    _id: '607a9d4919b8912fe49b9d06'
  };

  next();
});


app.listen(PORT, () => {
  console.log(`Приложение запущено: порт ${PORT}`);
})
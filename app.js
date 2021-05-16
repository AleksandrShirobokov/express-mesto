const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const { loginValidation, registrValidation } = require('./middlewares/validationCheck');
const auth = require('./middlewares/auth');

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable('x-powered-by');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signin', loginValidation, login);
app.post('/signup', registrValidation, createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use(errorLogger);

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(err.statusCode).send({ message: statusCode === 500 ? 'Что-то пошло не так' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено: порт ${PORT}`);
});

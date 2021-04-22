const User = require('../models/users');

const {
  ERROR_500_DEFAULT,
  ERROR_404_ID_USER,
  ERROR_400_CAST_ERROR,
} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => {
      res.status(500).send({ message: ERROR_500_DEFAULT });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: ERROR_404_ID_USER });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: ERROR_400_CAST_ERROR });
      } else {
        res.status(500).send({ message: ERROR_500_DEFAULT });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: ERROR_400_CAST_ERROR });
      } else {
        res.status(500).send({ message: ERROR_500_DEFAULT });
      }
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidation: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: ERROR_404_ID_USER });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: ERROR_400_CAST_ERROR });
      } else {
        res.status(500).send({ message: ERROR_500_DEFAULT });
      }
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidation: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: ERROR_404_ID_USER });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: ERROR_400_CAST_ERROR });
      } else {
        res.status(500).send({ message: ERROR_500_DEFAULT });
      }
    });
};

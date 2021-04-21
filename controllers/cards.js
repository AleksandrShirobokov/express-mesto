const Card = require('../models/cards');

const {
  ERROR_500_DEFAULT,
  ERROR_404_ID_CARD,
  ERROR_400_CAST_ERROR,
} = require('../utils/errors');

module.exports.createCard = (req) => {
  // eslint-disable-next-line no-console
  console.log(req.user._id);
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: ERROR_500_DEFAULT }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: ERROR_400_CAST_ERROR });
      } else {
        res.status(500).send({ message: ERROR_500_DEFAULT });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then(() => {
      res.status(200).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: ERROR_404_ID_CARD });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: ERROR_400_CAST_ERROR });
      } else {
        res.status(500).send({ message: ERROR_500_DEFAULT });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: ERROR_404_ID_CARD });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: ERROR_400_CAST_ERROR });
      } else {
        res.status(500).send({ message: ERROR_500_DEFAULT });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: ERROR_404_ID_CARD });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: ERROR_400_CAST_ERROR });
      } else {
        res.status(500).send({ message: ERROR_500_DEFAULT });
      }
    });
};

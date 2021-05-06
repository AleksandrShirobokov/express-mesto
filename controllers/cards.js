const Card = require('../models/cards');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      throw new BadRequestError(err.message);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (data.owner.toString() !== req.user._id) {
        throw new ForbiddenError('У вас нет прав для удаления чужой карточки');
      }
      Card.findByIdAndRemove(req.params.id)
        .then((card) => res.status(200).send({ card }))
        .catch(next);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .orFail(new Error('Карточка не найдена'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .orFail(new Error('Карточка не найдена'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      throw new NotFoundError(err.message);
    })
    .catch(next);
};

const Card = require('../models/cards');

const {
  ERROR_400_CREATE_CARD,
  ERROR_400_DELETE_LIKE,
  ERROR_400_PUT_LIKE,
  ERROR_500_DEFAULT,
  ERROR_404_ID_CARD
} = require('../utils/errors');

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
};

module.exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({data: cards}))
  .catch(() => res.status(500).send({message:ERROR_500_DEFAULT}))
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({name, link, owner: req.user._id})
  .then(card => res.send({data: card}))
  .catch((err) => {
    if(err.name === ERROR_400_CREATE_CARD) {
      return res.status(400).send({message:ERROR_400_CREATE_CARD})
    }
      return res.status(500).send({message:ERROR_500_DEFAULT})
  })
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
  .then(card => res.send({data: card}))
  .catch(() => res.status(404).send({message:ERROR_404_ID_CARD}))
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    {$addToSet: {likes: req.user._id}},
    {new: true},
    )
  .then(card => res.send({data: card}))
  .catch((err) => {
    if(err.name === ERROR_400_PUT_LIKE) {
      return res.status(400).send({message:ERROR_400_PUT_LIKE})
    }
      return res.status(500).send({message:ERROR_500_DEFAULT})
  })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    {$pull: {likes: req.user._id}},
    {new: true},
    )
  .then(card => res.send({data: card}))
  .catch((err) => {
    if(err.name === ERROR_400_PUT_LIKE) {
      return res.status(400).send({message:ERROR_400_DELETE_LIKE})
    }
      return res.status(500).send({message:ERROR_500_DEFAULT})
  })
}
const User = require('../models/users');

const {
  ERROR_400_UPDATE_AVATAR,
  ERROR_400_UPDATE_USER,
  ERROR_500_DEFAULT,
  ERROR_404_ID_USER,
  ERROR_400_USER
} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({data: users}))
  .catch(() => res.status(500).send({message:ERROR_500_DEFAULT})
  )
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
  .then(user => res.send({data: user}))
  .catch((err) => {
    if(err.name === ERROR_404_ID_USER) {
      return res.status(404).send({message:ERROR_404_ID_USER})
    }
      return res.status(500).send({message:ERROR_500_DEFAULT})
  })
}

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
  .then(user => res.send({data: user}))
  .catch((err) => {
    if(err.name === ERROR_400_USER) {
      return res.status(400).send({message:ERROR_400_USER})
    }
      return res.status(500).send({message:ERROR_500_DEFAULT})
  })
}

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate({name, about}, req.user._id)
  .then(user => res.send({data: user}))
  .catch((err) => {
    if(err.name === ERROR_400_UPDATE_USER) {
      return res.status(400).send({message:ERROR_400_UPDATE_USER})
    }
      return res.status(500).send({message:ERROR_500_DEFAULT})
  })
}

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate({avatar}, req.user._id,)
  .then(user => res.send({data: user}))
  .catch((err) => {
    if(err.name === ERROR_400_UPDATE_AVATAR) {
      return res.status(400).send({message:ERROR_400_UPDATE_AVATAR})
    }
      return res.status(500).send({message:ERROR_500_DEFAULT})
  })
}
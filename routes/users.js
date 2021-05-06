const router = require('express').Router();
const {
  getUsers, getUserById, patchUser, patchAvatar, getCurrentUser,
} = require('../controllers/users');
const { idValidation, userInfoValidation, userAvatarValidation } = require('../middlewares/validationCheck');

router.get('/', getUsers);
router.get('/:id', idValidation, getUserById);
router.get('/me', idValidation, getCurrentUser);
router.patch('/me', userInfoValidation, patchUser);
router.patch('/me/avatar', userAvatarValidation, patchAvatar);

module.exports = router;

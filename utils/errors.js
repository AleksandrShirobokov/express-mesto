const ERROR_400_USER = 'Некорректные данные при создании пользователя';
const ERROR_500_DEFAULT = 'Не удается обработать запрос к сайту...';
const ERROR_404_ID_USER = 'Пользователь по указанному _id не найден';
const ERROR_400_UPDATE_USER = 'Некорректные данные при обновлении пользователя';
const ERROR_400_UPDATE_AVATAR = 'Некорректные данные при обновлении аватара';
const ERROR_400_CREATE_CARD = 'Некорректные данные при создании карточки';
const ERROR_404_ID_CARD = 'Карточка по указанному _id не найдена';
const ERROR_400_PUT_LIKE = 'Некорректные данные для постановки лайка';
const ERROR_400_DELETE_LIKE = 'Некорректные данные для снятия лайка';

module.exports = {
  ERROR_400_CREATE_CARD,
  ERROR_400_DELETE_LIKE,
  ERROR_400_PUT_LIKE,
  ERROR_400_UPDATE_AVATAR,
  ERROR_400_UPDATE_USER,
  ERROR_500_DEFAULT,
  ERROR_404_ID_USER,
  ERROR_404_ID_CARD,
  ERROR_400_USER
}
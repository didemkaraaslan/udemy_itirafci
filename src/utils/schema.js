const Joi = require("@hapi/joi");

const confessionSchema = Joi.object().keys({
  id: Joi.string(),
  content: Joi.string()
    .min(20)
    .max(1000)
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "any.empty":
            err.message = "İtiraf içeriği boş bırakılamaz";
            break;
          case "string.min":
            err.message = `İtiraf içeriği en az ${err.context.limit} karakter olmalıdır`;
            break;
          case "string.max":
            err.message = `İtiraf içeriği en fazla ${err.context.limit} karakter olmalıdır`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  numberOfLikes: Joi.number().integer().required(),
  numberOfDislikes: Joi.number().integer().required(),
  feelings: Joi.object(),
  favorites: Joi.object(),
  tags: Joi.array()
    .required()
    .error((error) => (error.message = "Etiketler boş olamaz")),
  shareAs: Joi.string().required(),
  timestamp: Joi.object().required(),
  user: {
    uid: Joi.string().required(),
    username: Joi.string().required(),
    photoURL: Joi.string().required(),
    gender: Joi.string().required(),
  },
});

export { confessionSchema };

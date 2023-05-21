const yup = require("yup");
const validate = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      nom: yup.string().required(),
      email: yup.string().email().required(),
      cin: yup.number().required(),
      tel: yup.number().max(8),
    });
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });
  }
};
module.exports = validate;
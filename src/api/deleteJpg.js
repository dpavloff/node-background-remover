const db = require("../entities/Database");
const { BadRequestApiError } = require("../validators/errors/ApiError");

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new BadRequestApiError(`Incorrect id was sent. Try again.`);
    }

    await db.deleteJpg(id);

    return res.json({ id });
  } catch (error) {
    return next(error);
  }
};

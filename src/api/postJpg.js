const db = require("../entities/Database");
const JPG = require("../entities/JPG");
const { BadRequestApiError } = require("../validators/errors/ApiError");

module.exports = async (req, res, next) => {
  try {
    const { file } = req;

    if (!file) {
      throw new BadRequestApiError("JPG content should not be empty");
    }

    const jpgFile = new JPG(file);

    await db.saveJpgMetadata(jpgFile, file);

    return res.send("File uploaded successfully");
  } catch (err) {
    return next(err);
  }
};

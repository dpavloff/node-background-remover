const path = require("path");
const db = require("../entities/Database");
const { exists } = require("../utils/fs");
const { storageFolder } = require("../config/index");
const {
  BadRequestApiError,
  NotFoundApiError,
} = require("../validators/errors/ApiError");

module.exports = async (req, res, next) => {
  try {
    let { id } = req.params;

    if (!id) {
      throw new BadRequestApiError("Filename should be provided.");
    }

    const jpg = db.findOne(id);

    if (!jpg) {
      throw new NotFoundApiError("File was not found in database.");
    }

    const pathToFile = path.resolve(storageFolder, jpg.originalFilename);
    const isFileExists = await exists(pathToFile);

    if (isFileExists === false) {
      throw new NotFoundApiError("File was not found in database.");
    }

    res.header("content-type", "image/jpeg");
    return res.download(pathToFile);
  } catch (err) {
    next(err);
  }
};

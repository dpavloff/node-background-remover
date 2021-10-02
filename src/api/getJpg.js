const path = require('path');
const { exists } = require('../utils/fs');
const { storageFolder } = require('../config/index');
const { BadRequestApiError } = require('../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    let { id } = req.params;

    if (!id) {
      throw new BadRequestApiError(
        'Filename should be provided.'
      );
    }

    id += '_original.jpg';

    const pathToFile = path.resolve(storageFolder, id);
    const isFileExists = await exists(pathToFile);

    if (isFileExists === false) {
      throw new NotFoundApiError('Given JPG file was not found in database.');
    }

    return res.download(pathToFile);
  } catch (err) {
    next(err);
  }
};

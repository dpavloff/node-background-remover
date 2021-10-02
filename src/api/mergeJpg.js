const fs = require("fs");
const path = require("path");
const db = require("../entities/Database");
const { storageFolder } = require("../config/index");
const { v4 } = require("uuid");
const {
  BadRequestApiError,
  NotFoundApiError,
} = require("../validators/errors/ApiError");
const { replaceBackground } = require("backrem");

module.exports = async (req, res, next) => {
  try {
    if (!req.query.front || !req.query.back) {
      throw new BadRequestApiError(
        "Bad request: No ID's were sent. Please try again."
      );
    }

    let jpgFrontMeta = db.findOne(req.query.front);
    let jpgBackMeta = db.findOne(req.query.back);

    if (jpgFrontMeta && jpgBackMeta) {
      const front = fs.createReadStream(
        path.resolve(storageFolder, jpgFrontMeta.originalFilename)
      );
      const back = fs.createReadStream(
        path.resolve(storageFolder, jpgBackMeta.originalFilename)
      );
      let color = req.query.color ? req.query.color.split(",") : undefined;
      let threshold = Number(req.query.threshold) || 1;

      replaceBackground(front, back, color, threshold)
        .then((readableStream) => {
          let resImg = path.resolve(storageFolder, `./${v4()}_result.jpeg`);
          const writableStream = fs.createWriteStream(resImg);
          readableStream.pipe(writableStream);
          readableStream.on("end", () => {
            res.header('Content-Type', front.mimeType)
            res.sendFile(resImg);
          });
        })
        .catch((err) => {
          return next(err);
        });
    } else {
      throw new NotFoundApiError(
        `No files with ID's of ${req.query.front} or ${req.query.front} was found. Please try again.`
      );
    }
  } catch (err) {
    return next(err);
  }
};

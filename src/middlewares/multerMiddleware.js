const multer = require("multer");
const { v4 } = require("uuid");
const { storageFolder } = require("../config/index");

module.exports = () => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, storageFolder);
      },
      filename: (req, file, cb) => {
        file.id = v4();
        file.originalname = `${file.id}_original.jpeg`;
        cb(null, file.originalname);
      },
    }),
  });
};

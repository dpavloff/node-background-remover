const db = require("../entities/Database");

module.exports = async (req, res) => {
  const allJpgs = db.find().map((jpg) => jpg.toPublicJSON());

  return res.json(allJpgs);
};

const db = require('../../entities/Database');
const JPG = require('../../entities/jpg');

module.exports = async (req, res) => {
  const { content } = req.body;

  const svgFile = new JPG();

  await db.insert(svgFile, content);

  return res.json(svgFile.toPublicJSON());
};

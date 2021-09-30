const db = require('../../db/Database');
const JPG = require('../entities/JPG');

module.exports = async (req, res) => {
  // const { content } = req.body;
  return res.json('You just got one pic!')

  // const svgFile = new JPG();

  // await db.insert(svgFile, content);

  // return res.json(svgFile.toPublicJSON());
};

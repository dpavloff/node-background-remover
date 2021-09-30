const path = require('path');

const storageFolder = path.resolve(__dirname, '../../storage');
const db = path.resolve(__dirname, '../entities/Database');
const dumpPath = path.resolve(db, 'dump.json');

module.exports = {
    PORT: 8080,
    storageFolder,
    dumpPath,
    db
}
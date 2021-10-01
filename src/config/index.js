const path = require('path');

const storageFolder = path.resolve(__dirname, '../../db/jpg');
const db = path.resolve(__dirname, '../entities/Database');
const dbDumpFile = path.resolve(__dirname, '../../db/dump.json');

module.exports = {
    PORT: 8080,
    storageFolder,
    dbDumpFile,
    db
}
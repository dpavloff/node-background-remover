const path = require('path');

const storageFolder = path.resolve(__dirname, '../../storage');
const dumpPath = path.resolve(storageFolder, 'dump.json');
const db = path.resolve(__dirname, '../entities/Database');

module.exports = {
    PORT: 8080
}
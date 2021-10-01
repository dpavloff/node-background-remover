const path = require('path');
const { v4 } = require('uuid');
const { removeFile } = require('../utils/fs');

const { storageFolder } = require('../config');

module.exports = class JPG {
    constructor({ id, createdAt, size, originalFilename }) {
        this.id = id || v4();
        this.createdAt = createdAt || Date.now();
        this.size = size || 1;
        this.originalFilename = originalFilename || `${id}_original.jpg`;
    }

    async removeJpg() {
        await removeFile(path.resolve(storageFolder, this.originalFilename));
    }

    toPublicJSON() {
        return {
          id: this.id,
          originalUrl: `/db/jpg/${this.id}_original.jpg`,
          createdAt: this.createdAt
        };
    }
    
    toJSON() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            originalFilename: this.originalFilename,
            size: this.size
        };
    }
}
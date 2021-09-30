const path = require('path');
const { v4 } = require('uuid');
const { writeFile, removeFile } = require('../utils/fs');

const { storageFolder } = require('../config');

module.exports = class JPG {
    constructor(id, createdAt) {
        this.id = id || v4();
        this.createdAt = createdAt || Date.now();

        this.originalFilename =`${id}_original.jpg`;
    }

    async saveJpg(content) {
        await writeFile(path.resolve(storageFolder, this.originalFilename), content);
    }

    async removeJpg() {
        await removeFile(path.resolve(storageFolder, this.originalFilename));
    }

    toPublicJSON() {
        return {
          id: this.id,
          originalUrl: `/files/${this.id}_original.jpg`,
          createdAt: this.createdAt
        };
    }
    
    toJSON() {
        return {
            id: this.id,
            createdAt: this.createdAt
        };
    }
}
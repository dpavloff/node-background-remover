const path = require('path');

const { v4 } = require('uuid');

module.exports = class JPG {
    constructor(id, createdAt) {
        this.id = id || v4();
        this.createdAt = createdAt || Date.now();

        this.originalFilename =`${id}_original.jpg`;
    }
}
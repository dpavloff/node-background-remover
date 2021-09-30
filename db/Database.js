const { EventEmitter } = require('events');

const JPG = require('../src/entities/JPG');

class Database extends EventEmitter {
    constructor() {
        super();
        
        this.idToJpg = {};
    }

    async findJpg() {
        try {

            
        } catch (err) {
            console.log(err);
        }
    }
    
}

const db = new Database();

// db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
const { EventEmitter } = require('events');
const { existsSync } = require('fs');
const { dbDumpFile } = require('../config');
const { writeFile } = require('../utils/fs');
const { prettifyJsonToString } = require('../utils/prettifyJsonToString')

const JPG = require('../entities/JPG');

class Database extends EventEmitter {
    constructor() {
        super();
        
        this.idToJpg = {};
    }

    async initFromDump() {
        if (existsSync(dbDumpFile) === false) {
          return;
        }
    
        const dump = require(dbDumpFile);
    
        if (typeof dump.idToJpg === 'object') {
          this.idToSvg = {};
    
          for (let id in dump.idToJpg) {
            const jpg = dump.idToJpg[id];
    
            this.idToJpg[id] = new JPG(jpg.id, jpg.createdAt, jpg.size);
          }
        }
      }

    // async uploadJpg() {
    //     try {
            
    //     } catch (err) {
    //         return err;
    //     }
    // }


    async uploadJpg(jpg, originalContent) {
        await jpg.saveJpg(originalContent);
    
        this.idToJpg[jpg.id] = jpg;
    
        this.emit('changed');
    }

    toJSON() {
      return {
        idToJpg: this.idToJpg
      };
    }
}

const db = new Database();

db.initFromDump();

db.on('changed', () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;
const { EventEmitter } = require("events");
const { existsSync } = require("fs");
const { dbDumpFile } = require("../config");
const { writeFile } = require("../utils/fs");
const { prettifyJsonToString } = require("../utils/prettifyJsonToString");

const JPG = require("../entities/JPG");

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

    if (typeof dump.idToJpg === "object") {
      this.idToSvg = {};

      for (let id in dump.idToJpg) {
        const jpg = dump.idToJpg[id];

        this.idToJpg[id] = new JPG(jpg);
      }
    }
  }

  async saveJpgMetadata(jpg) {
    this.idToJpg[jpg.id] = jpg;

    this.emit("changed");
  }

  find() {
    let allJpgs = Object.values(this.idToJpg);

    allJpgs.sort((jpgA, jpgB) => jpgB.createdAt - jpgA.createdAt);

    return allJpgs;
  }

  async deleteJpg(id) {
      const jpgRaw = this.idToJpg[id];

      if (!jpgRaw) {
        return console.log(`No file with id of ${id} was found in database.`)
      }

      const jpg = new JPG(jpgRaw);

      await jpg.removeJpg();

      delete this.idToJpg[id];

      this.emit("changed");

      return id;
  }

  toJSON() {
    return {
      idToJpg: this.idToJpg,
    };
  }
}

const db = new Database();

db.initFromDump();

db.on("changed", () => {
  writeFile(dbDumpFile, prettifyJsonToString(db.toJSON()));
});

module.exports = db;

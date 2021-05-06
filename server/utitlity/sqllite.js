const fs = require('fs')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(':memory:', err => console.log);

let queryFile = path.resolve(__dirname, '../query.sql')
let queries = fs.readFileSync(queryFile).toString()
let dataArr = queries.toString().split(");");

db.serialize(() => {
    db.run("PRAGMA foreign_keys=OFF;");
    db.run("BEGIN TRANSACTION;");
    console.log(dataArr[dataArr.length-1])
    dataArr.forEach(query => {
        if (query) {
            query += ");";
            db.run(query, err => {
                if (err) throw err;
            });
        }
    });
    db.run("COMMIT;");
});


module.exports = db;
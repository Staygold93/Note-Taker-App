const router = require("express").Router();
const fs = require("fs");
const util = require("util");


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// Get-request
router.get("/notes", (req, res) => {
  readFileAsync("./db/db.json", "utf8").then((data) => {
    const notes = [].concat(JSON.parse(data));
    res.json(notes);
  });
});

//post-request
router.post("/notes", (req, res) => {
  const newNote = req.body;
  readFileAsync("./db/db.json", "utf8")
    .then((data) => {
      const notes = [].concat(JSON.parse(data));
      newNote.id = notes.length + 1;
      notes.push(newNote);
      return notes;
    })
    .then((notes) => {
      writeFileAsync("./db/db.json", JSON.stringify(notes));
      res.json(newNote);
    });
});





module.exports = router;
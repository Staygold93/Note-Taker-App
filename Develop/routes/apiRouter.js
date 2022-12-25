const router = require("express").Router();
const fs = require("fs");
const uniqid = require("uniqid");


// Get-request
router.get("/notes", (req, res) => {
  fs.readFile('./db/db.json', 'utf8',(err, data) => {
    if (err) {
      res.status(500)
    } else {
      const notes = [].concat(JSON.parse(data));
      res.json(notes);
    
    }
  })
})




router.post("/notes", (req, res) => {
  const newNote = req.body;
  fs.readFile('./db/db.json', 'utf8',(err, data) => {
    if (err) {
      res.status(500)
    } else {
      const notes = [].concat(JSON.parse(data));
      newNote.id = uniqid();
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes, null, 4) , (err) => {
        err ? console.log(err) : res.send(newNote)
      });
    }
    

    })
  })
 

  
   



module.exports = router;
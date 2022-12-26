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



// Post-Request
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

// Delete-Note-Object
  router.delete('/notes/:id', (req, res) => {
    
    let db = JSON.parse(fs.readFileSync('db/db.json'))
   
    let deleteNotes = db.filter(item => item.id !== req.params.id);
  
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes);
    
  });
 

  
   



module.exports = router;
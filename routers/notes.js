const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/userauthication')
const Notes = require("../models/Notes")

const { body, validationResult } = require('express-validator');


// create application/x-www-form-urlencoded parse

router.get('/api/allnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user })
    res.json(notes)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

}
)
router.post('/api/savenote', fetchuser, [
  body('title', 'title cannot be smaller than 5 characters').isLength({ min: 5 }),
  body('description', 'enter the vaild email').isLength({ min: 5 }),
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });

    }
    const createnote = new Notes({ title, description, tag, user: req.user })
    const savedata = await createnote.save();
    res.json(savedata)
  } catch (error) {
    res.status(500).send("techincal error")
  }
})
router.post('/api/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description } = req.body

  try {
    let newnote = {}
    if (title) { newnote.title = title }
    if (description) { newnote.description = description }
    let data = await Notes.findById(req.params.id)
    if (!data) {
      return res.status(401).send("Doesn't exists ")
    }
    if (data.user.toString() != req.user) {
      return res.status(401).send("Failed")

    }
    const n = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
    res.json({ n })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")

  }
})

// delete note end point 
router.get('/api/deletenote/:id', fetchuser, async (req, res) => {
  try {
    const data = await Notes.findById(req.params.id)
    if (!data) {
      return res.status(401).send("Doesn't exists ")
    }
    if (data.user.toString() !== req.user) {
      return res.status(401).send("Failed")
    }
    const n = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "Success": "notes hase been delete successfully ", note: n })

  } catch (error) {
    res.status(500).send("techincal error")
  }
})

module.exports = router
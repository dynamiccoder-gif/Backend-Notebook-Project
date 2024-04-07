import express from "express";
import fetchuser from "../middlewares/fetchuser.js";
import Notes from "../models/Notes.js";
import { body, validationResult } from "express-validator";

const router = express.Router();
//router:1 fetech notes for user
router.get("/fetchallNotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.userId });

  res.json(notes);
});
//router:2 create new note for user
router.post(
  "/addnote",
  fetchuser,
  [
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    body("description")
      .isLength({ min: 8 })
      .withMessage("description must be at least 8 characters long"),
  ],
  async (req, res) => {
    try {
      console.log("inside addNote");

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
      }

      const notes = new Notes({ ...req.body, user: req.user.userId });

      await notes.save();

      res.json(notes);
    } catch (error) {
      res.status(400).send({ error: "Error while creating note" });
    }
  }
);

//router:3 update existing note for user
router.put("/updatenote/:id", fetchuser, async (req, res) => {

  try {

    const { title, description, tag } = req.body;

     const note =Notes.findById(req.params.id);
     if(!note){
        res.status(400).send({ error: "Error while updating note" });
     }
     if(note._id != req.body.noteId)
     res.status(400).send({ error: "Not allowed" });

     const updatedNote = await Notes.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          tag
        },
        { new: true } // Option to return the updated document
      );
  
  res.json(updatedNote);
} catch (error) {
  console.error(error); // Log the actual error for debugging
  res.status(500).send({ error: "Internal Server Error" });
}
});
// router:3 delete existing note for user\
router.put('/deletenote/:id',fetchuser, async (req, res)=>{
    try{    
        const note =Notes.findById(req.params.id);
     if(!note){
        res.status(400).send({ error: "Error while deleting note" });
     }
     if(note._id != req.body.noteId)
     res.status(400).send({ error: "Not allowed" });
     await Notes.findByIdAndDelete(req.params.id);   
     res.json({ message: "Successfully deleted note" })
}
    catch{
           res.status(400).send({ error: "Error while deleting note" });
    }
})
export default router;

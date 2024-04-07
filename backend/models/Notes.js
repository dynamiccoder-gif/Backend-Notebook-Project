import mongoose from 'mongoose'
const NotesSchema = new mongoose.Schema({
  user:
  {
type:mongoose.Schema.Types.ObjectId,
ref: 'User'
  },
  title:{
    type:String,
    required:true},

    tag:{
    type: String,
    default:"General"
    },
    
   description:{
    type:String,
    required:true
    },
    date: { type: Date,
    default:Date.now() }

}
,{timestamps: true})
export default mongoose.model('Notes', NotesSchema)

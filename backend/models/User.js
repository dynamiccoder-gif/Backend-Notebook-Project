import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true},
    email:{
    type: String,
    requird:true,
    unique:true
    },
   password:{
    type:String,
    required:true
    },
    date: { type: Date,
    default:Date.now() }

}
,{timestamps: true})
export default mongoose.model('User', UserSchema)

import mongoose, { Schema, models } from 'mongoose';

const UserSchema = new Schema(
  {
   userid:{
    type:Number,
    required:true,
    unique:true,
   },
    usermail: { 
      type: String, 
      required: true, 
      unique: true 
    },
    collegeEmailID: {
      type: String,
      required: true
    },
    collegeRollNumber: {
      type: String,
      required: true
    },
    numbersArray: {
      type: [Number],
      required: true
    },
    alphabetsArray: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', UserSchema);

export default User;

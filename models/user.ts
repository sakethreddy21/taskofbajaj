import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    unique: true,
    required: false,
  },
  usermail: {
    type: String,
    required: true,
    unique: true,
  },
  collegeEmailID: {
    type: String,
    required: true,
    unique: true,
  },
  collegeRollNumber: {
    type: String,
    required: true,
  },
  numbersArray: {
    type: [Number],
    required: true,
  },
  alphabetsArray: {
    type: [String],
    required: true,
  }
});

function generateUserId(fullName:any, dob:any) {
  return `${fullName.replace(/\s+/g, '_').toLowerCase()}_${dob.replace(/\D/g, '')}`;
}

UserSchema.pre('validate', function(next) {
  if (!this.user_id) {
    this.user_id = generateUserId(this.full_name, this.dob);
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);

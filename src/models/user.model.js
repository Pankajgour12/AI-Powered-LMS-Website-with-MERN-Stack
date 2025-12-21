import mongoose from "mongoose";


new userSchema = new mongoose.Schema({

name:{
    type: String,
    required: true,
  
},
description:{
    type: String
},
email:{
    type: String,
    required: true,
    unique: true,
},
password:{
    type: String,
    required: true,
},
role:{
    type: String,
    enum: ['student', 'educator', 'admin'],
    default: 'student',
    required: true,
},

photoUrl:{
    type: String,
    default: '',
},
enrolledCourses:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
}],



},{
    timestamps: true,
})




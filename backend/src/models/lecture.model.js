import mongoose from 'mongoose';

const LectureSchema = new mongoose.Schema({
   lectureTitle: {
    type: String,
    required: true,
   },
   videoUrl: {
    type: String,
   
    },

    isPreviewFree: {
    type: Boolean,
    
   }






},{timestamps: true,})

const Lecture = mongoose.model('Lecture', LectureSchema);

export default Lecture;
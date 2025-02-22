import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  url: { type:String, required:true } 
}, { timestamps: true });

const Event = mongoose.model('Event', EventSchema);

export default Event;
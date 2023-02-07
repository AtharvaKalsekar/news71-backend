import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const multimediaSchema = new Schema({
  caption: String,
  copyright: String,
  format: String,
  height: Number,
  subtype: String,
  type: String,
  url: String,
  width: Number,
});

const Multimedia = mongoose.model("Multimedia", multimediaSchema);

export default Multimedia;

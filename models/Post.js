// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  otsikko: String,
  kuvaus: String,
  sisalto: String,
  kuvanUrl: String,
  luotu: {
    type: Date,
    default: new Date()
  }
});

const Post = mongoose.model('Post', PostSchema);

export default Post;

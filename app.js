// app.js
import express from 'express'; // Express-kirjaston tuonti
import mongoose from 'mongoose'; // Mongoose-kirjaston tuonti
const Post =('./models/Post');// Post-mallin tuonti
import dotenv from 'dotenv'; // dotenv-kirjaston tuonti
dotenv.config(); // dotenv-kirjaston konfigurointi

const app = express(); // Express-sovelluksen luonti

// Yhdistä MongoDB-tietokantaan käyttäen ympäristömuuttujaa
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("yhteys on muodostettu"))
  .catch((err) => console.log(err));

app.use(express.json()); // Käytä JSON-middlewarea pyyntöjen käsittelyyn

// Luo reitti blogipostauksien hakuun
app.get('/posts', async (req, res) => {
  const posts = await Post.find(); // Hae kaikki blogipostaukset tietokannasta
  res.json(posts); // Lähetä blogipostaukset JSON-muodossa
});

// Luo reitti uuden blogipostauksen luomiseen
app.post('/posts', async (req, res) => {
  const newPost = new Post(req.body); // Luo uusi blogipostaus pyynnön rungosta
  const savedPost = await newPost.save(); // Tallenna uusi blogipostaus tietokantaan
  res.json(savedPost); // Lähetä tallennettu blogipostaus JSON-muodossa
});
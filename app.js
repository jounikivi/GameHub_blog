// app.js
import express from 'express'; // Express-kirjaston tuonti
import mongoose from 'mongoose'; // Mongoose-kirjaston tuonti
import Post from '../models/Post.js'; // Post-mallin tuonti
import dotenv from 'dotenv'; // dotenv-kirjaston tuonti
dotenv.config(); // dotenv-kirjaston konfigurointi

const app = express(); // Express-sovelluksen luonti

// Yhdistä MongoDB-tietokantaan käyttäen ympäristömuuttujaa
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
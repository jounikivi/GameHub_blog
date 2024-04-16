// app.js
import express from 'express'; // Express-kirjaston tuonti
import path from 'path';
import mongoose from 'mongoose'; // Mongoose-kirjaston tuonti
const Post =('./models/Post');// Post-mallin tuonti
import dotenv from 'dotenv'; // dotenv-kirjaston tuonti
dotenv.config(); // dotenv-kirjaston konfigurointi

const app = express(); // Express-sovelluksen luonti

// Aseta EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join('views'));

// Staattisten tiedostojen palvelin
app.use(express.static(path.join('public')));

const database = process.env.MONGOLAB_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("yhteys on muodostettu"))
  .catch((err) => console.log(err));

  // Reitit
app.get('/', (req, res) => {
  res.render('index', { title: 'Blogi' });
});

app.use(express.json()); // Käytä JSON-middlewarea pyyntöjen käsittelyyn

// Luo reitti blogipostauksien hakuun
app.get('/posts', async (req, res) => {
  const posts = await Post.find(); // Hae kaikki blogipostaukset tietokannasta
  res.json(posts); // Lähetä blogipostaukset JSON-muodossa
});

// Reitit
app.get('/', (req, res) => {
  res.render('index', { title: 'Blogi' });
});

app.get('/kirjoitukset', (req, res) => {
  res.render('kirjoitukset', { title: 'Kirjoitukset' });
});

// Luo reitti uuden blogipostauksen luomiseen
app.post('/posts', async (req, res) => {
  const newPost = new Post(req.body); // Luo uusi blogipostaus pyynnön rungosta
  const savedPost = await newPost.save(); // Tallenna uusi blogipostaus tietokantaan
  res.json(savedPost); // Lähetä tallennettu blogipostaus JSON-muodossa
});

app.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render('post', { post: post });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Määritä portti, jota sovellus kuuntelee
const port = process.env.PORT || 3000;

// Käynnistä Express-sovellus
app.listen(port, () => {
  console.log(`Sovellus on käynnissä osoitteessa http://localhost:${port}`);
});

// app.js
import express from 'express';
import path from 'path';

const app = express();

// Aseta EJS templating
app.set('view engine', 'ejs');
app.set('views', path.join('views'));

// Staattisten tiedostojen palvelin
app.use(express.static(path.join('public')));

// Reitit
app.get('/', (req, res) => {
  res.render('index', { title: 'Blogi' });
});

 //Käynnistää Express-sovellus
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sovellus on käynnissä osoitteessa http://localhost:${port}`);
});
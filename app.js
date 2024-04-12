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

// Reitti blogipostauksille
app.get('/kirjoitukset', (req, res) => {
  // Hae tai muodosta blogipostausdatasi täällä
  const posts = [
    { imageUrl: 'https://picsum.photos/200', title: 'Ensimmäinen blogikirjoitukseni', description: 'Tässä on lyhyt kuvaus ensimmäisestä blogikirjoituksestani...' },
    { imageUrl: 'https://picsum.photos/201', title: 'Toinen blogikirjoitukseni', description: 'Tässä on lyhyt kuvaus toisesta blogikirjoituksestani...' },
  ];
  res.render('kirjoitukset', { posts });
});

 //Käynnistää Express-sovellus
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sovellus on käynnissä osoitteessa http://localhost:${port}`);
});
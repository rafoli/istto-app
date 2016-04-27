var express = require('express');
var app = express();
var cors = require('cors');
var fakePlaces = [{
    "name": "Parraxaxá",
    "slug": "parraxaxa",
    "logo": "https://pbs.twimg.com/profile_images/1372422288/parraxaxa_low.jpg"
  },
  {
    "name": "Bode Entre Amigos",
    "slug": "bode-entre-amigos",
    "logo": "https://pbs.twimg.com/profile_images/1704845581/PERFIL_400x400.jpg",
    "menu": [{name: "Vatapa", price: 120}, {name: "Feijoada", price: 12.3}, {name: "Bode", price: 55.6}]
}];

app.use(cors());
app.options('/tokens.json', cors());
app.get('/tokens.json', function (req, res) {
  console.log('tokens.json');
  res.json({"token":"hWJtNvpvTLAy3U63fDRb"});
});

app.get('/places.json', function (req, res) {
  console.log('places.json');
  res.json({places: fakePlaces});
});

app.get('/places/bode-entre-amigos.json', function (req, res) {
  console.log('/slug/places.json');
  res.json({place: fakePlaces[1]});
});

app.listen(5555, function () {
  console.log('Fake Server Running 5555!');
});

const express = require('express');
const Twitter = require('twit');

const app = express();


app.set('port', process.env.PORT || 4500);

app.use(express.static('dist'));


const client = new Twitter({
  consumer_key: 'Dwz9WGq3ZTqDqecIPytujDH1A',
  consumer_secret: 'xvZfemrhyf21fVSskRtwFEVbVETRn5NRLkUGtJpPcq7nsXPig9',
  access_token: '198527536-rne7c3yJeFZhhsBHwF5vdphJ6TGPqQOoB6oHLZGy',
  access_token_secret: 'I1d2Z18WBF1N5ERMq9b2AYSDunHRIGI33ESWwemduAqdX'
});

app.use(require('cors')());
app.use(require('body-parser').json());

app.get('/api/user', (req, res) => {
  client
    .get('account/verify_credentials')
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.send(error);
    });
});



app.get('/api/home', (req, res) => {
    params = { q: '', count: Number(req.query.count), include_entities : true};
    if (req.query.since != '') {
      params.q= req.query.since;
    }
    console.log(params);
    client
      .get(`search/tweets`, params)
      .then(timeline => {
        res.send(timeline);
      }).catch(error => res.send(error));
  
});

app.listen(app.get('port'));

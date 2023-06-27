const mongoose = require('mongoose');
const express = require('express');
const ejs = require("ejs");
const shortId = require('shortid');

const app = express();

// Connect to MongoDB
const MongoDBConnection = async () => {
  try {
    await mongoose.connect('mongodb+srv://lokeshpratap30:jfotKKtvJeDJYEed@cluster0.mymsa8o.mongodb.net/');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

MongoDBConnection();

// Define Short URL Schema
const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
});

const ShortUrlModel = mongoose.model('ShortUrl', shortUrlSchema);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrlModel.find();
  res.render('index', { shortUrls: shortUrls });
});

var content = [];

app.get('/second', async (req, res) => {
  res.render('search', { shortUrls: content });
});

app.post('/second', async (req, res) => {
  try {
    console.log(req.body.fullUrl);
    const result = await ShortUrlModel.aggregate([
      {
        '$search': {
          'index': 'default',
          'text': {
            'query': req.body.fullUrl == '' ? '' : req.body.fullUrl,
            'path': {
              'wildcard': '*'
            }
          }
        }
      }
    ]);
    content = result;
    res.redirect("/second");
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

app.post('/shortUrls', async (req, res) => {
  await ShortUrlModel.create({ full: req.body.fullUrl });
  res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrlModel.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server started on port 5000');
});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
});

mongoose.connect(
  'mongodb://mongo:eGTXtCxaHTXvRkZervHSokdNaHrLqKkm@autorack.proxy.rlwy.net:55164',
);

const dataSchema = new mongoose.Schema({
  key: Number,
  company: String,
  vacancy: String,
  fork: {
    min: Number,
    max: Number,
  },
  status: Boolean,
  note: String,
});

const Data = mongoose.model('test', dataSchema);

app.get('/data', async (req, res) => {
  res.send(await Data.find());
});

app.post('/data', async (req, res) => {
  const newData = new Data(req.body.data);
  await newData.save();
  res.status(200).send({ message: 'Ok' });
});

app.put('/data', async (req, res) => {
  console.log(req.body.data);
  if (req.body.data.key) delete req.body.data.key;
  await Data.updateOne(
    { _id: new mongoose.Types.ObjectId(req.body.data._id) },
    { $set: req.body.data },
  );
  res.status(200).send({ message: 'Ok' });
});

app.delete('/data', async (req, res) => {
  await Data.deleteOne({ _id: new mongoose.Types.ObjectId(req.body._id) });
  res.status(200).send({ message: 'Ok' });
});

app.listen(port, () => {
  console.log(`Сервер поднят на порту: ${port}`);
});

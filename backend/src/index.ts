const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    'mongodb://mongo:WUdhIthssprDUseHgcoeYNHsNRbISyHG@autorack.proxy.rlwy.net:36040',
  )
  .then(() => console.info('Подключение к базе данных успешно!'));

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
  console.info(`Сервер поднят на порту: ${port}`);
});

import * as process from 'node:process';

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors());

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.info('Подключение к базе данных успешно!');
})();

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

const VacancyModel = mongoose.model('Vacancy', dataSchema);

app.get('/data', async (req, res) => {
  res.send(await VacancyModel.find());
});

app.post('/data', async (req, res) => {
  const { data } = req.body;

  const errors = [];
  if (typeof data.key !== 'string') errors.push('key должен быть типа string');
  if (typeof data.company !== 'string')
    errors.push('company должен быть типа string');
  if (typeof data.vacancy !== 'string')
    errors.push('vacancy должен быть типа string');
  if (typeof data.fork !== 'object')
    errors.push('fork должен быть типа object');
  if (typeof data.fork?.min !== 'number')
    errors.push('fork.min должен быть типа number');
  if (typeof data.fork?.max !== 'number')
    errors.push('fork.max должен быть типа number');
  if (typeof data.status !== 'boolean')
    errors.push('status должен быть типа boolean');
  if (typeof data.note !== 'string' && data.note === null)
    errors.push('note должен быть типа string');

  if (errors.length) {
    res.status(400).send({ errors });
    return;
  }

  const newData = new VacancyModel(req.body.data);
  await newData.save();
  res.status(200).send({ message: 'Ok' });
});

app.put('/data/:id', async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    if (data.key) delete data.key;
    await VacancyModel.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: data },
    );
    res.status(200).send({ message: 'Ok' });
  } catch (e) {
    console.group();
    console.error('Ошибка при обновлении! id: ' + id);
    console.error({ data });
    console.groupEnd();
    res.status(400).send({ message: e.message });
  }
});

app.delete('/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await VacancyModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    res.status(200).send({ message: 'Ok' });
  } catch (e) {
    console.error('Ошибка при удалении! id: ' + id);
    res.status(400).send({ message: e.message });
  }
});

app.listen(port, () => {
  console.info(`Сервер поднят на порту: ${port}`);
});

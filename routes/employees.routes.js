const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const router = express.Router();

router.get('/employees', (req, res) => {
  req.db.collection('employees').find().toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data);
  });
});

router.get('/employees/random', (req, res) => {
  req.db.collection('employees').aggregate([{ $sample: { size: 1 } }]).toArray((err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});

router.get('/employees/:id', (req, res) => {
  req.db.collection('employees').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if (err) res.status(500).json({ message: err });
    else if (!data) res.status(404).json({ message: 'Not found...' });
    else res.json(data);
  });
});

router.post('/employees', (req, res) => {
  const { name } = req.body;
  req.db.collection('employees').insertOne({ name: name }, err => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: "ok" });
  });
});

router.put('/employees/:id', (req, res) => {
  const { name } = req.body;
  req.db.collection('employees').updateOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'ok' });
  });
});

router.delete('/employees/:id', (req, res) => {
  req.db.collection('employees').deleteOne({ _id: ObjectId(req.params.id) }, err => {
    if (err) res.status(500).json({ message: err });
    else res.json({ message: 'ok' })
  });
});

module.exports = router;

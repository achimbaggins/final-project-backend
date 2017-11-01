const Station = require('../models/Station');

module.exports = {
  all: (req, res) => {
    Station.find()
    .then(dataStations => res.send(dataStations))
    .catch(err => console.error(err))
  },
  create: (req, res) => {
    Station.create(req.body)
    .then(created => res.send(created))
    .catch(err => console.error(err))
  },
  byId: (req, res) => {
    Station.find({_id: req.params.id})
    .then(station => res.send(station))
    .catch(err => console.error(err))
  },
  put: (req, res) => {
    Station.update({ _id: req.params.id }, { $set: req.body })
    .then(() => res.send('updated'))
    .catch(err => console.error(err))
  },
  remove: (req, res) => {
    Station.remove({_id: req.params.id})
    .then(() => res.send('deleted'))
    .catch(err => console.error(err))
  }
}

const Bus = require('../models/Bus');

module.exports = {
  all: (req, res) => {
    Bus.find()
    .then(dataBus => res.send(dataBus))
    .catch(err => console.error(err))
  },
  create: (req, res) => {
    Bus.create(req.body)
    .then(created => res.send(created))
    .catch(err => console.error(err))
  },
  byId: (req, res) => {
    Bus.find({_id: req.params.id})
    .then(station => res.send(station))
    .catch(err => console.error(err))
  },
  put: (req, res) => {
    Bus.update({ _id: req.params.id }, { $set: req.body })
    .then(() => res.send('updated'))
    .catch(err => console.error(err))
  },
  remove: (req, res) => {
    Bus.remove({_id: req.params.id})
    .then(() => res.send('deleted'))
    .catch(err => console.error(err))
  }
}

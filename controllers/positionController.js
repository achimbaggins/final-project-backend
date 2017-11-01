const Position = require('../models/Position');

module.exports = {
  all: (req, res) => {
    Position.find()
    .then(dataPosition => res.send(dataPosition))
    .catch(err => console.error(err))
  },
  create: (req, res) => {
    Position.create(req.body)
    .then(created => res.send(created))
    .catch(err => console.error(err))
  }
  // byId: (req, res) => {
  //   Position.find({_id: req.params.id})
  //   .then(station => res.send(station))
  //   .catch(err => console.error(err))
  // },
  // put: (req, res) => {
  //   Position.update({ _id: req.params.id }, { $set: req.body })
  //   .then(() => res.send('updated'))
  //   .catch(err => console.error(err))
  // },
  // remove: (req, res) => {
  //   Position.remove({_id: req.params.id})
  //   .then(() => res.send('deleted'))
  //   .catch(err => console.error(err))
  // }
}

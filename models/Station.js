const mongoose = require('mongoose');
const Schema = mongoose.Schema

const stationSchema = new Schema ({
  coordinate: [{type: String}],
  stationName: String,
  imageUrl: String,
  description: String
},{
  timestamps: true
})

module.exports = Station = mongoose.model('Station', stationSchema)

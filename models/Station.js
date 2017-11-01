const mongoose = require('mongoose');
const Schema = mongoose.Schema

const stationSchema = new Schema ({
  coordinate: [{type: String}],
  stationName: {
    type: String,
    required: true
  },
  imageUrl: String,
  description: String
},{
  timestamps: true
})

module.exports = Station = mongoose.model('Station', stationSchema)

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const stationSchema = new Schema ({
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
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

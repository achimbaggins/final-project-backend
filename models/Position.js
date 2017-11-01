const mongoose = require('mongoose');
const Schema = mongoose.Schema

const positionSchema = new Schema ({
  bus_id: [{type: Schema.Types.ObjectId, ref: 'Bus'}],
  station_id: [{type: Schema.Types.ObjectId, ref: 'Station'}]
},{
  timestamps: true
})

module.exports = Position = mongoose.model('Position', positionSchema)

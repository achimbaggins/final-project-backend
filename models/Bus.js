const mongoose = require('mongoose');
const Schema = mongoose.Schema

const busSchema = new Schema ({
  name: String,
  bus_code: String,
  destination: [{type: Schema.Types.ObjectId, ref: 'Station'}]
},{
  timestamps: true
})

module.exports = Bus = mongoose.model('Bus', busSchema)

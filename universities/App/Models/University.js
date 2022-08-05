const mongoose = require('mongoose')

const University = mongoose.model('Universities', {
  country: String,
  university: String,
})


module.exports = University
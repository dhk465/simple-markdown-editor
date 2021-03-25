const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

  txt: {
    type: String,
  }
  
});
  
module.exports = mongoose.model('Note', noteSchema, 'notes');
  
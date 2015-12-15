var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date
  },
  lastModified: {
    type: Date
  }
});

DocumentSchema.pre('save', function(next) {
  var now = new Date();
  this.lastModified = now;
  if (!this.dateCreated) {
    this.dateCreated = now;
  }
  next();
});


module.exports = mongoose.model('Document', DocumentSchema);

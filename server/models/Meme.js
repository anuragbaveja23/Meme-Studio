const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Meme', memeSchema); 
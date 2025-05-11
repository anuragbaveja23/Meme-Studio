const express = require('express');
const router = express.Router();
const Meme = require('../models/Meme');

// Get all memes
router.get('/', async (req, res) => {
  try {
    const memes = await Meme.find().sort({ createdAt: -1 });
    res.json(memes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single meme
router.get('/:id', async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) return res.status(404).json({ message: 'Meme not found' });
    res.json(meme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create meme
router.post('/', async (req, res) => {
  const meme = new Meme({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    category: req.body.category,
    tags: req.body.tags,
    createdBy: req.body.userId
  });

  try {
    const newMeme = await meme.save();
    res.status(201).json(newMeme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update meme
router.patch('/:id', async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) return res.status(404).json({ message: 'Meme not found' });

    Object.keys(req.body).forEach(key => {
      meme[key] = req.body[key];
    });

    const updatedMeme = await meme.save();
    res.json(updatedMeme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete meme
router.delete('/:id', async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);
    if (!meme) return res.status(404).json({ message: 'Meme not found' });

    await meme.deleteOne();
    res.json({ message: 'Meme deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
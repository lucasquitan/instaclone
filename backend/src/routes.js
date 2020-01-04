const express = require('express');
const multer = require('multer');
const uploadsConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

// Multer = permite que o express entenda o multipart form data

const routes = new express.Router();
const upload = multer(uploadsConfig);

routes.post('/posts', upload.single('image'), PostController.store);
routes.get('/posts', PostController.index);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;

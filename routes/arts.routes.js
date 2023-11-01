const router = require('express').Router();
const { inputArt, indexArts, showDetailArt, deleteImage, updateArt } = require('../controllers/arts.controllers');
const { image } = require('../libs/multer');

router.post('/arts', image.single('gambar'), inputArt);
router.get('/arts', indexArts);
router.get('/arts/:id', showDetailArt);
router.delete('/arts/:fileId', deleteImage);
router.put('/artss/:id', updateArt);

module.exports = router;

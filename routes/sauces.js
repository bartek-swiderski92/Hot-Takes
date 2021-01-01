const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces.js');

router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.post('/', auth, multer, saucesCtrl.addSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
// router.delete('/:id', auth, saucesCtrl.deleteSauce);


module.exports = router;
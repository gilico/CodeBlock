const { Router } = require('express');
const codesControlles = require('../controllers/codesControlles');
const {requireAuth, checkUser} = require('../middlewares/authMiddleware');
const router = Router({ mergeParams: true });


router.all('*', checkUser, requireAuth)
router.get('/', codesControlles.getAllCodes);
router.post('/create', codesControlles.createCode);
router.get('/:id', codesControlles.getById);
router.put('/:id', codesControlles.updateCode);
router.delete('/:id', codesControlles.deleteCode);


module.exports = router;
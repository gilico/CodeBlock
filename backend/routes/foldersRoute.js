const { Router } = require('express');
const {requireAuth, checkUser} = require('../middlewares/authMiddleware');
const folderController = require('../controllers/folderConroller');
const codesRoutes = require('../routes/codesRoutes');

const router = Router();

router.all('*', checkUser, requireAuth);
router.get('/allmycodes', folderController.getUsersCodesData);
router.get('/', folderController.getAllFolders);
router.post('/create', folderController.createFolder);
router.get('/:folderid', folderController.getFolderById);
router.put('/:folderid', folderController.updateFolder);
router.delete('/:folderid', folderController.deleteFolder);

router.use('/:folderid/mycodes', codesRoutes);

module.exports = router;
const express = require('express');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  createEkubInstanceController,
  getEkubMembersController,
  deleteEkubMemberController,
  updateEkubMember,
} = require('../controllers/ekubController');
const { registerUserController } = require('../controllers/userController');
const router = express.Router();

router.post('/create', roleMiddleware('manager'), createEkubInstanceController);
router.post('/add-member', roleMiddleware('admin'), registerUserController);
router.get('/ekub-members', roleMiddleware('admin'), getEkubMembersController);
router.delete(
  '/ekub-member/:id',
  roleMiddleware('admin'),
  deleteEkubMemberController,
);
// router.put('/ekub-member/:id', roleMiddleware('admin'), updateEkubMember);

module.exports = router;

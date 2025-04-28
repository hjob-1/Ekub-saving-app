const express = require('express');
const roleMiddleware = require('../middleware/roleMiddleware');
const {
  createEkubInstanceController,
  getEkubMembersController,
  deleteEkubMemberController,
  updateEkubMemberController,

  getEkubDashboardStats,
  getEkubMemberStats,
} = require('../controllers/ekubController');
const { registerUserController } = require('../controllers/userController');
const {
  authorizeEkubInstance,
} = require('../middleware/authorizeEKubInstance');
const router = express.Router();

router.post('/create', roleMiddleware('manager'), createEkubInstanceController);
router.post('/add-member', roleMiddleware('admin'), registerUserController);
router.get('/ekub-members', roleMiddleware('admin'), getEkubMembersController);
router.get('/ekub-members/stats', roleMiddleware('admin'), getEkubMemberStats);
router.delete(
  '/ekub-member/:id',
  roleMiddleware('admin'),
  deleteEkubMemberController,
);
router.put(
  '/ekub-member/:id',
  roleMiddleware('admin'),
  updateEkubMemberController,
);
router.get(
  '/dashboard-stats',
  roleMiddleware('admin'),
  authorizeEkubInstance,
  getEkubDashboardStats,
);
// router.put('/ekub-member/:id', roleMiddleware('admin'), updateEkubMember);

module.exports = router;

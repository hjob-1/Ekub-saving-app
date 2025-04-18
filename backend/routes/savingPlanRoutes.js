const app = require('express');
const {
  startSavingPlanController,
  getSavingPlansController,
  deleteSavingPlanController,
  getSavingPlanPaymentsController,
  updatePaymentController,
  getSavingStats,
  getParticipantsExcludingWinner,
  getWinnersController,
  getSavingPlanParticipants,
} = require('../controllers/savingPlanController');
const roleMiddleware = require('../middleware/roleMiddleware');
const { conductLottery } = require('../service/paymentService');
const logger = require('../service/logger');
const sendResponse = require('../service/responseUtil');
const {
  authorizeEkubInstance,
} = require('../middleware/authorizeEKubInstance');
const router = app.Router();

router.post(
  '/',
  roleMiddleware('admin'),
  authorizeEkubInstance,
  startSavingPlanController,
);
router.get(
  '/',
  roleMiddleware('admin'),
  authorizeEkubInstance,
  getSavingPlansController,
);
router.delete(
  '/:id',
  roleMiddleware('admin'),
  authorizeEkubInstance,
  deleteSavingPlanController,
);

// payment routes
router.get(
  '/:id/payments',
  roleMiddleware('admin'),
  authorizeEkubInstance,
  getSavingPlanPaymentsController,
);
router.put(
  '/:id/payments/:paymentId',
  roleMiddleware('admin'),
  authorizeEkubInstance,
  updatePaymentController,
);
// draw lottery
router.post(
  '/:id/draw',
  roleMiddleware('admin'),
  authorizeEkubInstance,
  async (req, res) => {
    try {
      const { id } = req.params;
      await conductLottery(
        res,
        id,
        true,
        req.body?.dueDate,
        req.body?.excludedUsers,
      );
      // return sendResponse(res, 200, 'Lottery draw successful');
    } catch (error) {
      logger.error(`faild while drawing lottery: ${error.message}`, {
        stack: error.stack,
      });
      return sendResponse(res, 500, 'Server error');
    }
  },
);
// saving plan participants
router.get(
  '/:id/participants/excluding-winner',
  roleMiddleware('admin'),
  authorizeEkubInstance,
  getParticipantsExcludingWinner,
);
router.get('/:id/stats', roleMiddleware('admin'), getSavingStats);

router.get('/:id/winners', roleMiddleware('admin'), getWinnersController);
router.get(
  '/:id/participants',
  roleMiddleware('admin'),
  authorizeEkubInstance,
  getSavingPlanParticipants,
);
module.exports = router;

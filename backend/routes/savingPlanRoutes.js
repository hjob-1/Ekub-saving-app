const app = require('express');
const {
  startSavingPlanController,
  getSavingPlansController,
  deleteSavingPlanController,
  getSavingPlanPaymentsController,
  updatePaymentController,
} = require('../controllers/savingPlanController');
const roleMiddleware = require('../middleware/roleMiddleware');
const { conductLottery } = require('../service/paymentService');
const logger = require('../service/logger');
const sendResponse = require('../service/responseUtil');
const router = app.Router();

router.post('/', roleMiddleware('admin'), startSavingPlanController);
router.get('/', roleMiddleware('admin'), getSavingPlansController);
router.delete('/:id', roleMiddleware('admin'), deleteSavingPlanController);

// payment routes
router.get(
  '/:id/payments',
  roleMiddleware('admin'),
  getSavingPlanPaymentsController,
);
router.put(
  '/:id/payments/:paymentId',
  roleMiddleware('admin'),
  updatePaymentController,
);
// draw lottery
router.post('/:id/draw', roleMiddleware('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    await conductLottery(res, id, true, req.body.dueDate);
    return sendResponse(res, 200, 'Lottery draw successful');
  } catch (error) {
    logger.error(`faild while drawing lottery: ${error.message}`, {
      stack: error.stack,
    });
    return sendResponse(res, 500, 'Server error');
  }
});
module.exports = router;

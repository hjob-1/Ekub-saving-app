const exprees = require('express');
const {
  registerUserController,
  loginUserController,
  updateUserController,
  activateAccountController,
  forgotPasswordController,
  resetPasswordController,
} = require('../controllers/userController');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = exprees.Router();

router.get('/', (req, res) => {
  res.send('Hello from userRoutes');
});

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.put('/:id', updateUserController);
router.get('/activate-account', activateAccountController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);
router.get('/get', roleMiddleware('admin'), (req, res) => {
  res.status(200).json({
    message: 'user found',
    user: req.user,
  });
});

module.exports = router;

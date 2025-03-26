const exprees = require('express');
const {
  registerUserController,
  loginUserController,
  updateUserController,
  activateAccountController,
  forgotPasswordController,
  resetPasswordController,
} = require('../controllers/userController');
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

module.exports = router;

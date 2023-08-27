import express from 'express';
import AuthController from '../../controllers/AuthController';
import validate from '../../middlewares/validate'
import AuthValidation from '../../validations/AuthValidation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/sign-up', validate(AuthValidation.signUp), AuthController.signUp)
router.post('/sign-in', validate(AuthValidation.signIn), AuthController.signIn)
router.get('/user/current', auth, AuthController.getCurrentUser);

export default router
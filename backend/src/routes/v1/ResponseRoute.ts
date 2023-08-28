import express from 'express';
import ResponseController from '../../controllers/ResponseController';
import validate from '../../middlewares/validate'
import ResponseValidation from '../../validations/ResponseValidation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/', auth, validate(ResponseValidation.create), ResponseController.create)
router.get('/', auth, validate(ResponseValidation.findResponseById), ResponseController.findResponseById)
router.get('/:id', auth, validate(ResponseValidation.find), ResponseController.find)

export default router
import express from 'express';
import ResponseController from '../../controllers/ResponseController';
import validate from '../../middlewares/Validate'
import ResponseValidation from '../../validations/ResponseValidation';
import auth from '../../middlewares/Auth';
const router = express.Router();

router.post('/', auth, validate(ResponseValidation.create), ResponseController.create)
router.get('/:id', auth, validate(ResponseValidation.findResponseById), ResponseController.findResponseById)
router.get('/', auth, validate(ResponseValidation.find), ResponseController.find)
router.get('/generate-signed-url/id', auth, validate(ResponseValidation.generateSignedUrl), ResponseController.generateSignedUrl);

export default router
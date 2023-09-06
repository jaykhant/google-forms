import express from 'express';
import FormController from '../../controllers/FormController';
import validate from '../../middlewares/validate'
import FormValidation from '../../validations/FormValidation';
import auth from '../../middlewares/auth';
const router = express.Router();

router.post('/', auth, validate(FormValidation.create), FormController.create)
router.put('/', auth, validate(FormValidation.update), FormController.update)
router.get('/', auth, validate(FormValidation.findAll), FormController.findAll)
router.get('/:id', auth, validate(FormValidation.find), FormController.find)
router.delete('/', auth, validate(FormValidation.remove), FormController.remove)
router.put('/publish', auth, validate(FormValidation.updatestatus), FormController.updatestatus)

export default router
import { Router } from 'express';
import { registerCompany , updateCompany, listarCompanias} from './companias.controller.js';
import { registerValidator ,updateCompanyValidator} from '../middlewares/validate.companias.js';
import router from '../auth/auth.routes.js';

const router = Router()

router.post('/registrarCompania', registerValidator, registerCompany)
router.patch('/actualizarCompania/:uid', updateCompanyValidator, updateCompany)
router.put('/listarCompanias', listarCompanias)

export default router;
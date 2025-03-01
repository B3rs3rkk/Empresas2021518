import { Router } from 'express';
import { registerCompany , updateCompany, listarCompanias} from './companias.controller.js';
import { registerValidator ,updateCompanyValidator} from '../middlewares/validate.companias.js';

const router = Router()

/**
 * @swagger
 * /registrarCompania:
 *   post:
 *     summary: Registrar una nueva compañía
 *     tags: [Compañías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Compañía registrada
 *       400:
 *         description: Error de validación
 */
router.post('/registrarCompania', registerValidator, registerCompany)

/**
 * @swagger
 * /actualizarCompania/{uid}:
 *   patch:
 *     summary: Actualizar información de una compañía por UID
 *     tags: [Compañías]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: UID de la compañía
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Información actualizada
 *       400:
 *         description: Error de validación
 */
router.patch('/actualizarCompania/:uid', updateCompanyValidator, updateCompany)

/**
 * @swagger
 * /listarCompanias:
 *   put:
 *     summary: Listar todas las compañías
 *     tags: [Compañías]
 *     responses:
 *       200:
 *         description: Lista de compañías
 *       400:
 *         description: Error de validación
 */
router.put('/listarCompanias', listarCompanias)

export default router;
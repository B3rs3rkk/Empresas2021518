import { Router } from 'express';
import { updateUser, updatePassword, deleteUser, updateMe } from'./usuarios.controller.js';
import {  actaulizarContraseñaValidator, actualizatUsuarioValidator, eliminarUsuarioValidator  } from "../middlewares/validate.usuarios.js";


const router = Router()

/**
 * @swagger
 * /actualizarContrasenia:
 *   patch:
 *     summary: Actualizar contraseña del usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *       400:
 *         description: Error de validación
 */
router.patch('/actualizarContrasenia', actaulizarContraseñaValidator, updatePassword)

/**
 * @swagger
 * /actualizarme:
 *   put:
 *     summary: Actualizar información del usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Información actualizada
 *       400:
 *         description: Error de validación
 */
router.put('/actualizarme', actualizatUsuarioValidator, updateMe)

/**
 * @swagger
 * /actualizarUser/{uid}:
 *   put:
 *     summary: Actualizar información de un usuario por UID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: UID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Información actualizada
 *       400:
 *         description: Error de validación
 */
router.put('/actualizarUser/:uid', actualizatUsuarioValidator, updateUser)

/**
 * @swagger
 * /eliminarUser/{uid}:
 *   delete:
 *     summary: Eliminar un usuario por UID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: UID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       400:
 *         description: Error de validación
 */
router.delete('/eliminarUser/:uid', eliminarUsuarioValidator, deleteUser)

export default router;
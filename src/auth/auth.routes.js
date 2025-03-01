import { Router } from "express";
import { registrar, loggiar } from "./auth.controller.js";
import { loginValidator, registerValidator } from "../middlewares/validate.usuarios.js";

const router = Router()

/**
 * @swagger
 * /registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
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
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Error de validación
 */
router.post("/registrar", registerValidator, registrar)

/**
 * @swagger
 * /loggiar:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       400:
 *         description: Error de validación
 */
router.post("/loggiar", loginValidator, loggiar)

export default router


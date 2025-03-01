import {body} from "express-validator";
import { correoExists, usernameExists } from "../helpers/db-validators.js"
import { validateFields } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";


export const registerValidator = [
    body("nombreCompania").notEmpty().withMessage("The nombreCompania is required"),
    body("creacion").notEmpty().withMessage("The creacion is required"),
    body("correo").notEmpty().withMessage("Email is required"),
    body("correo").isEmail().withMessage("It is not a Valid correo"),
    body("categoria").notEmpty().withMessage("The caregory is required"),
    validateFields,
    handleErrors
]


export const updateCompanyValidator = [
    validateJWT,
    body("nombreCompania").optional().isString().withMessage("Username es en formáto erróneo"),
    body("correo").optional().isEmail().withMessage("No es un email válido"),
    body("correo").optional().custom(correoExists),
    body("categoria").optional().isIn(["Tecnología", "Medicina", "Educación", "Finanzas", "Construcción"]).withMessage("Only be [Tecnología, Medicina, Educación, Finanzas,Construcción"),
    validateFields,
    handleErrors
]


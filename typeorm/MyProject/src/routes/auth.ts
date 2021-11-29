import { Router } from "express";
import AuthController from '../controller/AuthController';
import { checkJwt } from "../middleware/jwt";

const router=Router();

//login
router.post('/login',AuthController.login);
//cambio de password
router.post('/change-password',[checkJwt],AuthController.changePassword);

export default router;
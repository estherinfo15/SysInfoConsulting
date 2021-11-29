import { Router } from "express";
import UserController from './../controller/UserController';
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";
const router=Router();
//permisos para quien quiera hacer alguna accion con los usuarios
//routes
//GET ALL USER
router.get('/',[checkJwt,checkRole(['admin'])],UserController.getAll);//cjeckJwt valida el token de nuestro usuario
//get one user
router.get('/:id',[checkJwt,checkRole(['admin'])],UserController.getById);
//create new user
router.post('/',[checkJwt,checkRole(['admin'])],UserController.newUser);//solo un admi puede crear un nuevo usuario
//edit user
router.patch('/:id',[checkJwt,checkRole(['admin'])],UserController.editUser);
//delete user
router.delete('/:id',[checkJwt,checkRole(['admin'])],UserController.deleteUser);

export default router;

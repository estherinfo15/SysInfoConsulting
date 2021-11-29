import { Router } from 'express';
import auth from './auth';
import user from './User';

const routes= Router();

routes.use('/auth',auth);
routes.use('/users',user);//ruta usada en postman


export default routes;
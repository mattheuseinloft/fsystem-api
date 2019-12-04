import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import QuestionController from './app/controllers/QuestionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
// A partir daqui, as rotas tem acesso ao req.userId

routes.put('/users', UserController.update);

routes.get('/questions', QuestionController.index);
routes.post('/questions', QuestionController.store);

// routes.post('/questions/:id/answer', AnswerController.store);

export default routes;

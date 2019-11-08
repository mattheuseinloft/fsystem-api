import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    username: 'mattheus',
    email: 'mattheus@fsystem.com',
    password_hash: '1234567',
    gender: 'Masculino',
    date_of_birth: new Date('1996-12-28T09:15:00-03:00'),
    admin: true
  });

  return res.json(user);
});

export default routes;

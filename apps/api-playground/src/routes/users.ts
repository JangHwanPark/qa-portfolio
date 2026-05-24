import { Router } from 'express';

type User = { id: number; name: string; email: string };

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

export const usersRouter = Router();

usersRouter.get('/', (_req, res) => {
  res.json(users);
});

usersRouter.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

usersRouter.post('/', (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email) {
    return res.status(400).json({ message: 'name, email required' });
  }
  const user: User = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).json(user);
});

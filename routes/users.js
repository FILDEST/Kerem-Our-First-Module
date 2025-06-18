import express from 'express';
import { InMemorySharedStorage } from '../storage/storage.js';

const router = express.Router();
const db = new InMemorySharedStorage();

router.use(express.json());

router.post('/', (req, res) => {
  const { firstName, lastName, email, password, age } = req.body;
  if (!firstName || !lastName || !email || !password || !age) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newUser = db.create('users', {
    firstName,
    lastName,
    email,
    password,
    age,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tests: []
  });

  res.status(201).json(newUser);
});

router.get('/', (req, res) => {
  const users = db.find('users', () => true);
  res.json(users);
});

export default router;

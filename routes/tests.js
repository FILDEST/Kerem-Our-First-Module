import express from 'express';
import { InMemorySharedStorage } from '../storage/storage.js';

const router = express.Router({ mergeParams: true });
const storage = new InMemorySharedStorage();

router.get('/', (req, res) => {
  const { userId } = req.params;
  const tests = storage.where('tests', { userId });
  res.json(tests);
});

router.post('/', (req, res) => {
  const { userId } = req.params;
  const test = {
    ...req.body,
    userId,
  };
  const created = storage.create('tests', test);
  res.status(201).json(created);
});

export default router;

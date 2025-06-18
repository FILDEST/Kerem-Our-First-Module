import express from 'express';
import usersRouter from './routes/users.js';
import testsRouter from './routes/tests.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/users/:userId/tests', testsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

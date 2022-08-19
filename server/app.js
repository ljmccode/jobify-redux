import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// extra security packages
import helmet from 'helmet';
import xxs from 'xss-clean';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

import express from 'express';
const app = express();

// connectDB
import connectDB from './db/connect.js';
import authenticateUser from './middleware/authentication.js';

// routers
import authRouter from './routes/auth.js';
import jobsRouter from './routes/jobs.js';

// error handler
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.set('trust proxy', 1);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(helmet());
app.use(xxs());
app.use(cors());
app.use(mongoSanitize());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

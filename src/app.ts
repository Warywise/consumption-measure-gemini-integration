import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import useSwagger from './utils/swagger';
import { errorHandler } from './middlewares/errorHandler';
import logger from './utils/logger';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));

app.use(errorHandler);
app.use(router);

useSwagger(app);

app.get('/', (_req, res) => {
  res.send('Consumption Measurement API. OK!');
});

app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}.`);
});

export default app;

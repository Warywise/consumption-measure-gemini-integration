import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import useSwagger from './utils/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));

useSwagger(app);

app.get('/', (_req, res) => {
  res.send('Consumption Measurement API. OK!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}.`);
});

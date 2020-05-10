import express from 'express';
import morgan from 'morgan';

import testRoute from './routes/tester';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use('/test', testRoute);

export default app;

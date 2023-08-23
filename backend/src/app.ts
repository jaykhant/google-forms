import express from 'express'
import httpStatus from 'http-status'
import cors from 'cors';
import routes from './routes/v1/index';
import config from './config/index';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';
import morgan from './config/Morgan';

const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors({ origin: true }));
app.options('*', cors());

// v1 api routes
app.use('', routes);

// send back a 404 error for any unknown api request
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((_: any, __: any, next: (arg0: any) => void) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;

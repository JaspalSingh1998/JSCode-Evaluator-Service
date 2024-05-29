import express from 'express';

import { pingCheck } from '../../controllers/pingController';
import { createSubmissionZodSchema } from '../../dtos/CreateSubmissionDto';
import { validate } from '../../validators/zodValidator';
import submissionRouter from './submissionRoutes';

const v1Router = express.Router();
v1Router.use('/submissions', validate(createSubmissionZodSchema), submissionRouter);

v1Router.get("/", pingCheck);

export default v1Router;
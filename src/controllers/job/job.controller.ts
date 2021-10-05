import { celebrate } from 'celebrate';
import { NextFunction, Request, Response, Router } from 'express';
import * as core from 'express-serve-static-core';

import { jobService } from '../../services/job/job.service';
import { CreateJobSchema, GetJobsSchema, UpdateJobSchema } from './validators';

const router = Router();

interface Query extends core.Query {
  clientId: string;
  userId: string;
}

router.get(
  '/',
  [celebrate(GetJobsSchema)],
  (req: Request<any, Query, any>, res: Response, next: NextFunction) => {
    const { clientId, userId, page } = req.query;
    // @ts-ignore
    jobService
      // @ts-ignore
      .getJobs(clientId, userId, page)
      .then((job) => {
        res.json(job);
      })
      .catch(next);
  },
);

router.get('/:id', (req: Request<any, any, { id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params;
  jobService
    .getJob(id)
    .then((job) => {
      res.json(job);
    })
    .catch(next);
});

router.delete(
  '/:id',
  (req: Request<any, any, { id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    jobService
      .deleteJob(id)
      .then((job) => {
        res.status(204).json(job);
      })
      .catch(next);
  },
);

router.post(
  '/',
  [celebrate(CreateJobSchema)],
  (req: Request, res: Response, next: NextFunction) => {
      jobService
          // @ts-ignore
          .createJob(req.body, req.user.id)
      .then((job) => {
        res.status(201).json(job);
      })
      .catch(next);
  },
);

router.patch(
  '/:id',
  [celebrate(UpdateJobSchema)],
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    jobService
      .updateJob(id, req.body)
      .then((job) => {
        res.json(job);
      })
      .catch(next);
  },
);

export default router;

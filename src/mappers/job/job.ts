import JobResponse from '../../dto/response/job/JobResponse';
import { Job } from '../../models/job';

export const mapJobToJobResponse = (job: Job): JobResponse => {
  return {
    id: job._id,
    createdBy: {
      id: job.createdBy._id,
      firstName: job.createdBy.firstName,
      lastName: job.createdBy.lastName,
      email: job.createdBy.email,
    },
    client: {
      id: job.client._id,
      name: job.client.name,
      email: job.client.email,
      phone: job.client.phone,
      country: job.client.country,
      city: job.client.city,
    },
    loadingDate: job.loadingDate,
    unloadingDate: job.unloadingDate,
    descriptions: job.descriptions,
    vehicles: job.vehicles,
    costs: job.costs,
    meta: job.meta,
  };
};

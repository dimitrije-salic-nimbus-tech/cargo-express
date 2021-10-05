import JobRequest from '../../dto/request/job/CreateJobRequest';
import JobResponse from '../../dto/response/job/JobResponse';
import { mapJobToJobResponse } from '../../mappers/job/job';
import { Job, JobModel } from '../../models/job';
import { getPagination } from '../../utils/pagination.utils';
import { PageableItems } from '../../models/pageableItems';

const getJobs = async (
  clientId = null,
  userId = null,
  page = 1,
): Promise<PageableItems<JobResponse>> => {
  const { offset, limit } = getPagination(page);
  const filter = {};
  if (clientId) {
    // @ts-ignore
    filter.clientId = clientId;
  }

  if (userId) {
    // @ts-ignore
    filter.userId = userId;
  }

  const jobs = await JobModel.find(filter)
    .populate('client')
    .populate('createdBy')
    .skip(offset)
    .limit(limit);
  const counts = await JobModel.count();

  const response = jobs.map((job) => mapJobToJobResponse(job));

  return {
    items: response,
    totalPages: Math.ceil(counts / limit),
    page,
  };
};

const getJob = async (id: string): Promise<JobResponse> => {
  const job = await getJobById(id);

  return mapJobToJobResponse(job);
};

const deleteJob = async (id: string): Promise<void> => {
  await JobModel.deleteOne({ _id: id });
};

const createJob = async (request: JobRequest, userId: string): Promise<JobResponse> => {
  const createJobRequest = {
    ...request,
    createdBy: userId
  }
  return JobModel.create(createJobRequest).then(async (job) => await getJob(job._id));
}

const updateJob = async (id: string, request: Partial<JobRequest>): Promise<JobResponse> => {
  const job = await getJobById(id);
  job.set(request);
  return job.save().then(mapJobToJobResponse);
};

const getJobById = async (id: string): Promise<Job> => {
  const job = await JobModel.findById(id).populate('client').populate('createdBy'); // arg je ime polja, populate sam izvuce iz baze i tog klijenta

  if (!job) {
    throw new Error('Job not found.');
  }

  return job;
};

export const jobService = {
  getJobs,
  getJob,
  deleteJob,
  createJob,
  updateJob,
};

import {Request, Response} from 'express';

import { CreateSubmissionDTO } from '../dtos/CreateSubmissionDto';

export function addSubmission(req: Request, res: Response) {
    const submissionDto = req.body as CreateSubmissionDTO;

    return res.status(201).json({
        sucess: true,
        error: {},
        message: 'Successfully Collected The Submission',
        data: submissionDto
    });
}
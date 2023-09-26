import { Request, Response } from 'express';
import ResponseService from '../services/ResponseService';
import catchAsync from '../utils/CatchAsync';
import S3BucketManager from '../utils/S3BucketManager'
import mongoose from 'mongoose'
import FormService from '../services/FormService';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const create = catchAsync(async (req: any, res: Response) => {
    const { formId, answer } = req.body

    const user = req.user

    const form = await FormService.findform(formId)
    if (form?.status == 'creating') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Form Not Publish')
    }

    const response = await ResponseService.create(user.id, formId, answer)

    res.json(response)
})

const find = catchAsync(async (req: Request, res: Response) => {
    const { formId, page, size } = req.query

    res.json({
        data: await ResponseService.find(String(formId), Number(page), Number(size)),
        totalData: await ResponseService.getTotalCount(String(formId))
    })
})

const findResponseById = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id

    res.json({
        response: await ResponseService.findResponseById(String(id))
    })
})

const generateSignedUrl = catchAsync(async (req: Request, res: Response) => {
    const { formId, ext } = req.query

    const folderName = formId?.toString()

    const s3BucketManager = new S3BucketManager()

    const imageId = new mongoose.Types.ObjectId()

    const signedUrls = s3BucketManager.generateSignedUrlForUpload(
        folderName!.toString(),
        imageId!.toString(),
        ext!.toString()
    )

    res.json(signedUrls)
})

export default {
    create,
    find,
    findResponseById,
    generateSignedUrl
}
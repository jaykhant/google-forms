import { Request, Response } from 'express';
import ResponseService from '../services/ResponseService';
import catchAsync from '../utils/CatchAsync';
import S3BucketManager from '../utils/S3BucketManager'
import mongoose from 'mongoose'

const create = catchAsync(async (req: any, res: Response) => {
    const { formId, answer } = req.body

    const user = req.user

    res.json({ data: await ResponseService.create(user.id, formId, answer) })
})

const find = catchAsync(async (req: Request, res: Response) => {
    const { formId, page, size } = req.query

    let data = await ResponseService.find(String(formId), Number(page), Number(size)) as any

    const folderName = formId?.toString()

    const s3BucketManager = new S3BucketManager()

    for (let j = 0; j < data.length; j++) {
        const answer = data[j].answer as any

        for (let i = 0; i < answer.length; i++) {
            if (answer[i].fileName)
                answer[i].fileName = await s3BucketManager.generateSignedUrlForDownload(
                    folderName!.toString(),
                    answer[i].fileName!
                ) as any
        }
    }

    res.json({ data })
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
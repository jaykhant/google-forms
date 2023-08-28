import { Request, Response } from 'express';
import FormService from '../services/FormService';
import catchAsync from '../utils/CatchAsync';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import S3BucketManager from '../utils/S3BucketManager'
import mongoose from 'mongoose'

const create = catchAsync(async (req: any, res: Response) => {
    const { title } = req.body

    const user = req.user

    res.json(await FormService.create(title, user.id))
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

const update = catchAsync(async (req: any, res: Response) => {
    const { id, title, description, items } = req.body

    const user = req.user

    const form = await FormService.find(id, user.id)
    if (!form) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
    }

    res.json({ data: await FormService.update(id, title, description, items) })
})

const findAll = catchAsync(async (req: Request, res: Response) => {
    const { page, size } = req.query

    res.json({
        forms: await FormService.getAll(Number(page), Number(size)),
        totalData: await FormService.getTotalCount()
    })
})

const find = catchAsync(async (req: Request, res: Response) => {
     const id = req.params.id

    const data = await FormService.findForm(String(id))

    const folderName = id?.toString()

    const s3BucketManager = new S3BucketManager()

    const items = data?.items as any
     
    let signedUrls = []
    for(let i = 0; i < items.length; i++) {
    let imageName = items[i].itemName
    if(imageName)
    signedUrls.push(await s3BucketManager.generateSignedUrlForDownload(
        folderName!.toString(),
        imageName!
    ))
}

    res.json({data, signedUrls})
})

const remove = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.query

    res.json({ data: await FormService.remove(String(id)) })
})

const updatestatus = catchAsync(async (req: any, res: Response) => {
    const { id } = req.query

    const user = req.user

    const form = await FormService.find(id, user.id)
    if (!form) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
    }

    res.json({ data: await FormService.updatestatus(String(id)) })
})

export default {
    create,
    update,
    findAll,
    find,
    remove,
    updatestatus,
    generateSignedUrl
}
import { Request, Response } from 'express';
import FormService from '../services/FormService';
import catchAsync from '../utils/CatchAsync';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const create = catchAsync(async (req: any, res: Response) => {
    const { title } = req.body

    const user = req.user

    res.json(await FormService.create(title, user.id))
})

const update = catchAsync(async (req: any, res: Response) => {
    const { id, title, description, questions } = req.body

    const user = req.user

    const form = await FormService.find(id, user.id)
    if (!form) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
    }

    res.json({ data: await FormService.update(id, title, description, questions) })
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

    res.json({ data })
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
    updatestatus
}
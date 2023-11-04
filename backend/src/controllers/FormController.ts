import { Request, Response } from 'express';
import FormService from '../services/FormService';
import ResponseService from '../services/ResponseService';
import catchAsync from '../utils/CatchAsync';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const create = catchAsync(async (req: any, res: Response) => {
    const { title, description, questions } = req.body

    const user = req.user

    res.json(await FormService.create(title, user.id, description, questions))
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const update = catchAsync(async (req: any, res: Response) => {
    const { id, title, description, questions } = req.body

    const user = req.user

    const form = await FormService.find(id, user.id)
    if (!form) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Form does not exist.')
    }

    res.json({ data: await FormService.update(id, title, description, questions) })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const findAll = catchAsync(async (req: any, res: Response) => {
    const user = req.user
    const { page, size } = req.query
    
    res.json({
        forms: await FormService.getAll(Number(page), Number(size), user.id),
        totalData: await FormService.getTotalCount(user.id)
    })
})

const find = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id

    res.json((await FormService.findForm(String(id)))[0])
})

const remove = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.query

    await ResponseService.remove(String(id))

    res.json({ data: await FormService.remove(String(id)) })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updatestatus = catchAsync(async (req: any, res: Response) => {
    const { id } = req.query

    const user = req.user

    const form = await FormService.find(id, user.id)
    if (!form) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Form does not exist.')
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
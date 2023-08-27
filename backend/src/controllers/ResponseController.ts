import { Request, Response } from 'express';
import ResponseService from '../services/ResponseService';
import catchAsync from '../utils/CatchAsync';

const create = catchAsync(async (req: any, res: Response) => {
    const { formId, answer } = req.body

    const user = req.user

    res.json({ data: await ResponseService.create(user.id, formId, answer) })
})

const find = catchAsync(async (req: Request, res: Response) => {
    const { formId } = req.query

    res.json({
        response: await ResponseService.find(String(formId))
    })
})

const findResponseById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.query

    res.json({
        response: await ResponseService.findResponseById(String(id))
    })
})

export default {
    create,
    find,
    findResponseById
}
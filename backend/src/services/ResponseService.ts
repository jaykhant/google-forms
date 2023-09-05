import { prisma } from '../utils/PrismaClient';

const create = async (userId: string, formId: string, answer: any) => {
    return await prisma.response.create({
        data: {
            userId,
            formId,
            answer
        }
    })
}

const find = async (formId: string, page: number, size: number) => {
    return await prisma.response.aggregateRaw({
        pipeline: [
            {
                $match: {
                    formId: {
                        $oid: formId
                    }
                }
            },
            { $skip: (page - 1) * size },
            { $limit: size },
            {
                $project: {
                    _id: 0,
                    id: { $toString: "$_id" },
                    userId: { $toString: "$userId" },
                    formId: { $toString: "$formId" },
                    status: 1,
                    createdAt: { $toString: "$createdAt" },
                    updatedAt: { $toString: "$updatedAt" },
                    answer: 1
                },
            },
        ]
    })
}

const findResponseById = async (id: string) => {
    return await prisma.response.aggregateRaw({
        pipeline: [
            {
                $match: {
                    _id: {
                        $oid: id
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    id: { $toString: "$_id" },
                    userId: { $toString: "$userId" },
                    formId: { $toString: "$formId" },
                    status: 1,
                    createdAt: { $toString: "$createdAt" },
                    updatedAt: { $toString: "$updatedAt" },
                    answer: 1
                },
            },
        ]
    })
}

export default {
    create,
    find,
    findResponseById
}
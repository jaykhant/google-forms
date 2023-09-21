import { prisma } from '../utils/PrismaClient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    return await prisma.response.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
            formId
        },
        select: {
            id: true,
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    })
}

const getTotalCount = async (formId: string) => {
    return await prisma.response.count({
        where: {
            formId
        }
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
    findResponseById,
    getTotalCount
}
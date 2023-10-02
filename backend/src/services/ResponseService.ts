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
                $unwind: {
                    path: '$answer'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    userId: {
                        $first: '$userId'
                    },
                    formId: {
                        $first: '$formId'
                    },
                    createdAt: {
                        $first: '$createdAt'
                    },
                    updatedAt: {
                        $first: '$updatedAt'
                    },
                    answer: {
                        $push: {
                            type: '$answer.type',
                            question: '$answer.question',
                            answer: '$answer.answer',
                            answers: '$answer.answers',
                            fileName: '$answer.fileName',
                            dateTime: { $toString: '$answer.dateTime' }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    id: { $toString: "$_id" },
                    userId: { $toString: "$userId" },
                    formId: { $toString: "$formId" },
                    createdAt: { $toString: "$createdAt" },
                    updatedAt: { $toString: "$updatedAt" },
                    answer: {
                        $map: {
                            input: '$answer',
                            as: 'answer',
                            in: {
                                type: "$$answer.type",
                                question: '$$answer.question',
                                answer: '$$answer.answer',
                                answers: '$$answer.answers',
                                fileName: '$$answer.fileName',
                                dateTime: { $ifNull: ["$$answer.dateTime", "$false"] }
                            }
                        }
                    }
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
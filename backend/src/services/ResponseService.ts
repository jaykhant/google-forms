import { prisma } from '../utils/PrismaClient';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const create = async (userId: string, formId: string, answers: any) => {
    return await prisma.response.create({
        data: {
            userId,
            formId,
            answers
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
                $lookup: {
                    from: 'User',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            }, {
                $lookup: {
                    from: 'Form',
                    localField: 'formId',
                    foreignField: '_id',
                    as: 'form'
                }
            },
            {
                $unwind: {
                    path: '$answers'
                }
            },
            {
                $unwind: {
                    path: '$user'
                }
            },
            {
                $unwind: {
                    path: '$form'
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
                    answers: {
                        $push: {
                            type: '$answers.type',
                            question: '$answers.question',
                            answer: '$answers.answer',
                            answers: '$answers.answers',
                            fileName: '$answers.fileName',
                            dateTime: { $toString: '$answer.dateTime' }
                        }
                    },
                    user: {
                        $first: '$user'
                    },
                    form: {
                        $first: '$form'
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
                    answers: {
                        $map: {
                            input: '$answers',
                            as: 'answers',
                            in: {
                                type: "$$answers.type",
                                question: '$$answers.question',
                                answer: '$$answers.answer',
                                answers: '$$answers.answers',
                                fileName: '$$answers.fileName',
                                dateTime: { $ifNull: ["$$answers.dateTime", "$false"] }
                            }
                        }
                    },
                    user: {
                        name: "$user.name",
                        email: "$user.email"
                    },
                    form: {
                        title: "$form.title",
                        description: "$form.description"
                    }
                },
            },
        ]
    })
}

const remove = async (formId: string) => {
    return await prisma.response.deleteMany({
        where: {
            formId
        }
    })
}

export default {
    create,
    find,
    findResponseById,
    getTotalCount,
    remove
}
import { prisma } from '../utils/PrismaClient';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const create = async (title: string, userId: string, description: string, questions: any) => {
    return await prisma.form.create({
        data: {
            title,
            userId,
            description,
            questions,
            status: 'creating'
        }
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const update = async (id: string, title: string, description: string, questions: any) => {
    return await prisma.form.update({
        where: {
            id
        },
        data: {
            title,
            description,
            questions
        }
    })
}

const getAll = async (page: number, size: number, userId: string) => {
    return await prisma.form.aggregateRaw({
        pipeline: [
            {
                $match: {
                    userId: {
                        $oid: userId
                    }
                }
            },
            { $skip: (page - 1) * size },
            { $limit: size },
            { $sort: { createdAt: -1 } },
            {
                $project: {
                    _id: 0,
                    id: { $toString: "$_id" },
                    title: 1,
                    description: 1,
                    status: 1,
                    createdAt: { $toString: "$createdAt" }
                },
            },
        ]
    })
}

const getTotalCount = async (userId: string) => {
    return await prisma.form.count({
        where: {
            userId
        }
    })
}

const remove = async (id: string) => {
    return await prisma.form.delete({
        where: {
            id
        }
    })
}

const updatestatus = async (id: string) => {
    return await prisma.form.update({
        where: {
            id
        },
        data: {
            status: 'publish'
        }
    })
}

const find = async (id: string, userId: string) => {
    return await prisma.form.findFirst({
        where: {
            id,
            userId
        }
    })
}

const findform = async (id: string) => {
    return await prisma.form.findFirst({
        where: {
            id
        }
    })
}

const findForm = async (id: string) => {
    return await prisma.form.aggregateRaw({
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
                    title: 1,
                    description: 1,
                    status: 1,
                    userId: { $toString: "$userId" },
                    createdAt: { $toString: "$createdAt" },
                    updatedAt: { $toString: "$updatedAt" },
                    questions: 1
                },
            },
        ]
    })
}

export default {
    create,
    update,
    getAll,
    getTotalCount,
    remove,
    updatestatus,
    find,
    findform,
    findForm
}
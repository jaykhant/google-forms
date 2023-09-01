import { prisma } from '../utils/PrismaClient';

const create = async (title: string, userId: string) => {
    return await prisma.form.create({
        data: {
            title,
            userId,
            status: 'creating'
        }
    })
}

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

const getAll = async (page: number, size: number) => {
    return await prisma.form.findMany({
        skip: (page - 1) * size,
        take: size,
        select: {
            id: true,
            title: true,
            description: true,
            status: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc',
          }
    })
}

const getTotalCount = async () => {
    return await prisma.form.count()
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

const findForm = async (id: string) => {
    return await prisma.form.findFirst({
        where: {
            id
        }
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
    findForm
}
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
    return await prisma.response.findMany({
        skip: (page - 1) * size,
        take: size,
        where: {
            formId
        }
    })
}

const findResponseById = async (id: string) => {
    return await prisma.response.findFirst({
        where: {
            id
        }
    })
}

export default {
    create,
    find,
    findResponseById
}
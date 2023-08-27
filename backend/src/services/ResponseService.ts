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

const find = async (formId: string) => {
    return await prisma.response.findFirst({
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
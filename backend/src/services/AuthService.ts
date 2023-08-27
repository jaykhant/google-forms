import { prisma } from '../utils/PrismaClient';

const create = async (email: string, name: string, password: string) => {
    return await prisma.user.create({
        data: {
            email,
            name,
            password
        }
    })
}

const find = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email
        }
    })
}

export default {
    create,
    find
}
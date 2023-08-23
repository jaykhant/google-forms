import { prisma } from '../utils/PrismaClient';

const create = async (email: string, username: string, password: string) => {
    return await prisma.user.create({
        data: {
            email,
            username,
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
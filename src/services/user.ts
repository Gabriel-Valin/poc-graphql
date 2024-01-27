import { DatabaseConnection } from "../conn"
import { User } from "../entities/user"

type RegisterInput = {
    name: string
    email: string
    password: string
}

type LoginInput = {
    email: string
    password: string
}

export class UserService {
    async register(input: RegisterInput): Promise<User> {
        return await DatabaseConnection.connection.user.create({
            data: { ...input },
            include: {
                sales: true
            }
        })
    }

    async login(input: LoginInput): Promise<{ accessToken: string }> {
        const userFound = await DatabaseConnection.connection.user.findFirst({ where: { email: input.email } })
        if (!userFound) throw new Error('Not found user')
        if (userFound.password !== input.password) throw new Error('Wrong credentials')

        return { accessToken: 'acessTokenGenerated' }
    }

    async me(userId: number): Promise<User | null> {
        return await DatabaseConnection.connection.user.findUnique({
            where: { id: userId }, include: {
                sales: true
            }
        })
    }
}
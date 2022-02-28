import AppError from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

import ICreateUserDTO from "../dtos/ICreateUserDTO"
import User from "../infra/typeorm/entities/User"
import IHashProvider from "../providers/HashProvider/models/IHashProvider"
import IUserRepository from "../repositories/IUsersRepository"

@injectable()
export default class CreateUserService {

    constructor (
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute ({ name, email, age, password, avatar }: ICreateUserDTO): Promise<User> {
        const checkUserExists = await this.usersRepository.findByEmail(email)

        if ( checkUserExists ) throw new AppError('Email address already used.', 409)

        const hashedPassword = await this.hashProvider.generateHash(password)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            age,
            avatar
        })

        return user
    }
}
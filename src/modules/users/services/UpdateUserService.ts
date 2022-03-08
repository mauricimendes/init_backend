import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider"
import AppError from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import IUpdateUserDTO from "../dtos/IUpdateUserDTO"
import IHashProvider from "../providers/HashProvider/models/IHashProvider"
import IUserRepository from "../repositories/IUsersRepository"

@injectable()
export default class UpdateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}

    public async execute({
        id,
        name,
        email,
        password,
        age,
        avatar
    }: IUpdateUserDTO ): Promise<any> {
        const user = await this.usersRepository.findById(id)

        if ( !user ) throw new AppError('User not found.', 404)

        if ( email ) {
            const checkEmailExists = await this.usersRepository.findByEmail(email)

            if ( email !== user.email && checkEmailExists ) throw new AppError('E-mail already used.', 409)
        }

        if ( avatar ) {
            await this.storageProvider.deleteFile(avatar)
            const fileName = await this.storageProvider.saveFile(avatar)
            user.avatar = fileName
        }

        if ( password ) {
            const passwordMatched = await this.hashProvider.generateHash(password)
            user.password = passwordMatched
        }

        await this.usersRepository.update({
            id,
            name,
            email,
            password: user.password,
            age,
            avatar: user.avatar
        })
    }
}